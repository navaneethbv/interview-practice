class Solution:
    def compress(self, chars):
        read=write=0
        while read<len(chars):
            end=read+1
            while end<len(chars) and chars[end]==chars[read]: end+=1
            chars[write]=chars[read]; write+=1
            if end-read>1:
                for digit in str(end-read): chars[write]=digit; write+=1
            read=end
        return write
