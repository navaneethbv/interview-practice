function removeDuplicates(nums: number[]): number {
    let k = 0;
    for (const x of nums) {
        if (k === 0 || nums[k - 1] !== x) nums[k++] = x;
    }
    return k;
}
