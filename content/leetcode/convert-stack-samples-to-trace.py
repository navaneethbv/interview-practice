class Solution:
    def convertToTrace(self, timestamps, stacks):
        events = []
        previous = []
        for time, stack in zip(timestamps, stacks):
            common = 0
            while common < min(len(previous), len(stack)) and previous[common] == stack[common]:
                common += 1
            for name in reversed(previous[common:]):
                events.append(f"E {name} {time}")
            for name in stack[common:]:
                events.append(f"B {name} {time}")
            previous = stack
        for name in reversed(previous):
            events.append(f"E {name} {timestamps[-1]}")
        return events
