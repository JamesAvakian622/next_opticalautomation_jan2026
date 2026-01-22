import SwiftUI
import WebKit

struct WebViewContainer: View {
    let urlString: String
    @State private var isLoading = true
    @State private var error: Error?
    @State private var webView: WKWebView?
    
    var body: some View {
        VStack(spacing: 0) {
            ZStack {
                WebView(urlString: urlString, isLoading: $isLoading, error: $error, webView: $webView)
                
                if isLoading {
                    VStack(spacing: 20) {
                        ProgressView()
                            .scaleEffect(1.5)
                            .tint(.purple)
                        Text("Loading...")
                            .foregroundColor(.secondary)
                    }
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .background(Color(.systemBackground))
                }
                
                if let error = error {
                    VStack(spacing: 20) {
                        Image(systemName: "wifi.exclamationmark")
                            .font(.system(size: 60))
                            .foregroundColor(.red)
                        Text("Connection Error")
                            .font(.title2)
                            .fontWeight(.semibold)
                        Text(error.localizedDescription)
                            .foregroundColor(.secondary)
                            .multilineTextAlignment(.center)
                            .padding(.horizontal)
                        
                        Button("Try Again") {
                            webView?.reload()
                        }
                        .buttonStyle(.borderedProminent)
                        .tint(.purple)
                    }
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .background(Color(.systemBackground))
                }
            }
            
            // Navigation Toolbar
            HStack {
                Button(action: { webView?.goBack() }) {
                    Image(systemName: "chevron.left")
                }
                .disabled(!(webView?.canGoBack ?? false))
                
                Spacer()
                
                Button(action: { webView?.goForward() }) {
                    Image(systemName: "chevron.right")
                }
                .disabled(!(webView?.canGoForward ?? false))
                
                Spacer()
                
                Button(action: { webView?.reload() }) {
                    Image(systemName: "arrow.clockwise")
                }
            }
            .padding()
            .background(Color(.secondarySystemBackground))
        }
    }
}

struct WebView: UIViewRepresentable {
    let urlString: String
    @Binding var isLoading: Bool
    @Binding var error: Error?
    @Binding var webView: WKWebView?
    
    func makeUIView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.allowsInlineMediaPlayback = true
        
        // Enable viewport scaling
        let preferences = WKWebpagePreferences()
        preferences.allowsContentJavaScript = true
        configuration.defaultWebpagePreferences = preferences
        
        // Set mobile User-Agent to trigger responsive design
        configuration.applicationNameForUserAgent = "Version/17.0 Mobile/15E148 Safari/604.1"
        
        let webView = WKWebView(frame: .zero, configuration: configuration)
        webView.navigationDelegate = context.coordinator
        webView.scrollView.showsVerticalScrollIndicator = true
        webView.scrollView.bounces = true
        webView.allowsBackForwardNavigationGestures = true
        
        // Configure for mobile viewport - critical for iPhone display
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.scrollView.minimumZoomScale = 1.0
        webView.scrollView.maximumZoomScale = 5.0
        
        // Set custom User-Agent for mobile rendering
        webView.customUserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
        
        // Pass webView reference back
        DispatchQueue.main.async {
            self.webView = webView
        }
        
        // Load the URL
        if let url = URL(string: urlString) {
            let request = URLRequest(url: url)
            webView.load(request)
        }
        
        return webView
    }
    
    func updateUIView(_ uiView: WKWebView, context: Context) {
        // Update if needed
    }
    
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
        }
        
        func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
            parent.isLoading = false
            parent.error = error
        }
        
        func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
            parent.isLoading = false
            parent.error = error
        }
    }
}

#Preview {
    WebViewContainer(urlString: "https://opticalautomation.com")
}
