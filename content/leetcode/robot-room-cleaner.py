class Solution:
    def cleanRoom(self, robot):
        directions=[(-1,0),(0,1),(1,0),(0,-1)]; visited=set()
        def back():
            robot.turnRight(); robot.turnRight(); robot.move(); robot.turnRight(); robot.turnRight()
        def visit(row,col,direction):
            visited.add((row,col)); robot.clean()
            for i in range(4):
                d=(direction+i)%4; dr,dc=directions[d]; cell=(row+dr,col+dc)
                if cell not in visited and robot.move():
                    visit(*cell,d); back()
                robot.turnRight()
        visit(0,0,0)
