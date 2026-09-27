class Solution {
private int sort(int[] a,int l,int r) {if(r-l<2) return 0;int m=(l+r)/2,count=sort(a,l,m)+sort(a,m,r),j=m;for(int i=l;i<m;i++) {while(j<r&&(long)a[i]>2L*a[j]) j++;count+=j-m;}int[] out=new int[r-l];int i=l,k=0;j=m;while(i<m&&j<r) out[k++]=a[i]<=a[j]?a[i++]:a[j++];while(i<m) out[k++]=a[i++];while(j<r) out[k++]=a[j++];System.arraycopy(out,0,a,l,out.length);return count;}
public int reversePairs(int[] nums) {return sort(nums,0,nums.length);}
}
