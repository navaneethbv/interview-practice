from collections import defaultdict
class Solution:
    def accountsMerge(self, accounts):
        parent = {}
        component_size = {}
        account_names = {}

        def find(email):
            root = email
            while parent[root] != root:
                root = parent[root]
            while parent[email] != email:
                next_email = parent[email]
                parent[email] = root
                email = next_email
            return root

        for name, *emails in accounts:
            for email in emails:
                if email not in parent:
                    parent[email] = email
                    component_size[email] = 1
                account_names[email] = name
                first_root = find(emails[0])
                email_root = find(email)
                if email_root == first_root:
                    continue
                if component_size[email_root] > component_size[first_root]:
                    email_root, first_root = first_root, email_root
                parent[email_root] = first_root
                component_size[first_root] += component_size[email_root]
        groups = defaultdict(list)
        for email in parent:
            groups[find(email)].append(email)
        merged_accounts = []
        for root, emails in groups.items():
            merged_accounts.append([account_names[root]] + sorted(emails))
        return merged_accounts
