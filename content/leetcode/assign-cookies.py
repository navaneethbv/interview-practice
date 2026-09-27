class Solution:
    def findContentChildren(self, g, s):
        children = sorted(g)
        cookies = sorted(s)
        child_index = 0
        for cookie_size in cookies:
            if child_index < len(children) and cookie_size >= children[child_index]:
                child_index += 1
        return child_index
