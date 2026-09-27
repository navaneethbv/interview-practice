class Solution {
    public int countStudents(int[] students, int[] sandwiches) {
        int[] counts = new int[2];
        for (int preference : students) {
            counts[preference]++;
        }
        for (int sandwich : sandwiches) {
            if (counts[sandwich] == 0) {
                break;
            }
            counts[sandwich]--;
        }
        return counts[0] + counts[1];
    }
}
