import "container/list"

type entry struct{ key, value int }

type LRUCache struct {
	capacity int
	order    *list.List
	index    map[int]*list.Element
}

func Constructor(capacity int) LRUCache {
	return LRUCache{capacity, list.New(), map[int]*list.Element{}}
}

func (this *LRUCache) Get(key int) int {
	el, ok := this.index[key]
	if !ok {
		return -1
	}
	this.order.MoveToFront(el)
	return el.Value.(*entry).value
}

func (this *LRUCache) Put(key int, value int) {
	if el, ok := this.index[key]; ok {
		el.Value.(*entry).value = value
		this.order.MoveToFront(el)
		return
	}
	this.index[key] = this.order.PushFront(&entry{key, value})
	if this.order.Len() > this.capacity {
		last := this.order.Back()
		this.order.Remove(last)
		delete(this.index, last.Value.(*entry).key)
	}
}
