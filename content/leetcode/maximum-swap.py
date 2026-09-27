class Solution:
    def maximumSwap(self, num):
        digits = list(str(num))
        last_position = {digit: index for index, digit in enumerate(digits)}

        for index, current_digit in enumerate(digits):
            for candidate in "9876543210":
                if candidate <= current_digit:
                    break
                if last_position.get(candidate, -1) > index:
                    swap_index = last_position[candidate]
                    digits[index], digits[swap_index] = (
                        digits[swap_index],
                        digits[index],
                    )
                    return int("".join(digits))

        return num
