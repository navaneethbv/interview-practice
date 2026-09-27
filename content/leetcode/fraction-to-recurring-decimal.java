class Solution {
    public String fractionToDecimal(int numerator,int denominator){
        if(numerator==0)return "0";StringBuilder out=new StringBuilder();if((numerator<0)!=(denominator<0))out.append('-');
        long n=Math.abs((long)numerator),d=Math.abs((long)denominator);out.append(n/d);long rem=n%d;if(rem==0)return out.toString();out.append('.');Map<Long,Integer> seen=new HashMap<>();
        while(rem!=0){if(seen.containsKey(rem)){out.insert(seen.get(rem).intValue(),'(');out.append(')');break;}seen.put(rem,out.length());rem*=10;out.append(rem/d);rem%=d;}return out.toString();
    }
}
