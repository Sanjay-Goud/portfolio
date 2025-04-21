// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle functionality
  const toggleBtn = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  // Check if user has a saved theme preference
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    document.body.classList.toggle('dark', currentTheme === 'dark');
    toggleBtn.innerText = currentTheme === 'dark' ? '☀️' : '🌙';
  } else if (prefersDarkScheme.matches) {
    document.body.classList.add('dark');
    toggleBtn.innerText = '☀️';
  }

  toggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    toggleBtn.innerText = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Create scroll to top button
  const scrollButton = document.createElement('div');
  scrollButton.className = 'scroll-top';
  scrollButton.innerHTML = '↑';
  document.body.appendChild(scrollButton);

  // Show/hide scroll button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollButton.classList.add('visible');
    } else {
      scrollButton.classList.remove('visible');
    }
  });

  // Scroll to top when button is clicked
  scrollButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Mobile navigation toggle
  const hamburger = document.createElement('button');
  hamburger.className = 'hamburger';
  hamburger.innerHTML = '☰';
  document.querySelector('nav').appendChild(hamburger);

  hamburger.addEventListener('click', () => {
    const navMenu = document.querySelector('nav ul');
    navMenu.classList.toggle('open');
    hamburger.innerHTML = navMenu.classList.contains('open') ? '✕' : '☰';
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        const navMenu = document.querySelector('nav ul');
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          hamburger.innerHTML = '☰';
        }
      }
    });
  });

  // Add animation to sections when they come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Observe all sections and their children
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);

    section.querySelectorAll('h2, p, .project').forEach(element => {
      observer.observe(element);
    });
  });

  // Add skill progress bars with hover animation
  const skillsList = document.querySelector('#skills ul');
  if (skillsList) {
    // Define skills with their proficiency levels
    const skills = [
      { name: 'Java', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'C', level: 70 },
      { name: 'HTML, CSS, JavaScript', level: 75 },
      { name: 'React (Basic)', level: 60 },
      { name: 'MySQL', level: 75 },
      { name: 'Git', level: 70 }
    ];

    // Clear existing list
    skillsList.innerHTML = '';

    // Add new skill items with progress bars
    skills.forEach(skill => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${skill.name}
        <div class="skill-bar">
          <div class="skill-progress" data-level="${skill.level}"></div>
        </div>
      `;
      skillsList.appendChild(li);

      // Get the progress bar
      const progressBar = li.querySelector('.skill-progress');

      // Set initial width to 0
      progressBar.style.width = '0%';

      // Add hover event listeners for desktop
      li.addEventListener('mouseenter', () => {
        progressBar.style.width = `${skill.level}%`;
      });

      li.addEventListener('mouseleave', () => {
        progressBar.style.width = '0%';
      });
    });

    // For touch devices where hover isn't available
    if ('ontouchstart' in window) {
      const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const level = entry.target.getAttribute('data-level');
            setTimeout(() => {
              entry.target.style.width = `${level}%`;

              // Reset after 2 seconds
              setTimeout(() => {
                entry.target.style.width = '0%';
              }, 2000);
            }, 300);
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.skill-progress').forEach(bar => {
        skillObserver.observe(bar);
      });
    }
  }

  // Project section enhancement - organize into grid
  const projectsSection = document.querySelector('#projects');
  if (projectsSection && !document.querySelector('.projects-grid')) {
    const projectsTitle = projectsSection.querySelector('h2');
    const projects = Array.from(projectsSection.querySelectorAll('.project'));

    if (projects.length > 0) {
      // Create projects grid container
      const projectsGrid = document.createElement('div');
      projectsGrid.className = 'projects-grid';

      // Re-add projects to grid
      projects.forEach(project => {
        projectsGrid.appendChild(project.cloneNode(true));
      });

      // Clear section and re-add title and grid
      const newContent = document.createElement('div');
      newContent.appendChild(projectsTitle.cloneNode(true));
      newContent.appendChild(projectsGrid);

      projectsSection.innerHTML = newContent.innerHTML;
    }
  }

  // Add typing effect to hero section
  const heroText = document.querySelector('#hero p');
  if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 70);
      }
    };

    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
  }


  // Add contact form validation
  const contactSection = document.querySelector('#contact');
  if (contactSection) {
    // Create contact form
    const contactForm = document.createElement('form');
    contactForm.action = 'https://formspree.io/f/mnnperyj';
    contactForm.method = 'POST';
    contactForm.id = 'contact-form';
    contactForm.innerHTML = `
       <form action="https://formspree.io/f/mnnperyj" method="POST">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required>
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" name="message" rows="5" required></textarea>
        </div>
        <button type="submit">Send Message</button>
        <p id="form-status"></p>
      `;

    // Insert form before existing contact info
    const contactInfo = contactSection.querySelector('p');
    //   contactSection.insertBefore(contactForm, contactInfo);
    contactSection.appendChild(contactForm);


    // Style the form with CSS
    const style = document.createElement('style');
    style.textContent = `
        #contact-form {
          margin-bottom: 40px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        #contact-form label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
        }
        #contact-form input,
        #contact-form textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-family: inherit;
          font-size: 1rem;
          background: var(--card-light);
          color: var(--text-light);
          transition: var(--transition);
        }
        body.dark #contact-form input,
        body.dark #contact-form textarea {
          background: var(--card-dark);
          border-color: var(--border-dark);
          color: var(--text-dark);
        }
        #contact-form input:focus,
        #contact-form textarea:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 2px rgba(74, 108, 247, 0.2);
        }
        #contact-form button {
          background: var(--primary-color);
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: var(--transition);
        }
        #contact-form button:hover {
          background: var(--primary-hover);
          transform: translateY(-3px);
        }
        #form-status {
          margin-top: 15px;
          font-weight: 500;
        }
        .success {
          color: #28a745;
        }
        .error {
          color: #dc3545;
        }
      `;
    document.head.appendChild(style);

    // Form validation and submission
    contactForm.addEventListener('submit', function (e) {
      // e.preventDefault();

      const name = this.querySelector('#name').value.trim();
      const email = this.querySelector('#email').value.trim();
      const message = this.querySelector('#message').value.trim();
      const statusElement = this.querySelector('#form-status');

      // Simple validation
      if (!name || !email || !message) {
        statusElement.textContent = 'Please fill out all fields.';
        statusElement.className = 'error';
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        statusElement.textContent = 'Please enter a valid email address.';
        statusElement.className = 'error';
        return;
      }

      // Simulate form submission (in a real application, you would send data to a server)
      statusElement.textContent = 'Sending...';

      setTimeout(() => {
        this.reset();
        statusElement.textContent = 'Message sent successfully! I\'ll get back to you soon.';
        statusElement.className = 'success';
      }, 1500);
    });
  }


});
