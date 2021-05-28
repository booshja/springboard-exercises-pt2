import { choice, remove } from "./helpers";
import foods from "./foods";

const randoFruit = choice(foods);

console.log(`I'd like one ${randoFruit}, please.`);
console.log(`Here you go: ${randoFruit}`);
console.log("Delicious! May I have another?");

const removed = remove(foods, randoFruit);

console.log(`I'm sorry, we're all out. We have ${removed.length} left.`);
