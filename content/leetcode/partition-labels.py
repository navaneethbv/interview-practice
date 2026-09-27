class Solution:
    def partitionLabels(self, s):
        last_position = {
            character: index
            for index, character in enumerate(s)
        }
        partition_start = 0
        partition_end = 0
        lengths = []

        for index, character in enumerate(s):
            partition_end = max(
                partition_end, last_position[character]
            )
            if index == partition_end:
                lengths.append(index - partition_start + 1)
                partition_start = index + 1
        return lengths
