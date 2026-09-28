class Solution {
    public int[] finalPrices(int[] prices) {
        int[] result = prices.clone();
        Deque<Integer> stack = new ArrayDeque<>();
        for (int index = 0; index < prices.length; index++) {
            while (!stack.isEmpty() && prices[stack.peek()] >= prices[index]) {
                result[stack.pop()] -= prices[index];
            }
            stack.push(index);
        }
        return result;
    }
}
