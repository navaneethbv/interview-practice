import "sort"

func groupAnagrams(strs []string) [][]string {
	groups := map[string][]string{}
	var keys []string
	for _, s := range strs {
		b := []byte(s)
		sort.Slice(b, func(i, j int) bool { return b[i] < b[j] })
		key := string(b)
		if _, ok := groups[key]; !ok {
			keys = append(keys, key)
		}
		groups[key] = append(groups[key], s)
	}
	result := make([][]string, 0, len(keys))
	for _, key := range keys {
		result = append(result, groups[key])
	}
	return result
}
