// script.js - Complete Portfolio Functionality

// Theme Toggle (Dark/Light Mode)
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (themeIcon) {
            themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Toggle icon
        if (themeIcon) {
            themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        
        // Add animation
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    });
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
            }
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            });
        });
    }
});

// Back to Top Button
document.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.getElementById('back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Smooth Scrolling for Anchor Links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Dynamic Floating Shapes Animation
document.addEventListener('DOMContentLoaded', function() {
    const shapes = document.querySelectorAll('.shape');
    
    if (shapes.length > 0) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 20;
                const x = mouseX * speed;
                const y = mouseY * speed;
                shape.style.transform = `translate(${x}px, ${y}px) rotate(${x * 10}deg)`;
            });
        });
    }
});

// Project Cards Parallax Effect
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});

// Skill Tags Interactive Animation
document.addEventListener('DOMContentLoaded', function() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function(e) {
            const level = this.getAttribute('data-level');
            const levels = {
                'expert': '⭐ Expert',
                'advanced': '📈 Advanced',
                'intermediate': '📊 Intermediate',
                'beginner': '🌱 Beginner'
            };
            
            // Remove any existing tooltips
            const existingTooltip = this.querySelector('.skill-tooltip');
            if (existingTooltip) {
                existingTooltip.remove();
            }
            
            const tooltip = document.createElement('div');
            tooltip.className = 'skill-tooltip';
            tooltip.textContent = levels[level] || level;
            tooltip.style.cssText = `
                position: absolute;
                background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FFD93D 100%);
                color: white;
                padding: 0.3rem 0.8rem;
                border-radius: 20px;
                font-size: 0.8rem;
                top: -30px;
                left: 50%;
                transform: translateX(-50%);
                white-space: nowrap;
                pointer-events: none;
                z-index: 100;
                animation: fadeInUp 0.3s ease;
            `;
            
            this.style.position = 'relative';
            this.appendChild(tooltip);
            
            setTimeout(() => {
                if (tooltip && tooltip.parentNode) {
                    tooltip.remove();
                }
            }, 2000);
        });
    });
});

// Typing Effect for Hero Subtitle
document.addEventListener('DOMContentLoaded', function() {
    const subtitleElement = document.querySelector('.hero-subtitle');
    
    if (subtitleElement) {
        const originalText = subtitleElement.textContent;
        subtitleElement.textContent = '';
        
        let charIndex = 0;
        function typeText() {
            if (charIndex < originalText.length) {
                subtitleElement.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 100);
            }
        }
        
        // Start typing effect when page loads
        typeText();
    }
});

// Visitor Counter with Local Storage
document.addEventListener('DOMContentLoaded', function() {
    const counterSpan = document.querySelector('#visitor-counter span');
    
    if (counterSpan) {
        let visitorCount = localStorage.getItem('visitorCount');
        if (!visitorCount) {
            visitorCount = 0;
        }
        visitorCount = parseInt(visitorCount) + 1;
        localStorage.setItem('visitorCount', visitorCount);
        counterSpan.textContent = visitorCount;
    }
});

// Animate numbers in stats
document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.hero-stats');
    const stats = document.querySelectorAll('.stat h3');
    
    if (stats.length > 0 && statsSection) {
        statsSection.style.opacity = '0';
        statsSection.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            statsSection.style.transition = 'all 0.8s ease';
            statsSection.style.opacity = '1';
            statsSection.style.transform = 'translateY(0)';
        }, 500);
        
        // Animate numbers
        stats.forEach(stat => {
            const targetText = stat.textContent;
            const target = parseInt(targetText);
            
            if (!isNaN(target)) {
                let current = 0;
                const increment = target / 50;
                
                const updateNumber = () => {
                    if (current < target) {
                        current += increment;
                        stat.textContent = Math.ceil(current) + (targetText.includes('+') ? '+' : '');
                        requestAnimationFrame(updateNumber);
                    } else {
                        stat.textContent = target + (targetText.includes('+') ? '+' : '');
                    }
                };
                
                // Use Intersection Observer if available
                if ('IntersectionObserver' in window) {
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                updateNumber();
                                observer.unobserve(entry.target);
                            }
                        });
                    }, { threshold: 0.5 });
                    
                    observer.observe(stat);
                } else {
                    // Fallback for older browsers
                    updateNumber();
                }
            }
        });
    }
});

// Page load animation
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
});

// Download Resume Function
function downloadResume() {
    // Create a dummy resume content
    const resumeContent = `
KALAIVANI P
============
Aspiring Full Stack Developer

EDUCATION
---------
B.Tech Information Technology
Agni College of Technology, Chennai
Expected Graduation: 2027

SKILLS
------
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Python
- Database: MongoDB, MySQL
- Tools: Git, VS Code

PROJECTS
--------
1. PrintEase - Xerox Shop App
   Campus printing solution reducing waiting time by 70%

2. GoodDeed - Charity Website
   Platform connecting donors with NGOs

ACHIEVEMENTS
------------
- Solved 10+ LeetCode problems
- Active in tech communities
    `;
    
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Kalaivani_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Show success message
    alert('Resume downloaded successfully!');
}

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
        } else {
            img.style.opacity = '1';
        }
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const themeToggle = document.getElementById('theme-toggle');
    
    // Press 'T' for theme toggle
    if ((e.key === 't' || e.key === 'T') && themeToggle) {
        e.preventDefault();
        themeToggle.click();
    }
    
    // Press 'H' for home
    if (e.key === 'h' || e.key === 'H') {
        window.location.href = 'index.html';
    }
    
    // Press 'P' for projects
    if (e.key === 'p' || e.key === 'P') {
        window.location.href = 'projects.html';
    }
});

// Add CSS animations
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .nav-links a.active {
            color: #FF6B6B;
        }
        
        .nav-links a.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
});