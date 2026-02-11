import SwiftUI

// MARK: - DeskView Main
struct DeskViewView: View {
    let baseURL: String
    @State private var selectedCategory = "All"
    
    private let categories = ["All", "Core Apps", "Business", "Education", "Entertainment", "Health", "Productivity"]
    
    private let coreProducts: [DeskViewProduct] = [
        DeskViewProduct(name: "MyDeskView", subtitle: "Central Dashboard", description: "Your central command center for daily workflow management and productivity.", icon: "desktopcomputer", color: Color(red: 0.39, green: 0.40, blue: 0.95), features: ["Widget System", "App Integrations", "Real-time Updates", "Central Dashboard"], url: "https://mydeskview.com", category: "Core Apps"),
        DeskViewProduct(name: "MyPersonalOrganizer", subtitle: "Personal Management", description: "Comprehensive personal life management for goals, habits, and schedules.", icon: "person.fill", color: Color(red: 0.06, green: 0.73, blue: 0.51), features: ["Goal Tracking", "Habit Builder", "Smart Calendar", "Personal Journal"], url: "https://mydeskview.com", category: "Core Apps"),
        DeskViewProduct(name: "MyDetailBase", subtitle: "Data Management", description: "Secure structured data management for all your essential information.", icon: "cylinder.fill", color: Color(red: 0.96, green: 0.62, blue: 0.04), features: ["Data Encryption", "Custom Fields", "Smart Search", "Document Storage"], url: "https://mydeskview.com", category: "Core Apps"),
        DeskViewProduct(name: "MyBusinessOrganizer", subtitle: "Business Suite", description: "Complete business operations suite for entrepreneurs and teams.", icon: "briefcase.fill", color: Color(red: 0.93, green: 0.27, blue: 0.60), features: ["Project Management", "Team Collaboration", "Invoicing", "Resource Planning"], url: "https://mydeskview.com", category: "Core Apps"),
        DeskViewProduct(name: "MyOneUniverse", subtitle: "Unified Ecosystem", description: "The unifying ecosystem connecting all your Optical Automation apps.", icon: "circle.hexagongrid.fill", color: Color(red: 0.55, green: 0.36, blue: 0.96), features: ["Cross-App Sync", "Universal Search", "Unified Identity", "Seamless Handoff"], url: "https://mydeskview.com", category: "Core Apps"),
        DeskViewProduct(name: "DIY Solutions", subtitle: "Home Improvement", description: "Home improvement and DIY project management integrated into your desktop.", icon: "hammer.fill", color: Color(red: 0.98, green: 0.45, blue: 0.09), features: ["Project Templates", "Material Lists", "Step-by-Step Guides", "Cost Tracking"], url: "https://mydeskview.com", category: "Core Apps"),
        DeskViewProduct(name: "YouTube Videos", subtitle: "Video Library", description: "Curated video content and YouTube integration with assignable movies.", icon: "play.rectangle.fill", color: Color(red: 0.94, green: 0.27, blue: 0.27), features: ["Video Library", "Quick Access Menu", "Playlist Management", "Watch History"], url: "https://mydeskview.com", category: "Core Apps"),
        DeskViewProduct(name: "2026 Places", subtitle: "Location Manager", description: "Location tracking and management for your favorite places and destinations.", icon: "mappin.circle.fill", color: Color(red: 0.06, green: 0.73, blue: 0.51), features: ["Location Bookmarks", "Travel Planning", "Map Integration", "Place Reviews"], url: "https://mydeskview.com", category: "Core Apps"),
        DeskViewProduct(name: "PhotoAlbums", subtitle: "Photo Manager", description: "Photo organization and album management for your digital memories.", icon: "photo.fill.on.rectangle.fill", color: Color(red: 0.93, green: 0.27, blue: 0.60), features: ["Album Creation", "Photo Organization", "Sharing Options", "Memory Timeline"], url: "https://mydeskview.com", category: "Core Apps")
    ]

    private let integratedApps: [DeskViewProduct] = [
        // Business & Finance
        DeskViewProduct(name: "AccessMoney", subtitle: "Finance", description: "Financial access and money management.", icon: "dollarsign.circle.fill", color: Color(red: 0.06, green: 0.73, blue: 0.51), features: ["Account Tracking", "Budgeting", "Reports"], url: "https://mydeskview.com", category: "Business"),
        DeskViewProduct(name: "AI Trading", subtitle: "Investments", description: "AI-powered trading and investment analysis.", icon: "chart.line.uptrend.xyaxis", color: Color(red: 0.39, green: 0.40, blue: 0.95), features: ["Market Analysis", "AI Predictions", "Portfolio View"], url: "https://mydeskview.com", category: "Business"),
        DeskViewProduct(name: "AppointmentBook", subtitle: "Scheduling", description: "Appointment scheduling and booking management.", icon: "calendar.badge.clock", color: Color(red: 0.96, green: 0.62, blue: 0.04), features: ["Booking Calendar", "Reminders", "Client Notes"], url: "https://mydeskview.com", category: "Business"),
        DeskViewProduct(name: "BistroRestaurant", subtitle: "Restaurant Mgmt", description: "Restaurant management and ordering platform.", icon: "fork.knife", color: Color(red: 0.94, green: 0.27, blue: 0.27), features: ["Menu Builder", "Order Tracking", "Table Mgmt"], url: "https://mydeskview.com", category: "Business"),
        DeskViewProduct(name: "BusinessTracker", subtitle: "Analytics", description: "Business performance tracking and analytics.", icon: "chart.pie.fill", color: Color(red: 0.55, green: 0.36, blue: 0.96), features: ["KPI Dashboard", "Reports", "Trend Analysis"], url: "https://mydeskview.com", category: "Business"),
        DeskViewProduct(name: "InvestmentTracker", subtitle: "Portfolio", description: "Investment portfolio tracking and performance.", icon: "chart.line.uptrend.xyaxis.circle.fill", color: Color(red: 0.06, green: 0.73, blue: 0.51), features: ["Portfolio View", "P&L Tracking", "Alerts"], url: "https://mydeskview.com", category: "Business"),
        DeskViewProduct(name: "RealEstatePortal", subtitle: "Properties", description: "Real estate listing and property management.", icon: "building.2.fill", color: Color(red: 0.39, green: 0.40, blue: 0.95), features: ["Listings", "Property Search", "Comparisons"], url: "https://mydeskview.com", category: "Business"),
        
        // Education & Learning
        DeskViewProduct(name: "LearnSkills365", subtitle: "Daily Learning", description: "Interactive learning for Math, Reading, Writing and more.", icon: "graduationcap.fill", color: Color(red: 0.96, green: 0.62, blue: 0.04), features: ["Math", "Reading", "Writing", "Quizzes"], url: "https://learnskills365.com", category: "Education"),
        DeskViewProduct(name: "Animals", subtitle: "Encyclopedia", description: "Educational animal encyclopedia and learning resource.", icon: "hare.fill", color: Color(red: 0.06, green: 0.73, blue: 0.51), features: ["Species Info", "Habitats", "Fun Facts"], url: "https://mydeskview.com", category: "Education"),
        DeskViewProduct(name: "NationalParks", subtitle: "U.S. Parks", description: "Guide to U.S. National Parks with maps and info.", icon: "mountain.2.fill", color: Color(red: 0.06, green: 0.73, blue: 0.51), features: ["Park Guides", "Maps", "Activities"], url: "https://mydeskview.com", category: "Education"),
        DeskViewProduct(name: "NinePlanets", subtitle: "Solar System", description: "Solar system exploration and planetary science.", icon: "globe.americas.fill", color: Color(red: 0.55, green: 0.36, blue: 0.96), features: ["Planet Data", "Space Facts", "Orbit Info"], url: "https://mydeskview.com", category: "Education"),
        DeskViewProduct(name: "Quiz System", subtitle: "Knowledge Tests", description: "Interactive quiz platform for knowledge testing.", icon: "questionmark.diamond.fill", color: Color(red: 0.96, green: 0.62, blue: 0.04), features: ["Multiple Topics", "Score Tracking", "Leaderboard"], url: "https://mydeskview.com", category: "Education"),
        
        // Entertainment & Leisure
        DeskViewProduct(name: "GoodDayMusic", subtitle: "Music Discovery", description: "Music discovery and playlist management.", icon: "music.note.list", color: Color(red: 0.06, green: 0.73, blue: 0.51), features: ["Playlist Builder", "Genre Browse", "Artist Info"], url: "https://mydeskview.com", category: "Entertainment"),
        DeskViewProduct(name: "OscarTracker", subtitle: "Academy Awards", description: "Interactive Academy Awards history and tracking.", icon: "trophy.fill", color: Color(red: 0.96, green: 0.62, blue: 0.04), features: ["Award History", "Nominees", "Predictions"], url: "https://mydeskview.com", category: "Entertainment"),
        DeskViewProduct(name: "GrammyTracker", subtitle: "Music Awards", description: "Interactive history of Grammy Awards.", icon: "music.mic.circle.fill", color: Color(red: 0.96, green: 0.62, blue: 0.04), features: ["Award History", "Artist Details", "Categories"], url: "https://mydeskview.com", category: "Entertainment"),
        DeskViewProduct(name: "CruiseFinder", subtitle: "Cruise Vacations", description: "Cruise vacation search and discovery.", icon: "ferry.fill", color: Color(red: 0.05, green: 0.65, blue: 0.88), features: ["Ship Search", "Itineraries", "Reviews"], url: "https://mydeskview.com", category: "Entertainment"),

        // Health
        DeskViewProduct(name: "FitnessTracker", subtitle: "Fitness", description: "Fitness activity tracking and workout management.", icon: "figure.run", color: Color(red: 0.06, green: 0.73, blue: 0.51), features: ["Workout Logs", "Step Counter", "Goals"], url: "https://mydeskview.com", category: "Health"),
        DeskViewProduct(name: "HealthTracker", subtitle: "Wellness", description: "Comprehensive health monitoring and wellness tracking.", icon: "heart.fill", color: Color(red: 0.93, green: 0.27, blue: 0.60), features: ["Vital Signs", "Sleep Tracking", "Nutrition"], url: "https://mydeskview.com", category: "Health"),
        DeskViewProduct(name: "WalkTracker", subtitle: "Walking", description: "Walking activity tracker with distance counting.", icon: "figure.walk", color: Color(red: 0.05, green: 0.65, blue: 0.88), features: ["Route Recording", "Distance", "Pace"], url: "https://mydeskview.com", category: "Health"),
        
        // Productivity
        DeskViewProduct(name: "TaskManager", subtitle: "Tasks", description: "Task management and productivity tracking.", icon: "checklist", color: Color(red: 0.55, green: 0.36, blue: 0.96), features: ["Task Lists", "Due Dates", "Priority Levels"], url: "https://mydeskview.com", category: "Productivity"),
        DeskViewProduct(name: "MyDateBook", subtitle: "Calendar", description: "Personal date and event management.", icon: "calendar", color: Color(red: 0.55, green: 0.36, blue: 0.96), features: ["Event Planning", "Reminders", "Notes"], url: "https://mydeskview.com", category: "Productivity"),
        DeskViewProduct(name: "Teleprompter", subtitle: "Presentation", description: "Digital teleprompter for presentations.", icon: "text.viewfinder", color: Color(red: 0.93, green: 0.27, blue: 0.60), features: ["Auto-Scroll", "Speed Control", "Text Import"], url: "https://mydeskview.com", category: "Productivity"),
        DeskViewProduct(name: "BuyingAgent", subtitle: "Shopping", description: "Smart shopping and price comparison tool.", icon: "cart.fill", color: Color(red: 0.06, green: 0.73, blue: 0.51), features: ["Price Compare", "Wish Lists", "Deal Alerts"], url: "https://mydeskview.com", category: "Productivity"),
    ]
    
    var filteredProducts: [DeskViewProduct] {
        let allProducts = coreProducts + integratedApps
        if selectedCategory == "All" { return allProducts }
        return allProducts.filter { $0.category == selectedCategory }
    }
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                // Hero Section
                ZStack {
                    LinearGradient(
                        colors: [
                            Color(red: 0.39, green: 0.40, blue: 0.95),
                            Color(red: 0.58, green: 0.37, blue: 0.98),
                            Color(red: 0.39, green: 0.40, blue: 0.95).opacity(0.8)
                        ],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                    
                    VStack(spacing: 16) {
                        Image("Logo")
                            .resizable()
                            .scaledToFit()
                            .frame(width: 64, height: 64)
                            .clipShape(RoundedRectangle(cornerRadius: 14))
                            .shadow(color: .black.opacity(0.3), radius: 10)
                        
                        Text("MyDeskView")
                            .font(.system(size: 32, weight: .bold, design: .rounded))
                            .foregroundColor(.white)
                        
                        Text("Desktop Productivity Suite")
                            .font(.subheadline)
                            .foregroundColor(.white.opacity(0.85))
                        
                        Text("27+ integrated applications across 6 categories")
                            .font(.caption)
                            .foregroundColor(.white.opacity(0.7))
                            .padding(.top, 2)
                    }
                    .padding(.vertical, 32)
                }
                
                // Category Filter
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 10) {
                        ForEach(categories, id: \.self) { category in
                            Button(action: {
                                withAnimation(.spring(response: 0.3)) {
                                    selectedCategory = category
                                }
                            }) {
                                Text(category)
                                    .font(.subheadline.weight(.semibold))
                                    .foregroundColor(selectedCategory == category ? .white : .primary)
                                    .padding(.horizontal, 16)
                                    .padding(.vertical, 8)
                                    .background(
                                        selectedCategory == category
                                            ? AnyShapeStyle(LinearGradient(colors: [Color(red: 0.39, green: 0.40, blue: 0.95), Color(red: 0.58, green: 0.37, blue: 0.98)], startPoint: .leading, endPoint: .trailing))
                                            : AnyShapeStyle(Color(.secondarySystemBackground))
                                    )
                                    .clipShape(Capsule())
                            }
                        }
                    }
                    .padding(.horizontal)
                    .padding(.vertical, 14)
                }
                
                // Stats Bar
                HStack(spacing: 0) {
                    DeskViewStatItem(value: "27+", label: "Apps")
                    DeskViewStatItem(value: "6", label: "Categories")
                    DeskViewStatItem(value: "100+", label: "Features")
                    DeskViewStatItem(value: "24/7", label: "Access")
                }
                .padding(.vertical, 12)
                .background(Color(.secondarySystemBackground))
                
                // Product Grid
                LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 14) {
                    ForEach(filteredProducts) { product in
                        DeskViewProductCard(product: product, baseURL: baseURL)
                    }
                }
                .padding()
                .animation(.spring(response: 0.4), value: selectedCategory)
                
                // Web CTA
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/deskview")
                        .navigationTitle("MyDeskView Web")
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
        .navigationBarTitleDisplayMode(.inline)
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

// MARK: - DeskView Product Model
struct DeskViewProduct: Identifiable {
    let id = UUID()
    let name: String
    let subtitle: String
    let description: String
    let icon: String
    let color: Color
    let features: [String]
    let url: String
    let category: String
}

// MARK: - DeskView Stat Item
struct DeskViewStatItem: View {
    let value: String
    let label: String
    
    var body: some View {
        VStack(spacing: 2) {
            Text(value)
                .font(.system(size: 18, weight: .bold, design: .rounded))
                .foregroundStyle(
                    LinearGradient(
                        colors: [Color(red: 0.39, green: 0.40, blue: 0.95), Color(red: 0.58, green: 0.37, blue: 0.98)],
                        startPoint: .leading, endPoint: .trailing
                    )
                )
            Text(label)
                .font(.system(size: 10))
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity)
    }
}

// MARK: - DeskView Product Card
struct DeskViewProductCard: View {
    let product: DeskViewProduct
    let baseURL: String
    
    var body: some View {
        NavigationLink {
            WebViewContainer(urlString: product.url)
                .navigationTitle(product.name)
                .navigationBarTitleDisplayMode(.inline)
        } label: {
            VStack(alignment: .leading, spacing: 8) {
                // Icon & Name
                HStack(spacing: 10) {
                    ZStack {
                        RoundedRectangle(cornerRadius: 10)
                            .fill(product.color.opacity(0.15))
                            .frame(width: 40, height: 40)
                        
                        Image(systemName: product.icon)
                            .font(.system(size: 18))
                            .foregroundColor(product.color)
                    }
                    
                    VStack(alignment: .leading, spacing: 2) {
                        Text(product.name)
                            .font(.system(size: 13, weight: .bold))
                            .foregroundColor(.primary)
                            .lineLimit(1)
                        
                        Text(product.subtitle)
                            .font(.system(size: 10))
                            .foregroundColor(.secondary)
                    }
                }
                
                Text(product.description)
                    .font(.system(size: 11))
                    .foregroundColor(.secondary)
                    .lineLimit(2)
                    .multilineTextAlignment(.leading)
                
                // Features chips
                FlowLayout(spacing: 4) {
                    ForEach(product.features.prefix(3), id: \.self) { feature in
                        Text(feature)
                            .font(.system(size: 9, weight: .medium))
                            .foregroundColor(product.color)
                            .padding(.horizontal, 6)
                            .padding(.vertical, 3)
                            .background(product.color.opacity(0.1))
                            .clipShape(Capsule())
                    }
                }
            }
            .padding(12)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Color(.systemBackground))
            .clipShape(RoundedRectangle(cornerRadius: 14))
            .overlay(
                RoundedRectangle(cornerRadius: 14)
                    .stroke(Color(.separator).opacity(0.3), lineWidth: 1)
            )
        }
    }
}

// MARK: - Flow Layout
struct FlowLayout: Layout {
    var spacing: CGFloat
    
    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        let result = computeLayout(proposal: proposal, subviews: subviews)
        return result.size
    }
    
    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        let result = computeLayout(proposal: ProposedViewSize(width: bounds.width, height: bounds.height), subviews: subviews)
        for (index, subview) in subviews.enumerated() {
            let point = result.positions[index]
            subview.place(at: CGPoint(x: bounds.minX + point.x, y: bounds.minY + point.y), proposal: .unspecified)
        }
    }
    
    private func computeLayout(proposal: ProposedViewSize, subviews: Subviews) -> (size: CGSize, positions: [CGPoint]) {
        var positions: [CGPoint] = []
        var currentX: CGFloat = 0
        var currentY: CGFloat = 0
        var lineHeight: CGFloat = 0
        let maxWidth = proposal.width ?? .infinity
        
        for subview in subviews {
            let size = subview.sizeThatFits(.unspecified)
            if currentX + size.width > maxWidth && currentX > 0 {
                currentX = 0
                currentY += lineHeight + spacing
                lineHeight = 0
            }
            positions.append(CGPoint(x: currentX, y: currentY))
            currentX += size.width + spacing
            lineHeight = max(lineHeight, size.height)
        }
        
        let totalHeight = currentY + lineHeight
        return (CGSize(width: maxWidth, height: totalHeight), positions)
    }
}

#Preview {
    NavigationStack {
        DeskViewView(baseURL: "https://opticalautomation.com")
    }
}
