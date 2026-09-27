class Solution:
    def findRLEArray(self, encoded1, encoded2):
        first_index = 0
        second_index = 0
        first_remaining = encoded1[0][1]
        second_remaining = encoded2[0][1]
        product_runs = []

        while first_index < len(encoded1):
            run_length = min(first_remaining, second_remaining)
            product = encoded1[first_index][0] * encoded2[second_index][0]

            if product_runs and product_runs[-1][0] == product:
                product_runs[-1][1] += run_length
            else:
                product_runs.append([product, run_length])

            first_remaining -= run_length
            second_remaining -= run_length
            if first_remaining == 0:
                first_index += 1
                if first_index < len(encoded1):
                    first_remaining = encoded1[first_index][1]
            if second_remaining == 0:
                second_index += 1
                if second_index < len(encoded2):
                    second_remaining = encoded2[second_index][1]

        return product_runs
