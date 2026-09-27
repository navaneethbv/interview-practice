class Solution {
public List<Integer> majorityElement(int[] nums){int a=0,b=1,ca=0,cb=0;for(int x:nums)if(x==a)ca++;else if(x==b)cb++;else if(ca==0){a=x;ca=1;}else if(cb==0){b=x;cb=1;}else{ca--;cb--;}ca=cb=0;for(int x:nums){if(x==a)ca++;if(x==b)cb++;}List<Integer>out=new ArrayList<>();if(ca>nums.length/3)out.add(a);if(cb>nums.length/3)out.add(b);return out;}
}
