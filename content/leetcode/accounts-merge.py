from collections import defaultdict
class Solution:
    def accountsMerge(self, accounts):
        parent, names = {}, {}
        def find(x):
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]
        for name,*emails in accounts:
            for email in emails:
                parent.setdefault(email,email)
                names[email] = name
                parent[find(email)] = find(emails[0])
        groups = defaultdict(list)
        for email in parent:
            groups[find(email)].append(email)
        return [[names[root]]+sorted(emails) for root,emails in groups.items()]
