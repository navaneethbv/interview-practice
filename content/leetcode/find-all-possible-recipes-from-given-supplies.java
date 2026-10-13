class Solution {
    public List<String> findAllRecipes(String[] recipes, List<List<String>> ingredients, String[] supplies) {
        Map<String, List<Integer>> waiting = new HashMap<>();
        int[] remaining = new int[recipes.length];
        for (int i = 0; i < recipes.length; i++) {
            remaining[i] = ingredients.get(i).size();
            for (String name : ingredients.get(i)) {
                waiting.computeIfAbsent(name, key -> new ArrayList<>()).add(i);
            }
        }
        Deque<String> queue = new ArrayDeque<>(Arrays.asList(supplies));
        List<String> result = new ArrayList<>();
        while (!queue.isEmpty()) {
            String name = queue.remove();
            for (int i : waiting.getOrDefault(name, Collections.emptyList())) {
                if (--remaining[i] == 0) {
                    result.add(recipes[i]);
                    queue.add(recipes[i]);
                }
            }
        }
        return result;
    }
}
