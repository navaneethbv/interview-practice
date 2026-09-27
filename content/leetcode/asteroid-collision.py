class Solution:
    def asteroidCollision(self, asteroids):
        stack=[]
        for value in asteroids:
            alive=True
            while alive and value<0 and stack and stack[-1]>0:
                if stack[-1]<-value:stack.pop()
                else:
                    if stack[-1]==-value:stack.pop()
                    alive=False
            if alive:stack.append(value)
        return stack
