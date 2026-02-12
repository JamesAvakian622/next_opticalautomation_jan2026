import SwiftUI

// MARK: - LearnSkills365 View (Native)
struct LearnSkillsView: View {
    let baseURL: String
    @State private var showSoftware = false
    
    // Activities
    private let activities: [(id: String, title: String, desc: String, icon: String, color: Color)] = [
        ("math", "Math", "Mathematical exercises to strengthen your computational skills and problem-solving abilities.", "number", Color(red: 0.55, green: 0.36, blue: 0.96)),
        ("memory", "Memory", "Memory enhancement games designed to improve retention and cognitive recall abilities.", "cpu", Color(red: 0.96, green: 0.62, blue: 0.04)),
        ("reading", "Reading", "Reading comprehension exercises to enhance your understanding and speed.", "book.fill", Color(red: 0.23, green: 0.51, blue: 0.98)),
        ("typing", "Typing", "Typing practice to improve your speed and accuracy with progressive lessons.", "keyboard.fill", Color(red: 0.93, green: 0.27, blue: 0.60)),
        ("connect-dots", "Connect Dots Game", "Pattern recognition puzzles to develop visual-spatial reasoning.", "circle.grid.3x3.fill", Color(red: 0.39, green: 0.40, blue: 0.95)),
        ("quizzes", "Quizzes", "Interactive quizzes covering multiple subjects to test and expand your knowledge.", "checkmark.square.fill", Color(red: 0.06, green: 0.73, blue: 0.51))
    ]
    
    // Integrated software
    private let integratedSoftware: [(category: String, items: [String])] = [
        ("Business & Finance", ["AccessMoney", "AI Trading", "AppointmentBook", "BistroRestaurant", "BusinessTracker", "CreativeTracker", "DollarDimeStore", "EmployDirectory", "EmployeeHandBook", "GasolineFinder", "InvestmentTracker", "RealEstatePortal"]),
        ("Education & Learning", ["Animals", "GrammyHistory", "GuitarBranded", "InventorsBio", "LearnSkills365.com", "MusiciansHallOfFame", "MyGreatRecipes", "NationalParks", "NewsChannels", "NinePlanets", "Quiz System", "SportsTracker"]),
        ("Entertainment & Leisure", ["A Snowy Christmas", "Apple M Processors", "Biographies", "CarShow YouTube", "CoolJimmy", "CorvetteQuiz", "CruiseFinder", "GoodDayMusic"]),
        ("Personal Productivity", ["DIY Solutions", "MyBusinessOrganizer", "MyDateBook", "MyDeskView", "MyDeskView - 2026 Places", "MyDeskView - YouTube", "MyPersonalOrganizer", "Photo Albums"]),
        ("Communication & Social", ["Hi5", "MyTelephoneBook", "RecipeLists", "TaskManager", "TechnologyAndTimes", "Teleprompter"]),
        ("Health", ["Disease Tracker", "Fitness Tracker", "GymnasticTracker", "Health Tracker", "HealthAidTracking", "MigraineTinitusTracker", "WalkTracker"])
    ]
    
    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                // Header
                VStack(spacing: 12) {
                    Image(systemName: "graduationcap.fill")
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
                    
                    Text("LearnSkills365")
                        .font(.title2.weight(.bold))
                    
                    Text("Comprehensive Educational Learning Platform")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal, 24)
                }
                .padding(.top, 20)
                
                // Description
                Text("LearnSkills365 is a comprehensive educational platform designed to make learning engaging, effective, and fun. Our integrated suite of learning activities helps you develop essential skills through interactive exercises and games.")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
                    .lineSpacing(4)
                    .padding(.horizontal, 20)
                
                // Activities Section
                VStack(alignment: .leading, spacing: 8) {
                    Text("Integrated Learning Activities")
                        .font(.title3.weight(.bold))
                        .padding(.horizontal)
                    
                    LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 14) {
                        ForEach(activities, id: \.id) { activity in
                            ActivityCardView(
                                title: activity.title,
                                description: activity.desc,
                                icon: activity.icon,
                                color: activity.color
                            )
                        }
                    }
                    .padding(.horizontal)
                }
                
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
                        Text("Integrated Software Titles")
                            .font(.headline)
                    }
                }
                .padding()
                .background(Color(.secondarySystemBackground))
                .clipShape(RoundedRectangle(cornerRadius: 14))
                .padding(.horizontal)
                
                // View on Web
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/learnSkills365")
                        .navigationTitle("LearnSkills365")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    HStack(spacing: 8) {
                        Image(systemName: "safari.fill")
                        Text("View LearnSkills365 on Web")
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
        .navigationTitle("LearnSkills365")
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

// MARK: - Activity Card
struct ActivityCardView: View {
    let title: String
    let description: String
    let icon: String
    let color: Color
    
    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Image(systemName: icon)
                .font(.title2)
                .foregroundColor(color)
                .frame(width: 44, height: 44)
                .background(color.opacity(0.15))
                .clipShape(RoundedRectangle(cornerRadius: 10))
            
            Text(title)
                .font(.headline)
            
            Text(description)
                .font(.caption)
                .foregroundColor(.secondary)
                .lineSpacing(2)
                .lineLimit(3)
        }
        .padding(14)
        .frame(maxWidth: .infinity, alignment: .leading)
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
        LearnSkillsView(baseURL: "https://opticalautomation.com")
    }
}
