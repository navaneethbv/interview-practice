from itertools import zip_longest
class Solution:
    def compareVersion(self, version1, version2):
        first = [int(part) for part in version1.split('.')]
        second = [int(part) for part in version2.split('.')]
        for index in range(max(len(first), len(second))):
            first_part = first[index] if index < len(first) else 0
            second_part = second[index] if index < len(second) else 0
            if first_part != second_part:
                return 1 if first_part > second_part else -1
        return 0
