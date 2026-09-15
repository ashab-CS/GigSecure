// GigSecure Interactive Scam Simulator & Awareness Quiz
// Multilingual support for English, Hindi, Marathi, Tamil

class ScamQuizManager {
  constructor() {
    this.currentQuestionIdx = 0;
    this.userAnswers = [];
    this.isAnswerSubmitted = false;

    this.localizedQuestions = {
      en: [
        {
          id: 1,
          scenario: "Scenario 1: QR Code Tip Payment",
          platform: "Zomato / Swiggy Delivery",
          icon: "📱",
          text: "You deliver an order. The customer says, 'I forgot to add a ₹100 tip in the app. Scan this QR code on my phone to receive your ₹100 tip directly to your bank account.'",
          options: [
            { text: "Scan the QR code and enter my UPI PIN to accept the ₹100.", isCorrect: false, explanation: "🚨 SCAM! Scanning a QR code and entering your UPI PIN DEDUCTS money from your account. You NEVER enter a PIN to receive money in UPI." },
            { text: "Refuse to scan. Tell the customer you can only accept cash or tips added through the official app.", isCorrect: true, explanation: "✅ CORRECT! In UPI, receiving funds never requires scanning a QR code or entering a PIN. Scammers use this trick to drain rider bank balances." }
          ]
        },
        {
          id: 2,
          scenario: "Scenario 2: Urgent Account Suspension Call",
          platform: "Uber / Ola Driver",
          icon: "📞",
          text: "You receive a phone call: 'Hello, this is Uber Security Head Office. Your driver rating has triggered an emergency audit. To prevent immediate permanent deactivation, please read out the 6-digit SMS code just sent to your phone.'",
          options: [
            { text: "Read the OTP immediately so my driver account is not blocked.", isCorrect: false, explanation: "🚨 SCAM! The fraudster is attempting an Account Takeover. Once you share the OTP, they will hijack your driver account and change your payout bank details." },
            { text: "Disconnect the call immediately. Official Uber/Ola support will NEVER ask for OTP over phone.", isCorrect: true, explanation: "✅ CORRECT! Platform support will never ask for your login OTP or password. If in doubt, check your status inside the official app." }
          ]
        },
        {
          id: 3,
          scenario: "Scenario 3: Auto-Accept Batch Bot APK",
          platform: "Zepto / Blinkit Rider Group",
          icon: "🤖",
          text: "A message in a Telegram/WhatsApp rider group offers: 'Download zepto_fast_grabber_v4.apk! This modified app auto-accepts the highest paying batch orders before others see them. 100% working!'",
          options: [
            { text: "Download and install the APK by allowing 'Unknown Sources' in Android settings.", isCorrect: false, explanation: "🚨 DANGEROUS MALWARE! These unofficial APKs contain banking Trojans and keyloggers that intercept bank SMS and steal UPI credentials." },
            { text: "Do NOT install it. Only download and update gig partner apps from Google Play Store or Apple App Store.", isCorrect: true, explanation: "✅ CORRECT! Unofficial APKs pose extreme security risks and violate platform terms, leading to permanent platform ban and financial loss." }
          ]
        },
        {
          id: 4,
          scenario: "Scenario 4: Delivery Order Address Update Link",
          platform: "Dunzo / Courier Delivery",
          icon: "🔗",
          text: "Customer sends an SMS: 'I am not at home. Please deliver to my new address given on this link: http://192.168.4.15/track-loc?id=492. Click to see map location.'",
          options: [
            { text: "Click the IP address link on your phone browser while riding.", isCorrect: false, explanation: "🚨 RISKY! Raw IP links or unverified links can execute browser exploits or redirect to fake login phishing portals." },
            { text: "Call the customer via the official masked call button inside the app and ask for landmark details.", isCorrect: true, explanation: "✅ CORRECT! Always use in-app communication. Never click unknown external links sent in SMS or WhatsApp." }
          ]
        },
        {
          id: 5,
          scenario: "Scenario 5: Customer Asking Delivery OTP Before Handover",
          platform: "All Delivery Apps",
          icon: "📦",
          text: "You arrive at an apartment gate. The customer calls you: 'I am in a meeting on the 5th floor. Please share the delivery completion OTP now so I can verify on my app, and leave the food with security.'",
          options: [
            { text: "Give the delivery OTP over the phone before meeting the customer.", isCorrect: false, explanation: "🚨 FRAUD RISK! The customer might claim they never received the package and take a full refund, resulting in a penalty on your driver profile." },
            { text: "Insist on handing over the parcel in person or waiting for their confirmation before entering the delivery OTP.", isCorrect: true, explanation: "✅ CORRECT! The delivery OTP is proof of physical handover. Only enter it when the parcel is safely handed over to the verified customer." }
          ]
        }
      ],
      hi: [
        {
          id: 1,
          scenario: "परिदृश्य 1: QR कोड टिप भुगतान",
          platform: "जोमैटो / स्विगी डिलीवरी",
          icon: "📱",
          text: "ग्राहक कहता है, 'मैंने ऐप में ₹100 टिप जोड़ना भूल गया। अपने बैंक खाते में ₹100 प्राप्त करने के लिए मेरे फोन पर यह QR कोड स्कैन करें।' आप क्या करेंगे?",
          options: [
            { text: "QR कोड स्कैन करें और ₹100 प्राप्त करने के लिए अपना UPI PIN डालें।", isCorrect: false, explanation: "🚨 फ्रॉड! QR कोड स्कैन करके UPI PIN डालने से आपके खाते से पैसे कटते हैं। UPI में पैसे प्राप्त करने के लिए कभी भी PIN नहीं डाला जाता।" },
            { text: "स्कैन करने से मना करें। केवल आधिकारिक ऐप या नकद टिप स्वीकार करें।", isCorrect: true, explanation: "✅ बिल्कुल सही! पैसे प्राप्त करने के लिए कभी QR स्कैन या PIN की आवश्यकता नहीं होती।" }
          ]
        },
        {
          id: 2,
          scenario: "परिदृश्य 2: तत्काल खाता ब्लॉक करने का फोन",
          platform: "उबर / ओला ड्राइवर",
          icon: "📞",
          text: "आपको फोन आता है: 'हम सुरक्षा मुख्यालय से बोल रहे हैं। आपका अकाउंट ब्लॉक होने से बचाने के लिए आपके फोन पर आया 6-अंकों का OTP तुरंत बताएं।' आप क्या करेंगे?",
          options: [
            { text: "खाता ब्लॉक होने से बचाने के लिए तुरंत OTP बता दें।", isCorrect: false, explanation: "🚨 फ्रॉड! कोई भी आधिकारिक कंपनी कभी भी फोन पर आपसे लॉगिन OTP नहीं मांगती।" },
            { text: "तुरंत फोन काट दें। आधिकारिक ऐप से अपनी स्थिति जांचें।", isCorrect: true, explanation: "✅ बिल्कुल सही! कभी भी किसी के साथ OTP साझा न करें।" }
          ]
        },
        {
          id: 3,
          scenario: "परिदृश्य 3: व्हाट्सएप ऑटो-ऑर्डर बॉट APK",
          platform: "जेप्टो / ब्लिंकिट राइडर",
          icon: "🤖",
          text: "व्हाट्सएप ग्रुप में मैसेज आता है: 'फास्ट आर्डर ग्रैबर APK डाउनलोड करें! यह ऐप सबसे ज्यादा पैसे वाले आर्डर अपने आप पकड़ लेता है।' आप क्या करेंगे?",
          options: [
            { text: "लिंक से APK डाउनलोड और इंस्टॉल करें।", isCorrect: false, explanation: "🚨 खतरनाक वायरस! यह फर्जी ऐप आपके बैंक SMS और पासवर्ड चुरा लेता है।" },
            { text: "इसे इंस्टॉल न करें। केवल Google Play Store से ही ऐप डाउनलोड करें।", isCorrect: true, explanation: "✅ बिल्कुल सही! अनधिकृत APK हमेशा खतरनाक होते हैं।" }
          ]
        },
        {
          id: 4,
          scenario: "परिदृश्य 4: पता बदलने का अज्ञात लिंक",
          platform: "डिलीवरी कोरियर",
          icon: "🔗",
          text: "ग्राहक SMS भेजता है: 'मैं घर पर नहीं हूँ, नए पते के लिए इस लिंक पर क्लिक करें: http://192.168.4.15/loc'। आप क्या करेंगे?",
          options: [
            { text: "लिंक पर क्लिक करके पता देखें।", isCorrect: false, explanation: "🚨 जोखिम भरा! यह अज्ञात लिंक आपके फोन को हैक कर सकता है।" },
            { text: "ऐप के अंदर से कॉल करके सही पता पूछें, लिंक पर क्लिक न करें।", isCorrect: true, explanation: "✅ बिल्कुल सही! कभी भी SMS में आए अज्ञात लिंक्स पर क्लिक न करें।" }
          ]
        },
        {
          id: 5,
          scenario: "परिदृश्य 5: पार्सल देने से पहले डिलीवरी OTP मांगना",
          platform: "सभी डिलीवरी ऐप्स",
          icon: "📦",
          text: "ग्राहक फोन करके कहता है: 'मैं मीटिंग में हूँ, पहले डिलीवरी OTP बता दें और खाना गार्ड के पास छोड़ दें।' आप क्या करेंगे?",
          options: [
            { text: "फोन पर ही डिलीवरी OTP बता दें।", isCorrect: false, explanation: "🚨 फ्रॉड का खतरा! ग्राहक दावा कर सकता है कि उसे आर्डर नहीं मिला।" },
            { text: "सामान सौंपने के बाद ही OTP दर्ज करने पर जोर दें।", isCorrect: true, explanation: "✅ बिल्कुल सही! डिलीवरी OTP पार्सल हाथ में देने के बाद ही बताया जाता है।" }
          ]
        }
      ],
      mr: [
        {
          id: 1,
          scenario: "परिदृश्य 1: QR कोड टिप स्कॅम",
          platform: "झोमॅटो / स्विगी डिलिव्हरी",
          icon: "📱",
          text: "ग्राहक म्हणतो, 'मी अ‍ॅपमध्ये टिप द्यायला विसरलो. माझ्या फोनवरील QR कोड स्कॅन करून ₹100 टिप घ्या.' तुम्ही काय कराल?",
          options: [
            { text: "QR कोड स्कॅन करून UPI पिन टाकेन.", isCorrect: false, explanation: "🚨 फसवणूक! पैसे मिळवण्यासाठी कधीही QR कोड स्कॅन करू नका आणि PIN टाकू नका." },
            { text: "स्कॅन करण्यास नकार द्या. केवळ रोख किंवा अधिकृत अ‍ॅपद्वारे टिप घ्या.", isCorrect: true, explanation: "✅ अगदी बरोबर! UPI मध्ये पैसे मिळवण्यासाठी PIN ची गरज नसते." }
          ]
        },
        {
          id: 2,
          scenario: "परिदृश्य 2: खाते बंद करण्याची खोटी धमकी",
          platform: "उबर / ओला चालक",
          icon: "📞",
          text: "तुम्हाला फोन येतो: 'आम्ही मुख्य कार्यालयातून बोलत आहोत. तुमचे खाते बंद होऊ नये म्हणून फोनवर आलेला OTP सांगा.' तुम्ही काय कराल?",
          options: [
            { text: "खाते बंद होण्याच्या भीतीने OTP सांगेन.", isCorrect: false, explanation: "🚨 फसवणूक! कंपनी कधीही फोनवर लॉगिन OTP मागत नाही." },
            { text: "फोन ताबडतोब कट करा आणि कोणालाही OTP देऊ नका.", isCorrect: true, explanation: "✅ अगदी बरोबर! कधीही कोणाशीही OTP शेअर करू नका." }
          ]
        },
        {
          id: 3,
          scenario: "परिदृश्य 3: व्हॉट्सअ‍ॅप ऑटो-ऑर्डर बॉट APK",
          platform: "झेप्टो / ब्लिंकिट रायडर",
          icon: "🤖",
          text: "ग्रुपमध्ये मेसेज येतो: 'फास्ट ऑर्डर APK डाउनलोड करा! हे अ‍ॅप जास्त पैशांच्या ऑर्डर्स लगेच पकडते.' तुम्ही काय कराल?",
          options: [
            { text: "लिंकवरून APK डाउनलोड करून इन्स्टॉल करेन.", isCorrect: false, explanation: "🚨 धोकादायक व्हायरस! हे बनावट अ‍ॅप तुमचा बँक डेटा चोरू शकते." },
            { text: "इन्स्टॉल करू नका. फक्त Google Play Store वरूनच अ‍ॅप अपडेट करा.", isCorrect: true, explanation: "✅ अगदी बरोबर! अनोळखी APK कधीही इन्स्टॉल करू नका." }
          ]
        },
        {
          id: 4,
          scenario: "परिदृश्य 4: पत्ता बदलण्याची संशयास्पद लिंक",
          platform: "डिलिव्हरी रायडर",
          icon: "🔗",
          text: "ग्राहक SMS पाठवतो: 'मी घरी नाही, नव्या पत्त्यासाठी या लिंकवर क्लिक करा: http://192.168.4.15/loc.' तुम्ही काय कराल?",
          options: [
            { text: "लिंकवर क्लिक करून पत्ता पाहीन.", isCorrect: false, explanation: "🚨 धोकादायक! अशी लिंक फोन हॅक करू शकते." },
            { text: "अ‍ॅपमधून कॉल करून पत्ता विचारा, लिंकवर क्लिक करू नका.", isCorrect: true, explanation: "✅ अगदी बरोबर! अनोळखी लिंक्सवर कधीही क्लिक करू नका." }
          ]
        },
        {
          id: 5,
          scenario: "परिदृश्य 5: पार्सल देण्यापूर्वी OTP मागणे",
          platform: "सर्व डिलिव्हरी अ‍ॅप्स",
          icon: "📦",
          text: "ग्राहक फोनवर म्हणतो: 'आधी डिलिव्हरी OTP सांगा आणि पार्सल सुरक्षारक्षकाकडे ठेवा.' तुम्ही काय कराल?",
          options: [
            { text: "फोनवर डिलिव्हरी OTP सांगेन.", isCorrect: false, explanation: "🚨 फसवणूक होऊ शकते! ग्राहक पार्सल न मिळाल्याचा दावा करू शकतो." },
            { text: "प्रत्यक्ष पार्सल दिल्यावरच OTP घेण्याचा आग्रह धरा.", isCorrect: true, explanation: "✅ अगदी बरोबर! डिलिव्हरी OTP नेहमी पार्सल दिल्यावरच द्यावा." }
          ]
        }
      ],
      ta: [
        {
          id: 1,
          scenario: "சூழ்நிலை 1: QR குறியீடு டிப் கட்டணம்",
          platform: "டெலிவரி பார்ட்னர்",
          icon: "📱",
          text: "வாடிக்கையாளர் கூறுகிறார்: '₹100 டிப் பெற என் போனில் உள்ள QR குறியீட்டை ஸ்கேன் செய்யுங்கள்.' நீங்கள் என்ன செய்வீர்கள்?",
          options: [
            { text: "QR குறியீட்டை ஸ்கேன் செய்து UPI PIN உள்ளிடுவேன்.", isCorrect: false, explanation: "🚨 மோசடி! பணம் பெற ஒருபோதும் QR ஸ்கேன் செய்யக்கூடாது மற்றும் PIN போடக்கூடாது." },
            { text: "ஸ்கேன் செய்ய மறுக்கவும். அதிகாரப்பூர்வ செயலி வழியாக மட்டுமே டிப் பெறவும்.", isCorrect: true, explanation: "✅ மிகச் சரி! பணம் பெற UPI PIN தேவையில்லை." }
          ]
        },
        {
          id: 2,
          scenario: "சூழ்நிலை 2: கணக்கு முடக்க மிரட்டல் அழைப்பு",
          platform: "ஓட்டுநர்",
          icon: "📞",
          text: "அழைப்பு வருகிறது: 'உங்கள் கணக்கு முடக்கப்படாமல் இருக்க SMS OTP ஐ உடனே சொல்லுங்கள்.' நீங்கள் என்ன செய்வீர்கள்?",
          options: [
            { text: "கணக்கை காக்க OTP ஐ சொல்வேன்.", isCorrect: false, explanation: "🚨 மோசடி! எந்த நிறுவனமும் OTP கேட்காது." },
            { text: "உடனே இணைப்பை துண்டித்து, யாரிடமும் OTP பகிராதீர்கள்.", isCorrect: true, explanation: "✅ மிகச் சரி! OTP ஐ யாரிடமும் பகிர வேண்டாம்." }
          ]
        },
        {
          id: 3,
          scenario: "சூழ்நிலை 3: போலி ஆட்டோ-ஆர்டர் APK",
          platform: "கிக் பார்ட்னர்",
          icon: "🤖",
          text: "வாட்ஸ்அப்பில் செய்தி: 'அதிக ஆர்டர்களை பெற இந்த APK ஐ பதிவிறக்கவும்.' நீங்கள் என்ன செய்வீர்கள்?",
          options: [
            { text: "APK ஐ பதிவிறக்கி நிறுவுவேன்.", isCorrect: false, explanation: "🚨 ஆபத்தான மால்வேர்! இது வங்கி விவரங்களை திருடும்." },
            { text: "நிறுவ வேண்டாம். Google Play Store வழியாக மட்டுமே பதிவிறக்கவும்.", isCorrect: true, explanation: "✅ மிகச் சரி! போலி APK ஆபத்தானது." }
          ]
        },
        {
          id: 4,
          scenario: "சூழ்நிலை 4: முகவரி மாற்ற போலி இணைப்பு",
          platform: "டெலிவரி",
          icon: "🔗",
          text: "வாடிக்கையாளர் SMS: 'முகவரியை பார்க்க இந்த இணைப்பை கிளிக் செய்யவும்: http://192.168.4.15/loc'. நீங்கள் என்ன செய்வீர்கள்?",
          options: [
            { text: "இணைப்பை கிளிக் செய்வேன்.", isCorrect: false, explanation: "🚨 ஆபத்து! இது போலி பிஷிங் தளம்." },
            { text: "செயலி வழியாக அழைத்து முகவரியை கேட்டு தெரிந்து கொள்வேன்.", isCorrect: true, explanation: "✅ மிகச் சரி! தெரியாத இணைப்பை கிளிக் செய்யாதீர்கள்." }
          ]
        },
        {
          id: 5,
          scenario: "சூழ்நிலை 5: டெலிவரிக்கு முன் OTP கேட்பது",
          platform: "டெலிவரி",
          icon: "📦",
          text: "வாடிக்கையாளர் கூறுகிறார்: 'பொருளை காவலாளியிடம் வைத்துவிட்டு OTP ஐ இப்போதே சொல்லுங்கள்.' நீங்கள் என்ன செய்வீர்கள்?",
          options: [
            { text: "போனில் OTP சொல்வேன்.", isCorrect: false, explanation: "🚨 மோசடி ஆபத்து! பொருள் கிடைக்கவில்லை என்று புகார் செய்யலாம்." },
            { text: "பொருளை ஒப்படைத்த பின்னரே OTP பெறுவேன்.", isCorrect: true, explanation: "✅ மிகச் சரி! பொருள் கைக்கு சென்ற பிறகே OTP பகிர வேண்டும்." }
          ]
        }
      ]
    };
  }

  get questions() {
    const lang = window.I18N?.currentLang || 'en';
    return this.localizedQuestions[lang] || this.localizedQuestions['en'];
  }

  startQuiz() {
    this.currentQuestionIdx = 0;
    this.userAnswers = [];
    this.isAnswerSubmitted = false;
    this.renderQuestion();
  }

  renderQuestion() {
    const container = document.getElementById('quizContainer');
    if (!container) return;

    const qList = this.questions;
    if (this.currentQuestionIdx >= qList.length) {
      this.renderCertificateView();
      return;
    }

    const q = qList[this.currentQuestionIdx];
    this.isAnswerSubmitted = false;

    container.innerHTML = `
      <div class="cyber-card p-5 sm:p-8 bg-slate-900/90 border border-slate-700/80 rounded-2xl sm:rounded-3xl fade-in">
        <div class="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
          <div class="flex items-center gap-2">
            <span class="text-xl">${q.icon}</span>
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-cyan-400">${q.scenario}</span>
              <div class="text-[11px] text-slate-400">${q.platform}</div>
            </div>
          </div>
          <span class="px-3 py-1 rounded-full bg-slate-800 text-xs font-bold text-slate-300 font-mono">
            ${this.currentQuestionIdx + 1} / ${qList.length}
          </span>
        </div>

        <div class="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 mb-6 text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
          "${q.text}"
        </div>

        <div class="space-y-3 mb-6" id="quizOptionsContainer">
          ${q.options.map((opt, idx) => `
            <button onclick="window.Quiz.selectOption(${idx})" id="quizOptBtn_${idx}"
                    class="w-full text-left p-4 rounded-xl border border-slate-700 bg-slate-900/90 hover:bg-slate-800/90 text-xs sm:text-sm text-slate-200 transition-all cursor-pointer flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-slate-800 text-slate-400 border border-slate-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">${String.fromCharCode(65 + idx)}</span>
              <span class="flex-1">${opt.text}</span>
            </button>
          `).join('')}
        </div>

        <div id="quizFeedbackBox" class="hidden mb-6 p-4 rounded-xl text-xs sm:text-sm leading-relaxed"></div>

        <div class="flex items-center justify-between gap-4">
          <button onclick="window.Quiz.startQuiz()" class="text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer">
            ↺ ${window.I18N?.t('btnRetakeQuiz') || 'Restart'}
          </button>
          <button id="quizNextBtn" onclick="window.Quiz.nextQuestion()" disabled
                  class="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-50 cursor-not-allowed text-white font-bold text-xs rounded-xl shadow-lg transition-all">
            ${window.I18N?.t('btnNextQuestion') || 'Next Question →'}
          </button>
        </div>
      </div>
    `;
  }

  selectOption(optIdx) {
    if (this.isAnswerSubmitted) return;
    this.isAnswerSubmitted = true;

    const q = this.questions[this.currentQuestionIdx];
    const selected = q.options[optIdx];
    const isCorrect = selected.isCorrect;

    this.userAnswers.push({ questionId: q.id, selectedIdx: optIdx, isCorrect });

    // Style buttons
    q.options.forEach((opt, idx) => {
      const btn = document.getElementById(`quizOptBtn_${idx}`);
      if (!btn) return;
      if (opt.isCorrect) {
        btn.className = 'w-full text-left p-4 rounded-xl border border-emerald-500 bg-emerald-950/40 text-emerald-200 text-xs sm:text-sm flex items-start gap-3';
      } else if (idx === optIdx && !isCorrect) {
        btn.className = 'w-full text-left p-4 rounded-xl border border-rose-500 bg-rose-950/40 text-rose-200 text-xs sm:text-sm flex items-start gap-3';
      } else {
        btn.classList.add('opacity-50');
      }
    });

    // Feedback
    const fbBox = document.getElementById('quizFeedbackBox');
    if (fbBox) {
      fbBox.classList.remove('hidden');
      if (isCorrect) {
        fbBox.className = 'mb-6 p-4 rounded-xl text-xs sm:text-sm leading-relaxed bg-emerald-950/50 border border-emerald-500/40 text-emerald-200';
        fbBox.innerHTML = `<strong>${selected.explanation}</strong>`;
      } else {
        fbBox.className = 'mb-6 p-4 rounded-xl text-xs sm:text-sm leading-relaxed bg-rose-950/50 border border-rose-500/40 text-rose-200';
        fbBox.innerHTML = `<strong>${selected.explanation}</strong>`;
      }
    }

    const nextBtn = document.getElementById('quizNextBtn');
    if (nextBtn) {
      nextBtn.disabled = false;
      nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
      nextBtn.classList.add('hover:from-cyan-400', 'cursor-pointer');
    }
  }

  nextQuestion() {
    this.currentQuestionIdx++;
    this.renderQuestion();
  }

  renderCertificateView() {
    const container = document.getElementById('quizContainer');
    if (!container) return;

    const total = this.questions.length;
    const score = this.userAnswers.filter(a => a.isCorrect).length;
    const percentage = Math.round((score / total) * 100);
    const user = window.Auth?.getCurrentUser() || { name: "Rahul Sharma", platform: "Zomato Partner" };
    const certId = `CERT-GS-${Date.now().toString().slice(-6)}`;
    const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    container.innerHTML = `
      <div class="cyber-card p-6 sm:p-10 bg-slate-900/95 border border-cyan-500/40 rounded-3xl text-center space-y-6 fade-in shadow-2xl">
        <div class="w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center text-3xl mx-auto shadow-lg shadow-cyan-500/20">
          🏆
        </div>

        <div>
          <span class="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            Challenge Completed
          </span>
          <h3 class="text-2xl sm:text-3xl font-extrabold text-white mt-2">Gig Worker Cyber Safety Certificate</h3>
          <p class="text-xs sm:text-sm text-slate-300 mt-1">
            You scored <span class="font-extrabold text-cyan-400">${score} / ${total} (${percentage}%)</span> in real-world scam identification!
          </p>
        </div>

        <!-- DIGITAL CERTIFICATE PREVIEW -->
        <div id="printableCertificate" class="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 border-2 border-cyan-500/40 text-left space-y-4 shadow-xl relative overflow-hidden">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <div class="flex items-center gap-2">
              <span class="text-2xl">🛡️</span>
              <span class="font-black text-white text-base tracking-tight">GigSecure</span>
            </div>
            <span class="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/30 font-bold">
              ID: ${certId}
            </span>
          </div>

          <div class="py-2 text-center">
            <p class="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">This certifies that</p>
            <h4 class="text-xl sm:text-2xl font-black text-white text-cyan-300 mt-1">${user.name}</h4>
            <p class="text-xs text-slate-300 mt-0.5">${user.platform || 'Gig Delivery Partner'}</p>
            <p class="text-xs text-slate-400 mt-3 max-w-md mx-auto leading-relaxed">
              has successfully completed the <strong>Gig Worker Scam Awareness Challenge</strong> with a score of <strong>${percentage}%</strong> and demonstrated mastery in detecting UPI QR code scams, phishing links, and account hijack fraud.
            </p>
          </div>

          <div class="flex items-center justify-between border-t border-slate-800 pt-3 text-[11px] text-slate-400 font-mono">
            <div>Verified Date: <span class="text-slate-200 font-bold">${dateStr}</span></div>
            <div class="text-emerald-400 font-bold">● Status: VERIFIED PROTECTED</div>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button onclick="window.print()" class="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2 cursor-pointer">
            <span>🎓 Print / Save Certificate</span>
          </button>
          <button onclick="window.Quiz.startQuiz()" class="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all cursor-pointer">
            <span>🔄 Retake Quiz</span>
          </button>
        </div>
      </div>
    `;
  }
}

window.Quiz = new ScamQuizManager();