function groupAnagrams(strs: string[]): string[][] {
    const groups = new Map<string, string[]>();
    for (const s of strs) {
        const key = [...s].sort().join("");
        const group = groups.get(key) ?? [];
        group.push(s);
        groups.set(key, group);
    }
    return [...groups.values()];
}
