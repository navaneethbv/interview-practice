function findTheDifference(s: string, t: string): string {
    let code = 0;
    for (const ch of t) code += ch.charCodeAt(0);
    for (const ch of s) code -= ch.charCodeAt(0);
    return String.fromCharCode(code);
}
