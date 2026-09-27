class Solution {
public int totalNumbers(int[] digits) {Set<Integer> values=new HashSet<>();for(int i=0;i<digits.length;i++) if(digits[i]!=0) for(int j=0;j<digits.length;j++) if(i!=j) for(int k=0;k<digits.length;k++) if(k!=i&&k!=j&&digits[k]%2==0) values.add(100*digits[i]+10*digits[j]+digits[k]);return values.size();}
}
