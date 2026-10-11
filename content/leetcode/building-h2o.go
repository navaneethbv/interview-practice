import "sync"

type H2O struct {
	mu        sync.Mutex
	cond      *sync.Cond
	hydrogens int
	oxygens   int
}

func NewH2O() *H2O {
	h := &H2O{}
	h.cond = sync.NewCond(&h.mu)
	return h
}

func (this *H2O) Hydrogen(releaseHydrogen func()) {
	this.mu.Lock()
	defer this.mu.Unlock()
	for this.hydrogens == 2 {
		this.cond.Wait()
	}
	releaseHydrogen()
	this.hydrogens++
	this.finishMolecule()
}

func (this *H2O) Oxygen(releaseOxygen func()) {
	this.mu.Lock()
	defer this.mu.Unlock()
	for this.oxygens == 1 {
		this.cond.Wait()
	}
	releaseOxygen()
	this.oxygens++
	this.finishMolecule()
}

// finishMolecule runs with the lock held and opens the next molecule once this one is complete.
func (this *H2O) finishMolecule() {
	if this.hydrogens == 2 && this.oxygens == 1 {
		this.hydrogens, this.oxygens = 0, 0
	}
	this.cond.Broadcast()
}
