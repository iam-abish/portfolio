// Role typing animation
const roles = [
  "DevOps & Cloud Engineer",
  "Linux & Docker Practitioner",
  "CI/CD Automation Enthusiast",
  "Cloud Infrastructure Architect",
  "Kubernetes Orchestrator"
];

const typingElement = document.querySelector(".typing");
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typingElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }
  
  let typeSpeed = isDeleting ? 50 : 100;
  
  if (!isDeleting && charIndex === currentRole.length) {
    // Pause at end of role
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 500;
  }
  
  setTimeout(typeRole, typeSpeed);
}

// Start typing animation
if (typingElement) {
  typeRole();
}

// Terminal simulation
const terminal = document.getElementById("terminal");

if (terminal) {
  const commands = [
    { cmd: "docker ps -a", output: "CONTAINER ID   IMAGE          STATUS\n3f8a9b2c1d4e   nginx:latest   Up 2 hours" },
    { cmd: "kubectl get pods", output: "NAME                    READY   STATUS    RESTARTS\nweb-app-7d9f8b-xk2p9   1/1     Running   0\napi-server-5c6d8-m4n7   1/1     Running   0" },
    { cmd: "terraform plan", output: "Plan: 5 to add, 0 to change, 0 to destroy" },
    { cmd: "git status", output: "On branch main\nYour branch is up to date with 'origin/main'" },
    { cmd: "aws ec2 describe-instances", output: "Instances: 3 running, 0 stopped" },
  ];
  
  let cmdIndex = 0;
  let charIndex = 0;
  let isTypingCommand = true;
  let currentOutput = "";
  
  terminal.textContent = "$ ";
  
  function typeTerminal() {
    const current = commands[cmdIndex];
    
    if (isTypingCommand) {
      if (charIndex < current.cmd.length) {
        terminal.textContent += current.cmd[charIndex];
        charIndex++;
        setTimeout(typeTerminal, 60);
      } else {
        terminal.textContent += "\n";
        isTypingCommand = false;
        charIndex = 0;
        setTimeout(typeTerminal, 300);
      }
    } else {
      if (charIndex < current.output.length) {
        terminal.textContent += current.output[charIndex];
        charIndex++;
        setTimeout(typeTerminal, 20);
      } else {
        terminal.textContent += "\n✓ Done\n\n$ ";
        isTypingCommand = true;
        charIndex = 0;
        cmdIndex = (cmdIndex + 1) % commands.length;
        setTimeout(typeTerminal, 1500);
      }
    }
  }
  
  typeTerminal();
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.skill-category, .project-card, .dashboard-card, .stat-item');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // Add stagger delay to grid items
  document.querySelectorAll('.skills-list .skill-tag').forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(20px)';
    tag.style.transition = `opacity 0.4s ease ${index * 0.05}s, transform 0.4s ease ${index * 0.05}s`;
    observer.observe(tag);
  });
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Add parallax effect to floating icons
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const floatingIcons = document.querySelectorAll('.float-icon');
  
  floatingIcons.forEach((icon, index) => {
    const speed = 0.5 + (index * 0.1);
    icon.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Animate progress bars when visible
const progressBars = document.querySelectorAll('.progress-fill');
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'progressLoad 2s ease-out forwards';
    }
  });
}, { threshold: 0.5 });

progressBars.forEach(bar => progressObserver.observe(bar));

// Add hover effect to cards
document.querySelectorAll('.project-card, .skill-category, .dashboard-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  });
});

// Add typing cursor blink
const cursor = document.querySelector('.cursor');
if (cursor) {
  setInterval(() => {
    cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
  }, 530);
}

// Console easter egg
console.log('%c🚀 DevOps Portfolio', 'color: #00f5ff; font-size: 24px; font-weight: bold;');
console.log('%cBuilt with modern web technologies', 'color: #7c3aed; font-size: 14px;');
console.log('%cInterested in the code? Check out my GitHub!', 'color: #10b981; font-size: 12px;');
console.log('%c→ github.com/iam-abish', 'color: #00f5ff; font-size: 12px; text-decoration: underline;');