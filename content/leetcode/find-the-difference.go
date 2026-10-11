func findTheDifference(s, t string) byte {
	var code byte
	for i := 0; i < len(t); i++ {
		code += t[i]
	}
	for i := 0; i < len(s); i++ {
		code -= s[i]
	}
	return code
}
