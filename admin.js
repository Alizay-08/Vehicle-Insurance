// Admin JavaScript - Admin Panel Functionality

document.addEventListener('DOMContentLoaded', function() {
  initAdminPanel();
});

function initAdminPanel() {
  initSidebar();
  initAdminDashboard();
  initDataTables();
  initModals();
}

// Sidebar Toggle
function initSidebar() {
  const sidebar = document.getElementById('adminSidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const overlay = document.getElementById('sidebarOverlay');
  
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('show');
      sidebar.classList.toggle('collapsed');
      if (overlay) overlay.classList.toggle('show');
    });
  }
  
  if (overlay) {
    overlay.addEventListener('click', function() {
      sidebar.classList.remove('show');
      overlay.classList.remove('show');
    });
  }
  
  // Submenu Toggle
  const menuItems = document.querySelectorAll('.sidebar-menu-item.has-submenu');
  menuItems.forEach(item => {
    const link = item.querySelector('.sidebar-menu-link');
    link.addEventListener('click', function(e) {
      e.preventDefault();
      item.classList.toggle('open');
    });
  });
  
  // Set active menu item
  setActiveMenuItem();
}

function setActiveMenuItem() {
  const currentPage = window.location.pathname.split('/').pop();
  const menuLinks = document.querySelectorAll('.sidebar-menu-link, .sidebar-submenu-link');
  
  menuLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(currentPage)) {
      link.classList.add('active');
      
      // Open parent submenu if exists
      const parentItem = link.closest('.sidebar-menu-item.has-submenu');
      if (parentItem) {
        parentItem.classList.add('open');
      }
    }
  });
}

// Admin Dashboard Statistics
function initAdminDashboard() {
  const stats = {
    totalCustomers: 1245,
    activePolicies: 987,
    pendingClaims: 45,
    monthlyRevenue: 125000,
    totalVehicles: 1432,
    approvedClaims: 234,
    lapsedPolicies: 56,
    totalExpenses: 45000
  };
  
  // Update stat elements if they exist
  Object.keys(stats).forEach(key => {
    const element = document.getElementById(key);
    if (element) {
      if (key.includes('Revenue') || key.includes('Expenses')) {
        element.textContent = formatCurrency(stats[key]);
      } else {
        element.textContent = stats[key].toLocaleString();
      }
    }
  });
  
  // Load charts if on dashboard
  if (document.getElementById('revenueChart')) {
    loadDashboardCharts();
  }
}

function loadDashboardCharts() {
  // Placeholder for chart initialization
  // In production, would use Chart.js or similar
  console.log('Charts initialized');
}

// Data Tables
function initDataTables() {
  // Initialize search functionality
  const searchInputs = document.querySelectorAll('[data-table-search]');
  searchInputs.forEach(input => {
    const tableId = input.getAttribute('data-table-search');
    initSearchFilter(input.id, tableId);
  });
}

// Load Customers Data
function loadCustomers() {
  const customers = [
    { id: 'CUST-001', name: 'John Smith', email: 'john.smith@email.com', phone: '(555) 123-4567', address: '123 Main St, New York, NY', policies: 2, status: 'Active' },
    { id: 'CUST-002', name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '(555) 234-5678', address: '456 Oak Ave, Los Angeles, CA', policies: 1, status: 'Active' },
    { id: 'CUST-003', name: 'Michael Brown', email: 'mbrown@email.com', phone: '(555) 345-6789', address: '789 Pine Rd, Chicago, IL', policies: 3, status: 'Active' },
    { id: 'CUST-004', name: 'Emily Davis', email: 'emily.d@email.com', phone: '(555) 456-7890', address: '321 Elm St, Houston, TX', policies: 1, status: 'Inactive' },
    { id: 'CUST-005', name: 'Robert Wilson', email: 'rwilson@email.com', phone: '(555) 567-8901', address: '654 Maple Dr, Phoenix, AZ', policies: 2, status: 'Active' }
  ];
  
  const tbody = document.getElementById('customersTable');
  if (!tbody) return;
  
  tbody.innerHTML = customers.map(customer => `
    <tr>
      <td><strong>${customer.id}</strong></td>
      <td>
        <div class="d-flex align-items-center gap-2">
          <div class="avatar-placeholder avatar-sm">${customer.name.charAt(0)}</div>
          <div>
            <div class="fw-medium">${customer.name}</div>
            <small class="text-gray">${customer.email}</small>
          </div>
        </div>
      </td>
      <td>${customer.phone}</td>
      <td>${customer.address}</td>
      <td><span class="badge badge-primary">${customer.policies}</span></td>
      <td><span class="badge ${customer.status === 'Active' ? 'badge-success' : 'badge-secondary'}">${customer.status}</span></td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="viewCustomer('${customer.id}')" title="View">
          <i class="bi bi-eye"></i>
        </button>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="editCustomer('${customer.id}')" title="Edit">
          <i class="bi bi-pencil"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteCustomer('${customer.id}')" title="Delete">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

// Load Policies Data
function loadPolicies() {
  const policies = [
    { id: 'POL-2024-001', customer: 'John Smith', vehicle: '2023 Toyota Camry', type: 'Comprehensive', premium: 1200, coverage: 100000, startDate: '2024-03-15', endDate: '2025-03-15', status: 'Active' },
    { id: 'POL-2024-002', customer: 'Sarah Johnson', vehicle: '2022 Honda CR-V', type: 'Third Party', premium: 800, coverage: 50000, startDate: '2023-12-20', endDate: '2024-12-20', status: 'Active' },
    { id: 'POL-2024-003', customer: 'Michael Brown', vehicle: '2021 Ford F-150', type: 'Comprehensive', premium: 1500, coverage: 120000, startDate: '2024-01-10', endDate: '2025-01-10', status: 'Active' },
    { id: 'POL-2023-015', customer: 'Emily Davis', vehicle: '2020 Chevrolet Malibu', type: 'Collision', premium: 600, coverage: 40000, startDate: '2023-06-01', endDate: '2024-06-01', status: 'Expired' },
    { id: 'POL-2024-004', customer: 'Robert Wilson', vehicle: '2024 Tesla Model 3', type: 'Comprehensive', premium: 1800, coverage: 150000, startDate: '2024-05-01', endDate: '2025-05-01', status: 'Active' }
  ];
  
  const tbody = document.getElementById('policiesTable');
  if (!tbody) return;
  
  tbody.innerHTML = policies.map(policy => `
    <tr>
      <td><strong>${policy.id}</strong></td>
      <td>${policy.customer}</td>
      <td>${policy.vehicle}</td>
      <td><span class="badge badge-info">${policy.type}</span></td>
      <td>${formatCurrency(policy.premium)}</td>
      <td>${formatCurrency(policy.coverage)}</td>
      <td>
        <div>${formatDate(policy.startDate)}</div>
        <small class="text-gray">to ${formatDate(policy.endDate)}</small>
      </td>
      <td><span class="badge ${policy.status === 'Active' ? 'badge-success' : 'badge-danger'}">${policy.status}</span></td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="viewPolicy('${policy.id}')"><i class="bi bi-eye"></i></button>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="editPolicy('${policy.id}')"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-sm btn-outline-danger" onclick="deletePolicy('${policy.id}')"><i class="bi bi-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

// Load Vehicles Data
function loadVehicles() {
  const vehicles = [
    { id: 'VEH-001', owner: 'John Smith', make: 'Toyota', model: 'Camry', year: 2023, regNo: 'ABC 1234', bodyNo: 'TOY-CAM-2023-001', engineNo: 'ENG-TC-001', status: 'Insured' },
    { id: 'VEH-002', owner: 'Sarah Johnson', make: 'Honda', model: 'CR-V', year: 2022, regNo: 'XYZ 5678', bodyNo: 'HON-CRV-2022-002', engineNo: 'ENG-HC-002', status: 'Insured' },
    { id: 'VEH-003', owner: 'Michael Brown', make: 'Ford', model: 'F-150', year: 2021, regNo: 'DEF 9012', bodyNo: 'FOR-F15-2021-003', engineNo: 'ENG-FF-003', status: 'Insured' },
    { id: 'VEH-004', owner: 'Emily Davis', make: 'Chevrolet', model: 'Malibu', year: 2020, regNo: 'GHI 3456', bodyNo: 'CHE-MAL-2020-004', engineNo: 'ENG-CM-004', status: 'Not Insured' },
    { id: 'VEH-005', owner: 'Robert Wilson', make: 'Tesla', model: 'Model 3', year: 2024, regNo: 'JKL 7890', bodyNo: 'TES-M03-2024-005', engineNo: 'ENG-TM-005', status: 'Insured' }
  ];
  
  const tbody = document.getElementById('vehiclesTable');
  if (!tbody) return;
  
  tbody.innerHTML = vehicles.map(vehicle => `
    <tr>
      <td><strong>${vehicle.id}</strong></td>
      <td>${vehicle.owner}</td>
      <td>${vehicle.make}</td>
      <td>${vehicle.model}</td>
      <td>${vehicle.year}</td>
      <td>${vehicle.regNo}</td>
      <td><small>${vehicle.bodyNo}</small></td>
      <td><small>${vehicle.engineNo}</small></td>
      <td><span class="badge ${vehicle.status === 'Insured' ? 'badge-success' : 'badge-warning'}">${vehicle.status}</span></td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="viewVehicle('${vehicle.id}')"><i class="bi bi-eye"></i></button>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="editVehicle('${vehicle.id}')"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteVehicle('${vehicle.id}')"><i class="bi bi-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

// Load Claims Data
function loadClaims() {
  const claims = [
    { id: 'CLM-2024-001', policy: 'POL-2024-001', customer: 'John Smith', accidentDate: '2024-10-10', accidentPlace: 'Highway 101, CA', insuredAmount: 100000, claimAmount: 5000, status: 'Pending' },
    { id: 'CLM-2024-002', policy: 'POL-2024-002', customer: 'Sarah Johnson', accidentDate: '2024-09-15', accidentPlace: 'Main Street, LA', insuredAmount: 50000, claimAmount: 12000, status: 'Approved' },
    { id: 'CLM-2024-003', policy: 'POL-2024-003', customer: 'Michael Brown', accidentDate: '2024-08-20', accidentPlace: 'Park Ave, Chicago', insuredAmount: 120000, claimAmount: 25000, status: 'Under Review' },
    { id: 'CLM-2024-004', policy: 'POL-2024-001', customer: 'John Smith', accidentDate: '2024-07-05', accidentPlace: 'Downtown NYC', insuredAmount: 100000, claimAmount: 3500, status: 'Settled' },
    { id: 'CLM-2024-005', policy: 'POL-2024-004', customer: 'Robert Wilson', accidentDate: '2024-10-25', accidentPlace: 'Interstate 10, Phoenix', insuredAmount: 150000, claimAmount: 8000, status: 'Pending' }
  ];
  
  const tbody = document.getElementById('claimsTable');
  if (!tbody) return;
  
  tbody.innerHTML = claims.map(claim => `
    <tr>
      <td><strong>${claim.id}</strong></td>
      <td>${claim.policy}</td>
      <td>${claim.customer}</td>
      <td>${formatDate(claim.accidentDate)}</td>
      <td>${claim.accidentPlace}</td>
      <td>${formatCurrency(claim.insuredAmount)}</td>
      <td>${formatCurrency(claim.claimAmount)}</td>
      <td><span class="badge ${getClaimBadgeClass(claim.status)}">${claim.status}</span></td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="viewClaim('${claim.id}')"><i class="bi bi-eye"></i></button>
        ${claim.status === 'Pending' || claim.status === 'Under Review' ? `
          <button class="btn btn-sm btn-success me-1" onclick="approveClaim('${claim.id}')"><i class="bi bi-check-lg"></i></button>
          <button class="btn btn-sm btn-danger" onclick="rejectClaim('${claim.id}')"><i class="bi bi-x-lg"></i></button>
        ` : ''}
      </td>
    </tr>
  `).join('');
}

function getClaimBadgeClass(status) {
  switch(status) {
    case 'Approved': case 'Settled': return 'badge-success';
    case 'Pending': return 'badge-warning';
    case 'Under Review': return 'badge-info';
    case 'Rejected': return 'badge-danger';
    default: return 'badge-secondary';
  }
}

// Load Billing Data
function loadBilling() {
  const bills = [
    { id: 'BILL-2024-001', policy: 'POL-2024-001', customer: 'John Smith', vehicle: 'Toyota Camry', amount: 1200, tax: 96, total: 1296, date: '2024-03-15', dueDate: '2024-04-15', status: 'Paid' },
    { id: 'BILL-2024-002', policy: 'POL-2024-002', customer: 'Sarah Johnson', vehicle: 'Honda CR-V', amount: 800, tax: 64, total: 864, date: '2024-03-20', dueDate: '2024-04-20', status: 'Paid' },
    { id: 'BILL-2024-003', policy: 'POL-2024-003', customer: 'Michael Brown', vehicle: 'Ford F-150', amount: 1500, tax: 120, total: 1620, date: '2024-04-01', dueDate: '2024-05-01', status: 'Pending' },
    { id: 'BILL-2024-004', policy: 'POL-2024-004', customer: 'Robert Wilson', vehicle: 'Tesla Model 3', amount: 1800, tax: 144, total: 1944, date: '2024-05-01', dueDate: '2024-06-01', status: 'Overdue' }
  ];
  
  const tbody = document.getElementById('billingTable');
  if (!tbody) return;
  
  tbody.innerHTML = bills.map(bill => `
    <tr>
      <td><strong>${bill.id}</strong></td>
      <td>${bill.policy}</td>
      <td>${bill.customer}</td>
      <td>${bill.vehicle}</td>
      <td>${formatCurrency(bill.amount)}</td>
      <td>${formatCurrency(bill.tax)}</td>
      <td><strong>${formatCurrency(bill.total)}</strong></td>
      <td>${formatDate(bill.date)}</td>
      <td>${formatDate(bill.dueDate)}</td>
      <td><span class="badge ${bill.status === 'Paid' ? 'badge-success' : bill.status === 'Overdue' ? 'badge-danger' : 'badge-warning'}">${bill.status}</span></td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="viewBill('${bill.id}')"><i class="bi bi-eye"></i></button>
        <button class="btn btn-sm btn-outline-primary" onclick="printBill('${bill.id}')"><i class="bi bi-printer"></i></button>
      </td>
    </tr>
  `).join('');
}

// Load Expenses Data
function loadExpenses() {
  const expenses = [
    { id: 'EXP-2024-001', type: 'Office Rent', description: 'Monthly office rent payment', amount: 5000, date: '2024-10-01', vendor: 'ABC Properties', status: 'Approved' },
    { id: 'EXP-2024-002', type: 'Utilities', description: 'Electricity and water bills', amount: 850, date: '2024-10-05', vendor: 'City Utilities', status: 'Approved' },
    { id: 'EXP-2024-003', type: 'Marketing', description: 'Social media advertising', amount: 2500, date: '2024-10-10', vendor: 'AdTech Solutions', status: 'Pending' },
    { id: 'EXP-2024-004', type: 'Equipment', description: 'New computer hardware', amount: 3200, date: '2024-10-15', vendor: 'Tech Store Inc', status: 'Approved' },
    { id: 'EXP-2024-005', type: 'Salaries', description: 'Staff salaries - October', amount: 35000, date: '2024-10-25', vendor: 'Payroll', status: 'Paid' }
  ];
  
  const tbody = document.getElementById('expensesTable');
  if (!tbody) return;
  
  tbody.innerHTML = expenses.map(expense => `
    <tr>
      <td><strong>${expense.id}</strong></td>
      <td><span class="badge badge-info">${expense.type}</span></td>
      <td>${expense.description}</td>
      <td><strong>${formatCurrency(expense.amount)}</strong></td>
      <td>${formatDate(expense.date)}</td>
      <td>${expense.vendor}</td>
      <td><span class="badge ${expense.status === 'Paid' ? 'badge-success' : expense.status === 'Approved' ? 'badge-info' : 'badge-warning'}">${expense.status}</span></td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="viewExpense('${expense.id}')"><i class="bi bi-eye"></i></button>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="editExpense('${expense.id}')"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteExpense('${expense.id}')"><i class="bi bi-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

// Modals
function initModals() {
  // Initialize all modals on the page
}

// CRUD Operations
async function viewCustomer(id) {
  alert(`Viewing customer: ${id}`);
}

async function editCustomer(id) {
  alert(`Editing customer: ${id}`);
}

async function deleteCustomer(id) {
  if (await confirmAction('Are you sure you want to delete this customer?')) {
    showToast('Customer deleted successfully!', 'success');
    loadCustomers();
  }
}

async function viewPolicy(id) {
  alert(`Viewing policy: ${id}`);
}

async function editPolicy(id) {
  alert(`Editing policy: ${id}`);
}

async function deletePolicy(id) {
  if (await confirmAction('Are you sure you want to delete this policy?')) {
    showToast('Policy deleted successfully!', 'success');
    loadPolicies();
  }
}

async function viewVehicle(id) {
  alert(`Viewing vehicle: ${id}`);
}

async function editVehicle(id) {
  alert(`Editing vehicle: ${id}`);
}

async function deleteVehicle(id) {
  if (await confirmAction('Are you sure you want to delete this vehicle?')) {
    showToast('Vehicle deleted successfully!', 'success');
    loadVehicles();
  }
}

async function viewClaim(id) {
  alert(`Viewing claim: ${id}`);
}

async function approveClaim(id) {
  if (await confirmAction('Are you sure you want to approve this claim?')) {
    showToast('Claim approved successfully!', 'success');
    loadClaims();
  }
}

async function rejectClaim(id) {
  if (await confirmAction('Are you sure you want to reject this claim?')) {
    showToast('Claim rejected.', 'error');
    loadClaims();
  }
}

async function viewBill(id) {
  alert(`Viewing bill: ${id}`);
}

function printBill(id) {
  showToast('Preparing bill for printing...', 'info');
}

async function viewExpense(id) {
  alert(`Viewing expense: ${id}`);
}

async function editExpense(id) {
  alert(`Editing expense: ${id}`);
}

async function deleteExpense(id) {
  if (await confirmAction('Are you sure you want to delete this expense?')) {
    showToast('Expense deleted successfully!', 'success');
    loadExpenses();
  }
}

// Form Handlers
function handleAddPolicy(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Saving...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    showToast('Policy added successfully!', 'success');
    setTimeout(() => {
      window.location.href = 'policies-list.html';
    }, 1000);
  }, 1500);
}

function handleAddVehicle(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Saving...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    showToast('Vehicle added successfully!', 'success');
    setTimeout(() => {
      window.location.href = 'vehicle-list.html';
    }, 1000);
  }, 1500);
}

function handleAddBill(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Generating...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    showToast('Bill generated successfully!', 'success');
    setTimeout(() => {
      window.location.href = 'billing-list.html';
    }, 1000);
  }, 1500);
}

function handleAddExpense(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Saving...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    showToast('Expense added successfully!', 'success');
    setTimeout(() => {
      window.location.href = 'expenses-list.html';
    }, 1000);
  }, 1500);
}

// Export functions
window.loadCustomers = loadCustomers;
window.loadPolicies = loadPolicies;
window.loadVehicles = loadVehicles;
window.loadClaims = loadClaims;
window.loadBilling = loadBilling;
window.loadExpenses = loadExpenses;
window.viewCustomer = viewCustomer;
window.editCustomer = editCustomer;
window.deleteCustomer = deleteCustomer;
window.viewPolicy = viewPolicy;
window.editPolicy = editPolicy;
window.deletePolicy = deletePolicy;
window.viewVehicle = viewVehicle;
window.editVehicle = editVehicle;
window.deleteVehicle = deleteVehicle;
window.viewClaim = viewClaim;
window.approveClaim = approveClaim;
window.rejectClaim = rejectClaim;
window.viewBill = viewBill;
window.printBill = printBill;
window.viewExpense = viewExpense;
window.editExpense = editExpense;
window.deleteExpense = deleteExpense;
window.handleAddPolicy = handleAddPolicy;
window.handleAddVehicle = handleAddVehicle;
window.handleAddBill = handleAddBill;
window.handleAddExpense = handleAddExpense;
