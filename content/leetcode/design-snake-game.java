class SnakeGame {
    private final int width;
    private final int height;
    private final int[][] food;
    private int eaten = 0;
    private final Deque<Integer> body = new ArrayDeque<>();
    private final Set<Integer> cells = new HashSet<>();

    public SnakeGame(int width, int height, int[][] food) {
        this.width = width;
        this.height = height;
        this.food = food;
        body.addFirst(0);
        cells.add(0);
    }

    public int move(String direction) {
        int head = body.peekFirst();
        int r = head / width;
        int c = head % width;
        switch (direction) {
            case "U":
                r--;
                break;
            case "D":
                r++;
                break;
            case "L":
                c--;
                break;
            default:
                c++;
        }
        if (r < 0 || r >= height || c < 0 || c >= width) {
            return -1;
        }
        int next = r * width + c;
        if (eaten < food.length && food[eaten][0] == r && food[eaten][1] == c) {
            eaten++;
        } else {
            cells.remove(body.pollLast());
            if (cells.contains(next)) {
                return -1;
            }
        }
        body.addFirst(next);
        cells.add(next);
        return eaten;
    }
}
