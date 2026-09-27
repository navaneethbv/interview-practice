class Fancy:
 MOD=1000000007
 def __init__(self):self.a=[];self.mul=1;self.add=0
 def append(self,val):self.a.append((val-self.add)*pow(self.mul,self.MOD-2,self.MOD)%self.MOD)
 def addAll(self,inc):self.add=(self.add+inc)%self.MOD
 def multAll(self,m):self.mul=self.mul*m%self.MOD;self.add=self.add*m%self.MOD
 def getIndex(self,idx):return (self.a[idx]*self.mul+self.add)%self.MOD if idx<len(self.a) else -1
