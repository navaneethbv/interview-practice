class Solution {
private void addOnes(int[] digits, Set<Integer> numbers, int hundreds, int tens) {
    for (int ones = 0; ones < digits.length; ones++) {
        if (ones == hundreds || ones == tens) {
            continue;
        }
        if (digits[ones] % 2 != 0) {
            continue;
        }
        numbers.add(100 * digits[hundreds] + 10 * digits[tens] + digits[ones]);
    }
}

private void addTens(int[] digits, Set<Integer> numbers, int hundreds) {
    for (int tens = 0; tens < digits.length; tens++) {
        if (tens == hundreds) {
            continue;
        }
        addOnes(digits, numbers, hundreds, tens);
    }
}

private void addNumbers(int[] digits, Set<Integer> numbers) {
    for (int hundreds = 0; hundreds < digits.length; hundreds++) {
        if (digits[hundreds] != 0) {
            addTens(digits, numbers, hundreds);
        }
    }
}

public int totalNumbers(int[] digits) {
    Set<Integer> numbers = new HashSet<>();
    addNumbers(digits, numbers);
    return numbers.size();
}
}
