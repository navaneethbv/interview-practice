class Solution {
public String[] findRestaurant(String[] list1,String[] list2){Map<String,Integer>index=new HashMap<>();for(int i=0;i<list1.length;i++)index.put(list1[i],i);List<String>out=new ArrayList<>();int best=Integer.MAX_VALUE;for(int j=0;j<list2.length;j++)if(index.containsKey(list2[j])){int sum=index.get(list2[j])+j;if(sum<best){best=sum;out.clear();}if(sum==best)out.add(list2[j]);}return out.toArray(new String[0]);}
}
