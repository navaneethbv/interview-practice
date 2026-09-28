class Solution {
    public String lexGreaterPermutation(String s,String target){
        int[] c=new int[26];
        for (char x:s.toCharArray()) {
            c[x-'a']++;
        }
        StringBuilder prefix=new StringBuilder();
        int i=0,n=s.length();
        while (i<n&&c[target.charAt(i)-'a']>0){
            c[target.charAt(i)-'a']--;
            prefix.append(target.charAt(i++));
        }
        if (i==n){
            i--;
            c[prefix.charAt(i)-'a']++;
            prefix.setLength(i);
        }
        while (i>=0){
            for (int x=target.charAt(i)-'a'+1;x<26;x++) {
                if (c[x] > 0) {
                c[x]--;
                prefix.append((char)(x+'a'));
                appendSmallestSuffix(prefix, c);
                return prefix.toString();
                }
            }
            if (i==0) {
                break;
            }
            i--;
            c[prefix.charAt(i)-'a']++;
            prefix.setLength(i);
        }
        return "";
    }

    private void appendSmallestSuffix(StringBuilder result, int[] counts) {
        for (int letter = 0; letter < counts.length; letter++) {
            result.append(String.valueOf((char) (letter + 'a')).repeat(counts[letter]));
        }
    }
}
