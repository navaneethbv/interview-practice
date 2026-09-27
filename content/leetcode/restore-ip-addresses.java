class Solution {
    public List<String> restoreIpAddresses(String s) {
        List<String> addresses = new ArrayList<>();
        buildAddresses(s, 0, new ArrayList<>(), addresses);
        return addresses;
    }

    private void buildAddresses(String s, int start, List<String> parts, List<String> addresses) {
        if (parts.size() == 4) {
            if (start == s.length()) {
                addresses.add(String.join(".", parts));
            }
            return;
        }
        int partsLeft = 4 - parts.size();
        int charactersLeft = s.length() - start;
        if (charactersLeft < partsLeft || charactersLeft > 3 * partsLeft) {
            return;
        }
        for (int length = 1; length <= 3 && start + length <= s.length(); length++) {
            String part = s.substring(start, start + length);
            if ((length > 1 && part.charAt(0) == '0') || Integer.parseInt(part) > 255) {
                continue;
            }
            parts.add(part);
            buildAddresses(s, start + length, parts, addresses);
            parts.remove(parts.size() - 1);
        }
    }
}
