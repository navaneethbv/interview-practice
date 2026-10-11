type FooBar struct {
	n       int
	fooTurn chan struct{}
	barTurn chan struct{}
}

func NewFooBar(n int) *FooBar {
	fb := &FooBar{n: n, fooTurn: make(chan struct{}, 1), barTurn: make(chan struct{}, 1)}
	fb.fooTurn <- struct{}{}
	return fb
}

func (this *FooBar) Foo(printFoo func()) {
	for i := 0; i < this.n; i++ {
		<-this.fooTurn
		printFoo()
		this.barTurn <- struct{}{}
	}
}

func (this *FooBar) Bar(printBar func()) {
	for i := 0; i < this.n; i++ {
		<-this.barTurn
		printBar()
		this.fooTurn <- struct{}{}
	}
}
