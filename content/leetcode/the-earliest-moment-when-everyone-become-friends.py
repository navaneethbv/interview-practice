class Solution:
    def earliestAcq(self, logs, n):
        parent=list(range(n));size=[1]*n
        def find(x):
            while x!=parent[x]:parent[x]=parent[parent[x]];x=parent[x]
            return x
        for time,a,b in sorted(logs):
            a,b=find(a),find(b)
            if a!=b:
                if size[a]<size[b]:a,b=b,a
                parent[b]=a;size[a]+=size[b];n-=1
                if n==1:return time
        return -1
