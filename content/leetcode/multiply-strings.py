class Solution:
    def multiply(self, num1, num2):
        out=[0]*(len(num1)+len(num2))
        for i in range(len(num1)-1,-1,-1):
            for j in range(len(num2)-1,-1,-1):
                value=int(num1[i])*int(num2[j])+out[i+j+1]
                out[i+j+1]=value%10;out[i+j]+=value//10
        return ''.join(map(str,out)).lstrip('0') or '0'
