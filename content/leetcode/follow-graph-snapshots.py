class FollowGraph:
    def __init__(self):
        self.live = {}
        self.snapshots = []

    def follow(self, user, target):
        if user != target:
            self.live.setdefault(user, set()).add(target)

    def unfollow(self, user, target):
        if user in self.live:
            self.live[user].discard(target)

    def snapshot(self):
        self.snapshots.append({user: targets.copy() for user, targets in self.live.items()})
        return len(self.snapshots) - 1

    def following(self, user, snapshotId):
        graph = self.live if snapshotId == -1 else self.snapshots[snapshotId]
        return sorted(graph.get(user, ()))

    def recommend(self, user):
        direct = self.live.get(user, set())
        candidates = set()
        for friend in direct:
            candidates.update(self.live.get(friend, ()))
        return sorted(candidates - direct - {user})
