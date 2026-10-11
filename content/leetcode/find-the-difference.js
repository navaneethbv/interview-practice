const findTheDifference = function(s, t) {
    let code = 0;
    for (const ch of t) code += ch.codePointAt(0);
    for (const ch of s) code -= ch.codePointAt(0);
    return String.fromCodePoint(code);
};
