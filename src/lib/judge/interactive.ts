import type { ProblemSpec } from "./types";

export function usesInteractive(spec: ProblemSpec): boolean {
  if (spec.kind === "sql") return false;
  const params = spec.kind === "design" ? [...spec.ctorParams, ...spec.methods.flatMap((m) => m.params)] : spec.params;
  return params.some((p) => p.type === "Robot" || p.type === "Master");
}

/** Problem-specific objects exposed to submitted solutions. */
export const PYTHON_INTERACTIVE = `
class Robot:
    def __init__(self, data):
        self._room = data["room"]
        self._row, self._col = data["start"]
        self._direction = 0
        self._cleaned = set()
        self._calls = 0
    def _tick(self):
        self._calls += 1
        if self._calls > 100000: raise ValueError("Robot operation limit exceeded")
    def move(self):
        self._tick()
        dr, dc = [(-1,0),(0,1),(1,0),(0,-1)][self._direction]
        row, col = self._row + dr, self._col + dc
        if 0 <= row < len(self._room) and 0 <= col < len(self._room[0]) and self._room[row][col]:
            self._row, self._col = row, col
            return True
        return False
    def turnLeft(self):
        self._tick(); self._direction = (self._direction - 1) % 4
    def turnRight(self):
        self._tick(); self._direction = (self._direction + 1) % 4
    def clean(self):
        self._tick(); self._cleaned.add((self._row, self._col))
    def _result(self): return [list(cell) for cell in sorted(self._cleaned)]

class Master:
    def __init__(self, data):
        self._words, self._secret = set(data["words"]), data["secret"]
        self._limit, self._calls, self._solved = data["allowedGuesses"], 0, False
    def guess(self, word):
        self._calls += 1
        if self._calls > self._limit: raise ValueError("Guess limit exceeded")
        if word not in self._words: return -1
        matches = sum(a == b for a, b in zip(word, self._secret))
        if word == self._secret: self._solved = True
        return matches
    def _result(self): return self._solved
`;

export const JAVA_INTERACTIVE = `
final class InteractionSupport {
  static Robot robot(Object o){return new Robot(o);}
  static Master master(Object o){return new Master(o);}
}

class Robot {
  private final int[][] room; private int row,col,direction,calls; private final Set<String> cleaned=new HashSet<>();
  Robot(Object raw){Map<?,?> d=(Map<?,?>)raw;room=J.toIntMatrix(d.get("room"));int[] start=J.toIntArray(d.get("start"));row=start[0];col=start[1];}
  private void tick(){if(++calls>100000)throw new IllegalArgumentException("Robot operation limit exceeded");}
  public boolean move(){tick();int[][] dirs={{-1,0},{0,1},{1,0},{0,-1}};int r=row+dirs[direction][0],c=col+dirs[direction][1];if(r>=0&&r<room.length&&c>=0&&c<room[0].length&&room[r][c]!=0){row=r;col=c;return true;}return false;}
  public void turnLeft(){tick();direction=(direction+3)%4;}
  public void turnRight(){tick();direction=(direction+1)%4;}
  public void clean(){tick();cleaned.add(row+","+col);}
  Object result(){List<List<Integer>> out=new ArrayList<>();for(String cell:cleaned){String[] parts=cell.split(",");out.add(Arrays.asList(Integer.parseInt(parts[0]),Integer.parseInt(parts[1])));}out.sort(Comparator.<List<Integer>>comparingInt(a->a.get(0)).thenComparingInt(a->a.get(1)));return out;}
}
class Master {
  private final Set<String> words;private final String secret;private final int limit;private int calls;private boolean solved;
  Master(Object raw){Map<?,?> d=(Map<?,?>)raw;words=new HashSet<>(Arrays.asList(J.toStrArray(d.get("words"))));secret=J.toStr(d.get("secret"));limit=J.toInt(d.get("allowedGuesses"));}
  public int guess(String word){if(++calls>limit)throw new IllegalArgumentException("Guess limit exceeded");if(!words.contains(word))return -1;int matches=0;for(int i=0;i<secret.length();i++)if(secret.charAt(i)==word.charAt(i))matches++;if(word.equals(secret))solved=true;return matches;}
  Object result(){return solved;}
}
`;
