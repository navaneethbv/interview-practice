class Twitter {
    private final List<int[]> posts=new ArrayList<>();private final Map<Integer,Set<Integer>> following=new HashMap<>();
    public Twitter() {}
    public void postTweet(int userId,int tweetId) {posts.add(new int[]{userId,tweetId});}
    public List<Integer> getNewsFeed(int userId) {List<Integer> result=new ArrayList<>();Set<Integer> allowed=following.getOrDefault(userId,Collections.emptySet());for(int i=posts.size()-1;i>=0&&result.size()<10;i--) {int[] post=posts.get(i);if(post[0]==userId||allowed.contains(post[0])) result.add(post[1]);}return result;}
    public void follow(int followerId,int followeeId) {following.computeIfAbsent(followerId,k->new HashSet<>()).add(followeeId);}
    public void unfollow(int followerId,int followeeId) {Set<Integer> set=following.get(followerId);if(set!=null) set.remove(followeeId);}
}
