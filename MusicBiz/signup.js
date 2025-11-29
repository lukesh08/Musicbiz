function validateLogin(event) {
  event.preventDefault();

  const usernameOrEmail = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;

  // Retrieve stored signup info from localStorage
  const storedUser = JSON.parse(localStorage.getItem('userData'));

  const errorMsg = document.getElementById('login-error');
  errorMsg.style.display = 'none';

  if (!usernameOrEmail || !password) {
    errorMsg.textContent = "Please enter both username/email and password.";
    errorMsg.style.display = 'block';
    return;
  }

  if (storedUser) {
    // Check username OR email and password match stored signup data
    const validUser = 
      (usernameOrEmail === storedUser.username || usernameOrEmail === storedUser.email) && 
      password === storedUser.password;

    if (validUser) {
      // Redirect to home page
      window.location.href = 'home.html';
    } else {
      errorMsg.textContent = "❌ Username or Password is incorrect.";
      errorMsg.style.display = 'block';
    }
  } else {
    errorMsg.textContent = "No user found. Please sign up first.";
    errorMsg.style.display = 'block';
  }
}

// Show password on mousedown
function showPassword(id) {
  const input = document.getElementById(id);
  if (input) input.type = 'text';
}

// Hide password on mouseup or mouseleave
function hidePassword(id) {
  const input = document.getElementById(id);
  if (input) input.type = 'password';
}

// Handle signup form submission and validation
function goToHome(event) {
  event.preventDefault();

  const name = document.getElementById('name')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const username = document.getElementById('username')?.value.trim();
  const password = document.getElementById('password')?.value;
  const confirmPassword = document.getElementById('confirm-password')?.value;
  const checkbox = document.querySelector('.checkbox input')?.checked;

  if (!name || !email || !username || !password || !confirmPassword) {
    alert('Please fill in all required fields.');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  if (!checkbox) {
    alert('You must agree to the Terms & Privacy Policy.');
    return;
  }

  const successMsg = document.getElementById('success-message');
  if (successMsg) {
    successMsg.style.display = 'block';

    setTimeout(() => {
      successMsg.style.display = 'none';
      window.location.href = "index.html"; // Redirect to login
    }, 4000);
  }
}

// Hide home message after 2 seconds on page load
window.addEventListener('load', () => {
  const homeSection = document.getElementById('home');
  if (homeSection) {
    setTimeout(() => {
      homeSection.style.display = 'none';
    }, 2000);
  }

  // Start typing effect (if present)
  const typingHeader = document.getElementById('typing-header');
  if (typingHeader) {
    const texts = [
      "Unlimited Music Streaming 🎧",
      "Artist Promotion 📈",
      "Music Production Tools 🎹",
      "Collaboration Opportunities 💼",
      "Monetization 💰",
      "Analytics 📊"
    ];
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
      const currentText = texts[index];

      if (isDeleting) {
        typingHeader.textContent = currentText.substring(0, charIndex--);
      } else {
        typingHeader.textContent = currentText.substring(0, charIndex++);
      }

      if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => isDeleting = true, 1500);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % texts.length;
      }

      setTimeout(typeWriter, isDeleting ? 50 : 100);
    }

    typeWriter();
  }

  // Sparkle effect on icons if available
  document.querySelectorAll('.service-card .icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.classList.add('sparkle');
    });
    icon.addEventListener('mouseleave', () => {
      icon.classList.remove('sparkle');
    });
  });
});

// Handle search bar click
function handleSearch() {
  const query = document.getElementById('searchInput')?.value.trim();
  if (query) {
    alert("You searched for: " + query);
    // Replace with real search logic if needed
  } else {
    alert("Please type something to search.");
  }
}

// Scroll-based fade-in animation
const faders = document.querySelectorAll('.fade-in');

const options = {
  threshold: 0.3,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    observer.unobserve(entry.target);
  });
}, options);

faders.forEach(fader => appearOnScroll.observe(fader));

// Light/Dark theme toggle
function toggleTheme() {
  document.body.classList.toggle('light-theme');
}

// Show password briefly when eye icon is clicked
function togglePasswordVisibility(id) {
  const input = document.getElementById(id);
  if (!input) return;

  if (input.type === 'password') {
    input.type = 'text';
    // Hide password after 1 second (1000 ms)
    setTimeout(() => {
      input.type = 'password';
    }, 1000);
  }
}

// Scroll animation for branch cards
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".branch-card");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  cards.forEach(card => {
    card.classList.add("hidden");
    observer.observe(card);
  });
});

// Responsive map resizing (optional)
window.addEventListener('resize', () => {
  const map = document.querySelector("iframe");
  if (window.innerWidth < 600) {
    map.style.height = "250px";
  } else {
    map.style.height = "300px";
  }
});

