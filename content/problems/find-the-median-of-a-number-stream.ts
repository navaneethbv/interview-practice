class MedianOfAStream {
    private values: number[] = [];

    insertNum(num: number): void {
        let lo = 0, hi = this.values.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (this.values[mid] < num) lo = mid + 1; else hi = mid;
        }
        this.values.splice(lo, 0, num);
    }

    findMedian(): number {
        const n = this.values.length, mid = n >> 1;
        return n % 2 ? this.values[mid] : (this.values[mid - 1] + this.values[mid]) / 2;
    }
}
