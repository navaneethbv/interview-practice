class Solution {
    public String alienOrder(String[] words) {
        Map<Character,Set<Character>> edges=new TreeMap<>();Map<Character,Integer> degree=new TreeMap<>();
        for(String w:words) for(char c:w.toCharArray()) {edges.putIfAbsent(c,new TreeSet<>());degree.putIfAbsent(c,0);}
        for(int i=1;i<words.length;i++) {String a=words[i-1],b=words[i];int j=0;while(j<Math.min(a.length(),b.length())&&a.charAt(j)==b.charAt(j)) j++;
            if(j==Math.min(a.length(),b.length())) {if(a.length()>b.length()) return "";}
            else {char x=a.charAt(j),y=b.charAt(j);if(edges.get(x).add(y)) degree.put(y,degree.get(y)+1);}
        }
        ArrayDeque<Character> q=new ArrayDeque<>();for(char c:degree.keySet()) if(degree.get(c)==0) q.add(c);
        StringBuilder result=new StringBuilder();while(!q.isEmpty()) {char c=q.remove();result.append(c);for(char n:edges.get(c)) {degree.put(n,degree.get(n)-1);if(degree.get(n)==0) q.add(n);}}
        return result.length()==degree.size()?result.toString():"";
    }
}
