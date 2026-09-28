from collections import deque, Counter, defaultdict
import heapq
import math

class Solution:
    def solve(self, s1, s2):
        need = [0] * 26
        window = [0] * 26
        for letter in s1:
            need[ord(letter) - 97] += 1
        found = set()
        width = len(s1)
        for index, letter in enumerate(s2):
            window[ord(letter) - 97] += 1
            if index >= width:
                window[ord(s2[index - width]) - 97] -= 1
            if index + 1 >= width and window == need:
                found.add(s2[index + 1 - width:index + 1])
        return len(found)
