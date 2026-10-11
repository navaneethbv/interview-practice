class Foo {
    mutex m;
    condition_variable cv;
    int done = 0;

public:
    Foo() {}

    void first(function<void()> printFirst) {
        printFirst();
        advance(1);
    }

    void second(function<void()> printSecond) {
        wait(1);
        printSecond();
        advance(2);
    }

    void third(function<void()> printThird) {
        wait(2);
        printThird();
    }

private:
    void wait(int step) {
        unique_lock<mutex> lock(m);
        cv.wait(lock, [&] { return done >= step; });
    }

    void advance(int step) {
        lock_guard<mutex> lock(m);
        done = step;
        cv.notify_all();
    }
};
