class Solution {
public List<List<String>> groupStrings(String[] strings) {Map<String,List<String>> groups=new HashMap<>();for(String s:strings) {StringBuilder key=new StringBuilder();for(char c:s.toCharArray()) key.append((c-s.charAt(0)+26)%26).append(',');groups.computeIfAbsent(key.toString(),k->new ArrayList<>()).add(s);}return new ArrayList<>(groups.values());}
}
