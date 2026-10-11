class Solution:
    def ipToCIDR(self, ip, n):
        start = 0
        for part in ip.split("."):
            start = start * 256 + int(part)
        blocks = []
        while n > 0:
            size = start & -start if start else 1 << 32
            while size > n:
                size //= 2
            prefix = 32 - (size.bit_length() - 1)
            blocks.append(".".join(str((start >> s) & 255) for s in (24, 16, 8, 0)) + f"/{prefix}")
            start += size
            n -= size
        return blocks
