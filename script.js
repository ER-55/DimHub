const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll(".nav-link");

const menuButton = document.getElementById("menuButton");
const closeMenu = document.getElementById("closeMenu");
const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");

const logoButton = document.getElementById("logoButton");
const infoButton = document.getElementById("infoButton");

const passingGroupTitle = document.getElementById("passingGroupTitle");
const examGroupTitle = document.getElementById("examGroupTitle");

const contentCategory = document.getElementById("contentCategory");
const contentTitle = document.getElementById("contentTitle");
const yearContentBack = document.getElementById("yearContentBack");

let currentYearPage = "home";

function showPage(pageId) {
  pages.forEach((page) => {
    page.classList.toggle("active", page.id === pageId);
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.page === pageId);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
  closeSideMenu();
}

function openSideMenu() {
  sideMenu.classList.add("open");
  menuOverlay.classList.add("open");
  menuButton.setAttribute("aria-expanded", "true");
}

function closeSideMenu() {
  sideMenu.classList.remove("open");
  menuOverlay.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}

menuButton.addEventListener("click", openSideMenu);
closeMenu.addEventListener("click", closeSideMenu);
menuOverlay.addEventListener("click", closeSideMenu);

logoButton.addEventListener("click", () => showPage("home"));
infoButton.addEventListener("click", () => showPage("about"));

document.querySelectorAll("[data-page]").forEach((button) => {
  button.addEventListener("click", () => {
    showPage(button.dataset.page);
  });
});

document.querySelectorAll("[data-passing-group]").forEach((button) => {
  button.addEventListener("click", () => {
    passingGroupTitle.textContent = button.dataset.passingGroup;
    showPage("passing-years");
  });
});

document.querySelectorAll("[data-exam-group]").forEach((button) => {
  button.addEventListener("click", () => {
    examGroupTitle.textContent = button.dataset.examGroup;
    showPage("exam-years");
  });
});

document.querySelectorAll(".passing-year").forEach((button) => {
  button.addEventListener("click", () => {
    const year = button.dataset.year;
    currentYearPage = "passing-years";

    contentCategory.textContent = "Keçid balları";
    contentTitle.textContent = `${passingGroupTitle.textContent} — ${year}`;
    yearContentBack.textContent = "← İllərə qayıt";

    showPage("year-content");
  });
});

document.querySelectorAll(".exam-year").forEach((button) => {
  button.addEventListener("click", () => {
    const year = button.dataset.year;
    currentYearPage = "exam-years";

    contentCategory.textContent = "İmtahan sualları";
    contentTitle.textContent = `${examGroupTitle.textContent} — ${year}`;
    yearContentBack.textContent = "← İllərə qayıt";

    showPage("year-content");
  });
});

yearContentBack.addEventListener("click", () => {
  showPage(currentYearPage);
});
