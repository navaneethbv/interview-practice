import heapq


class Solution:
    def makePlaylist(self, songs):
        by_artist = {}
        for title, artist in songs:
            by_artist.setdefault(artist, []).append(title)
        heap = [(-len(titles), artist) for artist, titles in by_artist.items()]
        heapq.heapify(heap)
        playlist, held = [], None
        while heap:
            count, artist = heapq.heappop(heap)
            playlist.append(by_artist[artist].pop())
            if held:
                heapq.heappush(heap, held)
            held = (count + 1, artist) if count + 1 < 0 else None
        return [] if held else playlist
