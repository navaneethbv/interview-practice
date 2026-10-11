from collections import defaultdict


class Solution:
    def findDuplicate(self, paths):
        by_content = defaultdict(list)
        for entry in paths:
            directory, *files = entry.split(" ")
            for f in files:
                name, _, content = f.partition("(")
                by_content[content[:-1]].append(f"{directory}/{name}")
        return [group for group in by_content.values() if len(group) > 1]
