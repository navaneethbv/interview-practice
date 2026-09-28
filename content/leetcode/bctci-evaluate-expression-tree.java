class Solution {
    public int evaluate(Node root, String[] kinds, int[] nums) {
        String kind = kinds[root.val];
        if (kind.equals("num")) {
            return nums[root.val];
        }
        int result = kind.equals("product") ? 1 : 0;
        boolean first = true;
        for (Node child : root.children) {
            int value = evaluate(child, kinds, nums);
            result = first && (kind.equals("max") || kind.equals("min")) ? value : combine(kind, result, value);
            first = false;
        }
        return result;
    }

    private int combine(String kind, int result, int value) {
        switch (kind) {
            case "sum":
                return result + value;
            case "product":
                return result * value;
            case "max":
                return Math.max(result, value);
            default:
                return Math.min(result, value);
        }
    }
}
