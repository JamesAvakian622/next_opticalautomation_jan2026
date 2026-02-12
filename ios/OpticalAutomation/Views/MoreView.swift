import SwiftUI

struct MoreView: View {
    @EnvironmentObject var themeManager: ThemeManager
    let baseURL: String
    
    var body: some View {
        List {
            // Profile / Account Header
            Section {
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/login")
                        .navigationTitle("Sign In")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    HStack(spacing: 14) {
                        ZStack {
                            Circle()
                                .fill(
                                    LinearGradient(
                                        colors: [
                                            Color(red: 0.39, green: 0.40, blue: 0.95),
                                            Color(red: 0.58, green: 0.37, blue: 0.98)
                                        ],
                                        startPoint: .topLeading,
                                        endPoint: .bottomTrailing
                                    )
                                )
                                .frame(width: 52, height: 52)
                            
                            Image(systemName: "person.fill")
                                .font(.title3)
                                .foregroundColor(.white)
                        }
                        
                        VStack(alignment: .leading, spacing: 3) {
                            Text("Sign In")
                                .font(.headline)
                            Text("Access your account & subscriptions")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                    }
                    .padding(.vertical, 4)
                }
            }
            
            // Company Section
            Section {
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/about")
                        .navigationTitle("About Us")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("About Us", systemImage: "info.circle.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/support")
                        .navigationTitle("Support")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("Support", systemImage: "questionmark.circle.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/glossary")
                        .navigationTitle("Glossary")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("Glossary", systemImage: "textformat.abc")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/questions")
                        .navigationTitle("FAQ")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("FAQ", systemImage: "bubble.left.and.bubble.right.fill")
                }
            } header: {
                Text("Company")
            }
            
            // Software & Services
            Section {
                NavigationLink {
                    DeskViewDetailView(baseURL: baseURL)
                } label: {
                    Label("MyDeskView", systemImage: "desktopcomputer")
                }
                
                NavigationLink {
                    LearnSkillsView(baseURL: baseURL)
                } label: {
                    Label("LearnSkills365", systemImage: "graduationcap.fill")
                }
                
                NavigationLink {
                    SelectSoftwareView(baseURL: baseURL)
                } label: {
                    Label("Select Software", systemImage: "app.badge.checkmark.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/products")
                        .navigationTitle("Products")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("Products", systemImage: "cube.fill")
                }
            } header: {
                Text("Software & Services")
            }
            
            // MyDeskView Section
            Section {
                NavigationLink {
                    DeskViewDetailView(baseURL: baseURL)
                } label: {
                    Label("MyDeskView Dashboard", systemImage: "desktopcomputer")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/deskview")
                        .navigationTitle("MyDeskView.com")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("MyDeskView.com", systemImage: "globe")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/deskview")
                        .navigationTitle("DeskView Web")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("DeskView Web Page", systemImage: "safari.fill")
                }
            } header: {
                Text("MyDeskView")
            }
            
            // Apps Section  
            Section {
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/app-portfolio")
                        .navigationTitle("App Portfolio")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("App Portfolio", systemImage: "apps.iphone")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/portfolio")
                        .navigationTitle("Full Portfolio")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("Full Portfolio", systemImage: "square.grid.2x2.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/apps")
                        .navigationTitle("Our Apps")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("Our Apps", systemImage: "app.badge.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/ios-app")
                        .navigationTitle("iOS App")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("iOS App", systemImage: "apple.logo")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/android-app")
                        .navigationTitle("Android App")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("Android App", systemImage: "phone.fill")
                }
            } header: {
                Text("Apps")
            }
            
            // Access & Subscriptions
            Section {
                NavigationLink {
                    SubscriptionView(baseURL: baseURL)
                } label: {
                    Label("Individual Subscription", systemImage: "star.circle.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/business-pricing")
                        .navigationTitle("Business Licensing")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("Business Licensing", systemImage: "building.2.fill")
                }
                
                NavigationLink {
                    PricingView(baseURL: baseURL)
                } label: {
                    Label("Pricing", systemImage: "tag.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/dashboard")
                        .navigationTitle("Dashboard")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("Dashboard", systemImage: "chart.bar.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/accounts")
                        .navigationTitle("Account")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("Account", systemImage: "person.circle.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/favorites")
                        .navigationTitle("Favorites")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("Favorites", systemImage: "heart.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/profile")
                        .navigationTitle("Profile")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("Profile", systemImage: "person.text.rectangle.fill")
                }
            } header: {
                Text("Access & Subscriptions")
            }
            
            // Resources
            Section {
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/tech")
                        .navigationTitle("Technology")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("Technology", systemImage: "cpu.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/domains")
                        .navigationTitle("Domain Portfolio")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("Domain Portfolio", systemImage: "globe")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/timeline")
                        .navigationTitle("Timeline")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("Timeline", systemImage: "calendar")
                }
                
                NavigationLink {
                    GuidesView()
                } label: {
                    Label("IP Guides", systemImage: "book.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/learning")
                        .navigationTitle("Learning")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("Learning", systemImage: "lightbulb.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/guides")
                        .navigationTitle("Guides")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("Guides", systemImage: "text.book.closed.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/sitemap")
                        .navigationTitle("Sitemap")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("Sitemap", systemImage: "map.fill")
                }
            } header: {
                Text("Resources")
            }
            
            // Media
            Section {
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/videos")
                        .navigationTitle("Videos")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("Videos", systemImage: "play.rectangle.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/product-videos")
                        .navigationTitle("Product Videos")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("Product Videos", systemImage: "film.fill")
                }
            } header: {
                Text("Media")
            }
            
            // Documentation
            Section {
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/documents")
                        .navigationTitle("Documents")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("Documents", systemImage: "doc.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/trademarks")
                        .navigationTitle("Trademarks")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("Trademarks", systemImage: "shield.fill")
                }
            } header: {
                Text("Documentation")
            }
            
            // Authentication
            Section {
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/login")
                        .navigationTitle("Login")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("Login", systemImage: "arrow.right.circle.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/register")
                        .navigationTitle("Register")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("Register", systemImage: "person.badge.plus")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/forgot-password")
                        .navigationTitle("Reset Password")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("Reset Password", systemImage: "key.fill")
                }
            } header: {
                Text("Account")
            }
            
            // Legal
            Section {
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/terms")
                        .navigationTitle("Terms of Use")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("Terms of Use", systemImage: "doc.text.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/privacy")
                        .navigationTitle("Privacy Policy")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("Privacy Policy", systemImage: "hand.raised.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/content-policy")
                        .navigationTitle("Content Policy")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Label("Content Policy", systemImage: "doc.badge.gearshape.fill")
                }
            } header: {
                Text("Legal")
            }
            
            // Settings
            Section {
                NavigationLink {
                    SettingsView()
                        .environmentObject(themeManager)
                } label: {
                    Label("Settings", systemImage: "gearshape.fill")
                }
            }
            
            // App Info
            Section {
                HStack {
                    Text("Version")
                    Spacer()
                    Text("2.0.0")
                        .foregroundColor(.secondary)
                }
                
                HStack {
                    Text("Build")
                    Spacer()
                    Text("2026.2.11")
                        .foregroundColor(.secondary)
                }
                
                HStack {
                    Text("Platform")
                    Spacer()
                    Text("iOS / iPadOS")
                        .foregroundColor(.secondary)
                }
            } header: {
                Text("App Info")
            }
        }
        .navigationTitle("More")
        .navigationBarTitleDisplayMode(.large)
        .toolbar {
            ToolbarItem(placement: .navigationBarTrailing) {
                NavigationLink {
                    SettingsView()
                        .environmentObject(themeManager)
                } label: {
                    Image(systemName: "gearshape.fill")
                        .font(.body)
                }
            }
        }
    }
}

#Preview {
    NavigationStack {
        MoreView(baseURL: "https://opticalautomation.com")
            .environmentObject(ThemeManager())
    }
}
