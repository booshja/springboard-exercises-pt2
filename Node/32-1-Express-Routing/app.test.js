const ExpressError = require("./expressError");
const {
    checkQueryString,
    getMean,
    getMedian,
    getMode,
    sumNums,
} = require("./utils");
const nums = [1, 1, 2, 3, 5, 8, 13, 21];

describe("testing checkQueryString", function () {
    const query = { nums: "1,1,2,3,5,8,13,21" };
    const errorQuery = { nums: "1,hello,1,3" };

    test("correctly returns error in query string", function () {
        const res = checkQueryString(errorQuery);
        expect(res).toBeInstanceOf(ExpressError);
    });

    test("correctly returns error in empty query string", function () {
        const res = checkQueryString({});
        expect(res).toBeInstanceOf(ExpressError);
    });

    test("correctly returns non-error query string", function () {
        const res = checkQueryString(query);
        expect(res).toEqual(nums);
    });
});

describe("testing sumNums", function () {
    test("returns correct summation", function () {
        const res = sumNums(nums);
        expect(res).toBe(54);
    });
});

describe("testing getMean", function () {
    test("returns correct Mean", function () {
        const res = getMean(nums);
        expect(res).toEqual(6.75);
    });
});

describe("testing getMedian", function () {
    test("returns correct Median", function () {
        const res = getMedian(nums);
        expect(res).toEqual(27);
    });
});

describe("testing getMode", function () {
    test("returns correct Mode", function () {
        const res = getMode(nums);
        expect(res).toEqual(1);
    });
});
