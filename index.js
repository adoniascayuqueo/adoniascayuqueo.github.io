document.addEventListener('DOMContentLoaded', function () {
  const burgerMenu = document.getElementById('burger-menu');
  const overlay = document.getElementById('overlay');
  const navBar = document.querySelector('.nav-bar');
  const timelineSection = document.querySelector('.timeline-section');

  const mobileDropdownItems = document.querySelectorAll('.mobile-nav-item');
  let lastScrollTop = 0;
  const navLinks = document.querySelectorAll(".nav-list a, .mobile-nav-list a");
  const body = document.querySelector('body');

  burgerMenu.addEventListener("click", () => {
    overlay.classList.toggle("active");
    burgerMenu.classList.toggle("active");
    body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
      burgerMenu.classList.remove("active");
      body.style.overflow = '';
    }
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      overlay.classList.remove('active');
      burgerMenu.classList.remove("active");
      body.style.overflow = '';
    });
  });

  mobileDropdownItems.forEach(item => {
    item.addEventListener('click', function (e) {
      e.stopPropagation();
      item.classList.toggle('active');
    });
  });

  // Navbar hide/show on scroll for mobile
  window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (window.innerWidth <= 768) {
      if (scrollTop > lastScrollTop) {
        navBar.classList.add('hide');
        navBar.classList.remove('scroll-up');
      } else if (scrollTop < lastScrollTop) {
        navBar.classList.add('scroll-up');
        navBar.classList.remove('hide');
      } else {
        navBar.classList.remove('hide');
      }
    } else {
      navBar.classList.remove('hide');
      navBar.classList.remove('scroll-up');
    }
    lastScrollTop = scrollTop;
  });

  // Fade in animation
  const fadeInElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Stop observing once active
      }
    });
  }, { threshold: 0.1 });

  fadeInElements.forEach(element => {
    observer.observe(element);
  });

   // Intersection Observer for Timeline Animation
  if (timelineSection) {
       const timelineItems = timelineSection.querySelectorAll('.timeline-item');
       const timelineObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
             if(entry.isIntersecting){
                 entry.target.classList.add('active');
                timelineObserver.unobserve(entry.target);
              }
           })
        },
        {
           threshold: 0.2,
       });
        timelineItems.forEach(item => timelineObserver.observe(item));
    }

  //footer colorful
  document.body.addEventListener("pointermove", (e) => {
    const { currentTarget: el, clientX: x, clientY: y } = e;
    const { top: t, left: l, width: w, height: h } = el.getBoundingClientRect();
    el.style.setProperty('--posX', x - l - w / 2);
    el.style.setProperty('--posY', y - t - h / 2);
  });
});
