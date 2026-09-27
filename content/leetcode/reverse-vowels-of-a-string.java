class Solution {
public String reverseVowels(String s) {char[] a=s.toCharArray();String v="aeiouAEIOU";int l=0,r=a.length-1;while(l<r) {if(v.indexOf(a[l])<0) l++;else if(v.indexOf(a[r])<0) r--;else {char t=a[l];a[l++]=a[r];a[r--]=t;}}return new String(a);}
}
