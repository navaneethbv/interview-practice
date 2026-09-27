class Solution:
    def compress(self, chars):
        read_index = 0
        write_index = 0

        while read_index < len(chars):
            run_end = read_index + 1
            while run_end < len(chars) and chars[run_end] == chars[read_index]:
                run_end += 1

            chars[write_index] = chars[read_index]
            write_index += 1
            run_length = run_end - read_index
            if run_length > 1:
                for digit in str(run_length):
                    chars[write_index] = digit
                    write_index += 1
            read_index = run_end

        return write_index
