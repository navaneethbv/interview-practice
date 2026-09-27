class Solution:
    def isNumber(self, s):
        import re
        return re.fullmatch(r'[+-]?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[eE][+-]?[0-9]+)?',s) is not None
