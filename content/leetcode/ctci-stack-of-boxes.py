class Solution:
    def tallestStack(self, boxes):
        ordered = sorted(boxes, key=lambda box: box[1])
        best_with_base = []
        for index, base in enumerate(ordered):
            tallest_above = 0
            for above in range(index):
                if self._fits_on(ordered[above], base):
                    tallest_above = max(tallest_above, best_with_base[above])
            best_with_base.append(base[1] + tallest_above)
        return max(best_with_base, default=0)

    def _fits_on(self, top, bottom):
        return all(t < b for t, b in zip(top, bottom))
