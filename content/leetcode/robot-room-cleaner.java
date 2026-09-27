class Solution {
    private final Set<String> seen=new HashSet<>();private final int[][] dirs={{-1,0},{0,1},{1,0},{0,-1}};
    public void cleanRoom(Robot robot){visit(robot,0,0,0);}
    private void visit(Robot robot,int r,int c,int direction){
        seen.add(r+","+c);robot.clean();
        for(int i=0;i<4;i++){int d=(direction+i)%4,nr=r+dirs[d][0],nc=c+dirs[d][1];
            if(!seen.contains(nr+","+nc)&&robot.move()){visit(robot,nr,nc,d);robot.turnRight();robot.turnRight();robot.move();robot.turnRight();robot.turnRight();}
            robot.turnRight();
        }
    }
}
