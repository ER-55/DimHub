/* =====================================================
   ELEMENTLƏR
===================================================== */

const pages =
    document.querySelectorAll(".page");


const pageButtons =
    document.querySelectorAll("[data-page]");


const menuButton =
    document.getElementById("menuButton");


const closeMenu =
    document.getElementById("closeMenu");


const sideMenu =
    document.getElementById("sideMenu");


const menuOverlay =
    document.getElementById("menuOverlay");


const infoButton =
    document.getElementById("infoButton");


/* =====================================================
   SƏHİFƏ AÇMA
===================================================== */

function openPage(pageId) {

    /* Bütün səhifələri gizlət */

    pages.forEach(page => {

        page.classList.remove("active");

    });


    /* Lazım olan səhifəni tap */

    const selectedPage =
        document.getElementById(pageId);


    if (selectedPage) {

        selectedPage.classList.add("active");

    }


    /* Sol menyunu bağla */

    closeSideMenu();


    /* Səhifənin əvvəlinə qayıt */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   SOL MENYUNU AÇ
===================================================== */

function openSideMenu() {

    sideMenu.classList.add("open");

    menuOverlay.classList.add("open");

    document.body.style.overflow = "hidden";

}


/* =====================================================
   SOL MENYUNU BAĞLA
===================================================== */

function closeSideMenu() {

    sideMenu.classList.remove("open");

    menuOverlay.classList.remove("open");

    document.body.style.overflow = "";

}


/* =====================================================
   BÜTÜN DATA-PAGE DÜYMƏLƏRİ
===================================================== */

pageButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            const pageId =
                this.getAttribute("data-page");


            openPage(pageId);

        }
    );

});


/* =====================================================
   HAMBURGER
===================================================== */

menuButton.addEventListener(
    "click",
    function () {

        openSideMenu();

    }
);


/* =====================================================
   MENYUNU BAĞLA
===================================================== */

closeMenu.addEventListener(
    "click",
    function () {

        closeSideMenu();

    }
);


/* =====================================================
   OVERLAY-A BASANDA
===================================================== */

menuOverlay.addEventListener(
    "click",
    function () {

        closeSideMenu();

    }
);


/* =====================================================
   HAQQIMIZDA DÜYMƏSİ
===================================================== */

infoButton.addEventListener(
    "click",
    function () {

        openPage("about");

    }
);


/* =====================================================
   ESC İLƏ MENYUNU BAĞLA
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeSideMenu();

        }

    }
);