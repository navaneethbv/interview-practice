class Solution:
    def findCheaters(self, answers, m, students, responses):
        mistakes = {}
        by_desk = {}
        for (student_id, desk), response in zip(students, responses):
            by_desk[desk] = student_id
            mistakes[student_id] = tuple((q, given) for q, (given, key) in enumerate(zip(response, answers)) if given != key)
        pairs = []
        for desk, student_id in by_desk.items():
            neighbor = by_desk.get(desk + 1)
            same_row = (desk - 1) // m == desk // m
            if neighbor is not None and same_row and mistakes[student_id] and mistakes[student_id] == mistakes[neighbor]:
                pairs.append(sorted([student_id, neighbor]))
        return pairs
