class FizzBuzz {
    int n;
    int current = 1;
    mutex m;
    condition_variable cv;

public:
    FizzBuzz(int n) : n(n) {}

    void fizz(function<void()> printFizz) {
        run([](int i) { return i % 3 == 0 && i % 5 != 0; }, [&](int) { printFizz(); });
    }

    void buzz(function<void()> printBuzz) {
        run([](int i) { return i % 5 == 0 && i % 3 != 0; }, [&](int) { printBuzz(); });
    }

    void fizzbuzz(function<void()> printFizzBuzz) {
        run([](int i) { return i % 15 == 0; }, [&](int) { printFizzBuzz(); });
    }

    void number(function<void(int)> printNumber) {
        run([](int i) { return i % 3 != 0 && i % 5 != 0; }, printNumber);
    }

private:
    void run(function<bool(int)> mine, function<void(int)> print) {
        while (true) {
            unique_lock<mutex> lock(m);
            cv.wait(lock, [&] { return current > n || mine(current); });
            if (current > n) return;
            print(current);
            current++;
            cv.notify_all();
        }
    }
};
