import SwiftUI

struct MoreView: View {
    let baseURL: String
    
    var body: some View {
        List {
            Section {
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/about")
                        .navigationTitle("About Us")
                } label: {
                    Label("About Us", systemImage: "info.circle.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/support")
                        .navigationTitle("Support")
                } label: {
                    Label("Support", systemImage: "questionmark.circle.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/glossary")
                        .navigationTitle("Glossary")
                } label: {
                    Label("Glossary", systemImage: "textformat.abc")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/questions")
                        .navigationTitle("FAQ")
                } label: {
                    Label("FAQ", systemImage: "bubble.left.and.bubble.right.fill")
                }
            } header: {
                Text("Company")
            }
            
            Section {
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/deskview")
                        .navigationTitle("MyDeskView")
                } label: {
                    Label("MyDeskView", systemImage: "desktopcomputer")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/learnSkills365")
                        .navigationTitle("LearnSkills365")
                } label: {
                    Label("LearnSkills365", systemImage: "graduationcap.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/select-software")
                        .navigationTitle("Select Software")
                } label: {
                    Label("Select Software", systemImage: "app.badge.checkmark.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/products")
                        .navigationTitle("Products")
                } label: {
                    Label("Products", systemImage: "cube.fill")
                }
            } header: {
                Text("Software & Services")
            }
            
            Section {
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/subscription")
                        .navigationTitle("Individual Subscription")
                } label: {
                    Label("Individual Subscription", systemImage: "star.circle.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/business-pricing")
                        .navigationTitle("Business Licensing")
                } label: {
                    Label("Business Licensing", systemImage: "building.2.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/pricing")
                        .navigationTitle("Pricing")
                } label: {
                    Label("Pricing", systemImage: "tag.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/dashboard")
                        .navigationTitle("Dashboard")
                } label: {
                    Label("Dashboard", systemImage: "chart.bar.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/accounts")
                        .navigationTitle("Account")
                } label: {
                    Label("Account", systemImage: "person.circle.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/favorites")
                        .navigationTitle("Favorites")
                } label: {
                    Label("Favorites", systemImage: "heart.fill")
                }
            } header: {
                Text("Access & Subscriptions")
            }
            
            Section {
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/tech")
                        .navigationTitle("Technology")
                } label: {
                    Label("Technology", systemImage: "cpu.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/domains")
                        .navigationTitle("Domain Portfolio")
                } label: {
                    Label("Domain Portfolio", systemImage: "globe")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/timeline")
                        .navigationTitle("Timeline")
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
                } label: {
                    Label("Learning", systemImage: "lightbulb.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/sitemap")
                        .navigationTitle("Sitemap")
                } label: {
                    Label("Sitemap", systemImage: "map.fill")
                }
            } header: {
                Text("Resources")
            }
            
            Section {
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/videos")
                        .navigationTitle("Videos")
                } label: {
                    Label("Videos", systemImage: "play.rectangle.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/product-videos")
                        .navigationTitle("Product Videos")
                } label: {
                    Label("Product Videos", systemImage: "film.fill")
                }
            } header: {
                Text("Media")
            }
            
            Section {
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/documents")
                        .navigationTitle("Documents")
                } label: {
                    Label("Documents", systemImage: "doc.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/trademarks")
                        .navigationTitle("Trademarks")
                } label: {
                    Label("Trademarks", systemImage: "shield.fill")
                }
            } header: {
                Text("Documentation")
            }
            
            Section {
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/terms")
                        .navigationTitle("Terms of Use")
                } label: {
                    Label("Terms of Use", systemImage: "doc.text.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/privacy")
                        .navigationTitle("Privacy Policy")
                } label: {
                    Label("Privacy Policy", systemImage: "hand.raised.fill")
                }
                
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/content-policy")
                        .navigationTitle("Content Policy")
                } label: {
                    Label("Content Policy", systemImage: "doc.badge.gearshape.fill")
                }
            } header: {
                Text("Legal")
            }
            
            Section {
                HStack {
                    Text("Version")
                    Spacer()
                    Text("1.2.0")
                        .foregroundColor(.secondary)
                }
                
                HStack {
                    Text("Build")
                    Spacer()
                    Text("2026.2.8")
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
    }
}

#Preview {
    NavigationStack {
        MoreView(baseURL: "https://opticalautomation.com")
    }
}
