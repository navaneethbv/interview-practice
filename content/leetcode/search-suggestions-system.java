class Solution {
public List<List<String>> suggestedProducts(String[] products,String searchWord) {Arrays.sort(products);List<List<String>> result=new ArrayList<>();for(int size=1;size<=searchWord.length();size++) {String prefix=searchWord.substring(0,size);int l=0,r=products.length;while(l<r) {int m=(l+r)/2;if(products[m].compareTo(prefix)<0) l=m+1;else r=m;}List<String> matches=new ArrayList<>();for(int i=l;i<Math.min(l+3,products.length);i++) if(products[i].startsWith(prefix)) matches.add(products[i]);result.add(matches);}return result;}
}
