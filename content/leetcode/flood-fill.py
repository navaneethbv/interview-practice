class Solution:
    def floodFill(self, image, sr, sc, color):
        original = image[sr][sc]
        if original == color:
            return image
        stack = [(sr,sc)]
        image[sr][sc] = color
        while stack:
            r,c = stack.pop()
            for a,b in ((r-1,c),(r+1,c),(r,c-1),(r,c+1)):
                if 0<=a<len(image) and 0<=b<len(image[0]) and image[a][b]==original:
                    image[a][b]=color
                    stack.append((a,b))
        return image
