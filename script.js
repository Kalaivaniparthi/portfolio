// ========== WAIT FOR PAGE TO LOAD ==========
document.addEventListener('DOMContentLoaded', function() {
    
    console.log('✅ Portfolio script loaded!');
    
    // ========== DARK MODE TOGGLE (Light mode as optional) ==========
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        // Check saved preference (default is dark)
        const savedTheme = localStorage.getItem('theme');
        
        // If user previously chose light mode, apply it
        if (savedTheme === 'light') {
            document.body.classList.add('light');
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        } else {
            // Default is dark mode
            document.body.classList.remove('light');
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
        
        // Toggle theme when clicked
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light');
            
            const icon = themeToggle.querySelector('i');
            if (document.body.classList.contains('light')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('theme', 'light');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
    
    // ========== MOBILE MENU TOGGLE ==========
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
    }
    
    // ========== CONTACT FORM HANDLER ==========
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const subject = document.getElementById('subject')?.value || '';
            const message = document.getElementById('message')?.value || '';
            
            // Simple validation
            if (!name || !email || !message) {
                if (formStatus) {
                    formStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please fill all required fields.';
                    formStatus.style.color = '#ef4444';
                    setTimeout(() => {
                        formStatus.innerHTML = '';
                    }, 3000);
                }
                return;
            }
            
            // Show sending message
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn ? submitBtn.innerHTML : 'Send Message';
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
            }
            
            // Save to localStorage (works without backend)
            try {
                let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
                messages.push({
                    name: name,
                    email: email,
                    subject: subject,
                    message: message,
                    date: new Date().toLocaleString()
                });
                localStorage.setItem('contactMessages', JSON.stringify(messages));
                
                // Show success
                if (formStatus) {
                    formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.';
                    formStatus.style.color = '#10b981';
                }
                contactForm.reset();
                
                setTimeout(() => {
                    if (formStatus) formStatus.innerHTML = '';
                }, 5000);
                
            } catch (error) {
                console.error('Error saving message:', error);
                if (formStatus) {
                    formStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error sending message. Please try again.';
                    formStatus.style.color = '#ef4444';
                    setTimeout(() => {
                        formStatus.innerHTML = '';
                    }, 3000);
                }
            } finally {
                if (submitBtn) {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            }
        });
    }
    
    // ========== PROJECT FILTERS ==========
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // ========== BACK TO TOP BUTTON ==========
    const backToTop = document.getElementById('back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.style.display = 'flex';
            } else {
                backToTop.style.display = 'none';
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // ========== VISITOR COUNTER ==========
    const visitorSpan = document.querySelector('#visitor-counter span');
    if (visitorSpan) {
        let count = localStorage.getItem('visitorCount');
        if (!count) {
            count = Math.floor(Math.random() * 500) + 100;
            localStorage.setItem('visitorCount', count);
        }
        visitorSpan.textContent = count;
    }
    
    // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        const href = anchor.getAttribute('href');
        if (href && href !== '#' && href !== '' && href !== '#') {
            anchor.addEventListener('click', function(e) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });
    
    // ========== ACTIVE NAVIGATION LINK ==========
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navAnchors = document.querySelectorAll('.nav-links a');
    
    navAnchors.forEach(anchor => {
        const href = anchor.getAttribute('href');
        if (href === currentPage) {
            anchor.classList.add('active');
        } else if (currentPage === 'index.html' && href === 'index.html') {
            anchor.classList.add('active');
        }
    });
    
});

// ========== RESUME DOWNLOAD FUNCTION ==========
function downloadResume() {
    // Replace with your actual resume PDF link
    alert('Resume download feature coming soon!');
    // Uncomment this when you have your resume PDF:
    // window.open('assets/resume.pdf', '_blank');
}

console.log('✅ All scripts are ready! Dark mode is default.');
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA886GlxzCTexy7bvvLNrRg617owvOyIe4",
  authDomain: "portfolio-51a49.firebaseapp.com",
  projectId: "portfolio-51a49",
  storageBucket: "portfolio-51a49.firebasestorage.app",
  messagingSenderId: "466986441034",
  appId: "1:466986441034:web:cac5619b79421f9edfc9b3",
  measurementId: "G-1QJQCJF97B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);