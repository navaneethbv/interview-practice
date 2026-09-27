class Solution:
    def canTransform(self, start, result):
        start_pieces = [(char, index) for index, char in enumerate(start) if char != "X"]
        result_pieces = [(char, index) for index, char in enumerate(result) if char != "X"]
        if len(start_pieces) != len(result_pieces):
            return False
        for (start_char, start_index), (result_char, result_index) in zip(
                start_pieces, result_pieces):
            if start_char != result_char:
                return False
            if start_char == "L" and result_index > start_index:
                return False
            if start_char == "R" and result_index < start_index:
                return False
        return True
