class Solution {
public int maxProfit(int[] inventory,int orders) {Arrays.sort(inventory);long remaining=orders,profit=0,mod=1000000007;int n=inventory.length;for(int i=n-1;i>=0;i--) {long width=n-i,high=inventory[i],low=i>0?inventory[i-1]:0,available=(high-low)*width;if(remaining>=available) {profit=(profit+(high+low+1)*(high-low)/2%mod*width)%mod;remaining-=available;}else {long levels=remaining/width,extra=remaining%width,bottom=high-levels;profit=(profit+(high+bottom+1)*levels/2%mod*width+extra*bottom)%mod;break;}}return (int)profit;}
}
