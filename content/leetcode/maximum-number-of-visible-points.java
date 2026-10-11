class Solution {
    public int visiblePoints(List<List<Integer>> points, int angle, List<Integer> location) {
        int here = 0;
        List<Double> angles = new ArrayList<>();
        for (List<Integer> p : points) {
            int dx = p.get(0) - location.get(0);
            int dy = p.get(1) - location.get(1);
            if (dx == 0 && dy == 0) {
                here++;
            } else {
                angles.add(Math.toDegrees(Math.atan2(dy, dx)));
            }
        }
        Collections.sort(angles);
        int n = angles.size();
        for (int i = 0; i < n; i++) {
            angles.add(angles.get(i) + 360);
        }
        int best = 0;
        int left = 0;
        for (int right = 0; right < angles.size(); right++) {
            while (angles.get(right) - angles.get(left) > angle + 1e-9) {
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best + here;
    }
}
