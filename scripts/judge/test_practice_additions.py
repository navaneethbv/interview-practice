"""Independent exhaustive/seeded oracles for the October practice additions."""
import importlib.util
import itertools
from pathlib import Path
import random
import unittest

ROOT = Path(__file__).resolve().parents[2] / 'content' / 'leetcode'


def solution(slug):
    spec = importlib.util.spec_from_file_location(slug, ROOT / f'{slug}.py')
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module.Solution()


class PracticeAdditions(unittest.TestCase):
    def test_substrings_exhaustive(self):
        solver = solution('number-of-substrings-containing-all-three-characters')
        for size in range(1, 8):
            for letters in itertools.product('abc', repeat=size):
                text = ''.join(letters)
                expected = sum(set(text[left:right]) == set('abc')
                               for left in range(size) for right in range(left + 1, size + 1))
                self.assertEqual(solver.numberOfSubstrings(text), expected, text)

    def test_heaters_seeded(self):
        solver = solution('heaters')
        rng = random.Random(475)
        for _ in range(300):
            houses = [rng.randint(1, 100) for _ in range(rng.randint(1, 20))]
            heaters = [rng.randint(1, 100) for _ in range(rng.randint(1, 20))]
            expected = max(min(abs(house - heater) for heater in heaters) for house in houses)
            self.assertEqual(solver.findRadius(houses[:], heaters[:]), expected)

    def test_jump_seeded(self):
        solver = solution('jump-game-vi')
        rng = random.Random(1696)
        for _ in range(300):
            nums = [rng.randint(-20, 20) for _ in range(rng.randint(1, 30))]
            k = rng.randint(1, len(nums))
            scores = [nums[0]]
            for index in range(1, len(nums)):
                scores.append(nums[index] + max(scores[max(0, index-k):index]))
            self.assertEqual(solver.maxResult(nums, k), scores[-1], (nums, k))

    def test_large_boundaries(self):
        substrings = solution('number-of-substrings-containing-all-three-characters')
        length = 50000
        text = ('abc' * ((length + 2) // 3))[:length]
        self.assertEqual(substrings.numberOfSubstrings(text), (length - 2) * (length - 1) // 2)
        jump = solution('jump-game-vi')
        self.assertEqual(jump.maxResult([10000] * 100000, 100000), 1000000000)
        self.assertEqual(jump.maxResult([-10000] * 100000, 1), -1000000000)
        heaters = solution('heaters')
        self.assertEqual(heaters.findRadius([1, 1000000000], [1]), 999999999)


if __name__ == '__main__':
    unittest.main()
