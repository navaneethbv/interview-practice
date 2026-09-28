class Solution:
    def mostFrequentOctet(self, ips):
        counts = {}
        for ip in ips:
            octet = ip.split(".")[0]
            counts[octet] = counts.get(octet, 0) + 1
        best = ""
        for octet, count in counts.items():
            if not best or count > counts[best]:
                best = octet
        return best
