class Twitter {
    private final List<int[]> posts = new ArrayList<>();
    private final Map<Integer, Set<Integer>> following = new HashMap<>();

    public Twitter() {
    }

    public void postTweet(int userId, int tweetId) {
        posts.add(new int[]{userId, tweetId});
    }

    public List<Integer> getNewsFeed(int userId) {
        Set<Integer> followedUsers = following.getOrDefault(userId, Collections.emptySet());
        List<Integer> newsFeed = new ArrayList<>();

        for (int index = posts.size() - 1; index >= 0 && newsFeed.size() < 10; index--) {
            int[] post = posts.get(index);
            boolean isVisible = post[0] == userId || followedUsers.contains(post[0]);
            if (isVisible) {
                newsFeed.add(post[1]);
            }
        }

        return newsFeed;
    }

    public void follow(int followerId, int followeeId) {
        following.computeIfAbsent(followerId, ignored -> new HashSet<>()).add(followeeId);
    }

    public void unfollow(int followerId, int followeeId) {
        Set<Integer> followedUsers = following.get(followerId);
        if (followedUsers != null) {
            followedUsers.remove(followeeId);
        }
    }
}
