
/* =====================================
   1. ELEMENTOS DEL JUEGO
===================================== */

const homeScreen = document.getElementById("home-screen");
const gameScreen = document.getElementById("game-screen");

const startButton = document.getElementById("start-button");
const backButton = document.getElementById("back-button");
const homeLink = document.getElementById("home-link");

const instructionsButton =
    document.getElementById("instructions-button");

const instructionsModal =
    document.getElementById("instructions-modal");

const closeModal = document.getElementById("close-modal");
const modalStartButton =
    document.getElementById("modal-start-button");

const wasteItemsContainer =
    document.getElementById("waste-items");

const recyclingBinsContainer =
    document.getElementById("recycling-bins");

const scoreElement = document.getElementById("score");
const sortedCountElement =
    document.getElementById("sorted-count");

const gameMessage = document.getElementById("game-message");
const levelComplete = document.getElementById("level-complete");
const finalScore = document.getElementById("final-score");

const restartButton = document.getElementById("restart-level");


/* =====================================
   2. RESIDUOS DEL JUEGO
===================================== */

// Cada residuo tiene un nombre, un emoji
// y la categoría a la que pertenece.

const wasteData = [
    {
        id: 1,
        name: "Banana peel",
        emoji: "🍌",
        category: "organic"
    },
    {
        id: 2,
        name: "Apple core",
        emoji: "🍎",
        category: "organic"
    },
    {
        id: 3,
        name: "Plastic bottle",
        emoji: "🧴",
        category: "plastic"
    },
    {
        id: 4,
        name: "Plastic bag",
        emoji: "🛍️",
        category: "plastic"
    },
    {
        id: 5,
        name: "Newspaper",
        emoji: "📰",
        category: "paper"
    },
    {
        id: 6,
        name: "Cardboard",
        emoji: "📦",
        category: "paper"
    },
    {
        id: 7,
        name: "Glass jar",
        emoji: "🫙",
        category: "glass"
    },
    {
        id: 8,
        name: "Glass bottle",
        emoji: "🍾",
        category: "glass"
    }
];


/* =====================================
   3. ESTADO DEL JUEGO
===================================== */

let score = 0;
let sortedCount = 0;
let selectedItemId = null;

// Copia que podemos modificar durante la partida.
let currentWaste = [];


/* =====================================
   4. INICIAR O REINICIAR EL NIVEL
===================================== */

function startGame() {
    homeScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    instructionsModal.classList.add("hidden");

    resetLevel();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function resetLevel() {
    score = 0;
    sortedCount = 0;
    selectedItemId = null;

    // Copiamos los residuos originales.
    currentWaste = wasteData.map(item => ({
        ...item,
        sorted: false
    }));

    scoreElement.textContent = score;
    sortedCountElement.textContent = "0 / " + wasteData.length;

    levelComplete.classList.add("hidden");

    gameMessage.textContent =
        "Let's recycle and protect the planet!";

    gameMessage.className = "game-message";

    renderWaste();
    updateBinCounts();
}


/* =====================================
   5. MOSTRAR LOS RESIDUOS
===================================== */

function renderWaste() {
    wasteItemsContainer.innerHTML = "";

    currentWaste.forEach(item => {
        // Los residuos ya clasificados no aparecen.
        if (item.sorted) {
            return;
        }

        const wasteButton = document.createElement("button");

        wasteButton.type = "button";
        wasteButton.className = "waste-item";
        wasteButton.draggable = true;

        wasteButton.dataset.id = item.id;

        wasteButton.setAttribute(
            "aria-label",
            item.name
        );

        wasteButton.innerHTML = `
            <span class="waste-emoji">${item.emoji}</span>
            <span>${item.name}</span>
        `;

        // Seleccionar un residuo con un clic.
        wasteButton.addEventListener("click", () => {
            selectWaste(item.id);
        });

        // Permitir arrastrar el residuo.
        wasteButton.addEventListener("dragstart", event => {
            selectedItemId = item.id;

            event.dataTransfer.setData(
                "text/plain",
                String(item.id)
            );

            event.dataTransfer.effectAllowed = "move";

            wasteButton.classList.add("dragging");
        });

        wasteButton.addEventListener("dragend", () => {
            wasteButton.classList.remove("dragging");
        });

        if (selectedItemId === item.id) {
            wasteButton.classList.add("selected");
        }

        wasteItemsContainer.appendChild(wasteButton);
    });
}


/* =====================================
   6. SELECCIONAR UN RESIDUO
===================================== */

function selectWaste(itemId) {
    selectedItemId = itemId;

    renderWaste();

    const item = currentWaste.find(
        waste => waste.id === itemId
    );

    if (item) {
        gameMessage.textContent =
            item.emoji + " " + item.name +
            " selected! Now choose a bin.";

        gameMessage.className = "game-message";
    }
}


/* =====================================
   7. COMPROBAR LA RESPUESTA
===================================== */

function sortWaste(itemId, binCategory) {
    const item = currentWaste.find(
        waste => waste.id === Number(itemId)
    );

    // Evitar clasificar un residuo inexistente
    // o que ya fue clasificado.
    if (!item || item.sorted) {
        return;
    }

    // Respuesta incorrecta.
    if (item.category !== binCategory) {
        gameMessage.textContent =
            "❌ Not quite! Try another bin for " +
            item.name + ".";

        gameMessage.className = "game-message error";

        return;
    }

    // Respuesta correcta.
    item.sorted = true;

    score += 10;
    sortedCount++;

    selectedItemId = null;

    scoreElement.textContent = score;

    sortedCountElement.textContent =
        sortedCount + " / " + wasteData.length;

    gameMessage.textContent =
        "✅ Great job! " + item.name +
        " goes in the " + binCategory.toUpperCase() +
        " bin. +10 points!";

    gameMessage.className = "game-message success";

    renderWaste();
    updateBinCounts();

    // Comprobar si terminó el nivel.
    if (sortedCount === wasteData.length) {
        finishLevel();
    }
}


/* =====================================
   8. CONTADORES DE LOS CONTENEDORES
===================================== */

function updateBinCounts() {
    const bins = document.querySelectorAll(".recycling-bin");

    bins.forEach(bin => {
        const category = bin.dataset.category;

        const count = currentWaste.filter(item => {
            return item.sorted && item.category === category;
        }).length;

        const countLabel = bin.querySelector(".bin-count");

        countLabel.textContent =
            count + (count === 1 ? " item" : " items");
    });
}


/* =====================================
   9. TERMINAR EL NIVEL
===================================== */

function finishLevel() {
    levelComplete.classList.remove("hidden");

    finalScore.textContent =
        "Your final score is " + score +
        " out of " + (wasteData.length * 10) + " points!";

    gameMessage.textContent =
        "🌎 Amazing! You sorted all the waste!";

    gameMessage.className = "game-message success";

    levelComplete.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


/* =====================================
   10. HACER FUNCIONAR LOS CONTENEDORES
===================================== */

const bins = document.querySelectorAll(".recycling-bin");

bins.forEach(bin => {
    const category = bin.dataset.category;

    // Soltar un residuo arrastrado.
    bin.addEventListener("dragover", event => {
        event.preventDefault();

        bin.classList.add("drag-over");

        event.dataTransfer.dropEffect = "move";
    });

    bin.addEventListener("dragleave", () => {
        bin.classList.remove("drag-over");
    });

    bin.addEventListener("drop", event => {
        event.preventDefault();

        bin.classList.remove("drag-over");

        const itemId = event.dataTransfer.getData(
            "text/plain"
        );

        sortWaste(itemId, category);
    });

    // También se puede seleccionar un residuo
    // y después hacer clic en el contenedor.
    bin.addEventListener("click", () => {
        if (selectedItemId !== null) {
            sortWaste(selectedItemId, category);
        }
    });

    // Accesibilidad: usar Enter o la barra espaciadora.
    bin.addEventListener("keydown", event => {
        if (
            event.key === "Enter" ||
            event.key === " "
        ) {
            event.preventDefault();

            if (selectedItemId !== null) {
                sortWaste(selectedItemId, category);
            }
        }
    });
});


/* =====================================
   11. NAVEGACION
===================================== */

function goHome() {
    gameScreen.classList.add("hidden");
    homeScreen.classList.remove("hidden");
    instructionsModal.classList.add("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function showInstructions() {
    instructionsModal.classList.remove("hidden");
}


function hideInstructions() {
    instructionsModal.classList.add("hidden");
}


startButton.addEventListener("click", startGame);

backButton.addEventListener("click", goHome);

homeLink.addEventListener("click", event => {
    event.preventDefault();
    goHome();
});

instructionsButton.addEventListener(
    "click",
    showInstructions
);

closeModal.addEventListener(
    "click",
    hideInstructions
);

modalStartButton.addEventListener(
    "click",
    startGame
);

restartButton.addEventListener(
    "click",
    resetLevel
);

instructionsModal.addEventListener("click", event => {
    if (event.target === instructionsModal) {
        hideInstructions();
    }
});


/* =====================================
   12. PREPARAR EL NIVEL AL CARGAR
===================================== */

resetLevel();
