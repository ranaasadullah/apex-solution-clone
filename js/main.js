
var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- 1. Navbar mein current page highlight karna ----------
var currentPage = location.pathname.split('/').pop();  
if (currentPage === '') {
  currentPage = 'index.html';
}
var navLinks = document.querySelectorAll('nav a');
for (var i = 0; i < navLinks.length; i++) {
  if (navLinks[i].getAttribute('href') === currentPage) {
    navLinks[i].setAttribute('aria-current', 'page');
  }
}

// ---------- 2. Responsive menu (hamburger button) ----------
var menuBtn = document.getElementById('menu');
var nav = document.querySelector('nav');

menuBtn.addEventListener('click', function () {
  nav.classList.toggle('open');         
  if (nav.classList.contains('open')) {
    menuBtn.setAttribute('aria-expanded', 'true');
  } else {
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});

// ---------- 3. Dark mode ----------
var themeBtn = document.getElementById('theme');
var root = document.documentElement;    

function updateIcon() {
  if (root.dataset.theme === 'dark') {
    themeBtn.textContent = '☀';
  } else {
    themeBtn.textContent = '☾';
  }
}
updateIcon();

themeBtn.addEventListener('click', function () {
  if (root.dataset.theme === 'dark') {
    root.dataset.theme = 'light';
  } else {
    root.dataset.theme = 'dark';
  }
  try {
    localStorage.setItem('theme', root.dataset.theme);
  } catch (error) {}
  updateIcon();
});

// ---------- 4. Scroll-to-top button ----------
var topBtn = document.getElementById('top');

window.addEventListener('scroll', function () {
  if (window.scrollY > 300) {
    topBtn.classList.add('show');       
  } else {
    topBtn.classList.remove('show');
  }
});

topBtn.addEventListener('click', function () {
  window.scrollTo(0, 0);
});

// ---------- 5. Typing animation (Home page) ----------
var typedEl = document.getElementById('typed');

if (typedEl) {
  var words = ['websites', 'mobile apps', 'online stores', 'brands'];
  var wordIndex = 0;      
  var charIndex = 0;       
  var deleting = false;   

  function typeLoop() {
    var word = words[wordIndex];

    if (deleting) {
      charIndex = charIndex - 1;
    } else {
      charIndex = charIndex + 1;
    }
    typedEl.textContent = word.substring(0, charIndex);

    var delay = 90;                      
    if (deleting) {
      delay = 50;                       
    }

    if (!deleting && charIndex === word.length) {
      deleting = true;                   
      delay = 1400;                      
    } else if (deleting && charIndex === 0) {
      deleting = false;                 
      wordIndex = wordIndex + 1;
      if (wordIndex === words.length) {
        wordIndex = 0;                  
      }
      delay = 300;
    }
    setTimeout(typeLoop, delay);         
  }

  if (reduceMotion) {
    typedEl.textContent = words[0];
  } else {
    typeLoop();
  }
}

// ---------- 6. Animated counters ----------
var counters = document.querySelectorAll('[data-count]');
function runCounter(el) {
  var target = Number(el.dataset.count);       
  var duration = 1500;                         
  if (reduceMotion) {
    duration = 1;
  }
  var startTime = Date.now();
  function update() {
    var progress = (Date.now() - startTime) / duration;  
    if (progress > 1) {
      progress = 1;
    }
    el.textContent = Math.round(target * progress);
    if (progress < 1) {
      requestAnimationFrame(update);           
    }
  }
  update();
}
function checkCounters() {
  for (var i = 0; i < counters.length; i++) {
    var el = counters[i];
    if (el.dataset.started !== 'yes') {                 
      var rect = el.getBoundingClientRect();
      var visible = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
      if (visible) {
        el.dataset.started = 'yes';
        runCounter(el);
      }
    }
  }
}
window.addEventListener('scroll', checkCounters);
window.addEventListener('load', checkCounters);
checkCounters();

// ---------- 7. Image slider ----------
var slider = document.querySelector('.slider');
if (slider) {
  var track = slider.querySelector('.track');
  var totalSlides = track.children.length;
  var dotsBox = document.querySelector('.dots');
  var dotButtons = [];
  var current = 0;
  var timer;
  function showSlide(num) {
    if (num < 0) {
      num = totalSlides - 1;       
    }
    if (num >= totalSlides) {
      num = 0;                     
    }
    current = num;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    for (var j = 0; j < dotButtons.length; j++) {
      if (j === current) {
        dotButtons[j].classList.add('on');
      } else {
        dotButtons[j].classList.remove('on');
      }
    }
  }
  function startAutoplay() {
    clearInterval(timer);
    if (!reduceMotion) {
      timer = setInterval(function () {
        showSlide(current + 1);
      }, 5000);
    }
  }
  function makeDot(index) {
    var dot = document.createElement('button');
    dot.setAttribute('aria-label', 'Go to slide ' + (index + 1));
    dot.addEventListener('click', function () {
      showSlide(index);
      startAutoplay();
    });
    dotsBox.appendChild(dot);
    dotButtons.push(dot);
  }
  for (var k = 0; k < totalSlides; k++) {
    makeDot(k);
  }
  document.querySelector('.prev').addEventListener('click', function () {
    showSlide(current - 1);
    startAutoplay();
  });
  document.querySelector('.next').addEventListener('click', function () {
    showSlide(current + 1);
    startAutoplay();
  });
  var sliderBox = slider.parentElement;
  sliderBox.addEventListener('mouseenter', function () {
    clearInterval(timer);
  });
  sliderBox.addEventListener('mouseleave', startAutoplay);
  showSlide(0);
  startAutoplay();
}

// ---------- 8. FAQ accordion (Services page) ----------
var faqButtons = document.querySelectorAll('.faq button');

function closeAllFaq() {
  for (var i = 0; i < faqButtons.length; i++) {
    faqButtons[i].setAttribute('aria-expanded', 'false');
    faqButtons[i].nextElementSibling.style.maxHeight = '0px';
  }
}

function toggleFaq(button) {
  var wasOpen = button.getAttribute('aria-expanded') === 'true';
  closeAllFaq();                                 
  if (!wasOpen) {                                  
    var panel = button.nextElementSibling;
    button.setAttribute('aria-expanded', 'true');
    panel.style.maxHeight = panel.scrollHeight + 'px';
  }
}

function addFaqClick(button) {
  button.addEventListener('click', function () {
    toggleFaq(button);
  });
}
for (var f = 0; f < faqButtons.length; f++) {
  addFaqClick(faqButtons[f]);
}


// ---------- 9. Form validation (Contact page) ----------
var form = document.getElementById('contact');
if (form) {
  var fields = form.querySelectorAll('input, textarea');
  var successMsg = form.querySelector('.ok');
  function getError(field) {
    var value = field.value.trim();
    if (field.name === 'name') {
      if (value.length < 2) {
        return 'Enter your name (at least 2 characters).';
      }
    }
    if (field.name === 'email') {
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailPattern.test(value)) {
        return 'Enter a valid email, like name@company.com.';
      }
    }
    if (field.name === 'message') {
      if (value.length < 10) {
        return 'Tell us a bit more (at least 10 characters).';
      }
    }
    return '';
  }
  function checkField(field) {
    var error = getError(field);
    var errorBox = field.parentElement.querySelector('.err');
    errorBox.textContent = error;
    if (error !== '') {
      field.classList.add('bad');
      field.setAttribute('aria-invalid', 'true');
      return false;
    } else {
      field.classList.remove('bad');
      field.setAttribute('aria-invalid', 'false');
      return true;
    }
  }
  function addBlurCheck(field) {
    field.addEventListener('blur', function () {
      checkField(field);
    });
  }
  for (var m = 0; m < fields.length; m++) {
    addBlurCheck(fields[m]);
  }
  form.addEventListener('submit', function (event) {
    event.preventDefault();               
    var allValid = true;
    for (var n = 0; n < fields.length; n++) {
      if (checkField(fields[n]) === false) {
        allValid = false;
      }
    }
    if (allValid) {
      successMsg.textContent = 'Message sent. We reply within one business day.';
      form.reset();
    } else {
      successMsg.textContent = '';
    }
  });
}