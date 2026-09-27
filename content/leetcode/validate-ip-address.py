class Solution:
    def validIPAddress(self, queryIP):
        ipv4_parts = queryIP.split('.')
        if len(ipv4_parts) == 4 and all(self._valid_ipv4_part(part) for part in ipv4_parts):
            return 'IPv4'

        ipv6_parts = queryIP.split(':')
        if len(ipv6_parts) == 8 and all(self._valid_ipv6_part(part) for part in ipv6_parts):
            return 'IPv6'
        return 'Neither'

    def _valid_ipv4_part(self, part):
        return (
            part.isascii()
            and part.isdigit()
            and len(part) <= 3
            and (len(part) == 1 or part[0] != '0')
            and int(part) <= 255
        )

    def _valid_ipv6_part(self, part):
        hexadecimal = '0123456789abcdefABCDEF'
        return 1 <= len(part) <= 4 and all(char in hexadecimal for char in part)
