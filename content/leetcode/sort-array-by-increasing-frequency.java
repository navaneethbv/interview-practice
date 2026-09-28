class Solution {
    public int[] frequencySort(int[] nums){
        Map<Integer,Integer> c=new HashMap<>();
        for (int x:nums) {
            c.merge(x,1,Integer::sum);
        }
        Integer[] a=Arrays.stream(nums).boxed().toArray(Integer[]::new);
        Arrays.sort(a,(x,y)->c.get(x).equals(c.get(y))?Integer.compare(y,x):Integer.compare(c.get(x),c.get(y)));
        return Arrays.stream(a).mapToInt(Integer::intValue).toArray();
    }
}
