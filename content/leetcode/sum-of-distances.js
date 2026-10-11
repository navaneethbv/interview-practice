const distance = function(nums) {
    const ans = new Array(nums.length).fill(0);
    const pass = (indices) => {
        const seen = new Map();
        for (const i of indices) {
            const [count, total] = seen.get(nums[i]) ?? [0, 0];
            ans[i] += Math.abs(count * i - total);
            seen.set(nums[i], [count + 1, total + i]);
        }
    };
    const forward = [...nums.keys()];
    pass(forward);
    forward.reverse();
    pass(forward);
    return ans;
};
