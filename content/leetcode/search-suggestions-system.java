class Solution {
public List<List<String>> suggestedProducts(String[] products, String searchWord) {
    Arrays.sort(products);
    List<List<String>> result = new ArrayList<>();
    for (int prefixLength = 1; prefixLength <= searchWord.length(); prefixLength++) {
        String prefix = searchWord.substring(0, prefixLength);
        int firstMatch = 0;
        int afterLast = products.length;
        while (firstMatch < afterLast) {
            int middle = (firstMatch + afterLast) / 2;
            if (products[middle].compareTo(prefix) < 0) {
                firstMatch = middle + 1;
            } else {
                afterLast = middle;
            }
        }
        List<String> suggestions = new ArrayList<>();
        int end = Math.min(firstMatch + 3, products.length);
        for (int index = firstMatch; index < end; index++) {
            if (products[index].startsWith(prefix)) {
                suggestions.add(products[index]);
            }
        }
        result.add(suggestions);
    }
    return result;
}
}
