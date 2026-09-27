def _find(parent, x):
    while parent[x] != x:
        parent[x] = parent[parent[x]]
        x = parent[x]
    return x

class Solution:
    def numIslands2(self, _m, _n, positions):
        parent = {}
        component_size = {}
        island_count = 0
        result = []
        for row, column in positions:
            if (row, column) not in parent:
                self._add_land(parent, component_size, row, column)
                island_count += 1
                island_count -= self._merge_neighbors(
                    parent, component_size, row, column
                )
            result.append(island_count)
        return result

    def _add_land(self, parent, component_size, row, column):
        cell = (row, column)
        parent[cell] = cell
        component_size[cell] = 1

    def _merge_neighbors(self, parent, component_size, row, column):
        merges = 0
        for neighbor in self._neighbors(row, column):
            if neighbor not in parent:
                continue
            if self._union(parent, component_size, (row, column), neighbor):
                merges += 1
        return merges

    def _union(self, parent, component_size, first, second):
        first_root = _find(parent, first)
        second_root = _find(parent, second)
        if first_root == second_root:
            return False
        if component_size[first_root] > component_size[second_root]:
            first_root, second_root = second_root, first_root
        parent[first_root] = second_root
        component_size[second_root] += component_size[first_root]
        return True

    def _neighbors(self, row, column):
        return (
            (row - 1, column),
            (row + 1, column),
            (row, column - 1),
            (row, column + 1),
        )
