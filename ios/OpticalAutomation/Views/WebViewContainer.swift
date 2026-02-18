import SwiftUI
import WebKit

struct WebViewContainer: View {
    let urlString: String
    @State private var isLoading = true
    @State private var error: Error?
    @State private var webView: WKWebView?
    @State private var canGoBack = false
    @State private var canGoForward = false
    @State private var currentURL: String = ""
    @State private var pageTitle: String = ""
    @State private var showShareSheet = false
    @State private var loadingProgress: Double = 0
    
    var body: some View {
        VStack(spacing: 0) {
            // Loading Progress Bar
            if isLoading {
                GeometryReader { geometry in
                    Rectangle()
                        .fill(
                            LinearGradient(
                                colors: [
                                    Color(red: 0.39, green: 0.40, blue: 0.95),
                                    Color(red: 0.58, green: 0.37, blue: 0.98)
                                ],
                                startPoint: .leading,
                                endPoint: .trailing
                            )
                        )
                        .frame(width: geometry.size.width * loadingProgress, height: 3)
                        .animation(.linear(duration: 0.3), value: loadingProgress)
                }
                .frame(height: 3)
            }
            
            ZStack {
                WebView(
                    urlString: urlString,
                    isLoading: $isLoading,
                    error: $error,
                    webView: $webView,
                    canGoBack: $canGoBack,
                    canGoForward: $canGoForward,
                    currentURL: $currentURL,
                    pageTitle: $pageTitle,
                    loadingProgress: $loadingProgress
                )
                
                // Loading Overlay
                if isLoading && loadingProgress < 0.1 {
                    VStack(spacing: 20) {
                        ProgressView()
                            .scaleEffect(1.5)
                            .tint(Color(red: 0.39, green: 0.40, blue: 0.95))
                        Text("Loading...")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                    }
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .background(Color(.systemBackground).opacity(0.9))
                }
                
                // Error State
                if let error = error {
                    VStack(spacing: 24) {
                        ZStack {
                            Circle()
                                .fill(Color.red.opacity(0.1))
                                .frame(width: 100, height: 100)
                            
                            Image(systemName: "wifi.exclamationmark")
                                .font(.system(size: 40))
                                .foregroundColor(.red)
                        }
                        
                        VStack(spacing: 8) {
                            Text("Connection Error")
                                .font(.title3.weight(.semibold))
                            
                            Text(error.localizedDescription)
                                .font(.subheadline)
                                .foregroundColor(.secondary)
                                .multilineTextAlignment(.center)
                                .padding(.horizontal, 32)
                        }
                        
                        Button(action: { webView?.reload() }) {
                            HStack(spacing: 8) {
                                Image(systemName: "arrow.clockwise")
                                Text("Try Again")
                            }
                            .foregroundColor(.white)
                            .padding(.horizontal, 24)
                            .padding(.vertical, 12)
                            .background(
                                LinearGradient(
                                    colors: [
                                        Color(red: 0.39, green: 0.40, blue: 0.95),
                                        Color(red: 0.58, green: 0.37, blue: 0.98)
                                    ],
                                    startPoint: .leading,
                                    endPoint: .trailing
                                )
                            )
                            .clipShape(RoundedRectangle(cornerRadius: 12))
                        }
                    }
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .background(Color(.systemBackground))
                }
            }
            
            // Bottom Navigation Toolbar
            HStack(spacing: 0) {
                // Back
                Button(action: { webView?.goBack() }) {
                    Image(systemName: "chevron.left")
                        .font(.body.weight(.medium))
                        .frame(maxWidth: .infinity, minHeight: 44)
                }
                .disabled(!canGoBack)
                .opacity(canGoBack ? 1 : 0.3)
                
                // Forward
                Button(action: { webView?.goForward() }) {
                    Image(systemName: "chevron.right")
                        .font(.body.weight(.medium))
                        .frame(maxWidth: .infinity, minHeight: 44)
                }
                .disabled(!canGoForward)
                .opacity(canGoForward ? 1 : 0.3)
                
                // Share
                Button(action: { showShareSheet = true }) {
                    Image(systemName: "square.and.arrow.up")
                        .font(.body.weight(.medium))
                        .frame(maxWidth: .infinity, minHeight: 44)
                }
                
                // Reload
                Button(action: {
                    if isLoading {
                        webView?.stopLoading()
                    } else {
                        webView?.reload()
                    }
                }) {
                    Image(systemName: isLoading ? "xmark" : "arrow.clockwise")
                        .font(.body.weight(.medium))
                        .frame(maxWidth: .infinity, minHeight: 44)
                }
            }
            .foregroundColor(Color(red: 0.39, green: 0.40, blue: 0.95))
            .background(
                Color(.secondarySystemBackground)
                    .shadow(color: .black.opacity(0.1), radius: 4, x: 0, y: -2)
            )
        }
        .sheet(isPresented: $showShareSheet) {
            if let url = URL(string: currentURL.isEmpty ? urlString : currentURL) {
                ShareSheet(items: [url])
            }
        }
    }
}

// MARK: - Share Sheet
struct ShareSheet: UIViewControllerRepresentable {
    let items: [Any]
    
    func makeUIViewController(context: Context) -> UIActivityViewController {
        UIActivityViewController(activityItems: items, applicationActivities: nil)
    }
    
    func updateUIViewController(_ uiViewController: UIActivityViewController, context: Context) {}
}

// MARK: - WebView
struct WebView: UIViewRepresentable {
    let urlString: String
    @Binding var isLoading: Bool
    @Binding var error: Error?
    @Binding var webView: WKWebView?
    @Binding var canGoBack: Bool
    @Binding var canGoForward: Bool
    @Binding var currentURL: String
    @Binding var pageTitle: String
    @Binding var loadingProgress: Double
    
    func makeUIView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.allowsInlineMediaPlayback = true
        
        // Enable viewport scaling
        let preferences = WKWebpagePreferences()
        preferences.allowsContentJavaScript = true
        configuration.defaultWebpagePreferences = preferences
        
        // Set mobile User-Agent
        configuration.applicationNameForUserAgent = "Version/17.0 Mobile/15E148 Safari/604.1"
        
        // Content controller for JS injection
        let contentController = WKUserContentController()
        
        // Inject CSS to hide website header/footer for native app experience
        let hideNavScript = WKUserScript(
            source: """
            (function() {
                var style = document.createElement('style');
                style.textContent = `
                    /* Adjust for native app context */
                    body { -webkit-text-size-adjust: 100%; }
                `;
                document.head.appendChild(style);
            })();
            """,
            injectionTime: .atDocumentEnd,
            forMainFrameOnly: true
        )
        contentController.addUserScript(hideNavScript)
        configuration.userContentController = contentController
        
        let webView = WKWebView(frame: .zero, configuration: configuration)
        webView.navigationDelegate = context.coordinator
        webView.scrollView.showsVerticalScrollIndicator = true
        webView.scrollView.bounces = true
        webView.allowsBackForwardNavigationGestures = true
        
        // Mobile viewport
        webView.scrollView.contentInsetAdjustmentBehavior = .automatic
        webView.scrollView.minimumZoomScale = 1.0
        webView.scrollView.maximumZoomScale = 5.0
        
        // Custom User-Agent
        webView.customUserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1 OpticalAutomation/2.0"
        
        // KVO for progress
        webView.addObserver(context.coordinator, forKeyPath: "estimatedProgress", options: .new, context: nil)
        webView.addObserver(context.coordinator, forKeyPath: "canGoBack", options: .new, context: nil)
        webView.addObserver(context.coordinator, forKeyPath: "canGoForward", options: .new, context: nil)
        
        // Pass reference
        DispatchQueue.main.async {
            self.webView = webView
        }
        
        // Load URL
        if let url = URL(string: urlString) {
            let request = URLRequest(url: url)
            webView.load(request)
        }
        
        return webView
    }
    
    func updateUIView(_ uiView: WKWebView, context: Context) {}
    
    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }
    
    class Coordinator: NSObject, WKNavigationDelegate {
        var parent: WebView
        
        init(_ parent: WebView) {
            self.parent = parent
        }
        
        func webView(_ webView: WKWebView, didStartProvisionalNavigation navigation: WKNavigation!) {
            parent.isLoading = true
            parent.error = nil
        }
        
        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            parent.isLoading = false
            parent.loadingProgress = 1.0
            parent.currentURL = webView.url?.absoluteString ?? ""
            parent.pageTitle = webView.title ?? ""
            
            DispatchQueue.main.async {
                self.parent.canGoBack = webView.canGoBack
                self.parent.canGoForward = webView.canGoForward
            }
        }
        
        func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
            parent.isLoading = false
            parent.error = error
        }
        
        func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
            parent.isLoading = false
            parent.error = error
        }
        
        // Handle navigation decisions (open external links in Safari)
        func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
            if let url = navigationAction.request.url {
                let allowedHosts = ["opticalautomation.com", "mydeskview.com", "biteable.com", "pinterest.com", "youtube.com"]
                if let host = url.host,
                   !allowedHosts.contains(where: { host.contains($0) }),
                   navigationAction.navigationType == .linkActivated {
                    // Open external links in Safari
                    UIApplication.shared.open(url)
                    decisionHandler(.cancel)
                    return
                }
            }
            decisionHandler(.allow)
        }
        
        // KVO for progress tracking
        override func observeValue(forKeyPath keyPath: String?, of object: Any?, change: [NSKeyValueChangeKey : Any]?, context: UnsafeMutableRawPointer?) {
            guard let webView = object as? WKWebView else { return }
            
            if keyPath == "estimatedProgress" {
                DispatchQueue.main.async {
                    self.parent.loadingProgress = webView.estimatedProgress
                }
            } else if keyPath == "canGoBack" {
                DispatchQueue.main.async {
                    self.parent.canGoBack = webView.canGoBack
                }
            } else if keyPath == "canGoForward" {
                DispatchQueue.main.async {
                    self.parent.canGoForward = webView.canGoForward
                }
            }
        }
        
        deinit {
            // Note: In production, remove observers properly
        }
    }
}

#Preview {
    WebViewContainer(urlString: "https://opticalautomation.com")
}
