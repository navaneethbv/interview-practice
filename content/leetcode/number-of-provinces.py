class Solution:
    def findCircleNum(self, isConnected):
        seen=set();count=0
        for city in range(len(isConnected)):
            if city in seen:continue
            count+=1;stack=[city];seen.add(city)
            while stack:
                node=stack.pop()
                for other,edge in enumerate(isConnected[node]):
                    if edge and other not in seen:seen.add(other);stack.append(other)
        return count
