from collections import Counter


class Solution:
    def numFriendRequests(self, ages):
        counts = Counter(ages)
        total = 0
        for sender_age, sender_count in counts.items():
            for recipient_age, recipient_count in counts.items():
                if self._can_request(sender_age, recipient_age):
                    eligible = recipient_count - (sender_age == recipient_age)
                    total += sender_count * eligible
        return total

    @staticmethod
    def _can_request(sender_age, recipient_age):
        return 2 * recipient_age > sender_age + 14 and recipient_age <= sender_age
