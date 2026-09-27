class Solution {
private boolean build(String row,Map<String,List<Character>> rules,Map<String,Boolean> memo) {if(row.length()==1) return true;if(memo.containsKey(row)) return memo.get(row);boolean result=extend(row,0,new StringBuilder(),rules,memo);memo.put(row,result);return result;}
private boolean extend(String row,int i,StringBuilder next,Map<String,List<Character>> rules,Map<String,Boolean> memo) {if(i==row.length()-1) return build(next.toString(),rules,memo);for(char c:rules.getOrDefault(row.substring(i,i+2),Collections.emptyList())) {next.append(c);if(extend(row,i+1,next,rules,memo)) return true;next.setLength(next.length()-1);}return false;}
public boolean pyramidTransition(String bottom,List<String> allowed) {Map<String,List<Character>> rules=new HashMap<>();for(String triple:allowed) rules.computeIfAbsent(triple.substring(0,2),k->new ArrayList<>()).add(triple.charAt(2));return build(bottom,rules,new HashMap<>());}
}
