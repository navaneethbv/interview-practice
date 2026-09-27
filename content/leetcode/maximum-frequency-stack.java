class FreqStack {
    private final Map<Integer, Integer> frequencies = new HashMap<>();
    private final Map<Integer, Deque<Integer>> valuesByFrequency = new HashMap<>();
    private int maximumFrequency;

    public FreqStack() {
    }

    public void push(int value) {
        int frequency = frequencies.getOrDefault(value, 0) + 1;
        frequencies.put(value, frequency);
        valuesByFrequency.computeIfAbsent(frequency, ignored -> new ArrayDeque<>()).push(value);
        maximumFrequency = Math.max(maximumFrequency, frequency);
    }

    public int pop() {
        Deque<Integer> values = valuesByFrequency.get(maximumFrequency);
        int value = values.pop();
        frequencies.put(value, frequencies.get(value) - 1);
        if (values.isEmpty()) {
            maximumFrequency--;
        }
        return value;
    }
}
