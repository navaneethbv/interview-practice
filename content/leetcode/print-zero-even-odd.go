type ZeroEvenOdd struct {
	n    int
	zero chan struct{}
	odd  chan struct{}
	even chan struct{}
}

func NewZeroEvenOdd(n int) *ZeroEvenOdd {
	z := &ZeroEvenOdd{n: n, zero: make(chan struct{}, 1), odd: make(chan struct{}, 1), even: make(chan struct{}, 1)}
	z.zero <- struct{}{}
	return z
}

func (this *ZeroEvenOdd) Zero(printNumber func(int)) {
	for i := 1; i <= this.n; i++ {
		<-this.zero
		printNumber(0)
		if i%2 == 1 {
			this.odd <- struct{}{}
		} else {
			this.even <- struct{}{}
		}
	}
}

func (this *ZeroEvenOdd) Even(printNumber func(int)) {
	for i := 2; i <= this.n; i += 2 {
		<-this.even
		printNumber(i)
		this.zero <- struct{}{}
	}
}

func (this *ZeroEvenOdd) Odd(printNumber func(int)) {
	for i := 1; i <= this.n; i += 2 {
		<-this.odd
		printNumber(i)
		this.zero <- struct{}{}
	}
}
