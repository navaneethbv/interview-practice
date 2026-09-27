class Solution:
    def discountPrices(self, sentence, discount):
        out=[]
        for word in sentence.split(' '):
            if word.startswith('$') and len(word)>1 and all('0'<=c<='9' for c in word[1:]):
                cents=int(word[1:])*(100-discount);word='$'+str(cents//100)+'.'+str(cents%100).zfill(2)
            out.append(word)
        return ' '.join(out)
