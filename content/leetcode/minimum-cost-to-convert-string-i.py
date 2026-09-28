class Solution:
    def minimumCost(self, source, target, original, changed, cost):
        infinity = 10**30
        distance = [[infinity] * 26 for _ in range(26)]
        for letter in range(26):
            distance[letter][letter] = 0
        for start, end, price in zip(original, changed, cost):
            start_index = ord(start) - ord("a")
            end_index = ord(end) - ord("a")
            distance[start_index][end_index] = min(distance[start_index][end_index], price)

        for middle in range(26):
            for start in range(26):
                for end in range(26):
                    distance[start][end] = min(
                        distance[start][end],
                        distance[start][middle] + distance[middle][end],
                    )
        answer = 0
        for source_letter, target_letter in zip(source, target):
            price = distance[ord(source_letter) - ord("a")][ord(target_letter) - ord("a")]
            if price >= infinity:
                return -1
            answer += price
        return answer
