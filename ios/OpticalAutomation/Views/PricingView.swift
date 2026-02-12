import SwiftUI

// MARK: - Pricing View (Native)
struct PricingView: View {
    let baseURL: String
    @State private var selectedTab = 0
    
    private let tabs = ["Ready-Made", "Starter Web", "Mobile App", "Web + Apps"]
    
    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                // Header
                VStack(spacing: 12) {
                    Image(systemName: "tag.fill")
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
                    
                    Text("Product Marketing Pricing")
                        .font(.title2.weight(.bold))
                    
                    Text("Let us create a profitable software solution for your company.")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal, 24)
                }
                .padding(.top, 20)
                
                // Category Tabs
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 8) {
                        ForEach(tabs.indices, id: \.self) { index in
                            Button(action: {
                                withAnimation(.spring(response: 0.3)) {
                                    selectedTab = index
                                }
                            }) {
                                Text(tabs[index])
                                    .font(.caption.weight(.semibold))
                                    .foregroundColor(selectedTab == index ? .white : .primary)
                                    .padding(.horizontal, 14)
                                    .padding(.vertical, 8)
                                    .background(
                                        selectedTab == index
                                            ? AnyShapeStyle(LinearGradient(colors: [Color(red: 0.39, green: 0.40, blue: 0.95), Color(red: 0.58, green: 0.37, blue: 0.98)], startPoint: .leading, endPoint: .trailing))
                                            : AnyShapeStyle(Color(.tertiarySystemBackground))
                                    )
                                    .clipShape(Capsule())
                                    .overlay(
                                        Capsule()
                                            .stroke(selectedTab == index ? .clear : Color(.separator).opacity(0.3), lineWidth: 1)
                                    )
                            }
                        }
                    }
                    .padding(.horizontal)
                }
                
                // Pricing Cards
                VStack(spacing: 14) {
                    ForEach(pricingPlansForTab(selectedTab)) { plan in
                        PricingTierCard(plan: plan)
                    }
                }
                .padding(.horizontal)
                .animation(.spring(response: 0.4), value: selectedTab)
                
                // What's Included
                DisclosureGroup {
                    VStack(alignment: .leading, spacing: 14) {
                        IncludedItem(icon: "paintbrush.fill", title: "Sharp Design", desc: "Modern, visually stunning interfaces")
                        IncludedItem(icon: "magnifyingglass", title: "SEO Optimization", desc: "Search engine optimized pages")
                        IncludedItem(icon: "books.vertical.fill", title: "Information Research", desc: "In-depth research and data-driven content")
                        IncludedItem(icon: "cylinder.fill", title: "Database Design", desc: "Custom MongoDB schemas optimized")
                        IncludedItem(icon: "chevron.left.forwardslash.chevron.right", title: "Clean Code", desc: "Well-documented, maintainable code")
                        IncludedItem(icon: "shield.fill", title: "Security First", desc: "Enterprise-grade security with JWT")
                        IncludedItem(icon: "cloud.fill", title: "Cloud Hosting", desc: "Deployment and hosting assistance")
                        IncludedItem(icon: "lock.fill", title: "Secure Authentication", desc: "Enterprise-grade user login")
                        IncludedItem(icon: "clock.fill", title: "Historic Research", desc: "Thorough historical data analysis")
                        IncludedItem(icon: "doc.text.fill", title: "Full Background", desc: "Comprehensive context for all data")
                        IncludedItem(icon: "bolt.fill", title: "Latent Industry", desc: "Emerging market insights")
                        IncludedItem(icon: "checkmark.shield.fill", title: "SOC2 & ISO8601", desc: "Standard compliance applied")
                    }
                    .padding(.top, 8)
                } label: {
                    HStack(spacing: 8) {
                        Image(systemName: "checklist")
                            .foregroundColor(Color(red: 0.39, green: 0.40, blue: 0.95))
                        Text("What's Included")
                            .font(.headline)
                    }
                }
                .padding()
                .background(Color(.secondarySystemBackground))
                .clipShape(RoundedRectangle(cornerRadius: 14))
                .padding(.horizontal)
                
                // View Full Pricing on Web
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/pricing")
                        .navigationTitle("Full Pricing")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    HStack(spacing: 8) {
                        Image(systemName: "safari.fill")
                        Text("View Full Pricing on Web")
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
                
                // Business Licensing
                NavigationLink {
                    WebViewContainer(urlString: "\(baseURL)/business-pricing")
                        .navigationTitle("Business Licensing")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    HStack {
                        Image(systemName: "building.2.fill")
                        VStack(alignment: .leading) {
                            Text("Business Licensing")
                                .font(.subheadline.weight(.semibold))
                            Text("Custom plans for teams & enterprises")
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
        .navigationTitle("Pricing")
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
    
    // MARK: - Pricing Data
    private func pricingPlansForTab(_ tab: Int) -> [PricingPlan] {
        switch tab {
        case 0: // Ready-Made
            return [
                PricingPlan(name: "Single Application", price: "$2, $5, $10", period: "one-time", description: "Choose a single application from our catalog.", color: Color(red: 0.55, green: 0.36, blue: 0.96), featured: false, features: ["One Application License", "Instant Access", "$2 Basic · $5 Premium · $10 Top-Tier", "Full Features at Every Level"]),
                PricingPlan(name: "Silver Group", price: "$49", period: "one-time", description: "Bundle of twenty applications from our catalog.", color: Color(red: 0.58, green: 0.64, blue: 0.72), featured: true, features: ["20 Applications Included", "Mix & Match Any Apps", "Full Feature Access", "Cross-App Integration", "Free Updates for 6 Months"]),
                PricingPlan(name: "Gold Level", price: "$125", period: "/year", description: "Annual all-title access to every application.", color: Color(red: 0.96, green: 0.62, blue: 0.04), featured: false, features: ["All Titles Available", "Annual Access Pass", "New Titles Included", "Priority Support"]),
            ]
        case 1: // Starter Web
            return [
                PricingPlan(name: "Starter Website", price: "$3,499", period: "one-time", description: "Professional presence for small businesses.", color: Color(red: 0.39, green: 0.40, blue: 0.95), featured: false, features: ["Responsive Design", "SEO Optimization", "Contact Integration", "CMS Support", "Cloud Hosting"]),
                PricingPlan(name: "Business Solution", price: "$4,999", period: "one-time", description: "Advanced business features and database.", color: Color(red: 0.06, green: 0.73, blue: 0.51), featured: true, features: ["MERN Stack Database", "User Authentication", "Admin Dashboard", "Custom API Design", "SEO with Analytics"]),
                PricingPlan(name: "Business eCommerce", price: "$7,500", period: "one-time", description: "Full-featured eCommerce platform.", color: Color(red: 0.96, green: 0.62, blue: 0.04), featured: false, features: ["eCommerce Platform", "Stripe & PayPal", "Product Catalog", "Order Management", "Analytics & Reporting"]),
            ]
        case 2: // Mobile App
            return [
                PricingPlan(name: "Starter WebView", price: "$1,299", period: "one-time", description: "WebView app for quick market entry.", color: Color(red: 0.93, green: 0.27, blue: 0.60), featured: false, features: ["Single WebView", "iOS or Android", "Store Submission", "Core Functionality"]),
                PricingPlan(name: "Dual Starter Apps", price: "$2,499", period: "one-time", description: "WebView apps for both iOS and Android.", color: Color(red: 0.02, green: 0.71, blue: 0.83), featured: true, features: ["iOS & Android Apps", "Both Store Submissions", "Push Notifications", "Priority Support"]),
                PricingPlan(name: "Four Business Apps", price: "$4,999", period: "one-time", description: "Full-featured mobile application suite.", color: Color(red: 0.96, green: 0.62, blue: 0.04), featured: false, features: ["iOS & Android Apps", "Four Store Submissions", "Native Features", "Custom API Integration"]),
            ]
        case 3: // Web + Apps
            return [
                PricingPlan(name: "Web + One App", price: "TBD", period: "one-time", description: "Website plus one mobile platform.", color: Color(red: 0.96, green: 0.62, blue: 0.04), featured: false, features: ["Website Production", "iOS or Android App", "Shared MERN Database", "User Authentication", "Store Submission"]),
                PricingPlan(name: "Web + 2 Apps", price: "TBD", period: "one-time", description: "The ultimate digital ecosystem.", color: Color(red: 0.02, green: 0.71, blue: 0.83), featured: true, features: ["High-performance Web", "iOS + Android Apps", "Unified Dashboard", "Real-time Syncing", "Priority 24/7 Support"]),
            ]
        default:
            return []
        }
    }
}

// MARK: - Included Item Row
struct IncludedItem: View {
    let icon: String
    let title: String
    let desc: String
    
    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .font(.system(size: 16))
                .foregroundColor(Color(red: 0.39, green: 0.40, blue: 0.95))
                .frame(width: 28)
            
            VStack(alignment: .leading, spacing: 2) {
                Text(title)
                    .font(.subheadline.weight(.semibold))
                Text(desc)
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
        }
    }
}

#Preview {
    NavigationStack {
        PricingView(baseURL: "https://opticalautomation.com")
    }
}
