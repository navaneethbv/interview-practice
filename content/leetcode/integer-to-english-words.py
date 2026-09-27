class Solution:
    def numberToWords(self, num):
        if num == 0:
            return 'Zero'
        scales = ['', 'Thousand', 'Million', 'Billion']
        groups = []
        scale_index = 0
        while num:
            num, group = divmod(num, 1000)
            if group:
                words = self._below_thousand(group)
                if scales[scale_index]:
                    words += ' ' + scales[scale_index]
                groups.append(words)
            scale_index += 1
        return ' '.join(reversed(groups))

    def _below_thousand(self, number):
        small = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
                 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
                 'Seventeen', 'Eighteen', 'Nineteen']
        tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
        if number < 20:
            return small[number]
        if number < 100:
            return (tens[number // 10] + ' ' + small[number % 10]).strip()
        return (small[number // 100] + ' Hundred ' + self._below_thousand(number % 100)).strip()
