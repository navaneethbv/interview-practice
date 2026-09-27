class Solution {
public int maxBoxesInWarehouse(int[] boxes,int[] warehouse){for(int i=1;i<warehouse.length;i++)warehouse[i]=Math.min(warehouse[i],warehouse[i-1]);Arrays.sort(boxes);int j=0;for(int i=warehouse.length-1;i>=0;i--)if(j<boxes.length&&boxes[j]<=warehouse[i])j++;return j;}
}
