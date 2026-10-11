class Solution {
    public List<String> ipToCIDR(String ip, int n) {
        long start = 0;
        for (String part : ip.split("\\.")) {
            start = start * 256 + Integer.parseInt(part);
        }
        List<String> blocks = new ArrayList<>();
        while (n > 0) {
            long size = start == 0 ? 1L << 32 : start & -start;
            while (size > n) {
                size /= 2;
            }
            int prefix = 32 - Long.numberOfTrailingZeros(size);
            String address = (start >> 24 & 255) + "."
                    + (start >> 16 & 255) + "."
                    + (start >> 8 & 255) + "."
                    + (start & 255);
            blocks.add(address + "/" + prefix);
            start += size;
            n -= size;
        }
        return blocks;
    }
}
