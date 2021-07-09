function curriedAdd(total) {
    if (total === undefined) return 0;
    return function curry(num) {
        if (num === undefined) return total;
        total += num;
        return curry;
    };
}

module.exports = { curriedAdd };
