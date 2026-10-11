import "sync"

type DiningPhilosophers struct {
	forks [5]sync.Mutex
}

func NewDiningPhilosophers() *DiningPhilosophers {
	return &DiningPhilosophers{}
}

func (this *DiningPhilosophers) WantsToEat(philosopher int, pickLeftFork, pickRightFork, eat, putLeftFork, putRightFork func()) {
	left, right := philosopher, (philosopher+1)%5
	// Locking the lower-numbered fork first prevents a cycle of waiting philosophers.
	first, second := min(left, right), max(left, right)
	this.forks[first].Lock()
	this.forks[second].Lock()
	defer this.forks[first].Unlock()
	defer this.forks[second].Unlock()
	pickLeftFork()
	pickRightFork()
	eat()
	putLeftFork()
	putRightFork()
}
