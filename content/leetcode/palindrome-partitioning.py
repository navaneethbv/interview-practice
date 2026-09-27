class Solution:
    def partition(self, s):
        result = []

        def is_palindrome(start, end):
            left, right = start, end
            while left < right:
                if s[left] != s[right]:
                    return False
                left += 1
                right -= 1
            return True

        def visit(start_index, path):
            if start_index == len(s):
                result.append(path[:])
                return

            for end_index in range(start_index, len(s)):
                if is_palindrome(start_index, end_index):
                    path.append(s[start_index:end_index + 1])
                    visit(end_index + 1, path)
                    path.pop()

        visit(0, [])
        return result
