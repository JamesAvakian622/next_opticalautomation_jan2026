import SwiftUI

// MARK: - Select Software View (Native)
struct SelectSoftwareView: View {
    let baseURL: String
    @State private var selectedApps: Set<String> = []
    
    // Software by category
    private let softwareByCategory: [(category: String, apps: [(id: String, name: String, desc: String)])] = [
        ("Business & Finance", [
            ("accessmoney", "AccessMoney", "Financial management & tracking"),
            ("ai-trading", "AI Trading", "AI-powered market analysis"),
            ("appointmentbook", "AppointmentBook", "Scheduling & appointments"),
            ("bistrorestaurant", "BistroRestaurant", "Restaurant management"),
            ("businesstracker", "BusinessTracker", "Business analytics & metrics"),
            ("creativetracker", "CreativeTracker", "Creative project management"),
            ("dollardimestore", "DollarDimeStore", "Budget & expense tracking"),
            ("employdirectory", "EmployDirectory", "Employee directory & contacts"),
            ("employeehandbook", "EmployeeHandBook", "HR policies & procedures"),
            ("gasolinefinder", "GasolineFinder", "Fuel price comparison"),
            ("investmenttracker", "InvestmentTracker", "Portfolio tracking"),
            ("realestateportal", "RealEstatePortal", "Property listings & search")
        ]),
        ("Education & Learning", [
            ("animals", "Animals", "Animal encyclopedia & facts"),
            ("grammyhistory", "GrammyHistory", "Grammy Awards history"),
            ("guitarbranded", "GuitarBranded", "Guitar brands & models"),
            ("inventorsbio", "InventorsBio", "Famous inventors biographies"),
            ("learnskills365", "LearnSkills365", "Educational learning platform"),
            ("musicianshalloffame", "MusiciansHallOfFame", "Music legends database"),
            ("mygreatrecipes", "MyGreatRecipes", "Recipe collection & cooking"),
            ("nationalparks", "NationalParks", "National parks guide"),
            ("newschannels", "NewsChannels", "News aggregation"),
            ("nineplanets", "NinePlanets", "Solar system explorer"),
            ("quizsystem", "Quiz System", "Interactive quiz engine"),
            ("sportstracker", "SportsTracker", "Sports stats & scores")
        ]),
        ("Entertainment & Leisure", [
            ("snowychristmas", "A Snowy Christmas", "Holiday-themed experience"),
            ("applemprocessors", "Apple M Processors", "Apple Silicon database"),
            ("biographies", "Biographies", "Notable biographies"),
            ("carshowyoutube", "CarShow YouTube", "Car show videos"),
            ("cooljimmy", "CoolJimmy", "Entertainment hub"),
            ("corvettequiz", "CorvetteQuiz", "Corvette trivia & facts"),
            ("cruisefinder", "CruiseFinder", "Cruise line search"),
            ("gooddaymusic", "GoodDayMusic", "Music discovery"),
            ("grammytracker", "GrammyTracker", "Grammy nominations tracker"),
            ("olympicstracker", "OlympicsTracker", "Olympics results tracker"),
            ("oscartracker", "OscarTracker", "Academy Awards tracker")
        ]),
        ("Health & Sports", [
            ("diseasetracker", "DiseaseTracker", "Health condition monitoring"),
            ("fitnesstracker", "Fitness Tracker", "Workout & fitness logging"),
            ("gymnastictracker", "GymnasticTracker", "Gymnastics routine tracking"),
            ("healthtracker", "Health Tracker", "Vitals & health monitoring"),
            ("healthaidtracking", "HealthAidTracking", "Medical aid tracking"),
            ("indycartracker", "IndyCarTracker", "IndyCar race data"),
            ("migrainetinitusracker", "MigraineTinitusTracker", "Migraine & tinnitus log"),
            ("nascartracker", "NascarTracker", "NASCAR race data"),
            ("superbowltracker", "SuperBowlTracker", "Super Bowl history"),
            ("trackandfield", "TrackAndFieldTracker", "Athletics results"),
            ("walktracker", "WalkTracker", "Walking distance tracker")
        ]),
        ("Communication & Social", [
            ("billanalyzer", "BillAnalyzer", "Bill scanning & analysis"),
            ("efficiencygenius", "EfficiencyGenius", "Workflow optimization"),
            ("hi5", "Hi5", "Social communication"),
            ("mytelephonebook", "MyTelephoneBook", "Contact management"),
            ("receipthub", "ReceiptHub", "Receipt capture & storage"),
            ("recipelists", "RecipeLists", "Recipe organization"),
            ("taskmanager", "TaskManager", "Task & to-do management"),
            ("technologyandtimes", "TechnologyAndTimes", "Tech news & history"),
            ("teleprompter", "Teleprompter", "Teleprompter tool"),
            ("travelbin", "TravelBin", "Travel planning"),
            ("whatmovietosee", "WhatMovieToSee", "Movie recommendations"),
            ("whotocall", "WhoToCall", "Service directory"),
            ("yearbestmovie", "YearBestMovie", "Annual movie rankings")
        ]),
        ("Personal Productivity", [
            ("airlinetracker", "AirlineTracker", "Flight tracking & info"),
            ("buyingagent", "BuyingAgent", "Smart shopping assistant"),
            ("carbuyingagent", "CarBuyingAgent", "Vehicle purchase helper"),
            ("diysolutions", "DIY Solutions", "Home project guides"),
            ("drivingroute", "DrivingRoute", "Route planning & nav"),
            ("electriccaragent", "ElectricCarAgent", "EV comparison & search"),
            ("howtoagent", "HowToAgent", "Step-by-step tutorials"),
            ("itembuyingagent", "ItemBuyingAgent", "Product comparison"),
            ("mydatebook", "MyDateBook", "Date & event planner"),
            ("photoalbums", "Photo Albums", "Photo organization"),
            ("truckbuyingagent", "TruckBuyingAgent", "Truck purchase helper"),
            ("weather", "Weather", "Weather forecasts"),
            ("wheretoagent", "WhereToAgent", "Location discovery"),
            ("whoorwhatagent", "WhoOrWhatAgent", "Knowledge lookup")
        ])
    ]
    
    private var totalApps: Int {
        softwareByCategory.flatMap(\.apps).count
    }
    
    private var tierLabel: String {
        let count = selectedApps.count
        if count >= 21 { return "GOLD TIER" }
        if count >= 11 { return "SILVER TIER" }
        return "INDIVIDUAL TIER"
    }
    
    private var tierColor: Color {
        let count = selectedApps.count
        if count >= 21 { return Color(red: 0.96, green: 0.62, blue: 0.04) }
        if count >= 11 { return Color(red: 0.58, green: 0.64, blue: 0.72) }
        return Color(red: 0.39, green: 0.40, blue: 0.95)
    }
    
    private var tierPrice: String {
        let count = selectedApps.count
        if count >= 21 { return "$30.00" }
        if count >= 11 { return "$15.00" }
        return "$\(String(format: "%.2f", min(Double(count) * 2.00, 10.00)))"
    }
    
    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                // Header
                VStack(spacing: 12) {
                    Image(systemName: "app.badge.checkmark.fill")
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
                    
                    Text("Software Store")
                        .font(.title2.weight(.bold))
                    
                    // Tier Badge
                    Text(tierLabel)
                        .font(.system(size: 11, weight: .bold))
                        .foregroundColor(.white)
                        .padding(.horizontal, 14)
                        .padding(.vertical, 6)
                        .background(tierColor)
                        .clipShape(Capsule())
                    
                    // Tier Pricing Info
                    VStack(spacing: 4) {
                        Text("Tier Pricing, Software Titles, $2.00 each")
                            .font(.caption.weight(.semibold))
                        Text("Individual (1-10 apps): up to $10 · Silver (11-20): $15 · Gold (21+): $30")
                            .font(.system(size: 10))
                            .foregroundColor(.secondary)
                            .multilineTextAlignment(.center)
                    }
                    .padding(.horizontal, 24)
                    
                    // Counter
                    Text("\(selectedApps.count) of \(totalApps) selected — \(tierPrice)")
                        .font(.subheadline.weight(.bold))
                        .foregroundColor(Color(red: 0.39, green: 0.40, blue: 0.95))
                }
                .padding(.top, 20)
                
                // Action Buttons
                HStack(spacing: 12) {
                    Button(action: {
                        let allIds = Set(softwareByCategory.flatMap(\.apps).map(\.id))
                        selectedApps = allIds
                    }) {
                        HStack(spacing: 4) {
                            Image(systemName: "checkmark.circle.fill")
                                .font(.system(size: 12))
                            Text("Select All")
                                .font(.caption.weight(.semibold))
                        }
                        .foregroundColor(.white)
                        .padding(.horizontal, 16)
                        .padding(.vertical, 10)
                        .background(Color(red: 0.39, green: 0.40, blue: 0.95))
                        .clipShape(Capsule())
                    }
                    
                    Button(action: {
                        selectedApps.removeAll()
                    }) {
                        HStack(spacing: 4) {
                            Image(systemName: "xmark.circle.fill")
                                .font(.system(size: 12))
                            Text("Clear All")
                                .font(.caption.weight(.semibold))
                        }
                        .foregroundColor(.primary)
                        .padding(.horizontal, 16)
                        .padding(.vertical, 10)
                        .background(Color(.tertiarySystemBackground))
                        .clipShape(Capsule())
                        .overlay(Capsule().stroke(Color(.separator).opacity(0.3), lineWidth: 1))
                    }
                }
                
                // Software Categories
                ForEach(softwareByCategory, id: \.category) { group in
                    VStack(alignment: .leading, spacing: 10) {
                        HStack {
                            Text(group.category)
                                .font(.headline)
                            Spacer()
                            Text("\(group.apps.filter { selectedApps.contains($0.id) }.count)/\(group.apps.count)")
                                .font(.caption.weight(.semibold))
                                .foregroundColor(Color(red: 0.39, green: 0.40, blue: 0.95))
                        }
                        .padding(.horizontal)
                        
                        ForEach(group.apps, id: \.id) { app in
                            SoftwareAppRow(
                                name: app.name,
                                description: app.desc,
                                isSelected: selectedApps.contains(app.id),
                                accentColor: tierColor
                            ) {
                                if selectedApps.contains(app.id) {
                                    selectedApps.remove(app.id)
                                } else {
                                    selectedApps.insert(app.id)
                                }
                            }
                        }
                    }
                    .padding()
                    .background(Color(.secondarySystemBackground))
                    .clipShape(RoundedRectangle(cornerRadius: 16))
                    .padding(.horizontal)
                }
                
                // View on Web
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/select-software")
                        .navigationTitle("Select Software")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    HStack(spacing: 8) {
                        Image(systemName: "safari.fill")
                        Text("View Software Store on Web")
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
        .navigationTitle("Select Software")
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

// MARK: - Software App Row
struct SoftwareAppRow: View {
    let name: String
    let description: String
    let isSelected: Bool
    let accentColor: Color
    let onTap: () -> Void
    
    var body: some View {
        Button(action: onTap) {
            HStack(spacing: 12) {
                // Checkbox
                ZStack {
                    RoundedRectangle(cornerRadius: 6)
                        .stroke(isSelected ? accentColor : Color(.separator), lineWidth: 2)
                        .frame(width: 24, height: 24)
                    
                    if isSelected {
                        RoundedRectangle(cornerRadius: 6)
                            .fill(accentColor)
                            .frame(width: 24, height: 24)
                        
                        Image(systemName: "checkmark")
                            .font(.system(size: 12, weight: .bold))
                            .foregroundColor(.white)
                    }
                }
                
                VStack(alignment: .leading, spacing: 2) {
                    Text(name)
                        .font(.subheadline.weight(.semibold))
                        .foregroundColor(.primary)
                    Text(description)
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
                
                Spacer()
            }
            .padding(.vertical, 6)
            .padding(.horizontal, 12)
            .background(isSelected ? accentColor.opacity(0.08) : Color.clear)
            .clipShape(RoundedRectangle(cornerRadius: 10))
        }
        .buttonStyle(.plain)
        .animation(.spring(response: 0.25), value: isSelected)
    }
}

#Preview {
    NavigationStack {
        SelectSoftwareView(baseURL: "https://opticalautomation.com")
    }
}
