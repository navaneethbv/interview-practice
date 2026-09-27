class Solution:
    def shortestPalindrome(self, s):
        combined=s+'#'+s[::-1];prefix=[0]*len(combined)
        for i in range(1,len(combined)):
            j=prefix[i-1]
            while j and combined[i]!=combined[j]:j=prefix[j-1]
            if combined[i]==combined[j]:j+=1
            prefix[i]=j
        return s[prefix[-1]:][::-1]+s
