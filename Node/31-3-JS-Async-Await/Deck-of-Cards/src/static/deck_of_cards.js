const url = "https://deckofcardsapi.com/api/deck";
const gimmeBtn = document.querySelector("#gimme");
const cardDisplay = document.querySelector("#card-container");
let deckIdUrl = null;
let deckID = null;

gimmeBtn.addEventListener("click", async function (e) {
    e.preventDefault();
    if (!deckID) {
        let res = await axios.get(url + "/new/draw");
        deckID = res.data.deck_id;
        deckIdUrl = url + "/" + deckID;
        cardDiv = createCard(res.data.cards[0]);
        cardDiv.style.zIndex = "0";
        cardDisplay.appendChild(cardDiv);
    } else {
        let res = await axios.get(deckIdUrl + "/draw/?count=1");
        cardDiv = createCard(res.data.cards[0]);
        zIndex = (51 - res.data.remaining).toString();
        cardDiv.style.zIndex = zIndex;
        cardDisplay.appendChild(cardDiv);
        if (res.data.remaining == 0) {
            gimmeBtn.style.display = "none";
        }
    }
});

function degrees() {
    return Math.floor(Math.random() * 90 + -45);
}

function createCard(cardObj) {
    cardImage = cardObj.image;
    transform = degrees();
    cardDiv = document.createElement("span");
    cardDiv.style.backgroundImage = `url("${cardImage}")`;
    cardDiv.style.transform = `rotate(${transform}deg)`;
    cardDiv.className = "card-cont__card";
    return cardDiv;
}
