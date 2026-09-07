// GigSecure Interactive Scam Simulator & Awareness Quiz (Future Scope 5.6)

class ScamQuizManager {
  constructor() {
    this.questions = [
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
        scenario: "Scenario 3: WhatsApp Auto-Accept Bot APK",
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
    ];

    this.currentStep = 0;
    this.score = 0;
    this.userAnswers = [];
  }

  startQuiz() {
    this.currentStep = 0;
    this.score = 0;
    this.userAnswers = [];
    this.renderCurrentQuestion();
  }

  renderCurrentQuestion() {
    const container = document.getElementById('quizContainer');
    if (!container) return;

    if (this.currentStep >= this.questions.length) {
      this.renderResults(container);
      return;
    }

    const q = this.questions[this.currentStep];
    const progressPercent = ((this.currentStep + 1) / this.questions.length) * 100;

    container.innerHTML = `
      <div class="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <span class="text-2xl">${q.icon}</span>
            <div>
              <span class="text-xs font-semibold uppercase tracking-wider text-cyan-400">${q.platform}</span>
              <h3 class="text-lg font-bold text-white">${q.scenario}</h3>
            </div>
          </div>
          <span class="text-sm font-medium px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded-full">
            Question ${this.currentStep + 1} of ${this.questions.length}
          </span>
        </div>

        <div class="w-full bg-slate-800 h-2 rounded-full mb-6 overflow-hidden">
          <div class="bg-gradient-to-r from-cyan-500 to-emerald-500 h-full transition-all duration-300" style="width: ${progressPercent}%"></div>
        </div>

        <div class="p-5 rounded-xl bg-slate-800/50 border border-slate-700/60 mb-6 text-slate-200 text-base leading-relaxed">
          ${q.text}
        </div>

        <div class="space-y-4" id="quizOptions">
          ${q.options.map((opt, idx) => `
            <button onclick="window.ScamQuiz.handleAnswer(${idx})" 
                    class="w-full text-left p-4 rounded-xl border border-slate-700/80 bg-slate-800/40 hover:bg-cyan-500/10 hover:border-cyan-500/50 text-slate-200 font-medium transition-all flex items-start gap-3 group">
              <span class="w-7 h-7 rounded-full bg-slate-700 group-hover:bg-cyan-500 text-white flex items-center justify-center text-xs shrink-0 font-bold mt-0.5">
                ${String.fromCharCode(65 + idx)}
              </span>
              <span>${opt.text}</span>
            </button>
          `).join('')}
        </div>

        <div id="quizFeedback" class="hidden mt-6"></div>
      </div>
    `;
  }

  handleAnswer(optionIndex) {
    const q = this.questions[this.currentStep];
    const selected = q.options[optionIndex];
    const isCorrect = selected.isCorrect;

    if (isCorrect) this.score++;
    this.userAnswers.push({ questionId: q.id, isCorrect, explanation: selected.explanation });

    const feedbackDiv = document.getElementById('quizFeedback');
    const optionsDiv = document.getElementById('quizOptions');

    // Disable all option buttons
    optionsDiv.querySelectorAll('button').forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === optionIndex) {
        btn.className = `w-full text-left p-4 rounded-xl border ${isCorrect ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300' : 'border-rose-500 bg-rose-500/20 text-rose-300'} font-medium transition-all flex items-start gap-3`;
      }
    });

    feedbackDiv.className = `mt-6 p-5 rounded-xl border ${isCorrect ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/40 border-rose-500/40 text-rose-300'}`;
    feedbackDiv.innerHTML = `
      <div class="flex items-start gap-3">
        <span class="text-2xl">${isCorrect ? '🎯' : '⚠️'}</span>
        <div>
          <h4 class="font-bold text-base mb-1">${isCorrect ? 'Spot On! You Avoided the Scam' : 'Watch Out! High Scam Risk'}</h4>
          <p class="text-sm leading-relaxed">${selected.explanation}</p>
          <button onclick="window.ScamQuiz.nextQuestion()" class="mt-4 px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2">
            <span>Next Scenario</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    `;
    feedbackDiv.classList.remove('hidden');
  }

  nextQuestion() {
    this.currentStep++;
    this.renderCurrentQuestion();
  }

  renderResults(container) {
    const total = this.questions.length;
    const scorePct = Math.round((this.score / total) * 100);
    const passed = scorePct >= 80;
    const userName = window.Auth?.getCurrentUser()?.name || "Ashab ul haq Ansari";

    container.innerHTML = `
      <div class="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl p-6 sm:p-8 text-center">
        <div class="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${passed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'} text-4xl shadow-xl">
          ${passed ? '🏆' : '📚'}
        </div>
        
        <h3 class="text-2xl font-bold text-white mb-1">
          ${passed ? 'Cyber Safety Certified Gig Worker!' : 'Awareness Quiz Completed'}
        </h3>
        <p class="text-slate-400 text-sm max-w-md mx-auto mb-6">
          You scored <strong class="text-white">${this.score} out of ${total} (${scorePct}%)</strong> in identifying real-world gig worker fraud scenarios.
        </p>

        <!-- Digital Badge Card -->
        <div class="max-w-md mx-auto p-6 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border ${passed ? 'border-cyan-500/40' : 'border-slate-700'} shadow-2xl relative overflow-hidden mb-6 text-left">
          <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl"></div>
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs font-bold uppercase tracking-widest text-cyan-400">GigSecure Verified</span>
            <span class="text-xs text-slate-500 font-mono">ID: GS-${Date.now().toString().slice(-6)}</span>
          </div>
          <h4 class="text-xl font-bold text-white">${userName}</h4>
          <p class="text-xs text-slate-400 mb-4">${window.Auth?.getCurrentUser()?.platform || 'Delivery & Mobility Partner'}</p>
          <div class="flex items-center justify-between border-t border-slate-800 pt-3 text-xs text-slate-400">
            <span>Score: <strong class="text-cyan-400">${scorePct}%</strong></span>
            <span>Date: <strong>${new Date().toLocaleDateString()}</strong></span>
            <span class="text-emerald-400 font-semibold">● ACTIVE</span>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-4">
          <button onclick="window.ScamQuiz.startQuiz()" class="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold text-sm transition-all">
            Retake Quiz
          </button>
          <button onclick="window.App.switchTab('dashboard')" class="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-cyan-500/25 transition-all">
            Return to Dashboard
          </button>
        </div>
      </div>
    `;
  }
}

window.ScamQuiz = new ScamQuizManager();
window.Quiz = window.ScamQuiz;
