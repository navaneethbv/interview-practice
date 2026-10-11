class FooBar {
    int n;
    mutex m;
    condition_variable cv;
    bool fooTurn = true;

public:
    FooBar(int n) : n(n) {}

    void foo(function<void()> printFoo) {
        for (int i = 0; i < n; i++) {
            unique_lock<mutex> lock(m);
            cv.wait(lock, [&] { return fooTurn; });
            printFoo();
            fooTurn = false;
            cv.notify_all();
        }
    }

    void bar(function<void()> printBar) {
        for (int i = 0; i < n; i++) {
            unique_lock<mutex> lock(m);
            cv.wait(lock, [&] { return !fooTurn; });
            printBar();
            fooTurn = true;
            cv.notify_all();
        }
    }
};
