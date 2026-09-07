// GigSecure Administrator Management Portal (FR11)

class AdminPortalManager {
  constructor() {}

  renderAdminOverview() {
    const threats = window.GigDB.getThreats();
    const incidents = window.GigDB.getIncidents();
    const users = window.GigDB.getUsers();
    const checks = window.GigDB.getChecks();

    const elTotalThreats = document.getElementById('adminStatThreats');
    const elTotalIncidents = document.getElementById('adminStatIncidents');
    const elTotalUsers = document.getElementById('adminStatUsers');
    const elTotalChecks = document.getElementById('adminStatChecks');

    if (elTotalThreats) elTotalThreats.textContent = threats.length;
    if (elTotalIncidents) elTotalIncidents.textContent = incidents.length;
    if (elTotalUsers) elTotalUsers.textContent = users.length;
    if (elTotalChecks) elTotalChecks.textContent = checks.length;

    this.renderThreatsTable();
    this.renderIncidentsReviewTable();
    this.renderUsersTable();
  }

  renderThreatsTable() {
    const container = document.getElementById('adminThreatsList');
    if (!container) return;

    const threats = window.GigDB.getThreats();
    if (threats.length === 0) {
      container.innerHTML = `<tr><td colspan="5" class="py-6 text-center text-slate-500">No threat indicators logged yet.</td></tr>`;
      return;
    }

    container.innerHTML = threats.map(t => `
      <tr class="border-b border-slate-800/80 hover:bg-slate-800/30 transition-colors">
        <td class="py-3.5 px-4 font-mono text-xs text-cyan-400 font-semibold">${t.threat_id}</td>
        <td class="py-3.5 px-4 font-medium text-slate-200">
          <div>${t.indicator}</div>
          <div class="text-xs text-slate-400">${t.description}</div>
        </td>
        <td class="py-3.5 px-4">
          <span class="px-2.5 py-1 text-xs font-semibold rounded-md ${t.risk_level === 'High Risk' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}">
            ${t.risk_level}
          </span>
        </td>
        <td class="py-3.5 px-4 text-xs text-slate-300">${t.targeted_platform || 'General'}</td>
        <td class="py-3.5 px-4 text-right">
          <button onclick="window.AdminPortal.deleteThreat('${t.threat_id}')" class="text-xs text-rose-400 hover:text-rose-300 font-medium px-2.5 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all">
            Delete
          </button>
        </td>
      </tr>
    `).join('');
  }

  renderIncidentsReviewTable() {
    const container = document.getElementById('adminIncidentsList');
    if (!container) return;

    const incidents = window.GigDB.getIncidents();
    if (incidents.length === 0) {
      container.innerHTML = `<tr><td colspan="6" class="py-6 text-center text-slate-500">No incident reports submitted.</td></tr>`;
      return;
    }

    container.innerHTML = incidents.map(inc => {
      let statusBadge = 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      if (inc.status === 'Investigating') statusBadge = 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      if (inc.status === 'Resolved') statusBadge = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';

      return `
        <tr class="border-b border-slate-800/80 hover:bg-slate-800/30 transition-colors">
          <td class="py-3.5 px-4 font-mono text-xs text-cyan-400 font-semibold">${inc.incident_id}</td>
          <td class="py-3.5 px-4">
            <div class="font-medium text-slate-200">${inc.user_name || 'Worker'}</div>
            <div class="text-xs text-slate-400">${inc.platform} • ${new Date(inc.created_at).toLocaleDateString()}</div>
          </td>
          <td class="py-3.5 px-4 text-xs text-slate-300">
            <span class="font-semibold text-slate-200">${inc.category}</span>
            <p class="text-slate-400 truncate max-w-xs mt-0.5">${inc.description}</p>
          </td>
          <td class="py-3.5 px-4 text-xs font-semibold text-slate-300">${inc.loss_amount || '₹0'}</td>
          <td class="py-3.5 px-4">
            <span class="px-2.5 py-1 text-xs font-semibold rounded-md border ${statusBadge}">
              ${inc.status}
            </span>
          </td>
          <td class="py-3.5 px-4 text-right">
            <button onclick="window.AdminPortal.openIncidentActionModal('${inc.incident_id}')" class="text-xs text-cyan-400 hover:text-cyan-300 font-medium px-3 py-1 rounded bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 transition-all">
              Review
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  renderUsersTable() {
    const container = document.getElementById('adminUsersList');
    if (!container) return;

    const users = window.GigDB.getUsers();
    container.innerHTML = users.map(u => `
      <tr class="border-b border-slate-800/80 hover:bg-slate-800/30 transition-colors">
        <td class="py-3.5 px-4 font-mono text-xs text-cyan-400">${u.user_id}</td>
        <td class="py-3.5 px-4 font-medium text-slate-200">${u.name}</td>
        <td class="py-3.5 px-4 text-xs text-slate-400">${u.email}</td>
        <td class="py-3.5 px-4">
          <span class="px-2 py-0.5 text-xs font-semibold rounded ${u.role === 'admin' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-slate-700 text-slate-300'}">
            ${u.role.toUpperCase()}
          </span>
        </td>
        <td class="py-3.5 px-4 text-xs text-slate-300">${u.platform}</td>
      </tr>
    `).join('');
  }

  addNewThreat(threatData) {
    if (!threatData.indicator) {
      alert('Threat indicator (URL, IP, or Number) is required.');
      return;
    }
    window.GigDB.addThreat(threatData);
    this.renderAdminOverview();
    window.App?.showToast('Threat indicator added to Intelligence Database!', 'success');
  }

  deleteThreat(threatId) {
    if (confirm(`Are you sure you want to remove threat entry ${threatId}?`)) {
      window.GigDB.deleteThreat(threatId);
      this.renderAdminOverview();
      window.App?.showToast('Threat entry deleted.', 'info');
    }
  }

  broadcastAlert(alertData) {
    if (!alertData.title || !alertData.message) {
      alert('Please fill out alert title and message.');
      return;
    }
    window.GigDB.addAlert(alertData);
    this.renderAdminOverview();
    window.App?.renderLiveAlerts();
    window.App?.showToast('Security Alert Broadcasted to all gig workers!', 'success');
  }

  openIncidentActionModal(incidentId) {
    const inc = window.GigDB.getIncidents().find(i => i.incident_id === incidentId);
    if (!inc) return;

    const modal = document.getElementById('incidentActionModal');
    if (!modal) return;

    document.getElementById('modalIncId').textContent = inc.incident_id;
    document.getElementById('modalIncUser').textContent = `${inc.user_name} (${inc.platform})`;
    document.getElementById('modalIncCategory').textContent = inc.category;
    document.getElementById('modalIncDesc').textContent = inc.description;
    document.getElementById('modalIncLoss').textContent = inc.loss_amount || '₹0';
    document.getElementById('modalIncStatusSelect').value = inc.status;
    document.getElementById('modalIncNote').value = inc.admin_note || '';

    modal.dataset.incidentId = incidentId;
    modal.classList.remove('hidden');
  }

  saveIncidentAction() {
    const modal = document.getElementById('incidentActionModal');
    const incidentId = modal?.dataset?.incidentId;
    if (!incidentId) return;

    const newStatus = document.getElementById('modalIncStatusSelect').value;
    const note = document.getElementById('modalIncNote').value;

    window.GigDB.updateIncidentStatus(incidentId, newStatus, note);
    modal.classList.add('hidden');
    this.renderAdminOverview();
    window.App?.renderIncidentHistory();
    window.App?.showToast(`Incident ${incidentId} updated to ${newStatus}!`, 'success');
  }
}

window.AdminPortal = new AdminPortalManager();
window.Admin = window.AdminPortal;
