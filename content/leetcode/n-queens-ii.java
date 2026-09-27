class Solution {
    public int totalNQueens(int n){return search((1<<n)-1,0,0,0);}
    private int search(int mask,int cols,int left,int right){
        if(cols==mask)return 1;int choices=mask&~(cols|left|right),total=0;
        while(choices!=0){int bit=choices&-choices;choices-=bit;total+=search(mask,cols|bit,((left|bit)<<1)&mask,(right|bit)>>1);}return total;
    }
}
