// GigSecure Complete Multilingual Translation Engine
// Supports English, Hindi (हिन्दी), Marathi (मराठी), and Tamil (தமிழ்)

const I18N = {
  currentLang: 'en',
  
  translations: {
    en: {
      // Branding & Header
      appName: "GigSecure",
      appTagline: "Cyber Security & Fraud Protection System for Gig Workers",
      emergencyHelpline: "🚨 24x7 National Cyber Helpline: 1930",
      emergencyPortal: "cybercrime.gov.in",
      
      // Navigation
      navDashboard: "Dashboard",
      navUrlScanner: "URL Scanner",
      navMsgAnalyzer: "Message Analyzer",
      navSecurityTips: "Security Hub",
      navQuiz: "Scam Simulator",
      navProfile: "My Profile",
      logout: "Log Out",
      
      // Auth / Gateway
      gatewayTitle: "Cyber Security & Fraud Protection for Gig Workers",
      gatewaySubtitle: "Protecting delivery partners, cab drivers, and gig freelancers from UPI payment fraud, phishing links, and account theft.",
      tabSignIn: "🔐 Sign In",
      tabRegister: "📝 Register",
      signInHeading: "Sign In to Your Account",
      signInDesc: "Enter your registered email and password to access the security shield.",
      registerHeading: "Create New Account",
      registerDesc: "Join GigSecure to protect your earnings and identity.",
      labelEmail: "Email Address",
      labelPassword: "Password",
      labelFullName: "Full Name",
      labelDob: "Date of Birth (DOB)",
      labelPlatform: "Primary Gig Platform",
      btnSignIn: "🔐 Sign In to GigSecure",
      btnRegister: "📝 Create Account",
      
      // Dashboard
      quickScanTitle: "Instant Cyber Threat Scanner",
      quickScanDesc: "Verify suspicious customer payment links, QR code requests, or urgent deactivation messages before taking action.",
      scanUrlBtn: "🔗 Scan Suspicious URL",
      scanMsgBtn: "💬 Scan Fraud SMS / WhatsApp",
      takeQuizBtn: "🎮 Take Safety Quiz",
      statTotalChecks: "Total Scans Run",
      statTotalChecksDesc: "URLs & messages analyzed for threats",
      liveAlertsTitle: "Live Threat Advisories",
      liveAlertsSubtitle: "Real-time scam warnings for active gig partners",
      
      // URL Scanner
      urlScannerTitle: "Gig Worker Suspicious URL Scanner",
      urlScannerDesc: "Detect typosquatting domains, fake company portals (Zomato, Swiggy, Uber, Zepto spoofs), and raw IP phishing kits.",
      urlInputPlaceholder: "Paste suspicious link here (e.g. http://zomato-partner-bonus.xyz)",
      btnScanUrl: "🔍 Scan URL",
      quickTestSamples: "Quick Test Samples:",
      
      // Message Analyzer
      msgAnalyzerTitle: "Fraud SMS & WhatsApp Message Analyzer",
      msgAnalyzerDesc: "Detect UPI QR code scams, fake support deactivation threats, OTP extortion, and malicious app download links.",
      msgInputPlaceholder: "Paste customer chat, WhatsApp message, or SMS text here...",
      btnScanMsg: "💬 Analyze Message",
      presetScenarios: "Preset Scenarios:",
      presetQrTip: "QR Tip Scam",
      presetKycThreat: "Account Block Threat",
      presetBonusApk: "Fake Bonus APK",
      presetSafeChat: "Safe Customer Chat",
      
      // Security Tips
      tipsTitle: "Gig Worker Cybersecurity Best Practices",
      tipsSubtitle: "Essential defense rules every delivery partner and driver must know.",
      dosTitle: "✅ Gig Worker Security DOs",
      dontsTitle: "🛑 Gig Worker Security DONTs",
      goldenRuleTitle: "💡 The Golden Rule of UPI for Gig Workers",
      goldenRuleSubtitle: "Remember this during customer delivery tips and refund requests:",
      receivingMoneyTitle: "When Receiving Money:",
      receivingMoneyDesc: "You only share your Phone Number / UPI ID. You NEVER scan any QR code and NEVER enter your UPI PIN.",
      sendingMoneyTitle: "When Sending Money:",
      sendingMoneyDesc: "You scan QR and enter UPI PIN. Entering your PIN ALWAYS deducts money from your account!",
      
      // Scam Simulator / Quiz
      quizTitle: "Gig Worker Scam Awareness Challenge",
      quizSubtitle: "Test your ability to spot real-world scams and earn your verified Gig Safety Certificate.",
      btnStartQuiz: "▶ Start Safety Challenge",
      btnSubmitAnswer: "Submit Answer →",
      btnNextQuestion: "Next Question →",
      btnDownloadCert: "🎓 Download Safety Certificate",
      btnRetakeQuiz: "🔄 Retake Challenge",
      
      // User Profile
      profileTitle: "User Profile Management",
      profileSubtitle: "Manage your personal information, gig platform affiliation, and security avatar.",
      profilePhotoTitle: "Profile Photo",
      btnUploadPhoto: "Upload Photo",
      btnRemovePhoto: "Remove Photo",
      btnSaveProfile: "💾 Save Profile Changes",
      profileSavedToast: "Profile updated successfully!",
      
      // Risk Levels
      riskSafe: "SAFE / LEGITIMATE",
      riskSuspicious: "SUSPICIOUS / MEDIUM RISK",
      riskHigh: "DANGEROUS / HIGH RISK",
      
      // Footer
      footerText: "GigSecure System — Cyber Security & Fraud Protection for Gig Workers"
    },

    hi: {
      // Branding & Header
      appName: "गिगसिक्योर (GigSecure)",
      appTagline: "गिग वर्कर्स के लिए साइबर सुरक्षा और धोखाधड़ी रोकथाम प्रणाली",
      emergencyHelpline: "🚨 24x7 राष्ट्रीय साइबर हेल्पलाइन: 1930",
      emergencyPortal: "cybercrime.gov.in",
      
      // Navigation
      navDashboard: "डैशबोर्ड",
      navUrlScanner: "URL स्कैनर",
      navMsgAnalyzer: "मैसेज विश्लेषक",
      navSecurityTips: "सुरक्षा हब",
      navQuiz: "स्कैम सिमुलेटर",
      navProfile: "मेरी प्रोफाइल",
      logout: "लॉग आउट",
      
      // Auth / Gateway
      gatewayTitle: "गिग वर्कर्स के लिए साइबर सुरक्षा और फ्रॉड प्रोटेक्शन",
      gatewaySubtitle: "डिलीवरी पार्टनर्स और ड्राइवरों को यूपीआई फ्रॉड, फर्जी लिंक्स और अकाउंट चोरी से सुरक्षित रखना।",
      tabSignIn: "🔐 साइन इन",
      tabRegister: "📝 नया खाता बनाएं",
      signInHeading: "अपने खाते में साइन इन करें",
      signInDesc: "सुरक्षा ढाल तक पहुँचने के लिए अपना पंजीकृत ईमेल और पासवर्ड दर्ज करें।",
      registerHeading: "नया खाता बनाएं",
      registerDesc: "अपनी कमाई और पहचान को सुरक्षित रखने के लिए गिगसिक्योर से जुड़ें।",
      labelEmail: "ईमेल पता",
      labelPassword: "पासवर्ड",
      labelFullName: "पूरा नाम",
      labelDob: "जन्म तिथि (DOB)",
      labelPlatform: "मुख्य गिग प्लेटफॉर्म",
      btnSignIn: "🔐 साइन इन करें",
      btnRegister: "📝 खाता बनाएं",
      
      // Dashboard
      quickScanTitle: "त्वरित साइबर खतरा स्कैनर",
      quickScanDesc: "भुगतान करने या क्लिक करने से पहले संदिग्ध लिंक, क्यूआर कोड अनुरोध या धमकी भरे मैसेज की जांच करें।",
      scanUrlBtn: "🔗 संदिग्ध URL स्कैन करें",
      scanMsgBtn: "💬 फ्रॉड मैसेज / SMS स्कैन करें",
      takeQuizBtn: "🎮 सुरक्षा क्विज खेलें",
      statTotalChecks: "कुल स्कैन किए गए",
      statTotalChecksDesc: "जांचे गए URL और मैसेज की कुल संख्या",
      liveAlertsTitle: "ताज़ा सुरक्षा चेतावनियां",
      liveAlertsSubtitle: "गिग पार्टनर्स के लिए रियल-टाइम सुरक्षा सूचनाएं",
      
      // URL Scanner
      urlScannerTitle: "गिग वर्कर संदिग्ध URL स्कैनर",
      urlScannerDesc: "फर्जी जोमैटो, स्विगी, उबर, जेप्टो जैसी वेबसाइट्स और फ़िशिंग लिंक्स की तुरंत पहचान करें।",
      urlInputPlaceholder: "संदिग्ध लिंक यहाँ पेस्ट करें (उदा. http://zomato-partner-bonus.xyz)",
      btnScanUrl: "🔍 URL स्कैन करें",
      quickTestSamples: "त्वरित टेस्ट नमूने:",
      
      // Message Analyzer
      msgAnalyzerTitle: "फ्रॉड SMS और व्हाट्सएप मैसेज विश्लेषक",
      msgAnalyzerDesc: "यूपीआई क्यूआर कोड फ्रॉड, अकाउंट ब्लॉक करने की धमकियां और फर्जी ऐप लिंक्स पहचानें।",
      msgInputPlaceholder: "ग्राहक चैट या SMS का मैसेज यहाँ पेस्ट करें...",
      btnScanMsg: "💬 मैसेज का विश्लेषण करें",
      presetScenarios: "नमूना परिदृश्य:",
      presetQrTip: "क्यूआर टिप स्कैम",
      presetKycThreat: "अकाउंट ब्लॉक धमकी",
      presetBonusApk: "फर्जी बोनस APK",
      presetSafeChat: "सुरक्षित ग्राहक चैट",
      
      // Security Tips
      tipsTitle: "गिग वर्कर साइबर सुरक्षा नियम",
      tipsSubtitle: "हर डिलीवरी राइडर और ड्राइवर के लिए आवश्यक सुरक्षा सावधानियां।",
      dosTitle: "✅ गिग वर्कर सुरक्षा नियम (क्या करें)",
      dontsTitle: "🛑 गिग वर्कर सुरक्षा नियम (क्या न करें)",
      goldenRuleTitle: "💡 गिग वर्कर्स के लिए UPI का सुनहरा नियम",
      goldenRuleSubtitle: "कस्टमर टिप या रिफंड के दौरान इसे हमेशा याद रखें:",
      receivingMoneyTitle: "पैसे प्राप्त करते समय:",
      receivingMoneyDesc: "आप केवल अपना फोन नंबर या UPI ID देते हैं। कभी भी QR कोड स्कैन न करें और कभी UPI PIN न डालें।",
      sendingMoneyTitle: "पैसे भेजते समय:",
      sendingMoneyDesc: "आप QR स्कैन करके UPI PIN डालते हैं। PIN डालने पर हमेशा आपके खाते से पैसे कटते हैं!",
      
      // Scam Simulator / Quiz
      quizTitle: "गिग वर्कर स्कैम जागरूकता चैलेंज",
      quizSubtitle: "वास्तविक घोटालों को पहचानने की अपनी क्षमता परखें और सुरक्षा प्रमाण पत्र प्राप्त करें।",
      btnStartQuiz: "▶ क्विज शुरू करें",
      btnSubmitAnswer: "उत्तर सबमिट करें →",
      btnNextQuestion: "अगला प्रश्न →",
      btnDownloadCert: "🎓 सुरक्षा प्रमाण पत्र डाउनलोड करें",
      btnRetakeQuiz: "🔄 दोबारा प्रयास करें",
      
      // User Profile
      profileTitle: "उपयोगकर्ता प्रोफाइल प्रबंधन",
      profileSubtitle: "अपनी व्यक्तिगत जानकारी, प्लेटफॉर्म और सुरक्षा फोटो प्रबंधित करें।",
      profilePhotoTitle: "प्रोफाइल फोटो",
      btnUploadPhoto: "फोटो अपलोड करें",
      btnRemovePhoto: "फोटो हटाएं",
      btnSaveProfile: "💾 प्रोफाइल सेव करें",
      profileSavedToast: "प्रोफाइल सफलतापूर्वक अपडेट हो गई!",
      
      // Risk Levels
      riskSafe: "सुरक्षित / प्रामाणिक",
      riskSuspicious: "संदिग्ध / मध्यम जोखिम",
      riskHigh: "खतरनाक / उच्च जोखिम",
      
      // Footer
      footerText: "गिगसिक्योर सिस्टम — गिग वर्कर्स के लिए साइबर सुरक्षा और धोखाधड़ी रोकथाम"
    },

    mr: {
      // Branding & Header
      appName: "गिगसिक्युअर (GigSecure)",
      appTagline: "गिग कामगारांसाठी सायबर सुरक्षा आणि फसवणूक प्रतिबंधक प्रणाली",
      emergencyHelpline: "🚨 24x7 राष्ट्रीय सायबर क्राईम हेल्पलाइन: 1930",
      emergencyPortal: "cybercrime.gov.in",
      
      // Navigation
      navDashboard: "डॅशबोर्ड",
      navUrlScanner: "URL स्कॅनर",
      navMsgAnalyzer: "मेसेज विश्लेषक",
      navSecurityTips: "सुरक्षा केंद्र",
      navQuiz: "स्कॅम सिम्युलेटर",
      navProfile: "माझे प्रोफाइल",
      logout: "लॉग आउट",
      
      // Auth / Gateway
      gatewayTitle: "गिग कामगारांसाठी सायबर सुरक्षा आणि फसवणूक प्रतिबंधक प्रणाली",
      gatewaySubtitle: "डिलिव्हरी रायडर्स आणि ड्रायव्हर्सना UPI फसवणूक, बनावट लिंक्स आणि खाते चोरीपासून सुरक्षित ठेवा.",
      tabSignIn: "🔐 साइन इन",
      tabRegister: "📝 नवीन नोंदणी",
      signInHeading: "आपल्या खात्यात साइन इन करा",
      signInDesc: "सुरक्षा प्रणाली वापरण्यासाठी आपला ईमेल आणि पासवर्ड टाका.",
      registerHeading: "नवीन खाते तयार करा",
      registerDesc: "आपली कमाई आणि ओळख सुरक्षित ठेवण्यासाठी गिगसिक्युअरशी जोडा.",
      labelEmail: "ईमेल पत्ता",
      labelPassword: "पासवर्ड",
      labelFullName: "पूर्ण नाव",
      labelDob: "जन्मतारीख (DOB)",
      labelPlatform: "मुख्य गिग प्लॅटफॉर्म",
      btnSignIn: "🔐 साइन इन करा",
      btnRegister: "📝 खाते तयार करा",
      
      // Dashboard
      quickScanTitle: "झटपट सायबर धोका स्कॅनर",
      quickScanDesc: "पैसे पाठवण्यापूर्वी किंवा लिंकवर क्लिक करण्यापूर्वी संशयास्पद मेसेज आणि QR कोड तपासा.",
      scanUrlBtn: "🔗 संशयास्पद URL तपासा",
      scanMsgBtn: "💬 मेसेज / SMS तपासा",
      takeQuizBtn: "🎮 सुरक्षा क्विज खेळा",
      statTotalChecks: "एकूण तपासण्या",
      statTotalChecksDesc: "आतापर्यंत तपासलेले लिंक्स आणि मेसेजेस",
      liveAlertsTitle: "ताज्या सुरक्षा सूचना",
      liveAlertsSubtitle: "गिग पार्टनर्ससाठी थेट अलर्ट्स",
      
      // URL Scanner
      urlScannerTitle: "गिग कामगार URL स्कॅनर",
      urlScannerDesc: "बनावट झोमॅटो, स्विगी, उबर, झेप्टो वेबसाइट्स आणि फिशिंग लिंक्स ओळखा.",
      urlInputPlaceholder: "संशयास्पद लिंक इथे पेस्ट करा (उदा. http://zomato-partner-bonus.xyz)",
      btnScanUrl: "🔍 URL तपासा",
      quickTestSamples: "चाचणी नमुने:",
      
      // Message Analyzer
      msgAnalyzerTitle: "फसव्या SMS आणि व्हॉट्सअ‍ॅप मेसेज विश्लेषक",
      msgAnalyzerDesc: "UPI QR कोड फसवणूक, खाते बंद होण्याची धमकी आणि धोकादायक अ‍ॅप लिंक्स तपासा.",
      msgInputPlaceholder: "ग्राहकाचा मेसेज किंवा SMS इथे पेस्ट करा...",
      btnScanMsg: "💬 मेसेज तपासा",
      presetScenarios: "नमुने परिदृश्ये:",
      presetQrTip: "QR टिप स्कॅम",
      presetKycThreat: "खाते बंद धमकी",
      presetBonusApk: "बनावट बोनस APK",
      presetSafeChat: "सुरक्षित ग्राहक संवाद",
      
      // Security Tips
      tipsTitle: "गिग कामगारांसाठी सायबर सुरक्षा नियम",
      tipsSubtitle: "प्रत्येक डिलिव्हरी पार्टनर आणि चालकाने पाळायचे नियम.",
      dosTitle: "✅ काय करावे (DOs)",
      dontsTitle: "🛑 काय करू नये (DONTs)",
      goldenRuleTitle: "💡 गिग कामगारांसाठी UPI चा सुवर्ण नियम",
      goldenRuleSubtitle: "टिप किंवा रिफंड घेताना हे नेहमी लक्षात ठेवा:",
      receivingMoneyTitle: "पैसे मिळवताना:",
      receivingMoneyDesc: "तुम्ही फक्त तुमचा फोन नंबर किंवा UPI ID देता. कधीही QR कोड स्कॅन करू नका आणि UPI पिन टाकू नका.",
      sendingMoneyTitle: "पैसे पाठवताना:",
      sendingMoneyDesc: "तुम्ही QR स्कॅन करून UPI पिन टाकता. पिन टाकल्यावर नेहमी तुमच्या खात्यातून पैसे कट होतात!",
      
      // Scam Simulator / Quiz
      quizTitle: "स्कॅम ओळख जागरूकता चाचणी",
      quizSubtitle: "फसवणूक ओळखण्याची आपली क्षमता तपासा आणि प्रमाणपत्र मिळवा.",
      btnStartQuiz: "▶ चाचणी सुरू करा",
      btnSubmitAnswer: "उत्तर सबमिट करा →",
      btnNextQuestion: "पुढचा प्रश्न →",
      btnDownloadCert: "🎓 प्रमाणपत्र डाउनलोड करा",
      btnRetakeQuiz: "🔄 पुन्हा प्रयत्न करा",
      
      // User Profile
      profileTitle: "वापरकर्ता प्रोफाइल व्यवस्थापन",
      profileSubtitle: "आपली वैयक्तिक माहिती, प्लॅटफॉर्म आणि फोटो संपादित करा.",
      profilePhotoTitle: "प्रोफाइल फोटो",
      btnUploadPhoto: "फोटो अपलोड करा",
      btnRemovePhoto: "फोटो हटवा",
      btnSaveProfile: "💾 प्रोफाइल सेव्ह करा",
      profileSavedToast: "प्रोफाइल यशस्वीरित्या सेव्ह झाली!",
      
      // Risk Levels
      riskSafe: "सुरक्षित / कायदेशीर",
      riskSuspicious: "संशयास्पद / मध्यम धोका",
      riskHigh: "धोकादायक / जास्त धोका",
      
      // Footer
      footerText: "गिगसिक्युअर — गिग कामगारांसाठी सायबर सुरक्षा आणि फसवणूक प्रतिबंध"
    },

    ta: {
      // Branding & Header
      appName: "கிக்செக்யூர் (GigSecure)",
      appTagline: "கிக் தொழிலாளர்களுக்கான இணைய பாதுகாப்பு & மோசடி தடுப்பு அமைப்பு",
      emergencyHelpline: "🚨 24x7 தேசிய சைபர் கிரைம் உதவி எண்: 1930",
      emergencyPortal: "cybercrime.gov.in",
      
      // Navigation
      navDashboard: "டாஷ்போர்டு",
      navUrlScanner: "URL ஸ்கேனர்",
      navMsgAnalyzer: "செய்தி ஆய்வி",
      navSecurityTips: "பாதுகாப்பு மையம்",
      navQuiz: "மோசடி பயிற்சி",
      navProfile: "என் சுயவிவரம்",
      logout: "வெளியேறு",
      
      // Auth / Gateway
      gatewayTitle: "கிக் தொழிலாளர்களுக்கான இணைய பாதுகாப்பு அமைப்பு",
      gatewaySubtitle: "டெலிவரி பார்ட்னர்கள் மற்றும் ஓட்டுநர்களை UPI மோசடி மற்றும் போலி இணைப்புகளில் இருந்து பாதுகாத்தல்.",
      tabSignIn: "🔐 உள்நுழைக",
      tabRegister: "📝 புதிய பதிவு",
      signInHeading: "உங்கள் கணக்கில் உள்நுழைக",
      signInDesc: "பாதுகாப்பு அமைப்பை அணுக மின்னஞ்சல் மற்றும் கடவுச்சொல்லை உள்ளிடவும்.",
      registerHeading: "புதிய கணக்கை உருவாக்கவும்",
      registerDesc: "உங்கள் வருமானம் மற்றும் கணக்கை பாதுகாக்க கிக்செக்யூருடன் இணையுங்கள்.",
      labelEmail: "மின்னஞ்சல் முகவரி",
      labelPassword: "கடவுச்சொல்",
      labelFullName: "முழு பெயர்",
      labelDob: "பிறந்த தேதி (DOB)",
      labelPlatform: "முக்கிய கிக் தளம்",
      btnSignIn: "🔐 உள்நுழைக",
      btnRegister: "📝 பதிவு செய்க",
      
      // Dashboard
      quickScanTitle: "உடனடி அச்சுறுத்தல் ஸ்கேனர்",
      quickScanDesc: "பணம் செலுத்துவதற்கு அல்லது இணைப்பை கிளிக் செய்வதற்கு முன் சந்தேகத்திற்குரிய SMS மற்றும் இணைப்புகளை சரிபார்க்கவும்.",
      scanUrlBtn: "🔗 URL ஐ ஸ்கேன் செய்",
      scanMsgBtn: "💬 செய்தியை ஸ்கேன் செய்",
      takeQuizBtn: "🎮 வினாடி வினா விளையாடு",
      statTotalChecks: "மொத்த சோதனைகள்",
      statTotalChecksDesc: "சரிபார்க்கப்பட்ட இணைப்புகள் மற்றும் செய்திகள்",
      liveAlertsTitle: "நேரலை எச்சரிக்கைகள்",
      liveAlertsSubtitle: "கிக் தொழிலாளர்களுக்கான புதிய பாதுகாப்பு எச்சரிக்கைகள்",
      
      // URL Scanner
      urlScannerTitle: "கிக் தொழிலாளர் URL ஸ்கேனர்",
      urlScannerDesc: "போலி Zomato, Swiggy, Uber, Zepto தளங்கள் மற்றும் மோசடி இணைப்புகளை கண்டறியவும்.",
      urlInputPlaceholder: "இணைப்பை இங்கே ஒட்டவும் (எ.கா: http://zomato-partner-bonus.xyz)",
      btnScanUrl: "🔍 URL ஐ ஸ்கேன் செய்",
      quickTestSamples: "மாதிரி இணைப்புகள்:",
      
      // Message Analyzer
      msgAnalyzerTitle: "மோசடி SMS & வாட்ஸ்அப் செய்தி ஆய்வி",
      msgAnalyzerDesc: "UPI QR குறியீடு மோசடி மற்றும் கணக்கு முடக்க அச்சுறுத்தல்களை கண்டறியவும்.",
      msgInputPlaceholder: "வாடிக்கையாளர் செய்தி அல்லது SMS ஐ இங்கே ஒட்டவும்...",
      btnScanMsg: "💬 செய்தியை ஆய்வு செய்",
      presetScenarios: "மாதிரி சூழ்நிலைகள்:",
      presetQrTip: "QR டிப் மோசடி",
      presetKycThreat: "கணக்கு முடக்க மிரட்டல்",
      presetBonusApk: "போலி போனஸ் APK",
      presetSafeChat: "பாதுகாப்பான உரையாடல்",
      
      // Security Tips
      tipsTitle: "கிக் தொழிலாளர் பாதுகாப்பு குறிப்புகள்",
      tipsSubtitle: "ஒவ்வொரு டெலிவரி பார்ட்னரும் ஓட்டுநரும் தெரிந்து கொள்ள வேண்டியவை.",
      dosTitle: "✅ செய்ய வேண்டியவை (DOs)",
      dontsTitle: "🛑 செய்யக்கூடாதவை (DONTs)",
      goldenRuleTitle: "💡 கிக் தொழிலாளர்களுக்கான UPI பொன் விதி",
      goldenRuleSubtitle: "டிப் அல்லது பணம் பெறும் போது நினைவில் கொள்க:",
      receivingMoneyTitle: "பணம் பெறும் போது:",
      receivingMoneyDesc: "நீங்கள் உங்கள் UPI ID அல்லது தொலைபேசி எண்ணை மட்டுமே பகிர வேண்டும். QR குறியீட்டை ஸ்கேன் செய்யாதீர்கள், UPI PIN உள்ளிடாதீர்கள்.",
      sendingMoneyTitle: "பணம் அனுப்பும் போது:",
      sendingMoneyDesc: "நீங்கள் QR ஸ்கேன் செய்து UPI PIN உள்ளிடுவீர்கள். PIN உள்ளிட்டால் உங்கள் கணக்கிலிருந்து பணம் எடுக்கப்படும்!",
      
      // Scam Simulator / Quiz
      quizTitle: "மோசடி விழிப்புணர்வு வினாடி வினா",
      quizSubtitle: "மோசடிகளை கண்டறியும் உங்கள் திறனை சோதித்து சான்றிதழ் பெறுங்கள்.",
      btnStartQuiz: "▶ வினாடி வினாவை தொடங்கு",
      btnSubmitAnswer: "பதிலை சமர்ப்பிக்கவும் →",
      btnNextQuestion: "அடுத்த கேள்வி →",
      btnDownloadCert: "🎓 சான்றிதழை பதிவிறக்குக",
      btnRetakeQuiz: "🔄 மீண்டும் முயற்சி செய்",
      
      // User Profile
      profileTitle: "சுயவிவர மேலாண்மை",
      profileSubtitle: "உங்கள் தனிப்பட்ட தகவல் மற்றும் பாதுகாப்பு புகைப்படத்தை நிர்வகிக்கவும்.",
      profilePhotoTitle: "சுயவிவரப் படம்",
      btnUploadPhoto: "படத்தை பதிவேற்று",
      btnRemovePhoto: "படத்தை அகற்று",
      btnSaveProfile: "💾 சுயவிவரத்தை சேமி",
      profileSavedToast: "சுயவிவரம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது!",
      
      // Risk Levels
      riskSafe: "பாதுகாப்பானது / முறையானது",
      riskSuspicious: "சந்தேகத்திற்குரியது",
      riskHigh: "அபாயகரமானது / அதிக ஆபத்து",
      
      // Footer
      footerText: "கிக்செக்யூர் — கிக் தொழிலாளர்களுக்கான இணைய பாதுகாப்பு மற்றும் மோசடி தடுப்பு"
    }
  },

  setLanguage(lang) {
    if (this.translations[lang]) {
      this.currentLang = lang;
      localStorage.setItem('gigsecure_lang', lang);
      this.applyTranslations();
      if (window.App && typeof window.App.onLanguageChanged === 'function') {
        window.App.onLanguageChanged(lang);
      }
    }
  },

  t(key) {
    return this.translations[this.currentLang]?.[key] || this.translations['en']?.[key] || key;
  },

  applyTranslations() {
    // Translate textContent
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key && this.translations[this.currentLang]?.[key]) {
        el.textContent = this.translations[this.currentLang][key];
      }
    });
    
    // Translate input placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key && this.translations[this.currentLang]?.[key]) {
        el.placeholder = this.translations[this.currentLang][key];
      }
    });

    // Translate HTML titles / tooltips
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (key && this.translations[this.currentLang]?.[key]) {
        el.title = this.translations[this.currentLang][key];
      }
    });

    // Sync all language selectors
    document.querySelectorAll('.lang-selector').forEach(sel => {
      sel.value = this.currentLang;
    });
  },

  init() {
    const saved = localStorage.getItem('gigsecure_lang') || 'en';
    this.currentLang = saved;
    const selector = document.getElementById('langSelector');
    if (selector) selector.value = saved;
    const gateSelector = document.getElementById('gateLangSelector');
    if (gateSelector) gateSelector.value = saved;
    this.applyTranslations();
  }
};

window.I18N = I18N;