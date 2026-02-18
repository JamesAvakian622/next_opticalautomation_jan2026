import SwiftUI
import SafariServices

// MARK: - Product Videos View
struct ProductVideosView: View {
    @State private var selectedCategory = "All"
    @State private var selectedVideoURL: IdentifiableURL?
    
    private let categories = ["All", "Company", "Products", "Pinterest"]
    
    private let videos: [ProductVideo] = [
        // Company Videos
        ProductVideo(
            title: "Mission Statement 2026",
            subtitle: "Optical Automation",
            author: "J.L. Avakian",
            description: "Our vision and mission for 2026 — building the future of digital productivity.",
            icon: "flag.fill",
            color: Color(red: 0.39, green: 0.40, blue: 0.95),
            url: "https://www.pinterest.com/jamesavakian/my-product-videos/",
            category: "Company"
        ),
        ProductVideo(
            title: "Mission Statement 2023",
            subtitle: "Optical Automation",
            author: "J.L. Avakian",
            description: "The original mission that started it all — our founding vision for Optical Automation.",
            icon: "sparkles",
            color: Color(red: 0.58, green: 0.37, blue: 0.98),
            url: "https://biteable.com/watch/3036644/5d5e973fde30a409cd59ec9ec36ee406",
            category: "Company"
        ),
        ProductVideo(
            title: "Author, James L. Avakian",
            subtitle: "About the Founder",
            author: "J.L. Avakian",
            description: "Meet the founder and developer behind Optical Automation's ecosystem.",
            icon: "person.fill",
            color: Color(red: 0.06, green: 0.73, blue: 0.51),
            url: "https://biteable.com/watch/3261325/ac1ef537457524ade58bc73cfe4c7a72",
            category: "Company"
        ),
        ProductVideo(
            title: "Developer, James L. Avakian",
            subtitle: "Technology & Development",
            author: "J.L. Avakian",
            description: "Exploring the technology stack and development practices at Optical Automation.",
            icon: "chevron.left.forwardslash.chevron.right",
            color: Color(red: 0.96, green: 0.62, blue: 0.04),
            url: "https://biteable.com/watch/3714125/a539e52ce6ef052bf12e4ce7deb2d60e",
            category: "Company"
        ),
        
        // Product Videos
        ProductVideo(
            title: "PersonalOrganizer",
            subtitle: "MyPersonalOrganizer.com",
            author: "J.L. Avakian",
            description: "People you met, images, sounds, videos. Part of the MyOneUniverse.com network.",
            icon: "person.crop.circle.fill",
            color: Color(red: 0.93, green: 0.27, blue: 0.60),
            url: "https://biteable.com/watch/3036416/d13a69fe6ecd6b46d67bfbf36500ceb4",
            category: "Products"
        ),
        ProductVideo(
            title: "BusinessOrganizer",
            subtitle: "MyBusinessOrganizer.com",
            author: "J.L. Avakian",
            description: "Account for your home and commercial business. Part of the MyOneUniverse.com network.",
            icon: "briefcase.fill",
            color: Color(red: 0.39, green: 0.40, blue: 0.95),
            url: "https://biteable.com/watch/3039291/459a747027c6b92a0e5b3ca30f1ce2d2",
            category: "Products"
        ),
        ProductVideo(
            title: "AmericaDiscovered",
            subtitle: "History & Education",
            author: "J.L. Avakian",
            description: "Discover America's rich history and heritage through interactive content.",
            icon: "globe.americas.fill",
            color: Color(red: 0.94, green: 0.27, blue: 0.27),
            url: "https://biteable.com/watch/3081382/4ca1b6f98216d3de312e043e19c7e477",
            category: "Products"
        ),
        ProductVideo(
            title: "My Technology House",
            subtitle: "Tech Ecosystem",
            author: "J.L. Avakian",
            description: "Your complete technology ecosystem — hardware, software, and connectivity.",
            icon: "house.fill",
            color: Color(red: 0.55, green: 0.36, blue: 0.96),
            url: "https://biteable.com/watch/3041713/2d4fb91f031c4c0a1344f4456c9204e5",
            category: "Products"
        ),
        ProductVideo(
            title: "Technology And Times",
            subtitle: "TechnologyAndTimes.com",
            author: "J.L. Avakian",
            description: "Introducing TechnologyAndTimes.com. Part of the MyOneUniverse network.",
            icon: "cpu.fill",
            color: Color(red: 0.02, green: 0.71, blue: 0.83),
            url: "https://biteable.com/watch/3041599/7951c6d469fd16c1f488856b2da18915",
            category: "Products"
        ),
        
        // Pinterest Videos
        ProductVideo(
            title: "My Personal Organizer",
            subtitle: "Pinterest Video",
            author: "J.L. Avakian",
            description: "People you met, images, sounds, videos. Part of the MyOneUniverse.com network.",
            icon: "heart.fill",
            color: Color(red: 0.93, green: 0.27, blue: 0.60),
            url: "https://www.pinterest.com/pin/557953841345673812/",
            category: "Pinterest"
        ),
        ProductVideo(
            title: "MyBusinessOrganizer",
            subtitle: "Pinterest Video",
            author: "J.L. Avakian",
            description: "Account for your home and commercial business. Part of the MyOneUniverse.com network.",
            icon: "briefcase.fill",
            color: Color(red: 0.39, green: 0.40, blue: 0.95),
            url: "https://www.pinterest.com/pin/557953841345673820/",
            category: "Pinterest"
        ),
        ProductVideo(
            title: "Technology And Times",
            subtitle: "Pinterest Video",
            author: "J.L. Avakian",
            description: "Introducing TechnologyAndTimes.com. Part of the MyOneUniverse network.",
            icon: "globe",
            color: Color(red: 0.02, green: 0.71, blue: 0.83),
            url: "https://www.pinterest.com/pin/557953841345673811/",
            category: "Pinterest"
        ),
        ProductVideo(
            title: "All Pinterest Videos",
            subtitle: "My Product Videos Board",
            author: "J.L. Avakian",
            description: "Browse all 13 product videos on the Pinterest board.",
            icon: "play.rectangle.on.rectangle.fill",
            color: Color(red: 0.94, green: 0.27, blue: 0.27),
            url: "https://www.pinterest.com/jamesavakian/my-product-videos/",
            category: "Pinterest"
        )
    ]
    
    var filteredVideos: [ProductVideo] {
        if selectedCategory == "All" { return videos }
        return videos.filter { $0.category == selectedCategory }
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
                    
                    VStack(spacing: 14) {
                        ZStack {
                            Circle()
                                .fill(.white.opacity(0.15))
                                .frame(width: 80, height: 80)
                            
                            Image(systemName: "play.rectangle.fill")
                                .font(.system(size: 34))
                                .foregroundColor(.white)
                        }
                        
                        Text("Product Videos")
                            .font(.system(size: 28, weight: .bold, design: .rounded))
                            .foregroundColor(.white)
                        
                        Text("Company & Product Showcase")
                            .font(.subheadline)
                            .foregroundColor(.white.opacity(0.85))
                        
                        Text("\(videos.count) videos across \(categories.count - 1) categories")
                            .font(.caption)
                            .foregroundColor(.white.opacity(0.7))
                            .padding(.top, 2)
                    }
                    .padding(.vertical, 28)
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
                                HStack(spacing: 6) {
                                    Image(systemName: categoryIcon(for: category))
                                        .font(.caption2)
                                    Text(category)
                                        .font(.subheadline.weight(.semibold))
                                }
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
                
                // Video List
                LazyVStack(spacing: 12) {
                    ForEach(filteredVideos) { video in
                        Button {
                            if let url = URL(string: video.url) {
                                selectedVideoURL = IdentifiableURL(url: url)
                            }
                        } label: {
                            VideoCardView(video: video)
                        }
                        .buttonStyle(PlainButtonStyle())
                    }
                }
                .padding(.horizontal)
                .padding(.bottom, 24)
                .animation(.spring(response: 0.4), value: selectedCategory)
            }
        }
        .navigationTitle("Product Videos")
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
        .sheet(item: $selectedVideoURL) { item in
            SafariView(url: item.url)
                .ignoresSafeArea()
        }
    }
    
    private func categoryIcon(for category: String) -> String {
        switch category {
        case "Company": return "building.2.fill"
        case "Products": return "cube.fill"
        case "Pinterest": return "pin.fill"
        default: return "play.rectangle.fill"
        }
    }
}

// MARK: - Product Video Model
struct ProductVideo: Identifiable {
    let id = UUID()
    let title: String
    let subtitle: String
    let author: String
    let description: String
    let icon: String
    let color: Color
    let url: String
    let category: String
}

// MARK: - Video Card View
struct VideoCardView: View {
    let video: ProductVideo
    
    var body: some View {
        HStack(spacing: 14) {
            // Play Icon
            ZStack {
                RoundedRectangle(cornerRadius: 14)
                    .fill(video.color.opacity(0.12))
                    .frame(width: 64, height: 64)
                
                ZStack {
                    Circle()
                        .fill(video.color.opacity(0.2))
                        .frame(width: 36, height: 36)
                    
                    Image(systemName: "play.fill")
                        .font(.system(size: 14))
                        .foregroundColor(video.color)
                }
            }
            
            // Content
            VStack(alignment: .leading, spacing: 4) {
                Text(video.title)
                    .font(.system(size: 15, weight: .bold))
                    .foregroundColor(.primary)
                    .lineLimit(1)
                
                Text(video.subtitle)
                    .font(.system(size: 12, weight: .medium))
                    .foregroundColor(video.color)
                    .lineLimit(1)
                
                Text(video.description)
                    .font(.system(size: 11))
                    .foregroundColor(.secondary)
                    .lineLimit(2)
                    .multilineTextAlignment(.leading)
            }
            
            Spacer()
            
            // Category badge + chevron
            VStack(spacing: 8) {
                Image(systemName: video.icon)
                    .font(.system(size: 14))
                    .foregroundColor(video.color)
                
                Image(systemName: "chevron.right")
                    .font(.system(size: 10, weight: .bold))
                    .foregroundColor(.secondary)
            }
        }
        .padding(14)
        .background(Color(.systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(Color(.separator).opacity(0.3), lineWidth: 1)
        )
        .shadow(color: .black.opacity(0.04), radius: 8, x: 0, y: 2)
    }
}

// MARK: - Identifiable URL wrapper
struct IdentifiableURL: Identifiable {
    let id = UUID()
    let url: URL
}

// MARK: - Safari View
struct SafariView: UIViewControllerRepresentable {
    let url: URL
    
    func makeUIViewController(context: Context) -> SFSafariViewController {
        let config = SFSafariViewController.Configuration()
        config.entersReaderIfAvailable = false
        config.barCollapsingEnabled = true
        let safariVC = SFSafariViewController(url: url, configuration: config)
        safariVC.preferredControlTintColor = UIColor(red: 0.39, green: 0.40, blue: 0.95, alpha: 1.0)
        return safariVC
    }
    
    func updateUIViewController(_ uiViewController: SFSafariViewController, context: Context) {}
}

// MARK: - Preview
#Preview {
    NavigationStack {
        ProductVideosView()
    }
}
