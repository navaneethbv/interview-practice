class Solution:
    def findRestaurant(self, list1, list2):
        indices = {word: index for index, word in enumerate(list1)}
        best_sum = float("inf")
        result = []
        for index, word in enumerate(list2):
            if word not in indices:
                continue
            index_sum = indices[word] + index
            if index_sum < best_sum:
                best_sum = index_sum
                result = [word]
            elif index_sum == best_sum:
                result.append(word)
        return result
