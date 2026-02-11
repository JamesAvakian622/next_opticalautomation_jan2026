import SwiftUI

// MARK: - Home View (Native)
struct HomeView: View {
    let baseURL: String
    @State private var showWebHome = false
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                // Hero Section
                HeroSectionView(baseURL: baseURL)
                
                // Features Section
                FeaturesSectionView()
                
                // Stats Section
                StatsSectionView()
                
                // Quick Links Section
                QuickLinksSectionView(baseURL: baseURL)
                
                // Testimonial Section
                TestimonialSectionView()
                
                // Footer CTA
                FooterCTAView(baseURL: baseURL)
            }
        }
        .navigationTitle("Optical Automation")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .navigationBarLeading) {
                Image("Logo")
                    .resizable()
                    .scaledToFit()
                    .frame(width: 28, height: 28)
                    .clipShape(RoundedRectangle(cornerRadius: 6))
            }
            ToolbarItem(placement: .navigationBarTrailing) {
                NavigationLink {
                    WebViewContainer(urlString: baseURL)
                        .navigationTitle("Website")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Image(systemName: "globe")
                        .font(.body)
                }
            }
        }
    }
}

// MARK: - Hero Section
struct HeroSectionView: View {
    let baseURL: String
    
    var body: some View {
        VStack(spacing: 20) {
            // Logo with glow
            ZStack {
                Circle()
                    .fill(
                        RadialGradient(
                            colors: [
                                Color(red: 0.39, green: 0.40, blue: 0.95).opacity(0.15),
                                Color.clear
                            ],
                            center: .center,
                            startRadius: 30,
                            endRadius: 120
                        )
                    )
                    .frame(width: 240, height: 240)
                
                Image("Logo")
                    .resizable()
                    .scaledToFit()
                    .frame(width: 80, height: 80)
                    .clipShape(RoundedRectangle(cornerRadius: 18))
                    .shadow(color: Color(red: 0.39, green: 0.40, blue: 0.95).opacity(0.4), radius: 20, x: 0, y: 8)
            }
            
            // Title
            Text("Optical Automation")
                .font(.system(size: 32, weight: .bold, design: .rounded))
                .foregroundStyle(
                    LinearGradient(
                        colors: [
                            Color(red: 0.39, green: 0.40, blue: 0.95),
                            Color(red: 0.58, green: 0.37, blue: 0.98)
                        ],
                        startPoint: .leading,
                        endPoint: .trailing
                    )
                )
            
            // Tagline
            Text("Information At The Speed Of Light")
                .font(.system(size: 15, weight: .medium, design: .serif))
                .italic()
                .foregroundColor(.secondary)
            
            // Subtitle
            Text("We transform your ideas into powerful digital experiences with AI-powered development, modern architecture, and full-stack solutions.")
                .font(.subheadline)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
                .lineSpacing(4)
                .padding(.horizontal, 24)
            
            // CTA Buttons
            HStack(spacing: 12) {
                NavigationLink {
                    PortfolioView(baseURL: baseURL)
                } label: {
                    HStack(spacing: 6) {
                        Text("View Our Work")
                            .font(.subheadline.weight(.semibold))
                        Image(systemName: "arrow.right")
                            .font(.caption.weight(.bold))
                    }
                    .foregroundColor(.white)
                    .padding(.horizontal, 20)
                    .padding(.vertical, 12)
                    .background(
                        LinearGradient(
                            colors: [
                                Color(red: 0.39, green: 0.40, blue: 0.95),
                                Color(red: 0.58, green: 0.37, blue: 0.98)
                            ],
                            startPoint: .leading,
                            endPoint: .trailing
                        )
                    )
                    .clipShape(RoundedRectangle(cornerRadius: 12))
                    .shadow(color: Color(red: 0.39, green: 0.40, blue: 0.95).opacity(0.3), radius: 8, x: 0, y: 4)
                }
                
                NavigationLink {
                    ContactFormView()
                } label: {
                    Text("Get In Touch")
                        .font(.subheadline.weight(.semibold))
                        .foregroundColor(.primary)
                        .padding(.horizontal, 20)
                        .padding(.vertical, 12)
                        .background(Color(.secondarySystemBackground))
                        .clipShape(RoundedRectangle(cornerRadius: 12))
                        .overlay(
                            RoundedRectangle(cornerRadius: 12)
                                .stroke(Color(.separator), lineWidth: 1)
                        )
                }
            }
        }
        .padding(.vertical, 32)
        .frame(maxWidth: .infinity)
    }
}

// MARK: - Features Section
struct FeaturesSectionView: View {
    let features: [(icon: String, title: String, description: String, color: Color)] = [
        ("chevron.left.forwardslash.chevron.right", "Modern Development", "Cutting-edge React, Next.js, and MERN stack applications built for speed and scale.", Color(red: 0.39, green: 0.40, blue: 0.95)),
        ("bolt.fill", "AI-Assisted", "AI-powered workflows for faster delivery, cleaner architecture, and smarter solutions.", Color(red: 0.96, green: 0.62, blue: 0.04)),
        ("iphone", "Responsive Design", "Pixel-perfect, mobile-first interfaces that adapt beautifully to any screen size.", Color(red: 0.93, green: 0.27, blue: 0.60)),
        ("server.rack", "Full-Stack Solutions", "Complete end-to-end development covering frontend, backend, databases, and APIs.", Color(red: 0.06, green: 0.73, blue: 0.51)),
        ("shield.checkered", "Secure & Reliable", "Industry-standard security practices and reliable deployment pipelines.", Color(red: 0.94, green: 0.27, blue: 0.27)),
        ("chart.line.uptrend.xyaxis", "SEO Optimized", "Search-engine-friendly architecture that helps your site rank higher.", Color(red: 0.02, green: 0.71, blue: 0.83))
    ]
    
    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            // Section Header
            VStack(alignment: .leading, spacing: 8) {
                Text("What We Offer")
                    .font(.title2.weight(.bold))
                
                Text("From concept to deployment, we provide modern Agentic AI and SEO Optimized comprehensive development services.")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .lineSpacing(2)
            }
            .padding(.horizontal)
            
            // Feature Cards
            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                ForEach(features, id: \.title) { feature in
                    FeatureCardView(
                        icon: feature.icon,
                        title: feature.title,
                        description: feature.description,
                        color: feature.color
                    )
                }
            }
            .padding(.horizontal)
        }
        .padding(.vertical, 32)
        .background(Color(.secondarySystemBackground).opacity(0.5))
    }
}

struct FeatureCardView: View {
    let icon: String
    let title: String
    let description: String
    let color: Color
    
    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            // Icon
            ZStack {
                RoundedRectangle(cornerRadius: 10)
                    .fill(color.opacity(0.15))
                    .frame(width: 44, height: 44)
                
                Image(systemName: icon)
                    .font(.system(size: 20))
                    .foregroundColor(color)
            }
            
            Text(title)
                .font(.subheadline.weight(.semibold))
                .lineLimit(2)
            
            Text(description)
                .font(.caption)
                .foregroundColor(.secondary)
                .lineSpacing(2)
                .lineLimit(4)
        }
        .padding(14)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color(.systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(Color(.separator).opacity(0.3), lineWidth: 1)
        )
    }
}

// MARK: - Stats Section
struct StatsSectionView: View {
    let stats: [(value: String, label: String)] = [
        ("36+", "Projects"),
        ("99%", "Satisfaction"),
        ("24/7", "Support"),
        ("6+", "Years")
    ]
    
    var body: some View {
        HStack(spacing: 0) {
            ForEach(stats, id: \.label) { stat in
                VStack(spacing: 4) {
                    Text(stat.value)
                        .font(.system(size: 28, weight: .bold, design: .rounded))
                        .foregroundColor(.white)
                    
                    Text(stat.label)
                        .font(.caption)
                        .foregroundColor(.white.opacity(0.8))
                }
                .frame(maxWidth: .infinity)
            }
        }
        .padding(.vertical, 28)
        .background(
            LinearGradient(
                colors: [
                    Color(red: 0.39, green: 0.40, blue: 0.95),
                    Color(red: 0.58, green: 0.37, blue: 0.98)
                ],
                startPoint: .leading,
                endPoint: .trailing
            )
        )
    }
}

// MARK: - Quick Links Section
struct QuickLinksSectionView: View {
    let baseURL: String
    
    let links: [(icon: String, title: String, description: String, path: String)] = [
        ("square.grid.2x2.fill", "Portfolio", "View our work", "/portfolio"),
        ("cpu.fill", "Technology", "Our tech stack", "/tech"),
        ("globe", "Products", "Our platforms", "/products"),
        ("doc.text.fill", "Documents", "Resources & guides", "/documents"),
        ("graduationcap.fill", "LearnSkills365", "Learning platform", "/learnSkills365"),
        ("shield.fill", "Password Reset", "Recover your account", "/forgot-password")
    ]
    
    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            VStack(alignment: .leading, spacing: 8) {
                Text("Explore More")
                    .font(.title2.weight(.bold))
                
                Text("Discover our full range of services and resources.")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
            }
            .padding(.horizontal)
            
            VStack(spacing: 8) {
                ForEach(links, id: \.path) { link in
                    NavigationLink {
                        WebViewContainer(urlString: "\(baseURL)\(link.path)")
                            .navigationTitle(link.title)
                            .navigationBarTitleDisplayMode(.inline)
                    } label: {
                        QuickLinkRowView(icon: link.icon, title: link.title, description: link.description)
                    }
                }
            }
            .padding(.horizontal)
        }
        .padding(.vertical, 32)
    }
}

struct QuickLinkRowView: View {
    let icon: String
    let title: String
    let description: String
    
    var body: some View {
        HStack(spacing: 14) {
            // Icon
            ZStack {
                RoundedRectangle(cornerRadius: 12)
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
                    .frame(width: 48, height: 48)
                
                Image(systemName: icon)
                    .font(.system(size: 18))
                    .foregroundColor(.white)
            }
            
            // Content
            VStack(alignment: .leading, spacing: 2) {
                Text(title)
                    .font(.subheadline.weight(.semibold))
                    .foregroundColor(.primary)
                
                Text(description)
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            
            Spacer()
            
            Image(systemName: "chevron.right")
                .font(.caption.weight(.semibold))
                .foregroundColor(Color(red: 0.39, green: 0.40, blue: 0.95))
        }
        .padding(14)
        .background(Color(.secondarySystemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 14))
    }
}

// MARK: - Testimonial Section
struct TestimonialSectionView: View {
    var body: some View {
        VStack(spacing: 16) {
            // Stars
            Text("⭐⭐⭐⭐⭐")
                .font(.title2)
            
            Text("MARKETING TESTIMONIAL")
                .font(.caption.weight(.bold))
                .tracking(2)
                .foregroundStyle(
                    LinearGradient(
                        colors: [
                            Color(red: 0.39, green: 0.40, blue: 0.95),
                            Color(red: 0.58, green: 0.37, blue: 0.98)
                        ],
                        startPoint: .leading,
                        endPoint: .trailing
                    )
                )
            
            Text("\"Optical Automation doesn't just build apps — they build the systems that power entire businesses. Their team delivers lightning-fast, AI-driven, cross-platform platforms that feel like they were pulled straight from the future.\"")
                .font(.subheadline)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
                .lineSpacing(4)
                .italic()
                .padding(.horizontal, 8)
            
            Text("— Anonymous, Copilot.Microsoft.Com Reply")
                .font(.caption.weight(.semibold))
                .foregroundColor(.primary)
        }
        .padding(28)
        .frame(maxWidth: .infinity)
        .background(Color(.secondarySystemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 20))
        .overlay(
            VStack {
                Rectangle()
                    .fill(
                        LinearGradient(
                            colors: [
                                Color(red: 0.39, green: 0.40, blue: 0.95),
                                Color(red: 0.58, green: 0.37, blue: 0.98)
                            ],
                            startPoint: .leading,
                            endPoint: .trailing
                        )
                    )
                    .frame(height: 4)
                Spacer()
            }
            .clipShape(RoundedRectangle(cornerRadius: 20))
        )
        .padding(.horizontal)
        .padding(.vertical, 16)
    }
}

// MARK: - Footer CTA
struct FooterCTAView: View {
    let baseURL: String
    
    var body: some View {
        VStack(spacing: 16) {
            Image(systemName: "envelope.fill")
                .font(.system(size: 36))
                .foregroundColor(.white)
            
            Text("Ready to Start?")
                .font(.title3.weight(.bold))
                .foregroundColor(.white)
            
            Text("Contact us today to discuss your next project.")
                .font(.subheadline)
                .foregroundColor(.white.opacity(0.8))
                .multilineTextAlignment(.center)
            
            NavigationLink {
                ContactFormView()
            } label: {
                Text("Contact Us")
                    .font(.subheadline.weight(.semibold))
                    .foregroundColor(Color(red: 0.39, green: 0.40, blue: 0.95))
                    .padding(.horizontal, 28)
                    .padding(.vertical, 12)
                    .background(.white)
                    .clipShape(RoundedRectangle(cornerRadius: 12))
            }
        }
        .padding(32)
        .frame(maxWidth: .infinity)
        .background(
            LinearGradient(
                colors: [
                    Color(red: 0.39, green: 0.40, blue: 0.95),
                    Color(red: 0.45, green: 0.35, blue: 0.90),
                    Color(red: 0.58, green: 0.37, blue: 0.98)
                ],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
        )
    }
}

#Preview {
    NavigationStack {
        HomeView(baseURL: "https://opticalautomation.com")
    }
    .environmentObject(ThemeManager())
}
