class Solution:
    def reconstructQueue(self, people):
        result = []
        ordered = sorted(people, key=lambda person: (-person[0], person[1]))
        for person in ordered:
            result.insert(person[1], person)
        return result
