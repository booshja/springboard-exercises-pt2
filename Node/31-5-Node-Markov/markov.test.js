const { MarkovMachine } = require("./markov");

describe("testing markov machine", function () {
    let newPhrase;
    beforeEach(() => (newPhrase = new MarkovMachine("the cat in the hat")));

    test("makes a correct map", function () {
        expect(newPhrase.chains).toEqual({
            the: ["cat", "hat"],
            cat: ["in"],
            in: ["the"],
            hat: [null],
        });
    });

    test("finds correct last word", function () {
        expect(newPhrase.chains["hat"]).toEqual([null]);
    });

    test("result is less than or equal to length of numWords", function () {
        expect(newPhrase.makeText(20).split(" ").length).toBeLessThanOrEqual(
            20
        );
        expect(newPhrase.makeText(5).split(" ").length).toBeLessThanOrEqual(5);
        expect(newPhrase.makeText().split(" ").length).toBeLessThanOrEqual(100);
    });

    test("makeText returns a string", function () {
        expect(typeof newPhrase.makeText()).toEqual(expect.any(String));
    });
});
