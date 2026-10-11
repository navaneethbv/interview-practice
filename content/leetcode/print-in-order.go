type Foo struct {
	firstDone  chan struct{}
	secondDone chan struct{}
}

func NewFoo() *Foo {
	return &Foo{firstDone: make(chan struct{}), secondDone: make(chan struct{})}
}

func (this *Foo) First(printFirst func()) {
	printFirst()
	close(this.firstDone)
}

func (this *Foo) Second(printSecond func()) {
	<-this.firstDone
	printSecond()
	close(this.secondDone)
}

func (this *Foo) Third(printThird func()) {
	<-this.secondDone
	printThird()
}
