import SwiftUI

// MARK: - Splash Screen
struct SplashScreenView: View {
    @EnvironmentObject var themeManager: ThemeManager
    @State private var logoScale: CGFloat = 0.3
    @State private var logoOpacity: Double = 0
    @State private var titleOpacity: Double = 0
    @State private var subtitleOpacity: Double = 0
    @State private var glowOpacity: Double = 0
    @State private var particleOffset: CGFloat = 0
    
    var body: some View {
        ZStack {
            // Background gradient
            LinearGradient(
                colors: [
                    Color(red: 0.05, green: 0.05, blue: 0.15),
                    Color(red: 0.10, green: 0.08, blue: 0.25),
                    Color(red: 0.05, green: 0.05, blue: 0.15)
                ],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            .ignoresSafeArea()
            
            // Animated glow effect
            Circle()
                .fill(
                    RadialGradient(
                        colors: [
                            Color(red: 0.39, green: 0.40, blue: 0.95).opacity(0.3),
                            Color.clear
                        ],
                        center: .center,
                        startRadius: 20,
                        endRadius: 200
                    )
                )
                .frame(width: 400, height: 400)
                .opacity(glowOpacity)
                .scaleEffect(1.0 + particleOffset * 0.1)
            
            VStack(spacing: 24) {
                // Logo
                Image("SplashLogo")
                    .resizable()
                    .scaledToFit()
                    .frame(width: 220, height: 75)
                    .shadow(color: Color(red: 0.39, green: 0.40, blue: 0.95).opacity(0.6), radius: 30, x: 0, y: 10)
                    .scaleEffect(logoScale)
                    .opacity(logoOpacity)
                
                // Title
                VStack(spacing: 8) {
                    Text("Optical Automation")
                        .font(.system(size: 28, weight: .bold, design: .rounded))
                        .foregroundStyle(
                            LinearGradient(
                                colors: [
                                    Color(red: 0.39, green: 0.40, blue: 0.95),
                                    Color(red: 0.58, green: 0.37, blue: 0.98),
                                    Color(red: 0.39, green: 0.40, blue: 0.95)
                                ],
                                startPoint: .leading,
                                endPoint: .trailing
                            )
                        )
                        .opacity(titleOpacity)
                    
                    Text("AI-Powered Software Development")
                        .font(.system(size: 14, weight: .medium))
                        .foregroundColor(.white.opacity(0.6))
                        .opacity(subtitleOpacity)
                }
                
                // Loading indicator
                ProgressView()
                    .progressViewStyle(CircularProgressViewStyle(tint: Color(red: 0.39, green: 0.40, blue: 0.95)))
                    .scaleEffect(0.8)
                    .opacity(subtitleOpacity)
                    .padding(.top, 20)
            }
        }
        .onAppear {
            withAnimation(.spring(response: 0.8, dampingFraction: 0.6, blendDuration: 0)) {
                logoScale = 1.0
                logoOpacity = 1.0
            }
            withAnimation(.easeOut(duration: 0.6).delay(0.3)) {
                titleOpacity = 1.0
                glowOpacity = 1.0
            }
            withAnimation(.easeOut(duration: 0.6).delay(0.5)) {
                subtitleOpacity = 1.0
            }
            withAnimation(.easeInOut(duration: 2.0).repeatForever(autoreverses: true)) {
                particleOffset = 1.0
            }
        }
    }
}

#Preview {
    SplashScreenView()
        .environmentObject(ThemeManager())
}
