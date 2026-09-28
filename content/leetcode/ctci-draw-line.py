class Solution:
    def drawLine(self, screen, width, x1, x2, y):
        result = list(screen)
        row_start = y * (width // 8)
        first_byte, last_byte = x1 // 8, x2 // 8
        start_mask = 0xFF >> (x1 % 8)
        end_mask = (0xFF << (7 - x2 % 8)) & 0xFF
        if first_byte == last_byte:
            result[row_start + first_byte] |= start_mask & end_mask
            return result
        result[row_start + first_byte] |= start_mask
        for byte in range(first_byte + 1, last_byte):
            result[row_start + byte] = 0xFF
        result[row_start + last_byte] |= end_mask
        return result
