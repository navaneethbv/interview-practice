func reverseBits(n int) int {
	x, result := uint32(n), uint32(0)
	for i := 0; i < 32; i++ {
		result = result<<1 | x&1
		x >>= 1
	}
	return int(result)
}
