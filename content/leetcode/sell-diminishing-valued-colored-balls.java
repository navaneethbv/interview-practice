class Solution {
    public int maxProfit(int[] inventory, int orders) {
        Arrays.sort(inventory);
        long remaining = orders;
        long profit = 0;
        long modulo = 1000000007L;
        for (int index = inventory.length - 1; index >= 0; index--) {
            long width = inventory.length - index;
            long high = inventory[index];
            long low = index > 0 ? inventory[index - 1] : 0;
            long available = (high - low) * width;
            if (remaining >= available) {
                long levelProfit = (high + low + 1) * (high - low) / 2;
                profit = (profit + levelProfit * width) % modulo;
                remaining -= available;
                continue;
            }
            long levels = remaining / width;
            long extra = remaining % width;
            long bottom = high - levels;
            long levelProfit = (high + bottom + 1) * levels / 2 * width + extra * bottom;
            profit = (profit + levelProfit) % modulo;
            break;
        }
        return (int) profit;
    }
}
