/** Textual markov chain generator */

class MarkovMachine {
    /** build markov machine; read in text.*/

    constructor(text) {
        let words = text.split(/[ \r\n]+/);
        this.words = words.filter((c) => c !== "");
        this.chains = {};
        this.makeChains();
    }

    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

    makeChains() {
        let idx = 0;
        for (let word of this.words) {
            this.chains[word] = [];
        }
        for (let word of this.words) {
            if (this.words[idx + 1]) {
                this.chains[word].push(this.words[idx + 1]);
                idx += 1;
            } else {
                this.chains[word].push(null);
            }
        }
        return this.chains;
    }

    /** return random text from chains */

    makeText(numWords = 100) {
        let keys = Object.keys(this.chains);
        let key = keys[Math.floor(Math.random() * keys.length)];
        let text = [];

        while (text.length < numWords && key !== null) {
            text.push(key);
            key = this.chains[key][
                Math.floor(Math.random() * this.chains[key].length)
            ];
        }
        return text.join(" ");
    }
}

module.exports = {
    MarkovMachine,
};
