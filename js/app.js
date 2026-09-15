// GigSecure Main Application Controller & UI Logic

class GigSecureApp {
  constructor() {
    this.currentTab = 'dashboard';
  }

  init() {
    if (window.I18N) window.I18N.init();
    this.updateUserUI();
    this.renderDashboardStats();
    this.renderLiveAlerts();
    this.setupEventListeners();

    // Check auth state on load
    if (window.Auth && window.Auth.isLoggedIn()) {
      this.showAppView();
    } else {
      this.showGatewayView();
    }
  }

  showGatewayView() {
    const gateway = document.getElementById('view-auth-gateway');
    const mainApp = document.getElementById('view-app-main');
    const navBar = document.getElementById('mainNavBar');
    const userBar = document.getElementById('userProfileBar');

    if (gateway) gateway.classList.remove('hidden');
    if (mainApp) mainApp.classList.add('hidden');
    if (navBar) navBar.classList.add('hidden');
    if (userBar) userBar.classList.add('hidden');
  }

  showAppView() {
    const gateway = document.getElementById('view-auth-gateway');
    const mainApp = document.getElementById('view-app-main');
    const navBar = document.getElementById('mainNavBar');
    const userBar = document.getElementById('userProfileBar');

    if (gateway) gateway.classList.add('hidden');
    if (mainApp) mainApp.classList.remove('hidden');
    if (navBar) navBar.classList.remove('hidden');
    if (userBar) userBar.classList.remove('hidden');

    this.updateUserUI();
    this.switchTab(this.currentTab || 'dashboard');
  }

  doLogin(email, password) {
    const res = window.Auth.login(email, password);
    if (res.success) {
      this.showAppView();
      this.renderDashboardStats();
      this.showToast(`Welcome back, ${res.user.name}!`, 'success');
    } else {
      this.showToast(res.message, 'error');
    }
  }

  doRegister(userData) {
    const res = window.Auth.register(userData);
    if (res.success) {
      this.showAppView();
      this.renderDashboardStats();
      this.showToast(`Account created successfully for ${res.user.name}!`, 'success');
    } else {
      this.showToast(res.message, 'error');
    }
  }

  doLogout() {
    window.Auth.logout();
    this.showGatewayView();
    this.showToast('You have been logged out safely.', 'info');
  }

  switchTab(tabName) {
    this.currentTab = tabName;
    
    // Update navigation tab button states
    document.querySelectorAll('.nav-btn').forEach(btn => {
      if (btn.dataset.tab === tabName) {
        btn.classList.add('active', 'bg-cyan-500/15', 'text-cyan-400', 'border-cyan-500/40');
        btn.classList.remove('text-slate-400', 'border-transparent');
      } else {
        btn.classList.remove('active', 'bg-cyan-500/15', 'text-cyan-400', 'border-cyan-500/40');
        btn.classList.add('text-slate-400', 'border-transparent');
      }
    });

    // Show active tab section
    document.querySelectorAll('.tab-content').forEach(sec => {
      if (sec.id === `tab-${tabName}`) {
        sec.classList.remove('hidden');
      } else {
        sec.classList.add('hidden');
      }
    });

    // Tab specific initializers
    if (tabName === 'quiz' && window.Quiz) {
      window.Quiz.startQuiz();
    } else if (tabName === 'profile') {
      this.renderProfileTab();
    } else if (tabName === 'dashboard') {
      this.renderDashboardStats();
      this.renderLiveAlerts();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateUserUI() {
    const user = window.Auth?.getCurrentUser();
    const display = document.getElementById('currentUserDisplay');
    const avatarEl = document.getElementById('headerUserAvatar');
    const userBar = document.getElementById('userProfileBar');

    if (user) {
      if (display) display.textContent = user.name;
      if (avatarEl) {
        if (user.photo) {
          avatarEl.innerHTML = `<img src="${user.photo}" alt="Avatar" class="w-full h-full object-cover rounded-full" />`;
        } else {
          avatarEl.innerHTML = `👤`;
        }
      }
      if (userBar && window.Auth.isLoggedIn()) {
        userBar.classList.remove('hidden');
      }
    } else {
      if (userBar) userBar.classList.add('hidden');
    }
  }

  renderDashboardStats() {
    const checks = window.GigDB ? window.GigDB.getChecks() : [];
    const statChecks = document.getElementById('statTotalChecks');
    if (statChecks) {
      statChecks.textContent = checks.length;
    }
  }

  renderLiveAlerts() {
    const container = document.getElementById('liveAlertsContainer');
    if (!container || !window.GigDB) return;

    const alerts = window.GigDB.getAlerts();
    container.innerHTML = alerts.map(alert => {
      let badgeClass = 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      if (alert.severity === 'Warning') badgeClass = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      if (alert.severity === 'Info') badgeClass = 'bg-blue-500/10 text-blue-400 border-blue-500/30';

      return `
        <div class="cyber-card p-4 sm:p-5 bg-slate-900/90 border-slate-800 hover:border-cyan-500/30 transition-all">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${badgeClass}">
              ${alert.severity} Alert
            </span>
            <span class="text-[11px] font-mono text-slate-400">${alert.affected_platforms}</span>
          </div>
          <h4 class="text-sm font-bold text-white mb-1.5 leading-snug">${alert.title}</h4>
          <p class="text-xs text-slate-300 leading-relaxed">${alert.message}</p>
        </div>
      `;
    }).join('');
  }

  // --- USER PROFILE MANAGEMENT ---
  renderProfileTab() {
    const user = window.Auth?.getCurrentUser();
    if (!user) return;

    const nameInput = document.getElementById('profileInputName');
    const emailInput = document.getElementById('profileInputEmail');
    const dobInput = document.getElementById('profileInputDob');
    const platformInput = document.getElementById('profileInputPlatform');
    const avatarPreview = document.getElementById('profileAvatarPreview');

    if (nameInput) nameInput.value = user.name || '';
    if (emailInput) emailInput.value = user.email || '';
    if (dobInput) dobInput.value = user.dob || '1998-01-01';
    if (platformInput) platformInput.value = user.platform || 'Zomato Delivery Partner';

    if (avatarPreview) {
      if (user.photo) {
        avatarPreview.innerHTML = `<img src="${user.photo}" alt="Avatar" class="w-full h-full object-cover rounded-full shadow-lg" />`;
      } else {
        avatarPreview.innerHTML = `<span class="text-4xl">👤</span>`;
      }
    }
  }

  handleProfilePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      this.showToast('Please select an image smaller than 2 MB.', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const photoDataUrl = e.target.result;
      const avatarPreview = document.getElementById('profileAvatarPreview');
      if (avatarPreview) {
        avatarPreview.innerHTML = `<img src="${photoDataUrl}" alt="Avatar" class="w-full h-full object-cover rounded-full shadow-lg" />`;
      }
      avatarPreview.dataset.photo = photoDataUrl;
    };
    reader.readAsDataURL(file);
  }

  removeProfilePhoto() {
    const avatarPreview = document.getElementById('profileAvatarPreview');
    if (avatarPreview) {
      avatarPreview.innerHTML = `<span class="text-4xl">👤</span>`;
      avatarPreview.dataset.photo = '';
    }
    const fileInput = document.getElementById('profilePhotoFileInput');
    if (fileInput) fileInput.value = '';
  }

  saveProfile() {
    const name = document.getElementById('profileInputName')?.value;
    const dob = document.getElementById('profileInputDob')?.value;
    const platform = document.getElementById('profileInputPlatform')?.value;
    const avatarPreview = document.getElementById('profileAvatarPreview');
    
    let photo = avatarPreview?.dataset?.photo;
    if (photo === undefined) {
      photo = window.Auth?.getCurrentUser()?.photo || '';
    }

    if (!name) {
      this.showToast('Full Name is required.', 'warning');
      return;
    }

    const res = window.Auth.updateProfile({ name, dob, platform, photo });
    if (res.success) {
      this.updateUserUI();
      const msg = window.I18N?.t('profileSavedToast') || 'Profile updated successfully!';
      this.showToast(msg, 'success');
    } else {
      this.showToast(res.message, 'error');
    }
  }

  // --- THREAT SCANNERS ---
  handleUrlScan(url) {
    if (!url || !url.trim()) {
      this.showToast('Please enter a URL to scan.', 'warning');
      return;
    }

    const scanner = window.Scanner || new ThreatScanner();
    const result = scanner.analyzeURL(url);
    const resultDiv = document.getElementById('urlScanResult');
    if (!resultDiv) return;

    if (!result.isValid) {
      this.showToast(result.error, 'error');
      return;
    }

    // Save check in DB
    if (window.GigDB) {
      window.GigDB.addCheck({
        user_id: window.Auth?.getCurrentUser()?.user_id || 'ANON',
        input_type: 'URL',
        input_data: result.url,
        risk_level: result.riskLevel,
        threat_category: result.findings.map(f => f.rule).join(', '),
        indicators: result.findings.map(f => f.rule),
        action_recommended: result.actionRecommended
      });
      this.renderDashboardStats();
    }

    let badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40';
    let borderColor = 'border-emerald-500/30';
    if (result.riskLevel === 'High Risk') {
      badgeColor = 'bg-rose-500/10 text-rose-400 border-rose-500/40';
      borderColor = 'border-rose-500/40';
    } else if (result.riskLevel === 'Suspicious') {
      badgeColor = 'bg-amber-500/10 text-amber-400 border-amber-500/40';
      borderColor = 'border-amber-500/40';
    }

    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `
      <div class="cyber-card p-5 sm:p-6 bg-slate-900/95 border ${borderColor} rounded-2xl fade-in space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div class="text-[11px] font-mono text-slate-400">Scanned Target:</div>
            <div class="text-sm font-bold font-mono text-white break-all">${result.url}</div>
          </div>
          <span class="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${badgeColor}">
            ${result.riskLevel} (${result.riskScore}/100)
          </span>
        </div>

        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Analysis Findings:</h4>
          <div class="space-y-2">
            ${result.findings.map(f => `
              <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <div class="font-bold text-white flex items-center gap-1.5">
                  <span>${f.severity === 'High' ? '🛑' : f.severity === 'Medium' ? '⚠️' : '✅'}</span>
                  <span>${f.rule}</span>
                </div>
                <div class="text-slate-400 mt-0.5">${f.details}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div class="text-xs font-bold text-cyan-400 mb-1">Recommended Action:</div>
          <p class="text-xs text-slate-300">${result.actionRecommended}</p>
        </div>
      </div>
    `;

    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  handleMessageScan(msg) {
    if (!msg || !msg.trim()) {
      this.showToast('Please paste a message or chat text to scan.', 'warning');
      return;
    }

    const scanner = window.Scanner || new ThreatScanner();
    const result = scanner.analyzeMessage(msg);
    const resultDiv = document.getElementById('msgScanResult');
    if (!resultDiv) return;

    if (!result.isValid) {
      this.showToast(result.error, 'error');
      return;
    }

    if (window.GigDB) {
      window.GigDB.addCheck({
        user_id: window.Auth?.getCurrentUser()?.user_id || 'ANON',
        input_type: 'Message',
        input_data: msg.slice(0, 100),
        risk_level: result.riskLevel,
        threat_category: result.findings.map(f => f.rule).join(', '),
        indicators: result.findings.map(f => f.rule),
        action_recommended: result.actionRecommended
      });
      this.renderDashboardStats();
    }

    let badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40';
    let borderColor = 'border-emerald-500/30';
    if (result.riskLevel === 'High Risk') {
      badgeColor = 'bg-rose-500/10 text-rose-400 border-rose-500/40';
      borderColor = 'border-rose-500/40';
    } else if (result.riskLevel === 'Suspicious') {
      badgeColor = 'bg-amber-500/10 text-amber-400 border-amber-500/40';
      borderColor = 'border-amber-500/40';
    }

    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `
      <div class="cyber-card p-5 sm:p-6 bg-slate-900/95 border ${borderColor} rounded-2xl fade-in space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div class="text-[11px] font-mono text-slate-400">Scanned Message:</div>
            <div class="text-xs text-slate-300 italic max-w-md truncate">"${msg}"</div>
          </div>
          <span class="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${badgeColor}">
            ${result.riskLevel} (${result.riskScore}/100)
          </span>
        </div>

        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Detected Threat Patterns:</h4>
          <div class="space-y-2">
            ${result.findings.map(f => `
              <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <div class="font-bold text-white flex items-center gap-1.5">
                  <span>${f.severity === 'High' ? '🛑' : f.severity === 'Medium' ? '⚠️' : '✅'}</span>
                  <span>${f.rule}</span>
                </div>
                <div class="text-slate-400 mt-0.5">${f.details}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div class="text-xs font-bold text-cyan-400 mb-1">Recommended Action:</div>
          <p class="text-xs text-slate-300">${result.actionRecommended}</p>
        </div>
      </div>
    `;

    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  onLanguageChanged(lang) {
    if (this.currentTab === 'quiz' && window.Quiz) {
      window.Quiz.startQuiz();
    } else if (this.currentTab === 'dashboard') {
      this.renderLiveAlerts();
    }
  }

  setupEventListeners() {
    // Quick preset buttons for URL Scanner
    document.addEventListener('click', (e) => {
      const urlPreset = e.target.closest('[data-url-preset]');
      if (urlPreset) {
        const input = document.getElementById('urlCheckerInput');
        if (input) {
          input.value = urlPreset.getAttribute('data-url-preset');
          this.handleUrlScan(input.value);
        }
      }

      const msgPreset = e.target.closest('[data-msg-preset]');
      if (msgPreset) {
        const input = document.getElementById('msgCheckerInput');
        if (input) {
          input.value = msgPreset.getAttribute('data-msg-preset');
          this.handleMessageScan(input.value);
        }
      }
    });
  }

  showToast(message, type = 'info') {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;

    let colors = 'bg-slate-900 border-cyan-500 text-white';
    if (type === 'success') colors = 'bg-emerald-950/90 border-emerald-500 text-emerald-100';
    if (type === 'error') colors = 'bg-rose-950/90 border-rose-500 text-rose-100';
    if (type === 'warning') colors = 'bg-amber-950/90 border-amber-500 text-amber-100';

    toast.className = `fixed bottom-5 right-5 z-50 p-4 rounded-xl border shadow-2xl text-xs font-semibold max-w-sm fade-in ${colors}`;
    toast.innerHTML = message;
    toast.classList.remove('hidden');

    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.add('hidden');
    }, 4000);
  }
}

window.App = new GigSecureApp();
document.addEventListener('DOMContentLoaded', () => {
  window.App.init();
});