class Solution {
    public int magicIndex(int[] A) {
        return search(A, 0, A.length - 1);
    }

    private int search(int[] A, int start, int end) {
        if (start > end) {
            return -1;
        }
        int mid = (start + end) >>> 1;
        int left = search(A, start, Math.min(mid - 1, A[mid]));
        if (left != -1) {
            return left;
        }
        if (A[mid] == mid) {
            return mid;
        }
        return search(A, Math.max(mid + 1, A[mid]), end);
    }
}
