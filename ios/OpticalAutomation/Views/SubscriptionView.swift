import SwiftUI

// MARK: - Subscription View (with Pricing)
struct SubscriptionView: View {
    let baseURL: String
    @State private var selectedPlan = 1
    @State private var selectedPricingTab = 0
    @State private var showPurchaseAlert = false
    
    private let pricingTabs = ["Ready-Made", "Starter Web", "Mobile App", "Web + Apps"]
    
    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                // Header
                VStack(spacing: 12) {
                    Image(systemName: "star.circle.fill")
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
                    
                    Text("Choose Your Plan")
                        .font(.title2.weight(.bold))
                    
                    Text("Unlock premium features and get the most out of Optical Automation.")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal, 24)
                }
                .padding(.top, 20)
                
                // Plans
                VStack(spacing: 16) {
                    // Free Plan
                    PlanCardView(
                        isSelected: selectedPlan == 0,
                        planName: "Free",
                        price: "$0",
                        period: "/month",
                        features: [
                            "Basic portfolio access",
                            "View documentation",
                            "Community support",
                            "Limited API access"
                        ],
                        color: .gray,
                        isPopular: false
                    ) {
                        selectedPlan = 0
                    }
                    
                    // Pro Plan
                    PlanCardView(
                        isSelected: selectedPlan == 1,
                        planName: "Pro",
                        price: "$9.99",
                        period: "/month",
                        features: [
                            "Full portfolio access",
                            "MyDeskView Suite",
                            "LearnSkills365 Access",
                            "Priority support",
                            "Advanced analytics",
                            "Custom integrations"
                        ],
                        color: Color(red: 0.39, green: 0.40, blue: 0.95),
                        isPopular: true
                    ) {
                        selectedPlan = 1
                    }
                    
                    // Enterprise Plan
                    PlanCardView(
                        isSelected: selectedPlan == 2,
                        planName: "Enterprise",
                        price: "$29.99",
                        period: "/month",
                        features: [
                            "Everything in Pro",
                            "Unlimited team members",
                            "Custom development",
                            "Dedicated support",
                            "SLA guarantee",
                            "White-label options",
                            "Priority deployment"
                        ],
                        color: Color(red: 0.58, green: 0.37, blue: 0.98),
                        isPopular: false
                    ) {
                        selectedPlan = 2
                    }
                }
                .padding(.horizontal)
                
                // Subscribe Button
                Button(action: {
                    showPurchaseAlert = true
                }) {
                    HStack(spacing: 8) {
                        Image(systemName: "creditcard.fill")
                        Text("Subscribe Now")
                            .fontWeight(.semibold)
                    }
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 16)
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
                    .clipShape(RoundedRectangle(cornerRadius: 14))
                    .shadow(color: Color(red: 0.39, green: 0.40, blue: 0.95).opacity(0.3), radius: 10, x: 0, y: 5)
                }
                .padding(.horizontal)
                
                // ── PRICING SECTION ──────────
                VStack(spacing: 16) {
                    Divider()
                        .padding(.horizontal)
                    
                    HStack(spacing: 8) {
                        Image(systemName: "tag.fill")
                            .foregroundColor(Color(red: 0.39, green: 0.40, blue: 0.95))
                        Text("Product Marketing Pricing")
                            .font(.title3.weight(.bold))
                    }
                    .padding(.top, 8)
                    
                    Text("Let us create a profitable software solution for your company.")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal, 24)
                    
                    // Pricing Category Tabs
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 8) {
                            ForEach(pricingTabs.indices, id: \.self) { index in
                                Button(action: {
                                    withAnimation(.spring(response: 0.3)) {
                                        selectedPricingTab = index
                                    }
                                }) {
                                    Text(pricingTabs[index])
                                        .font(.caption.weight(.semibold))
                                        .foregroundColor(selectedPricingTab == index ? .white : .primary)
                                        .padding(.horizontal, 14)
                                        .padding(.vertical, 8)
                                        .background(
                                            selectedPricingTab == index
                                                ? AnyShapeStyle(LinearGradient(colors: [Color(red: 0.39, green: 0.40, blue: 0.95), Color(red: 0.58, green: 0.37, blue: 0.98)], startPoint: .leading, endPoint: .trailing))
                                                : AnyShapeStyle(Color(.tertiarySystemBackground))
                                        )
                                        .clipShape(Capsule())
                                        .overlay(
                                            Capsule()
                                                .stroke(selectedPricingTab == index ? .clear : Color(.separator).opacity(0.3), lineWidth: 1)
                                        )
                                }
                            }
                        }
                        .padding(.horizontal)
                    }
                    
                    // Pricing Cards
                    VStack(spacing: 14) {
                        ForEach(pricingPlansForTab(selectedPricingTab)) { plan in
                            PricingTierCard(plan: plan)
                        }
                    }
                    .padding(.horizontal)
                    .animation(.spring(response: 0.4), value: selectedPricingTab)
                }
                
                // Business Pricing Link
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
        .navigationTitle("Subscribe")
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
        .alert("Subscribe", isPresented: $showPurchaseAlert) {
            Button("Continue", role: .none) {}
            Button("Cancel", role: .cancel) {}
        } message: {
            let planNames = ["Free", "Pro ($9.99/mo)", "Enterprise ($29.99/mo)"]
            Text("You selected the \(planNames[selectedPlan]) plan. In-app purchase will be available when the app is published to the App Store.")
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

// MARK: - Plan Card
struct PlanCardView: View {
    let isSelected: Bool
    let planName: String
    let price: String
    let period: String
    let features: [String]
    let color: Color
    let isPopular: Bool
    let onTap: () -> Void
    
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    HStack(spacing: 8) {
                        Text(planName)
                            .font(.title3.weight(.bold))
                        
                        if isPopular {
                            Text("POPULAR")
                                .font(.system(size: 9, weight: .bold))
                                .foregroundColor(.white)
                                .padding(.horizontal, 8)
                                .padding(.vertical, 3)
                                .background(
                                    LinearGradient(
                                        colors: [Color(red: 0.39, green: 0.40, blue: 0.95), Color(red: 0.58, green: 0.37, blue: 0.98)],
                                        startPoint: .leading, endPoint: .trailing
                                    )
                                )
                                .clipShape(Capsule())
                        }
                    }
                    
                    HStack(alignment: .firstTextBaseline, spacing: 2) {
                        Text(price)
                            .font(.system(size: 28, weight: .bold, design: .rounded))
                            .foregroundColor(color)
                        Text(period)
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }
                }
                
                Spacer()
                
                ZStack {
                    Circle()
                        .stroke(isSelected ? color : Color(.separator), lineWidth: 2)
                        .frame(width: 24, height: 24)
                    
                    if isSelected {
                        Circle()
                            .fill(color)
                            .frame(width: 16, height: 16)
                    }
                }
            }
            
            Divider()
            
            VStack(alignment: .leading, spacing: 8) {
                ForEach(features, id: \.self) { feature in
                    HStack(spacing: 10) {
                        Image(systemName: "checkmark.circle.fill")
                            .font(.system(size: 14))
                            .foregroundColor(color)
                        
                        Text(feature)
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                    }
                }
            }
        }
        .padding(18)
        .background(Color(.systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(isSelected ? color : Color(.separator).opacity(0.3), lineWidth: isSelected ? 2 : 1)
        )
        .shadow(color: isSelected ? color.opacity(0.15) : .clear, radius: 10, x: 0, y: 5)
        .onTapGesture(perform: onTap)
        .animation(.spring(response: 0.3), value: isSelected)
    }
}

// MARK: - Pricing Plan Model
struct PricingPlan: Identifiable {
    let id = UUID()
    let name: String
    let price: String
    let period: String
    let description: String
    let color: Color
    let featured: Bool
    let features: [String]
}

// MARK: - Pricing Tier Card
struct PricingTierCard: View {
    let plan: PricingPlan
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    HStack(spacing: 8) {
                        Text(plan.name)
                            .font(.headline)
                        
                        if plan.featured {
                            HStack(spacing: 3) {
                                Image(systemName: "star.fill")
                                    .font(.system(size: 8))
                                Text("Popular")
                                    .font(.system(size: 9, weight: .bold))
                            }
                            .foregroundColor(.white)
                            .padding(.horizontal, 8)
                            .padding(.vertical, 3)
                            .background(
                                LinearGradient(
                                    colors: [Color(red: 0.39, green: 0.40, blue: 0.95), Color(red: 0.58, green: 0.37, blue: 0.98)],
                                    startPoint: .leading, endPoint: .trailing
                                )
                            )
                            .clipShape(Capsule())
                        }
                    }
                    
                    Text(plan.description)
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
                
                Spacer()
                
                VStack(alignment: .trailing, spacing: 2) {
                    Text(plan.price)
                        .font(.system(size: 22, weight: .bold, design: .rounded))
                        .foregroundColor(plan.color)
                    Text(plan.period)
                        .font(.system(size: 10))
                        .foregroundColor(.secondary)
                }
            }
            
            Divider()
            
            // Features
            ForEach(plan.features, id: \.self) { feature in
                HStack(spacing: 8) {
                    Image(systemName: "checkmark.circle.fill")
                        .font(.system(size: 12))
                        .foregroundColor(plan.color)
                    
                    Text(feature)
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
            }
        }
        .padding(16)
        .background(Color(.systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 14))
        .overlay(
            RoundedRectangle(cornerRadius: 14)
                .stroke(plan.featured ? plan.color.opacity(0.5) : Color(.separator).opacity(0.3), lineWidth: plan.featured ? 2 : 1)
        )
        .overlay(alignment: .top) {
            if plan.featured {
                Rectangle()
                    .fill(
                        LinearGradient(
                            colors: [Color(red: 0.39, green: 0.40, blue: 0.95), Color(red: 0.58, green: 0.37, blue: 0.98)],
                            startPoint: .leading, endPoint: .trailing
                        )
                    )
                    .frame(height: 3)
                    .clipShape(RoundedRectangle(cornerRadius: 14))
            }
        }
    }
}

#Preview {
    NavigationStack {
        SubscriptionView(baseURL: "https://opticalautomation.com")
    }
}
