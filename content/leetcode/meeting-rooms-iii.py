import heapq
class Solution:
    def mostBooked(self, n, meetings):
        free_rooms = list(range(n))
        busy_rooms = []
        bookings = [0] * n
        heapq.heapify(free_rooms)
        for start, end in sorted(meetings):
            while busy_rooms and busy_rooms[0][0] <= start:
                _, room = heapq.heappop(busy_rooms)
                heapq.heappush(free_rooms, room)
            if free_rooms:
                room = heapq.heappop(free_rooms)
                finish = end
            else:
                available, room = heapq.heappop(busy_rooms)
                finish = available + end - start
            bookings[room] += 1
            heapq.heappush(busy_rooms, (finish, room))
        return max(range(n), key=lambda room: bookings[room])
