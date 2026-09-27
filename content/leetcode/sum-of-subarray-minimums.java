class Solution {
    public int sumSubarrayMins(int[] arr) {
        Deque<Integer> stack = new ArrayDeque<>();
        long total = 0;
        for (int right = 0; right <= arr.length; right++) {
            while (!stack.isEmpty()
                    && (right == arr.length || arr[stack.peek()] >= arr[right])) {
                int middle = stack.pop();
                int left = stack.isEmpty() ? -1 : stack.peek();
                total = (total + (long) arr[middle] * (middle - left) * (right - middle))
                        % 1000000007;
            }
            if (right < arr.length) {
                stack.push(right);
            }
        }
        return (int) total;
    }
}
