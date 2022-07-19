class MemoryGame {
    constructor(images, blank) {
        this.images = images;
        this.blank = blank;
        this.cards = shuffleCards(this.images.length);
    }
    build(div) {
        for (let i = 0; i < this.cards.length; i++) {
            div.innerHTML += '<div onclick=clickCard(this,' + i + ',' + this.cards[i] + ',' + this.cards.length + ')><img id="card-' + i + '" src=' + this.blank + '></div>';
        }
    }
}

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
        cards.push(i);
    }
    for (let i = 0; i < cards.length; i++) {
        swap(cards, i, random(cards.length - 1));
    }
    return cards;
}

function clickCard(div, index, card, nbCards) {
    if (typeof allReturned[index] === 'undefined') {
        div.classList.add('flip');
        let img = div.firstChild;
        img.src = '/cards/card' + (card + 1) + '.png';
        returned[index] = card;
        if (Object.keys(returned).length >= 2) {
            let indexs = Object.keys(returned);
            let values = Object.values(returned);
            if (values[0] != values[1]) {
                setTimeout(() => {
                    for (let i = 0; i < indexs.length; i++) {
                        let card2 = document.getElementById('card-' + indexs[i]);
                        card2.src = '/cards/blank.png';
                        card2.parentElement.classList.remove('flip');
                    }
                }, 500);
            } else {
                for (let i = 0; i < indexs.length; i++) {
                    allReturned[indexs[i]] = values[i];
                }
            }
            returned = {};
            if (allReturned.length == nbCards) {
                let body = document.querySelector('body');
                body.innerHTML = '<h3>GAGNÉ!</h3>';
            }
        }
    }
}

var returned = {};
var allReturned = {};