class Solution {
    public String currentUrlWithForward(List<List<String>> actions) {
        List<String> pages = new ArrayList<>();
        int current = -1;
        for (List<String> action : actions) {
            String kind = action.get(0);
            if (kind.equals("go")) {
                current++;
                pages.subList(current, pages.size()).clear();
                pages.add(action.get(1));
            } else if (kind.equals("back")) {
                current = (int) Math.max(0, current - Long.parseLong(action.get(1)));
            } else {
                current = (int) Math.min(pages.size() - 1, current + Long.parseLong(action.get(1)));
            }
        }
        return pages.get(current);
    }
}
