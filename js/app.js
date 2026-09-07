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
    this.renderRecentChecks();
    this.renderIncidentHistory();
    this.renderThreatsDatabase();
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

  doQuickLogin(role = 'worker') {
    const res = window.Auth.quickLogin(role);
    if (res.success) {
      this.showAppView();
      this.renderDashboardStats();
      this.showToast(`Welcome, ${res.user.name} (${res.user.role.toUpperCase()})!`, 'success');
    } else {
      this.showToast(res.message, 'error');
    }
  }

  doLogin(email, password) {
    const res = window.Auth.login(email, password);
    if (res.success) {
      this.showAppView();
      this.renderDashboardStats();
      this.showToast(`Logged in successfully as ${res.user.name}!`, 'success');
    } else {
      this.showToast(res.message, 'error');
    }
  }

  doRegister(userData) {
    const res = window.Auth.register(userData);
    if (res.success) {
      this.showAppView();
      this.renderDashboardStats();
      this.showToast(`Account registered for ${res.user.name}!`, 'success');
    } else {
      this.showToast(res.message, 'error');
    }
  }

  doLogout() {
    window.Auth.logout();
    this.showGatewayView();
    this.showToast('You have been logged out successfully.', 'info');
  }

  switchTab(tabName) {
    if (tabName === 'admin' && !window.Auth.isAdmin()) {
      this.showToast('Administrator privileges required. Log in as Admin to access this desk.', 'warning');
      return;
    }

    this.currentTab = tabName;
    
    // Update nav tab buttons
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

    // Special tab activations
    if (tabName === 'admin') {
      window.AdminPortal?.renderAdminOverview();
    } else if (tabName === 'quiz') {
      window.ScamQuiz?.startQuiz();
    } else if (tabName === 'threats') {
      this.renderThreatsDatabase();
    } else if (tabName === 'incidents') {
      this.renderIncidentHistory();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateUserUI() {
    const user = window.Auth.getCurrentUser();
    const userDisplay = document.getElementById('currentUserDisplay');
    const roleBadge = document.getElementById('userRoleBadge');
    const adminNavBtn = document.querySelector('[data-tab="admin"]');

    if (user && userDisplay) {
      userDisplay.textContent = user.name;
      if (roleBadge) {
        roleBadge.textContent = user.role.toUpperCase();
        roleBadge.className = `text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${user.role === 'admin' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'}`;
      }
    }

    if (adminNavBtn) {
      if (window.Auth.isAdmin()) {
        adminNavBtn.classList.remove('opacity-40');
      } else {
        adminNavBtn.classList.add('opacity-40');
      }
    }
  }

  renderDashboardStats() {
    const checks = window.GigDB ? window.GigDB.getChecks() : [];
    const threats = window.GigDB ? window.GigDB.getThreats() : [];
    const incidents = window.GigDB ? window.GigDB.getIncidents() : [];

    const highRisks = checks.filter(c => c.risk_level === 'High Risk').length;
    const scoreVal = checks.length === 0 ? 96 : Math.max(70, Math.min(100, Math.round(100 - (highRisks * 4))));
    
    const elScore = document.getElementById('statSafetyScore');
    const elScoreBar = document.getElementById('statScoreBar');
    const elTotalChecks = document.getElementById('statTotalChecks');
    const elThreatCount = document.getElementById('statThreatsIdentified');
    const elIncidents = document.getElementById('statActiveIncidents');

    if (elScore) elScore.textContent = `${scoreVal}%`;
    if (elScoreBar) elScoreBar.style.width = `${scoreVal}%`;
    if (elTotalChecks) elTotalChecks.textContent = checks.length;
    if (elThreatCount) elThreatCount.textContent = threats.length;
    if (elIncidents) elIncidents.textContent = incidents.length;
  }

  renderLiveAlerts() {
    const container = document.getElementById('liveAlertsContainer');
    if (!container || !window.GigDB) return;

    const alerts = window.GigDB.getAlerts();
    container.innerHTML = alerts.map(a => {
      let badge = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      if (a.severity === 'Critical') badge = 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse';
      if (a.severity === 'Info') badge = 'bg-blue-500/20 text-blue-300 border-blue-500/40';

      return `
        <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex items-start gap-3">
          <span class="px-2 py-0.5 text-xs font-bold rounded-md border ${badge} shrink-0 mt-0.5">
            ${a.severity}
          </span>
          <div class="flex-1">
            <h4 class="text-sm font-bold text-white mb-1">${a.title}</h4>
            <p class="text-xs text-slate-300 leading-relaxed">${a.message}</p>
            <div class="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
              <span>Platform: <strong class="text-slate-300">${a.platform}</strong></span>
              <span>•</span>
              <span>${new Date(a.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  renderRecentChecks() {
    const container = document.getElementById('recentChecksList');
    if (!container || !window.GigDB) return;

    const checks = window.GigDB.getChecks().slice(0, 5);
    if (checks.length === 0) {
      container.innerHTML = `<div class="p-4 text-center text-slate-400 text-xs">No recent scans recorded.</div>`;
      return;
    }

    container.innerHTML = checks.map(c => {
      let badge = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      if (c.risk_level === 'High Risk') badge = 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      if (c.risk_level === 'Suspicious') badge = 'bg-amber-500/20 text-amber-400 border-amber-500/30';

      return `
        <div class="p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:bg-slate-800/40 transition-all flex items-center justify-between gap-3">
          <div class="flex items-center gap-2.5 overflow-hidden">
            <span class="w-7 h-7 rounded-lg bg-slate-800 text-cyan-400 flex items-center justify-center font-mono text-xs shrink-0 font-bold">
              ${c.input_type === 'URL' ? '🔗' : '💬'}
            </span>
            <div class="truncate">
              <div class="text-xs font-semibold text-slate-200 truncate">${c.input_data}</div>
              <div class="text-[10px] text-slate-400 truncate">${c.result}</div>
            </div>
          </div>
          <span class="px-2 py-0.5 text-[10px] font-bold rounded border ${badge} shrink-0">
            ${c.risk_level}
          </span>
        </div>
      `;
    }).join('');
  }

  renderIncidentHistory() {
    const container = document.getElementById('incidentsHistoryList');
    if (!container || !window.GigDB) return;

    const incidents = window.GigDB.getIncidents();
    if (incidents.length === 0) {
      container.innerHTML = `<tr><td colspan="5" class="py-6 text-center text-slate-400">No incidents reported yet.</td></tr>`;
      return;
    }

    container.innerHTML = incidents.map(inc => {
      let statusBadge = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      if (inc.status === 'Investigating') statusBadge = 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      if (inc.status === 'Resolved') statusBadge = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';

      return `
        <tr class="border-b border-slate-800/80 hover:bg-slate-800/20 transition-colors">
          <td class="py-3 px-3.5 font-mono text-xs text-cyan-400 font-semibold">${inc.incident_id}</td>
          <td class="py-3 px-3.5">
            <div class="text-xs font-bold text-slate-200">${inc.category}</div>
            <div class="text-[11px] text-slate-400">${inc.platform} • ${new Date(inc.created_at).toLocaleDateString()}</div>
          </td>
          <td class="py-3 px-3.5 text-xs text-slate-300 max-w-xs">
            <p class="line-clamp-2">${inc.description}</p>
            ${inc.admin_note ? `<div class="mt-1 text-[11px] text-cyan-400 italic">🛡️ Desk Note: ${inc.admin_note}</div>` : ''}
          </td>
          <td class="py-3 px-3.5 text-xs font-semibold text-slate-300">${inc.loss_amount || '₹0'}</td>
          <td class="py-3 px-3.5">
            <span class="px-2.5 py-1 text-xs font-semibold rounded-md border ${statusBadge}">
              ${inc.status}
            </span>
          </td>
        </tr>
      `;
    }).join('');
  }

  renderThreatsDatabase(query = '', category = 'all') {
    const container = document.getElementById('threatsDatabaseList');
    if (!container || !window.GigDB) return;

    let threats = window.GigDB.getThreats();

    if (query) {
      const q = query.toLowerCase();
      threats = threats.filter(t => 
        t.indicator.toLowerCase().includes(q) || 
        t.description.toLowerCase().includes(q) || 
        t.threat_type.toLowerCase().includes(q)
      );
    }

    if (category !== 'all') {
      threats = threats.filter(t => t.targeted_platform.toLowerCase().includes(category.toLowerCase()));
    }

    if (threats.length === 0) {
      container.innerHTML = `<tr><td colspan="5" class="py-6 text-center text-slate-400">No matching threat indicators found.</td></tr>`;
      return;
    }

    container.innerHTML = threats.map(t => `
      <tr class="border-b border-slate-800/80 hover:bg-slate-800/30 transition-colors">
        <td class="py-3 px-3.5 font-mono text-xs text-cyan-400">${t.threat_id}</td>
        <td class="py-3 px-3.5">
          <span class="px-2 py-0.5 text-xs font-semibold rounded bg-slate-800 text-slate-300 border border-slate-700">
            ${t.threat_type}
          </span>
        </td>
        <td class="py-3 px-3.5 font-mono text-xs text-rose-300 font-bold">${t.indicator}</td>
        <td class="py-3 px-3.5 text-xs text-slate-300 max-w-sm">${t.description}</td>
        <td class="py-3 px-3.5 text-xs text-slate-400 font-semibold">${t.targeted_platform}</td>
      </tr>
    `).join('');
  }

  // --- Scan Handlers ---
  handleUrlScan(inputUrl) {
    const resultDiv = document.getElementById('urlScanResult');
    if (!resultDiv) return;

    const analysis = window.ThreatScanner.analyzeURL(inputUrl);
    if (!analysis.isValid) {
      this.showToast(analysis.error, 'error');
      return;
    }

    // Save to Database checks
    window.GigDB.addCheck({
      user_id: window.Auth.getCurrentUser()?.user_id || 'USR-ANON',
      input_type: 'URL',
      input_data: analysis.url,
      risk_level: analysis.riskLevel,
      result: analysis.verdict
    });

    this.renderDashboardStats();
    this.renderRecentChecks();

    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `
      <div class="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
          <div>
            <span class="text-xs uppercase font-bold tracking-widest text-slate-400">Analysis Verdict</span>
            <h3 class="text-xl font-extrabold text-white mt-0.5">${analysis.verdict}</h3>
            <p class="text-xs font-mono text-cyan-400 mt-1 break-all">${analysis.url}</p>
          </div>
          <div class="text-right">
            <span class="px-3 py-1.5 rounded-xl text-xs font-extrabold border ${analysis.badgeClass}">
              ${analysis.riskLevel.toUpperCase()}
            </span>
            <div class="text-xs text-slate-400 mt-1">Risk Score: <strong class="text-white">${analysis.riskScore}/100</strong></div>
          </div>
        </div>

        <div class="mb-5">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Threat Detection Indicators (${analysis.findings.length})</h4>
          <div class="space-y-2.5">
            ${analysis.findings.map(f => `
              <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
                <span class="text-sm">${f.severity === 'CRITICAL' ? '🛑' : f.severity === 'HIGH' ? '⚠️' : f.severity === 'MEDIUM' ? '⚡' : '✅'}</span>
                <div>
                  <div class="text-xs font-bold text-slate-200">${f.rule}</div>
                  <div class="text-xs text-slate-400 mt-0.5 leading-relaxed">${f.detail}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30">
          <h4 class="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-2">Gig Worker Advisory & Action Guide</h4>
          <ul class="space-y-1.5 text-xs text-slate-300">
            ${analysis.recommendations.map(r => `<li class="flex items-start gap-2"><span>🛡️</span><span>${r}</span></li>`).join('')}
          </ul>
        </div>
      </div>
    `;

    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  handleMessageScan(inputMsg) {
    const resultDiv = document.getElementById('msgScanResult');
    if (!resultDiv) return;

    const analysis = window.ThreatScanner.analyzeMessage(inputMsg);
    if (!analysis.isValid) {
      this.showToast(analysis.error, 'error');
      return;
    }

    // Save to Database checks
    window.GigDB.addCheck({
      user_id: window.Auth.getCurrentUser()?.user_id || 'USR-ANON',
      input_type: 'Message',
      input_data: analysis.messageText.slice(0, 60) + '...',
      risk_level: analysis.riskLevel,
      result: analysis.verdict
    });

    this.renderDashboardStats();
    this.renderRecentChecks();

    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `
      <div class="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
          <div>
            <span class="text-xs uppercase font-bold tracking-widest text-slate-400">Message Analysis Verdict</span>
            <h3 class="text-xl font-extrabold text-white mt-0.5">${analysis.verdict}</h3>
          </div>
          <div class="text-right">
            <span class="px-3 py-1.5 rounded-xl text-xs font-extrabold border ${analysis.badgeClass}">
              ${analysis.riskLevel.toUpperCase()}
            </span>
            <div class="text-xs text-slate-400 mt-1">Risk Score: <strong class="text-white">${analysis.riskScore}/100</strong></div>
          </div>
        </div>

        <div class="mb-5">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Triggered Fraud Flags (${analysis.findings.length})</h4>
          <div class="space-y-2.5">
            ${analysis.findings.map(f => `
              <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
                <span class="text-sm">${f.severity === 'CRITICAL' ? '🛑' : f.severity === 'HIGH' ? '⚠️' : '⚡'}</span>
                <div>
                  <div class="text-xs font-bold text-slate-200">${f.rule}</div>
                  <div class="text-xs text-slate-400 mt-0.5 leading-relaxed">${f.detail}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30">
          <h4 class="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-2">Immediate Safety Steps</h4>
          <ul class="space-y-1.5 text-xs text-slate-300">
            ${analysis.recommendations.map(r => `<li class="flex items-start gap-2"><span>•</span><span>${r}</span></li>`).join('')}
          </ul>
        </div>
      </div>
    `;

    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  showToast(message, type = 'info') {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;

    let colors = 'bg-slate-900 border-slate-700 text-slate-200';
    if (type === 'success') colors = 'bg-emerald-950 border-emerald-500 text-emerald-200';
    if (type === 'error') colors = 'bg-rose-950 border-rose-500 text-rose-200';
    if (type === 'warning') colors = 'bg-amber-950 border-amber-500 text-amber-200';

    toast.className = `fixed bottom-5 right-5 z-50 max-w-md p-4 rounded-xl border shadow-2xl transition-all duration-300 transform translate-y-0 ${colors}`;
    toast.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-xl">${type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️'}</span>
        <div class="text-xs font-medium">${message}</div>
      </div>
    `;
    toast.classList.remove('hidden');

    setTimeout(() => {
      toast.classList.add('hidden');
    }, 4000);
  }

  setupEventListeners() {
    // Quick URL Preset Buttons
    document.querySelectorAll('[data-url-preset]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const val = e.currentTarget.getAttribute('data-url-preset');
        const input = document.getElementById('urlCheckerInput');
        if (input) {
          input.value = val;
          this.handleUrlScan(val);
        }
      });
    });

    // Quick Message Preset Buttons
    document.querySelectorAll('[data-msg-preset]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const val = e.currentTarget.getAttribute('data-msg-preset');
        const input = document.getElementById('msgCheckerInput');
        if (input) {
          input.value = val;
          this.handleMessageScan(val);
        }
      });
    });
  }
}

window.App = new GigSecureApp();
document.addEventListener('DOMContentLoaded', () => {
  window.App.init();
});