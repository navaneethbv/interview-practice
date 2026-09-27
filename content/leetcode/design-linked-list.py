class _Link:
    def __init__(self,value=0,next=None):self.value=value;self.next=next
class MyLinkedList:
    def __init__(self):self.head=_Link();self.size=0
    def get(self,index):
        if index<0 or index>=self.size:return -1
        node=self.head.next
        for _ in range(index):node=node.next
        return node.value
    def addAtHead(self,val):self.addAtIndex(0,val)
    def addAtTail(self,val):self.addAtIndex(self.size,val)
    def addAtIndex(self,index,val):
        if index>self.size:return
        node=self.head
        for _ in range(max(0,index)):node=node.next
        node.next=_Link(val,node.next);self.size+=1
    def deleteAtIndex(self,index):
        if index<0 or index>=self.size:return
        node=self.head
        for _ in range(index):node=node.next
        node.next=node.next.next;self.size-=1
