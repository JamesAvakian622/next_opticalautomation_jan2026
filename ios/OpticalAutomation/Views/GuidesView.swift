import SwiftUI

struct GuidesView: View {
    @State private var selectedAppendix = 0
    
    var body: some View {
        VStack(spacing: 0) {
            // Tab Picker
            Picker("Appendix", selection: $selectedAppendix) {
                Text("Slide Deck").tag(0)
                Text("Book Outline").tag(1)
                Text("Plan & Defs").tag(2)
            }
            .pickerStyle(.segmented)
            .padding()
            
            // Content
            ScrollView {
                switch selectedAppendix {
                case 0:
                    AppendixAView()
                case 1:
                    AppendixBView()
                case 2:
                    AppendixCView()
                default:
                    AppendixAView()
                }
            }
        }
        .navigationTitle("IP Guides")
        .navigationBarTitleDisplayMode(.large)
    }
}

// MARK: - Appendix A: Slide Deck Outline
struct AppendixAView: View {
    let slides = [
        SlideData(num: 1, title: "Title Slide", color: .purple, points: ["Intellectual Property Responsibilities in the Age of No-Code and AI"]),
        SlideData(num: 2, title: "The New Creative Landscape", color: .cyan, points: ["No-code tools", "AI-assisted development", "Market saturation", "Lower barriers, higher competition"]),
        SlideData(num: 3, title: "Why Responsibility Matters", color: .green, points: ["Economic value of creative assets", "Legal risks", "Ethical obligations"]),
        SlideData(num: 4, title: "Copyright Basics", color: .orange, points: ["What's protected", "Automatic protection", "Benefits of registration"]),
        SlideData(num: 5, title: "Trademark Essentials", color: .red, points: ["Names, logos, slogans", "Registration process", "Long-term brand protection"]),
        SlideData(num: 6, title: "Application Requirements", color: .indigo, points: ["Copyright", "Trademark", "Timelines"]),
        SlideData(num: 7, title: "Risks of Delaying Registration", color: .pink, points: ["Lost rights", "Investor hesitation", "Copycats", "International issues"]),
        SlideData(num: 8, title: "AI-Driven Development", color: .teal, points: ["Licensing", "Data privacy", "Transparency", "Maintenance"]),
        SlideData(num: 9, title: "Long-Term IP Strategy", color: .orange, points: ["Register assets", "Use NDAs", "Track ownership", "Respect open-source licenses"]),
        SlideData(num: 10, title: "Maintenance Plan", color: .cyan, points: ["Day One", "Days 3–6", "Week 1–2", "Six-Year Trademark Renewal"]),
        SlideData(num: 11, title: "Closing", color: .green, points: ["The future belongs to responsible creators."])
    ]
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Appendix A — Slide Deck Outline")
                .font(.title3)
                .fontWeight(.bold)
                .padding(.horizontal)
            
            LazyVStack(spacing: 12) {
                ForEach(slides) { slide in
                    SlideCardView(slide: slide)
                }
            }
            .padding(.horizontal)
        }
        .padding(.vertical, 12)
    }
}

struct SlideData: Identifiable {
    let id = UUID()
    let num: Int
    let title: String
    let color: Color
    let points: [String]
}

struct SlideCardView: View {
    let slide: SlideData
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Text("\(slide.num)")
                    .font(.subheadline)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                    .frame(width: 28, height: 28)
                    .background(slide.color)
                    .cornerRadius(6)
                
                Text(slide.title)
                    .font(.subheadline)
                    .fontWeight(.semibold)
            }
            
            ForEach(slide.points, id: \.self) { point in
                Text(point)
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(12)
        .background(Color(.secondarySystemBackground))
        .cornerRadius(12)
        .overlay(
            Rectangle()
                .fill(slide.color)
                .frame(width: 3),
            alignment: .leading
        )
        .clipShape(RoundedRectangle(cornerRadius: 12))
    }
}

// MARK: - Appendix B: Book Outline
struct AppendixBView: View {
    let parts = [
        BookPart(num: "I", title: "Foundations of Intellectual Property", color: .purple, chapters: [
            Chapter(num: 1, title: "Why Responsibility Matters", pages: "10–20"),
            Chapter(num: 2, title: "Copyright Essentials", pages: "10–20"),
            Chapter(num: 3, title: "Trademark Protection", pages: "10–20"),
            Chapter(num: 4, title: "The Application Process", pages: "10–20")
        ]),
        BookPart(num: "II", title: "The Modern Creative Landscape", color: .cyan, chapters: [
            Chapter(num: 5, title: "The Rise of No-Code and AI", pages: "10–20"),
            Chapter(num: 6, title: "Ethical Responsibilities in AI Development", pages: "10–20"),
            Chapter(num: 7, title: "The Risks of Neglect", pages: "10–20")
        ]),
        BookPart(num: "III", title: "Building a Professional IP Strategy", color: .green, chapters: [
            Chapter(num: 8, title: "Long-Term IP Strategy", pages: "10–20"),
            Chapter(num: 9, title: "Licensing, Ownership, and Documentation", pages: "10–20"),
            Chapter(num: 10, title: "Open-Source and Third-Party Compliance", pages: "10–20")
        ]),
        BookPart(num: "IV", title: "Business Formation & Digital Infrastructure", color: .orange, chapters: [
            Chapter(num: 11, title: "LLC Formation and Legal Readiness", pages: "10–20"),
            Chapter(num: 12, title: "Domain Strategy and Brand Value", pages: "10–20"),
            Chapter(num: 13, title: "Pre-Publication Steps", pages: "10–20")
        ]),
        BookPart(num: "V", title: "Maintenance, Renewal, and Longevity", color: .pink, chapters: [
            Chapter(num: 14, title: "Maintenance Planning for No-Code Systems", pages: "10–20"),
            Chapter(num: 15, title: "Six-Year Trademark Renewal", pages: "10–20"),
            Chapter(num: 16, title: "Sustaining Your Digital Assets", pages: "10–20")
        ])
    ]
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Appendix B — Book Outline")
                .font(.title3)
                .fontWeight(.bold)
                .padding(.horizontal)
            
            LazyVStack(spacing: 16) {
                ForEach(parts) { part in
                    PartSectionView(part: part)
                }
            }
            .padding(.horizontal)
        }
        .padding(.vertical, 12)
    }
}

struct BookPart: Identifiable {
    let id = UUID()
    let num: String
    let title: String
    let color: Color
    let chapters: [Chapter]
}

struct Chapter: Identifiable {
    let id = UUID()
    let num: Int
    let title: String
    let pages: String
}

struct PartSectionView: View {
    let part: BookPart
    @State private var isExpanded = true
    
    var body: some View {
        VStack(spacing: 8) {
            // Part Header
            Button(action: { withAnimation { isExpanded.toggle() } }) {
                HStack {
                    VStack(alignment: .leading, spacing: 2) {
                        Text("PART \(part.num)")
                            .font(.caption2)
                            .fontWeight(.semibold)
                            .foregroundColor(.white.opacity(0.8))
                        Text(part.title)
                            .font(.subheadline)
                            .fontWeight(.bold)
                            .foregroundColor(.white)
                    }
                    Spacer()
                    Image(systemName: isExpanded ? "chevron.up" : "chevron.down")
                        .font(.caption)
                        .foregroundColor(.white)
                }
                .padding(12)
                .background(
                    LinearGradient(
                        colors: [part.color, part.color.opacity(0.7)],
                        startPoint: .leading,
                        endPoint: .trailing
                    )
                )
                .cornerRadius(10)
            }
            
            // Chapters
            if isExpanded {
                VStack(spacing: 6) {
                    ForEach(part.chapters) { chapter in
                        ChapterRowView(chapter: chapter, color: part.color)
                    }
                }
            }
        }
    }
}

struct ChapterRowView: View {
    let chapter: Chapter
    let color: Color
    
    var body: some View {
        HStack {
            Text("CH \(chapter.num)")
                .font(.caption2)
                .fontWeight(.bold)
                .foregroundColor(color)
                .padding(.horizontal, 6)
                .padding(.vertical, 3)
                .background(color.opacity(0.15))
                .cornerRadius(6)
            
            Text(chapter.title)
                .font(.caption)
            
            Spacer()
            
            Text(chapter.pages)
                .font(.caption2)
                .foregroundColor(.secondary)
        }
        .padding(10)
        .background(Color(.secondarySystemBackground))
        .cornerRadius(10)
    }
}

// MARK: - Appendix C: Maintenance Plan & Definitions
struct AppendixCView: View {
    let timelineItems = [
        TimelineItem(label: "Day One", color: .purple, content: "Build initial structure: Header, Menu, Categories, Sub-categories. Create Terms of Usage, Privacy Policy, Content Policy. Establish Copyright as LLC."),
        TimelineItem(label: "Days 3–6", color: .cyan, content: "Register as LLC. Complete business plans and Use of Funds. Check domain availability. Evaluate domain worth. Research ownership costs. Polish software."),
        TimelineItem(label: "Week 1–2", color: .green, content: "Collect funds and pay for software/domains. Submit Pre-publish U.S. Copyright and Trademarks. Check for trademark conflicts."),
        TimelineItem(label: "Six Years", color: .orange, content: "Pay U.S. Patent and Trademark Office to renew. Keep displayed work and marks active or they expire.")
    ]
    
    var body: some View {
        VStack(alignment: .leading, spacing: 24) {
            Text("Appendix C — Maintenance Plan & Copyright Definitions")
                .font(.title2)
                .fontWeight(.bold)
                .padding(.horizontal)
            
            // Timeline Section
            VStack(alignment: .leading, spacing: 16) {
                Label("Maintenance Timeline", systemImage: "clock.fill")
                    .font(.headline)
                    .foregroundColor(.purple)
                    .padding(.horizontal)
                
                ForEach(timelineItems) { item in
                    TimelineRowView(item: item)
                }
            }
            
            Divider()
                .padding(.vertical)
            
            // Copyright Definitions
            VStack(alignment: .leading, spacing: 16) {
                Label("Copyright Definitions", systemImage: "globe")
                    .font(.headline)
                    .foregroundColor(.green)
                    .padding(.horizontal)
                
                DefinitionCardView(
                    title: "What You Can Use",
                    icon: "checkmark.circle.fill",
                    color: .green,
                    items: [
                        "Historical facts — Dates, events, timelines are public domain",
                        "Your own writing — Original text you write is yours",
                        "Public domain sources — Published before 1929"
                    ]
                )
                
                DefinitionCardView(
                    title: "What You Must Avoid",
                    icon: "exclamationmark.triangle.fill",
                    color: .red,
                    items: [
                        "Copying text from modern history books",
                        "Copying unique analysis or creative interpretation",
                        "Copying images, maps, or charts without permission"
                    ]
                )
                
                DefinitionCardView(
                    title: "How to Build Legally Safe",
                    icon: "checkmark.shield.fill",
                    color: .green,
                    items: [
                        "Write original summaries in your own words",
                        "Cite your sources",
                        "Use public domain or licensed images",
                        "Avoid copying modern text"
                    ]
                )
            }
        }
        .padding(.vertical)
    }
}

struct TimelineItem: Identifiable {
    let id = UUID()
    let label: String
    let color: Color
    let content: String
}

struct TimelineRowView: View {
    let item: TimelineItem
    
    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            Circle()
                .fill(item.color)
                .frame(width: 12, height: 12)
                .padding(.top, 6)
            
            VStack(alignment: .leading, spacing: 4) {
                Text(item.label)
                    .font(.headline)
                    .foregroundColor(item.color)
                Text(item.content)
                    .font(.body)
                    .foregroundColor(.secondary)
            }
        }
        .padding(.horizontal)
    }
}

struct DefinitionCardView: View {
    let title: String
    let icon: String
    let color: Color
    let items: [String]
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Label(title, systemImage: icon)
                .font(.headline)
                .foregroundColor(color)
            
            ForEach(items, id: \.self) { item in
                HStack(alignment: .top, spacing: 8) {
                    Image(systemName: icon)
                        .font(.caption)
                        .foregroundColor(color)
                    Text(item)
                        .font(.body)
                        .foregroundColor(.secondary)
                }
            }
        }
        .padding()
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color(.secondarySystemBackground))
        .cornerRadius(12)
        .overlay(
            Rectangle()
                .fill(color)
                .frame(width: 4),
            alignment: .leading
        )
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .padding(.horizontal)
    }
}

#Preview {
    NavigationStack {
        GuidesView()
    }
}
