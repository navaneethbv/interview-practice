class Solution:
    def numberOfStableArrays(self, zero, one, limit):
        modulus = 1_000_000_007
        ending_zero = [[0] * (one + 1) for _ in range(zero + 1)]
        ending_one = [[0] * (one + 1) for _ in range(zero + 1)]
        for count in range(1, min(zero, limit) + 1):
            ending_zero[count][0] = 1
        for count in range(1, min(one, limit) + 1):
            ending_one[0][count] = 1
        for zeros in range(1, zero + 1):
            for ones in range(1, one + 1):
                ending_zero[zeros][ones] = ending_zero[zeros - 1][ones]
                ending_zero[zeros][ones] += ending_one[zeros - 1][ones]
                if zeros > limit:
                    ending_zero[zeros][ones] -= ending_one[zeros - limit - 1][ones]
                ending_zero[zeros][ones] %= modulus
                ending_one[zeros][ones] = ending_zero[zeros][ones - 1]
                ending_one[zeros][ones] += ending_one[zeros][ones - 1]
                if ones > limit:
                    ending_one[zeros][ones] -= ending_zero[zeros][ones - limit - 1]
                ending_one[zeros][ones] %= modulus
        return (ending_zero[zero][one] + ending_one[zero][one]) % modulus
