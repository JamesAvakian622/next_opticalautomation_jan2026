import SwiftUI

// MARK: - Settings View
struct SettingsView: View {
    @EnvironmentObject var themeManager: ThemeManager
    @State private var notificationsEnabled = true
    @State private var cookieConsentGiven = true
    @State private var analyticsEnabled = false
    @State private var showResetAlert = false
    
    var body: some View {
        List {
            // Appearance Section
            Section {
                // Dark Mode Toggle
                HStack {
                    Label {
                        Text("Dark Mode")
                    } icon: {
                        Image(systemName: "moon.fill")
                            .foregroundColor(.purple)
                    }
                    
                    Spacer()
                    
                    Toggle("", isOn: $themeManager.isDarkMode)
                        .tint(Color(red: 0.39, green: 0.40, blue: 0.95))
                }
                
                // Accent Color
                VStack(alignment: .leading, spacing: 12) {
                    Label {
                        Text("Accent Color")
                    } icon: {
                        Image(systemName: "paintpalette.fill")
                            .foregroundColor(.orange)
                    }
                    
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 12) {
                            ForEach(Array(ThemeManager.accentColors.enumerated()), id: \.offset) { index, colorOption in
                                VStack(spacing: 4) {
                                    Circle()
                                        .fill(colorOption.color)
                                        .frame(width: 36, height: 36)
                                        .overlay(
                                            Circle()
                                                .stroke(.white, lineWidth: themeManager.accentColorIndex == index ? 3 : 0)
                                        )
                                        .overlay(
                                            Circle()
                                                .stroke(colorOption.color, lineWidth: themeManager.accentColorIndex == index ? 2 : 0)
                                                .scaleEffect(1.3)
                                        )
                                        .shadow(color: colorOption.color.opacity(themeManager.accentColorIndex == index ? 0.4 : 0), radius: 6)
                                    
                                    Text(colorOption.name)
                                        .font(.system(size: 9))
                                        .foregroundColor(.secondary)
                                }
                                .onTapGesture {
                                    withAnimation(.spring(response: 0.3)) {
                                        themeManager.accentColorIndex = index
                                    }
                                }
                            }
                        }
                        .padding(.vertical, 4)
                    }
                }
            } header: {
                Text("Appearance")
            }
            
            // Privacy Section
            Section {
                HStack {
                    Label {
                        Text("Cookie Consent")
                    } icon: {
                        Image(systemName: "shield.checkered")
                            .foregroundColor(.green)
                    }
                    
                    Spacer()
                    
                    Toggle("", isOn: $cookieConsentGiven)
                        .tint(Color(red: 0.39, green: 0.40, blue: 0.95))
                }
                
                HStack {
                    Label {
                        Text("Analytics")
                    } icon: {
                        Image(systemName: "chart.bar.fill")
                            .foregroundColor(.blue)
                    }
                    
                    Spacer()
                    
                    Toggle("", isOn: $analyticsEnabled)
                        .tint(Color(red: 0.39, green: 0.40, blue: 0.95))
                }
                
                HStack {
                    Label {
                        Text("Push Notifications")
                    } icon: {
                        Image(systemName: "bell.badge.fill")
                            .foregroundColor(.red)
                    }
                    
                    Spacer()
                    
                    Toggle("", isOn: $notificationsEnabled)
                        .tint(Color(red: 0.39, green: 0.40, blue: 0.95))
                }
            } header: {
                Text("Privacy & Notifications")
            } footer: {
                Text("Manage your privacy preferences and notification settings. Changes take effect immediately.")
            }
            
            // Cache Section
            Section {
                Button(action: {
                    showResetAlert = true
                }) {
                    Label {
                        Text("Clear Cache")
                            .foregroundColor(.primary)
                    } icon: {
                        Image(systemName: "trash.fill")
                            .foregroundColor(.orange)
                    }
                }
            } header: {
                Text("Storage")
            } footer: {
                Text("Clear cached web content to free up storage space.")
            }
            
            // About Section
            Section {
                HStack {
                    Label {
                        Text("Version")
                    } icon: {
                        Image(systemName: "info.circle.fill")
                            .foregroundColor(.blue)
                    }
                    Spacer()
                    Text("2.0.0")
                        .foregroundColor(.secondary)
                }
                
                HStack {
                    Label {
                        Text("Build")
                    } icon: {
                        Image(systemName: "hammer.fill")
                            .foregroundColor(.gray)
                    }
                    Spacer()
                    Text("2026.2.11")
                        .foregroundColor(.secondary)
                }
                
                HStack {
                    Label {
                        Text("Platform")
                    } icon: {
                        Image(systemName: "iphone")
                            .foregroundColor(.indigo)
                    }
                    Spacer()
                    Text("iOS / iPadOS")
                        .foregroundColor(.secondary)
                }
                
                HStack {
                    Label {
                        Text("Developer")
                    } icon: {
                        Image(systemName: "person.fill")
                            .foregroundColor(.purple)
                    }
                    Spacer()
                    Text("Optical Automation, LLC")
                        .foregroundColor(.secondary)
                        .font(.subheadline)
                }
            } header: {
                Text("About")
            }
            
            // Copyright
            Section {
                VStack(spacing: 8) {
                    Image("Logo")
                        .resizable()
                        .scaledToFit()
                        .frame(width: 40, height: 40)
                        .clipShape(RoundedRectangle(cornerRadius: 8))
                    
                    Text("© 2026 Optical Automation, LLC")
                        .font(.caption)
                        .foregroundColor(.secondary)
                    
                    Text("All Rights Reserved")
                        .font(.caption2)
                        .foregroundColor(.secondary.opacity(0.7))
                }
                .frame(maxWidth: .infinity)
                .padding(.vertical, 8)
            }
        }
        .navigationTitle("Settings")
        .navigationBarTitleDisplayMode(.large)
        .alert("Clear Cache", isPresented: $showResetAlert) {
            Button("Clear", role: .destructive) {
                // Clear WKWebView cache
                let dataStore = WKWebsiteDataStore.default()
                let dataTypes = WKWebsiteDataStore.allWebsiteDataTypes()
                let date = Date(timeIntervalSince1970: 0)
                dataStore.removeData(ofTypes: dataTypes, modifiedSince: date) {}
            }
            Button("Cancel", role: .cancel) {}
        } message: {
            Text("This will clear all cached web content. You'll need to reload pages.")
        }
    }
}

import WebKit

#Preview {
    NavigationStack {
        SettingsView()
            .environmentObject(ThemeManager())
    }
}
