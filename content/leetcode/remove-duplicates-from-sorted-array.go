func removeDuplicates(nums []int) int {
	k := 0
	for _, x := range nums {
		if k == 0 || nums[k-1] != x {
			nums[k] = x
			k++
		}
	}
	return k
}
