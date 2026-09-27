class Solution {
public int totalFruit(int[] fruits){Map<Integer,Integer>count=new HashMap<>();int left=0,best=0;for(int right=0;right<fruits.length;right++){count.merge(fruits[right],1,Integer::sum);while(count.size()>2){int x=fruits[left++],n=count.get(x)-1;if(n==0)count.remove(x);else count.put(x,n);}best=Math.max(best,right-left+1);}return best;}
}
