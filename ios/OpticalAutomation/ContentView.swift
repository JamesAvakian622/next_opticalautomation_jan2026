import SwiftUI

struct ContentView: View {
    @EnvironmentObject var themeManager: ThemeManager
    @State private var selectedTab = 0
    
    // Production URL
    private let baseURL = "https://opticalautomation.com"
    
    var body: some View {
        TabView(selection: $selectedTab) {
            // Home Tab
            NavigationStack {
                HomeView(baseURL: baseURL)
            }
            .tabItem {
                Image(systemName: "house.fill")
                Text("Home")
            }
            .tag(0)
            
            // Videos Tab
            NavigationStack {
                ProductVideosView()
            }
            .tabItem {
                Image(systemName: "play.rectangle.fill")
                Text("Videos")
            }
            .tag(1)
            
            // Portfolio Tab
            NavigationStack {
                PortfolioView(baseURL: baseURL)
            }
            .tabItem {
                Image(systemName: "square.grid.2x2.fill")
                Text("Portfolio")
            }
            .tag(2)
            
            // Subscribe Tab
            NavigationStack {
                SubscriptionView(baseURL: baseURL)
            }
            .tabItem {
                Image(systemName: "star.circle.fill")
                Text("Subscribe")
            }
            .tag(3)
            
            // More Tab
            NavigationStack {
                MoreView(baseURL: baseURL)
                    .environmentObject(themeManager)
            }
            .tabItem {
                Image(systemName: "ellipsis.circle.fill")
                Text("More")
            }
            .tag(4)
        }
        .tint(themeManager.accentColor)
        .onAppear {
            configureTabBarAppearance()
        }
    }
    
    private func configureTabBarAppearance() {
        let appearance = UITabBarAppearance()
        appearance.configureWithDefaultBackground()
        appearance.backgroundColor = UIColor.systemBackground.withAlphaComponent(0.95)
        
        let blurEffect = UIBlurEffect(style: .systemMaterial)
        appearance.backgroundEffect = blurEffect
        
        UITabBar.appearance().standardAppearance = appearance
        UITabBar.appearance().scrollEdgeAppearance = appearance
        
        // Navigation bar appearance
        let navAppearance = UINavigationBarAppearance()
        navAppearance.configureWithDefaultBackground()
        UINavigationBar.appearance().standardAppearance = navAppearance
        UINavigationBar.appearance().scrollEdgeAppearance = navAppearance
    }
}

#Preview {
    ContentView()
        .environmentObject(ThemeManager())
}
