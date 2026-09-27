class Solution {
public int[] sortByBits(int[] arr){return Arrays.stream(arr).boxed().sorted(Comparator.comparingInt(Integer::bitCount).thenComparingInt(x->x)).mapToInt(Integer::intValue).toArray();}
}
