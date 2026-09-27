class Solution {
public int bestClosingTime(String customers) {int penalty=0;for(char c:customers.toCharArray()) if(c=='Y') penalty++;int best=penalty,answer=0;for(int i=0;i<customers.length();i++) {penalty+=customers.charAt(i)=='N'?1:-1;if(penalty<best) {best=penalty;answer=i+1;}}return answer;}
}
