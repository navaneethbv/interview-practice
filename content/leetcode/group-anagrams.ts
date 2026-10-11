function groupAnagrams(strs: string[]): string[][] {
    const groups = new Map<string, string[]>();
    for (const s of strs) {
        const key = [...s].sort((a, b) => a.localeCompare(b)).join("");
        const group = groups.get(key) ?? [];
        group.push(s);
        groups.set(key, group);
    }
    return [...groups.values()];
}
