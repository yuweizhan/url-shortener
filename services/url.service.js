exports.hash = (id) => {
    const digits = [];

    while (id > 0) {
        const remainder = id % 62;
        digits.unshift(remainder);
        id = Math.floor(id / 62);
    }

    let short = "";
    digits.forEach((digit) => {
        let char;
        if (digit >= 0 && digit <= 25) {
            char = String.fromCharCode(digit + 97);
        } else if (digit >= 26 && digit <+ 51) {
            char = String.fromCharCode(digit + 39);
        } else {
            char = (digit - 52) + "";
        }

        short += char;
    });

    return short;
};