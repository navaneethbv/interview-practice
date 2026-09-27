class Solution:
    def isMatch(self, s, p):
        string_index = 0
        pattern_index = 0
        last_star = -1
        matched_after_star = 0

        while string_index < len(s):
            if pattern_index < len(p) and (
                    p[pattern_index] == "?" or p[pattern_index] == s[string_index]):
                string_index += 1
                pattern_index += 1
            elif pattern_index < len(p) and p[pattern_index] == "*":
                last_star = pattern_index
                matched_after_star = string_index
                pattern_index += 1
            elif last_star >= 0:
                matched_after_star += 1
                string_index = matched_after_star
                pattern_index = last_star + 1
            else:
                return False

        while pattern_index < len(p) and p[pattern_index] == "*":
            pattern_index += 1
        return pattern_index == len(p)
