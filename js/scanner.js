// GigSecure Threat Analysis & Scam Detection Engine
// Implements FR4 (URL Checking), FR5 (Message Analysis) & FR6 (Threat Classification)

class ThreatScanner {
  constructor() {
    this.GENUINE_DOMAINS = [
      'zomato.com', 'swiggy.com', 'uber.com', 'olacabs.com', 'zepto.com', 'zeptonow.com',
      'blinkit.com', 'grofers.com', 'dunzo.com', 'urbancompany.com', 'rapido.bike', 'porter.in',
      'shadowfax.in', 'delhivery.com', 'paytm.com', 'phonepe.com', 'google.com',
      'cybercrime.gov.in', 'npci.org.in', 'rbi.org.in'
    ];

    this.SUSPICIOUS_TLDS = [
      '.xyz', '.top', '.tk', '.ml', '.ga', '.cf', '.gq', '.buzz', '.club', '.work',
      '.click', '.site', '.vip', '.rest', '.quest', '.cam', '.live', '.cc', '.info'
    ];

    this.PHISHING_KEYWORDS = [
      'bonus', 'reward', 'cashback', 'refund', 'incentive', 'kyc', 'verify', 'verification',
      'account-block', 'suspended', 'deactivated', 'urgent', 'wallet-update', 'claim-money',
      'instant-pay', 'penalty', 'fine-waive', 'rating-protection', 'tip-received'
    ];

    this.GIG_BRANDS = [
      'zomato', 'swiggy', 'uber', 'ola', 'zepto', 'blinkit', 'dunzo', 'urbancompany',
      'rapido', 'porter', 'shadowfax', 'paytm', 'phonepe', 'gpay'
    ];
  }

  // --- URL ANALYSIS ENGINE (FR4) ---
  analyzeURL(rawUrl) {
    if (!rawUrl || typeof rawUrl !== 'string' || !rawUrl.trim()) {
      return {
        isValid: false,
        error: "Please enter a valid URL to analyze."
      };
    }

    let url = rawUrl.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    let parsed;
    try {
      parsed = new URL(url);
    } catch (e) {
      return {
        isValid: false,
        error: "Malformed URL format. Please check the URL syntax."
      };
    }

    const hostname = parsed.hostname.toLowerCase();
    const pathname = parsed.pathname.toLowerCase();
    const fullUrl = url.toLowerCase();
    const isHttps = parsed.protocol === 'https:';

    const findings = [];
    let riskScore = 0; // 0 to 100

    // Check 1: Exact Threat Intelligence Database Match
    const knownThreats = window.GigDB ? window.GigDB.getThreats() : [];
    const directThreat = knownThreats.find(t => 
      hostname.includes(t.indicator.toLowerCase()) || fullUrl.includes(t.indicator.toLowerCase())
    );

    if (directThreat) {
      findings.push({
        rule: "Known Malicious Indicator in Threat Database",
        severity: "CRITICAL",
        detail: `Matches known threat entry [${directThreat.threat_id}]: ${directThreat.description}`
      });
      riskScore += 90;
    }

    // Check 2: Direct Whitelist match for genuine root domain
    const isGenuine = this.GENUINE_DOMAINS.some(d => hostname === d || hostname.endsWith('.' + d));
    if (isGenuine && !directThreat) {
      return {
        isValid: true,
        url: rawUrl,
        parsedHostname: hostname,
        riskLevel: "Safe",
        riskScore: 5,
        verdict: "Official Verified Domain",
        color: "emerald",
        badgeClass: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        findings: [
          {
            rule: "Legitimate Platform Domain",
            severity: "SAFE",
            detail: `The domain '${hostname}' belongs to verified official platform infrastructure with valid security certificates.`
          }
        ],
        recommendations: [
          "This is an official verified domain. Always ensure your app is kept updated from Google Play Store or Apple App Store.",
          "Remember: Official company representatives will never ask you for your personal banking UPI PIN or OTP."
        ]
      };
    }

    // Check 3: Raw IP Address URL
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (ipRegex.test(hostname)) {
      findings.push({
        rule: "Direct IP Address URL",
        severity: "HIGH",
        detail: `The URL uses a raw IP address (${hostname}) rather than an authenticated corporate domain name. Common tactic for phishing kits.`
      });
      riskScore += 45;
    }

    // Check 4: Insecure HTTP Protocol
    if (!isHttps) {
      findings.push({
        rule: "Unencrypted Connection (Insecure HTTP)",
        severity: "MEDIUM",
        detail: "The website does not use SSL/TLS encryption (HTTPS). Traffic and submitted data can be intercepted."
      });
      riskScore += 25;
    }

    // Check 5: Suspicious Free/Abused TLD
    const hasBadTld = this.SUSPICIOUS_TLDS.some(tld => hostname.endsWith(tld));
    if (hasBadTld) {
      findings.push({
        rule: "High-Risk Top-Level Domain (TLD)",
        severity: "HIGH",
        detail: `The domain uses a TLD commonly associated with disposable phishing campaigns (${this.SUSPICIOUS_TLDS.find(tld => hostname.endsWith(tld))}).`
      });
      riskScore += 35;
    }

    // Check 6: Brand Impersonation / Typosquatting
    let impersonatedBrand = null;
    for (const brand of this.GIG_BRANDS) {
      if (hostname.includes(brand) && !this.GENUINE_DOMAINS.some(d => hostname === d || hostname.endsWith('.' + d))) {
        impersonatedBrand = brand;
        findings.push({
          rule: `Brand Impersonation / Fake ${brand.toUpperCase()} Portal`,
          severity: "CRITICAL",
          detail: `The domain contains the brand name '${brand}', but is NOT hosted on the genuine ${brand} servers. This is a high-risk phishing indicator.`
        });
        riskScore += 50;
        break;
      }
    }

    // Check 7: Credential & Scam Lure Keywords in URL
    const matchedKeywords = this.PHISHING_KEYWORDS.filter(kw => fullUrl.includes(kw));
    if (matchedKeywords.length > 0) {
      findings.push({
        rule: "Suspicious Credential / Financial Lure Keywords",
        severity: matchedKeywords.length > 1 ? "HIGH" : "MEDIUM",
        detail: `Detected sensitive fraud trigger keywords in link structure: [${matchedKeywords.join(', ')}].`
      });
      riskScore += matchedKeywords.length * 15;
    }

    // Check 8: Deceptive Subdomain Nesting (e.g. uber.com.fake-server.xyz)
    const domainParts = hostname.split('.');
    if (domainParts.length > 3) {
      findings.push({
        rule: "Excessive Subdomain Stacking / Deceptive Structure",
        severity: "MEDIUM",
        detail: `Complex nested subdomains (${hostname}) detected, often used to disguise fake portals on mobile screens.`
      });
      riskScore += 20;
    }

    // Final Risk Classification
    riskScore = Math.min(100, Math.max(5, riskScore));
    let riskLevel = "Safe";
    let color = "emerald";
    let badgeClass = "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    let verdict = "No Major Threats Detected";

    if (riskScore >= 60) {
      riskLevel = "High Risk";
      color = "rose";
      badgeClass = "bg-rose-500/20 text-rose-400 border-rose-500/30";
      verdict = "DANGEROUS SCAM / PHISHING LINK DETECTED";
    } else if (riskScore >= 25) {
      riskLevel = "Suspicious";
      color = "amber";
      badgeClass = "bg-amber-500/20 text-amber-400 border-amber-500/30";
      verdict = "UNVERIFIED / SUSPICIOUS LINK";
    }

    const recommendations = [];
    if (riskLevel === "High Risk") {
      recommendations.push("DO NOT click this link or enter your login credentials, mobile number, or OTP.");
      recommendations.push("DO NOT download any APK or profile certificates from this webpage.");
      recommendations.push("Report this URL immediately in the 'Report Incident' tab to alert other gig workers.");
    } else if (riskLevel === "Suspicious") {
      recommendations.push("Exercise extreme caution. Do not make payments or submit KYC documents on this page.");
      recommendations.push("Verify the request directly through the official gig partner app (Zomato/Swiggy/Uber Help Section).");
    } else {
      recommendations.push("The domain appears standard, but always double-check the sender before sharing any personal information.");
    }

    return {
      isValid: true,
      url: rawUrl,
      parsedHostname: hostname,
      riskLevel,
      riskScore,
      verdict,
      color,
      badgeClass,
      findings,
      recommendations
    };
  }

  // --- MESSAGE / SMS / WHATSAPP ANALYZER (FR5) ---
  analyzeMessage(rawMessage) {
    if (!rawMessage || typeof rawMessage !== 'string' || !rawMessage.trim()) {
      return {
        isValid: false,
        error: "Please enter the message or SMS text to analyze."
      };
    }

    const text = rawMessage.trim();
    const lower = text.toLowerCase();
    const findings = [];
    let riskScore = 0;

    // Pattern 1: UPI QR Code Scam Lure ("Scan QR to receive payment")
    const qrScamRegex = /(scan.*qr.*(receive|get|credit|claim|accept)|qr.*code.*(payment|money|rupees|₹|rs)|enter.*pin.*(receive|get|refund))/i;
    if (qrScamRegex.test(lower) || (lower.includes('scan') && lower.includes('qr') && (lower.includes('receive') || lower.includes('credit') || lower.includes('tip')))) {
      findings.push({
        rule: "CRITICAL: UPI QR Code Payment Scam",
        severity: "CRITICAL",
        detail: "The message instructs you to scan a QR code or enter your PIN to 'receive' money. IN UPI, YOU NEVER SCAN OR ENTER PIN TO RECEIVE FUNDS! This will deduct money from your account."
      });
      riskScore += 65;
    }

    // Pattern 2: OTP / MPIN / Password Extortion
    const otpRegex = /(share.*otp|send.*otp|verification.*code|enter.*otp|tell.*otp|provide.*otp|give.*otp|mpin|cvv|atm.*pin)/i;
    if (otpRegex.test(lower)) {
      findings.push({
        rule: "OTP / Security Credential Harvesting",
        severity: "CRITICAL",
        detail: "The message asks for an OTP, verification code, or PIN. Official partner support will NEVER ask for your OTP over chat or call."
      });
      riskScore += 55;
    }

    // Pattern 3: Urgent Account Suspension / Threat of Block
    const urgencyRegex = /(account.*(block|suspend|deactivat|terminat|clos)|within.*(24|12|2|1).*hour|immediately.*call|legal.*action|penalty.*impose)/i;
    if (urgencyRegex.test(lower)) {
      findings.push({
        rule: "Coercive Urgency & Account Deactivation Threat",
        severity: "HIGH",
        detail: "Scammers use fear and fake account deactivation deadlines to panic gig workers into compliance without verifying."
      });
      riskScore += 35;
    }

    // Pattern 4: Unrealistic Incentive / Lottery / Free Money
    const incentiveRegex = /(bonus.*credited|winner|won.*₹|lottery|claim.*reward|instant.*cashback.*₹|festival.*bonus.*₹[0-9]+)/i;
    if (incentiveRegex.test(lower)) {
      findings.push({
        rule: "Unsolicited Bonus / High Value Incentive Lure",
        severity: "MEDIUM",
        detail: "Contains fake reward or bonus claims intended to bait gig workers into clicking phishing links."
      });
      riskScore += 30;
    }

    // Pattern 5: Embedded URL in SMS
    const urlMatches = text.match(/(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.(xyz|top|site|club|link|cc|ru|work)[^\s]*)/gi);
    if (urlMatches && urlMatches.length > 0) {
      const extractedUrl = urlMatches[0];
      const urlAnalysis = this.analyzeURL(extractedUrl);
      findings.push({
        rule: `Contains External Link (${extractedUrl})`,
        severity: urlAnalysis.riskLevel === 'High Risk' ? 'CRITICAL' : 'MEDIUM',
        detail: `The message contains a link. Link Scan Verdict: ${urlAnalysis.verdict} (Risk: ${urlAnalysis.riskLevel})`
      });
      riskScore += (urlAnalysis.riskScore * 0.5);
    }

    // Pattern 6: Unofficial Phone Number / WhatsApp Helpline Claims
    const phoneRegex = /(call.*(now|immediately|helpline)|contact.*support.*at|whatsapp.*at).*[0-9]{10}/i;
    if (phoneRegex.test(lower)) {
      findings.push({
        rule: "Unofficial Support Contact Number in Text",
        severity: "MEDIUM",
        detail: "Requests you to call an unofficial personal mobile number rather than using the in-app support ticketing system."
      });
      riskScore += 20;
    }

    // Final Risk Calculation
    riskScore = Math.min(100, Math.max(5, Math.round(riskScore)));
    let riskLevel = "Safe";
    let color = "emerald";
    let badgeClass = "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    let verdict = "Message Appears Safe & Normal";

    if (riskScore >= 55) {
      riskLevel = "High Risk";
      color = "rose";
      badgeClass = "bg-rose-500/20 text-rose-400 border-rose-500/30";
      verdict = "DANGEROUS SCAM / FRAUD MESSAGE DETECTED";
    } else if (riskScore >= 25) {
      riskLevel = "Suspicious";
      color = "amber";
      badgeClass = "bg-amber-500/20 text-amber-400 border-amber-500/30";
      verdict = "SUSPICIOUS MESSAGE - PROCEED WITH CAUTION";
    }

    const recommendations = [];
    if (riskLevel === "High Risk") {
      recommendations.push("🚨 DO NOT scan any QR code or enter your UPI PIN. UPI PIN is only for SENDING money.");
      recommendations.push("🚨 NEVER share your delivery login OTP or bank OTP with the sender.");
      recommendations.push("🚨 Block this number and report the scam in the 'Report Incident' tab.");
    } else if (riskLevel === "Suspicious") {
      recommendations.push("⚠️ Contact your official delivery app support (Zomato/Swiggy/Uber Help) from INSIDE the app only.");
      recommendations.push("⚠️ Do not call unverified numbers provided in text messages.");
    } else {
      recommendations.push("The text appears to be standard communication. Continue following basic security practices.");
    }

    return {
      isValid: true,
      messageText: rawMessage,
      riskLevel,
      riskScore,
      verdict,
      color,
      badgeClass,
      findings,
      recommendations
    };
  }
}

window.ThreatScanner = new ThreatScanner();
window.Scanner = window.ThreatScanner;
