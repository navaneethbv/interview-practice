class Solution extends Reader4 {
    private char[] pending=new char[4]; private int index=0,size=0;
    public Solution() {}
    public int read(char[] buf,int n) {
        int count=0;
        while(count<n) {
            if(index==size){size=read4(pending);index=0;if(size==0)break;}
            buf[count++]=pending[index++];
        }
        return count;
    }
}
