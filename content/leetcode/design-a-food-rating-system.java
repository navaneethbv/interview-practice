class FoodRatings {
    private final Map<String, Integer> rating = new HashMap<>();
    private final Map<String, String> cuisineOf = new HashMap<>();
    private final Map<String, TreeSet<String>> byCuisine = new HashMap<>();

    public FoodRatings(String[] foods, String[] cuisines, int[] ratings) {
        for (int i = 0; i < foods.length; i++) {
            rating.put(foods[i], ratings[i]);
            cuisineOf.put(foods[i], cuisines[i]);
        }
        for (int i = 0; i < foods.length; i++) {
            byCuisine.computeIfAbsent(cuisines[i], key -> new TreeSet<>(this::compare)).add(foods[i]);
        }
    }

    public void changeRating(String food, int newRating) {
        TreeSet<String> set = byCuisine.get(cuisineOf.get(food));
        set.remove(food);
        rating.put(food, newRating);
        set.add(food);
    }

    public String highestRated(String cuisine) {
        return byCuisine.get(cuisine).first();
    }

    private int compare(String a, String b) {
        int byRating = Integer.compare(rating.get(b), rating.get(a));
        return byRating != 0 ? byRating : a.compareTo(b);
    }
}
