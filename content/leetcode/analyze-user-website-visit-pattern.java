class Solution {
public List<String> mostVisitedPattern(String[] username,int[] timestamp,String[] website) {
    Integer[] order=new Integer[username.length];for(int i=0;i<order.length;i++) order[i]=i;Arrays.sort(order,Comparator.comparingInt(i->timestamp[i]));Map<String,List<String>> visits=new HashMap<>();for(int i:order) visits.computeIfAbsent(username[i],k->new ArrayList<>()).add(website[i]);Map<String,Integer> counts=new TreeMap<>();
    for(List<String> sites:visits.values()) {Set<String> patterns=new HashSet<>();for(int a=0;a<sites.size();a++) for(int b=a+1;b<sites.size();b++) for(int c=b+1;c<sites.size();c++) patterns.add(sites.get(a)+" "+sites.get(b)+" "+sites.get(c));for(String p:patterns) counts.merge(p,1,Integer::sum);}
    String best="";int score=0;for(Map.Entry<String,Integer> e:counts.entrySet()) if(e.getValue()>score) {score=e.getValue();best=e.getKey();}return Arrays.asList(best.split(" "));
}
}
