class Solution {
    public int findContentChildren(int[] g, int[] s) {
        int[] children = g.clone();
        int[] cookies = s.clone();
        Arrays.sort(children);
        Arrays.sort(cookies);
        int childIndex = 0;
        for (int cookieSize : cookies) {
            if (childIndex < children.length && cookieSize >= children[childIndex]) {
                childIndex++;
            }
        }
        return childIndex;
    }
}
