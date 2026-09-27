class Solution {
public int evalRPN(String[] tokens) {
    Deque<Integer> stack=new ArrayDeque<>();
    for(String t:tokens) {
        if(t.equals("+")||t.equals("-")||t.equals("*")||t.equals("/")) {
            int b=stack.pop(),a=stack.pop();
            switch(t) {case "+":stack.push(a+b);break;case "-":stack.push(a-b);break;case "*":stack.push(a*b);break;default:stack.push(a/b);}
        }else stack.push(Integer.parseInt(t));
    }
    return stack.pop();
}
}
