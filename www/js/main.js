// ===== MAIN JAVASCRIPT =====

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const subscribeForm = document.getElementById('subscribeForm');
const formSuccess = document.getElementById('formSuccess');
const navbar = document.getElementById('navbar');

// Mobile menu toggle
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
  });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Form validation and submission
if (subscribeForm) {
  subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form elements
    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const product = document.getElementById('product');
    const address = document.getElementById('address');
    const submitBtn = subscribeForm.querySelector('.btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');

    // Clear previous errors
    document.querySelectorAll('.field-error').forEach(error => {
      error.style.display = 'none';
    });

    // Validate form
    let isValid = true;

    if (!name.value.trim()) {
      document.getElementById('nameError').textContent = 'Full name is required';
      document.getElementById('nameError').style.display = 'block';
      isValid = false;
    }

    if (!phone.value.trim()) {
      document.getElementById('phoneError').textContent = 'Phone number is required';
      document.getElementById('phoneError').style.display = 'block';
      isValid = false;
    } else if (!/^\+91\s\d{10}$/.test(phone.value.trim())) {
      document.getElementById('phoneError').textContent = 'Please enter a valid phone number (+91 XXXXX XXXXX)';
      document.getElementById('phoneError').style.display = 'block';
      isValid = false;
    }

    if (!product.value) {
      // Could add error for select if needed
      isValid = false;
    }

    if (!address.value.trim()) {
      document.getElementById('addressError').textContent = 'Delivery address is required';
      document.getElementById('addressError').style.display = 'block';
      isValid = false;
    }

    if (!isValid) return;

    // Show loading state
    submitBtn.disabled = true;
    btnText.textContent = 'Submitting...';
    btnLoader.style.display = 'block';

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      // Hide form and show success
      subscribeForm.style.display = 'none';
      formSuccess.style.display = 'block';

      // Reset loading state
      submitBtn.disabled = false;
      btnText.textContent = 'Start My Free Trial';
      btnLoader.style.display = 'none';
    }, 2000);
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.product-card, .step-card, .testimonial-card, .benefit-float-card').forEach(el => {
  observer.observe(el);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  .animate-in {
    animation: fadeInUp 0.6s ease-out forwards;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.startsWith('91')) {
      value = value.substring(2);
    }
    if (value.length > 10) {
      value = value.substring(0, 10);
    }
    if (value.length > 0) {
      e.target.value = '+91 ' + value.substring(0, 5) + ' ' + value.substring(5);
    } else {
      e.target.value = '';
    }
  });
}