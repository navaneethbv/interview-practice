class Codec:
    def encode(self,strs):
        return ''.join(str(len(s))+'#'+s for s in strs)
    def decode(self,s):
        result=[]
        i=0
        while i<len(s):
            j=s.index('#',i)
            length=int(s[i:j])
            i=j+1
            result.append(s[i:i+length])
            i+=length
        return result
