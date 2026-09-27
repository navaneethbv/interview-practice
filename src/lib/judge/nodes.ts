import type { ProblemSpec, ValueType } from "./types";

export function nodeType(spec: ProblemSpec): ValueType | undefined {
  if (spec.kind === "sql") return undefined;
  const types = spec.kind === "design"
    ? [...spec.ctorParams.map((p) => p.type), ...spec.methods.flatMap((m) => [m.returns, ...m.params.map((p) => p.type)])]
    : [spec.returns, ...spec.params.map((p) => p.type)];
  const nodes = [...new Set(types.filter((t) => ["GraphNode", "RandomNode", "NaryNode", "NextNode", "ParentNode", "DoublyNode", "CircularNode", "MultiNode"].includes(t)))];
  if (nodes.length > 1) throw new Error("A spec can use only one Node helper definition");
  return nodes[0];
}

export const PYTHON_NEXT = `
class Node(TreeNode):
    def __init__(self, val=0, left=None, right=None, next=None):
        super().__init__(val, left, right)
        self.next = next
        self.parent = None

def __binary_nodes(root):
    result, pending = {}, [root] if root else []
    while pending:
        node = pending.pop()
        if id(node) in result: raise ValueError("Input is not a tree")
        result[id(node)] = node
        if node.left: pending.append(node.left)
        if node.right: pending.append(node.right)
    return result

def __circular_build(values):
    nodes = [Node(value) for value in values]
    for i, node in enumerate(nodes): node.next = nodes[(i + 1) % len(nodes)]
    return nodes[0] if nodes else None

def __circular_nodes(root):
    nodes = {}
    while root is not None and id(root) not in nodes:
        if len(nodes) >= 10000: raise ValueError("List too large")
        nodes[id(root)] = root; root = root.next
    return nodes

def __circular_values(root, field="next", originals=None, insertion=False):
    values, seen, node = [], set(), root
    while node is not None and id(node) not in seen:
        if len(seen) >= 10000: raise ValueError("Output is too large")
        seen.add(id(node)); values.append(node.val)
        nxt = getattr(node, field)
        if field == "right" and (nxt is None or nxt.left is not node):
            raise ValueError("The previous and next links disagree")
        node = nxt
    if node is not root: raise ValueError("The list must close at the returned head")
    if insertion:
        if originals and root is not next(iter(originals.values())): raise ValueError("Return the original head")
        if not set(originals).issubset(seen) or len(seen) != len(originals) + 1: raise ValueError("Insert exactly one new node")
    elif originals is not None and seen != set(originals): raise ValueError("Reuse exactly the original tree nodes")
    return values
`;

export const JAVA_NEXT = `
class Node {
  public int val; public Node left, right, next, parent;
  public Node() {}
  public Node(int val) { this.val = val; }
  public Node(int val, Node left, Node right) { this.val=val; this.left=left; this.right=right; }
  public Node(int val, Node next) { this.val=val; this.next=next; }
  public Node(int val, Node left, Node right, Node next) { this.val=val; this.left=left; this.right=right; this.next=next; }
}
final class NextSupport {
  static Node parentRoot;
  static Node build(Object value) {
    List<Object> values = J.L(value); if (values.isEmpty() || values.get(0) == null) return null;
    Node root = new Node(J.toInt(values.get(0))); int i=1;
    ArrayDeque<Node> q = new ArrayDeque<>(); q.add(root);
    while (!q.isEmpty() && i < values.size()) {
      Node n=q.remove();
      if (i < values.size() && values.get(i)!=null) { n.left=new Node(J.toInt(values.get(i))); n.left.parent=n; q.add(n.left); } i++;
      if (i < values.size() && values.get(i)!=null) { n.right=new Node(J.toInt(values.get(i))); n.right.parent=n; q.add(n.right); } i++;
    }
    return root;
  }
  static Set<Node> nodes(Node root) {
    Set<Node> nodes=Collections.newSetFromMap(new IdentityHashMap<>()); ArrayDeque<Node> q=new ArrayDeque<>();
    if(root!=null)q.add(root);
    while(!q.isEmpty()){Node n=q.remove();if(!nodes.add(n))throw new IllegalArgumentException("Input is not a tree");if(n.left!=null)q.add(n.left);if(n.right!=null)q.add(n.right);}
    return nodes;
  }
  static Node find(Object value) {
    for(Node n:nodes(parentRoot))if(n.val==J.toInt(value))return n;
    throw new IllegalArgumentException("Unknown node value");
  }
  static Object parentValue(Node node) {
    if(node==null)return null;
    if(find(node.val)!=node)throw new IllegalArgumentException("Return an original node");
    return node.val;
  }
  static Node circularBuild(Object value) {
    List<Object> values=J.L(value); if(values.isEmpty())return null;
    Node head=new Node(J.toInt(values.get(0))), tail=head;
    for(int i=1;i<values.size();i++){tail.next=new Node(J.toInt(values.get(i)));tail=tail.next;}tail.next=head;return head;
  }
  static Set<Node> circularNodes(Node root) {
    Set<Node> seen=Collections.newSetFromMap(new IdentityHashMap<>());
    for(Node n=root;n!=null && seen.add(n);n=n.next)if(seen.size()>10000)throw new IllegalArgumentException("List too large");
    return seen;
  }
  static Object insertion(Node root, Node originalHead, Set<Node> originals) {
    Object values=circular(root,false,null);Set<Node> seen=circularNodes(root);
    if(originalHead!=null && root!=originalHead)throw new IllegalArgumentException("Return the original head");
    if(!seen.containsAll(originals)||seen.size()!=originals.size()+1)throw new IllegalArgumentException("Insert exactly one new node");
    return values;
  }
  static Object circular(Node root, boolean doubly, Set<Node> originals) {
    Set<Node> seen=Collections.newSetFromMap(new IdentityHashMap<>()); List<Integer> values=new ArrayList<>(); Node node=root;
    while(node!=null && seen.add(node)) {
      if(seen.size()>10000)throw new IllegalArgumentException("Output too large");
      values.add(node.val);Node next=doubly?node.right:node.next;
      if(doubly && (next==null || next.left!=node))throw new IllegalArgumentException("The previous and next links disagree");
      node=next;
    }
    if(node!=root)throw new IllegalArgumentException("The list must close at the returned head");
    if(originals!=null && !seen.equals(originals))throw new IllegalArgumentException("Reuse exactly the original tree nodes");
    return values;
  }
  static Object levels(Node root) {
    List<List<Integer>> levels=new ArrayList<>(); Node head=root;
    Set<Node> seen=Collections.newSetFromMap(new IdentityHashMap<>());
    while(head!=null) {
      List<Integer> row=new ArrayList<>(); Node nextHead=null;
      for(Node n=head;n!=null;n=n.next) {
        if(!seen.add(n))throw new IllegalArgumentException("The next pointers contain a cycle");
        if(seen.size()>10000)throw new IllegalArgumentException("Output too large");
        row.add(n.val); if(nextHead==null)nextHead=n.left!=null?n.left:n.right;
      }
      levels.add(row);head=nextHead;
    }
    return levels;
  }
}
`;

export const PYTHON_RANDOM = `
class Node:
    def __init__(self, x, next=None, random=None):
        self.val, self.next, self.random = int(x), next, random

def __random_build(rows):
    nodes = [Node(row[0]) for row in rows]
    for i, (_, random) in enumerate(rows):
        nodes[i].next = nodes[i + 1] if i + 1 < len(nodes) else None
        nodes[i].random = nodes[random] if random is not None else None
    return nodes[0] if nodes else None

def __random_nodes(root):
    nodes = {}
    while root is not None:
        if id(root) in nodes: raise ValueError("The next chain contains a cycle")
        if len(nodes) >= 10000: raise ValueError("The output is too large")
        nodes[id(root)] = root
        root = root.next
    return nodes

def __random_values(root, originals=None):
    nodes = __random_nodes(root)
    if originals and any(key in originals for key in nodes):
        raise ValueError("The clone reuses an input node")
    positions = {key: i for i, key in enumerate(nodes)}
    result = []
    for node in nodes.values():
        if node.random is not None and id(node.random) not in positions:
            raise ValueError("A random pointer leaves the cloned list")
        result.append([node.val, positions[id(node.random)] if node.random is not None else None])
    return result
`;

export const JAVA_RANDOM = `
class Node {
  int val; Node next, random;
  Node(int val) { this.val = val; }
}
final class RandomSupport {
  static Node build(Object value) {
    List<Object> rows = J.L(value); Node[] nodes = new Node[rows.size()];
    for (int i = 0; i < nodes.length; i++) nodes[i] = new Node(J.toInt(J.L(rows.get(i)).get(0)));
    for (int i = 0; i < nodes.length; i++) {
      nodes[i].next = i + 1 < nodes.length ? nodes[i + 1] : null;
      Object random = J.L(rows.get(i)).get(1);
      nodes[i].random = random == null ? null : nodes[J.toInt(random)];
    }
    return nodes.length == 0 ? null : nodes[0];
  }
  static Set<Node> nodes(Node root) {
    Set<Node> nodes = Collections.newSetFromMap(new IdentityHashMap<>());
    for (Node n = root; n != null; n = n.next) {
      if (!nodes.add(n)) throw new IllegalArgumentException("The next chain contains a cycle");
      if (nodes.size() > 10000) throw new IllegalArgumentException("The output is too large");
    }
    return nodes;
  }
  static Object values(Node root, Set<Node> originals) {
    Set<Node> nodes = nodes(root);
    Map<Node, Integer> positions = new IdentityHashMap<>();
    for (Node n = root; n != null; n = n.next) positions.put(n, positions.size());
    List<List<Integer>> rows = new ArrayList<>();
    for (Node n = root; n != null; n = n.next) {
      if (originals != null && originals.contains(n)) throw new IllegalArgumentException("The clone reuses an input node");
      if (n.random != null && !nodes.contains(n.random)) throw new IllegalArgumentException("A random pointer leaves the cloned list");
      rows.add(Arrays.asList(n.val, n.random == null ? null : positions.get(n.random)));
    }
    return rows;
  }
}
`;

export const PYTHON_NARY = `
class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children if children is not None else []

def __nary_build(values):
    if not values: return None
    root = Node(values[0])
    pending, i = deque([root]), 2
    while pending:
        parent = pending.popleft()
        while i < len(values) and values[i] is not None:
            child = Node(values[i]); parent.children.append(child); pending.append(child); i += 1
        i += 1
    return root

def __nary_values(root):
    if root is None: return []
    values, pending, seen = [root.val, None], deque([root]), set()
    while pending:
        parent = pending.popleft()
        if id(parent) in seen: raise ValueError("The output is not a tree")
        seen.add(id(parent))
        if len(seen) > 10000: raise ValueError("The output is too large")
        values.extend(child.val for child in parent.children)
        values.append(None); pending.extend(parent.children)
    while values and values[-1] is None: values.pop()
    return values
`;

export const JAVA_NARY = `
class Node {
  public int val; public List<Node> children;
  public Node() { this(0); }
  public Node(int val) { this(val, new ArrayList<>()); }
  public Node(int val, List<Node> children) { this.val = val; this.children = children; }
}
final class NarySupport {
  static Node build(Object value) {
    List<Object> values = J.L(value); if (values.isEmpty()) return null;
    Node root = new Node(J.toInt(values.get(0))); int i = 2;
    ArrayDeque<Node> q = new ArrayDeque<>(); q.add(root);
    while (!q.isEmpty()) {
      Node parent = q.remove();
      while (i < values.size() && values.get(i) != null) {
        Node child = new Node(J.toInt(values.get(i++))); parent.children.add(child); q.add(child);
      }
      i++;
    }
    return root;
  }
  static Object values(Node root) {
    List<Integer> values = new ArrayList<>(); if (root == null) return values;
    values.add(root.val); values.add(null);
    Set<Node> seen = Collections.newSetFromMap(new IdentityHashMap<>());
    ArrayDeque<Node> q = new ArrayDeque<>(); q.add(root);
    while (!q.isEmpty()) {
      Node parent = q.remove();
      if (!seen.add(parent)) throw new IllegalArgumentException("The output is not a tree");
      if (seen.size() > 10000) throw new IllegalArgumentException("The output is too large");
      for (Node child : parent.children) { values.add(child.val); q.add(child); }
      values.add(null);
    }
    while (!values.isEmpty() && values.get(values.size() - 1) == null) values.remove(values.size() - 1);
    return values;
  }
}
`;

export const PYTHON_MULTI = `
class Node:
    def __init__(self, val=0, prev=None, next=None, child=None):
        self.val, self.prev, self.next, self.child = val, prev, next, child

def __multi_build(rows):
    head = previous = None
    for row in rows:
        node = Node(row["val"], previous, None, __multi_build(row.get("child", [])))
        if previous: previous.next = node
        else: head = node
        previous = node
    return head

def __multi_nodes(root):
    nodes, pending = {}, [root] if root else []
    while pending:
        node = pending.pop()
        if id(node) in nodes: raise ValueError("Input contains a cycle")
        nodes[id(node)] = node
        if node.next: pending.append(node.next)
        if node.child: pending.append(node.child)
    return nodes

def __multi_values(root, originals):
    values, seen, previous = [], set(), None
    while root:
        if id(root) in seen or len(seen) >= 10000: raise ValueError("Invalid flattened list")
        if root.prev is not previous or root.child is not None: raise ValueError("Fix previous links and clear child links")
        seen.add(id(root)); values.append(root.val)
        previous, root = root, root.next
    if seen != set(originals): raise ValueError("Reuse exactly the original list nodes")
    return values
`;

export const JAVA_MULTI = `
class Node {
  public int val; public Node prev,next,child;
  public Node(){} public Node(int val){this.val=val;}
  public Node(int val,Node prev,Node next,Node child){this.val=val;this.prev=prev;this.next=next;this.child=child;}
}
final class MultiSupport {
  static Node build(Object raw){Node head=null,previous=null;for(Object item:J.L(raw)){Map<?,?> row=(Map<?,?>)item;Node n=new Node(J.toInt(row.get("val")));n.prev=previous;n.child=build(row.containsKey("child")?row.get("child"):Collections.emptyList());if(previous==null)head=n;else previous.next=n;previous=n;}return head;}
  static Set<Node> nodes(Node root){Set<Node> seen=Collections.newSetFromMap(new IdentityHashMap<>());Deque<Node> pending=new ArrayDeque<>();if(root!=null)pending.push(root);while(!pending.isEmpty()){Node n=pending.pop();if(!seen.add(n))throw new IllegalArgumentException("Input contains cycle");if(n.next!=null)pending.push(n.next);if(n.child!=null)pending.push(n.child);}return seen;}
  static Object values(Node root,Set<Node> originals){List<Integer> values=new ArrayList<>();Set<Node> seen=Collections.newSetFromMap(new IdentityHashMap<>());Node previous=null;while(root!=null){if(!seen.add(root)||seen.size()>10000)throw new IllegalArgumentException("Invalid flattened list");if(root.prev!=previous||root.child!=null)throw new IllegalArgumentException("Fix previous links and clear child links");values.add(root.val);previous=root;root=root.next;}if(!seen.equals(originals))throw new IllegalArgumentException("Reuse exactly the original list nodes");return values;}
}
`;
