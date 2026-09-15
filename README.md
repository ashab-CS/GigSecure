# 🛡️ GigSecure – Cyber Security & Fraud Protection System for Gig Workers

---

## 📌 Project Overview
**GigSecure** is a modern, lightweight cybersecurity web platform engineered specifically for gig economy workers (Zomato/Swiggy delivery partners, Uber/Ola cab drivers, Zepto/Blinkit quick-commerce riders, and freelancers).

It protects workers against:
- **Reverse UPI QR Code Scams** (fraud during customer tip/payment transfers)
- **Account Block & Deactivation Threats** (fake support calls harvesting OTPs)
- **Typosquatting & Phishing Bonus Links** (`zomato-partner-bonus.xyz`, `swiggy-orders-refund.net`)
- **Malicious APK Trojans** (fraudulent batch grabbers / auto-accept bots)

---

## 🚀 How to Run Locally

### Option 1: One-Click Startup (Windows)
Double-click `start.bat` in the project folder to automatically start the local server and open `http://localhost:3000` in your default browser.

### Option 2: Run via Node.js
```bash
node server/server.js
```
Then open: [http://localhost:3000](http://localhost:3000)

### Option 3: Direct Browser Access
Double-click `index.html` to open it directly in Chrome, Firefox, or Edge. All threat heuristic scanners and multilingual features run 100% locally.

---

## 🎯 Key Modules & Features

1. **Clean Authentication Gateway**: Direct Sign In and Account Registration with Date of Birth and Platform selection.
2. **Dashboard**: Live scan counter and real-time fraud advisory alerts.
3. **URL Scanner**: Typosquatting, raw IP, and phishing link detector.
4. **Message Analyzer**: NLP fraud engine detecting UPI PIN traps, OTP extortion, and fake customer chats.
5. **Security Hub**: Essential DOs & DONTs and the Golden Rule of UPI.
6. **Scam Simulator**: 5 interactive real-world scam challenges with verifiable digital safety certificates.
7. **User Profile Management**: Manage Full Name, Date of Birth (DOB), Gig Platform, and custom Profile Photo.
8. **Full Multilingual Support**: English, Hindi (हिन्दी), Marathi (मराठी), and Tamil (தமிழ்).