import SwiftUI

// MARK: - Contact Form View
struct ContactFormView: View {
    @Environment(\.dismiss) private var dismiss
    @State private var name: String = ""
    @State private var email: String = ""
    @State private var subject: String = ""
    @State private var message: String = ""
    @State private var showingAlert = false
    @State private var alertTitle = ""
    @State private var alertMessage = ""
    @State private var isSending = false
    @State private var sent = false
    
    private let recipientEmail = "Software@OpticalAutomation.com"
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                // Header
                VStack(spacing: 12) {
                    ZStack {
                        Circle()
                            .fill(
                                RadialGradient(
                                    colors: [
                                        Color(red: 0.39, green: 0.40, blue: 0.95).opacity(0.15),
                                        Color.clear
                                    ],
                                    center: .center,
                                    startRadius: 15,
                                    endRadius: 60
                                )
                            )
                            .frame(width: 120, height: 120)
                        
                        Image(systemName: "envelope.fill")
                            .font(.system(size: 36))
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
                    }
                    
                    Text("Get In Touch")
                        .font(.title2.weight(.bold))
                    
                    Text("Send us a message and we'll respond within 24-48 hours.")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal, 40)
                }
                .padding(.vertical, 24)
                
                if sent {
                    // Success State
                    VStack(spacing: 16) {
                        Image(systemName: "checkmark.circle.fill")
                            .font(.system(size: 56))
                            .foregroundColor(.green)
                        
                        Text("Message Sent!")
                            .font(.title3.weight(.bold))
                        
                        Text("Thank you for reaching out. We'll get back to you within 24-48 hours.")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                            .multilineTextAlignment(.center)
                            .padding(.horizontal, 40)
                        
                        Button {
                            sent = false
                            name = ""
                            email = ""
                            subject = ""
                            message = ""
                        } label: {
                            Text("Send Another Message")
                                .font(.subheadline.weight(.semibold))
                                .foregroundColor(Color(red: 0.39, green: 0.40, blue: 0.95))
                        }
                        .padding(.top, 8)
                    }
                    .padding(.vertical, 48)
                } else {
                    // Form Fields
                    VStack(spacing: 18) {
                        // Name Field
                        FormField(label: "Your Name", icon: "person.fill") {
                            TextField("Enter your name", text: $name)
                                .textContentType(.name)
                                .autocapitalization(.words)
                        }
                        
                        // Email Field
                        FormField(label: "Email Address", icon: "envelope.fill") {
                            TextField("you@example.com", text: $email)
                                .textContentType(.emailAddress)
                                .keyboardType(.emailAddress)
                                .autocapitalization(.none)
                        }
                        
                        // Subject Field
                        FormField(label: "Subject", icon: "text.alignleft") {
                            TextField("What is this about?", text: $subject)
                                .autocapitalization(.sentences)
                        }
                        
                        // Message Field
                        VStack(alignment: .leading, spacing: 8) {
                            HStack(spacing: 6) {
                                Image(systemName: "text.bubble.fill")
                                    .font(.caption)
                                    .foregroundColor(Color(red: 0.39, green: 0.40, blue: 0.95))
                                Text("Message")
                                    .font(.caption.weight(.semibold))
                                    .foregroundColor(.secondary)
                            }
                            
                            TextEditor(text: $message)
                                .frame(minHeight: 140)
                                .padding(12)
                                .background(Color(.secondarySystemBackground))
                                .clipShape(RoundedRectangle(cornerRadius: 12))
                                .overlay(
                                    RoundedRectangle(cornerRadius: 12)
                                        .stroke(Color(.separator).opacity(0.5), lineWidth: 1)
                                )
                                .overlay(alignment: .topLeading) {
                                    if message.isEmpty {
                                        Text("Tell us how we can help...")
                                            .foregroundColor(.secondary.opacity(0.5))
                                            .padding(.horizontal, 16)
                                            .padding(.vertical, 20)
                                            .allowsHitTesting(false)
                                    }
                                }
                        }
                        
                        // Send Button
                        Button(action: sendEmail) {
                            HStack(spacing: 8) {
                                if isSending {
                                    ProgressView()
                                        .progressViewStyle(CircularProgressViewStyle(tint: .white))
                                        .scaleEffect(0.8)
                                } else {
                                    Image(systemName: "paperplane.fill")
                                }
                                Text(isSending ? "Sending..." : "Send Message")
                                    .font(.headline)
                            }
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 16)
                            .background(
                                LinearGradient(
                                    colors: isFormValid
                                        ? [Color(red: 0.39, green: 0.40, blue: 0.95), Color(red: 0.58, green: 0.37, blue: 0.98)]
                                        : [Color.gray.opacity(0.5), Color.gray.opacity(0.4)],
                                    startPoint: .leading,
                                    endPoint: .trailing
                                )
                            )
                            .clipShape(RoundedRectangle(cornerRadius: 14))
                            .shadow(color: isFormValid ? Color(red: 0.39, green: 0.40, blue: 0.95).opacity(0.3) : .clear, radius: 10, x: 0, y: 4)
                        }
                        .disabled(!isFormValid || isSending)
                        .padding(.top, 4)
                        
                        // Contact Info
                        VStack(spacing: 12) {
                            Divider()
                                .padding(.vertical, 8)
                            
                            Text("Or reach us directly")
                                .font(.caption.weight(.semibold))
                                .foregroundColor(.secondary)
                            
                            HStack(spacing: 20) {
                                // Email
                                Link(destination: URL(string: "mailto:Software@OpticalAutomation.com")!) {
                                    HStack(spacing: 6) {
                                        Image(systemName: "envelope.fill")
                                            .font(.caption)
                                        Text("Email Us")
                                            .font(.caption.weight(.semibold))
                                    }
                                    .foregroundColor(Color(red: 0.39, green: 0.40, blue: 0.95))
                                    .padding(.horizontal, 16)
                                    .padding(.vertical, 10)
                                    .background(Color(red: 0.39, green: 0.40, blue: 0.95).opacity(0.1))
                                    .clipShape(RoundedRectangle(cornerRadius: 10))
                                }
                                
                                // Phone
                                Link(destination: URL(string: "tel:+17473544008")!) {
                                    HStack(spacing: 6) {
                                        Image(systemName: "phone.fill")
                                            .font(.caption)
                                        Text("Call Us")
                                            .font(.caption.weight(.semibold))
                                    }
                                    .foregroundColor(.green)
                                    .padding(.horizontal, 16)
                                    .padding(.vertical, 10)
                                    .background(Color.green.opacity(0.1))
                                    .clipShape(RoundedRectangle(cornerRadius: 10))
                                }
                            }
                        }
                    }
                    .padding(.horizontal, 20)
                    .padding(.bottom, 32)
                }
            }
        }
        .navigationTitle("Contact Us")
        .navigationBarTitleDisplayMode(.inline)
        .alert(alertTitle, isPresented: $showingAlert) {
            Button("OK", role: .cancel) {}
        } message: {
            Text(alertMessage)
        }
    }
    
    private var isFormValid: Bool {
        !name.trimmingCharacters(in: .whitespaces).isEmpty &&
        !email.trimmingCharacters(in: .whitespaces).isEmpty &&
        email.contains("@") &&
        !subject.trimmingCharacters(in: .whitespaces).isEmpty &&
        !message.trimmingCharacters(in: .whitespaces).isEmpty
    }
    
    private func sendEmail() {
        isSending = true
        
        let subjectEncoded = subject.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? subject
        let bodyText = "Name: \(name)\nEmail: \(email)\n\n\(message)"
        let bodyEncoded = bodyText.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? bodyText
        
        // Build mailto URL
        let mailtoString = "mailto:\(recipientEmail)?subject=\(subjectEncoded)&body=\(bodyEncoded)"
        
        // Try mailto first (Apple Mail)
        if let mailtoURL = URL(string: mailtoString),
           UIApplication.shared.canOpenURL(mailtoURL) {
            UIApplication.shared.open(mailtoURL) { success in
                DispatchQueue.main.async {
                    isSending = false
                    if success { sent = true }
                    else { tryAlternativeMailApps(subject: subjectEncoded, body: bodyEncoded) }
                }
            }
            return
        }
        
        // If mailto can't open, try alternatives
        tryAlternativeMailApps(subject: subjectEncoded, body: bodyEncoded)
    }
    
    private func tryAlternativeMailApps(subject: String, body: String) {
        // Try Gmail
        let gmailString = "googlegmail:///co?to=\(recipientEmail)&subject=\(subject)&body=\(body)"
        if let gmailURL = URL(string: gmailString),
           UIApplication.shared.canOpenURL(gmailURL) {
            UIApplication.shared.open(gmailURL) { _ in
                DispatchQueue.main.async {
                    isSending = false
                    sent = true
                }
            }
            return
        }
        
        // Try Outlook
        let outlookString = "ms-outlook://compose?to=\(recipientEmail)&subject=\(subject)&body=\(body)"
        if let outlookURL = URL(string: outlookString),
           UIApplication.shared.canOpenURL(outlookURL) {
            UIApplication.shared.open(outlookURL) { _ in
                DispatchQueue.main.async {
                    isSending = false
                    sent = true
                }
            }
            return
        }
        
        // Try Yahoo Mail
        let yahooString = "ymail://mail/compose?to=\(recipientEmail)&subject=\(subject)&body=\(body)"
        if let yahooURL = URL(string: yahooString),
           UIApplication.shared.canOpenURL(yahooURL) {
            UIApplication.shared.open(yahooURL) { _ in
                DispatchQueue.main.async {
                    isSending = false
                    sent = true
                }
            }
            return
        }
        
        // No mail app available — copy message to clipboard
        DispatchQueue.main.async {
            isSending = false
            let clipboardText = """
            To: \(recipientEmail)
            Subject: \(subject)
            
            Name: \(name)
            Email: \(email)
            
            \(message)
            """
            UIPasteboard.general.string = clipboardText
            alertTitle = "Message Copied"
            alertMessage = "No mail app was found on this device. Your message has been copied to the clipboard. Please paste it into your preferred email app and send it to \(recipientEmail)."
            showingAlert = true
        }
    }
}

// MARK: - Form Field Component
struct FormField<Content: View>: View {
    let label: String
    let icon: String
    @ViewBuilder let content: Content
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack(spacing: 6) {
                Image(systemName: icon)
                    .font(.caption)
                    .foregroundColor(Color(red: 0.39, green: 0.40, blue: 0.95))
                Text(label)
                    .font(.caption.weight(.semibold))
                    .foregroundColor(.secondary)
            }
            
            content
                .padding(14)
                .background(Color(.secondarySystemBackground))
                .clipShape(RoundedRectangle(cornerRadius: 12))
                .overlay(
                    RoundedRectangle(cornerRadius: 12)
                        .stroke(Color(.separator).opacity(0.5), lineWidth: 1)
                )
        }
    }
}

#Preview {
    NavigationStack {
        ContactFormView()
    }
}
