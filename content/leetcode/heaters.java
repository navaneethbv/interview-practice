class Solution {
    public int findRadius(int[] houses, int[] heaters) {
        Arrays.sort(houses);
        Arrays.sort(heaters);
        int heater = 0;
        int radius = 0;
        for (int house : houses) {
            while (heater + 1 < heaters.length
                    && Math.abs(heaters[heater + 1] - house) <= Math.abs(heaters[heater] - house)) {
                heater++;
            }
            radius = Math.max(radius, Math.abs(heaters[heater] - house));
        }
        return radius;
    }
}
