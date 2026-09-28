class Solution:
    def resultGrid(self, image, threshold):
        rows = len(image)
        columns = len(image[0])
        total_averages = [[0] * columns for _ in range(rows)]
        region_counts = [[0] * columns for _ in range(rows)]
        for top in range(rows - 2):
            for left in range(columns - 2):
                if not self._is_valid(image, top, left, threshold):
                    continue
                average = self._region_average(image, top, left)
                self._record_region(top, left, average, total_averages, region_counts)
        return self._build_result(image, total_averages, region_counts)

    def _is_valid(self, image, top, left, threshold):
        for row in range(top, top + 3):
            for column in range(left, left + 3):
                if row < top + 2 and abs(image[row][column] - image[row + 1][column]) > threshold:
                    return False
                if column < left + 2 and abs(image[row][column] - image[row][column + 1]) > threshold:
                    return False
        return True

    def _region_average(self, image, top, left):
        total = 0
        for row in range(top, top + 3):
            for column in range(left, left + 3):
                total += image[row][column]
        return total // 9

    def _record_region(self, top, left, average, total_averages, region_counts):
        for row in range(top, top + 3):
            for column in range(left, left + 3):
                total_averages[row][column] += average
                region_counts[row][column] += 1

    def _build_result(self, image, total_averages, region_counts):
        result = []
        for row, source_row in enumerate(image):
            output_row = []
            for column, original_value in enumerate(source_row):
                if region_counts[row][column] == 0:
                    output_row.append(original_value)
                else:
                    output_row.append(total_averages[row][column] // region_counts[row][column])
            result.append(output_row)
        return result
