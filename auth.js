// Authentication JavaScript

document.addEventListener('DOMContentLoaded', function() {
  initFormValidation();
  initPasswordToggle();
  initPasswordStrength();
});

// Form Validation
function initFormValidation() {
  const forms = document.querySelectorAll('.needs-validation');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      if (!form.checkValidity()) {
        event.stopPropagation();
        form.classList.add('was-validated');
        return;
      }
      
      // Get form type
      const formId = form.id;
      
      switch(formId) {
        case 'loginForm':
          handleLogin(form);
          break;
        case 'registerForm':
          handleRegister(form);
          break;
        case 'forgotPasswordForm':
          handleForgotPassword(form);
          break;
        case 'changePasswordForm':
          handleChangePassword(form);
          break;
        case 'adminLoginForm':
          handleAdminLogin(form);
          break;
        default:
          console.log('Form submitted:', formId);
      }
    });
  });
}

// Login Handler
function handleLogin(form) {
  const formData = new FormData(form);
  const username = formData.get('username');
  const password = formData.get('password');
  const remember = formData.get('remember');
  
  // Show loading
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Signing in...';
  submitBtn.disabled = true;
  
  // Simulate API call
  setTimeout(() => {
    // Demo validation - accept any credentials
    if (username && password) {
      // Store session
      sessionStorage.setItem('userLoggedIn', 'true');
      sessionStorage.setItem('userName', username);
      sessionStorage.setItem('userRole', 'customer');
      
      if (remember) {
        localStorage.setItem('rememberedUser', username);
      }
      
      showToast('Login successful! Redirecting...', 'success');
      
      setTimeout(() => {
        window.location.href = '../customer/customer-dashboard.html';
      }, 1000);
    } else {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      showToast('Invalid credentials. Please try again.', 'error');
    }
  }, 1500);
}

// Admin Login Handler
function handleAdminLogin(form) {
  const formData = new FormData(form);
  const username = formData.get('username');
  const password = formData.get('password');
  
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Signing in...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    if (username && password) {
      sessionStorage.setItem('adminLoggedIn', 'true');
      sessionStorage.setItem('adminName', username);
      
      showToast('Admin login successful!', 'success');
      
      setTimeout(() => {
        window.location.href = 'admin-dashboard.html';
      }, 1000);
    } else {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      showToast('Invalid admin credentials.', 'error');
    }
  }, 1500);
}

// Register Handler
function handleRegister(form) {
  const formData = new FormData(form);
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');
  
  // Validate passwords match
  if (password !== confirmPassword) {
    showToast('Passwords do not match!', 'error');
    return;
  }
  
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Creating account...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    // Simulate successful registration
    showToast('Account created successfully! Please login.', 'success');
    
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1500);
  }, 2000);
}

// Forgot Password Handler
function handleForgotPassword(form) {
  const formData = new FormData(form);
  const email = formData.get('email');
  
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    showToast('Password reset link sent to your email!', 'success');
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    form.reset();
  }, 2000);
}

// Change Password Handler
function handleChangePassword(form) {
  const formData = new FormData(form);
  const currentPassword = formData.get('currentPassword');
  const newPassword = formData.get('newPassword');
  const confirmPassword = formData.get('confirmPassword');
  
  if (newPassword !== confirmPassword) {
    showToast('New passwords do not match!', 'error');
    return;
  }
  
  if (newPassword.length < 8) {
    showToast('Password must be at least 8 characters!', 'error');
    return;
  }
  
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Updating...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    showToast('Password changed successfully!', 'success');
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    form.reset();
  }, 1500);
}

// Password Toggle
function initPasswordToggle() {
  const toggleButtons = document.querySelectorAll('.password-toggle');
  
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const input = this.closest('.input-group').querySelector('input');
      const icon = this.querySelector('i');
      
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('bi-eye');
        icon.classList.add('bi-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.remove('bi-eye-slash');
        icon.classList.add('bi-eye');
      }
    });
  });
}

// Password Strength Indicator
function initPasswordStrength() {
  const passwordInputs = document.querySelectorAll('input[name="password"], input[name="newPassword"]');
  
  passwordInputs.forEach(input => {
    const strengthIndicator = input.closest('.mb-3, .mb-4')?.querySelector('.password-strength');
    if (!strengthIndicator) return;
    
    input.addEventListener('input', function() {
      const strength = calculatePasswordStrength(this.value);
      updateStrengthIndicator(strengthIndicator, strength);
    });
  });
}

function calculatePasswordStrength(password) {
  let strength = 0;
  
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;
  
  return Math.min(strength, 4);
}

function updateStrengthIndicator(indicator, strength) {
  const levels = ['Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['danger', 'warning', 'info', 'success'];
  
  const level = Math.max(0, strength - 1);
  const percentage = (strength / 4) * 100;
  
  indicator.innerHTML = `
    <div class="progress" style="height: 4px;">
      <div class="progress-bar bg-${colors[level]}" style="width: ${percentage}%"></div>
    </div>
    <small class="text-${colors[level]}">${levels[level] || 'Too weak'}</small>
  `;
}

// Logout Function
function logout() {
  sessionStorage.removeItem('userLoggedIn');
  sessionStorage.removeItem('userName');
  sessionStorage.removeItem('userRole');
  showToast('Logged out successfully!', 'success');
  setTimeout(() => {
    window.location.href = '../public/index.html';
  }, 1000);
}

// Admin Logout Function
function adminLogout() {
  sessionStorage.removeItem('adminLoggedIn');
  sessionStorage.removeItem('adminName');
  showToast('Logged out successfully!', 'success');
  setTimeout(() => {
    window.location.href = 'admin-login.html';
  }, 1000);
}

// Check Auth Status
function checkAuth() {
  const isLoggedIn = sessionStorage.getItem('userLoggedIn');
  if (!isLoggedIn) {
    window.location.href = '../auth/login.html';
  }
}

function checkAdminAuth() {
  const isAdminLoggedIn = sessionStorage.getItem('adminLoggedIn');
  if (!isAdminLoggedIn) {
    window.location.href = 'admin-login.html';
  }
}

// Export functions
window.logout = logout;
window.adminLogout = adminLogout;
window.checkAuth = checkAuth;
window.checkAdminAuth = checkAdminAuth;
