class Solution:
    def depthSum(self, nestedList):
        def total(items,depth):
            return sum(item.getInteger()*depth if item.isInteger() else total(item.getList(),depth+1) for item in items)
        return total(nestedList,1)
