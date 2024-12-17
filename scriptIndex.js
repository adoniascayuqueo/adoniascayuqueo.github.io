document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.querySelector(".progress-bar");
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    let mobileMenuBtn;

    // Improved Scroll Progress Bar with Requestanimationframe
    function updateScrollProgress() {
        const winScroll = window.pageYOffset || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (winScroll / height) * 100;
        
        requestAnimationFrame(() => {
            progressBar.style.width = `${scrollPercentage}%`;
        });
    }

    // Navbar Transformation with Debounce
    function handleNavbarScroll() {
        requestAnimationFrame(() => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Accessibility-Enhanced Mobile Menu
    function createMobileMenu() {
        // Only create if not already exists and screen is small
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-btn')) {
            mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.className = 'mobile-menu-btn';
            mobileMenuBtn.setAttribute('aria-label', 'Toggle Mobile Menu');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
            
            navbar.appendChild(mobileMenuBtn);

            // Accessibility Enhancements
            navLinks.setAttribute('aria-hidden', 'true');
            navLinks.setAttribute('data-mobile-state', 'closed');

            mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        }
    }

    // Comprehensive Mobile Menu Toggle
    function toggleMobileMenu() {
        const isOpen = navLinks.getAttribute('data-mobile-state') === 'open';
        
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        
        // Update accessibility attributes
        navLinks.setAttribute('aria-hidden', isOpen.toString());
        navLinks.setAttribute('data-mobile-state', isOpen ? 'closed' : 'open');
        mobileMenuBtn.setAttribute('aria-expanded', (!isOpen).toString());
    }

    // Close Mobile Menu on Link Click
    function setupMobileNavLinkClosing() {
        const navLinkElements = navLinks.querySelectorAll('a');
        
        navLinkElements.forEach(link => {
            link.addEventListener('click', () => {
                // Smooth scroll to section
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }

                // Close mobile menu
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    navLinks.setAttribute('data-mobile-state', 'closed');
                    navLinks.setAttribute('aria-hidden', 'true');
                    
                    if (mobileMenuBtn) {
                        mobileMenuBtn.classList.remove('active');
                        mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        });
    }

    // Responsive Handler
    function handleResponsiveness() {
        if (window.innerWidth <= 768) {
            createMobileMenu();
        } else {
            // Remove mobile menu on larger screens
            if (mobileMenuBtn) {
                navbar.removeChild(mobileMenuBtn);
                navLinks.classList.remove('active');
                navLinks.removeAttribute('aria-hidden');
                navLinks.removeAttribute('data-mobile-state');
            }
        }
    }

    // Event Listeners with Optimization
    window.addEventListener('scroll', () => {
        updateScrollProgress();
        handleNavbarScroll();
    }, { passive: true });

    window.addEventListener('resize', handleResponsiveness);

    // Initial Setup
    createMobileMenu();
    setupMobileNavLinkClosing();
    handleResponsiveness();
});

// Performance Optimization: Passive Event Listeners
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});





// Improved stats animation
const stats = document.querySelectorAll('.stat-number');
let animated = false;
const animateStats = () => {
    if (animated) return;
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(interval);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 20);
    });
    
    animated = true;
};

// Improved Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            if (entry.target.closest('.stats-section')) {
                animateStats();
            }
        }
    });
}, { threshold: 0.1 })

// Observe elements

document.querySelectorAll('.portfolio-card, .team-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
});



// Smooth Scrolling
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

// Form Submission with Animation
const subscribeForm = document.querySelector('.subscribe-form');
subscribeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const button = this.querySelector('button');
    const input = this.querySelector('input');
    
    if (!input.value.trim()) return;
    
    button.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
        input.value = '';
        
        setTimeout(() => {
            button.innerHTML = 'Subscribe';
            button.disabled = false;
        }, 2000);
    }, 1500);
});

// Improved portfolio card hover effect
const portfolioCards = document.querySelectorAll('.portfolio-card');
portfolioCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) - 0.5;
        const y = ((e.clientY - rect.top) / rect.height) - 0.5;
        
        card.style.transform = `
            perspective(1000px)
            rotateY(${x * 10}deg)
            rotateX(${-y * 10}deg)
            scale3d(1.05, 1.05, 1.05)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'none';
    });
});

// Dynamic Copyright Year
document.querySelector('footer p').innerHTML = 
    `&copy; ${new Date().getFullYear()} Adonias Cayuqueo. All rights under `;


// Enhanced JavaScript with new features
document.addEventListener('DOMContentLoaded', function() {
    // Create particles
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.querySelector('.hero').appendChild(particlesContainer);
    for(let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particlesContainer.appendChild(particle);
    }
    // Create floating elements
    for(let i = 0; i < 20; i++) {
        const floater = document.createElement('div');
        floater.className = 'floating-element';
        floater.style.left = Math.random() * 100 + 'vw';
        floater.style.top = Math.random() * 100 + 'vh';
        floater.style.animationDelay = Math.random() * 20 + 's';
        document.body.appendChild(floater);
    }
    // Mouse parallax effect for hero section
    // const hero = document.querySelector('.hero');
    // hero.addEventListener('mousemove', (e) => {
    //     const mouseX = e.clientX / window.innerWidth - 0.5;
    //     const mouseY = e.clientY / window.innerHeight - 0.5;
        
    //     hero.style.transform = `
    //         perspective(1000px)
    //         rotateY(${mouseX * 0}deg)
    //         rotateX(${-mouseY * 0}deg)
    //     `;
    // });
    // Rest of your existing JavaScript, Personally I separate it all.
});

// Team section filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const teamCards = document.querySelectorAll('.team-card');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filter = button.dataset.filter;
        
        teamCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Hero section parallax
// document.addEventListener('mousemove', (e) => {
// const hero = document.querySelector('.hero-background');
// const mouseX = e.clientX / window.innerWidth - 0.5;
// const mouseY = e.clientY / window.innerHeight - 0.5;

// hero.style.transform = `scale(1.1) translate(${mouseX * 20}px, ${mouseY * 20}px)`;

// });


/*whatsapp button logic should be here.*/
document.addEventListener('DOMContentLoaded', () => {
    const sectionBtn = document.getElementById('sectionBtn');

    // Optional: Add click event listener
    sectionBtn.addEventListener('click', () => {
        // Example action when button is clicked
        console.log('Section button clicked');
        // You can add your specific functionality here
        // For example: open a new section, trigger a modal, etc.
    });

    // Optional: Add keyboard accessibility
    sectionBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            sectionBtn.click();
        }
    });
});

// Optional: Additional tracking or analytics can be added here
document.querySelector('.whatsapp-section-btn').addEventListener('click', () => {
    console.log('WhatsApp contact button clicked');
});


// Add interactive timeline navigation
document.querySelectorAll('.timeline-point').forEach(point => {
    point.addEventListener('mouseenter', () => {
        point.querySelector('.point-details').style.display = 'block';
    });
    point.addEventListener('mouseleave', () => {
        point.querySelector('.point-details').style.display = 'none';
    });
});

// Function to initialize the market insights
function initializeMarketInsights() {
    // Sample data for trending sectors
    const trendingData = [
        { sector: 'AI/ML', growth: 85 },
        { sector: 'FinTech', growth: 65 },
        { sector: 'Solar Energy', growth: 55 },
        { sector: 'SustainableTech', growth: 45 },
        { sector: 'EdTech', growth: 35 }
    ];
    // Sample metrics data
    const metricsData = [
        { metric: 'Average Deal Size', value: '$2.5M', trend: 'up' },
        { metric: 'YoY Investment Growth', value: '32%', trend: 'up' },
        { metric: 'Portfolio Performance', value: '+28%', trend: 'up' },
        { metric: 'Success Rate', value: '71%', trend: 'stable' }
    ];
    // Create and populate the trend chart
    createTrendChart(trendingData);
    // Populate metrics list
    populateMetrics(metricsData);
}

// Function to create the trending sectors chart
function createTrendChart(data) {
    const chartContainer = document.querySelector('.trend-chart');
    chartContainer.innerHTML = ''; // Clear existing content
    // Create chart bars
    data.forEach(item => {
        // Create bar container
        const barContainer = document.createElement('div');
        barContainer.style.display = 'flex';
        barContainer.style.alignItems = 'center';
        barContainer.style.marginBottom = '10px';
        barContainer.style.gap = '10px';
        // Create label
        const label = document.createElement('div');
        label.style.width = '80px';
        label.textContent = item.sector;
        // Create bar
        const bar = document.createElement('div');
        bar.style.flex = '1';
        bar.style.height = '24px';
        bar.style.position = 'relative';
        bar.style.backgroundColor = '#e9ecef';
        bar.style.borderRadius = '4px';
        bar.style.overflow = 'hidden';
        // Create fill bar
        const fill = document.createElement('div');
        fill.style.width = `${item.growth}%`;
        fill.style.height = '100%';
        fill.style.backgroundColor = '#3498db';
        fill.style.transition = 'width 1s ease-in-out';
        // Create value label
        const value = document.createElement('span');
        value.textContent = `${item.growth}%`;
        value.style.position = 'absolute';
        value.style.right = '10px';
        value.style.top = '50%';
        value.style.transform = 'translateY(-50%)';
        value.style.color = item.growth > 50 ? 'white' : '#2c3e50';
        // Assemble the components
        bar.appendChild(fill);
        bar.appendChild(value);
        barContainer.appendChild(label);
        barContainer.appendChild(bar);
        chartContainer.appendChild(barContainer);
    });
}

// Function to populate metrics list
function populateMetrics(data) {
    const metricsContainer = document.querySelector('.metrics-list');
    metricsContainer.innerHTML = ''; // Clear existing content
    data.forEach(item => {
        const metricDiv = document.createElement('div');
        metricDiv.style.display = 'flex';
        metricDiv.style.justifyContent = 'space-between';
        metricDiv.style.alignItems = 'center';
        metricDiv.style.padding = '15px 0';
        metricDiv.style.borderBottom = '1px solid #e9ecef';
        // Create metric name and value
        const metricInfo = document.createElement('div');
        metricInfo.innerHTML = `
            <div style="font-weight: 500">${item.metric}</div>
            <div style="font-size: 1.25rem; color: #2c3e50">${item.value}</div>
        `;
        // Create trend indicator
        const trendIcon = document.createElement('i');
        trendIcon.className = `fas fa-arrow-${item.trend === 'up' ? 'up' : item.trend === 'down' ? 'down' : 'right'}`;
        trendIcon.style.color = item.trend === 'up' ? '#2ecc71' : item.trend === 'down' ? '#e74c3c' : '#f1c40f';
        trendIcon.style.fontSize = '1.25rem';
        metricDiv.appendChild(metricInfo);
        metricDiv.appendChild(trendIcon);
        metricsContainer.appendChild(metricDiv);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeMarketInsights);




document.addEventListener("DOMContentLoaded", () => {
    const backgrounds = document.querySelectorAll(".hero-background");
    let currentIndex = 0;

    setInterval(() => {
        // Remove "active" from the current image
        backgrounds[currentIndex].classList.remove("active");
        // Move to the next image (loop back to 0 if at the end)
        currentIndex = (currentIndex + 1) % backgrounds.length;
        // Add "active" to the next image
        backgrounds[currentIndex].classList.add("active");
    }, 5000); // Change every 5 seconds
});
