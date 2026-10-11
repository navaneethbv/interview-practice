class FizzBuzz {
    private final int n;
    private int current = 1;

    public FizzBuzz(int n) {
        this.n = n;
    }

    public void fizz(Runnable printFizz) throws InterruptedException {
        run(i -> i % 3 == 0 && i % 5 != 0, i -> printFizz.run());
    }

    public void buzz(Runnable printBuzz) throws InterruptedException {
        run(i -> i % 5 == 0 && i % 3 != 0, i -> printBuzz.run());
    }

    public void fizzbuzz(Runnable printFizzBuzz) throws InterruptedException {
        run(i -> i % 15 == 0, i -> printFizzBuzz.run());
    }

    public void number(IntConsumer printNumber) throws InterruptedException {
        run(i -> i % 3 != 0 && i % 5 != 0, printNumber);
    }

    /** Each thread waits until the current number is its own, prints it, and advances. */
    private synchronized void run(IntPredicate mine, IntConsumer print) throws InterruptedException {
        while (current <= n) {
            if (mine.test(current)) {
                print.accept(current);
                current++;
                notifyAll();
            } else {
                wait();
            }
        }
    }
}
