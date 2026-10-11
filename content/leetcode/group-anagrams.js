const groupAnagrams = function(strs) {
    const groups = new Map();
    for (const s of strs) {
        const key = [...s].sort((a, b) => a.localeCompare(b)).join("");
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(s);
    }
    return [...groups.values()];
};
