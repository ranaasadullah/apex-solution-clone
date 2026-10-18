# Apex Solutions: Interactive Business Website

Task 02 of the Web Development internship. A fully responsive, multi-page business website built with HTML5, CSS3 and vanilla JavaScript (no frameworks or libraries).

## Pages
Home, About, Services, Portfolio and Contact.

## Features
| Feature | Where |
|---|---|
| Responsive navigation menu (hamburger under 800px) | All pages |
| Image slider with autoplay, arrows and dots | Home |
| FAQ accordion | Services |
| Form validation with inline errors | Contact |
| Scroll-to-top button | All pages |
| Dark mode (follows system, remembers choice) | All pages |
| Animated counters | Home |
| Typing animation | Home |

Also: consistent colour scheme, accessible markup (ARIA labels, focus styles, reduced-motion support) and a mobile-first layout.

## Technologies
HTML5, CSS3 (custom properties, Grid, Flexbox, media queries), JavaScript ES6+ (DOM, IntersectionObserver, localStorage).

## Folder structure
```
apex/
├── index.html  about.html  services.html  portfolio.html  contact.html
├── css/style.css
├── js/main.js
├── assets/    (images)
├── screenshots/   (application screenshots)
└── README.md
```

## Setup and run
No build step or dependencies are needed.
1. Download or clone the project.
2. Open `index.html` in any modern browser (double-click it), **or** serve the folder locally

Google Fonts (Sora and DM Sans) load over the internet. Offline, the site falls back to system fonts.

## Deployment
- **GitHub Pages:** push the folder to a repository, then Settings > Pages > deploy from the `main` branch (root).

## Notes
- The contact form validates in the browser only; it does not send email. Connect it to Formspree Forms to receive messages.
- Company name, copy, project names and the email address are sample content.

## Author
Rana Asad Ullah, Web Development Intern, Apex Solutions
