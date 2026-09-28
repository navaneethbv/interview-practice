class Solution {
    public boolean hasSharedIpSet(List<List<String>> users) {
        Set<List<String>> seen = new HashSet<>();
        for (List<String> user : users) {
            List<String> key = new ArrayList<>(user.subList(1, user.size()));
            Collections.sort(key);
            if (!seen.add(key)) {
                return true;
            }
        }
        return false;
    }
}
