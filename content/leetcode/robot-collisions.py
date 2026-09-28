class Solution:
    def survivedRobotsHealths(self, positions, healths, directions):
        stack = []
        order = sorted(range(len(positions)), key=lambda index: positions[index])
        for index in order:
            if directions[index] == 'R':
                stack.append(index)
                continue
            while stack and healths[index] > 0:
                other = stack[-1]
                if healths[other] < healths[index]:
                    healths[other] = 0
                    healths[index] -= 1
                    stack.pop()
                elif healths[other] > healths[index]:
                    healths[other] -= 1
                    healths[index] = 0
                else:
                    healths[other] = 0
                    healths[index] = 0
                    stack.pop()
        return [health for health in healths if health > 0]
