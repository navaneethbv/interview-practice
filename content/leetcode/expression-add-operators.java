class Solution {
private void search(String num,int target,int i,String expression,long value,long last,List<String> out) {
    if(i==num.length()) {if(value==target) out.add(expression);return;}
    for(int end=i+1;end<=num.length();end++) {if(end>i+1&&num.charAt(i)=='0') break;String token=num.substring(i,end);long operand=Long.parseLong(token);
        if(i==0) search(num,target,end,token,operand,operand,out);
        else {search(num,target,end,expression+"+"+token,value+operand,operand,out);search(num,target,end,expression+"-"+token,value-operand,-operand,out);search(num,target,end,expression+"*"+token,value-last+last*operand,last*operand,out);}
    }
}
public List<String> addOperators(String num,int target) {List<String> out=new ArrayList<>();search(num,target,0,"",0,0,out);return out;}
}
