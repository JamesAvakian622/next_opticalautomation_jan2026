import SwiftUI

@main
struct OpticalAutomationApp: App {
    @StateObject private var themeManager = ThemeManager()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(themeManager)
                .preferredColorScheme(themeManager.colorScheme)
        }
    }
}

// MARK: - App State
class AppState: ObservableObject {
    @Published var showSplash = true
}

// MARK: - Theme Manager
class ThemeManager: ObservableObject {
    @AppStorage("isDarkMode") var isDarkMode: Bool = true
    @AppStorage("accentColorIndex") var accentColorIndex: Int = 0
    
    var colorScheme: ColorScheme? {
        isDarkMode ? .dark : .light
    }
    
    static let accentColors: [(name: String, color: Color)] = [
        ("Indigo", Color(red: 0.39, green: 0.40, blue: 0.95)),  // #6366f1
        ("Purple", .purple),
        ("Cyan", .cyan),
        ("Emerald", Color(red: 0.06, green: 0.73, blue: 0.51)),
        ("Rose", Color(red: 0.93, green: 0.27, blue: 0.60)),
        ("Amber", Color(red: 0.96, green: 0.62, blue: 0.04))
    ]
    
    var accentColor: Color {
        ThemeManager.accentColors[accentColorIndex].color
    }
    
    var gradient: LinearGradient {
        LinearGradient(
            colors: [
                Color(red: 0.39, green: 0.40, blue: 0.95),
                Color(red: 0.58, green: 0.37, blue: 0.98)
            ],
            startPoint: .leading,
            endPoint: .trailing
        )
    }
}
