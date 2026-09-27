class Solution extends Reader4 {
    public int read(char[] buf,int n) {
        int copied=0;
        while(copied<n) {
            char[] block=new char[4]; int count=read4(block);
            for(int i=0;i<count && copied<n;i++) buf[copied++]=block[i];
            if(count<4) break;
        }
        return copied;
    }
}
