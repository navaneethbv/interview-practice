class MedianOfAStream {
    priority_queue<int> low;
    priority_queue<int, vector<int>, greater<int>> high;

public:
    MedianOfAStream() {}

    void insertNum(int num) {
        if (low.empty() || num <= low.top()) low.push(num);
        else high.push(num);
        if (low.size() > high.size() + 1) { high.push(low.top()); low.pop(); }
        else if (high.size() > low.size()) { low.push(high.top()); high.pop(); }
    }

    double findMedian() {
        if (low.size() == high.size()) return (low.top() + (double)high.top()) / 2.0;
        return low.top();
    }
};
