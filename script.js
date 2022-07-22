function random(n) {
    return Math.floor(n * Math.random());
}

function swap(array, a, b) {
    let temp = array[a];
    array[a] = array[b];
    array[b] = temp;
    return array
}

function shuffleCards(length) {
    var cards = [];
    for (var i = 0; i < length; i++) {
        cards.push(i);
    }
    for (let i = 0; i < cards.length; i++) {
        swap(cards, i, random(cards.length - 1));
    }
    return cards;
}

function responsiveGameArea(nCards, gameArea) {
    let gameAreaHeight = gameArea.offsetHeight;
    let gameAreaWidth = gameArea.offsetWidth;
    let diviseurs = [];
    for (let i = 1; i <= nCards; i++) {
        if (nCards % i == 0 && i != nCards && i != 1) {
            diviseurs.push(i);
        }
    }
    if (gameAreaWidth < 530) {
        gameArea.style.gridTemplateColumns = "auto ".repeat(2);
        return;
    }
    if (gameAreaWidth < 930) {
        gameArea.style.gridTemplateColumns = "auto ".repeat(3);
        return;
    }
    if (gameAreaHeight > 450) {
        if (diviseurs[diviseurs.length - 1] > 10) {
            gameArea.style.gridTemplateColumns = "auto ".repeat(diviseurs[diviseurs.length - 3]);
        } else {
            gameArea.style.gridTemplateColumns = "auto ".repeat(diviseurs[diviseurs.length - 2]);
        }
    } else {
        if (diviseurs[diviseurs.length - 1] > 10) {
            gameArea.style.gridTemplateColumns = "auto ".repeat(diviseurs[diviseurs.length - 2]);
        } else {
            gameArea.style.gridTemplateColumns = "auto ".repeat(diviseurs[diviseurs.length - 1]);
        }
    }
}

function selectImages(nCards, images) {
    let nImages = nCards / 2;
    let selectedImages = [];
    for (let i = 0; i < nImages; i++) {
        let random = Math.floor(Math.random() * images.length);
        selectedImages.push(images[random]);
        images.splice(random, 1);
    }
    return selectedImages;
}

function createCards(selectedImages, nCards) {
    let shuffledCards = shuffleCards(nCards);
    let nImages = nCards / 2;
    let k = 0;
    for (let i = 0; i < nImages; i++) {
        for (let j = 0; j < 2; j++) {
            let card = document.createElement("div");
            let img = document.createElement("img");
            card.classList.add("card");
            img.src = selectedImages[i];
            card.appendChild(img);
            card.addEventListener('click', function () {
                if (card.classList.contains('flip')) {
                    card.classList.remove('flip');
                    card.classList.add('flipBack');
                } else {
                    card.classList.add('flip');
                    card.classList.remove('flipBack');
                }
            });
            card.style.opacity = "0";
            shuffledCards[shuffledCards.indexOf(k)] = card;
            k++;
        }
    }
    return shuffledCards;
}

function positionDeck(gameArea, nCards) {
    let cardWidth = document.getElementsByClassName("card")[0].offsetWidth;
    let cardHeight = document.getElementsByClassName("card")[0].offsetHeight;

    for (let i = 0; i < nCards; i++) {
        let card = document.createElement("div");
        card.classList.add("card");
        card.classList.add("shuffle");
        card.style.width = cardWidth + "px";
        card.style.height = cardHeight + "px";
        card.style.position = "absolute";
        card.style.left = (gameArea.offsetWidth - cardWidth) / 2 + "px";
        card.style.top = (gameArea.offsetHeight - cardHeight) / 2 + "px";
        card.style.transform = "translate(50%, 50%)";
        gameArea.appendChild(card);
    }
}

function animateShuffle(shuffledCards, nCards) {
    let absoluteCards = document.getElementsByClassName("shuffle");
    let i = 0;

    let interval = setInterval(function () {
        let shuffledCard = shuffledCards[i];
        let shuffledCardX = shuffledCard.offsetLeft;
        let shuffledCardY = shuffledCard.offsetTop;
        absoluteCards[i].style.transform = "none";

        absoluteCards[i].style.left = shuffledCardX + "px";
        absoluteCards[i].style.top = shuffledCardY + "px";

        i++;
        if (i == nCards) {
            setTimeout(() => {
                for (let j = 0; j < nCards; j++) {
                    absoluteCards[j].style.display = "none";
                    shuffledCards[j].style.opacity = "1";
                }
            }, 350);

            clearInterval(interval);
        }
    }, 100);
}