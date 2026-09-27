class Solution:
    def minDistance(self, word1, word2):
        previous_row = list(range(len(word2) + 1))
        for first_index, first_character in enumerate(word1, start=1):
            current_row = [first_index]
            for second_index, second_character in enumerate(word2, start=1):
                if first_character == second_character:
                    current_row.append(previous_row[second_index - 1])
                else:
                    insert_cost = current_row[second_index - 1]
                    delete_cost = previous_row[second_index]
                    replace_cost = previous_row[second_index - 1]
                    current_row.append(
                        1 + min(insert_cost, delete_cost, replace_cost)
                    )
            previous_row = current_row
        return previous_row[-1]
