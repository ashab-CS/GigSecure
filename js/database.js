// GigSecure Database Layer & Persistent Storage
// Manages User Profiles, Security Checks, Live Threat DB, and System Alerts

class GigSecureDB {
  constructor() {
    this.STORAGE_KEYS = {
      USERS: 'gigsecure_users',
      CHECKS: 'gigsecure_checks',
      THREATS: 'gigsecure_threats',
      ALERTS: 'gigsecure_alerts',
      CURRENT_USER: 'gigsecure_current_user'
    };
    this.initSeedData();
  }

  initSeedData() {
    // Seed Users with DOB, Photo, Platform
    if (!localStorage.getItem(this.STORAGE_KEYS.USERS)) {
      const defaultUsers = [
        {
          user_id: "USR-101",
          name: "Rahul Sharma",
          email: "rahul.rider@gmail.com",
          password: "password123",
          role: "worker",
          platform: "Zomato & Swiggy Delivery Partner",
          phone: "+91 9123456780",
          dob: "1998-08-20",
          photo: "",
          created_at: new Date(Date.now() - 15 * 86400000).toISOString()
        },
        {
          user_id: "USR-102",
          name: "Pooja Verma",
          email: "pooja.rider@gmail.com",
          password: "password123",
          role: "worker",
          platform: "Zepto & Blinkit Rider",
          phone: "+91 9876543210",
          dob: "2000-03-14",
          photo: "",
          created_at: new Date(Date.now() - 10 * 86400000).toISOString()
        },
        {
          user_id: "USR-103",
          name: "Amit Patel",
          email: "amit.driver@gmail.com",
          password: "password123",
          role: "worker",
          platform: "Uber & Ola Cab Driver",
          phone: "+91 9988776655",
          dob: "1995-11-28",
          photo: "",
          created_at: new Date(Date.now() - 5 * 86400000).toISOString()
        }
      ];
      localStorage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));
    }

    // Seed Threat Intelligence Indicators
    if (!localStorage.getItem(this.STORAGE_KEYS.THREATS)) {
      const defaultThreats = [
        {
          threat_id: "THR-001",
          threat_type: "Phishing Domain",
          indicator: "zomato-partner-bonus.xyz",
          risk_level: "High Risk",
          targeted_platform: "Zomato",
          description: "Fake partner portal promising ₹3000 festival bonus to steal login credentials and UPI PIN.",
          created_at: new Date(Date.now() - 2 * 86400000).toISOString()
        },
        {
          threat_id: "THR-002",
          threat_type: "QR Code Payment Scam",
          indicator: "pay-receive-swiggy-refund.top",
          risk_level: "High Risk",
          targeted_platform: "Swiggy",
          description: "Scammer sends QR code claiming it is to receive customer tip; scanning code deducts money from wallet.",
          created_at: new Date(Date.now() - 4 * 86400000).toISOString()
        },
        {
          threat_id: "THR-003",
          threat_type: "Fake Support Call / Impersonation",
          indicator: "+91 8800112233",
          risk_level: "High Risk",
          targeted_platform: "Uber / Ola",
          description: "Caller poses as Uber fleet manager claiming KYC expiration and urgently demanding account OTP.",
          created_at: new Date(Date.now() - 6 * 86400000).toISOString()
        },
        {
          threat_id: "THR-004",
          threat_type: "Malicious APK Bot",
          indicator: "zepto_fast_orders_v2.apk",
          risk_level: "High Risk",
          targeted_platform: "Zepto / Blinkit",
          description: "Trojanized APK claiming to auto-accept high-value orders while harvesting banking SMS messages in background.",
          created_at: new Date(Date.now() - 8 * 86400000).toISOString()
        },
        {
          threat_id: "THR-005",
          threat_type: "Raw IP Phishing Host",
          indicator: "http://192.168.1.10/otp-login",
          risk_level: "High Risk",
          targeted_platform: "General Gig Portals",
          description: "Direct numerical IP address hosting a clone of gig partner sign-in page without SSL encryption.",
          created_at: new Date(Date.now() - 10 * 86400000).toISOString()
        },
        {
          threat_id: "THR-006",
          threat_type: "Typosquatting Subdomain",
          indicator: "swiggy-orders-refund.net",
          risk_level: "Suspicious",
          targeted_platform: "Swiggy",
          description: "Domain using brand name in prefix to deceive riders into confirming canceled order refunds.",
          created_at: new Date(Date.now() - 12 * 86400000).toISOString()
        }
      ];
      localStorage.setItem(this.STORAGE_KEYS.THREATS, JSON.stringify(defaultThreats));
    }

    // Seed Live Threat Advisories
    if (!localStorage.getItem(this.STORAGE_KEYS.ALERTS)) {
      const defaultAlerts = [
        {
          alert_id: "ALT-001",
          severity: "Critical",
          title: "Urgent Warning: Fake UPI QR Codes Sent via WhatsApp for Customer Tips",
          message: "Scammers are sending QR codes to delivery partners claiming to pay extra tips. In India UPI, you NEVER need to scan a QR code or enter your UPI PIN to receive money. Do not scan any customer-provided QR code!",
          affected_platforms: "Zomato, Swiggy, Zepto",
          timestamp: new Date().toISOString()
        },
        {
          alert_id: "ALT-002",
          severity: "Warning",
          title: "Phishing Campaign: Fake ₹4500 Monsoon Bonus Messages",
          message: "SMS messages offering bonus cash via links like 'zomato-partner-bonus.xyz' are circulating. These are malicious credential harvesters. All legitimate bonuses are credited directly to your in-app earnings wallet.",
          affected_platforms: "All Delivery Riders",
          timestamp: new Date(Date.now() - 3600000 * 5).toISOString()
        },
        {
          alert_id: "ALT-003",
          severity: "Info",
          title: "Account Safety Reminder: Official Support Never Requests Login OTP",
          message: "Never share OTP over phone calls or SMS. If an order has an address dispute or cancellation, resolve it strictly through the in-app support chat.",
          affected_platforms: "Uber, Ola, Rapido, Porter",
          timestamp: new Date(Date.now() - 3600000 * 24).toISOString()
        }
      ];
      localStorage.setItem(this.STORAGE_KEYS.ALERTS, JSON.stringify(defaultAlerts));
    }

    // Initialize Checks Array
    if (!localStorage.getItem(this.STORAGE_KEYS.CHECKS)) {
      localStorage.setItem(this.STORAGE_KEYS.CHECKS, JSON.stringify([]));
    }
  }

  // --- USER OPERATIONS ---
  getUsers() {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.USERS) || '[]');
  }

  getUserByEmail(email) {
    const users = this.getUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  getUserById(id) {
    const users = this.getUsers();
    return users.find(u => u.user_id === id);
  }

  createUser(userData) {
    const users = this.getUsers();
    const newUser = {
      user_id: `USR-${100 + users.length + 1}`,
      name: userData.name || "Gig Partner",
      email: userData.email,
      password: userData.password,
      role: "worker",
      platform: userData.platform || "Gig Delivery Partner",
      phone: userData.phone || "+91 9800000000",
      dob: userData.dob || "1998-01-01",
      photo: userData.photo || "",
      created_at: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(users));
    return newUser;
  }

  updateUser(userId, updatedFields) {
    const users = this.getUsers();
    const index = users.findIndex(u => u.user_id === userId);
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedFields };
      localStorage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(users));
      return users[index];
    }
    return null;
  }

  // --- SECURITY CHECKS (SCAN HISTORY) ---
  getChecks() {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.CHECKS) || '[]');
  }

  addCheck(checkData) {
    const checks = this.getChecks();
    const newCheck = {
      check_id: `CHK-${String(checks.length + 1).padStart(3, '0')}`,
      user_id: checkData.user_id || 'ANON',
      input_type: checkData.input_type || 'URL',
      input_data: checkData.input_data,
      risk_level: checkData.risk_level || 'Safe',
      threat_category: checkData.threat_category || 'None',
      indicators: checkData.indicators || [],
      action_recommended: checkData.action_recommended || 'Safe to proceed',
      timestamp: new Date().toISOString()
    };
    checks.unshift(newCheck);
    localStorage.setItem(this.STORAGE_KEYS.CHECKS, JSON.stringify(checks));
    return newCheck;
  }

  // --- THREATS & ALERTS ---
  getThreats() {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.THREATS) || '[]');
  }

  getAlerts() {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.ALERTS) || '[]');
  }
}

window.GigDB = new GigSecureDB();