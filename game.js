
'use strict';

// ============================================================
// 1. ELEMENTOS DEL HTML
// ============================================================

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const homeScreen = $('#home-screen');
const levelsSection = $('#levels-section');
const gameScreen = $('#game-screen');
const rankingScreen = $('#ranking-screen');
// Pantalla educativa de reciclaje
const learningScreen = $('#learning-screen');

const registrationOverlay = $('#player-registration');
const registrationForm = $('#registration-form');
const playerNameInput = $('#player-name');
const registrationError = $('#registration-error');

const playerNameDisplay = $('#player-name-display');
const totalScoreDisplay = $('#total-score-display');
const scoreDisplay = $('#score');
const progressDisplay = $('#progress-count');
const gameMessage = $('#game-message');

const levelComplete = $('#level-complete');

const feedbackModal = $('#feedback-modal');
const feedbackCard = $('#feedback-card');
const feedbackIcon = $('#feedback-icon');
const feedbackTitle = $('#feedback-title');
const feedbackMessage = $('#feedback-message');
const feedbackPoints = $('#feedback-points');
const feedbackContinue = $('#feedback-continue');

const STORAGE_KEY = 'ecoQuestRankingV1';

const POINTS = {
    sorting: 10,
    quiz: 10,
    challenge: 20
};

// ============================================================
// 2. DATOS DEL NIVEL 1: CLASIFICACIÓN DE RESIDUOS
// ============================================================

const wasteData = [
    {
        id: 1,
        name: 'Banana peel',
        emoji: '🍌',
        category: 'organic',
        explanation: 'A banana peel is food waste and belongs in the organic waste container.'
    },
    {
        id: 2,
        name: 'Apple core',
        emoji: '🍎',
        category: 'organic',
        explanation: 'An apple core is biodegradable food waste.'
    },
    {
        id: 3,
        name: 'Carrot',
        emoji: '🥕',
        category: 'organic',
        explanation: 'Vegetable scraps belong in the organic waste container.'
    },
    {
        id: 4,
        name: 'Plastic bottle',
        emoji: '🧴',
        category: 'plastic',
        explanation: 'A clean plastic bottle belongs with plastic recyclables when accepted locally.'
    },
    {
        id: 5,
        name: 'Plastic cup',
        emoji: '🥤',
        category: 'plastic',
        explanation: 'This cup is plastic. Check local recycling rules and empty it first.'
    },
    {
        id: 6,
        name: 'Plastic container',
        emoji: '🥡',
        category: 'plastic',
        explanation: 'A clean plastic container can be recycled where accepted.'
    },
    {
        id: 7,
        name: 'Newspaper',
        emoji: '📰',
        category: 'paper',
        explanation: 'Dry newspapers belong with paper recyclables.'
    },
    {
        id: 8,
        name: 'Cardboard box',
        emoji: '📦',
        category: 'paper',
        explanation: 'Clean, dry cardboard can be recycled with paper.'
    },
    {
        id: 9,
        name: 'Glass bottle',
        emoji: '🍾',
        category: 'glass',
        explanation: 'Glass bottles belong in the glass recycling container.'
    },
    {
        id: 10,
        name: 'Glass jar',
        emoji: '🫙',
        category: 'glass',
        explanation: 'Glass jars belong with glass recyclables where accepted.'
    }
];

// ============================================================
// 3. DATOS DEL NIVEL 2: CUESTIONARIO
// ============================================================

const quizQuestions = [
    {
        type: 'truefalse',
        question: 'Recycling paper can help save trees.',
        answer: true,
        explanation: 'Correct! Recycling paper can reduce the need for new raw materials and help conserve trees.'
    },
    {
        type: 'multiple',
        question: 'Which item is usually recyclable as paper?',
        options: [
            'A greasy pizza box',
            'A clean cardboard box',
            'A used tissue'
        ],
        answer: 1,
        explanation: 'Clean, dry cardboard is usually recyclable. Greasy or food-soiled paper may not be accepted.'
    },
    {
        type: 'truefalse',
        question: 'Plastic should always be thrown into the organic waste bin.',
        answer: false,
        explanation: 'Plastic is not organic food waste. Sort it according to local recycling rules.'
    },
    {
        type: 'multiple',
        question: 'What should you do before recycling a bottle?',
        options: [
            'Leave liquid inside',
            'Empty it and follow local rules',
            'Put food inside'
        ],
        answer: 1,
        explanation: 'Empty containers and follow the recycling guidance in your area.'
    },
    {
        type: 'truefalse',
        question: 'Reusing a bag can help reduce waste.',
        answer: true,
        explanation: 'Correct! Reusing bags means fewer single-use bags are needed.'
    },
    {
        type: 'multiple',
        question: 'Which is an example of organic waste?',
        options: [
            'Banana peel',
            'Glass jar',
            'Plastic bottle'
        ],
        answer: 0,
        explanation: 'A banana peel is food waste and can go in an organic collection where available.'
    },
    {
        type: 'truefalse',
        question: 'All types of waste belong in the same bin.',
        answer: false,
        explanation: 'Different materials need to be sorted. Follow the waste collection system in your area.'
    },
    {
        type: 'multiple',
        question: 'Which item is made of glass?',
        options: [
            'Newspaper',
            'Glass jar',
            'Cardboard box'
        ],
        answer: 1,
        explanation: 'A glass jar belongs with glass recyclables where accepted.'
    },
    {
        type: 'truefalse',
        question: 'Reducing waste is one way to protect the planet.',
        answer: true,
        explanation: 'Correct! Using less and reusing items can reduce the waste we create.'
    },
    {
        type: 'multiple',
        question: 'What is a good recycling habit?',
        options: [
            'Mix food into paper',
            'Throw batteries in any bin',
            'Sort items by material'
        ],
        answer: 2,
        explanation: 'Sorting materials correctly helps recycling work better. Batteries need designated collection.'
    }
];

// ============================================================
// 4. DATOS DEL NIVEL 3: RETOS ECOLÓGICOS
// ============================================================

const ecoChallenges = [
    {
        title: 'The School Lunch',
        description: 'You finish lunch and have a banana peel and a clean plastic bottle. What is the best action?',
        options: [
            'Put both in the same bin',
            'Sort the peel as organic and the bottle as plastic',
            'Leave them on the table'
        ],
        answer: 1,
        explanation: 'Separate the food scrap from the plastic bottle so each can be handled correctly.'
    },
    {
        title: 'Save Water',
        description: 'You are brushing your teeth. What should you do?',
        options: [
            'Leave the tap running',
            'Turn off the tap while brushing',
            'Use more water for fun'
        ],
        answer: 1,
        explanation: 'Turning off the tap while brushing helps save water.'
    },
    {
        title: 'Reusable Choice',
        description: 'You are going shopping. Which option can reduce single-use waste?',
        options: [
            'Bring a reusable bag',
            'Ask for several plastic bags',
            'Take a new bag for every item'
        ],
        answer: 0,
        explanation: 'A reusable bag can be used many times and reduces the need for disposable bags.'
    },
    {
        title: 'Lights Out',
        description: 'You leave an empty room. What is the eco-friendly choice?',
        options: [
            'Leave every light on',
            'Turn off the lights',
            'Turn on more lights'
        ],
        answer: 1,
        explanation: 'Switching off lights when they are not needed saves electricity.'
    },
    {
        title: 'Community Cleanup',
        description: 'You see litter in a park. What is the safest helpful action?',
        options: [
            'Ignore every piece',
            'Pick up sharp waste with bare hands',
            'Tell an adult and safely sort ordinary litter'
        ],
        answer: 2,
        explanation: 'Never handle sharp or dangerous waste with bare hands. Ask for help and sort safe litter correctly.'
    }
];

// ============================================================
// 5. ESTADO GENERAL DEL JUEGO
// ============================================================

let playerName = '';

let currentLevel = 1;
let totalScore = 0;

let completedLevels = [];
let unlockedLevel = 1;

let startTime = 0;
let elapsedSeconds = 0;
let timerInterval = null;

let feedbackAction = null;

// Nivel 1
let selectedWasteId = null;
let sortedCount = 0;

let binCounts = {
    organic: 0,
    plastic: 0,
    paper: 0,
    glass: 0
};

// Nivel 2
let quizIndex = 0;
let quizAnswered = false;

// Nivel 3
let challengeIndex = 0;
let selectedChallengeAnswer = null;
let challengeAnswered = false;

// ============================================================
// 6. FUNCIONES GENERALES
// ============================================================

function show(element) {
    if (element) {
        element.classList.remove('hidden');
    }
}

function hide(element) {
    if (element) {
        element.classList.add('hidden');
    }
}

function setMessage(message) {
    gameMessage.textContent = message;
}

function updateScore() {
    scoreDisplay.textContent = String(totalScore);
    totalScoreDisplay.textContent = String(totalScore);
}

function addPoints(points) {
    totalScore += points;
    updateScore();
}

function updateProgress(current, total) {
    progressDisplay.textContent = `${current} / ${total}`;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60)
        .toString()
        .padStart(2, '0');

    const remainingSeconds = (seconds % 60)
        .toString()
        .padStart(2, '0');

    return `${minutes}:${remainingSeconds}`;
}

// ============================================================
// 7. CRONÓMETRO
// ============================================================

function startTimer() {
    stopTimer();

    startTime = Date.now();
    elapsedSeconds = 0;

    timerInterval = setInterval(() => {
        elapsedSeconds = Math.floor(
            (Date.now() - startTime) / 1000
        );

        const timeElement = $('#ranking-time');

        if (timeElement) {
            timeElement.textContent = formatTime(elapsedSeconds);
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    if (startTime) {
        elapsedSeconds = Math.floor(
            (Date.now() - startTime) / 1000
        );
    }

    return elapsedSeconds;
}

// ============================================================
// 8. VENTANAS EMERGENTES DE RESPUESTAS
// ============================================================

function openFeedback({
    correct,
    title,
    message,
    points = 0,
    action = null
}) {
    feedbackAction = action;

    feedbackCard.classList.toggle('correct', correct);
    feedbackCard.classList.toggle('incorrect', !correct);

    feedbackIcon.textContent = correct ? '🌟' : '❌';
    feedbackTitle.textContent = title;
    feedbackMessage.textContent = message;

    feedbackPoints.textContent = correct
        ? `+${points} points!`
        : 'No points this time.';

    show(feedbackModal);
    feedbackContinue.focus();
}

function closeFeedback() {
    hide(feedbackModal);

    const action = feedbackAction;
    feedbackAction = null;

    if (typeof action === 'function') {
        action();
    }
}

feedbackContinue.addEventListener('click', closeFeedback);

// ============================================================
// 9. REGISTRO DEL JUGADOR
// ============================================================

function showRegistration() {
    registrationError.classList.add('hidden');

    show(registrationOverlay);

    playerNameInput.value = playerName;

    setTimeout(() => {
        playerNameInput.focus();
    }, 50);
}

registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const enteredName = playerNameInput.value
        .trim()
        .replace(/\s+/g, ' ');

    if (!enteredName) {
        show(registrationError);
        playerNameInput.focus();
        return;
    }

    playerName = enteredName.slice(0, 20);

    playerNameDisplay.textContent = playerName;

    hide(registrationOverlay);

    beginAdventure();
});

// ============================================================
// 10. INICIAR UNA NUEVA AVENTURA
// ============================================================

function beginAdventure() {
    totalScore = 0;

    currentLevel = 1;

    completedLevels = [];
    unlockedLevel = 1;

    updateScore();
    updateLevelButtons();

    startTimer();

    openGame(1);
}

// ============================================================
// 11. ABRIR NIVELES EN ORDEN
// ============================================================

function openGame(level) {
    // No se puede saltar un nivel bloqueado.
    if (level !== unlockedLevel || level > 3) {
        return;
    }

    // Si ya se completó, no se permite repetirlo.
    if (completedLevels.includes(level)) {
        return;
    }

    currentLevel = level;

    hide(homeScreen);
    hide(levelsSection);
    hide(rankingScreen);

    show(gameScreen);

    hide(levelComplete);
    hide(feedbackModal);

    hide($('#level-1-content'));
    hide($('#level-2-content'));
    hide($('#level-3-content'));

    show(gameMessage);

    // IMPORTANTE:
    // No reiniciamos totalScore al cambiar de nivel.
    updateScore();

    if (level === 1) {
        $('#current-level-tag').textContent =
            'LEVEL 1 · RECYCLING';

        $('#game-title').textContent =
            'Drag and Drop ♻️';

        $('#game-description').textContent =
            'Sort all 10 items into the correct recycling bins.';

        show($('#level-1-content'));

        startLevel1();

        updateProgress(0, wasteData.length);
    }

    if (level === 2) {
        $('#current-level-tag').textContent =
            'LEVEL 2 · RECYCLING QUIZ';

        $('#game-title').textContent =
            'Recycling Quiz 🧠';

        $('#game-description').textContent =
            'Answer the questions and learn from every explanation.';

        show($('#level-2-content'));

        startLevel2();

        updateProgress(0, quizQuestions.length);
    }

    if (level === 3) {
        $('#current-level-tag').textContent =
            'LEVEL 3 · ECO CHALLENGES';

        $('#game-title').textContent =
            'Eco Challenges 🌎';

        $('#game-description').textContent =
            'Choose the best action for each environmental mission.';

        show($('#level-3-content'));

        startLevel3();

        updateProgress(0, ecoChallenges.length);
    }

    setMessage(`Good luck, ${playerName}!`);

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ============================================================
// 12. NIVEL 1: CLASIFICAR RESIDUOS
// ============================================================

function startLevel1() {
    selectedWasteId = null;
    sortedCount = 0;

    binCounts = {
        organic: 0,
        plastic: 0,
        paper: 0,
        glass: 0
    };

    const shuffledWaste = [...wasteData].sort(
        () => Math.random() - 0.5
    );

    $('#waste-items').innerHTML = '';

    $$('.recycling-bin').forEach((bin) => {
        bin.querySelector('.bin-count').textContent = '0 items';
    });

    shuffledWaste.forEach((item) => {
        const button = document.createElement('button');

        button.type = 'button';
        button.className = 'waste-item';
        button.draggable = true;
        button.dataset.id = String(item.id);

        const emoji = document.createElement('span');
        emoji.className = 'waste-emoji';
        emoji.textContent = item.emoji;

        const name = document.createElement('span');
        name.textContent = item.name;

        button.append(emoji, name);

        button.addEventListener('click', () => {
            selectWaste(item.id);
        });

        button.addEventListener('dragstart', (event) => {
            selectedWasteId = item.id;

            event.dataTransfer.setData(
                'text/plain',
                String(item.id)
            );
        });

        $('#waste-items').appendChild(button);
    });

    $$('.recycling-bin').forEach((bin) => {
        bin.onclick = () => {
            sortSelectedWaste(bin.dataset.category);
        };

        bin.ondragover = (event) => {
            event.preventDefault();
        };

        bin.ondrop = (event) => {
            event.preventDefault();

            const id = Number(
                event.dataTransfer.getData('text/plain')
            );

            if (id) {
                selectedWasteId = id;
            }

            sortSelectedWaste(bin.dataset.category);
        };

        bin.onkeydown = (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();

                sortSelectedWaste(bin.dataset.category);
            }
        };
    });

    updateProgress(0, wasteData.length);
}

function selectWaste(id) {
    selectedWasteId = id;

    $$('.waste-item').forEach((itemElement) => {
        itemElement.classList.toggle(
            'selected',
            Number(itemElement.dataset.id) === id
        );
    });

    const item = wasteData.find(
        (entry) => entry.id === id
    );

    if (item) {
        setMessage(
            `Selected: ${item.name}. Now choose the correct bin.`
        );
    }
}

function sortSelectedWaste(category) {
    if (currentLevel !== 1 || selectedWasteId === null) {
        setMessage('Choose a waste item first.');
        return;
    }

    const item = wasteData.find(
        (entry) => entry.id === selectedWasteId
    );

    if (!item) {
        return;
    }

    const selectedId = selectedWasteId;

    // RESPUESTA CORRECTA
    if (item.category === category) {
        addPoints(POINTS.sorting);

        sortedCount++;
        binCounts[category]++;

        const itemButton = $(
            `.waste-item[data-id="${selectedId}"]`
        );

        if (itemButton) {
            itemButton.remove();
        }

        const bin = $(
            `.recycling-bin[data-category="${category}"]`
        );

        bin.querySelector('.bin-count').textContent =
            `${binCounts[category]} item${binCounts[category] === 1 ? '' : 's'}`;

        selectedWasteId = null;

        updateProgress(sortedCount, wasteData.length);

        openFeedback({
            correct: true,
            title: 'Great sorting! 🌟',
            message: `${item.name} belongs in the ${category} bin. ${item.explanation}`,
            points: POINTS.sorting,

            action: () => {
                if (sortedCount === wasteData.length) {
                    finishLevel();
                } else {
                    setMessage(
                        'Nice work! Select another item to continue.'
                    );
                }
            }
        });

        return;
    }

        // RESPUESTA INCORRECTA
        const itemButton = $(
            `.waste-item[data-id="${selectedId}"]`
        );

        // El residuo desaparece aunque la respuesta sea incorrecta.
        if (itemButton) {
            itemButton.remove();
        }

        // Limpiar la selección.
        selectedWasteId = null;

        $$('.waste-item').forEach((element) => {
            element.classList.remove('selected');
        });

        // Contar el residuo respondido, sin otorgar puntos.
        sortedCount++;

        updateProgress(sortedCount, wasteData.length);

        openFeedback({
            correct: false,
            title: 'Not quite! 🌱',
            message: `${item.name} belongs in the ${item.category} bin. ${item.explanation}`,
            points: 0,

            action: () => {
                if (sortedCount === wasteData.length) {
                    finishLevel();
                } else {
                    setMessage(
                        'Keep going! Select another item to continue.'
                    );
                }
            }
        });
    }

// ============================================================
// 13. NIVEL 2: CUESTIONARIO
// ============================================================

function startLevel2() {
    quizIndex = 0;
    quizAnswered = false;

    renderQuestion();
}

function renderQuestion() {
    const question = quizQuestions[quizIndex];

    quizAnswered = false;

    $('#quiz-question-number').textContent =
        `Question ${quizIndex + 1} of ${quizQuestions.length}`;

    $('#quiz-question-type').textContent =
        question.type === 'truefalse'
            ? 'TRUE OR FALSE'
            : 'MULTIPLE CHOICE';

    $('#quiz-question').textContent = question.question;

    $('#quiz-hint').textContent =
        'Choose your answer. The popup will explain the result.';

    hide($('#quiz-next-button'));

    $('#quiz-true-button').disabled = false;
    $('#quiz-false-button').disabled = false;

    if (question.type === 'truefalse') {
        show($('#quiz-true-false'));
        hide($('#quiz-multiple-choice'));
    } else {
        hide($('#quiz-true-false'));
        show($('#quiz-multiple-choice'));

        $('#quiz-multiple-choice').innerHTML = '';

        question.options.forEach((option, index) => {
            const button = document.createElement('button');

            button.type = 'button';
            button.className = 'btn btn-secondary quiz-option';
            button.textContent = option;

            button.addEventListener('click', () => {
                answerQuiz(index);
            });

            $('#quiz-multiple-choice').appendChild(button);
        });
    }
}

function answerQuiz(answer) {
    if (quizAnswered) {
        return;
    }

    const question = quizQuestions[quizIndex];

    const correct = answer === question.answer;

    quizAnswered = true;

    $('#quiz-true-button').disabled = true;
    $('#quiz-false-button').disabled = true;

    $$('#quiz-multiple-choice button').forEach((button) => {
        button.disabled = true;
    });

    if (correct) {
        addPoints(POINTS.quiz);
    }

    updateProgress(quizIndex + 1, quizQuestions.length);

    openFeedback({
        correct,

        title: correct
            ? 'Correct answer! 🎉'
            : 'Keep learning! 🌱',

        message: question.explanation,

        points: correct ? POINTS.quiz : 0,

        action: () => {
            if (quizIndex === quizQuestions.length - 1) {
                finishLevel();
            } else {
                show($('#quiz-next-button'));
            }
        }
    });
}

$('#quiz-true-button').addEventListener('click', () => {
    answerQuiz(true);
});

$('#quiz-false-button').addEventListener('click', () => {
    answerQuiz(false);
});

$('#quiz-next-button').addEventListener('click', () => {
    if (quizIndex < quizQuestions.length - 1) {
        quizIndex++;
        renderQuestion();
    }
});

// ============================================================
// 14. NIVEL 3: RETOS ECOLÓGICOS
// ============================================================

function startLevel3() {
    challengeIndex = 0;
    selectedChallengeAnswer = null;
    challengeAnswered = false;

    renderChallenge();
}

function renderChallenge() {
    const challenge = ecoChallenges[challengeIndex];

    selectedChallengeAnswer = null;
    challengeAnswered = false;

    $('#challenge-number').textContent =
        `ECO MISSION ${challengeIndex + 1} OF ${ecoChallenges.length}`;

    $('#challenge-title').textContent = challenge.title;

    $('#challenge-description').textContent =
        challenge.description;

    $('#challenge-options').innerHTML = '';

    challenge.options.forEach((option, index) => {
        const button = document.createElement('button');

        button.type = 'button';
        button.className = 'challenge-choice';
        button.textContent = option;

        button.addEventListener('click', () => {
            if (challengeAnswered) {
                return;
            }

            selectedChallengeAnswer = index;

            $$('.challenge-choice').forEach((choice) => {
                choice.classList.toggle(
                    'selected',
                    choice === button
                );
            });

            $('#challenge-submit-button').disabled = false;
        });

        $('#challenge-options').appendChild(button);
    });

    $('#challenge-submit-button').disabled = true;

    show($('#challenge-submit-button'));
    hide($('#challenge-next-button'));

    updateProgress(challengeIndex, ecoChallenges.length);
}

$('#challenge-submit-button').addEventListener('click', () => {
    if (
        selectedChallengeAnswer === null ||
        challengeAnswered
    ) {
        return;
    }

    const challenge = ecoChallenges[challengeIndex];

    const correct =
        selectedChallengeAnswer === challenge.answer;

    challengeAnswered = true;

    $$('.challenge-choice').forEach((button) => {
        button.disabled = true;
    });

    $('#challenge-submit-button').disabled = true;

    if (correct) {
        addPoints(POINTS.challenge);
    }

    updateProgress(
        challengeIndex + 1,
        ecoChallenges.length
    );

    openFeedback({
        correct,

        title: correct
            ? 'Mission accomplished! 🌟'
            : 'Mission learning moment 🌱',

        message: challenge.explanation,

        points: correct ? POINTS.challenge : 0,

        action: () => {
            if (challengeIndex === ecoChallenges.length - 1) {
                finishLevel();
            } else {
                show($('#challenge-next-button'));
            }
        }
    });
});

$('#challenge-next-button').addEventListener('click', () => {
    if (challengeIndex < ecoChallenges.length - 1) {
        challengeIndex++;
        renderChallenge();
    }
});

// ============================================================
// 15. FINALIZAR NIVEL Y DESBLOQUEAR EL SIGUIENTE
// ============================================================

function finishLevel() {
    hide($('#level-1-content'));
    hide($('#level-2-content'));
    hide($('#level-3-content'));

    show(gameMessage);
    show(levelComplete);

    if (!completedLevels.includes(currentLevel)) {
        completedLevels.push(currentLevel);
    }

    // Solo se desbloquea el nivel siguiente.
    unlockedLevel = Math.max(
        unlockedLevel,
        Math.min(4, currentLevel + 1)
    );

    updateLevelButtons();

    if (currentLevel < 3) {
        $('#completion-title').textContent =
            `Level ${currentLevel} Completed! 🏆`;

        $('#completion-message').textContent =
            `Amazing work, ${playerName}! The next level is now unlocked.`;

        $('#next-level-button').textContent =
            'Continue to Next Level →';
    } else {
        $('#completion-title').textContent =
            'Adventure Completed! 🏆';

        $('#completion-message').textContent =
            `Amazing, ${playerName}! You completed all three levels and helped protect the planet.`;

        $('#next-level-button').textContent =
            'View Final Ranking 🏆';
    }

    $('#final-score').textContent =
        `Your total score: ${totalScore} points`;

    $('#return-levels-button').textContent =
        'Return to Home';

    setMessage('Level completed!');
}

function continueAfterLevel() {
    if (currentLevel < 3) {
        openGame(currentLevel + 1);
    } else {
        showFinalRanking();
    }
}

$('#next-level-button').addEventListener(
    'click',
    continueAfterLevel
);

$('#return-levels-button').addEventListener('click', () => {
    goHome();
});

// ============================================================
// 16. BOTONES DE NIVELES
// ============================================================

function updateLevelButtons() {
    const configs = [
        { selector: '#level-1-button', level: 1 },
        { selector: '#level-2-button', level: 2 },
        { selector: '#level-3-button', level: 3 }
    ];

    configs.forEach(({ selector, level }) => {
        const button = $(selector);

        const completed = completedLevels.includes(level);
        const available = level <= unlockedLevel && !completed;

        button.disabled = !available;

        if (completed) {
            button.textContent = `✅ LEVEL ${level} COMPLETED`;
        } else if (available) {
            button.textContent = level === 1
                ? 'START LEVEL 1'
                : `START LEVEL ${level}`;
        } else {
            button.textContent =
                `🔒 COMPLETE LEVEL ${level - 1} FIRST`;
        }
    });
}

// El nivel 1 solicita el registro si aún no hay jugador.
$('#level-1-button').addEventListener('click', () => {
    if (unlockedLevel !== 1 || completedLevels.includes(1)) {
        return;
    }

    if (playerName) {
        beginAdventure();
    } else {
        showRegistration();
    }
});

// Los siguientes niveles solo se abren si están desbloqueados.
$('#level-2-button').addEventListener('click', () => {
    if (unlockedLevel === 2 && !completedLevels.includes(2)) {
        openGame(2);
    }
});

$('#level-3-button').addEventListener('click', () => {
    if (unlockedLevel === 3 && !completedLevels.includes(3)) {
        openGame(3);
    }
});

// ============================================================
// 17. RANKING LOCAL
// ============================================================

function readRanking() {
    try {
        const value = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || '[]'
        );

        return Array.isArray(value) ? value : [];
    } catch (error) {
        console.warn('Could not read the ranking.', error);
        return [];
    }
}

function saveRanking() {
    const seconds = stopTimer();

    const ranking = readRanking();

    ranking.push({
        name: playerName,
        score: totalScore,
        seconds,
        date: new Date().toISOString()
    });

    // Mayor puntaje primero; si empatan, menor tiempo primero.
    ranking.sort((a, b) => {
        return b.score - a.score || a.seconds - b.seconds;
    });

    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(ranking.slice(0, 10))
        );
    } catch (error) {
        console.warn(
            'The ranking could not be saved in this browser.',
            error
        );
    }
}

function renderRanking() {
    const ranking = readRanking();
    const list = $('#ranking-list');

    list.innerHTML = '';

    hide($('#ranking-loading'));

    $('#ranking-total-score').textContent =
        String(totalScore);

    $('#ranking-levels-completed').textContent =
        `${completedLevels.length} / 3`;

    $('#ranking-time').textContent =
        formatTime(elapsedSeconds);

    $('#ranking-player-message').textContent =
        `Congratulations, ${playerName}! You are an Eco Hero.`;

    if (ranking.length === 0) {
        show($('#ranking-empty'));
        return;
    }

    hide($('#ranking-empty'));

    ranking.slice(0, 10).forEach((entry, index) => {
        const item = document.createElement('li');

        const name = document.createElement('span');
        name.textContent = `${index + 1}. ${entry.name}`;

        const score = document.createElement('span');
        score.className = 'rank-score';
        score.textContent = `${entry.score} pts`;

        item.append(name, score);

        list.appendChild(item);
    });
}

function showFinalRanking() {
    saveRanking();

    hide(gameScreen);
    hide(homeScreen);
    hide(levelsSection);

    show(rankingScreen);

    renderRanking();

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ============================================================
// 18. NAVEGACIÓN GENERAL
// ============================================================

function goHome() {
    hide(registrationOverlay);
    hide(feedbackModal);
    hide(rankingScreen);
    hide(levelComplete);
    hide(learningScreen);

    show(homeScreen);
    show(levelsSection);

    updateLevelButtons();

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// START GAME: abrir primero la pantalla educativa
$('#start-button').addEventListener('click', () => {
    hide(homeScreen);
    hide(levelsSection);
    show(learningScreen);

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// BOTÓN: terminar aprendizaje y comenzar aventura
$('#learning-start-button').addEventListener('click', () => {
    hide(learningScreen);
    showRegistration();

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

$('#home-link').addEventListener('click', (event) => {
    event.preventDefault();
    goHome();
});

$('#back-button').addEventListener('click', () => {
    goHome();
});

$('#play-again-button').addEventListener('click', () => {
    playerName = '';

    completedLevels = [];
    unlockedLevel = 1;

    totalScore = 0;

    updateScore();
    updateLevelButtons();

    hide(rankingScreen);
    show(homeScreen);
    show(levelsSection);

    showRegistration();
});

$('#ranking-home-button').addEventListener('click', () => {
    goHome();
});

// ============================================================
// 19. MODAL DE INSTRUCCIONES
// ============================================================

const instructionsModal = $('#instructions-modal');

$('#instructions-button').addEventListener('click', () => {
    show(instructionsModal);
});

$('#close-modal').addEventListener('click', () => {
    hide(instructionsModal);
});

$('#modal-start-button').addEventListener('click', () => {
    hide(instructionsModal);
    hide(homeScreen);
    hide(levelsSection);
    show(learningScreen);

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

instructionsModal.addEventListener('click', (event) => {
    if (event.target === instructionsModal) {
        hide(instructionsModal);
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        if (!feedbackModal.classList.contains('hidden')) {
            return;
        }

        hide(instructionsModal);
    }
});

// ============================================================
// 20. INICIALIZACIÓN
// ============================================================

function initializeGame() {
    updateScore();

    updateLevelButtons();

    updateProgress(0, wasteData.length);

    hide(registrationOverlay);
    hide(feedbackModal);
    hide(rankingScreen);
    hide(levelComplete);

    show(homeScreen);
    show(levelsSection);
}

initializeGame();
