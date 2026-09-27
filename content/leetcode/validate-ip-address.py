class Solution:
    def validIPAddress(self,queryIP):
        parts=queryIP.split('.')
        if len(parts)==4 and all(p.isascii() and p.isdigit() and len(p)<=3 and (len(p)==1 or p[0]!='0') and int(p)<=255 for p in parts):return 'IPv4'
        parts=queryIP.split(':')
        if len(parts)==8 and all(1<=len(p)<=4 and all(c in '0123456789abcdefABCDEF' for c in p) for p in parts):return 'IPv6'
        return 'Neither'
