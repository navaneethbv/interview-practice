class LRUCache {
    private readonly map = new Map<number, number>();

    constructor(private readonly capacity: number) {}

    get(key: number): number {
        const value = this.map.get(key);
        if (value === undefined) return -1;
        this.map.delete(key);
        this.map.set(key, value);
        return value;
    }

    put(key: number, value: number): void {
        this.map.delete(key);
        this.map.set(key, value);
        if (this.map.size > this.capacity) this.map.delete(this.map.keys().next().value!);
    }
}
