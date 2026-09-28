class Solution {
    public int[] solve(int[] arr) {
        int[] answer = new int[arr.length];
        Arrays.fill(answer, -1);
        Deque<Integer> stack = new ArrayDeque<>();
        for (int index = 0; index < arr.length; index++) {
            while (!stack.isEmpty() && arr[stack.peekLast()] < arr[index]) {
                answer[stack.removeLast()] = index;
            }
            stack.addLast(index);
        }
        return answer;
    }
}
