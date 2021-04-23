const url = "http://numbersapi.com/";
const numField = document.querySelector("#fav-num");
const button = document.querySelector("#form-submit");
const numFact = document.querySelector("#num-fact");
const factsList = document.querySelector("#facts-list");

button.addEventListener("click", async function (e) {
    e.preventDefault();
    const num = parseInt(numField.value);
    const num2 = num * 2;
    const num3 = num * 3;
    const num4 = num * 4;
    let res = await axios.get(
        url + `${num},${num2},${num3},${num4}/trivia?json`
    );
    for (number in res.data) {
        numFact.innerHTML += `Number: ${number}, Fact: ${res.data[number]} <br>`;
    }

    let fourFactsPromises = [];

    for (let i = 1; i < 5; i++) {
        fourFactsPromises.push(axios.get(url + `${num}/trivia?json`));
    }

    Promise.all(fourFactsPromises).then((factsArr) => {
        factsArr.forEach(
            (p) =>
                (factsList.innerHTML += `<li class="facts__list__item">${p.data.text}</li>`)
        );
    });
});
