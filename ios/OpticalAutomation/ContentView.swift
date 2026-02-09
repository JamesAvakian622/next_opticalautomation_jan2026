import SwiftUI

struct ContentView: View {
    @State private var selectedTab = 0
    
    // Production URL
    private let baseURL = "https://opticalautomation.com"
    
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
            
            // DeskView Tab - Software Suite
            NavigationStack {
                WebViewContainer(urlString: "\(baseURL)/deskview")
                    .navigationTitle("MyDeskView")
                    .navigationBarTitleDisplayMode(.inline)
            }
            .tabItem {
                Image(systemName: "desktopcomputer")
                Text("DeskView")
            }
            .tag(1)
            
            // Subscription Tab
            NavigationStack {
                WebViewContainer(urlString: "\(baseURL)/subscription")
                    .navigationTitle("Subscription")
                    .navigationBarTitleDisplayMode(.inline)
            }
            .tabItem {
                Image(systemName: "star.circle.fill")
                Text("Subscribe")
            }
            .tag(2)
            
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
        .onAppear {
            // Configure tab bar appearance for a polished look
            let appearance = UITabBarAppearance()
            appearance.configureWithDefaultBackground()
            UITabBar.appearance().scrollEdgeAppearance = appearance
        }
    }
}

#Preview {
    ContentView()
}
