const cardsArray = [
    {
        name: 'hippo',
        icon: '<i class="fa-solid fa-hippo" style="color:gold;"></i>'
    },
    {
        name: 'pow',
        icon: '<i class="fa-solid fa-paw" style="color: gold;"></i>'
    },
    {
        name: 'dog',
        icon: '<i class="fa-solid fa-dog" style="color: gold;"></i>'
    },
    {
        name: 'cow',
        icon: '<i class="fa-solid fa-cow" style="color: gold;"></i>'
    },
    {
        name: 'dragon',
        icon: '<i class="fa-solid fa-dragon" style="color: gold;"></i>'
    },
    {
        name: 'cat',
        icon: '<i class="fa-solid fa-cat" style="color: gold;"></i>'
    },
    {
        name: 'hippo',
        icon: '<i class="fa-solid fa-hippo" style="color: gold;"></i>'
    },
    {
        name: 'pow',
        icon: '<i class="fa-solid fa-paw" style="color: gold;"></i>'
    },
    {
        name: 'dog',
        icon: '<i class="fa-solid fa-dog" style="color: gold;"></i>'
    },
    {
        name: 'cow',
        icon: '<i class="fa-solid fa-cow" style="color: gold;"></i>'
    },
    {
        name: 'dragon',
        icon: '<i class="fa-solid fa-dragon" style="color: gold;"></i>'
    },
    {
        name: 'cat',
        icon: '<i class="fa-solid fa-cat" style="color: gold;"></i>'
    }
];

let flippedCards = [];
let matchedPairs = 0;
let score = 0;

shuffleCards();
const gameBoard = document.getElementById('gameBoard');
displayCards();
updateScore(0);

function shuffleCards() {
    for (let i = cardsArray.length - 1; i >= 0; i--) {
        const randIndex = Math.floor(Math.random() * (i + 1));
        [cardsArray[i], cardsArray[randIndex]] = [cardsArray[randIndex], cardsArray[i]];
    }
}

function displayCards() {
    cardsArray.forEach((curr, index) => {
        const card = document.createElement('div');
        card.setAttribute('id', index);
        card.classList.add('callback', 'active');
        gameBoard.append(card);
        card.addEventListener('click', flipCard);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && this.classList.contains('active')) {
        let cardId = this.getAttribute('id');
        flippedCards.push(this);
        this.classList.remove('callback');
        this.innerHTML = cardsArray[cardId].icon;

        if (flippedCards.length == 2) {
            setTimeout(checkMatch, 900);
        }
    }
}

function checkMatch() {
    const card1Id = flippedCards[0].getAttribute('id');
    const card2Id = flippedCards[1].getAttribute('id');

    if (cardsArray[card1Id].name == cardsArray[card2Id].name) {
        flippedCards[0].style.border = 'none';
        flippedCards[0].style.backgroundColor = 'black';
        flippedCards[0].innerHTML = '';
        flippedCards[0].classList.remove('active');

        flippedCards[1].style.border = 'none';
        flippedCards[1].style.backgroundColor = 'black';
        flippedCards[1].innerHTML = '';
        flippedCards[1].classList.remove('active');

        matchedPairs++;
        updateScore(1); // Increase score for a match
        checkGameOver();
    } else {
        flippedCards[0].innerHTML = '';
        flippedCards[0].classList.add('callback');
        flippedCards[1].innerHTML = '';
        flippedCards[1].classList.add('callback');
        updateScore(0); // Decrease score for a mismatch
    }
    flippedCards = [];
}

function checkGameOver() {
    if (matchedPairs == cardsArray.length / 2) {
        while (gameBoard.firstChild) {
            gameBoard.removeChild(gameBoard.firstChild);
        }
        gameBoard.innerHTML = 'YOU WON';
        gameBoard.classList.remove('game');
        gameBoard.classList.add('won');
    }
}

function updateScore(points) {
    score += points;
    if (score < 0) score = 0; // Ensure score doesn't go negative
    document.getElementById('score').innerText = `SCORE: ${score}`;
}

document.getElementById('restartButton').addEventListener('click', function () {
    location.reload();
});

