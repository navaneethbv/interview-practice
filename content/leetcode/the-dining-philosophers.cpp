class DiningPhilosophers {
    mutex forks[5];

public:
    DiningPhilosophers() {}

    void wantsToEat(int philosopher, function<void()> pickLeftFork, function<void()> pickRightFork,
                    function<void()> eat, function<void()> putLeftFork, function<void()> putRightFork) {
        int left = philosopher, right = (philosopher + 1) % 5;
        // Locking the lower-numbered fork first prevents a cycle of waiting philosophers.
        scoped_lock lock(forks[min(left, right)], forks[max(left, right)]);
        pickLeftFork();
        pickRightFork();
        eat();
        putLeftFork();
        putRightFork();
    }
};
