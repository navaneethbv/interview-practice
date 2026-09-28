class Solution {
    public List<Integer> solveQueries(int[] nums,int[] queries){
        Map<Integer,List<Integer>> p=new HashMap<>();
        int n=nums.length;
        int[] d=new int[n];
        Arrays.fill(d,-1);
        for (int i=0;i<n;i++) {
            p.computeIfAbsent(nums[i],x->new ArrayList<>()).add(i);
        }
        for (List<Integer> positions : p.values()) {
            if (positions.size() <= 1) {
                continue;
            }
            for (int j = 0; j < positions.size(); j++) {
                int index = positions.get(j);
                int previous = positions.get((j + positions.size() - 1) % positions.size());
                int next = positions.get((j + 1) % positions.size());
                d[index] = Math.min((index - previous + n) % n,
                        (next - index + n) % n);
            }
        }
        List<Integer> ans=new ArrayList<>();
        for (int i:queries) {
            ans.add(d[i]);
        }
        return ans;
    }
}
