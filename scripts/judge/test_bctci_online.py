"""Independent small-instance checks for the BCTCI online-chapter references.

Run with python3 -B scripts/judge/test_bctci_online.py.
These checks do not regenerate judge expectations.
"""
import copy
import importlib.util
import itertools
import json
import unittest
from collections import deque
from functools import lru_cache
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def fixture_cases(group):
    """Replay the original seeds 601-608 without runtime random generation."""
    path = Path(__file__).with_name('fixtures') / 'bctci_online.json'
    return json.loads(path.read_text())[group]


@lru_cache(None)
def reference(slug, class_name="Solution"):
    path = ROOT / 'content' / 'leetcode' / f'bctci-{slug}.py'
    spec = importlib.util.spec_from_file_location(slug.replace('-', '_'), path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return getattr(module, class_name)


def solve(slug, *args):
    return reference(slug)().solve(*copy.deepcopy(args))


def components(n, edges):
    adjacency = [set() for _ in range(n)]
    for edge in edges:
        a, b = edge[:2]
        adjacency[a].add(b)
        adjacency[b].add(a)
    unseen = set(range(n))
    sizes = []
    while unseen:
        queue = [unseen.pop()]
        size = 0
        while queue:
            node = queue.pop()
            size += 1
            neighbors = adjacency[node] & unseen
            unseen.difference_update(neighbors)
            queue.extend(neighbors)
        sizes.append(size)
    return sizes


class OnlineReferenceTests(unittest.TestCase):
    def test_song_ranking_comparisons_are_consistent(self):
        ranked = reference('top-songs-class', 'Ranked')
        smaller = ranked(3, 'a')
        equal = ranked(3, 'a')
        larger = ranked(4, 'z')
        tie_loser = ranked(3, 'b')
        self.assertEqual(smaller, equal)
        self.assertFalse(smaller != equal)
        self.assertTrue(smaller <= equal and smaller >= equal)
        self.assertTrue(smaller < larger and larger > smaller)
        self.assertTrue(tie_loser < smaller)
        self.assertEqual(sorted([larger, smaller, tie_loser]), [tie_loser, smaller, larger])
        self.assertIs(smaller.__eq__(object()), NotImplemented)
        self.assertIs(smaller.__lt__(object()), NotImplemented)

    def test_windows_and_nearest_neighbors(self):
        for values, width, limit in fixture_cases('windows'):
            windows = [values[i:i + width] for i in range(len(values) - width + 1)]
            self.assertEqual(solve('largest-temperature-change', values, width),
                             max(max(window) - min(window) for window in windows))
            stable = max(j - i for i in range(len(values)) for j in range(i + 1, len(values) + 1)
                         if max(values[i:j]) - min(values[i:j]) <= limit)
            self.assertEqual(solve('longest-stable-period', values, limit), stable)
            greater = [next((j for j in range(i + 1, len(values)) if values[j] > value), -1)
                       for i, value in enumerate(values)]
            self.assertEqual(solve('next-greater-element', values), greater)
            heights = [value + 6 for value in values]
            for distance in [1, width, len(values)]:
                expected = [any(v < height for v in heights[max(0, i - distance):i])
                            and any(v > height for v in heights[i + 1:i + distance + 1])
                            for i, height in enumerate(heights)]
                self.assertEqual(solve('king-kong-vs-godzilla-in-the-fog', heights, distance), expected)
                if distance == len(values):
                    self.assertEqual(solve('king-kong-vs-godzilla', heights), expected)

    def test_histogram_by_all_intervals(self):
        for n in range(1, 6):
            for heights in itertools.product(range(min(n, 3) + 1), repeat=n):
                expected = max(min(heights[i:j]) * (j - i)
                               for i in range(n) for j in range(i + 1, n + 1))
                self.assertEqual(solve('largest-rectangle', list(heights)), expected)

    def test_graphs_by_spanning_tree_enumeration(self):
        for n, edges in fixture_cases('graphs'):
            trees = []
            for indices in itertools.combinations(range(len(edges)), n - 1):
                if len(components(n, [edges[i] for i in indices])) == 1:
                    trees.append((sum(edges[i][2] for i in indices), set(indices)))
            optimum = min(cost for cost, _ in trees)
            best = [indices for cost, indices in trees if cost == optimum]
            self.assertEqual(solve('minimum-spanning-tree', n, edges), optimum)
            result = solve('mst-reconstruction', n, edges)
            self.assertEqual(len(result), n - 1)
            self.assertEqual(len(components(n, result)), 1)
            self.assertEqual(sum(edge[2] for edge in result), optimum)
            for index in range(len(edges)):
                self.assertEqual(solve('edge-in-mst', n, edges, index),
                                 all(index in indices for indices in best))

    def test_time_queries_by_graph_traversal(self):
        for n, edges in fixture_cases('time_queries'):
            times = [1, 2, 2, 3, 4, 5, 6, 7, 8]
            groups = [components(n, [edge for edge in edges if edge[2] <= time]) for time in times]
            self.assertEqual(solve('connected-components-over-time', n, edges, times), list(map(len, groups)))
            self.assertEqual(solve('largest-connected-component-over-time', n, edges, times), list(map(max, groups)))

    def test_magic_balls_by_every_reduction(self):
        @lru_cache(None)
        def outcomes(state):
            if sum(state) == 1:
                return frozenset('RGB'[state.index(1)])
            result = set()
            for a in range(3):
                for b in range(a, 3):
                    needed = 2 if a == b else 1
                    if state[a] < needed or state[b] < needed:
                        continue
                    next_state = list(state)
                    next_state[a] -= 1
                    next_state[b] -= 1
                    next_state[a if a == b else 3 - a - b] += 1
                    result.update(outcomes(tuple(next_state)))
            return frozenset(result)
        for state in itertools.product(range(5), repeat=3):
            if sum(state):
                self.assertEqual(solve('magic-balls', *state), ''.join(sorted(outcomes(state))))

    def test_training_by_state_space_search(self):
        for target in range(2, 151):
            queue = deque([(1, 0, 0)])
            seen = {(1, 0)}
            while queue:
                recruiters, untrained, days = queue.popleft()
                if recruiters == target:
                    self.assertEqual(solve('hiring-and-training', target), days)
                    break
                moves = [(recruiters, untrained + recruiters)]
                if untrained:
                    moves.append((recruiters + untrained, 0))
                for state in moves:
                    if sum(state) <= target and state not in seen:
                        seen.add(state)
                        queue.append((*state, days + 1))

    def test_election_by_sorted_rounds(self):
        for names, votes in fixture_cases('elections'):
            parties = list(zip(names, votes))
            total = sum(votes)
            while max(count for _, count in parties) * 2 <= total:
                cutoff = sorted(count for _, count in parties)[1]
                merged = [(name, count) for name, count in parties if count <= cutoff]
                parties = [(name, count) for name, count in parties if count > cutoff]
                leader = sorted(merged, key=lambda item: (-item[1], item[0]))[0][0]
                parties.append((leader, sum(count for _, count in merged)))
            expected = next(name for name, count in parties if count * 2 > total)
            self.assertEqual(solve('presidential-election', names, votes), expected)

    def test_booster_arrays_by_enumeration(self):
        for values, target, flips, days, ads, a, b in fixture_cases('arrays'):
            self.assertEqual(solve('3-sum', values, target),
                             any(sum(triple) == target for triple in itertools.combinations(values, 3)))
            binary = [value % 2 for value in values]
            expected = max([0] + [j - i for i in range(len(binary)) for j in range(i + 1, len(binary) + 1)
                                   if binary[i:j].count(0) <= flips])
            self.assertEqual(solve('most-ones-with-k-flips', binary, flips), expected)
            expected = [i for i in range(len(days)) if sum(days[j] < days[i] and ads[j] > ads[i]
                                                         for j in range(len(days))) == 1]
            self.assertEqual(solve('company-launches', days, ads), expected)
            result = solve('interval-xor', a, b)
            actual = {point for left, right in result for point in range(left, right)}
            self.assertEqual(actual, set(range(*a)) ^ set(range(*b)))
            self.assertTrue(all(left < right for left, right in result))
            self.assertTrue(all(result[i][1] < result[i + 1][0] for i in range(len(result) - 1)))

    def test_strings_by_enumeration(self):
        for text, pattern, counts in fixture_cases('strings'):
            width = len(pattern)
            expected = {text[i:i + width] for i in range(len(text) - width + 1)
                        if sorted(text[i:i + width]) == sorted(pattern)}
            self.assertEqual(solve('sub-permutations', pattern, text), len(expected))
            self.assertEqual(solve('count-substrings-without-letter', text),
                             sum('a' not in text[i:j] for i in range(len(text))
                                 for j in range(i + 1, len(text) + 1)))
            text = ''.join(chr(97 + i) * count for i, count in enumerate(counts))
            best = 0
            for start in range(26):
                remaining = counts[:]
                position = start
                length = 0
                while remaining[position]:
                    remaining[position] -= 1
                    length += 1
                    position = (position + 1) % 26
                best = max(best, length)
            self.assertEqual(solve('longest-alphabet-chain', text), best)

    def test_game_by_all_shooting_orders(self):
        for players in fixture_cases('games'):
            edges = []
            for i, (x, y) in enumerate(players):
                for j, (a, b) in enumerate(players):
                    if i == j:
                        continue
                    visible = x == a and not any(px == x and min(y, b) < py < max(y, b)
                                                  for px, py in players)
                    visible |= y == b and not any(py == y and min(x, a) < px < max(x, a)
                                                  for px, py in players)
                    if visible:
                        edges.append((i, j))
            @lru_cache(None)
            def survivors(mask):
                answers = [survivors(mask & ~(1 << victim)) for shooter, victim in edges
                           if mask & (1 << shooter) and mask & (1 << victim)]
                return min(answers) if answers else mask.bit_count()
            self.assertEqual(solve('multiplayer-video-game', players), survivors((1 << len(players)) - 1))

    def test_tree_diameters_by_all_pairs(self):
        for children, edges in fixture_cases('trees'):
            n = len(children)
            distances = [[n] * n for _ in range(n)]
            for i in range(n):
                distances[i][i] = 0
            for a, b in edges:
                distances[a][b] = distances[b][a] = 1
            for k in range(n):
                for i in range(n):
                    for j in range(n):
                        distances[i][j] = min(distances[i][j], distances[i][k] + distances[k][j])
            expected = max(map(max, distances))
            labels = ['n' + chr(97 + i // 26) + chr(97 + i % 26) for i in range(n)]
            self.assertEqual(solve('tree-diameter', labels, children), expected)
            self.assertEqual(solve('unrooted-tree-diameter', n, edges), expected)

    def test_tunnels_by_all_small_valid_grids(self):
        for mask in range(1 << 9):
            if not (mask & 1 and mask & 4):
                continue
            occupied = {i for i in range(9) if mask & (1 << i)}
            visited = {0}
            queue = [0]
            while queue:
                index = queue.pop()
                row, column = divmod(index, 3)
                for r, c in [(row - 1, column), (row + 1, column), (row, column - 1), (row, column + 1)]:
                    neighbor = 3 * r + c
                    if 0 <= r < 3 and 0 <= c < 3 and neighbor in occupied and neighbor not in visited:
                        visited.add(neighbor)
                        queue.append(neighbor)
            if visited == occupied:
                matrix = [[int(3 * r + c in occupied) for c in range(3)] for r in range(3)]
                self.assertEqual(solve('tunnel-depth', matrix), max(occupied) // 3)

    def test_numeric_boosters(self):
        for n in range(1, 501):
            self.assertEqual(solve('list-of-divisors', n), [d for d in range(1, n + 1) if n % d == 0])
        sequence = [0]
        for _ in range(10):
            sequence += [value + 1 for value in sequence]
        for index, value in enumerate(sequence):
            self.assertEqual(solve('self-doubling-sequence', index), value)


if __name__ == '__main__':
    unittest.main()
