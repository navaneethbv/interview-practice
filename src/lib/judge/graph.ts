import type { ProblemSpec } from "./types";

export function usesGraph(spec: ProblemSpec): boolean {
  if (spec.kind === "sql") return false;
  const types = spec.kind === "design"
    ? [...spec.ctorParams.map((p) => p.type), ...spec.methods.flatMap((m) => [m.returns, ...m.params.map((p) => p.type)])]
    : [spec.returns, ...spec.params.map((p) => p.type)];
  return types.includes("GraphNode");
}

export const PYTHON_GRAPH = `
class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

def __graph_build(rows):
    if not rows:
        return None
    nodes = [Node(i + 1) for i in range(len(rows))]
    for node, row in zip(nodes, rows):
        node.neighbors = [nodes[i - 1] for i in row]
    return nodes[0]

def __graph_nodes(root):
    nodes, pending = {}, [root] if root is not None else []
    while pending:
        node = pending.pop()
        if id(node) in nodes:
            continue
        if len(nodes) >= 10000:
            raise ValueError("Graph output is too large")
        nodes[id(node)] = node
        pending.extend(node.neighbors)
    return nodes

def __graph_values(root, originals=None):
    if root is not None and root.val != 1: raise ValueError("Return the clone of the input root")
    nodes = __graph_nodes(root)
    if originals and any(key in originals for key in nodes):
        raise ValueError("The clone reuses an input node")
    by_value = {node.val: node for node in nodes.values()}
    if len(by_value) != len(nodes) or sorted(by_value) != list(range(1, len(nodes) + 1)):
        raise ValueError("Graph labels must be unique and consecutive")
    return [sorted(n.val for n in by_value[i].neighbors) for i in range(1, len(nodes) + 1)]
`;

export const JAVA_GRAPH = `
class Node {
  public int val;
  public List<Node> neighbors;
  public Node() { this(0); }
  public Node(int val) { this(val, new ArrayList<>()); }
  public Node(int val, ArrayList<Node> neighbors) { this.val = val; this.neighbors = neighbors; }
}
final class GraphSupport {
  static Node build(Object value) {
    List<Object> rows = J.L(value);
    if (rows.isEmpty()) return null;
    Node[] nodes = new Node[rows.size()];
    for (int i = 0; i < nodes.length; i++) nodes[i] = new Node(i + 1);
    for (int i = 0; i < nodes.length; i++) for (Object n : J.L(rows.get(i))) nodes[i].neighbors.add(nodes[J.toInt(n) - 1]);
    return nodes[0];
  }
  static Set<Node> nodes(Node root) {
    Set<Node> seen = Collections.newSetFromMap(new IdentityHashMap<>());
    ArrayDeque<Node> pending = new ArrayDeque<>();
    if (root != null) pending.add(root);
    while (!pending.isEmpty()) {
      Node n = pending.remove();
      if (!seen.add(n)) continue;
      if (seen.size() > 10000) throw new IllegalArgumentException("Graph output is too large");
      pending.addAll(n.neighbors);
    }
    return seen;
  }
  static Object values(Node root, Set<Node> originals) {
    if (root != null && root.val != 1) throw new IllegalArgumentException("Return the clone of the input root");
    Set<Node> nodes = nodes(root);
    TreeMap<Integer, Node> labels = new TreeMap<>();
    for (Node n : nodes) {
      if (originals != null && originals.contains(n)) throw new IllegalArgumentException("The clone reuses an input node");
      if (labels.put(n.val, n) != null) throw new IllegalArgumentException("Duplicate graph label");
    }
    List<List<Integer>> rows = new ArrayList<>();
    for (int i = 1; i <= nodes.size(); i++) {
      Node n = labels.get(i);
      if (n == null) throw new IllegalArgumentException("Graph labels must be consecutive");
      List<Integer> row = new ArrayList<>();
      for (Node neighbor : n.neighbors) row.add(neighbor.val);
      Collections.sort(row); rows.add(row);
    }
    return rows;
  }
}
`;
