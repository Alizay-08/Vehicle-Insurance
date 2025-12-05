// Dashboard JavaScript - Customer Portal

document.addEventListener('DOMContentLoaded', function() {
  initDashboard();
});

function initDashboard() {
  loadDashboardStats();
  loadRecentPolicies();
  loadRecentClaims();
  initQuickActions();
}

// Dashboard Statistics
function loadDashboardStats() {
  const stats = {
    activePolicies: 3,
    totalClaims: 2,
    pendingPayments: 1,
    totalCoverage: 250000
  };
  
  updateStatElement('activePolicies', stats.activePolicies);
  updateStatElement('totalClaims', stats.totalClaims);
  updateStatElement('pendingPayments', stats.pendingPayments);
  updateStatElement('totalCoverage', formatCurrency(stats.totalCoverage));
}

function updateStatElement(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

// Load Recent Policies
function loadRecentPolicies() {
  const policies = [
    {
      id: 'POL-2024-001',
      type: 'Comprehensive',
      vehicle: '2023 Toyota Camry',
      status: 'Active',
      expires: '2025-03-15',
      premium: 1200
    },
    {
      id: 'POL-2024-002',
      type: 'Third Party',
      vehicle: '2022 Honda CR-V',
      status: 'Active',
      expires: '2024-12-20',
      premium: 800
    },
    {
      id: 'POL-2023-015',
      type: 'Comprehensive',
      vehicle: '2021 Ford F-150',
      status: 'Expiring Soon',
      expires: '2024-01-15',
      premium: 1500
    }
  ];
  
  const container = document.getElementById('recentPolicies');
  if (!container) return;
  
  container.innerHTML = policies.map(policy => `
    <div class="card policy-card mb-3 ${policy.status === 'Active' ? 'active' : policy.status === 'Expiring Soon' ? 'pending' : ''}">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <div>
            <h6 class="mb-1">${policy.id}</h6>
            <span class="badge ${policy.status === 'Active' ? 'badge-success' : 'badge-warning'}">${policy.status}</span>
          </div>
          <span class="text-accent fw-semibold">${formatCurrency(policy.premium)}/yr</span>
        </div>
        <p class="text-gray mb-1"><i class="bi bi-car-front me-2"></i>${policy.vehicle}</p>
        <p class="text-gray mb-0 small"><i class="bi bi-shield-check me-2"></i>${policy.type} Coverage</p>
        <p class="text-gray mb-0 small"><i class="bi bi-calendar me-2"></i>Expires: ${formatDate(policy.expires)}</p>
      </div>
    </div>
  `).join('');
}

// Load Recent Claims
function loadRecentClaims() {
  const claims = [
    {
      id: 'CLM-2024-001',
      policy: 'POL-2024-001',
      date: '2024-10-15',
      amount: 5000,
      status: 'Under Review'
    },
    {
      id: 'CLM-2024-002',
      policy: 'POL-2024-002',
      date: '2024-09-20',
      amount: 12000,
      status: 'Approved'
    }
  ];
  
  const container = document.getElementById('recentClaims');
  if (!container) return;
  
  container.innerHTML = claims.map(claim => `
    <div class="card mb-3">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <div>
            <h6 class="mb-1">${claim.id}</h6>
            <span class="badge ${getClaimStatusBadge(claim.status)}">${claim.status}</span>
          </div>
          <span class="text-accent fw-semibold">${formatCurrency(claim.amount)}</span>
        </div>
        <p class="text-gray mb-1 small"><i class="bi bi-file-text me-2"></i>Policy: ${claim.policy}</p>
        <p class="text-gray mb-0 small"><i class="bi bi-calendar me-2"></i>Filed: ${formatDate(claim.date)}</p>
      </div>
    </div>
  `).join('');
}

function getClaimStatusBadge(status) {
  switch(status) {
    case 'Approved': return 'badge-success';
    case 'Under Review': return 'badge-warning';
    case 'Pending': return 'badge-info';
    case 'Rejected': return 'badge-danger';
    default: return 'badge-secondary';
  }
}

// Quick Actions
function initQuickActions() {
  const actions = document.querySelectorAll('.quick-action-card');
  
  actions.forEach(action => {
    action.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        window.location.href = href;
      }
    });
  });
}

// Policy Purchase Form
function initPolicyPurchaseForm() {
  const form = document.getElementById('policyPurchaseForm');
  if (!form) return;
  
  // Load vehicles
  loadUserVehicles();
  
  // Calculate premium on form change
  form.addEventListener('change', calculatePremium);
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
    
    handlePolicyPurchase(form);
  });
}

function loadUserVehicles() {
  const vehicles = [
    { id: 'VEH-001', name: '2023 Toyota Camry - ABC 1234' },
    { id: 'VEH-002', name: '2022 Honda CR-V - XYZ 5678' },
    { id: 'VEH-003', name: '2021 Ford F-150 - DEF 9012' }
  ];
  
  const select = document.getElementById('vehicleSelect');
  if (!select) return;
  
  select.innerHTML = '<option value="">Select Vehicle</option>' +
    vehicles.map(v => `<option value="${v.id}">${v.name}</option>`).join('');
}

function calculatePremium() {
  const policyType = document.getElementById('policyType')?.value;
  const coverageType = document.getElementById('coverageType')?.value;
  const vehicleId = document.getElementById('vehicleSelect')?.value;
  
  if (!policyType || !coverageType || !vehicleId) return;
  
  // Base premium calculation (demo)
  let basePremium = 500;
  
  if (policyType === 'comprehensive') basePremium = 1200;
  else if (policyType === 'collision') basePremium = 800;
  else if (policyType === 'thirdParty') basePremium = 400;
  
  if (coverageType === 'premium') basePremium *= 1.5;
  else if (coverageType === 'standard') basePremium *= 1.2;
  
  const premiumDisplay = document.getElementById('premiumAmount');
  if (premiumDisplay) {
    premiumDisplay.textContent = formatCurrency(basePremium);
  }
}

function handlePolicyPurchase(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    showToast('Policy purchased successfully!', 'success');
    setTimeout(() => {
      window.location.href = 'policy-history.html';
    }, 1500);
  }, 2000);
}

// Claim Initiation Form
function initClaimForm() {
  const form = document.getElementById('claimForm');
  if (!form) return;
  
  // Load policies for claim
  loadUserPolicies();
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
    
    handleClaimSubmission(form);
  });
}

function loadUserPolicies() {
  const policies = [
    { id: 'POL-2024-001', name: 'POL-2024-001 - Toyota Camry (Comprehensive)' },
    { id: 'POL-2024-002', name: 'POL-2024-002 - Honda CR-V (Third Party)' }
  ];
  
  const select = document.getElementById('policySelect');
  if (!select) return;
  
  select.innerHTML = '<option value="">Select Policy</option>' +
    policies.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
}

function handleClaimSubmission(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Submitting...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    const claimId = generateId('CLM');
    showToast(`Claim ${claimId} submitted successfully!`, 'success');
    setTimeout(() => {
      window.location.href = 'claim-status.html';
    }, 1500);
  }, 2000);
}

// Policy History
function loadPolicyHistory() {
  const policies = [
    {
      id: 'POL-2024-001',
      type: 'Comprehensive',
      vehicle: '2023 Toyota Camry',
      vehicleNo: 'ABC 1234',
      coverage: 100000,
      premium: 1200,
      startDate: '2024-03-15',
      endDate: '2025-03-15',
      status: 'Active'
    },
    {
      id: 'POL-2024-002',
      type: 'Third Party',
      vehicle: '2022 Honda CR-V',
      vehicleNo: 'XYZ 5678',
      coverage: 50000,
      premium: 800,
      startDate: '2023-12-20',
      endDate: '2024-12-20',
      status: 'Active'
    },
    {
      id: 'POL-2023-015',
      type: 'Comprehensive',
      vehicle: '2021 Ford F-150',
      vehicleNo: 'DEF 9012',
      coverage: 100000,
      premium: 1500,
      startDate: '2023-01-15',
      endDate: '2024-01-15',
      status: 'Expired'
    }
  ];
  
  const tbody = document.getElementById('policyHistoryTable');
  if (!tbody) return;
  
  tbody.innerHTML = policies.map(policy => `
    <tr>
      <td><strong>${policy.id}</strong></td>
      <td>${policy.type}</td>
      <td>
        <div>${policy.vehicle}</div>
        <small class="text-gray">${policy.vehicleNo}</small>
      </td>
      <td>${formatCurrency(policy.coverage)}</td>
      <td>${formatCurrency(policy.premium)}</td>
      <td>
        <div>${formatDate(policy.startDate)}</div>
        <small class="text-gray">to ${formatDate(policy.endDate)}</small>
      </td>
      <td><span class="badge ${policy.status === 'Active' ? 'badge-success' : 'badge-danger'}">${policy.status}</span></td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="viewPolicy('${policy.id}')">
          <i class="bi bi-eye"></i>
        </button>
        ${policy.status === 'Active' ? `
          <button class="btn btn-sm btn-primary" onclick="renewPolicy('${policy.id}')">
            Renew
          </button>
        ` : ''}
      </td>
    </tr>
  `).join('');
}

// Claim Status
function loadClaimStatus() {
  const claims = [
    {
      id: 'CLM-2024-001',
      policyId: 'POL-2024-001',
      filedDate: '2024-10-15',
      accidentDate: '2024-10-10',
      claimAmount: 5000,
      status: 'Under Review',
      timeline: [
        { date: '2024-10-15', title: 'Claim Filed', description: 'Your claim has been submitted successfully.', completed: true },
        { date: '2024-10-16', title: 'Documents Verified', description: 'All required documents have been verified.', completed: true },
        { date: '2024-10-18', title: 'Under Review', description: 'Your claim is being reviewed by our team.', current: true },
        { date: '', title: 'Approval', description: 'Pending approval from claims department.', completed: false },
        { date: '', title: 'Settlement', description: 'Claim amount will be transferred to your account.', completed: false }
      ]
    },
    {
      id: 'CLM-2024-002',
      policyId: 'POL-2024-002',
      filedDate: '2024-09-20',
      accidentDate: '2024-09-15',
      claimAmount: 12000,
      approvedAmount: 10500,
      status: 'Approved',
      timeline: [
        { date: '2024-09-20', title: 'Claim Filed', description: 'Your claim has been submitted successfully.', completed: true },
        { date: '2024-09-21', title: 'Documents Verified', description: 'All required documents have been verified.', completed: true },
        { date: '2024-09-25', title: 'Under Review', description: 'Claim reviewed by our team.', completed: true },
        { date: '2024-09-28', title: 'Approved', description: 'Claim approved for $10,500.', completed: true },
        { date: '2024-10-02', title: 'Settlement', description: 'Amount transferred to your bank account.', completed: true }
      ]
    }
  ];
  
  const container = document.getElementById('claimStatusContainer');
  if (!container) return;
  
  container.innerHTML = claims.map(claim => `
    <div class="card mb-4">
      <div class="card-header d-flex justify-content-between align-items-center">
        <div>
          <h5 class="mb-1">${claim.id}</h5>
          <small class="text-gray">Policy: ${claim.policyId}</small>
        </div>
        <span class="badge ${getClaimStatusBadge(claim.status)} fs-6">${claim.status}</span>
      </div>
      <div class="card-body">
        <div class="row mb-4">
          <div class="col-md-3">
            <p class="text-gray mb-1">Filed Date</p>
            <p class="fw-semibold mb-0">${formatDate(claim.filedDate)}</p>
          </div>
          <div class="col-md-3">
            <p class="text-gray mb-1">Accident Date</p>
            <p class="fw-semibold mb-0">${formatDate(claim.accidentDate)}</p>
          </div>
          <div class="col-md-3">
            <p class="text-gray mb-1">Claimed Amount</p>
            <p class="fw-semibold mb-0">${formatCurrency(claim.claimAmount)}</p>
          </div>
          <div class="col-md-3">
            <p class="text-gray mb-1">Approved Amount</p>
            <p class="fw-semibold mb-0">${claim.approvedAmount ? formatCurrency(claim.approvedAmount) : '-'}</p>
          </div>
        </div>
        
        <h6 class="mb-3">Claim Progress</h6>
        <div class="claim-timeline">
          ${claim.timeline.map(item => `
            <div class="claim-timeline-item ${item.completed ? 'completed' : ''} ${item.current ? 'current' : ''}">
              <p class="claim-timeline-date">${item.date || 'Pending'}</p>
              <h6 class="claim-timeline-title">${item.title}</h6>
              <p class="claim-timeline-text">${item.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// View Policy Details
function viewPolicy(policyId) {
  // In real app, this would open a modal or redirect to policy details
  alert(`Viewing policy: ${policyId}`);
}

// Renew Policy
function renewPolicy(policyId) {
  window.location.href = `purchase-policy.html?renew=${policyId}`;
}

// Export functions
window.initPolicyPurchaseForm = initPolicyPurchaseForm;
window.initClaimForm = initClaimForm;
window.loadPolicyHistory = loadPolicyHistory;
window.loadClaimStatus = loadClaimStatus;
window.viewPolicy = viewPolicy;
window.renewPolicy = renewPolicy;
