class Solution {
public String discountPrices(String sentence,int discount){String[]words=sentence.split(" ");for(int i=0;i<words.length;i++){String w=words[i];boolean valid=w.length()>1&&w.charAt(0)=='$';for(int j=1;j<w.length()&&valid;j++)valid=w.charAt(j)>='0'&&w.charAt(j)<='9';if(valid){long cents=Long.parseLong(w.substring(1))*(100-discount);words[i]="$"+(cents/100)+"."+(cents%100<10?"0":"")+(cents%100);}}return String.join(" ",words);}
}
