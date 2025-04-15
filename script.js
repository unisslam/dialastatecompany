// Modern script.js with enhanced functionality

// Language switching function
function switchLang(lang) {
  const elements = document.querySelectorAll('[data-en]');
  elements.forEach(el => {
    if (lang === 'en') {
      el.innerText = el.getAttribute('data-en');
      document.body.setAttribute('dir', 'ltr');
      document.body.setAttribute('lang', 'en');
      document.documentElement.setAttribute('lang', 'en');
    } else {
      el.innerText = el.getAttribute('data-ar') || el.innerText;
      document.body.setAttribute('dir', 'rtl');
      document.body.setAttribute('lang', 'ar');
      document.documentElement.setAttribute('lang', 'ar');
    }
  });
  
  // Save language preference
  localStorage.setItem('preferredLanguage', lang);
}

// Check for saved language preference on page load
document.addEventListener('DOMContentLoaded', function() {
  const savedLang = localStorage.getItem('preferredLanguage');
  if (savedLang) {
    switchLang(savedLang);
  }
  
  // Initialize mobile menu
  initMobileMenu();
  
  // Initialize animations
  initAnimations();
  
  // Initialize charts
  initCharts();
  
  // Initialize workforce statistics charts
  initWorkforceCharts();
  
  // Initialize employee grades chart
  initEmployeeGradesChart();
  
  // Initialize beneficiaries chart
  initBeneficiariesChart();
  
  // Initialize chart selector buttons
  initChartSelectors();
  
  // Initialize progress bars
  initProgressBars();
  
  // Initialize contact form
  initContactForm();
  
  // Initialize smooth scrolling
  initSmoothScrolling();
  
  // Initialize product cards (was previously mind map)
  initProductCards();
  
  // Initialize scrollable cards
  initScrollableCards();
  
  // Initialize services location section
  initServicesLocationSection();
  
  // Initialize organizational chart
  initOrgChart();
  
  // Initialize back to top button
  initBackToTopButton();
  
  // Mobile menu toggle
  const menuToggle = document.querySelector('.mobile-menu-btn');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navbarCollapse.classList.toggle('show');
      document.body.classList.toggle('menu-open');
    });
  }
  
  // Dropdown toggle for mobile
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        this.parentElement.classList.toggle('active');
      }
    });
  });
  
  // Global resize handler for all responsive components
  function handleWindowResize() {
    // Add resizing class to body to disable transitions
    document.body.classList.add('resizing');
    
    // Handle direct sales section
    adjustDirectSalesSection();
    
    // Handle card scaling and layout adjustments
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
      card.style.transition = 'none'; // Temporarily disable transitions during resize
    });
    
    // Handle scrollable cards container
    const scrollableCards = document.querySelectorAll('.scrollable-cards');
    scrollableCards.forEach(container => {
      container.style.transition = 'none';
    });
    
    // Update indicators for scrollable content
    const scrollableContainers = document.querySelectorAll('.scrollable-cards-container');
    scrollableContainers.forEach(container => {
      const indicators = container.querySelector('.scroll-indicators');
      if (indicators) {
        updateIndicators();
      }
    });
    
    // Re-enable transitions after resize is complete
    setTimeout(() => {
      infoCards.forEach(card => {
        card.style.transition = '';
      });
      scrollableCards.forEach(container => {
        container.style.transition = '';
      });
      document.body.classList.remove('resizing');
    }, 100);
  }
  
  // Debounced resize handler
  const debouncedResize = debounce(handleWindowResize, 150);
  
  // Add resize event listener for all responsive components
  window.addEventListener('resize', debouncedResize);
  
  // Fix Direct Sales Section on mobile
  function adjustDirectSalesSection() {
    const directSalesSection = document.querySelector('.direct-sales-section');
    if (directSalesSection) {
      if (window.innerWidth <= 768) {
        directSalesSection.style.width = '90%';
        directSalesSection.style.padding = '40px 20px';
      } else if (window.innerWidth <= 480) {
        directSalesSection.style.width = '95%';
        directSalesSection.style.padding = '30px 15px';
      } else {
        directSalesSection.style.width = '100%';
        directSalesSection.style.padding = '60px 0';
      }
    }
    
    // Also adjust services location section
    const servicesLocationSection = document.querySelector('.services-location-section');
    if (servicesLocationSection) {
      if (window.innerWidth <= 768) {
        servicesLocationSection.style.padding = '40px 20px';
      } else if (window.innerWidth <= 480) {
        servicesLocationSection.style.padding = '30px 15px';
      } else {
        servicesLocationSection.style.padding = '60px 0';
      }
    }
  }
  
  // Run initially to set correct layout on page load
  handleWindowResize();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Update active navigation link
        document.querySelectorAll('.main-nav a').forEach(navLink => {
          navLink.classList.remove('active');
        });
        this.classList.add('active');
      }
    });
  });
  
  // Highlight active section on scroll
  window.addEventListener('scroll', highlightActiveSection);
}

// Highlight active section based on scroll position
function highlightActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const scrollPosition = window.scrollY;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSection = '#' + section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentSection) {
      link.classList.add('active');
    }
  });
}

// Initialize animations
function initAnimations() {
  // Intersection Observer for elements that should animate when they come into view
  const elementsToAnimate = document.querySelectorAll('.intro, .about, .charts, .team, .contact');
  
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        animationObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  elementsToAnimate.forEach(element => {
    animationObserver.observe(element);
  });
}

// Initialize progress bars
function initProgressBars() {
  const progressBars = document.querySelectorAll('.progress-bar');
  
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const value = entry.target.getAttribute('data-value');
        const maxValue = 200; // Assuming 200 is the maximum value among all progress bars
        const percentage = (value / maxValue) * 100;
        
        entry.target.style.width = `${percentage}%`;
        entry.target.classList.add('animated');
        
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  progressBars.forEach(bar => {
    progressObserver.observe(bar);
  });
}

// Initialize chart selectors
function initChartSelectors() {
  const chartButtons = document.querySelectorAll('.chart-selector button');
  const chartContainers = document.querySelectorAll('.chart-container');
  
  chartButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active button
      chartButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Show the selected chart
      const chartType = this.getAttribute('data-chart');
      chartContainers.forEach(container => {
        container.classList.remove('active');
        if (container.id === `${chartType}-container`) {
          container.classList.add('active');
        }
      });
    });
  });
}

// Initialize contact form
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value || 'استفسار من موقع شركة ديالى';
      const message = document.getElementById('message').value;
      
      // Simple validation
      if (!name || !email || !message) {
        alert('الرجاء تعبئة جميع الحقول المطلوبة');
        return;
      }
      
      // Format email body with form data
      const emailBody = `الاسم: ${name}
البريد الإلكتروني: ${email}
الرسالة:
${message}`;
      
      // Create mailto link with company email
      const mailtoLink = `mailto:diala.comp@industry.gov.iq?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
      
      // Open user's email client
      window.location.href = mailtoLink;
      
      // Show success message in form after a short delay
      setTimeout(() => {
        contactForm.innerHTML = `
          <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <h3>تم فتح تطبيق البريد الإلكتروني الخاص بك!</h3>
            <p>يرجى إكمال إرسال الرسالة من خلال تطبيق البريد الإلكتروني.</p>
          </div>
        `;
      }, 1000);
    });
  }
}

// Initialize all charts
function initCharts() {
  // Configure Chart.js globally
  Chart.defaults.font.family = "'Tajawal', sans-serif";
  Chart.defaults.font.size = 14;
  Chart.defaults.color = '#333';
  
  // Sales Chart
  const salesCtx = document.getElementById('salesChart').getContext('2d');
  const salesChart = new Chart(salesCtx, {
    type: 'bar',
    data: {
      labels: ['2022', '2023', '2024'],
      datasets: [{
        label: 'مبيعات بالمليار دينار',
        data: [36.9, 147.9, 148.6],
        backgroundColor: [
          'rgba(255, 215, 0, 0.8)',
          'rgba(34, 139, 34, 0.8)',
          'rgba(10, 61, 10, 0.8)'
        ],
        borderColor: [
          'rgb(255, 215, 0)',
          'rgb(34, 139, 34)',
          'rgb(10, 61, 10)'
        ],
        borderWidth: 1,
        borderRadius: 5,
        barPercentage: 0.7,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            boxWidth: 15,
            padding: 15
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: 10,
          cornerRadius: 5,
          callbacks: {
            label: function(context) {
              return `المبيعات: ${context.parsed.y} مليار دينار`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)'
          },
          ticks: {
            callback: function(value) {
              return value + ' مليار';
            }
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      }
    }
  });

  // Production Chart
  const prodCtx = document.getElementById('productionChart').getContext('2d');
  const productionChart = new Chart(prodCtx, {
    type: 'line',
    data: {
      labels: ['2022', '2023', '2024'],
      datasets: [{
        label: 'الإنتاج السنوي',
        data: [36768, 147945, 148605],
        borderColor: 'rgb(34, 139, 34)',
        backgroundColor: 'rgba(34, 139, 34, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: '#fff',
        pointBorderColor: 'rgb(34, 139, 34)',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: 10,
          cornerRadius: 5,
          callbacks: {
            label: function(context) {
              return `الإنتاج: ${context.parsed.y.toLocaleString()} وحدة`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          },
          ticks: {
            callback: function(value) {
              return value.toLocaleString();
            }
          }
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      }
    }
  });

  // Customers Chart
  const custCtx = document.getElementById('customerChart').getContext('2d');
  const customerChart = new Chart(custCtx, {
    type: 'pie',
    data: {
      labels: ['وزارة الكهرباء', 'وزارة الاتصالات', 'قطاع خاص'],
      datasets: [{
        data: [75, 9, 16],
        backgroundColor: [
          'rgba(34, 139, 34, 0.8)',
          'rgba(255, 215, 0, 0.8)',
          'rgba(10, 61, 10, 0.8)'
        ],
        borderColor: '#fff',
        borderWidth: 2,
        hoverOffset: 15
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            boxWidth: 15
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: 10,
          cornerRadius: 5,
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.parsed}%`;
            }
          }
        }
      },
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 2000,
        easing: 'easeOutQuart'
      }
    }
  });
}

// Initialize employee grades chart
function initEmployeeGradesChart() {
  const ctx = document.getElementById('employeeGradesChart')?.getContext('2d');
  if (!ctx) return;
  
  // Employee grades data
  const labels = [
    'الدرجة الأولى', 
    'الدرجة الثانية', 
    'الدرجة الثالثة', 
    'الدرجة الرابعة', 
    'الدرجة الخامسة', 
    'الدرجة السادسة', 
    'الدرجة السابعة', 
    'الدرجة الثامنة', 
    'الدرجة التاسعة', 
    'الدرجة العاشرة'
  ];
  
  const values = [2, 182, 949, 193, 312, 65, 50, 26, 2, 2];
  
  // Create a color array that gradually changes from primary to secondary color
  const colorBase = [
    'rgba(34, 139, 34, 0.9)', // Primary color for highest values
    'rgba(69, 149, 34, 0.85)',
    'rgba(104, 160, 34, 0.8)',
    'rgba(139, 170, 34, 0.75)',
    'rgba(174, 181, 34, 0.7)',
    'rgba(209, 191, 34, 0.65)',
    'rgba(225, 197, 34, 0.6)',
    'rgba(235, 203, 34, 0.55)',
    'rgba(245, 209, 34, 0.5)',
    'rgba(255, 215, 0, 0.45)'  // Secondary color for lowest values
  ];
  
  // Create chart
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'عدد الموظفين',
        data: values,
        backgroundColor: colorBase,
        borderColor: colorBase.map(color => color.replace(/[\d\.]+\)$/, '1)')),
        borderWidth: 1,
        borderRadius: 5,
        barPercentage: 0.7
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'توزيع الموظفين حسب الدرجات الوظيفية - إجمالي عدد الموظفين: 1783',
          font: {
            size: 16,
            weight: 'bold'
          },
          padding: {
            bottom: 20
          }
        },
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.raw} موظف (${(context.raw / 1783 * 100).toFixed(1)}%)`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              if (value % 100 === 0) return value;
              return '';
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      }
    }
  });
}

// Initialize workforce statistics charts
function initWorkforceCharts() {
  // Chart for qualifications distribution
  initQualificationsChart();
  
  // Chart for age groups distribution
  initAgeGroupsChart();
  
  // Chart for qualifications by age
  initQualificationsByAgeChart();
}

// Chart for qualifications distribution
function initQualificationsChart() {
  const ctx = document.getElementById('qualificationsChart')?.getContext('2d');
  if (!ctx) return;
  
  // Qualifications data
  const labels = [
    'ماجستير',
    'دبلوم عالي',
    'بكالوريوس',
    'دبلوم فني',
    'اعدادية',
    'متوسطة',
    'ابتدائية',
    'يقرأ ويكتب'
  ];
  
  const values = [13, 6, 306, 193, 1017, 57, 243, 12];
  
  // Create colors array
  const colors = [
    'rgba(0, 100, 0, 0.8)',     // Dark green for highest education
    'rgba(34, 139, 34, 0.8)',    // Green for high education
    'rgba(85, 170, 85, 0.8)',    // Light green for bachelor
    'rgba(136, 204, 0, 0.8)',    // Yellowish green for technical
    'rgba(255, 215, 0, 0.8)',    // Gold for high school
    'rgba(255, 165, 0, 0.8)',    // Orange for intermediate
    'rgba(255, 120, 0, 0.8)',    // Dark orange for primary
    'rgba(255, 80, 0, 0.8)'      // Reddish for basic literacy
  ];
  
  // Create the doughnut chart
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: colors,
        borderColor: colors.map(color => color.replace(/[\d\.]+\)$/, '1)')),
        borderWidth: 1,
        hoverOffset: 15
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'توزيع القوى العاملة حسب المؤهلات - المجموع: 1847',
          font: {
            size: 16,
            weight: 'bold'
          },
          padding: {
            bottom: 20
          }
        },
        legend: {
          position: 'right',
          labels: {
            padding: 15,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const value = context.raw;
              const percentage = (value / 1847 * 100).toFixed(1);
              return `${context.label}: ${value} (${percentage}%)`;
            }
          }
        }
      },
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 2000
      }
    }
  });
}

// Chart for age groups distribution
function initAgeGroupsChart() {
  const ctx = document.getElementById('ageGroupsChart')?.getContext('2d');
  if (!ctx) return;
  
  // Age groups data
  const labels = ['21-30', '31-40', '41-50', '51-60', 'أكثر من 60'];
  const values = [35, 123, 677, 972, 40];
  const backgroundColors = [
    'rgba(0, 176, 255, 0.8)',    // Bright blue for youngest
    'rgba(34, 139, 34, 0.8)',     // Green for young
    'rgba(255, 215, 0, 0.8)',     // Gold for middle
    'rgba(255, 140, 0, 0.8)',     // Orange for older
    'rgba(220, 53, 69, 0.8)'      // Red for oldest
  ];
  
  // Create the pie chart
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors.map(color => color.replace(/[\d\.]+\)$/, '1)')),
        borderWidth: 1,
        hoverOffset: 15
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'توزيع القوى العاملة حسب الفئات العمرية - المجموع: 1847',
          font: {
            size: 16,
            weight: 'bold'
          },
          padding: {
            bottom: 20
          }
        },
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const value = context.raw;
              const percentage = (value / 1847 * 100).toFixed(1);
              return `${context.label}: ${value} (${percentage}%)`;
            }
          }
        }
      },
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 2000
      }
    }
  });
}

// Chart for qualifications by age
function initQualificationsByAgeChart() {
  const ctx = document.getElementById('qualificationsByAgeChart')?.getContext('2d');
  if (!ctx) return;
  
  // Data from the table
  const qualificationsData = [
    {qualification: 'ماجستير', ages: [0, 2, 8, 3, 0]},
    {qualification: 'دبلوم عالي', ages: [0, 0, 6, 0, 0]},
    {qualification: 'بكالوريوس', ages: [16, 55, 122, 109, 4]},
    {qualification: 'دبلوم فني', ages: [6, 19, 64, 99, 5]},
    {qualification: 'اعدادية', ages: [7, 17, 377, 601, 15]},
    {qualification: 'متوسطة', ages: [1, 4, 12, 37, 3]},
    {qualification: 'ابتدائية', ages: [5, 24, 80, 121, 13]},
    {qualification: 'يقرأ ويكتب', ages: [0, 2, 8, 2, 0]}
  ];
  
  // Age group labels
  const ageLabels = ['21-30', '31-40', '41-50', '51-60', 'أكثر من 60'];
  
  // Create datasets for the chart
  const datasets = qualificationsData.map((item, index) => {
    // Create a color gradient from green to orange
    const hue = 120 - (index * 15); // 120 is green, going towards orange
    const color = `hsla(${hue}, 70%, 50%, 0.8)`;
    
    return {
      label: item.qualification,
      data: item.ages,
      backgroundColor: color,
      borderColor: color.replace('0.8', '1'),
      borderWidth: 1
    };
  });
  
  // Create the stacked bar chart
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ageLabels,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'توزيع القوى العاملة حسب المؤهلات والفئات العمرية',
          font: {
            size: 16,
            weight: 'bold'
          },
          padding: {
            bottom: 20
          }
        },
        legend: {
          position: 'right',
          labels: {
            padding: 10,
            usePointStyle: true,
            pointStyle: 'rect'
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.raw} موظف`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          stacked: true,
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            callback: function(value) {
              if (value % 100 === 0) return value;
              return '';
            }
          }
        }
      },
      animation: {
        duration: 2000
      }
    }
  });
}

// Initialize beneficiaries chart
function initBeneficiariesChart() {
  const ctx = document.getElementById('beneficiariesChart')?.getContext('2d');
  if (!ctx) return;
  
  // Define the beneficiaries data
  const beneficiaryGroups = [
    {
      name: 'شركاء القطاع العام',
      color: 'rgba(34, 139, 34, 0.8)',
      entities: [
        {name: 'وزارة الكهرباء', value: 35},
        {name: 'وزارة الاتصالات', value: 30},
        {name: 'وزارة التعليم العالي', value: 25},
        {name: 'الوزارات الأخرى', value: 15}
      ]
    },
    {
      name: 'الموردين والمنظمات والنقابات',
      color: 'rgba(255, 165, 0, 0.8)',
      entities: [
        {name: 'الموردين الخارجين', value: 20},
        {name: 'المكاتب الاستشارية والتدريب', value: 18},
        {name: 'جهات منح الشهادات', value: 16},
        {name: 'اتحاد الصناعات العراقي', value: 14},
        {name: 'نقابة المهندسين', value: 12},
        {name: 'خطوط النقل الخاص', value: 10}
      ]
    },
    {
      name: 'الشركاء الدوليين',
      color: 'rgba(70, 130, 180, 0.8)',
      entities: [
        {name: 'شركة KIGG البريطانية', value: 25},
        {name: 'WUHAN VIBERHOME INTERNATIONAL', value: 20}
      ]
    }
  ];
  
  // Prepare data for the chart
  const data = {
    labels: beneficiaryGroups.map(group => group.name),
    datasets: [{
      data: beneficiaryGroups.map(group => 
        group.entities.reduce((sum, entity) => sum + entity.value, 0)
      ),
      backgroundColor: beneficiaryGroups.map(group => group.color),
      borderColor: beneficiaryGroups.map(group => group.color.replace(/[\d\.]+\)$/, '1)')),
      borderWidth: 1,
      hoverOffset: 15
    }]
  };
  
  // Create the main doughnut chart
  const beneficiariesChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            padding: 15,
            usePointStyle: true,
            pointStyle: 'circle',
            font: {
              size: 14
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const groupIndex = context.dataIndex;
              const group = beneficiaryGroups[groupIndex];
              const value = context.raw;
              const percentage = (value / data.datasets[0].data.reduce((a, b) => a + b, 0) * 100).toFixed(1);
              
              let tooltipText = [`${group.name}: ${percentage}%`];
              
              // Add entities to tooltip
              group.entities.forEach(entity => {
                const entityPercentage = (entity.value / value * 100).toFixed(1);
                tooltipText.push(`  • ${entity.name}: ${entityPercentage}%`);
              });
              
              return tooltipText;
            }
          }
        },
        title: {
          display: true,
          text: 'المستفيدون والمعنيّون للشركة',
          font: {
            size: 16,
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 20
          }
        }
      },
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 2000
      }
    }
  });
  
  // Add click handler to show detailed breakdown
  ctx.canvas.onclick = function(evt) {
    const activePoints = beneficiariesChart.getElementsAtEventForMode(
      evt, 
      'nearest', 
      { intersect: true }, 
      false
    );
    
    if (activePoints.length > 0) {
      const clickedIndex = activePoints[0].index;
      const group = beneficiaryGroups[clickedIndex];
      
      // Create a secondary chart showing the breakdown of the clicked segment
      showDetailedBreakdown(group);
    }
  };
  
  // Function to show detailed breakdown
  function showDetailedBreakdown(group) {
    // Clear previous chart if exists
    const existingDetailChart = document.getElementById('beneficiaryDetailChart');
    if (existingDetailChart) {
      existingDetailChart.remove();
    }
    
    // Create a new canvas for the detail chart
    const detailCanvas = document.createElement('canvas');
    detailCanvas.id = 'beneficiaryDetailChart';
    detailCanvas.style.marginTop = '30px';
    detailCanvas.height = 200;
    
    // Add after the main chart
    const chartWrapper = document.querySelector('.beneficiaries-chart-container .chart-wrapper');
    chartWrapper.appendChild(detailCanvas);
    
    // Create the detail chart
    const detailCtx = detailCanvas.getContext('2d');
    new Chart(detailCtx, {
      type: 'bar',
      data: {
        labels: group.entities.map(entity => entity.name),
        datasets: [{
          label: group.name,
          data: group.entities.map(entity => entity.value),
          backgroundColor: group.color,
          borderColor: group.color.replace(/[\d\.]+\)$/, '1)'),
          borderWidth: 1,
          borderRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `تفاصيل ${group.name}`,
            font: {
              size: 16,
              weight: 'bold'
            },
            padding: {
              top: 10,
              bottom: 20
            }
          },
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              font: {
                size: 12
              }
            }
          },
          x: {
            ticks: {
              font: {
                size: 12
              }
            }
          }
        },
        animation: {
          duration: 1000
        }
      }
    });
  }
}

// Initialize product cards with improved gallery interaction
function initProductCards() {
  const productCards = document.querySelectorAll('.product-card');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (!productCards.length || !galleryItems.length) return;
  
  // Handle product card header click
  productCards.forEach(card => {
    const header = card.querySelector('.product-card-header');
    if (!header) return;
    
    header.addEventListener('click', (e) => {
      // Close any other open cards first
      productCards.forEach(otherCard => {
        if (otherCard !== card && otherCard.classList.contains('active')) {
          otherCard.classList.remove('active');
        }
      });
      
      // Toggle this card
      card.classList.toggle('active');
      
      // Update the gallery items
      const cardProduct = card.getAttribute('data-product');
      galleryItems.forEach(item => {
        if (item.getAttribute('data-product') === cardProduct) {
          item.classList.toggle('active', card.classList.contains('active'));
        }
      });
      
      // Smooth scroll to the card if it's not visible
      if (card.classList.contains('active')) {
        const cardRect = card.getBoundingClientRect();
        const isVisible = (
          cardRect.top >= 0 &&
          cardRect.left >= 0 &&
          cardRect.bottom <= window.innerHeight &&
          cardRect.right <= window.innerWidth
        );
        
        if (!isVisible) {
          card.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }
    });
  });
  
  // Handle gallery item click
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const itemProduct = item.getAttribute('data-product');
      
      // Deactivate all items and cards first
      galleryItems.forEach(gi => gi.classList.remove('active'));
      productCards.forEach(pc => pc.classList.remove('active'));
      
      // Activate the clicked item
      item.classList.add('active');
      
      // Find and activate the corresponding product card
      const correspondingCard = Array.from(productCards).find(
        card => card.getAttribute('data-product') === itemProduct
      );
      
      if (correspondingCard) {
        correspondingCard.classList.add('active');
        
        // Scroll to the card
        correspondingCard.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    });
  });
  
  // Add hover animation effects
  productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const cardProduct = card.getAttribute('data-product');
      
      galleryItems.forEach(item => {
        if (item.getAttribute('data-product') === cardProduct && !item.classList.contains('active')) {
          item.classList.add('hover');
        }
      });
    });
    
    card.addEventListener('mouseleave', () => {
      galleryItems.forEach(item => {
        item.classList.remove('hover');
      });
    });
  });
  
  galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const itemProduct = item.getAttribute('data-product');
      
      productCards.forEach(card => {
        if (card.getAttribute('data-product') === itemProduct && !card.classList.contains('active')) {
          card.classList.add('hover');
        }
      });
    });
    
    item.addEventListener('mouseleave', () => {
      productCards.forEach(card => {
        card.classList.remove('hover');
      });
    });
  });
  
  // Activate the first product by default
  if (galleryItems.length > 0 && productCards.length > 0) {
    const firstItem = galleryItems[0];
    const firstItemProduct = firstItem.getAttribute('data-product');
    
    firstItem.classList.add('active');
    
    const firstCard = Array.from(productCards).find(
      card => card.getAttribute('data-product') === firstItemProduct
    );
    
    if (firstCard) {
      firstCard.classList.add('active');
    }
  }
}

// Initialize scrollable cards with improved interaction
function initScrollableCards() {
  const scrollableCards = document.querySelector('.scrollable-cards');
  if (!scrollableCards) return;
  
  const cards = Array.from(scrollableCards.querySelectorAll('.info-card'));
  if (!cards.length) return;
  
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const scrollIndicatorsContainer = document.querySelector('.scroll-indicators');
  
  if (!prevBtn || !nextBtn || !scrollIndicatorsContainer) return;
  
  // Clear any existing indicators
  scrollIndicatorsContainer.innerHTML = '';
  
  // Create indicators based on visible cards
  const cardWidth = cards[0].offsetWidth;
  const containerWidth = scrollableCards.offsetWidth;
  const visibleCards = Math.floor(containerWidth / cardWidth);
  const totalGroups = Math.ceil(cards.length / visibleCards);
  
  // Create indicator dots
  for (let i = 0; i < totalGroups; i++) {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    if (i === 0) indicator.classList.add('active');
    
    indicator.addEventListener('click', () => {
      // Calculate scroll position
      const scrollTo = i * containerWidth;
      scrollableCards.scrollTo({
        left: document.dir === 'rtl' ? -scrollTo : scrollTo,
        behavior: 'smooth'
      });
      
      // Update active indicator
      document.querySelectorAll('.indicator').forEach((ind) => ind.classList.remove('active'));
      indicator.classList.add('active');
    });
    
    scrollIndicatorsContainer.appendChild(indicator);
  }
  
  // Previous button click handler
  prevBtn.addEventListener('click', () => {
    const currentScroll = Math.abs(scrollableCards.scrollLeft);
    const scrollAmount = containerWidth * 0.8; // Scroll 80% of container width
    
    scrollableCards.scrollTo({
      left: document.dir === 'rtl' 
        ? -(currentScroll + scrollAmount) 
        : currentScroll - scrollAmount,
      behavior: 'smooth'
    });
  });
  
  // Next button click handler
  nextBtn.addEventListener('click', () => {
    const currentScroll = Math.abs(scrollableCards.scrollLeft);
    const scrollAmount = containerWidth * 0.8; // Scroll 80% of container width
    
    scrollableCards.scrollTo({
      left: document.dir === 'rtl' 
        ? -(currentScroll - scrollAmount) 
        : currentScroll + scrollAmount,
      behavior: 'smooth'
    });
  });
  
  // Update indicators on scroll
  scrollableCards.addEventListener('scroll', () => {
    updateScrollIndicators();
  });
  
  // Update indicator based on scroll position
  function updateScrollIndicators() {
    const currentScroll = Math.abs(scrollableCards.scrollLeft);
    const maxScroll = scrollableCards.scrollWidth - scrollableCards.offsetWidth;
    const scrollPercentage = currentScroll / maxScroll;
    
    // Calculate which indicator should be active
    const indicatorCount = scrollIndicatorsContainer.querySelectorAll('.indicator').length;
    const activeIndex = Math.min(
      Math.floor(scrollPercentage * indicatorCount),
      indicatorCount - 1
    );
    
    // Update active indicator
    scrollIndicatorsContainer.querySelectorAll('.indicator').forEach((indicator, index) => {
      indicator.classList.toggle('active', index === activeIndex);
    });
    
    // Enable/disable navigation buttons
    if (currentScroll <= 10) {
      prevBtn.classList.add('disabled');
    } else {
      prevBtn.classList.remove('disabled');
    }
    
    if (currentScroll >= maxScroll - 10) {
      nextBtn.classList.add('disabled');
    } else {
      nextBtn.classList.remove('disabled');
    }
  }
  
  // Add touch swiping capability
  let startX, startScrollLeft, isDown = false;
  
  scrollableCards.addEventListener('mousedown', (e) => {
    isDown = true;
    scrollableCards.style.cursor = 'grabbing';
    startX = e.pageX - scrollableCards.offsetLeft;
    startScrollLeft = scrollableCards.scrollLeft;
    e.preventDefault();
  });
  
  scrollableCards.addEventListener('mouseleave', () => {
    isDown = false;
    scrollableCards.style.cursor = 'grab';
  });
  
  scrollableCards.addEventListener('mouseup', () => {
    isDown = false;
    scrollableCards.style.cursor = 'grab';
  });
  
  scrollableCards.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const x = e.pageX - scrollableCards.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollableCards.scrollLeft = startScrollLeft - walk;
    e.preventDefault();
  });
  
  // Handle window resize
  window.addEventListener('resize', () => {
    // Recalculate card widths and indicators
    setTimeout(() => {
      const cardWidth = cards[0].offsetWidth;
      const containerWidth = scrollableCards.offsetWidth;
      const visibleCards = Math.floor(containerWidth / cardWidth);
      const totalGroups = Math.ceil(cards.length / visibleCards);
      
      // Clear and recreate indicators if necessary
      if (totalGroups !== scrollIndicatorsContainer.querySelectorAll('.indicator').length) {
        scrollIndicatorsContainer.innerHTML = '';
        
        for (let i = 0; i < totalGroups; i++) {
          const indicator = document.createElement('div');
          indicator.classList.add('indicator');
          if (i === 0) indicator.classList.add('active');
          
          indicator.addEventListener('click', () => {
            const scrollTo = i * containerWidth;
            scrollableCards.scrollTo({
              left: document.dir === 'rtl' ? -scrollTo : scrollTo,
              behavior: 'smooth'
            });
            
            document.querySelectorAll('.indicator').forEach((ind) => ind.classList.remove('active'));
            indicator.classList.add('active');
          });
          
          scrollIndicatorsContainer.appendChild(indicator);
        }
      }
      
      updateScrollIndicators();
    }, 200); // Small delay to ensure layout is complete
  });
  
  // Initialize
  scrollableCards.style.cursor = 'grab';
  updateScrollIndicators();
}

// Initialize services location section
function initServicesLocationSection() {
  const scrollContainer = document.querySelector('.scrollable-cards');
  const nextButton = document.querySelector('.next-btn');
  const prevButton = document.querySelector('.prev-btn');
  const indicators = document.querySelectorAll('.indicator');
  const cards = document.querySelectorAll('.info-card');
  
  if (!scrollContainer) return;
  
  // Initialize first indicator as active
  if (indicators.length) {
    indicators[0].classList.add('active');
  }
  
  // Scroll to next/previous card
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      const cardWidth = cards[0].offsetWidth + 20; // Card width + gap
      scrollContainer.scrollBy({ left: cardWidth, behavior: 'smooth' });
      updateIndicators();
    });
  }
  
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      const cardWidth = cards[0].offsetWidth + 20; // Card width + gap
      scrollContainer.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      updateIndicators();
    });
  }
  
  // Click on indicators to jump to card
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      const cardWidth = cards[0].offsetWidth + 20; // Card width + gap
      scrollContainer.scrollTo({ 
        left: index * cardWidth, 
        behavior: 'smooth' 
      });
      updateIndicators(index);
    });
  });
  
  // Update active indicator based on scroll position
  function updateIndicators(activeIndex = null) {
    if (!indicators.length) return;
    
    if (activeIndex === null) {
      const scrollPosition = scrollContainer.scrollLeft;
      const cardWidth = cards[0].offsetWidth + 20;
      activeIndex = Math.round(scrollPosition / cardWidth);
    }
    
    indicators.forEach((indicator, index) => {
      if (index === activeIndex) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }
  
  // Update indicators on scroll
  scrollContainer.addEventListener('scroll', () => {
    updateIndicators();
  });
}

// Initialize mobile menu
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  if (mobileMenuBtn && navbarCollapse) {
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
      navbarCollapse.classList.toggle('show');
      document.body.classList.toggle('menu-open');
      
      // Toggle hamburger icon animation
      const spans = this.querySelectorAll('span');
      if (spans.length > 2) {
        this.classList.toggle('active');
        if (this.classList.contains('active')) {
          spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      }
    });
    
    // Handle dropdown toggles in mobile view
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        if (window.innerWidth <= 991) {
          e.preventDefault();
          const parent = this.closest('.dropdown') || this.closest('.nav-item');
          parent.classList.toggle('active');
          
          // Close other open dropdowns
          dropdownToggles.forEach(otherToggle => {
            const otherParent = otherToggle.closest('.dropdown') || otherToggle.closest('.nav-item');
            if (otherParent !== parent && otherParent.classList.contains('active')) {
              otherParent.classList.remove('active');
            }
          });
        }
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileMenuBtn.contains(e.target) && !navbarCollapse.contains(e.target) && navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
        mobileMenuBtn.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        // Close all dropdowns
        const dropdowns = document.querySelectorAll('.nav-item.active, .dropdown.active');
        dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (spans.length > 2) {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      }
    });
    
    // Close menu when nav links (not dropdowns) are clicked
    navLinks.forEach(link => {
      if (!link.classList.contains('dropdown-toggle')) {
        link.addEventListener('click', function() {
          navbarCollapse.classList.remove('show');
          mobileMenuBtn.classList.remove('active');
          document.body.classList.remove('menu-open');
          
          const spans = mobileMenuBtn.querySelectorAll('span');
          if (spans.length > 2) {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
          }
        });
      }
    });
  }
}

// Mobile Menu Toggle - combining both implementations
document.addEventListener('DOMContentLoaded', function() {
    // Call our new mobile menu initialization
    initMobileMenu();
    
    // Initialize scrollable cards
    initScrollableCards();
    
    // Adjust mind map scale on resize
    const mindMap = document.querySelector('.mind-map');
    if (mindMap) {
        function adjustMindMapScale() {
            if (window.innerWidth <= 600) {
                mindMap.style.transform = 'scale(0.7)';
            } else if (window.innerWidth <= 1279) {
                mindMap.style.transform = 'scale(0.85)';
            } else {
                mindMap.style.transform = 'scale(1)';
            }
        }
        
        // Initial adjustment
        adjustMindMapScale();
        
        // Adjust on resize
        window.addEventListener('resize', adjustMindMapScale);
    }
    
    // Make tables responsive
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('responsive-table');
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });
});

// Debounce function to limit the rate at which a function can fire
function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

// Organization Section Tabs
document.addEventListener('DOMContentLoaded', function() {
  const tabItems = document.querySelectorAll('.tab-item');
  
  tabItems.forEach(item => {
    item.addEventListener('click', function() {
      // Remove active class from all tabs
      tabItems.forEach(tab => tab.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Get the tab to show
      const tabToShow = this.getAttribute('data-tab');
      
      // Hide all tab panes
      const tabPanes = document.querySelectorAll('.tab-pane');
      tabPanes.forEach(pane => pane.classList.remove('active'));
      
      // Show the selected tab pane
      document.getElementById(tabToShow).classList.add('active');
    });
  });
});

// Results Section Tabs
document.addEventListener('DOMContentLoaded', function() {
  const resultsTabs = document.querySelectorAll('.results-tab');
  
  if (resultsTabs.length > 0) {
    resultsTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs
        resultsTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Get the section to show
        const sectionToShow = this.getAttribute('data-section');
        
        // Hide all panes
        const resultsPanes = document.querySelectorAll('.results-pane');
        resultsPanes.forEach(pane => pane.classList.remove('active'));
        
        // Show the selected pane
        document.getElementById(`${sectionToShow}-pane`).classList.add('active');
      });
    });
    
    // Initialize all charts for results section
    initResultsCharts();
  }
});

// Initialize all charts for the results section
function initResultsCharts() {
  // Initialize charts for beneficiaries results
  initStakeholderSatisfactionChart();
  initProductPriceChart();
  initDefectiveTransformersChart();
  initExternalProvidersChart();
  
  // Initialize charts for general performance results
  initNoncomplianceCasesChart();
  initFinancialOutputsChart();
  initSalesAchievedChart();
  
  // Initialize charts for HR results
  initJobSatisfactionChart();
  initJobSatisfactionComparisonChart();
  initWorkEnvironmentChart();
}

// رضا الأطراف المعنية - Stakeholder Satisfaction Chart
function initStakeholderSatisfactionChart() {
  const ctx = document.getElementById('stakeholderSatisfactionChart')?.getContext('2d');
  if (!ctx) return;
  
  const labels = [
    'جودة الخدمة', 
    'سهولة الإجراءات', 
    'سمعة المؤسسة', 
    'المشاركة', 
    'رأي الشركات', 
    'الشكاوي'
  ];
  
  const data = [64, 62, 62, 55, 52, 60];
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'نسبة رضا الأطراف المعنية (%)',
        data: data,
        backgroundColor: [
          'rgba(34, 139, 34, 0.8)',
          'rgba(34, 139, 34, 0.7)',
          'rgba(34, 139, 34, 0.6)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(255, 206, 86, 0.6)'
        ],
        borderColor: [
          'rgba(34, 139, 34, 1)',
          'rgba(34, 139, 34, 1)',
          'rgba(34, 139, 34, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1,
        borderRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.parsed.x}%`;
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        },
        y: {
          grid: {
            display: false
          }
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      }
    }
  });
}

// استبيان سعر المنتج - Product Price Survey Chart
function initProductPriceChart() {
  const ctx = document.getElementById('productPriceChart')?.getContext('2d');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2022', '2023', '2024'],
      datasets: [
        {
          label: 'مناسب',
          data: [75, 57, 100],
          backgroundColor: 'rgba(34, 139, 34, 0.7)',
          borderColor: 'rgba(34, 139, 34, 1)',
          borderWidth: 1,
          borderRadius: 5
        },
        {
          label: 'غير مناسب',
          data: [25, 43, 0],
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          borderRadius: 5
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          align: 'center',
          labels: {
            padding: 15,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.parsed.y}%`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      }
    }
  });
}

// نسبة المحولات العاطلة - Defective Transformers Chart
function initDefectiveTransformersChart() {
  const ctx = document.getElementById('defectiveTransformersChart')?.getContext('2d');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2022', '2023', '2024'],
      datasets: [{
        label: 'نسبة المحولات العاطلة',
        data: [0.01, 0.01, 0.02],
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 3,
        tension: 0.3,
        pointBackgroundColor: '#fff',
        pointBorderColor: 'rgba(255, 99, 132, 1)',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `نسبة المحولات العاطلة: ${context.parsed.y}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return value.toFixed(2);
            }
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      }
    }
  });
}

// تقييم مقدمي المنتجات والخدمات الخارجيين - External Providers Evaluation Chart
function initExternalProvidersChart() {
  const ctx = document.getElementById('externalProvidersChart')?.getContext('2d');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['شركة السور العظيم', 'شركة بوابة الطاقة', 'شركة ارض نجم العرب'],
      datasets: [{
        data: [96, 96, 95],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(255, 205, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1,
        borderRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `تقييم: ${context.parsed.y}%`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      }
    }
  });
}

// حالات عدم المطابقة - Noncompliance Cases Chart
function initNoncomplianceCasesChart() {
  const ctx = document.getElementById('noncomplianceCasesChart')?.getContext('2d');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2022', '2023', '2024'],
      datasets: [{
        label: 'نسبة حالات عدم المطابقة التي تم تجاوزها',
        data: [0.7, 0.7, 0],
        backgroundColor: [
          'rgba(255, 159, 64, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(34, 139, 34, 0.8)'
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(34, 139, 34, 1)'
        ],
        borderWidth: 1,
        borderRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `نسبة الحالات: ${context.parsed.y}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 1,
          ticks: {
            callback: function(value) {
              return value.toFixed(1);
            }
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      }
    }
  });
}

// المخرجات المالية - Financial Outputs Chart
function initFinancialOutputsChart() {
  const ctx = document.getElementById('financialOutputsChart')?.getContext('2d');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2022', '2023', '2024'],
      datasets: [
        {
          label: 'التكاليف',
          data: [64318, 120153, 129753],
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          borderRadius: 5,
          order: 2
        },
        {
          label: 'العوائد',
          data: [57053, 131625, 141814],
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          borderRadius: 5,
          order: 1
        },
        {
          label: 'المبيعات (مليار دينار)',
          data: [47.5, 41.5, 36.8],
          type: 'line',
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 3,
          pointBackgroundColor: '#fff',
          pointBorderColor: 'rgba(75, 192, 192, 1)',
          pointBorderWidth: 2,
          pointRadius: 5,
          fill: false,
          tension: 0.3,
          order: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              if (context.dataset.label === 'المبيعات (مليار دينار)') {
                return `${context.dataset.label}: ${context.parsed.y} مليار دينار`;
              }
              return `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return value.toLocaleString();
            }
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      }
    }
  });
}

// المبيعات المتحققة - Sales Achieved Chart
function initSalesAchievedChart() {
  const ctx = document.getElementById('salesAchievedChart')?.getContext('2d');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2022', '2023', '2024'],
      datasets: [{
        label: 'المبيعات المتحققة (مليار دينار)',
        data: [47.5, 41.5, 36.8],
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(54, 162, 235, 0.8)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1,
        borderRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.parsed.x} مليار دينار`;
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return value + ' مليار';
            }
          }
        },
        y: {
          grid: {
            display: false
          }
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      }
    }
  });
}

// المعدل العام لاستبيان الرضى الوظيفي - Job Satisfaction Survey Chart
function initJobSatisfactionChart() {
  const ctx = document.getElementById('jobSatisfactionChart')?.getContext('2d');
  if (!ctx) return;
  
  const labels = [
    'التواصل',
    'الولاء والانتماء الوظيفي',
    'التمكين',
    'السلوك الترقيعي',
    'الاستقلال الوظيفي',
    'الجانب المعنوي',
    'التطوير والتنمية',
    'الصحة والسلامة المهنية',
    'التخطيط الاستراتيجي',
    'القيادة'
  ];
  
  const data = [83, 82, 80, 80, 79, 79, 79, 78, 75, 75];
  
  // Define colors based on value ranges
  const getColor = (value) => {
    if (value >= 82) return 'rgba(34, 139, 34, 0.8)';         // Green for highest
    if (value >= 80) return 'rgba(152, 251, 152, 0.8)';       // Light green
    if (value >= 79) return 'rgba(255, 159, 64, 0.8)';        // Orange
    if (value >= 78) return 'rgba(54, 162, 235, 0.8)';        // Blue
    return 'rgba(255, 99, 132, 0.8)';                         // Red for lowest
  };
  
  const colors = data.map(value => getColor(value));
  const borderColors = colors.map(color => color.replace('0.8', '1'));
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'نسبة الرضا',
        data: data,
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 1,
        borderRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.parsed.x}%`;
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        },
        y: {
          grid: {
            display: false
          }
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      }
    }
  });
}

// مقارنة معدل الرضا الوظيفي - Job Satisfaction Comparison Chart
function initJobSatisfactionComparisonChart() {
  const ctx = document.getElementById('jobSatisfactionComparisonChart')?.getContext('2d');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2023', '2024'],
      datasets: [{
        label: 'معدل الرضا الوظيفي',
        data: [80.8, 79],
        backgroundColor: [
          'rgba(34, 139, 34, 0.8)',
          'rgba(255, 159, 64, 0.8)'
        ],
        borderColor: [
          'rgba(34, 139, 34, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
        borderRadius: 10
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.parsed.y}%`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      }
    }
  });
}

// الصحة والسلامة المهنية والبيئية - Work Environment Chart
function initWorkEnvironmentChart() {
  const ctx = document.getElementById('workEnvironmentChart')?.getContext('2d');
  if (!ctx) return;
  
  // Categories and percentages
  const categories = [
    'معرفتك جيدة بالتعليمات الخاصة بالسلامة والصحة المهنية والبيئة في مؤسستك',
    'عمليات الإخلاء في مؤسستك أسهمت في نشر الوعي بتعليمات السلامة والصحة المهنية',
    'بيئة عملك (المكتب - التهوية - الإضاءة - ... الخ) جيدة',
    'لمنسقي السلامة والصحة المهنية والبيئة في دائرتك دور في الإبلاغ عن مخاطر العمل ونشر الوعي',
    'يلتزم موظفو مؤسستك بشروط السلامة والصحة المهنية والبيئة',
    'يفي صندوق الإسعافات الأولية في مؤسستك بالحاجات الضرورية'
  ];
  
  const satisfactionLevels = [
    // [راضي جداً, راضي إلى حد ما, محايد, غير راضي إلى حد ما, غير راضي]
    [48, 40, 5, 4, 3],
    [44, 30, 18, 4, 4],
    [39, 35, 16, 8, 2],
    [36, 42, 18, 1, 3],
    [31, 37, 19, 9, 4],
    [20, 28, 30, 13, 9]
  ];
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: categories,
      datasets: [
        {
          label: 'راضي جداً',
          data: satisfactionLevels.map(level => level[0]),
          backgroundColor: 'rgba(34, 139, 34, 0.8)',
          borderColor: 'rgba(34, 139, 34, 1)',
          borderWidth: 1
        },
        {
          label: 'راضي إلى حد ما',
          data: satisfactionLevels.map(level => level[1]),
          backgroundColor: 'rgba(152, 251, 152, 0.8)',
          borderColor: 'rgba(152, 251, 152, 1)',
          borderWidth: 1
        },
        {
          label: 'محايد',
          data: satisfactionLevels.map(level => level[2]),
          backgroundColor: 'rgba(255, 205, 86, 0.8)',
          borderColor: 'rgba(255, 205, 86, 1)',
          borderWidth: 1
        },
        {
          label: 'غير راضي إلى حد ما',
          data: satisfactionLevels.map(level => level[3]),
          backgroundColor: 'rgba(255, 159, 64, 0.8)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1
        },
        {
          label: 'غير راضي',
          data: satisfactionLevels.map(level => level[4]),
          backgroundColor: 'rgba(255, 99, 132, 0.8)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        title: {
          display: true,
          text: 'الصحة والسلامة المهنية والبيئية (%)',
          font: {
            size: 16,
            weight: 'bold'
          },
          padding: {
            bottom: 20
          }
        },
        legend: {
          position: 'top',
          align: 'center',
          labels: {
            padding: 15,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.parsed.x}%`;
            }
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        },
        y: {
          stacked: true,
          grid: {
            display: false
          }
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      }
    }
  });
}

// Back to top button functionality
function initBackToTopButton() {
  const backToTopButton = document.getElementById('back-to-top');
  if (!backToTopButton) return;
  
  // Show button when scrolled down 300px
  function toggleBackToTopButton() {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  }
  
  // Scroll back to top when clicked
  backToTopButton.addEventListener('click', function(e) {
    // Only scroll to top if clicked on the button itself, not its children
    if (e.target === backToTopButton || e.target.closest('.back-to-top') && !e.target.closest('.sections-dropdown')) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  });
  
  // Add click handlers for section links
  const sectionLinks = backToTopButton.querySelectorAll('.section-link');
  sectionLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Listen for scroll events
  window.addEventListener('scroll', toggleBackToTopButton);
  
  // Initial check in case page was refreshed while scrolled down
  toggleBackToTopButton();
}

// Organizational Chart Functionality
function initOrgChart() {
  const orgChart = document.querySelector('.org-chart');
  const zoomInBtn = document.querySelector('.org-zoom-in');
  const zoomOutBtn = document.querySelector('.org-zoom-out');
  const resetBtn = document.querySelector('.org-reset');
  
  if (!orgChart || !zoomInBtn || !zoomOutBtn || !resetBtn) return;
  
  let scale = 1;
  let panning = false;
  let pointX = 0;
  let pointY = 0;
  let startX = 0;
  let startY = 0;
  
  // Add sub-department count badges
  function addSubDeptBadges() {
    const departmentCards = document.querySelectorAll('.org-card.department');
    
    departmentCards.forEach(card => {
      // Remove any existing badges first
      const existingBadge = card.querySelector('.subdept-badge');
      if (existingBadge) {
        existingBadge.remove();
      }
      
      // Get sub-departments
      const subDepts = card.querySelector('.org-sub-dept');
      if (subDepts) {
        const subDeptCount = subDepts.querySelectorAll('span').length;
        
        // Create badge element
        if (subDeptCount > 0) {
          const badge = document.createElement('div');
          badge.className = 'subdept-badge';
          badge.textContent = subDeptCount;
          
          // Add badge to card
          card.appendChild(badge);
        }
      }
    });
  }
  
  // Add connector lines dynamically
  function addConnectorLines() {
    const connectors = document.querySelector('.org-connectors');
    if (!connectors) return;
    
    // Clear existing connectors
    connectors.innerHTML = '';
    
    // Add vertical line from executive to level 2
    const executive = document.querySelector('.level-1 .org-card');
    const level2 = document.querySelector('.level-2');
    
    if (executive && level2) {
      const execRect = executive.getBoundingClientRect();
      const level2Rect = level2.getBoundingClientRect();
      
      const verticalLine = document.createElement('div');
      verticalLine.className = 'connector-line vertical';
      verticalLine.style.top = (execRect.bottom - connectors.getBoundingClientRect().top) + 'px';
      verticalLine.style.left = (execRect.left + execRect.width / 2 - connectors.getBoundingClientRect().left) + 'px';
      verticalLine.style.height = (level2Rect.top - execRect.bottom) + 'px';
      
      connectors.appendChild(verticalLine);
    }
    
    // Add horizontal line in level 2
    const level2Cards = document.querySelectorAll('.level-2 .org-card');
    if (level2Cards.length > 1) {
      const firstCard = level2Cards[0];
      const lastCard = level2Cards[level2Cards.length - 1];
      
      const firstRect = firstCard.getBoundingClientRect();
      const lastRect = lastCard.getBoundingClientRect();
      
      const horizontalLine = document.createElement('div');
      horizontalLine.className = 'connector-line horizontal';
      horizontalLine.style.top = (firstRect.top + firstRect.height / 2 - connectors.getBoundingClientRect().top) + 'px';
      horizontalLine.style.left = (firstRect.left + firstRect.width / 2 - connectors.getBoundingClientRect().left) + 'px';
      horizontalLine.style.width = (lastRect.left + lastRect.width / 2 - firstRect.left - firstRect.width / 2) + 'px';
      
      connectors.appendChild(horizontalLine);
    }
    
    // Add vertical lines from level 2 to level 3
    const level3 = document.querySelector('.level-3');
    if (level2 && level3) {
      const level2Rect = level2.getBoundingClientRect();
      const level3Rect = level3.getBoundingClientRect();
      
      const verticalLine = document.createElement('div');
      verticalLine.className = 'connector-line vertical';
      verticalLine.style.top = (level2Rect.bottom - connectors.getBoundingClientRect().top) + 'px';
      verticalLine.style.left = '50%';
      verticalLine.style.height = (level3Rect.top - level2Rect.bottom) + 'px';
      
      connectors.appendChild(verticalLine);
    }
  }
  
  // Zoom functionality
  zoomInBtn.addEventListener('click', function() {
    if (scale < 2) { // Max zoom
      scale += 0.1;
      orgChart.style.transform = `scale(${scale})`;
    }
  });
  
  zoomOutBtn.addEventListener('click', function() {
    if (scale > 0.5) { // Min zoom
      scale -= 0.1;
      orgChart.style.transform = `scale(${scale})`;
    }
  });
  
  resetBtn.addEventListener('click', function() {
    scale = 1;
    orgChart.style.transform = 'scale(1)';
    orgChart.style.left = '0';
    orgChart.style.top = '0';
  });
  
  // Panning functionality
  orgChart.addEventListener('mousedown', function(e) {
    if (e.target.closest('.org-card.department')) return; // Don't start panning when clicking departments
    
    e.preventDefault();
    panning = true;
    startX = e.clientX - pointX;
    startY = e.clientY - pointY;
    orgChart.style.cursor = 'grabbing';
  });
  
  document.addEventListener('mousemove', function(e) {
    if (!panning) return;
    
    pointX = e.clientX - startX;
    pointY = e.clientY - startY;
    
    orgChart.style.left = pointX + 'px';
    orgChart.style.top = pointY + 'px';
  });
  
  document.addEventListener('mouseup', function() {
    panning = false;
    orgChart.style.cursor = 'grab';
  });
  
  // Make cards interactive with expandable sections
  const departmentCards = document.querySelectorAll('.org-card.department');
  departmentCards.forEach(card => {
    // Only make cards with sub-departments clickable
    if (card.querySelector('.org-sub-dept')) {
      card.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent panning when clicking departments
        
        // Close other cards
        departmentCards.forEach(otherCard => {
          if (otherCard !== card) {
            otherCard.classList.remove('active');
          }
        });
        
        // Toggle current card
        this.classList.toggle('active');
      });
    }
  });
  
  // Handle touch events
  if ('ontouchstart' in window) {
    const touchHandler = function(card) {
      card.addEventListener('touchend', function(e) {
        if (card.querySelector('.org-sub-dept')) {
          e.preventDefault();
          e.stopPropagation();
          
          // Close other cards
          departmentCards.forEach(otherCard => {
            if (otherCard !== card) {
              otherCard.classList.remove('active');
            }
          });
          
          // Toggle current card
          this.classList.toggle('active');
        }
      });
    };
    
    departmentCards.forEach(touchHandler);
  }
  
  // Initial calls
  window.addEventListener('load', function() {
    addConnectorLines();
    addSubDeptBadges();
  });
  
  window.addEventListener('resize', debounce(function() {
    addConnectorLines();
    addSubDeptBadges();
  }, 250));
  
  // Call immediately in case the DOM is already loaded
  addSubDeptBadges();
}

// Initialize Performance Indicators Charts
function initPerformanceIndicatorsCharts() {
  // 1. التأثير البيئي: مقارنة نسبة المياه الصناعية المعالجة
  const treatedWaterCtx = document.getElementById('treatedWaterChart');
  if (treatedWaterCtx) {
    new Chart(treatedWaterCtx, {
      type: 'bar',
      data: {
        labels: ['2024', '2023'],
        datasets: [{
          label: 'المياه الصناعية المعالجة م3/يوم',
          data: [1000, 1000],
          backgroundColor: [
            'rgba(75, 192, 192, 0.8)',
            'rgba(75, 192, 192, 0.8)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 1200
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'مقارنة نسبة المياه الصناعية المعالجة م3/يوم'
          }
        }
      }
    });
  }

  // 2. بيئة العمل: مقارنة شراء الشتلات
  const plantPurchaseCtx = document.getElementById('plantPurchaseChart');
  if (plantPurchaseCtx) {
    new Chart(plantPurchaseCtx, {
      type: 'bar',
      data: {
        labels: ['2024', '2023', '2022'],
        datasets: [{
          label: 'عدد الشتلات',
          data: [300, 200, 100],
          backgroundColor: [
            'rgba(255, 159, 64, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(255, 159, 64, 0.8)'
          ],
          borderColor: [
            'rgba(255, 159, 64, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 350
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'مقارنة شراء الشتلات'
          }
        }
      }
    });
  }

  // 3. مؤشر السلامة المهنية والصحية: الفحص الدوري للعاملين
  const periodicCheckupCtx = document.getElementById('periodicCheckupChart');
  if (periodicCheckupCtx) {
    new Chart(periodicCheckupCtx, {
      type: 'bar',
      data: {
        labels: ['2024', '2023'],
        datasets: [{
          label: 'عدد الفحوصات',
          data: [242, 174],
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(255, 99, 132, 0.8)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 300
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'الفحص الدوري للعاملين في الشركة'
          }
        }
      }
    });
  }

  // 4. مؤشر السلامة المهنية والصحية: توفير معدات السلامة
  const safetyEquipmentCtx = document.getElementById('safetyEquipmentChart');
  if (safetyEquipmentCtx) {
    new Chart(safetyEquipmentCtx, {
      type: 'doughnut',
      data: {
        labels: ['خوذة رأس', 'أحذية أمان', 'كفوف', 'بدلات عمل'],
        datasets: [{
          label: 'توزيع معدات السلامة',
          data: [400, 400, 750, 350],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'توزيع معدات السلامة'
          }
        }
      }
    });
  }

  // 5. الأنشطة البيئية والاقتصادية والاجتماعية: مقارنة السلات الغذائية
  const foodBasketsCtx = document.getElementById('foodBasketsChart');
  if (foodBasketsCtx) {
    new Chart(foodBasketsCtx, {
      type: 'bar',
      data: {
        labels: ['2024', '2023'],
        datasets: [{
          label: 'عدد السلات الغذائية',
          data: [250, 250],
          backgroundColor: [
            'rgba(220, 53, 69, 0.8)',
            'rgba(220, 53, 69, 0.8)'
          ],
          borderColor: [
            'rgba(220, 53, 69, 1)',
            'rgba(220, 53, 69, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 300
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'مقارنة السلات الغذائية'
          }
        }
      }
    });
  }

  // 6. الالتزام بالتشريعات والحوكمة المؤسسية: الأنظمة الإلكترونية
  const electronicSystemsCtx = document.getElementById('electronicSystemsChart');
  if (electronicSystemsCtx) {
    new Chart(electronicSystemsCtx, {
      type: 'bar',
      data: {
        labels: ['حركة الدفع', 'نظام التراسل'],
        datasets: [{
          label: 'الأنظمة الإلكترونية',
          data: [715, 80],
          backgroundColor: [
            'rgba(220, 53, 69, 0.8)',
            'rgba(220, 53, 69, 0.8)'
          ],
          borderColor: [
            'rgba(220, 53, 69, 1)',
            'rgba(220, 53, 69, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 800
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'الأنظمة الإلكترونية'
          }
        }
      }
    });
  }

  // 7. بيئة العمل: مقارنة المبالغ المصروفة لشراء مواد الصيانة والأثاث
  const maintenanceExpensesCtx = document.getElementById('maintenanceExpensesChart');
  if (maintenanceExpensesCtx) {
    new Chart(maintenanceExpensesCtx, {
      type: 'pie',
      data: {
        labels: ['صيانة 2023', 'صيانة 2024', 'أثاث 2023', 'أثاث 2024'],
        datasets: [{
          label: 'المبالغ (مليون دينار)',
          data: [101, 107, 85, 179],
          backgroundColor: [
            'rgba(220, 53, 69, 0.7)',
            'rgba(111, 66, 193, 0.7)',
            'rgba(255, 193, 7, 0.7)',
            'rgba(111, 45, 168, 0.7)'
          ],
          borderColor: [
            'rgba(220, 53, 69, 1)',
            'rgba(111, 66, 193, 1)',
            'rgba(255, 193, 7, 1)',
            'rgba(111, 45, 168, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'المبالغ المصروفة للصيانة والأثاث (مليون دينار)'
          }
        }
      }
    });
  }

  // 8. أنشطة بيئية واقتصادية واجتماعية: المساعدات المالية للموظفين
  const financialAssistanceCtx = document.getElementById('financialAssistanceChart');
  if (financialAssistanceCtx) {
    new Chart(financialAssistanceCtx, {
      type: 'bar',
      data: {
        labels: ['2024', '2023', '2022'],
        datasets: [{
          label: 'المساعدات المالية (مليون دينار)',
          data: [142, 144, 130],
          backgroundColor: [
            'rgba(255, 159, 64, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(255, 159, 64, 0.8)'
          ],
          borderColor: [
            'rgba(255, 159, 64, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 160
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'المساعدات المالية للموظفين (مليون دينار)'
          }
        }
      }
    });
  }

  // 9. الرأي العام: الجوائز وكتب الشكر والتقدير
  const awardsCtx = document.getElementById('awardsChart');
  if (awardsCtx) {
    new Chart(awardsCtx, {
      type: 'bar',
      data: {
        labels: ['2024', '2023', '2022'],
        datasets: [
          {
            label: 'الجوائز',
            data: [3, 0, 0],
            backgroundColor: 'rgba(40, 167, 69, 0.8)',
            borderColor: 'rgba(40, 167, 69, 1)',
            borderWidth: 1
          },
          {
            label: 'كتب الشكر',
            data: [16, 12, 10],
            backgroundColor: 'rgba(255, 193, 7, 0.8)',
            borderColor: 'rgba(255, 193, 7, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 18
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'الجوائز وكتب الشكر والتقدير'
          }
        }
      }
    });
  }

  // 10. التأثير المؤسسي: الزيارات والتدريب لطلبة الجامعات والمعاهد
  const universityVisitsCtx = document.getElementById('universityVisitsChart');
  if (universityVisitsCtx) {
    new Chart(universityVisitsCtx, {
      type: 'bar',
      data: {
        labels: ['كلية الرافدين', 'معهد', 'علوم', 'هندسة'],
        datasets: [
          {
            label: 'الزيارات',
            data: [1, 15, 2, 2],
            backgroundColor: 'rgba(0, 123, 255, 0.8)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1
          },
          {
            label: 'التدريب',
            data: [0, 10, 6, 7],
            backgroundColor: 'rgba(108, 117, 125, 0.8)',
            borderColor: 'rgba(108, 117, 125, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 16
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'الزيارات والتدريب لطلبة الجامعات والمعاهد'
          }
        }
      }
    });
  }

  // 11. مقابلات السيد المدير العام
  const managerMeetingsCtx = document.getElementById('managerMeetingsChart');
  if (managerMeetingsCtx) {
    new Chart(managerMeetingsCtx, {
      type: 'bar',
      data: {
        labels: ['2024', '2023', '2022'],
        datasets: [{
          label: 'عدد المقابلات',
          data: [130, 119, 110],
          backgroundColor: [
            'rgba(220, 53, 69, 0.8)',
            'rgba(220, 53, 69, 0.8)',
            'rgba(220, 53, 69, 0.8)'
          ],
          borderColor: [
            'rgba(220, 53, 69, 1)',
            'rgba(220, 53, 69, 1)',
            'rgba(220, 53, 69, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 140
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'مقابلات السيد المدير العام مع الموظفين والمواطنين'
          }
        }
      }
    });
  }

  // 12. إحصائيات توزيع معدات السلامة للعاملين
  const safetyEquipmentDistributionCtx = document.getElementById('safetyEquipmentDistributionChart');
  if (safetyEquipmentDistributionCtx) {
    new Chart(safetyEquipmentDistributionCtx, {
      type: 'bar',
      data: {
        labels: ['الإنتاج', 'الصيانة', 'التسويق'],
        datasets: [
          {
            label: 'بدلة عمل',
            data: [350, 40, 10],
            backgroundColor: 'rgba(0, 123, 255, 0.7)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1
          },
          {
            label: 'حذاء سيفتي',
            data: [350, 40, 10],
            backgroundColor: 'rgba(220, 53, 69, 0.7)',
            borderColor: 'rgba(220, 53, 69, 1)',
            borderWidth: 1
          },
          {
            label: 'كفوف',
            data: [650, 80, 20],
            backgroundColor: 'rgba(40, 167, 69, 0.7)',
            borderColor: 'rgba(40, 167, 69, 1)',
            borderWidth: 1
          },
          {
            label: 'صدرية نسائية',
            data: [10, 0, 5],
            backgroundColor: 'rgba(111, 66, 193, 0.7)',
            borderColor: 'rgba(111, 66, 193, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 700
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'توزيع معدات السلامة للعاملين حسب القسم'
          }
        }
      }
    });
  }
}

// Call the function to initialize the performance indicators charts when document is loaded
document.addEventListener('DOMContentLoaded', function() {
  // ... existing initialization code ...
  
  // Initialize the performance indicators charts
  initPerformanceIndicatorsCharts();
});
