class Solution {
    public String[] findRestaurant(String[] list1, String[] list2) {
        Map<String, Integer> indices = new HashMap<>();
        for (int index = 0; index < list1.length; index++) {
            indices.put(list1[index], index);
        }
        List<String> result = new ArrayList<>();
        int bestSum = Integer.MAX_VALUE;
        for (int index = 0; index < list2.length; index++) {
            if (!indices.containsKey(list2[index])) {
                continue;
            }
            int indexSum = indices.get(list2[index]) + index;
            if (indexSum < bestSum) {
                bestSum = indexSum;
                result.clear();
            }
            if (indexSum == bestSum) {
                result.add(list2[index]);
            }
        }
        return result.toArray(new String[0]);
    }
}
