from collections import defaultdict

class Solution:
    def accountsMerge(self, accounts):
        parent = {}
        component_size = {}
        account_names = {}
        for name, *emails in accounts:
            for email in emails:
                if email not in parent:
                    parent[email] = email
                    component_size[email] = 1
                account_names[email] = name
                self._union(parent, component_size, emails[0], email)

        groups = defaultdict(list)
        for email in parent:
            groups[self._find(parent, email)].append(email)
        merged_accounts = []
        for root, emails in groups.items():
            merged_accounts.append([account_names[root]] + sorted(emails))
        return merged_accounts

    @staticmethod
    def _find(parent, email):
        root = email
        while parent[root] != root:
            root = parent[root]
        while parent[email] != email:
            next_email = parent[email]
            parent[email] = root
            email = next_email
        return root

    def _union(self, parent, component_size, first_email, email):
        first_root = self._find(parent, first_email)
        email_root = self._find(parent, email)
        if email_root == first_root:
            return
        if component_size[email_root] > component_size[first_root]:
            email_root, first_root = first_root, email_root
        parent[email_root] = first_root
        component_size[first_root] += component_size[email_root]
