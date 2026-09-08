:root {
  --blue: #0b5cad;
  --dark-blue: #063b72;
  --light-blue: #edf6ff;
  --purple: #6e3dc8;
  --green: #16875c;
  --text: #172033;
  --muted: #657083;
  --line: #e4e9f0;
  --white: #ffffff;
  --background: #f6f8fb;
  --shadow: 0 12px 35px rgba(25, 53, 89, 0.09);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  font-family: Arial, Helvetica, sans-serif;
  color: var(--text);
  background: var(--background);
}

button,
a {
  font: inherit;
}

button {
  cursor: pointer;
}

.header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: var(--white);
  border-bottom: 1px solid var(--line);
}

.header-container {
  max-width: 1160px;
  min-height: 78px;
  margin: auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 18px;
}

.menu-button,
.info-button {
  width: 42px;
  height: 42px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: var(--blue);
  transition: background 0.2s ease;
}

.menu-button:hover,
.info-button:hover {
  background: var(--light-blue);
}

.menu-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  padding: 10px;
}

.menu-button span {
  width: 22px;
  height: 2px;
  margin: 0 auto;
  border-radius: 4px;
  background: var(--blue);
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 0;
  padding: 0;
  color: var(--blue);
  background: transparent;
}

.logo-text {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -1px;
}

.logo-squares {
  width: 35px;
  display: grid;
  grid-template-columns: repeat(4, 6px);
  gap: 3px;
}

.logo-squares i {
  width: 6px;
  height: 6px;
  background: var(--blue);
}

.logo-squares i:nth-child(4n),
.logo-squares i:nth-child(5n) {
  background: #48a8e8;
}

.info-button {
  margin-left: auto;
  border: 2px solid var(--blue);
  font-size: 21px;
  font-family: Georgia, serif;
  font-weight: bold;
  line-height: 1;
}

.main-content {
  width: min(1160px, calc(100% - 48px));
  min-height: calc(100vh - 78px);
  margin: auto;
  padding: 48px 0 64px;
}

.page {
  display: none;
  animation: pageIn 0.25s ease;
}

.page.active {
  display: block;
}

@keyframes pageIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero {
  padding: 24px 0 40px;
  text-align: center;
}

.eyebrow {
  margin: 0 0 10px;
  color: var(--blue);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.hero h1,
.page-heading h2 {
  margin: 0;
  color: var(--dark-blue);
}

.hero h1 {
  font-size: clamp(40px, 7vw, 64px);
}

.hero p:not(.eyebrow),
.page-heading > p:last-child {
  max-width: 630px;
  margin: 14px auto 0;
  color: var(--muted);
  font-size: 17px;
  line-height: 1.65;
}

.home-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.home-card {
  min-height: 210px;
  border: 0;
  border-radius: 18px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: var(--white);
  text-align: left;
  box-shadow: var(--shadow);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.home-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 42px rgba(25, 53, 89, 0.18);
}

.home-card .card-icon {
  width: 46px;
  height: 46px;
  margin-bottom: auto;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  font-size: 25px;
  font-weight: bold;
}

.home-card strong {
  display: block;
  font-size: 20px;
  line-height: 1.3;
}

.home-card small {
  display: block;
  margin-top: 9px;
  color: rgba(255, 255, 255, 0.86);
  font-size: 14px;
  line-height: 1.4;
}

.home-card b {
  align-self: flex-end;
  margin-top: 12px;
  font-size: 28px;
}

.blue-card {
  background: linear-gradient(135deg, #0b65bd, #063e78);
}

.purple-card {
  background: linear-gradient(135deg, #8a55df, #56249f);
}

.green-card {
  background: linear-gradient(135deg, #1ba873, #086345);
}

.back-button {
  margin-bottom: 32px;
  padding: 10px 0;
  border: 0;
  color: var(--blue);
  background: transparent;
  font-weight: 700;
  font-size: 15px;
}

.back-button:hover {
  color: var(--dark-blue);
  text-decoration: underline;
}

.page-heading {
  margin-bottom: 30px;
}

.page-heading h2 {
  font-size: clamp(28px, 4vw, 40px);
}

.page-heading > p:last-child {
  margin-left: 0;
  text-align: left;
}

.selection-grid,
.year-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.selection-card,
.year-card {
  min-height: 138px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--white);
  color: var(--dark-blue);
  box-shadow: 0 5px 18px rgba(25, 53, 89, 0.05);
  font-size: 22px;
  font-weight: 800;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}

.selection-card:hover,
.year-card:hover {
  transform: translateY(-4px);
  border-color: var(--blue);
  background: var(--light-blue);
}

.selection-card span {
  display: inline-block;
  margin-left: 5px;
  padding: 4px 7px;
  border-radius: 6px;
  color: var(--white);
  background: var(--blue);
  font-size: 14px;
  vertical-align: middle;
}

.year-card:nth-child(1) {
  color: #075aa7;
  background: #eaf5ff;
}

.year-card:nth-child(2) {
  color: #6e3dc8;
  background: #f3edff;
}

.year-card:nth-child(3) {
  color: #16875c;
  background: #eaf9f1;
}

.year-card:nth-child(4) {
  color: #b26c06;
  background: #fff5df;
}

.empty-content,
.about-box {
  padding: 42px 30px;
  border: 1px dashed #b7c8da;
  border-radius: 18px;
  background: var(--white);
  text-align: center;
}

.empty-content > span {
  display: block;
  margin-bottom: 12px;
  color: var(--blue);
  font-size: 38px;
}

.empty-content h3,
.about-box h3 {
  margin: 0;
  color: var(--dark-blue);
  font-size: 22px;
}

.empty-content p,
.about-box p {
  max-width: 590px;
  margin: 12px auto 0;
  color: var(--muted);
  line-height: 1.6;
}

.about-box {
  border-style: solid;
}

.social-icons,
.footer-socials {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.social-icons {
  margin-top: 24px;
}

.social-icons a,
.footer-socials a {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  text-decoration: none;
  font-weight: bold;
}

.social-icons a {
  color: var(--blue);
  background: var(--light-blue);
  font-size: 20px;
}

.footer {
  min-height: 136px;
  padding: 26px max(24px, calc((100% - 1160px) / 2));
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  color: rgba(255, 255, 255, 0.8);
  background: #073764;
}

.footer strong {
  color: var(--white);
  font-size: 22px;
}

.footer p {
  margin: 7px 0 0;
  font-size: 14px;
}

.footer-socials a {
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: var(--white);
  font-size: 18px;
  transition: background 0.2s ease;
}

.footer-socials a:hover {
  background: rgba(255, 255, 255, 0.16);
}

.menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 29;
  display: none;
  background: rgba(4, 24, 47, 0.5);
}

.menu-overlay.open {
  display: block;
}

.side-menu {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 30;
  width: min(320px, 88vw);
  padding: 24px;
  background: var(--white);
  box-shadow: 8px 0 30px rgba(0, 0, 0, 0.14);
  transform: translateX(-105%);
  transition: transform 0.25s ease;
}

.side-menu.open {
  transform: translateX(0);
}

.side-menu-top {
  padding-bottom: 23px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--line);
  color: var(--dark-blue);
  font-size: 23px;
}

.close-menu {
  width: 38px;
  height: 38px;
  border: 0;
  border-radius: 9px;
  color: var(--blue);
  background: var(--light-blue);
  font-size: 27px;
  line-height: 1;
}

.side-nav {
  margin-top: 18px;
  display: grid;
}

.nav-link {
  padding: 15px 12px;
  border: 0;
  border-radius: 9px;
  color: #42526a;
  background: transparent;
  text-align: left;
  font-weight: 700;
}

.nav-link:hover,
.nav-link.active {
  color: var(--blue);
  background: var(--light-blue);
}

@media (max-width: 820px) {
  .home-cards {
    grid-template-columns: 1fr;
  }

  .home-card {
    min-height: 180px;
  }

  .selection-grid,
  .year-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 520px) {
  .header-container {
    min-height: 68px;
    padding: 0 16px;
  }

  .main-content {
    width: min(100% - 32px, 1160px);
    padding: 32px 0 44px;
  }

  .hero {
    padding-top: 8px;
  }

  .selection-grid,
  .year-grid {
    grid-template-columns: 1fr;
  }

  .selection-card,
  .year-card {
    min-height: 112px;
  }

  .footer {
    padding: 26px 20px;
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-socials {
    justify-content: flex-start;
  }
}
