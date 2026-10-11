class H2O {
    mutex m;
    condition_variable cv;
    int hydrogens = 0;
    int oxygens = 0;

public:
    H2O() {}

    void hydrogen(function<void()> releaseHydrogen) {
        unique_lock<mutex> lock(m);
        cv.wait(lock, [&] { return hydrogens < 2; });
        releaseHydrogen();
        hydrogens++;
        finishMolecule();
    }

    void oxygen(function<void()> releaseOxygen) {
        unique_lock<mutex> lock(m);
        cv.wait(lock, [&] { return oxygens < 1; });
        releaseOxygen();
        oxygens++;
        finishMolecule();
    }

private:
    // Called with the lock held: once a molecule is complete, open the next one.
    void finishMolecule() {
        if (hydrogens == 2 && oxygens == 1) {
            hydrogens = 0;
            oxygens = 0;
        }
        cv.notify_all();
    }
};
