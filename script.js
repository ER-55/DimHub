const pages = document.querySelectorAll(".page");

const menuButton = document.getElementById("menuButton");
const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");
const closeMenu = document.getElementById("closeMenu");
const infoButton = document.getElementById("infoButton");

let selectedGroup = "";
let selectedYear = "";
let selectedQuestionGroup = "";

let selectedSpecialties = [];
let selectedUniversities = [];

/* GROUP NAMES */
const groupNames = {
    ri: "I Qrup Rİ",
    rk: "I Qrup RK",
    ii: "II Qrup",
    tc: "III Qrup TC",
    dt: "III Qrup DT",
    iv: "IV Qrup"
};


/* =========================================================
   SCORE DATA
   ========================================================= */

function loadScoreData() {

    const dataElement = document.getElementById("score-data");

    if (!dataElement) return {};

    const text = dataElement.textContent.trim();

    const data = {};

    let currentGroup = "";
    let currentYear = "";
    let currentUniversity = "";

    const lines = text.split(/\r?\n/);

    lines.forEach((rawLine) => {

        const line = rawLine.trim();

        if (!line) return;

        const sectionMatch =
            line.match(/^\[([a-z]+)\|(\d{4})\]$/i);

        if (sectionMatch) {

            currentGroup =
                sectionMatch[1].toLowerCase();

            currentYear =
                sectionMatch[2];

            currentUniversity = "";

            if (!data[currentGroup]) {
                data[currentGroup] = {};
            }

            if (!data[currentGroup][currentYear]) {
                data[currentGroup][currentYear] = [];
            }

            return;
        }

        if (!currentGroup || !currentYear) {
            return;
        }

        /*
         * YENİ FORMAT
         *
         * @Universitet adı
         * İxtisas | Dövlət | Ödənişli
         */

        if (line.startsWith("@")) {

            currentUniversity =
                line.substring(1).trim();

            return;
        }

        const parts =
            line.split("|").map((part) => part.trim());

        /*
         * Yeni @Universitet formatı
         */

        if (currentUniversity && parts.length >= 3) {

            const specialty = parts[0];
            const stateScore = parts[1];
            const paidScore = parts[2];

            data[currentGroup][currentYear].push({
                university: currentUniversity,
                specialty,
                stateScore,
                paidScore
            });

            return;
        }

        /*
         * Köhnə format
         *
         * Universitet | İxtisas | Dövlət | Ödənişli
         */

        if (parts.length >= 4) {

            const university = parts[0];
            const specialty = parts[1];
            const stateScore = parts[2];
            const paidScore = parts[3];

            data[currentGroup][currentYear].push({
                university,
                specialty,
                stateScore,
                paidScore
            });
        }

    });

    return data;
}

const scoreData = loadScoreData();


/* =========================================================
   PAGE
   ========================================================= */

function openPage(pageId) {

    const targetPage =
        document.getElementById(pageId);

    if (!targetPage) return;

    pages.forEach((page) => {
        page.classList.remove("active");
    });

    targetPage.classList.add("active");

    closeMenuPanel();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   MENU
   ========================================================= */

function openMenuPanel() {

    sideMenu.classList.add("open");
    menuOverlay.classList.add("open");

    document.body.style.overflow = "hidden";
}

function closeMenuPanel() {

    sideMenu.classList.remove("open");
    menuOverlay.classList.remove("open");

    document.body.style.overflow = "";
}


/* =========================================================
   SCORE TABLE
   ========================================================= */

function createScoreTable(records) {

    if (!records || records.length === 0) {

        return `
            <p class="empty-score-message">
                Seçilmiş filtrlərə uyğun məlumat tapılmadı.
            </p>
        `;
    }

    const universities = {};

    records.forEach((record) => {

        if (!universities[record.university]) {
            universities[record.university] = [];
        }

        universities[record.university].push(record);

    });

    let html = "";

    Object.keys(universities).forEach((universityName) => {

        html += `
            <div class="university-block">

                <div class="university-title">
                    ${escapeHTML(universityName)}
                </div>

                <div class="score-table-wrap">

                    <table class="score-table">

                        <thead>
                            <tr>
                                <th>İxtisas</th>
                                <th>Dövlət sifarişi</th>
                                <th>Ödənişli</th>
                            </tr>
                        </thead>

                        <tbody>
        `;

        universities[universityName].forEach((record) => {

            html += `
                <tr>

                    <td>
                        ${escapeHTML(record.specialty)}
                    </td>

                    <td>
                        ${escapeHTML(record.stateScore)}
                    </td>

                    <td>
                        ${escapeHTML(record.paidScore)}
                    </td>

                </tr>
            `;

        });

        html += `
                        </tbody>

                    </table>

                </div>

            </div>
        `;

    });

    return html;
}


/* =========================================================
   ESCAPE
   ========================================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   SCORE VALUE
   ========================================================= */

function parseScore(value) {

    if (value === undefined || value === null) {
        return null;
    }

    const normalized =
        String(value)
            .replace(",", ".")
            .replace(/[^\d.-]/g, "");

    const number =
        parseFloat(normalized);

    if (isNaN(number)) {
        return null;
    }

    return number;
}


/* =========================================================
   FILTER DATA
   ========================================================= */

function getUniqueFilterValues(records, key) {

    const values = [];

    records.forEach((record) => {

        const value = String(record[key] || "").trim();

        if (value && !values.includes(value)) {
            values.push(value);
        }

    });

    return values.sort((a, b) =>
        a.localeCompare(b, "az")
    );
}


/* =========================================================
   CREATE FILTER LISTS
   ========================================================= */

function createScoreFilterLists(records) {

    const specialtyList =
        document.getElementById("scoreSpecialtyList");

    const universityList =
        document.getElementById("scoreUniversityList");

    if (!specialtyList || !universityList) {
        return;
    }

    /*
     * Yalnız cari qrup + il məlumatlarından
     * filtr siyahısı yaradılır.
     */

    const specialties =
        getUniqueFilterValues(records, "specialty");

    const universities =
        getUniqueFilterValues(records, "university");


    /*
     * İXTİSASLAR
     */

    specialtyList.innerHTML =
        specialties.map((specialty, index) => {

            const id =
                `score-specialty-${index}`;

            return `
                <label
                    class="score-filter-option"
                    for="${id}"
                >

                    <input
                        type="checkbox"
                        id="${id}"
                        class="score-specialty-checkbox"
                        value="${escapeHTML(specialty)}"
                    >

                    <span>
                        ${escapeHTML(specialty)}
                    </span>

                </label>
            `;

        }).join("");


    /*
     * UNİVERSİTETLƏR
     */

    universityList.innerHTML =
        universities.map((university, index) => {

            const id =
                `score-university-${index}`;

            return `
                <label
                    class="score-filter-option"
                    for="${id}"
                >

                    <input
                        type="checkbox"
                        id="${id}"
                        class="score-university-checkbox"
                        value="${escapeHTML(university)}"
                    >

                    <span>
                        ${escapeHTML(university)}
                    </span>

                </label>
            `;

        }).join("");


    /*
     * Mövcud seçimləri işarələ.
     */

    document
        .querySelectorAll(".score-specialty-checkbox")
        .forEach((checkbox) => {

            checkbox.checked =
                selectedSpecialties.includes(
                    checkbox.value
                );

        });


    document
        .querySelectorAll(".score-university-checkbox")
        .forEach((checkbox) => {

            checkbox.checked =
                selectedUniversities.includes(
                    checkbox.value
                );

        });


    updateAllCheckboxState(
        "scoreAllSpecialties",
        ".score-specialty-checkbox",
        selectedSpecialties
    );

    updateAllCheckboxState(
        "scoreAllUniversities",
        ".score-university-checkbox",
        selectedUniversities
    );


    /*
     * BÜTÜN İXTİSASLAR
     */

    const allSpecialties =
        document.getElementById("scoreAllSpecialties");

    if (allSpecialties) {

        allSpecialties.onchange = () => {

            if (allSpecialties.checked) {

                document
                    .querySelectorAll(".score-specialty-checkbox")
                    .forEach((checkbox) => {
                        checkbox.checked = false;
                    });

            }

        };

    }


    /*
     * BÜTÜN UNİVERSİTETLƏR
     */

    const allUniversities =
        document.getElementById("scoreAllUniversities");

    if (allUniversities) {

        allUniversities.onchange = () => {

            if (allUniversities.checked) {

                document
                    .querySelectorAll(".score-university-checkbox")
                    .forEach((checkbox) => {
                        checkbox.checked = false;
                    });

            }

        };

    }


    /*
     * Konkret ixtisas seçildikdə
     * "Bütün ixtisaslar" söndürülür.
     */

    document
        .querySelectorAll(".score-specialty-checkbox")
        .forEach((checkbox) => {

            checkbox.onchange = () => {

                if (checkbox.checked &&
                    allSpecialties) {

                    allSpecialties.checked = false;
                }

            };

        });


    /*
     * Konkret universitet seçildikdə
     * "Bütün universitetlər" söndürülür.
     */

    document
        .querySelectorAll(".score-university-checkbox")
        .forEach((checkbox) => {

            checkbox.onchange = () => {

                if (checkbox.checked &&
                    allUniversities) {

                    allUniversities.checked = false;
                }

            };

        });

}


/* =========================================================
   CHECKBOX STATE
   ========================================================= */

function updateAllCheckboxState(
    allId,
    checkboxSelector,
    selectedValues
) {

    const allCheckbox =
        document.getElementById(allId);

    if (!allCheckbox) return;

    const checkboxes =
        document.querySelectorAll(checkboxSelector);

    allCheckbox.checked =
        selectedValues.length === 0 ||
        selectedValues.length === checkboxes.length;

}


/* =========================================================
   FILTER RESULT
   ========================================================= */

function getFilteredScoreRecords(records) {

    if (!records || records.length === 0) {
        return [];
    }


    /*
     * Heç bir filtr seçilməyibsə
     * bütün məlumatları göstər.
     */

    if (
        selectedSpecialties.length === 0 &&
        selectedUniversities.length === 0
    ) {

        return records;
    }


    return records.filter((record) => {

        const specialtyMatch =
            selectedSpecialties.length === 0 ||
            selectedSpecialties.includes(
                record.specialty
            );

        const universityMatch =
            selectedUniversities.length === 0 ||
            selectedUniversities.includes(
                record.university
            );

        return specialtyMatch && universityMatch;

    });

}


/* =========================================================
   SHOW SCORE TABLE
   ========================================================= */

function showScoreTable(resetFilters = false) {

    document.getElementById("tableLabel").textContent =
        `${groupNames[selectedGroup].toUpperCase()} · ${selectedYear}`;

    document.getElementById("tableTitle").textContent =
        `${groupNames[selectedGroup]} — ${selectedYear} keçid balları`;


    const scoreContent =
        document.getElementById("scoreContent");

    scoreContent.innerHTML =
        `<p class="empty-score-message">Keçid balları yüklənir...</p>`;


    openPage("score-table-page");


    const groupData =
        scoreData[selectedGroup];


    if (!groupData) {

        scoreContent.innerHTML = `
            <p class="empty-score-message">
                Bu qrup üçün keçid balı məlumatı əlavə edilməyib.
            </p>
        `;

        return;
    }


    const yearData =
        groupData[selectedYear];


    if (!yearData || yearData.length === 0) {

    // Əvvəlki qrup/ilin filtr məlumatlarını tam təmizlə
    selectedSpecialties = [];
    selectedUniversities = [];

    createScoreFilterLists([]);

    scoreContent.innerHTML = `
        <p class="empty-score-message">
            ${selectedYear}-ci il üçün bu qrup üzrə
            keçid balı məlumatı əlavə edilməyib.
        </p>
    `;

    return;
}

    /*
     * Yalnız yeni qrup + il açıldıqda
     * filtr siyahılarını yenilə.
     *
     * Tətbiq et zamanı seçimlər sıfırlanmır.
     */

    if (resetFilters) {

        selectedSpecialties = [];
        selectedUniversities = [];

        createScoreFilterLists(yearData);

    }


    const filteredRecords =
        getFilteredScoreRecords(yearData);


    scoreContent.innerHTML =
        createScoreTable(filteredRecords);

}


/* =========================================================
   FILTER UI
   ========================================================= */

const scoreFilterToggle =
    document.getElementById("scoreFilterToggle");

const scoreFilterPanel =
    document.getElementById("scoreFilterPanel");


if (scoreFilterToggle && scoreFilterPanel) {

    scoreFilterToggle.addEventListener(
        "click",
        () => {

            scoreFilterPanel.classList.toggle("open");

        }
    );

}


/* =========================================================
   APPLY FILTER
   ========================================================= */

const scoreFilterApply =
    document.getElementById("scoreFilterApply");


if (scoreFilterApply) {

    scoreFilterApply.addEventListener(
        "click",
        () => {

            selectedSpecialties =
                Array.from(
                    document.querySelectorAll(
                        ".score-specialty-checkbox:checked"
                    )
                ).map(
                    (checkbox) => checkbox.value
                );


            selectedUniversities =
                Array.from(
                    document.querySelectorAll(
                        ".score-university-checkbox:checked"
                    )
                ).map(
                    (checkbox) => checkbox.value
                );


            const allSpecialties =
                document.getElementById(
                    "scoreAllSpecialties"
                );

            const allUniversities =
                document.getElementById(
                    "scoreAllUniversities"
                );


            if (allSpecialties &&
                allSpecialties.checked) {

                selectedSpecialties = [];
            }


            if (allUniversities &&
                allUniversities.checked) {

                selectedUniversities = [];
            }


            /*
             * FALSE:
             * seçimlər sıfırlanmır.
             */

            showScoreTable(false);


            if (scoreFilterPanel) {
                scoreFilterPanel.classList.remove("open");
            }

        }
    );

}


/* =========================================================
   CLEAR FILTER
   ========================================================= */

const scoreFilterClear =
    document.getElementById("scoreFilterClear");


if (scoreFilterClear) {

    scoreFilterClear.addEventListener(
        "click",
        () => {

            selectedSpecialties = [];
            selectedUniversities = [];


            const allSpecialties =
                document.getElementById(
                    "scoreAllSpecialties"
                );

            const allUniversities =
                document.getElementById(
                    "scoreAllUniversities"
                );


            if (allSpecialties) {
                allSpecialties.checked = true;
            }


            if (allUniversities) {
                allUniversities.checked = true;
            }


            document
                .querySelectorAll(
                    ".score-specialty-checkbox"
                )
                .forEach((checkbox) => {
                    checkbox.checked = false;
                });


            document
                .querySelectorAll(
                    ".score-university-checkbox"
                )
                .forEach((checkbox) => {
                    checkbox.checked = false;
                });


            showScoreTable(false);

        }
    );

}


/* =========================================================
   İMTAHAN BALI HESABLAYICISI
   ========================================================= */

function getNumber(id) {

    const element =
        document.getElementById(id);

    if (!element) return 0;

    const value =
        element.value
            .replace(",", ".")
            .trim();

    const number =
        parseFloat(value);

    if (isNaN(number) || number < 0) {
        return 0;
    }

    return number;
}


function roundScore(value) {

    return Math.round(
        (value + Number.EPSILON) * 100
    ) / 100;

}


/* =========================================================
   9-CU SİNİF
   ========================================================= */

function calculateGrade9() {

    const mathRaw =
        getNumber("g9-math-correct") * 3.45 +
        getNumber("g9-math-detailed") * 6.9;


    const languageRaw =
        getNumber("g9-language-correct") * 2.95 +
        getNumber("g9-language-detailed") * 5.9;


    /*
     * Xarici dil:
     * Hər düzgün cavab = 3.34
     * Yazı işi ayrıca əlavə olunur.
     */

    const foreignRaw =
        getNumber("g9-foreign-correct") * 3.34 +
        getNumber("g9-foreign-writing");


    const math =
        Math.max(0, Math.min(100, mathRaw));

    const language =
        Math.max(0, Math.min(100, languageRaw));

    const foreign =
        Math.max(0, Math.min(100, foreignRaw));


    document.getElementById(
        "g9-math-result"
    ).textContent =
        roundScore(math).toFixed(2);


    document.getElementById(
        "g9-language-result"
    ).textContent =
        roundScore(language).toFixed(2);


    document.getElementById(
        "g9-foreign-result"
    ).textContent =
        roundScore(foreign).toFixed(2);


    const total =
        math + language + foreign;


    document.getElementById(
        "g9-total-result"
    ).textContent =
        roundScore(total).toFixed(2);

}


/* =========================================================
   11-Cİ SİNİF
   ========================================================= */

function calculateGrade11() {

    const mathRaw =
        getNumber("g11-math-correct") * 3.1 +
        getNumber("g11-math-detailed") * 6.3;


    const languageRaw =
        getNumber("g11-language-correct") * 2.5 +
        getNumber("g11-language-detailed") * 5;


    /*
     * Xarici dil:
     * Hər düzgün cavab = 3.34
     * Yazı işi ayrıca əlavə olunur.
     */

    const foreignRaw =
        getNumber("g11-foreign-correct") * 3.34 +
        getNumber("g11-foreign-writing");


    const math =
        Math.max(0, Math.min(100, mathRaw));

    const language =
        Math.max(0, Math.min(100, languageRaw));

    const foreign =
        Math.max(0, Math.min(100, foreignRaw));


    document.getElementById(
        "g11-math-result"
    ).textContent =
        roundScore(math).toFixed(2);


    document.getElementById(
        "g11-language-result"
    ).textContent =
        roundScore(language).toFixed(2);


    document.getElementById(
        "g11-foreign-result"
    ).textContent =
        roundScore(foreign).toFixed(2);


    const total =
        math + language + foreign;


    document.getElementById(
        "g11-total-result"
    ).textContent =
        roundScore(total).toFixed(2);

}


/* =========================================================
   BLOK HESABLAYICI
   ========================================================= */

function calculateBlockSubject(
    correctId,
    detailedId,
    wrongId,
    resultId,
    correctPoint,
    detailedPoint,
    maximumScore
) {

    const correct =
        getNumber(correctId);

    const detailed =
        getNumber(detailedId);

    const wrong =
        getNumber(wrongId);


    const wrongPenalty =
        correctPoint * 0.25;


    const rawResult =
        (correct * correctPoint) +
        (detailed * detailedPoint) -
        (wrong * wrongPenalty);


    const result =
        Math.max(
            0,
            Math.min(maximumScore, rawResult)
        );


    document.getElementById(
        resultId
    ).textContent =
        roundScore(result).toFixed(2);


    return result;
}


function calculateBlock() {

    const subject1 =
        calculateBlockSubject(
            "block-subject1-correct",
            "block-subject1-detailed",
            "block-subject1-wrong",
            "block-subject1-result",
            4.55,
            9.1,
            150
        );


    const subject2 =
        calculateBlockSubject(
            "block-subject2-correct",
            "block-subject2-detailed",
            "block-subject2-wrong",
            "block-subject2-result",
            4.55,
            9.1,
            150
        );


    const subject3 =
        calculateBlockSubject(
            "block-subject3-correct",
            "block-subject3-detailed",
            "block-subject3-wrong",
            "block-subject3-result",
            3,
            6.1,
            100
        );


    const total =
        subject1 + subject2 + subject3;


    document.getElementById(
        "block-total-result"
    ).textContent =
        roundScore(total).toFixed(2);

}


/* =========================================================
   CALCULATOR INPUTS
   ========================================================= */

document.querySelectorAll(
    "#calculator-grade9 input, #calculator-grade11 input, #calculator-block input"
).forEach((input) => {

    input.addEventListener("input", () => {

        if (input.id.startsWith("g9-")) {
            calculateGrade9();
        }

        if (input.id.startsWith("g11-")) {
            calculateGrade11();
        }

        if (input.id.startsWith("block-")) {
            calculateBlock();
        }

    });

});


/* =========================================================
   STEPPERS
   ========================================================= */

document.querySelectorAll(
    "[data-stepper]"
).forEach((button) => {

    button.addEventListener("click", () => {

        const stepper =
            button.closest(".stepper");

        if (!stepper) return;

        const input =
            stepper.querySelector("input");

        if (!input) return;

        let value =
            parseFloat(input.value);

        if (isNaN(value)) {
            value = 0;
        }

        const step = 0.5;


        if (
            button.dataset.stepper === "plus"
        ) {
            value += step;
        }


        if (
            button.dataset.stepper === "minus"
        ) {
            value -= step;
        }


        if (value < 0) {
            value = 0;
        }


        value =
            Math.round(value * 2) / 2;


        input.value = value;


        input.dispatchEvent(
            new Event("input", {
                bubbles: true
            })
        );

    });

});


/* =========================================================
   GENERAL PAGE NAVIGATION
   ========================================================= */

document.querySelectorAll(
    "[data-page]"
).forEach((button) => {

    button.addEventListener("click", () => {

        openPage(
            button.dataset.page
        );

    });

});


/* =========================================================
   GROUPS
   ========================================================= */

document.querySelectorAll(
    "[data-group]"
).forEach((button) => {

    button.addEventListener("click", () => {

        selectedGroup =
            button.dataset.group;


        selectedSpecialties = [];
        selectedUniversities = [];


        document.getElementById(
            "scoreGroupLabel"
        ).textContent =
            groupNames[selectedGroup].toUpperCase();


        document.getElementById(
            "scoreYearsTitle"
        ).textContent =
            `${groupNames[selectedGroup]} keçid balları`;


        openPage("score-years");

    });

});


/* =========================================================
   SCORE YEARS
   ========================================================= */

document.querySelectorAll(
    "[data-score-year]"
).forEach((button) => {

    button.addEventListener("click", () => {

        selectedYear =
            button.dataset.scoreYear;


        selectedSpecialties = [];
        selectedUniversities = [];


        /*
         * Yeni qrup + il üçün filtr siyahısı
         * yalnız həmin məlumatlardan yaradılır.
         */

        showScoreTable(true);

    });

});


/* =========================================================
   QUESTION GROUPS
   ========================================================= */

document.querySelectorAll(
    "[data-question-group]"
).forEach((button) => {

    button.addEventListener("click", () => {

        selectedQuestionGroup =
            button.dataset.questionGroup;


        document.getElementById(
            "questionGroupLabel"
        ).textContent =
            selectedQuestionGroup.toUpperCase();


        document.getElementById(
            "questionYearsTitle"
        ).textContent =
            `${selectedQuestionGroup} imtahan sualları`;


        openPage("question-years");

    });

});


/* =========================================================
   QUESTION YEARS
   ========================================================= */

document.querySelectorAll(
    "[data-question-year]"
).forEach((button) => {

    button.addEventListener("click", () => {

        const year =
            button.dataset.questionYear;


        document.getElementById(
            "questionLabel"
        ).textContent =
            `${selectedQuestionGroup.toUpperCase()} · ${year}`;


        document.getElementById(
            "questionTitle"
        ).textContent =
            `${selectedQuestionGroup} — ${year} imtahan sualları`;


        openPage("question-page");

    });

});


/* =========================================================
   CALCULATOR SELECTION
   ========================================================= */

document.querySelectorAll(
    "[data-calculator]"
).forEach((button) => {

    button.addEventListener("click", () => {

        const calculator =
            button.dataset.calculator;


        if (calculator === "grade9") {

            openPage("calculator-grade9");

            calculateGrade9();

        }


        if (calculator === "grade11") {

            openPage("calculator-grade11");

            calculateGrade11();

        }


        if (calculator === "block") {

            openPage("calculator-block");

            calculateBlock();

        }

    });

});


/* =========================================================
   İXTİSAS SEÇİMİ
   ========================================================= */

function showMajorSelectionResults() {

    const groupElement =
        document.getElementById(
            "major-selection-group"
        );


    const scoreElement =
        document.getElementById(
            "major-selection-score"
        );


    const resultsElement =
        document.getElementById(
            "major-selection-results"
        );


    if (
        !groupElement ||
        !scoreElement ||
        !resultsElement
    ) {
        return;
    }


    const group =
        groupElement.value;


    const userScore =
        parseFloat(
            scoreElement.value.replace(",", ".")
        );


    if (!group) {

        resultsElement.innerHTML = `
            <div class="major-selection-empty">
                Əvvəlcə ixtisas qrupunu seçin.
            </div>
        `;

        return;
    }


    if (
        isNaN(userScore) ||
        userScore < 0
    ) {

        resultsElement.innerHTML = `
            <div class="major-selection-empty">
                Zəhmət olmasa topladığınız balı düzgün daxil edin.
            </div>
        `;

        return;
    }


    const groupData =
        scoreData[group];


    if (
        !groupData ||
        Object.keys(groupData).length === 0
    ) {

        resultsElement.innerHTML = `
            <div class="major-selection-empty">
                <strong>Hələlik Məlumat yoxdur</strong>
                <br>
                Bu qrup üzrə keçid balı məlumatları hələ əlavə edilməyib.
            </div>
        `;

        return;
    }


    const years =
        Object.keys(groupData)
            .filter((year) => {

                return groupData[year] &&
                    groupData[year].length > 0;

            })
            .sort(
                (a, b) => Number(b) - Number(a)
            );


    if (years.length === 0) {

        resultsElement.innerHTML = `
            <div class="major-selection-empty">
                <strong>Hələlik Məlumat yoxdur</strong>
                <br>
                Bu qrup üzrə keçid balı məlumatları hələ əlavə edilməyib.
            </div>
        `;

        return;
    }


    let html = `
        <div class="major-selection-results">

            <h2 class="major-selection-results-title">
                ${escapeHTML(groupNames[group])} — ${userScore.toFixed(2)} bal
            </h2>
    `;


    years.forEach((year) => {

        const records =
            groupData[year];


        const eligibleRecords =
            records.filter((record) => {

                const stateScore =
                    parseScore(record.stateScore);


                const paidScore =
                    parseScore(record.paidScore);


                const stateEligible =
                    stateScore !== null &&
                    userScore >= stateScore;


                const paidEligible =
                    paidScore !== null &&
                    userScore >= paidScore;


                return (
                    stateEligible ||
                    paidEligible
                );

            });


        html += `
            <div class="major-year-result">

                <div class="major-year-title">
                    ${escapeHTML(year)}
                </div>
        `;


        if (eligibleRecords.length === 0) {

            html += `
                <div class="major-selection-no-match">
                    Bu il üzrə daxil etdiyiniz bala uyğun ixtisas tapılmadı.
                </div>
            `;

        } else {

            const universities = {};


            eligibleRecords.forEach((record) => {

                if (!universities[record.university]) {

                    universities[
                        record.university
                    ] = [];

                }


                universities[
                    record.university
                ].push(record);

            });


            Object.keys(
                universities
            ).forEach((universityName) => {

                html += `
                    <div class="major-result-university">

                        <h3>
                            ${escapeHTML(universityName)}
                        </h3>
                `;


                universities[
                    universityName
                ].forEach((record) => {

                    const stateScore =
                        parseScore(
                            record.stateScore
                        );


                    const paidScore =
                        parseScore(
                            record.paidScore
                        );


                    const stateEligible =
                        stateScore !== null &&
                        userScore >= stateScore;


                    const paidEligible =
                        paidScore !== null &&
                        userScore >= paidScore;


                    html += `
                        <div class="major-result-specialty">

                            <div class="major-result-specialty-name">
                                ${escapeHTML(record.specialty)}
                            </div>

                            <div class="major-result-scores">
                    `;


                    if (stateScore !== null) {

                        html += `
                            <span class="major-score state">
                                Dövlət sifarişi:
                                ${escapeHTML(record.stateScore)}
                                ${stateEligible ? "✓" : ""}
                            </span>
                        `;

                    } else {

                        html += `
                            <span class="major-score unavailable">
                                Dövlət sifarişi: -
                            </span>
                        `;

                    }


                    if (paidScore !== null) {

                        html += `
                            <span class="major-score paid">
                                Ödənişli:
                                ${escapeHTML(record.paidScore)}
                                ${paidEligible ? "✓" : ""}
                            </span>
                        `;

                    } else {

                        html += `
                            <span class="major-score unavailable">
                                Ödənişli: -
                            </span>
                        `;

                    }


                    html += `
                            </div>

                        </div>
                    `;

                });


                html += `
                    </div>
                `;

            });

        }


        html += `
            </div>
        `;

    });


    html += `
        </div>
    `;


    resultsElement.innerHTML =
        html;

}


/* =========================================================
   İXTİSAS SEÇİMİ BUTTON
   ========================================================= */

const majorSelectionButton =
    document.getElementById(
        "major-selection-button"
    );


if (majorSelectionButton) {

    majorSelectionButton.addEventListener(
        "click",
        showMajorSelectionResults
    );

}


/* =========================================================
   ENTER İLƏ NƏTİCƏ
   ========================================================= */

const majorSelectionScore =
    document.getElementById(
        "major-selection-score"
    );


if (majorSelectionScore) {

    majorSelectionScore.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                showMajorSelectionResults();

            }

        }
    );

}


/* =========================================================
   MENU
   ========================================================= */

menuButton.addEventListener(
    "click",
    openMenuPanel
);


closeMenu.addEventListener(
    "click",
    closeMenuPanel
);


menuOverlay.addEventListener(
    "click",
    closeMenuPanel
);


/* =========================================================
   INFO
   ========================================================= */

infoButton.addEventListener(
    "click",
    () => {

        openPage("about");

    }
);


/* =========================================================
   ESC
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            closeMenuPanel();

        }

    }
);
