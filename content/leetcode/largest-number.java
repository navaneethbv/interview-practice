class Solution {
public String largestNumber(int[] nums){String[]s=Arrays.stream(nums).mapToObj(String::valueOf).toArray(String[]::new);Arrays.sort(s,(a,b)->(b+a).compareTo(a+b));return s[0].equals("0")?"0":String.join("",s);}
}
