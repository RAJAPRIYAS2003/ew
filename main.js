/* header toogle */
$(document).ready(function(){
    $('#menubtn').click(function(){
        $('ul').toggleClass('show');
        this.classList.toggle('fa-xmark')
    });
});




///////////////////////////////////////////////////navbar
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    let scrolled = false;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50 && !scrolled) { // Change 50 to the height where you want the effect to start
            navbar.classList.add('scrolled');
            scrolled = true;
        } else if (window.scrollY <= 50 && scrolled) {
            navbar.classList.remove('scrolled');
            scrolled = false;
        }
    });
});


window.addEventListener('scroll', function() {
    console.log('Window scrolled'); // Debugging line
    // ... rest of the code ...
});




////////////////////////////////////////////////////////card
const cardData = [
    { title: 'Real Car Driving', content: 'Real Car Driving:Race City 3D', imageUrl: 'https://img1.wallspic.com/previews/4/0/5/7/7/177504/177504-race_car-ferrari-cars-sports_car-ferrari_f8-x750.jpg' },
    { title: 'Care Race 3D', content: 'Care Race 3D:Car Racing', imageUrl: 'https://img2.wallspic.com/crops/6/0/8/3/6/163806/163806-need_for_speed_heat-need_for_speed-need_for_speed_payback-need_for_speed_hot_pursuit-electronic_arts-720x1280.jpg' },
    { title: 'Police Chase Car Game', content: 'Police Chase Car Game:Race City 3D', imageUrl: 'https://img2.wallspic.com/crops/5/2/2/9/2/129225/129225-need_for_speed_payback-need_for_speed-video_games-car-coup-720x1280.jpg' },
    { title: 'Driver Zone Online', content: 'Driver Zone Online:Car Game', imageUrl: 'https://img3.wallspic.com/previews/3/3/9/9/6/169933/169933-cars-car-sports_car-ferrari_f12-luxury_car-x750.jpg' }
];

// Function to create a card
function createCard(title, content, imageUrl) {
    const card = document.createElement('div');
    card.className = 'card';

    const cardImage = document.createElement('img');
    cardImage.src = imageUrl;
    cardImage.alt = title;

    const hoverContent = document.createElement('div');
    hoverContent.className = 'hover-content';

    const cardTitle = document.createElement('h2');
    cardTitle.textContent = title;

    const cardContent = document.createElement('p');
    cardContent.textContent = content;

    const actionButton = document.createElement('button');
    actionButton.textContent = 'Play Now';
    actionButton.addEventListener('click', () => {
        alert(`Clicked on ${title} card!`);
    });

    hoverContent.appendChild(cardTitle);
    hoverContent.appendChild(cardContent);
    hoverContent.appendChild(actionButton);

    card.appendChild(cardImage);
    card.appendChild(hoverContent);

    return card;
}

// Populate cards
const cardContainer = document.getElementById('cardContainer');

cardData.forEach(data => {
    const card = createCard(data.title, data.content, data.imageUrl);
    cardContainer.appendChild(card);
});










//////////////////////////////////////////////carrd-carousel
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const cards = document.querySelectorAll('.card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth;
    const totalCards = cards.length;

    function moveCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalCards - 1) {
            currentIndex++;
            moveCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            moveCarousel();
        }
    });
});









/////////////////////////////////////////////puzzle game
const puzzleContainer = document.getElementById("puzzle-container");
const imageSrc = "https://source.unsplash.com/random/300x300"; // You can replace this with your image URL
const imageSize = 300;

// Create puzzle pieces
for (let i = 0; i < 9; i++) {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.style.backgroundImage = `url(${imageSrc})`;
    piece.style.backgroundPosition = `${-i % 3 * (imageSize / 3)}px ${-Math.floor(i / 3) * (imageSize / 3)}px`;
    piece.style.width = `${imageSize / 3}px`;
    piece.style.height = `${imageSize / 3}px`;
    puzzleContainer.appendChild(piece);
}

const pieces = Array.from(puzzleContainer.children);

// Shuffle puzzle pieces
function shuffle() {
    for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        puzzleContainer.insertBefore(pieces[j], pieces[i]);
    }
}

// Check if the puzzle is solved
function checkWin() {
    for (let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];
        const row = Math.floor(i / 3);
        const col = i % 3;
        const expectedPositionX = col * (imageSize / 3);
        const expectedPositionY = row * (imageSize / 3);
        const currentPositionX = parseInt(piece.style.backgroundPositionX);
        const currentPositionY = parseInt(piece.style.backgroundPositionY);
        
        if (currentPositionX !== expectedPositionX || currentPositionY !== expectedPositionY) {
            return false;
        }
    }
    return true;
}

// Add click event listeners to each piece
pieces.forEach(piece => {
    piece.addEventListener("click", function() {
        const emptyPiece = document.querySelector(".piece:empty");
        if (isAdjacent(piece, emptyPiece)) {
            const tempBackgroundPosition = piece.style.backgroundPosition;
            piece.style.backgroundPosition = emptyPiece.style.backgroundPosition;
            emptyPiece.style.backgroundPosition = tempBackgroundPosition;
        }

        if (checkWin()) {
            alert("Congratulations! You solved the puzzle!");
        }
    });
});

// Check if two pieces are adjacent
function isAdjacent(piece1, piece2) {
    const index1 = pieces.indexOf(piece1);
    const index2 = pieces.indexOf(piece2);

    const row1 = Math.floor(index1 / 3);
    const col1 = index1 % 3;
    const row2 = Math.floor(index2 / 3);
    const col2 = index2 % 3;

    return (Math.abs(row1 - row2) === 1 && col1 === col2) ||
           (Math.abs(col1 - col2) === 1 && row1 === row2);
}








////////////////////////////////////////////////////////tic toe tie game
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
const messageElement = document.getElementById('message');

function makeMove(cellIndex) {
    if (board[cellIndex] === '' && gameActive) {
        board[cellIndex] = currentPlayer;
        document.getElementsByClassName('cell')[cellIndex].innerText = currentPlayer;
        
        if (checkWin() || checkDraw()) {
            gameActive = false;
            messageElement.innerText = `${currentPlayer} wins!`;
            return;
        }
        
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        messageElement.innerText = `${currentPlayer}'s turn`;
    }
}

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    return winConditions.some((condition) => {
        return board[condition[0]] !== '' && 
               board[condition[0]] === board[condition[1]] && 
               board[condition[1]] === board[condition[2]];
    });
}

function checkDraw() {
    return !board.includes('');
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    messageElement.innerText = '';
    
    const cells = document.getElementsByClassName('cell');
    Array.from(cells).forEach((cell) => {
        cell.innerText = '';
    });
}






///////////////////////////////////////////////////////contact
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...

    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Message sent! We will get back to you soon.');
        contactForm.reset();
    });

    // ... existing code ...
});