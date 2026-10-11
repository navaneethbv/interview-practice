class H2O {
    private final Semaphore hydrogen = new Semaphore(2);
    private final Semaphore oxygen = new Semaphore(1);
    private final CyclicBarrier molecule = new CyclicBarrier(3);
    private final Object release = new Object();

    public H2O() {
    }

    public void hydrogen(Runnable releaseHydrogen) throws InterruptedException {
        hydrogen.acquire();
        bond(releaseHydrogen);
        hydrogen.release();
    }

    public void oxygen(Runnable releaseOxygen) throws InterruptedException {
        oxygen.acquire();
        bond(releaseOxygen);
        oxygen.release();
    }

    /** All three atoms of a molecule wait for each other, release, then wait again before leaving. */
    private void bond(Runnable releaseAtom) throws InterruptedException {
        try {
            molecule.await();
            synchronized (release) {
                releaseAtom.run();
            }
            molecule.await();
        } catch (BrokenBarrierException e) {
            throw new IllegalStateException(e);
        }
    }
}
