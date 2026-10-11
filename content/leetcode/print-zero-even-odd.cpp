class ZeroEvenOdd {
    int n;
    mutex m;
    condition_variable cv;
    // 0 means zero's turn; otherwise the number to print next.
    int next = 0;
    int printed = 0;

public:
    ZeroEvenOdd(int n) : n(n) {}

    void zero(function<void(int)> printNumber) {
        for (int i = 1; i <= n; i++) {
            unique_lock<mutex> lock(m);
            cv.wait(lock, [&] { return next == 0; });
            printNumber(0);
            next = i;
            cv.notify_all();
        }
    }

    void even(function<void(int)> printNumber) { print(printNumber, 0); }

    void odd(function<void(int)> printNumber) { print(printNumber, 1); }

private:
    void print(function<void(int)>& printNumber, int parity) {
        for (int i = parity == 0 ? 2 : 1; i <= n; i += 2) {
            unique_lock<mutex> lock(m);
            cv.wait(lock, [&] { return next == i; });
            printNumber(i);
            next = 0;
            cv.notify_all();
        }
    }
};
