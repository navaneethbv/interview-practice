class Solution {
public String getHint(String secret,String guess){int bulls=0;int[]a=new int[10],b=new int[10];for(int i=0;i<secret.length();i++){if(secret.charAt(i)==guess.charAt(i))bulls++;a[secret.charAt(i)-'0']++;b[guess.charAt(i)-'0']++;}int matches=0;for(int i=0;i<10;i++)matches+=Math.min(a[i],b[i]);return bulls+"A"+(matches-bulls)+"B";}
}
