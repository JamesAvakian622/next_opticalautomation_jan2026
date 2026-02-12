import SwiftUI

// MARK: - MyDeskView Detail View (Native)
struct DeskViewDetailView: View {
    let baseURL: String
    @State private var showSoftware = false
    
    // Product data
    private let products: [(name: String, url: String, desc: String, color: Color, icon: String, features: [String])] = [
        ("MyDeskView", "www.MyDeskView.com", "Your central command center for daily workflow management and productivity.", Color(red: 0.39, green: 0.40, blue: 0.95), "square.grid.2x2.fill", ["Central Dashboard", "Widget System", "App Integrations", "Real-time Updates"]),
        ("MyPersonalOrganizer", "www.MyPersonalOrganizer.com", "Comprehensive personal life management for goals, habits, and schedules.", Color(red: 0.06, green: 0.73, blue: 0.51), "person.fill", ["Goal Tracking", "Habit Builder", "Smart Calendar", "Personal Journal"]),
        ("MyDetailBase", "www.MyDetailBase.com", "Secure structured data management for all your essential information.", Color(red: 0.96, green: 0.62, blue: 0.04), "cylinder.fill", ["Data Encryption", "Custom Fields", "Smart Search", "Document Storage"]),
        ("MyBusinessOrganizer", "www.MyBusinessOrganizer.com", "Complete business operations suite for entrepreneurs and teams.", Color(red: 0.93, green: 0.27, blue: 0.60), "briefcase.fill", ["Project Management", "Team Collaboration", "Invoicing", "Resource Planning"]),
        ("MyOneUniverse", "www.MyOneUniverse.com", "The unifying ecosystem connecting all your Optical Automation apps.", Color(red: 0.55, green: 0.36, blue: 0.96), "square.stack.3d.up.fill", ["Cross-App Sync", "Universal Search", "Unified Identity", "Seamless Handoff"]),
        ("DIY Solutions", "www.MyDeskView.com", "Home improvement and DIY project management.", Color(red: 0.97, green: 0.45, blue: 0.09), "wrench.and.screwdriver.fill", ["Project Templates", "Material Lists", "Step-by-Step Guides", "Cost Tracking"]),
        ("YouTube Videos", "www.MyDeskView.com", "Curated video content and YouTube integration.", Color(red: 0.94, green: 0.27, blue: 0.27), "play.rectangle.fill", ["Video Library", "Quick Access Menu", "Playlist Management", "Watch History"]),
        ("2026 Places", "www.MyDeskView.com", "Location tracking and management for favorite places.", Color(red: 0.06, green: 0.73, blue: 0.51), "mappin.and.ellipse", ["Location Bookmarks", "Travel Planning", "Map Integration", "Place Reviews"]),
        ("PhotoAlbums", "www.MyDeskView.com", "Photo organization and album management.", Color(red: 0.93, green: 0.27, blue: 0.60), "photo.on.rectangle.angled", ["Album Creation", "Photo Organization", "Sharing Options", "Memory Timeline"])
    ]
    
    // Integrated software categories
    private let integratedSoftware: [(category: String, items: [String])] = [
        ("Business & Finance", ["AccessMoney", "AI Trading", "AppointmentBook", "BistroRestaurant", "BusinessTracker", "CreativeTracker", "DollarDimeStore", "EmployDirectory", "EmployeeHandBook", "GasolineFinder", "InvestmentTracker", "RealEstatePortal"]),
        ("Education & Learning", ["Animals", "GrammyHistory", "GuitarBranded", "InventorsBio", "LearnSkills365", "MusiciansHallOfFame", "MyGreatRecipes", "NationalParks", "NewsChannels", "NinePlanets", "Quiz System"]),
        ("Entertainment & Leisure", ["A Snowy Christmas", "Apple M Processors", "Biographies", "CarShow YouTube", "CoolJimmy", "CorvetteQuiz", "CruiseFinder", "GoodDayMusic", "GrammyTracker", "OlympicsTracker", "OscarTracker"]),
        ("Health & Sports", ["DiseaseTracker", "Fitness Tracker", "GymnasticTracker", "Health Tracker", "HealthAidTracking", "IndyCarTracker", "MigraineTinitusTracker", "NascarTracker", "SportsTracker", "SuperBowlTracker", "TrackAndFieldTracker", "WalkTracker"]),
        ("Communication & Social", ["BillAnalyzer", "EfficiencyGenius", "Hi5", "MyTelephoneBook", "ReceiptHub", "RecipeLists", "TaskManager", "TechnologyAndTimes", "Teleprompter", "TravelBin", "WhatMovieToSee", "WhoToCall", "YearBestMovie"]),
        ("Personal Productivity", ["AirlineTracker", "BuyingAgent", "CarBuyingAgent", "DIY Solutions", "DrivingRoute", "ElectricCarAgent", "HowToAgent", "ItemBuyingAgent", "MyDateBook", "Photo Albums", "TruckBuyingAgent", "Weather", "WhereToAgent", "WhoOrWhatAgent"])
    ]
    
    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                // Header
                VStack(spacing: 12) {
                    Image(systemName: "desktopcomputer")
                        .font(.system(size: 48))
                        .foregroundStyle(
                            LinearGradient(
                                colors: [
                                    Color(red: 0.39, green: 0.40, blue: 0.95),
                                    Color(red: 0.58, green: 0.37, blue: 0.98)
                                ],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )
                    
                    Text("MyDeskView Series")
                        .font(.title2.weight(.bold))
                    
                    Text("Dashboard Information and Website System")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal, 24)
                }
                .padding(.top, 20)
                
                // Description
                VStack(alignment: .leading, spacing: 12) {
                    Text("Your Central Desktop")
                        .font(.title3.weight(.bold))
                    
                    Text("MyDeskView serves as your comprehensive dashboard for managing all aspects of your daily workflow. This powerful application brings together your most important information, tasks, and tools in one centralized location.")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .lineSpacing(4)
                    
                    Text("Software integrated inside MyDeskView allows users to enjoy built-in apps creating a practical ecosystem for your digital workspace.")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .lineSpacing(4)
                }
                .padding(.horizontal)
                
                // Products
                VStack(spacing: 14) {
                    ForEach(products.indices, id: \.self) { index in
                        let product = products[index]
                        DeskViewProductCard(
                            name: product.name,
                            url: product.url,
                            description: product.desc,
                            color: product.color,
                            icon: product.icon,
                            features: product.features
                        )
                    }
                }
                .padding(.horizontal)
                
                // Integrated Software
                DisclosureGroup(isExpanded: $showSoftware) {
                    VStack(spacing: 12) {
                        ForEach(integratedSoftware, id: \.category) { group in
                            VStack(alignment: .leading, spacing: 8) {
                                Text(group.category)
                                    .font(.caption.weight(.bold))
                                    .foregroundColor(Color(red: 0.39, green: 0.40, blue: 0.95))
                                    .padding(.horizontal, 10)
                                    .padding(.vertical, 4)
                                    .background(Color(red: 0.39, green: 0.40, blue: 0.95).opacity(0.1))
                                    .clipShape(Capsule())
                                
                                LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 6) {
                                    ForEach(group.items, id: \.self) { item in
                                        HStack(spacing: 6) {
                                            Image(systemName: "checkmark.circle.fill")
                                                .font(.system(size: 10))
                                                .foregroundColor(.green)
                                            Text(item)
                                                .font(.caption)
                                                .foregroundColor(.secondary)
                                            Spacer()
                                        }
                                    }
                                }
                            }
                            .padding(12)
                            .background(Color(.tertiarySystemBackground))
                            .clipShape(RoundedRectangle(cornerRadius: 12))
                        }
                    }
                    .padding(.top, 8)
                } label: {
                    HStack(spacing: 8) {
                        Image(systemName: "app.badge.checkmark.fill")
                            .foregroundColor(Color(red: 0.39, green: 0.40, blue: 0.95))
                        Text("Integrated Software (\(integratedSoftware.flatMap(\.items).count) Apps)")
                            .font(.headline)
                    }
                }
                .padding()
                .background(Color(.secondarySystemBackground))
                .clipShape(RoundedRectangle(cornerRadius: 14))
                .padding(.horizontal)
                
                // View on Web
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/deskview")
                        .navigationTitle("MyDeskView")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    HStack(spacing: 8) {
                        Image(systemName: "safari.fill")
                        Text("View Full DeskView on Web")
                            .fontWeight(.semibold)
                    }
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 14)
                    .background(
                        LinearGradient(
                            colors: [Color(red: 0.39, green: 0.40, blue: 0.95), Color(red: 0.58, green: 0.37, blue: 0.98)],
                            startPoint: .leading, endPoint: .trailing
                        )
                    )
                    .clipShape(RoundedRectangle(cornerRadius: 14))
                }
                .padding(.horizontal)
                .padding(.bottom, 24)
            }
        }
        .navigationTitle("MyDeskView")
        .navigationBarTitleDisplayMode(.large)
        .toolbar {
            ToolbarItem(placement: .navigationBarLeading) {
                Image("Logo")
                    .resizable()
                    .scaledToFit()
                    .frame(width: 24, height: 24)
                    .clipShape(RoundedRectangle(cornerRadius: 5))
            }
        }
    }
}

// MARK: - DeskView Product Card
struct DeskViewProductCard: View {
    let name: String
    let url: String
    let description: String
    let color: Color
    let icon: String
    let features: [String]
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Image(systemName: icon)
                    .font(.title2)
                    .foregroundColor(color)
                    .frame(width: 44, height: 44)
                    .background(color.opacity(0.15))
                    .clipShape(RoundedRectangle(cornerRadius: 10))
                
                VStack(alignment: .leading, spacing: 2) {
                    Text(name)
                        .font(.headline)
                    Text(url)
                        .font(.caption)
                        .foregroundColor(color)
                }
                
                Spacer()
                
                Text("Active")
                    .font(.system(size: 10, weight: .bold))
                    .foregroundColor(.green)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 3)
                    .background(Color.green.opacity(0.15))
                    .clipShape(Capsule())
            }
            
            Text(description)
                .font(.caption)
                .foregroundColor(.secondary)
                .lineSpacing(2)
            
            Divider()
            
            HStack(spacing: 0) {
                ForEach(features, id: \.self) { feature in
                    HStack(spacing: 4) {
                        Image(systemName: "checkmark.circle.fill")
                            .font(.system(size: 10))
                            .foregroundColor(color)
                        Text(feature)
                            .font(.system(size: 10))
                            .foregroundColor(.secondary)
                    }
                    if feature != features.last {
                        Spacer()
                    }
                }
            }
        }
        .padding(16)
        .background(Color(.systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 14))
        .overlay(
            RoundedRectangle(cornerRadius: 14)
                .stroke(Color(.separator).opacity(0.3), lineWidth: 1)
        )
    }
}

#Preview {
    NavigationStack {
        DeskViewDetailView(baseURL: "https://opticalautomation.com")
    }
}
