class Codec {
    public String encode(List<String> strs) {
        StringBuilder result = new StringBuilder();
        for (String word : strs) {
            result.append(word.length()).append('#').append(word);
        }
        return result.toString();
    }

    public List<String> decode(String s) {
        List<String> result = new ArrayList<>();
        int position = 0;
        while (position < s.length()) {
            int separator = s.indexOf('#', position);
            int length = Integer.parseInt(s.substring(position, separator));
            position = separator + 1;
            result.add(s.substring(position, position + length));
            position += length;
        }
        return result;
    }
}
