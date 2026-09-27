class Solution:
    def fullJustify(self, words, maxWidth):
        out=[];start=0
        while start<len(words):
            end=start;letters=0
            while end<len(words) and letters+len(words[end])+end-start<=maxWidth:letters+=len(words[end]);end+=1
            count=end-start
            if end==len(words) or count==1:line=' '.join(words[start:end]).ljust(maxWidth)
            else:
                base,extra=divmod(maxWidth-letters,count-1);parts=[]
                for i in range(count):
                    parts.append(words[start+i])
                    if i<count-1:parts.append(' '*(base+(i<extra)))
                line=''.join(parts)
            out.append(line);start=end
        return out
