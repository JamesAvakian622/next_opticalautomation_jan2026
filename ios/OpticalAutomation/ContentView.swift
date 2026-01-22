import SwiftUI

struct ContentView: View {
    @State private var selectedTab = 0
    
    // Base URL - Change this to production URL when deploying
    // Use your Mac's local IP address so iOS devices can access the dev server
    private let baseURL = "http://192.168.1.191:3000"
    
    var body: some View {
        TabView(selection: $selectedTab) {
            // Home Tab - Main Website
            NavigationStack {
                WebViewContainer(urlString: baseURL)
                    .navigationTitle("Optical Automation")
                    .navigationBarTitleDisplayMode(.inline)
                    .toolbar {
                        ToolbarItem(placement: .navigationBarLeading) {
                            Image("Logo")
                                .resizable()
                                .scaledToFit()
                                .frame(width: 28, height: 28)
                                .cornerRadius(6)
                        }
                    }
            }
            .tabItem {
                Image(systemName: "house.fill")
                Text("Home")
            }
            .tag(0)
            
            // Subscription Tab - NEW
            NavigationStack {
                WebViewContainer(urlString: "\(baseURL)/subscription")
                    .navigationTitle("Subscription")
                    .navigationBarTitleDisplayMode(.inline)
            }
            .tabItem {
                Image(systemName: "star.circle.fill")
                Text("Subscribe")
            }
            .tag(1)
            
            // Portfolio Tab
            NavigationStack {
                WebViewContainer(urlString: "\(baseURL)/portfolio")
                    .navigationTitle("Portfolio")
                    .navigationBarTitleDisplayMode(.inline)
            }
            .tabItem {
                Image(systemName: "square.grid.2x2.fill")
                Text("Portfolio")
            }
            .tag(2)
            
            // Guides Tab - IP Guides
            NavigationStack {
                GuidesView()
            }
            .tabItem {
                Image(systemName: "book.fill")
                Text("IP Guides")
            }
            .tag(3)
            
            // More Tab
            NavigationStack {
                MoreView(baseURL: baseURL)
            }
            .tabItem {
                Image(systemName: "ellipsis.circle.fill")
                Text("More")
            }
            .tag(4)
        }
        .tint(.purple)
    }
}

#Preview {
    ContentView()
}
