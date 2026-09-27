class ProductOfNumbers:
    def __init__(self):self.prefix=[1]
    def add(self,num):
        if num==0:self.prefix=[1]
        else:self.prefix.append(self.prefix[-1]*num)
    def getProduct(self,k):return 0 if k>=len(self.prefix) else self.prefix[-1]//self.prefix[-k-1]
