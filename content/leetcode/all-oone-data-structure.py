class Bucket:
    def __init__(self,count):self.count=count;self.keys=set();self.prev=self.next=None
class AllOne:
    def __init__(self):
        self.head=Bucket(0);self.tail=Bucket(0);self.head.next=self.tail;self.tail.prev=self.head;self.where={}
    def _after(self,node,count):
        new=Bucket(count);new.prev=node;new.next=node.next;node.next.prev=new;node.next=new;return new
    def _remove(self,node):
        if node is not self.head and node is not self.tail and not node.keys:node.prev.next=node.next;node.next.prev=node.prev
    def inc(self,key):
        old=self.where.get(key,self.head)
        target=old.next
        if target is self.tail or target.count!=old.count+1:target=self._after(old,old.count+1)
        target.keys.add(key);self.where[key]=target
        old.keys.discard(key);self._remove(old)
    def dec(self,key):
        old=self.where[key]
        if old.count==1:del self.where[key]
        else:
            target=old.prev
            if target is self.head or target.count!=old.count-1:target=self._after(old.prev,old.count-1)
            target.keys.add(key);self.where[key]=target
        old.keys.remove(key);self._remove(old)
    def getMaxKey(self):return next(iter(self.tail.prev.keys),'')
    def getMinKey(self):return next(iter(self.head.next.keys),'')
