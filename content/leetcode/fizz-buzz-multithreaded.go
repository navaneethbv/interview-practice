import "sync"

type FizzBuzz struct {
	n       int
	current int
	mu      sync.Mutex
	cond    *sync.Cond
}

func NewFizzBuzz(n int) *FizzBuzz {
	fb := &FizzBuzz{n: n, current: 1}
	fb.cond = sync.NewCond(&fb.mu)
	return fb
}

func (this *FizzBuzz) Fizz(printFizz func()) {
	this.run(func(i int) bool { return i%3 == 0 && i%5 != 0 }, func(int) { printFizz() })
}

func (this *FizzBuzz) Buzz(printBuzz func()) {
	this.run(func(i int) bool { return i%5 == 0 && i%3 != 0 }, func(int) { printBuzz() })
}

func (this *FizzBuzz) Fizzbuzz(printFizzBuzz func()) {
	this.run(func(i int) bool { return i%15 == 0 }, func(int) { printFizzBuzz() })
}

func (this *FizzBuzz) Number(printNumber func(int)) {
	this.run(func(i int) bool { return i%3 != 0 && i%5 != 0 }, printNumber)
}

func (this *FizzBuzz) run(mine func(int) bool, print func(int)) {
	this.mu.Lock()
	defer this.mu.Unlock()
	for this.current <= this.n {
		if mine(this.current) {
			print(this.current)
			this.current++
			this.cond.Broadcast()
		} else {
			this.cond.Wait()
		}
	}
}
