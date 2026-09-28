class Solution {
    public String join(String[] arr, String s) {
        StringBuilder builder = new StringBuilder();
        for (int index = 0; index < arr.length; index++) {
            if (index > 0) {
                builder.append(s);
            }
            builder.append(arr[index]);
        }
        return builder.toString();
    }
}
