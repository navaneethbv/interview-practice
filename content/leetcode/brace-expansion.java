class Solution {
    public String[] expand(String s) {
        List<String> result = new ArrayList<>(); result.add("");
        for (int i = 0; i < s.length();) {
            String[] choices;
            if (s.charAt(i) == '{') {
                int end = s.indexOf('}', i);
                choices = s.substring(i + 1, end).split(",");
                i = end + 1;
            } else { choices = new String[]{s.substring(i, i + 1)}; i++; }
            List<String> next = new ArrayList<>();
            for (String prefix : result) for (String choice : choices) next.add(prefix + choice);
            result = next;
        }
        Collections.sort(result);
        return result.toArray(new String[0]);
    }
}
