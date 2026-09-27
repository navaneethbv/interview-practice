class Solution {
public int calculate(String s){Deque<Integer>stack=new ArrayDeque<>();int number=0;char op='+';s+="+";for(char c:s.toCharArray())if(Character.isDigit(c))number=number*10+c-'0';else if(c!=' '){if(op=='+')stack.push(number);else if(op=='-')stack.push(-number);else if(op=='*')stack.push(stack.pop()*number);else stack.push(stack.pop()/number);number=0;op=c;}int total=0;for(int x:stack)total+=x;return total;}
}
