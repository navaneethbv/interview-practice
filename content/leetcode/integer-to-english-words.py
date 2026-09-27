class Solution:
    def numberToWords(self,num):
        small=['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen']
        tens=['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety']
        def part(n):
            if n<20: return small[n]
            if n<100: return (tens[n//10]+' '+small[n%10]).strip()
            return (small[n//100]+' Hundred '+part(n%100)).strip()
        if num==0:return 'Zero'
        groups=[]
        for scale in ['','Thousand','Million','Billion']:
            num,r=divmod(num,1000)
            if r:groups.append((part(r)+' '+scale).strip())
        return ' '.join(reversed(groups))
