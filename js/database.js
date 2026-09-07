// GigSecure Database Layer & Persistent Storage
// Implements Schema from Chapter 4.4: USER, SECURITY_CHECK, INCIDENT, THREAT, SECURITY_ALERT

class GigSecureDB {
  constructor() {
    this.STORAGE_KEYS = {
      USERS: 'gigsecure_users',
      CHECKS: 'gigsecure_checks',
      INCIDENTS: 'gigsecure_incidents',
      THREATS: 'gigsecure_threats',
      ALERTS: 'gigsecure_alerts',
      CURRENT_USER: 'gigsecure_current_user'
    };
    this.initSeedData();
  }

  initSeedData() {
    // Seed Users (Worker & Admin accounts)
    if (!localStorage.getItem(this.STORAGE_KEYS.USERS)) {
      const defaultUsers = [
        {
          user_id: "USR-101",
          name: "Ashab ul haq Ansari",
          email: "ashab@gigsecure.internal",
          password: "password123",
          role: "admin",
          platform: "Admin / Security Analyst",
          phone: "+91 9876543210",
          created_at: new Date(Date.now() - 30 * 86400000).toISOString()
        },
        {
          user_id: "USR-102",
          name: "Rahul Sharma",
          email: "rahul.rider@gmail.com",
          password: "password123",
          role: "worker",
          platform: "Zomato & Swiggy Delivery Partner",
          phone: "+91 9123456780",
          created_at: new Date(Date.now() - 15 * 86400000).toISOString()
        },
        {
          user_id: "USR-103",
          name: "Amit Patel",
          email: "amit.driver@gmail.com",
          password: "password123",
          role: "worker",
          platform: "Uber & Ola Cab Driver",
          phone: "+91 9988776655",
          created_at: new Date(Date.now() - 5 * 86400000).toISOString()
        }
      ];
      localStorage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));
    }

    // Seed Threat Intelligence Database (FR6, FR11)
    if (!localStorage.getItem(this.STORAGE_KEYS.THREATS)) {
      const defaultThreats = [
        {
          threat_id: "THR-001",
          threat_type: "Phishing Domain",
          indicator: "zomato-partner-bonus.xyz",
          risk_level: "High Risk",
          targeted_platform: "Zomato",
          description: "Fake partner portal promising ₹3000 weekend incentive to steal banking credentials & OTP.",
          created_at: new Date(Date.now() - 2 * 86400000).toISOString()
        },
        {
          threat_id: "THR-002",
          threat_type: "QR Code Payment Deception",
          indicator: "pay-receive-swiggy-refund.top",
          risk_level: "High Risk",
          targeted_platform: "Swiggy",
          description: "Scammer sends QR code claiming it is to receive tip/refund; scanning attempts to deduct funds.",
          created_at: new Date(Date.now() - 4 * 86400000).toISOString()
        },
        {
          threat_id: "THR-003",
          threat_type: "Fake Support Call / Impersonation",
          indicator: "+91 8800112233",
          risk_level: "High Risk",
          targeted_platform: "Uber / Ola",
          description: "Caller claims to be Uber Fleet Support demanding driver profile OTP to avoid permanent ID deactivation.",
          created_at: new Date(Date.now() - 6 * 86400000).toISOString()
        },
        {
          threat_id: "THR-004",
          threat_type: "Malicious APK",
          indicator: "zepto_fast_bonus_v3.apk",
          risk_level: "High Risk",
          targeted_platform: "Zepto / Blinkit",
          description: "Trojanized APK sent via WhatsApp promising auto-accept bot that logs SMS and intercepts bank OTPs.",
          created_at: new Date(Date.now() - 8 * 86400000).toISOString()
        },
        {
          threat_id: "THR-005",
          threat_type: "Insecure IP Endpoint",
          indicator: "192.168.1.10/otp-login",
          risk_level: "High Risk",
          targeted_platform: "General Gig Portals",
          description: "Raw IP address hosting unauthorized fake login portal harvesting rider login passwords.",
          created_at: new Date(Date.now() - 10 * 86400000).toISOString()
        },
        {
          threat_id: "THR-006",
          threat_type: "Suspicious Free Subdomain",
          indicator: "swiggy-orders-refund.net",
          risk_level: "Suspicious",
          targeted_platform: "Swiggy",
          description: "Unverified domain with no SSL certificate mimicking Swiggy order cancellation portal.",
          created_at: new Date(Date.now() - 12 * 86400000).toISOString()
        }
      ];
      localStorage.setItem(this.STORAGE_KEYS.THREATS, JSON.stringify(defaultThreats));
    }

    // Seed Security Alerts (FR7)
    if (!localStorage.getItem(this.STORAGE_KEYS.ALERTS)) {
      const defaultAlerts = [
        {
          alert_id: "ALT-201",
          title: "🚨 Active Scam: Fake QR Codes for Delivery Tips",
          message: "Scammers claiming to be customers are sending QR codes to delivery partners via WhatsApp claiming 'Scan to get ₹200 tip'. Remember: Receiving money NEVER requires entering your UPI PIN.",
          severity: "Critical",
          platform: "Zomato / Swiggy / Zepto",
          created_at: new Date().toISOString()
        },
        {
          alert_id: "ALT-202",
          title: "⚠️ Warning: Account Suspension OTP Calls Targeting Drivers",
          message: "Fraudsters impersonating Uber/Ola Fleet Support are calling drivers demanding 6-digit verification codes. Support representatives will NEVER ask for your OTP or password over phone.",
          severity: "Warning",
          platform: "Uber / Ola",
          created_at: new Date(Date.now() - 1 * 86400000).toISOString()
        },
        {
          alert_id: "ALT-203",
          title: "ℹ️ Advisory: Avoid Installing Unofficial Order Auto-Accept APKs",
          message: "Third-party 'Auto-clicker' or 'Batch Grabber' APKs circulating in Telegram groups contain keyloggers that steal bank credentials and device SMS permissions.",
          severity: "Info",
          platform: "All Gig Apps",
          created_at: new Date(Date.now() - 3 * 86400000).toISOString()
        }
      ];
      localStorage.setItem(this.STORAGE_KEYS.ALERTS, JSON.stringify(defaultAlerts));
    }

    // Seed Incident Reports (FR8, FR10)
    if (!localStorage.getItem(this.STORAGE_KEYS.INCIDENTS)) {
      const defaultIncidents = [
        {
          incident_id: "INC-801",
          user_id: "USR-102",
          user_name: "Rahul Sharma",
          platform: "Zomato",
          category: "Fake Payment / QR Scam",
          description: "Customer sent a QR code on WhatsApp saying they paid online and I must scan it to confirm payment. When scanned, GPay asked for my PIN to pay ₹1,500. I stopped immediately.",
          loss_amount: "₹0 (Prevented)",
          status: "Resolved",
          created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
          admin_note: "Verified as known UPI reverse-request fraud. Indicator added to threat intelligence database."
        },
        {
          incident_id: "INC-802",
          user_id: "USR-103",
          user_name: "Amit Patel",
          platform: "Uber",
          category: "OTP & Credential Scam",
          description: "Received a phone call from +91 8800112233 claiming to be Uber Central Office. They said my rating was under review and demanded the OTP sent to my phone.",
          loss_amount: "₹0 (Prevented)",
          status: "Investigating",
          created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
          admin_note: "Phone number flagged in system database and report submitted for carrier blocking."
        },
        {
          incident_id: "INC-803",
          user_id: "USR-102",
          user_name: "Rahul Sharma",
          platform: "Swiggy",
          category: "Phishing Link",
          description: "Received SMS claiming ₹4,500 weekend incentive from link http://swiggy-orders-refund.net. Checked on GigSecure and got HIGH RISK warning.",
          loss_amount: "₹0",
          status: "Pending Review",
          created_at: new Date(Date.now() - 4 * 3600000).toISOString(),
          admin_note: "Awaiting analyst verification."
        }
      ];
      localStorage.setItem(this.STORAGE_KEYS.INCIDENTS, JSON.stringify(defaultIncidents));
    }

    // Seed Security Checks History (FR3, FR10)
    if (!localStorage.getItem(this.STORAGE_KEYS.CHECKS)) {
      const defaultChecks = [
        {
          check_id: "CHK-501",
          user_id: "USR-102",
          input_type: "URL",
          input_data: "http://zomato-partner-bonus.xyz/login",
          risk_level: "High Risk",
          result: "Scam Detected: Typosquatting domain + Insecure HTTP + Suspicious TLD (.xyz)",
          created_at: new Date(Date.now() - 5 * 3600000).toISOString()
        },
        {
          check_id: "CHK-502",
          user_id: "USR-102",
          input_type: "URL",
          input_data: "https://www.zomato.com/partner",
          risk_level: "Safe",
          result: "Verified Official Zomato Portal (Valid SSL, Certified Domain)",
          created_at: new Date(Date.now() - 12 * 3600000).toISOString()
        },
        {
          check_id: "CHK-503",
          user_id: "USR-103",
          input_type: "Message",
          input_data: "URGENT: Your Uber driver account is suspended. Call 8800112233 immediately and share OTP to reactivate.",
          risk_level: "High Risk",
          result: "Phishing Detected: Fake Account Suspension + OTP Demand + Unofficial Support Number",
          created_at: new Date(Date.now() - 24 * 3600000).toISOString()
        }
      ];
      localStorage.setItem(this.STORAGE_KEYS.CHECKS, JSON.stringify(defaultChecks));
    }
  }

  // --- User Operations ---
  getUsers() {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.USERS) || '[]');
  }

  getUserById(id) {
    return this.getUsers().find(u => u.user_id === id);
  }

  getUserByEmail(email) {
    return this.getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  createUser(userData) {
    const users = this.getUsers();
    const newUser = {
      user_id: `USR-${Date.now().toString().slice(-4)}`,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role || 'worker',
      platform: userData.platform || 'General Gig Worker',
      phone: userData.phone || '+91 9000000000',
      created_at: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(users));
    return newUser;
  }

  // --- Threat Operations ---
  getThreats() {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.THREATS) || '[]');
  }

  addThreat(threatData) {
    const threats = this.getThreats();
    const newThreat = {
      threat_id: `THR-${Date.now().toString().slice(-3)}`,
      threat_type: threatData.threat_type || 'Phishing Domain',
      indicator: threatData.indicator,
      risk_level: threatData.risk_level || 'High Risk',
      targeted_platform: threatData.targeted_platform || 'General',
      description: threatData.description || 'Reported suspicious indicator',
      created_at: new Date().toISOString()
    };
    threats.unshift(newThreat);
    localStorage.setItem(this.STORAGE_KEYS.THREATS, JSON.stringify(threats));
    return newThreat;
  }

  deleteThreat(id) {
    let threats = this.getThreats();
    threats = threats.filter(t => t.threat_id !== id);
    localStorage.setItem(this.STORAGE_KEYS.THREATS, JSON.stringify(threats));
  }

  // --- Security Checks History ---
  getChecks(userId = null) {
    const checks = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.CHECKS) || '[]');
    if (userId) {
      return checks.filter(c => c.user_id === userId);
    }
    return checks;
  }

  addCheck(checkData) {
    const checks = this.getChecks();
    const newCheck = {
      check_id: `CHK-${Date.now().toString().slice(-3)}`,
      user_id: checkData.user_id || 'USR-ANON',
      input_type: checkData.input_type,
      input_data: checkData.input_data,
      risk_level: checkData.risk_level,
      result: checkData.result,
      created_at: new Date().toISOString()
    };
    checks.unshift(newCheck);
    localStorage.setItem(this.STORAGE_KEYS.CHECKS, JSON.stringify(checks));
    return newCheck;
  }

  // --- Incidents Operations ---
  getIncidents(userId = null) {
    const incidents = JSON.parse(localStorage.getItem(this.STORAGE_KEYS.INCIDENTS) || '[]');
    if (userId) {
      return incidents.filter(inc => inc.user_id === userId);
    }
    return incidents;
  }

  addIncident(incidentData) {
    const incidents = this.getIncidents();
    const newIncident = {
      incident_id: `INC-${Date.now().toString().slice(-3)}`,
      user_id: incidentData.user_id,
      user_name: incidentData.user_name || 'Gig Worker',
      platform: incidentData.platform || 'General',
      category: incidentData.category,
      description: incidentData.description,
      loss_amount: incidentData.loss_amount || '₹0',
      status: 'Pending Review',
      created_at: new Date().toISOString(),
      admin_note: 'Submitted to security desk for investigation.'
    };
    incidents.unshift(newIncident);
    localStorage.setItem(this.STORAGE_KEYS.INCIDENTS, JSON.stringify(incidents));
    return newIncident;
  }

  updateIncidentStatus(incidentId, status, adminNote = '') {
    const incidents = this.getIncidents();
    const inc = incidents.find(i => i.incident_id === incidentId);
    if (inc) {
      inc.status = status;
      if (adminNote) inc.admin_note = adminNote;
      localStorage.setItem(this.STORAGE_KEYS.INCIDENTS, JSON.stringify(incidents));
      return inc;
    }
    return null;
  }

  // --- Alerts Operations ---
  getAlerts() {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.ALERTS) || '[]');
  }

  addAlert(alertData) {
    const alerts = this.getAlerts();
    const newAlert = {
      alert_id: `ALT-${Date.now().toString().slice(-3)}`,
      title: alertData.title,
      message: alertData.message,
      severity: alertData.severity || 'Warning',
      platform: alertData.platform || 'All Platforms',
      created_at: new Date().toISOString()
    };
    alerts.unshift(newAlert);
    localStorage.setItem(this.STORAGE_KEYS.ALERTS, JSON.stringify(alerts));
    return newAlert;
  }
}

window.GigDB = new GigSecureDB();
