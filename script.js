const imgs = [
    'https://i.pinimg.com/564x/e3/25/81/e325810fb89bd45b47768e109f7008cb.jpg',
    'https://i.pinimg.com/564x/86/76/76/8676760d2ea7fa204ad50b71e3ac5ab0.jpg', 
    'https://i.pinimg.com/564x/e4/42/4d/e4424d60b98640c6ed525c59d96b1493.jpg',  
    'https://i.pinimg.com/564x/6e/1f/3d/6e1f3da6e2fc4729a8508129608c20a2.jpg', 
    'https://i.pinimg.com/564x/56/05/2b/56052b47f37b33b7532cb05497e19c01.jpg', 
    'https://i.pinimg.com/564x/f6/b4/97/f6b4971f5e90b39dec561bf89a0d83ac.jpg', 
    'https://i.pinimg.com/564x/4a/18/d1/4a18d188c0b5566d1b2803d3b4ccb8b3.jpg',  
    'https://i.pinimg.com/564x/bb/4e/c6/bb4ec67d148ea48114bf63d6af11fea1.jpg',  
    'https://i.pinimg.com/564x/1e/eb/b5/1eebb5c85d61c5a732b0435752fc77aa.jpg',  
    'https://i.pinimg.com/564x/1f/10/1b/1f101b8cd30d48a6fe2ced2b14492984.jpg',  
    'https://i.pinimg.com/564x/34/4a/b3/344ab34cd67ce064c77d62ea0c5c0361.jpg', 
    'https://i.pinimg.com/564x/8e/bb/b0/8ebbb0e60cac56b1c9c817f15314cc71.jpg', 
    'https://i.pinimg.com/564x/81/34/fc/8134fca7216edfd1c414614ac0f8f5e2.jpg', 
    'https://i.pinimg.com/564x/27/13/a2/2713a2783e54ea3eec0f620b02ee48be.jpg',  
    'https://i.pinimg.com/564x/a9/75/fe/a975fe06f5c4238fe91feb692c271639.jpg', 
    'https://i.pinimg.com/564x/4f/7e/6a/4f7e6ad84a2ffae11b3041056e2b55fd.jpg',
    'https://i.pinimg.com/736x/a9/3c/c7/a93cc766fa3de63320e1cd36ef4fdbdf.jpg',   
    'https://i.pinimg.com/564x/8e/d3/f5/8ed3f596231210855e550fd6175b9a16.jpg',  
    'https://i.pinimg.com/564x/07/32/c2/0732c2b69174ef688552bf01728f70e8.jpg',  
    'https://i.pinimg.com/564x/62/6e/2e/626e2edfcc9b3928eeb3759582b61fb0.jpg',  
    'https://i.pinimg.com/564x/9c/4c/16/9c4c16cb6710ef3a78f098aa9a9d90f7.jpg', 
    'https://i.pinimg.com/564x/12/6b/af/126baf0ae1adf7dbacab4bfdf7ee36cb.jpg',
    'https://i.pinimg.com/564x/81/16/48/81164843f277007cf0f9c51800050726.jpg', 
    'https://i.pinimg.com/564x/10/51/d7/1051d733cb794aa2235b03fc37ff4d10.jpg',
];

function duplicateArrayElements(arr) {
    return arr.flatMap(item => [item, item]);
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

const duplicatedImgs = duplicateArrayElements(imgs);
const shuffledImgs = shuffleArray(duplicatedImgs);

const checkIfMatch = (id1, id2) => {
    const img1 = document.getElementById(id1);
    const img2 = document.getElementById(id2);
    return img1.src === img2.src;
};

const disableCard = (id) => {
    const img = document.getElementById(id);
    img.disabled = true;
    img.classList.add('disabled');
};

const container = document.getElementById('container');
let selectedCardId;
let flippedCards = [];

const handleCardClick = (event) => {
    const clickedCard = event.target;
    const clickedCardId = clickedCard.id;
    
    if (clickedCard.classList.contains('disabled') || flippedCards.includes(clickedCardId)) {
        return;
    }

    clickedCard.style.display = 'block';
    flippedCards.push(clickedCardId);

    if (selectedCardId !== undefined) {
        const selectedCard = document.getElementById(selectedCardId);
        if (checkIfMatch(selectedCardId, clickedCardId)) {
            disableCard(selectedCardId);
            disableCard(clickedCardId);
            if (flippedCards.length === imgs.length) {
                alert('Congratulations! You won!');
            }
        } else {
            setTimeout(() => {
                selectedCard.style.display = 'none';
                clickedCard.style.display = 'none';
                flippedCards = flippedCards.filter(id => id !== selectedCardId && id !== clickedCardId);
                selectedCardId = undefined;

            }, 1000);
        }
        flippedCards = [];
    } else {
        selectedCardId = clickedCardId;
    }
};

for (let i = 0; i < imgs.length; i++) {
    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';
    
    const imgElement = document.createElement('img');
    imgElement.className = 'card-image';
    imgElement.src = shuffledImgs[i];
    imgElement.id = i;
    imgElement.style.display = 'none';

    imgElement.addEventListener('click', handleCardClick);

    cardContainer.appendChild(imgElement);
    container.appendChild(cardContainer);
}


// תיבת טופס להזנת שם המשתמש וכמות הקלפים
const playerName = prompt('Please enter your name:');
let numOfPairs = parseInt(prompt('Please enter the number of pairs (maximum 30):'));

// אימות כמות הקלפים
if (isNaN(numOfPairs) || numOfPairs < 1 || numOfPairs > 30) {
    numOfPairs = 10; // ערך ברירת מחדל במקרה של קלט שגוי
}

// יצירת המשחק עם מספר הקלפים שהמשתמש הזין
const imgsSubset = shuffledImgs.slice(0, numOfPairs);

// בניית הלוח על פי מספר הקלפים
const numRows = Math.ceil(numOfPairs / 5); // חמישה קלפים בכל שורה
container.style.gridTemplateRows = `repeat(${numRows}, 1fr)`; // בניית שורות באורך משתנה

// הצגת שם השחקן
const playerNameElement = document.createElement('div');
playerNameElement.textContent = `Player: ${playerName}`;
container.parentNode.insertBefore(playerNameElement, container);

// ניקוי הלוח והתחלת השעון
let startTime;
const timerElement = document.createElement('div');
container.parentNode.insertBefore(timerElement, container);

// פונקציה להצגת שעון המשחק
function startTimer() {
    startTime = Date.now();
    setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        timerElement.textContent = `Time: ${elapsedTime} seconds`;
    }, 1000);
}

// הפונקציה של הקלפים נשארת כמו שהיא

// הצגת הקלפים וטיפול בלחיצות עליהם נשארת כמו שהיא

// בדוק האם המשחק נגמר והצג תודה לשחקן
function checkGameEnd() {
    const disabledCards = document.querySelectorAll('.disabled');
    if (disabledCards.length === numOfPairs * 2) {
        const endTime = Math.floor((Date.now() - startTime) / 1000);
        alert(`Congratulations, ${playerName}! You completed the game in ${endTime} seconds.`);
        const playAgain = confirm('Do you want to play again?');
        if (playAgain) {
            window.location.reload(); // טעינת הדף מחדש למשחק חדש
        }
    }
}

// הפונקציה handleCardClick והלולאה לבניית הלוח נשארות כמו שהן

// הוספת קריאה לפונקציה להתחלת השעון
startTimer();
