import SwiftUI

// MARK: - Portfolio View
struct PortfolioView: View {
    let baseURL: String
    @State private var selectedTab = 0
    
    private let tabs = ["Next.JS", "MERN", "SwiftUI", "Android"]
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                // Hero Section
                ZStack {
                    LinearGradient(
                        colors: [
                            Color(red: 0.39, green: 0.40, blue: 0.95),
                            Color(red: 0.58, green: 0.37, blue: 0.98)
                        ],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                    
                    // Decorative circles
                    Circle()
                        .fill(.white.opacity(0.05))
                        .frame(width: 200, height: 200)
                        .offset(x: -100, y: -50)
                    
                    Circle()
                        .fill(.white.opacity(0.08))
                        .frame(width: 150, height: 150)
                        .offset(x: 120, y: 60)
                    
                    VStack(spacing: 14) {
                        Image("Logo")
                            .resizable()
                            .scaledToFit()
                            .frame(width: 72, height: 72)
                            .clipShape(RoundedRectangle(cornerRadius: 16))
                            .shadow(color: .black.opacity(0.3), radius: 15)
                        
                        Text("Portfolio")
                            .font(.system(size: 36, weight: .bold, design: .rounded))
                            .foregroundColor(.white)
                        
                        Text("Software development across Next.JS, MERN Stack, SwiftUI, and Android platforms.")
                            .font(.subheadline)
                            .foregroundColor(.white.opacity(0.85))
                            .multilineTextAlignment(.center)
                            .padding(.horizontal, 32)
                    }
                    .padding(.vertical, 36)
                }
                
                // Tab Selector
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 8) {
                        ForEach(tabs.indices, id: \.self) { index in
                            Button(action: {
                                withAnimation(.spring(response: 0.3)) {
                                    selectedTab = index
                                }
                            }) {
                                HStack(spacing: 6) {
                                    Image(systemName: tabIcon(for: index))
                                        .font(.system(size: 14))
                                    Text(tabs[index])
                                        .font(.subheadline.weight(.semibold))
                                }
                                .foregroundColor(selectedTab == index ? .white : .primary)
                                .padding(.horizontal, 18)
                                .padding(.vertical, 10)
                                .background(
                                    selectedTab == index
                                        ? AnyShapeStyle(tabGradient(for: index))
                                        : AnyShapeStyle(Color(.secondarySystemBackground))
                                )
                                .clipShape(RoundedRectangle(cornerRadius: 12))
                                .shadow(color: selectedTab == index ? tabColor(for: index).opacity(0.3) : .clear, radius: 6, y: 3)
                            }
                        }
                    }
                    .padding()
                }
                .background(Color(.systemBackground))
                
                // Project Cards
                LazyVStack(spacing: 16) {
                    ForEach(projectsForTab(selectedTab)) { project in
                        PortfolioProjectCard(project: project, baseURL: baseURL)
                    }
                }
                .padding()
                .animation(.spring(response: 0.4), value: selectedTab)
                
                // View on Web Link
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/portfolio")
                        .navigationTitle("Full Portfolio")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    HStack(spacing: 8) {
                        Image(systemName: "safari.fill")
                        Text("View Full Portfolio on Web")
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
                .padding(.bottom, 8)
                
                // App Portfolio Link
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/app-portfolio")
                        .navigationTitle("App Portfolio")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    HStack {
                        Image(systemName: "apps.iphone")
                            .font(.title2)
                            .foregroundColor(Color(red: 0.39, green: 0.40, blue: 0.95))
                        VStack(alignment: .leading, spacing: 2) {
                            Text("App Portfolio")
                                .font(.subheadline.weight(.semibold))
                            Text("View our iOS & Android mobile apps")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                        Spacer()
                        Image(systemName: "chevron.right")
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }
                    .foregroundColor(.primary)
                    .padding()
                    .background(Color(.secondarySystemBackground))
                    .clipShape(RoundedRectangle(cornerRadius: 14))
                }
                .padding(.horizontal)
                .padding(.bottom, 24)
            }
        }
        .navigationTitle("Portfolio")
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
    
    private func tabIcon(for index: Int) -> String {
        switch index {
        case 0: return "chevron.left.forwardslash.chevron.right"
        case 1: return "server.rack"
        case 2: return "swift"
        case 3: return "phone.fill"
        default: return "app.fill"
        }
    }
    
    private func tabColor(for index: Int) -> Color {
        switch index {
        case 0: return Color(red: 0.38, green: 0.85, blue: 0.98)
        case 1: return Color(red: 0.41, green: 0.63, blue: 0.39)
        case 2: return Color(red: 0.94, green: 0.32, blue: 0.22)
        case 3: return Color(red: 0.38, green: 0.85, blue: 0.98)
        default: return .blue
        }
    }
    
    private func tabGradient(for index: Int) -> LinearGradient {
        switch index {
        case 0: return LinearGradient(colors: [Color(red: 0.38, green: 0.85, blue: 0.98), Color(red: 0.00, green: 0.44, blue: 0.95)], startPoint: .leading, endPoint: .trailing)
        case 1: return LinearGradient(colors: [Color(red: 0.41, green: 0.63, blue: 0.39), Color(red: 0.25, green: 0.25, blue: 0.25)], startPoint: .leading, endPoint: .trailing)
        case 2: return LinearGradient(colors: [Color(red: 0.94, green: 0.32, blue: 0.22), Color(red: 0.98, green: 0.45, blue: 0.26)], startPoint: .leading, endPoint: .trailing)
        case 3: return LinearGradient(colors: [Color(red: 0.38, green: 0.85, blue: 0.98), Color(red: 0.00, green: 0.44, blue: 0.95)], startPoint: .leading, endPoint: .trailing)
        default: return LinearGradient(colors: [.blue], startPoint: .leading, endPoint: .trailing)
        }
    }
    
    private func projectsForTab(_ tab: Int) -> [PortfolioProject] {
        switch tab {
        case 0: return nextJSProjects
        case 1: return mernProjects
        case 2: return swiftUIProjects
        case 3: return androidProjects
        default: return []
        }
    }
    
    // MARK: - Project Data
    
    private var nextJSProjects: [PortfolioProject] {
        [
            PortfolioProject(title: "Optical Automation", category: "Web & Mobile Suite", description: "MERN Stack and SwiftUI app with Megamenu navigation, SEO optimized metadata-driven content, SOC2 compliant metatags.", icon: "globe", color: Color(red: 0.39, green: 0.40, blue: 0.95), website: "https://opticalautomation.com"),
            PortfolioProject(title: "MyDeskView", category: "Desktop Productivity Suite", description: "27+ integrated applications across Business, Education, Entertainment, Productivity, and Health categories.", icon: "desktopcomputer", color: Color(red: 0.38, green: 0.85, blue: 0.98), website: "https://mydeskview.com"),
            PortfolioProject(title: "Technology And Times", category: "Web & Mobile Suite", description: "Technology portal covering Technology, Computers, Homes, Automobiles, Corporations, and Government.", icon: "cpu.fill", color: Color(red: 0.06, green: 0.73, blue: 0.51), website: "https://technologyandtimes.com"),
            PortfolioProject(title: "AmericaToday250", category: "Web & Mobile Suite", description: "American history from George Washington arranged in decades, featuring all presidents and current officials.", icon: "book.fill", color: Color(red: 0.86, green: 0.15, blue: 0.15), website: "https://americatoday250.com"),
            PortfolioProject(title: "LearnSkills365", category: "Educational Platform", description: "Interactive learning platform for Math, Reading, Writing, Memory, Typing, Geography, and Quizzes.", icon: "graduationcap.fill", color: Color(red: 0.96, green: 0.62, blue: 0.04), website: "https://learnskills365.com"),
            PortfolioProject(title: "Purchase Software Hub", category: "Software For Sale", description: "Technical documentation, API references, and development guides. Software titles available for purchase.", icon: "cart.fill", color: Color(red: 0.06, green: 0.73, blue: 0.51), website: "https://docs.opticalautomation.com"),
            PortfolioProject(title: "AccessMoney", category: "Business & Finance", description: "Financial access and money management application.", icon: "dollarsign.circle.fill", color: Color(red: 0.06, green: 0.73, blue: 0.51), website: "https://mydeskview.com"),
            PortfolioProject(title: "AI Trading", category: "Business & Finance", description: "AI-powered trading and investment analysis platform.", icon: "chart.line.uptrend.xyaxis", color: Color(red: 0.39, green: 0.40, blue: 0.95), website: "https://mydeskview.com"),
            PortfolioProject(title: "BistroRestaurant", category: "Business & Finance", description: "Restaurant management and ordering platform.", icon: "fork.knife", color: Color(red: 0.94, green: 0.27, blue: 0.27), website: "https://mydeskview.com"),
            PortfolioProject(title: "GoodDayMusic", category: "Entertainment", description: "Music discovery and playlist management application.", icon: "music.note.list", color: Color(red: 0.06, green: 0.73, blue: 0.51), website: "https://mydeskview.com"),
            PortfolioProject(title: "FitnessTracker", category: "Health", description: "Fitness activity tracking and workout management.", icon: "figure.run", color: Color(red: 0.06, green: 0.73, blue: 0.51), website: "https://mydeskview.com"),
            PortfolioProject(title: "TaskManager", category: "Productivity", description: "Task management and productivity tracking application.", icon: "checklist", color: Color(red: 0.55, green: 0.36, blue: 0.96), website: "https://mydeskview.com"),
        ]
    }
    
    private var mernProjects: [PortfolioProject] {
        [
            PortfolioProject(title: "Optical Automation", category: "Web & Mobile Suite", description: "Comprehensive MERN Stack application with advanced navigation, SEO, and AI-powered insights.", icon: "globe", color: Color(red: 0.41, green: 0.63, blue: 0.39), website: "https://opticalautomation.com"),
            PortfolioProject(title: "MyDeskView", category: "Desktop Productivity Suite", description: "27+ integrated apps across Business, Education, Entertainment, Productivity, and Health categories.", icon: "desktopcomputer", color: Color(red: 0.00, green: 0.64, blue: 0.93), website: "https://mydeskview.com"),
            PortfolioProject(title: "Technology And Times", category: "Web & Mobile Suite", description: "Technology portal with rich video content, photo galleries, and in-depth articles.", icon: "cpu.fill", color: Color(red: 0.96, green: 0.62, blue: 0.04), website: "https://technologyandtimes.com"),
            PortfolioProject(title: "AmericaToday250", category: "Web & Mobile Suite", description: "American history organized by decades with comprehensive government appendix.", icon: "book.fill", color: Color(red: 0.86, green: 0.15, blue: 0.15), website: "https://americatoday250.com"),
            PortfolioProject(title: "Purchase Software Hub", category: "Software For Sale", description: "Browse and purchase software titles with comprehensive documentation.", icon: "cart.fill", color: Color(red: 0.06, green: 0.73, blue: 0.51), website: "https://docs.opticalautomation.com"),
        ]
    }
    
    private var swiftUIProjects: [PortfolioProject] {
        [
            PortfolioProject(title: "Optical Automation", category: "iOS App", description: "Native SwiftUI app with premium design, dark mode, splash screen, and native navigation.", icon: "globe", color: Color(red: 0.94, green: 0.32, blue: 0.22), website: "https://opticalautomation.com"),
            PortfolioProject(title: "MyDeskView", category: "iOS App", description: "Desktop productivity suite with native interface and 27+ integrated apps.", icon: "desktopcomputer", color: Color(red: 0.98, green: 0.45, blue: 0.26), website: "https://mydeskview.com"),
            PortfolioProject(title: "Technology And Times", category: "iOS App", description: "Technology portal optimized for iOS with native SwiftUI views.", icon: "cpu.fill", color: Color(red: 0.06, green: 0.73, blue: 0.51), website: "https://technologyandtimes.com"),
            PortfolioProject(title: "AmericaToday250", category: "iOS App", description: "American history app with interactive timeline and president database.", icon: "book.fill", color: Color(red: 0.86, green: 0.15, blue: 0.15), website: "https://americatoday250.com"),
            PortfolioProject(title: "CorvetteQuiz", category: "iOS Game", description: "Interactive quiz testing knowledge of Corvette history, models, and specifications.", icon: "trophy.fill", color: Color(red: 0.94, green: 0.27, blue: 0.27), website: "https://corvettequiz.com"),
        ]
    }
    
    private var androidProjects: [PortfolioProject] {
        [
            PortfolioProject(title: "CorvetteQuiz", category: "Android App", description: "Interactive quiz app for Corvette enthusiasts with beautiful animations and achievement tracking.", icon: "trophy.fill", color: Color(red: 0.94, green: 0.27, blue: 0.27), website: "https://corvettequiz.com"),
        ]
    }
}

// MARK: - Portfolio Project Model
struct PortfolioProject: Identifiable {
    let id = UUID()
    let title: String
    let category: String
    let description: String
    let icon: String
    let color: Color
    let website: String
}

// MARK: - Portfolio Project Card
struct PortfolioProjectCard: View {
    let project: PortfolioProject
    let baseURL: String
    
    var body: some View {
        NavigationLink {
            WebViewContainer(urlString: project.website)
                .navigationTitle(project.title)
                .navigationBarTitleDisplayMode(.inline)
        } label: {
            VStack(alignment: .leading, spacing: 12) {
                HStack(spacing: 12) {
                    // Icon
                    ZStack {
                        RoundedRectangle(cornerRadius: 12)
                            .fill(project.color)
                            .frame(width: 48, height: 48)
                        
                        Image(systemName: project.icon)
                            .font(.system(size: 22))
                            .foregroundColor(.white)
                    }
                    
                    VStack(alignment: .leading, spacing: 3) {
                        Text(project.title)
                            .font(.headline)
                            .foregroundColor(.primary)
                        
                        Text(project.category)
                            .font(.system(size: 11, weight: .semibold))
                            .foregroundColor(project.color)
                            .textCase(.uppercase)
                    }
                    
                    Spacer()
                    
                    Image(systemName: "chevron.right")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
                
                Text(project.description)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .lineLimit(2)
                    .multilineTextAlignment(.leading)
            }
            .padding()
            .background(Color(.systemBackground))
            .clipShape(RoundedRectangle(cornerRadius: 16))
            .overlay(
                RoundedRectangle(cornerRadius: 16)
                    .stroke(Color(.separator).opacity(0.3), lineWidth: 1)
            )
            .overlay(alignment: .top) {
                Rectangle()
                    .fill(project.color)
                    .frame(height: 3)
                    .clipShape(RoundedRectangle(cornerRadius: 16))
            }
        }
    }
}

#Preview {
    NavigationStack {
        PortfolioView(baseURL: "https://opticalautomation.com")
    }
}
