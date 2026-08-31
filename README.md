# 🛡️ GigSecure – Cyber Security & Fraud Protection System for Gig Workers

**Academic Project Submission (2026–2027)**  
**College:** Bhavna Trust Degree College  
**Degree:** Bachelor of Science in Computer Science (B.Sc. CS) – Third Year (TY)  
**Author:** Ashab ul haq Ansari  

---

## 📌 Project Overview
**GigSecure** is a cybersecurity and fraud protection web application engineered specifically for gig economy workers (Zomato/Swiggy delivery riders, Uber/Ola drivers, Zepto/Blinkit quick-commerce partners). It addresses the rapid surge of digital scams targeting gig workers across India, including:

- **Reverse UPI QR Code Scam** (extortion during tip/payment transfers)
- **Account Suspension & KYC Audit Phishing Threats** (fraud calls harvesting OTPs)
- **Typosquatting & Malicious Bonus Links** (zomato-partner-bonus.xyz, swiggy-orders-refund.net)
- **Malicious APK Trojans** (fraudulent batch grabbers / auto-accept bots)

The application matches all requirements defined in the Bhavna Trust Degree College Project Report across **Chapters 1 to 5**, including Functional Requirements **FR1 to FR11**, Architecture models, and formal verification test cases **TC01 to TC08**.

---

## 🚀 How to Run in VS Code (Simple 1-Click Instructions)

### Option 1: One-Click Startup (Recommended)
1. Open this project folder in **VS Code**:
   File -> Open Folder... -> Select 'GigSecure'
2. Open the built-in VS Code Terminal (Ctrl + ~ or ` Ctrl +  `).
3. Type:
   `cmd
   .\start.bat
   `
   *This will launch the Node.js server and open http://localhost:3000 automatically in your browser.*

### Option 2: Running via Node.js
`ash
node server/server.js
`
Then visit: [http://localhost:3000](http://localhost:3000)

### Option 3: Running directly in Browser (Zero Server Required)
Simply double click index.html or right click index.html in VS Code and select **"Open with Live Server"** or open with Google Chrome. All scanning heuristic engines and LocalStorage databases run 100% locally in the browser!

---

## 🎯 Key Features & Requirements Matrix

| SRS Requirement | Feature Description | Implementation Details |
|---|---|---|
| **FR1 & FR2** | User Registration & Role-Based Auth | Registration with role selection (Gig Worker vs Administrator Ashab ul haq Ansari), persistent login session, and role switching. |
| **FR3** | Interactive Dashboard | Real-time Safety Score (0-100%), active advisory cards, live threat counters, quick action triggers. |
| **FR4 & FR6** | Suspicious URL Scanner | Typosquatting detection, homoglyphs, IP address heuristics, bad TLDs (.xyz, .buzz), risk classification (Safe / Suspicious / High Risk). |
| **FR5 & FR6** | SMS / WhatsApp Analyzer | NLP fraud pattern extraction detecting UPI QR code traps, OTP theft, urgency deactivation threats, and malicious APK lures. |
| **FR7** | Real-Time Security Alerts | Dynamic advisory cards with severity color-coding (Critical Red, Warning Amber, Info Blue). |
| **FR8 & FR10** | Fraud Incident Reporting & History | Form to report scam attempts with platform tags and loss tracking; status monitoring desk (*Pending Review*, *Investigating*, *Resolved*). |
| **FR9** | Cyber Awareness & Security Hub | Gig Worker DOs and DONTs, Golden Rule of UPI visual breakdown, Indian Cyber Helpline (1930) direct link. |
| **FR11** | Admin Operations Center | Manage threat intelligence database, broadcast real-time alerts, review & resolve submitted incident tickets. |
| **Future Scope 5.6** | Multilingual Support | 4 Indian languages: **English**, **हिन्दी (Hindi)**, **मराठी (Marathi)**, and **தமிழ் (Tamil)**. |
| **Future Scope 5.6** | Interactive Scam Simulator / Quiz | 5 practical scam situations with instant scoring, feedback, and verifiable digital safety certificate. |
| **Chapter 5.3** | Live Test Suite Runner | Automated test harness executing all 8 formal test cases (**TC01 to TC08**) live on UI with progress bar. |

---

## 🧪 Verification of Academic Test Cases (Chapter 5.3)

In the application, navigate to the **"Test Suite (TC01-08)"** tab and click **"Run Full System Test Suite"** to demonstrate the test results live during viva:

1. **TC01 - User Registration**: Validates account creation for new gig workers.
2. **TC02 - User Authentication**: Validates secure login and credential checks.
3. **TC03 - High-Risk URL Detection**: Scans http://zomato-partner-bonus.xyz/login -> Flags *High Risk (Typosquatting & Bad TLD)*.
4. **TC04 - Safe URL Detection**: Scans https://www.zomato.com/partner -> Flags *Safe (Legitimate official domain)*.
5. **TC05 - Fraud SMS Analysis**: Analyzes "Scan QR code and enter UPI PIN to receive ₹200 tip" -> Flags *High Risk (UPI Extortion)*.
6. **TC06 - Safe Chat Analysis**: Analyzes "Please leave the food packet at security gate" -> Flags *Safe*.
7. **TC07 - Incident Report Logging**: Verifies logging of incident ticket with tracking ID and persistence.
8. **TC08 - Admin Threat Management**: Verifies addition of new threat indicators by Chief Administrator Ashab ul haq Ansari.

---

## 📂 Project Structure

`
GigSecure/
├── index.html            # Main Single-Page Application with 10 interactive tabs
├── start.bat             # 1-Click Windows execution script
├── server.ps1            # Zero-dependency PowerShell server
├── package.json          # Node project metadata & scripts
├── README.md             # Project documentation & submission guide
├── css/
│   └── style.css         # Dark cyber styling, glow animations & responsive UI
├── js/
│   ├── i18n.js           # Multilingual translations (EN, HI, MR, TA)
│   ├── database.js       # LocalStorage entity models & Indian gig seed data
│   ├── scanner.js        # Deep heuristic engine for URL & SMS threat analysis
│   ├── auth.js           # RBAC (Gig Worker vs Admin Ashab ul haq Ansari)
│   ├── quiz.js           # Scam simulation quiz & digital certificate generator
│   ├── admin.js          # Security Operations Desk & threat broadcaster
│   ├── testrunner.js     # Live automated test runner for TC01-TC08
│   └── app.js            # Main application coordinator & UI event handler
└── server/
    └── server.js         # REST API server (Chapter 4.5) & static file host
`

---

## 🎓 Viva Presentation Tips for Ashab ul haq Ansari

1. **Problem Statement**: Explain that delivery riders and cab drivers are frequently defrauded by fake QR code payments and fake KYC deactivation calls because existing security tools are complex and not tailored for gig workflows.
2. **Core Innovation**: Highlight the **offline-capable heuristic engine** that instantly spots reverse UPI scams and platform typosquatting, combined with **multilingual accessibility** (Hindi, Marathi, Tamil, English).
3. **Live Demonstration Flow**:
   - Step 1: Open Dashboard showing 96% Safety Score and Live Advisories.
   - Step 2: Show URL Scanner with zomato-partner-bonus.xyz (High Risk) vs zomato.com (Safe).
   - Step 3: Show Message Analyzer with the QR Code Tip scam.
   - Step 4: Show the Multilingual switcher changing to Hindi/Marathi.
   - Step 5: Run the **Test Suite (TC01-08)** tab to show 100% Pass rate on academic test cases.
   - Step 6: Switch to **Admin Portal (Ashab ul haq Ansari)** to show how new scam alerts are broadcasted to riders.

---
**Developed with ❤️ by Ashab ul haq Ansari**  
*Department of Computer Science, Bhavna Trust Degree College (2026–2027)*