func distance(nums []int) []int64 {
	n := len(nums)
	ans := make([]int64, n)
	for pass := 0; pass < 2; pass++ {
		count, total := map[int]int64{}, map[int]int64{}
		for step := 0; step < n; step++ {
			i := step
			if pass == 1 {
				i = n - 1 - step
			}
			d := count[nums[i]]*int64(i) - total[nums[i]]
			if d < 0 {
				d = -d
			}
			ans[i] += d
			count[nums[i]]++
			total[nums[i]] += int64(i)
		}
	}
	return ans
}
