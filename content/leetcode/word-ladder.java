class Solution {
public int ladderLength(String beginWord,String endWord,List<String> wordList){Set<String> left=new HashSet<>(wordList);if(!left.contains(endWord))return 0;left.remove(beginWord);Deque<String>q=new ArrayDeque<>();q.add(beginWord);int dist=1;while(!q.isEmpty()){for(int k=q.size();k>0;k--){char[]a=q.remove().toCharArray();for(int i=0;i<a.length;i++){char old=a[i];for(char c='a';c<='z';c++){a[i]=c;String w=new String(a);if(left.remove(w)){if(w.equals(endWord))return dist+1;q.add(w);}}a[i]=old;}}dist++;}return 0;}
}
