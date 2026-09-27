class Solution {
public int missingNumber(int[] arr){int difference=(arr[arr.length-1]-arr[0])/arr.length;for(int i=0;i<arr.length;i++){int expected=arr[0]+i*difference;if(arr[i]!=expected)return expected;}return arr[0];}
}
