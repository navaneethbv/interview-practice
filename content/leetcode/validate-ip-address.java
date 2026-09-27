class Solution {
    public String validIPAddress(String queryIP) {
        String[] ipv4Parts = queryIP.split("\\.", -1);
        if (ipv4Parts.length == 4 && allIpv4PartsValid(ipv4Parts)) {
            return "IPv4";
        }
        String[] ipv6Parts = queryIP.split(":", -1);
        if (ipv6Parts.length == 8 && allIpv6PartsValid(ipv6Parts)) {
            return "IPv6";
        }
        return "Neither";
    }

    private boolean allIpv4PartsValid(String[] parts) {
        for (String part : parts) {
            if (!isValidIpv4Part(part)) {
                return false;
            }
        }
        return true;
    }

    private boolean isValidIpv4Part(String part) {
        if (part.length() == 0 || part.length() > 3) {
            return false;
        }
        if (part.length() > 1 && part.charAt(0) == '0') {
            return false;
        }
        int value = 0;
        for (int index = 0; index < part.length(); index++) {
            char digit = part.charAt(index);
            if (digit < '0' || digit > '9') {
                return false;
            }
            value = value * 10 + digit - '0';
        }
        return value <= 255;
    }

    private boolean allIpv6PartsValid(String[] parts) {
        String hexadecimal = "0123456789abcdefABCDEF";
        for (String part : parts) {
            if (part.length() < 1 || part.length() > 4) {
                return false;
            }
            for (int index = 0; index < part.length(); index++) {
                if (hexadecimal.indexOf(part.charAt(index)) < 0) {
                    return false;
                }
            }
        }
        return true;
    }
}
