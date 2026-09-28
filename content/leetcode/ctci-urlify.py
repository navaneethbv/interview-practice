class Solution:
    def urlify(self, value, trueLength):
        return value[:trueLength].replace(" ", "%20")
