import { JAVA_COLLECTION_HELPERS, usesCollectionHelpers } from "./helpers";
import { JAVA_INTERACTIVE, usesInteractive } from "./interactive";
import type { AnyTestCase, DesignSpec, FunctionSpec, Param, ProblemSpec, SpecStyle, ValueType } from "./types";
import { RESULT_MARKER } from "./types";
import { JAVA_GRAPH, usesGraph } from "./graph";
import { JAVA_NARY, JAVA_RANDOM, JAVA_NEXT, JAVA_MULTI, nodeType } from "./nodes";
import { javaEnvironment } from "./environment";

/** Lines of harness code placed before the user's code; used to map line numbers back. */
export const JAVA_USER_LINE_OFFSET = 1;

const IMPORTS =
  "import java.util.*; import java.util.function.*; import java.util.stream.*; import java.io.*; import java.math.*;";

/** The ListNode value field: LeetCode calls it "val", the course calls it "value". */
const LIST_FIELD = "__LISTFIELD__";

/**
 * Helper classes available to user code, mirroring the course's definitions (or LeetCode's
 * for "leetcode" specs).
 */
const JAVA_HELPERS = `
class ListNode {
  int ${LIST_FIELD} = 0;
  ListNode next;
  ListNode() {}
  ListNode(int x) { this.${LIST_FIELD} = x; }
  ListNode(int x, ListNode next) { this.${LIST_FIELD} = x; this.next = next; }
}

class TreeNode {
  int val;
  TreeNode left;
  TreeNode right;
  TreeNode next;
  TreeNode() {}
  TreeNode(int x) { val = x; }
  TreeNode(int x, TreeNode left, TreeNode right) { val = x; this.left = left; this.right = right; }
}

class Interval {
  int start;
  int end;
  Interval(int start, int end) { this.start = start; this.end = end; }
  public String toString() { return "[" + start + ", " + end + "]"; }
}

class ArrayReader {
  int[] arr;
  ArrayReader(int[] arr) { this.arr = arr; }
  int get(int index) { return index >= arr.length ? Integer.MAX_VALUE : arr[index]; }
}

class NestedInteger {
  private Integer value; private List<NestedInteger> list;
  public NestedInteger() { list = new ArrayList<>(); }
  public NestedInteger(int value) { this.value = value; }
  public boolean isInteger() { return value != null; }
  public Integer getInteger() { return value; }
  public List<NestedInteger> getList() { return list; }
  public void setInteger(int value) { this.value = value; list = null; }
  public void add(NestedInteger elem) { if (list == null) { list = new ArrayList<>(); value = null; } list.add(elem); }
}
`;

/** Runtime support: JSON parsing, conversion and serialization. */
const JAVA_RUNTIME = String.raw`
final class JudgeJson {
  private final String s; private int i = 0;
  private JudgeJson(String s) { this.s = s; }
  static Object parse(String s) { JudgeJson p = new JudgeJson(s); p.ws(); return p.value(); }
  private void ws() { while (i < s.length() && Character.isWhitespace(s.charAt(i))) i++; }
  private Object value() {
    char c = s.charAt(i);
    if (c == '{') { i++; Map<String, Object> m = new LinkedHashMap<>(); ws();
      if (s.charAt(i) == '}') { i++; return m; }
      while (true) { ws(); String k = str(); ws(); i++; ws(); m.put(k, value()); ws(); char d = s.charAt(i++); if (d == '}') return m; } }
    if (c == '[') { i++; List<Object> l = new ArrayList<>(); ws();
      if (s.charAt(i) == ']') { i++; return l; }
      while (true) { ws(); l.add(value()); ws(); char d = s.charAt(i++); if (d == ']') return l; } }
    if (c == '"') return str();
    if (s.startsWith("true", i)) { i += 4; return Boolean.TRUE; }
    if (s.startsWith("false", i)) { i += 5; return Boolean.FALSE; }
    if (s.startsWith("null", i)) { i += 4; return null; }
    int st = i; while (i < s.length() && "+-0123456789.eE".indexOf(s.charAt(i)) >= 0) i++;
    String num = s.substring(st, i);
    if (num.contains(".") || num.contains("e") || num.contains("E")) return Double.parseDouble(num);
    return Long.parseLong(num);
  }
  private String str() {
    StringBuilder b = new StringBuilder(); i++;
    while (true) { char c = s.charAt(i++);
      if (c == '"') return b.toString();
      if (c == '\\') { char e = s.charAt(i++);
        switch (e) { case 'n': b.append('\n'); break; case 't': b.append('\t'); break; case 'r': b.append('\r'); break;
          case 'b': b.append('\b'); break; case 'f': b.append('\f'); break;
          case 'u': b.append((char) Integer.parseInt(s.substring(i, i + 4), 16)); i += 4; break;
          default: b.append(e); }
      } else b.append(c); }
  }
  static String quote(String v) {
    StringBuilder b = new StringBuilder("\"");
    for (char c : v.toCharArray()) {
      if (c == '"' || c == '\\') b.append('\\').append(c);
      else if (c == '\n') b.append("\\n"); else if (c == '\t') b.append("\\t"); else if (c == '\r') b.append("\\r");
      else if (c < 0x20) b.append(String.format("\\u%04x", (int) c)); else b.append(c);
    }
    return b.append('"').toString();
  }
}

final class J {
  static final int LIMIT = 100000;
  @SuppressWarnings("unchecked") static List<Object> L(Object o) { return (List<Object>) o; }
  static int toInt(Object o) { return ((Number) o).intValue(); }
  static long toLong(Object o) { return ((Number) o).longValue(); }
  static double toDouble(Object o) { return ((Number) o).doubleValue(); }
  static boolean toBoolean(Object o) { return (Boolean) o; }
  static String toStr(Object o) { return (String) o; }
  static char toChar(Object o) { return ((String) o).charAt(0); }
  static int[] toIntArray(Object o) { List<Object> l = L(o); int[] r = new int[l.size()]; for (int k = 0; k < r.length; k++) r[k] = toInt(l.get(k)); return r; }
  static long[] toLongArray(Object o) { List<Object> l = L(o); long[] r = new long[l.size()]; for (int k = 0; k < r.length; k++) r[k] = toLong(l.get(k)); return r; }
  static double[] toDoubleArray(Object o) { List<Object> l = L(o); double[] r = new double[l.size()]; for (int k = 0; k < r.length; k++) r[k] = toDouble(l.get(k)); return r; }
  static boolean[] toBooleanArray(Object o) { List<Object> l = L(o); boolean[] r = new boolean[l.size()]; for (int k = 0; k < r.length; k++) r[k] = toBoolean(l.get(k)); return r; }
  static char[] toCharArray(Object o) { List<Object> l = L(o); char[] r = new char[l.size()]; for (int k = 0; k < r.length; k++) r[k] = toChar(l.get(k)); return r; }
  static String[] toStrArray(Object o) { List<Object> l = L(o); String[] r = new String[l.size()]; for (int k = 0; k < r.length; k++) r[k] = toStr(l.get(k)); return r; }
  static int[][] toIntMatrix(Object o) { List<Object> l = L(o); int[][] r = new int[l.size()][]; for (int k = 0; k < r.length; k++) r[k] = toIntArray(l.get(k)); return r; }
  static char[][] toCharMatrix(Object o) { List<Object> l = L(o); char[][] r = new char[l.size()][]; for (int k = 0; k < r.length; k++) r[k] = toCharArray(l.get(k)); return r; }
  static List<Integer> toIntList(Object o) { List<Integer> r = new ArrayList<>(); for (Object x : L(o)) r.add(toInt(x)); return r; }
  static List<Boolean> toBoolList(Object o) { List<Boolean> r = new ArrayList<>(); for (Object x : L(o)) r.add(toBoolean(x)); return r; }
  static List<Double> toDoubleList(Object o) { List<Double> r = new ArrayList<>(); for (Object x : L(o)) r.add(toDouble(x)); return r; }
  static List<String> toStrList(Object o) { List<String> r = new ArrayList<>(); for (Object x : L(o)) r.add(toStr(x)); return r; }
  static List<List<Integer>> toIntListList(Object o) { List<List<Integer>> r = new ArrayList<>(); for (Object x : L(o)) r.add(toIntList(x)); return r; }
  static List<List<String>> toStrListList(Object o) { List<List<String>> r = new ArrayList<>(); for (Object x : L(o)) r.add(toStrList(x)); return r; }
  static List<int[]> toIntArrayList(Object o) { List<int[]> r = new ArrayList<>(); for (Object x : L(o)) r.add(toIntArray(x)); return r; }
  static ListNode toListNode(Object o) {
    if (o == null) return null;
    int pos = -1; List<Object> vals;
    if (o instanceof Map) { Map<?, ?> m = (Map<?, ?>) o; vals = L(m.get("values")); Object p = m.get("pos"); if (p != null) pos = toInt(p); }
    else vals = L(o);
    if (vals.isEmpty()) return null;
    ListNode[] nodes = new ListNode[vals.size()];
    for (int k = 0; k < nodes.length; k++) nodes[k] = new ListNode(toInt(vals.get(k)));
    for (int k = 0; k + 1 < nodes.length; k++) nodes[k].next = nodes[k + 1];
    if (pos >= 0 && pos < nodes.length) nodes[nodes.length - 1].next = nodes[pos];
    return nodes[0];
  }
  static ListNode[] toListNodeArray(Object o) { List<Object> l = L(o); ListNode[] r = new ListNode[l.size()]; for (int k = 0; k < r.length; k++) r[k] = toListNode(l.get(k)); return r; }
  static ListNode listArgument(ListNode root, Object input) {
    if (input instanceof Map && ((Map<?, ?>) input).containsKey("at")) {
      int index = toInt(((Map<?, ?>) input).get("at")); while (index-- > 0) root = root.next;
    }
    return root;
  }
  static ListNode joinList(ListNode prefix, ListNode source, Object input) {
    Object index = ((Map<?, ?>) input).get("tail"); if (index == null) return prefix;
    int at = toInt(index); while (at-- > 0) source = source.next;
    if (prefix == null) return source;
    ListNode end = prefix; while (end.next != null) end = end.next; end.next = source; return prefix;
  }
  static int listIndex(ListNode root, ListNode target) {
    if(target==null)return -1;
    Set<ListNode> seen=Collections.newSetFromMap(new IdentityHashMap<>());int index=0;
    for(ListNode n=root;n!=null && seen.add(n);n=n.next,index++)if(n==target)return index;
    throw new IllegalArgumentException("Return an original list node");
  }
  static Set<ListNode> listNodes(ListNode root) {
    Set<ListNode> nodes = Collections.newSetFromMap(new IdentityHashMap<>());
    while (root != null && nodes.add(root)) root = root.next;
    return nodes;
  }
  static TreeNode toTree(Object o) {
    if (o == null) return null; List<Object> v = L(o);
    if (v.isEmpty() || v.get(0) == null) return null;
    TreeNode root = new TreeNode(toInt(v.get(0))); ArrayDeque<TreeNode> q = new ArrayDeque<>(); q.add(root); int k = 1;
    while (!q.isEmpty() && k < v.size()) { TreeNode n = q.poll();
      if (k < v.size() && v.get(k) != null) { n.left = new TreeNode(toInt(v.get(k))); q.add(n.left); } k++;
      if (k < v.size() && v.get(k) != null) { n.right = new TreeNode(toInt(v.get(k))); q.add(n.right); } k++; }
    return root;
  }
  static Interval toInterval(Object o) { List<Object> l = L(o); return new Interval(toInt(l.get(0)), toInt(l.get(1))); }
  static Set<TreeNode> treeNodes(TreeNode root) {
    Set<TreeNode> nodes = Collections.newSetFromMap(new IdentityHashMap<>());
    ArrayDeque<TreeNode> q = new ArrayDeque<>();
    if (root != null) q.add(root);
    while (!q.isEmpty()) { TreeNode n = q.remove(); if (!nodes.add(n)) continue;
      if (n.left != null) q.add(n.left); if (n.right != null) q.add(n.right); }
    return nodes;
  }
  static TreeNode findNode(TreeNode root, int value) {
    for (TreeNode node : treeNodes(root)) if (node.val == value) return node;
    throw new IllegalArgumentException("Node value is absent from the tree");
  }
  static Interval[] toIntervalArray(Object o) { List<Object> l = L(o); Interval[] r = new Interval[l.size()]; for (int k = 0; k < r.length; k++) r[k] = toInterval(l.get(k)); return r; }
  static List<Interval> toIntervalList(Object o) { List<Interval> r = new ArrayList<>(); for (Object x : L(o)) r.add(toInterval(x)); return r; }
  static List<List<Interval>> toIntervalListList(Object o) { List<List<Interval>> r = new ArrayList<>(); for (Object x : L(o)) r.add(toIntervalList(x)); return r; }
  static ArrayReader toArrayReader(Object o) { return new ArrayReader(toIntArray(o)); }
  static NestedInteger toNested(Object o) {
    if (o instanceof Number) return new NestedInteger(toInt(o));
    NestedInteger node = new NestedInteger(); for (Object x : L(o)) node.add(toNested(x)); return node;
  }
  static List<NestedInteger> toNestedList(Object o) { List<NestedInteger> result = new ArrayList<>(); for (Object x : L(o)) result.add(toNested(x)); return result; }

  static String json(Object o) { StringBuilder b = new StringBuilder(); write(b, o); return b.toString(); }
  static void write(StringBuilder b, Object o) {
    if (o == null) { b.append("null"); return; }
    if (o instanceof Boolean) { b.append(o); return; }
    if (o instanceof Double || o instanceof Float) { double d = ((Number) o).doubleValue();
      if (Double.isNaN(d) || Double.isInfinite(d)) b.append(JudgeJson.quote(Double.isNaN(d) ? "nan" : d > 0 ? "inf" : "-inf")); else b.append(d); return; }
    if (o instanceof Number) { b.append(((Number) o).longValue()); return; }
    if (o instanceof Character) { b.append(JudgeJson.quote(String.valueOf(o))); return; }
    if (o instanceof String) { b.append(JudgeJson.quote((String) o)); return; }
    if (o instanceof NestedInteger) { NestedInteger n = (NestedInteger) o; write(b, n.isInteger() ? n.getInteger() : n.getList()); return; }
    if (o instanceof ListNode) { write(b, listValues((ListNode) o)); return; }
    if (o instanceof TreeNode) { write(b, treeValues((TreeNode) o)); return; }
    if (o instanceof Interval) { Interval iv = (Interval) o; b.append('[').append(iv.start).append(',').append(iv.end).append(']'); return; }
    if (o instanceof Map) { b.append('{'); boolean first = true;
      for (Map.Entry<?, ?> e : ((Map<?, ?>) o).entrySet()) { if (!first) b.append(','); first = false; b.append(JudgeJson.quote(String.valueOf(e.getKey()))).append(':'); write(b, e.getValue()); }
      b.append('}'); return; }
    if (o instanceof Iterable) { b.append('['); boolean first = true;
      for (Object x : (Iterable<?>) o) { if (!first) b.append(','); first = false; write(b, x); } b.append(']'); return; }
    if (o.getClass().isArray()) { int n = java.lang.reflect.Array.getLength(o); b.append('[');
      for (int k = 0; k < n; k++) { if (k > 0) b.append(','); write(b, java.lang.reflect.Array.get(o, k)); } b.append(']'); return; }
    b.append(JudgeJson.quote(o.toString()));
  }
  static List<Integer> listValues(ListNode n) { List<Integer> r = new ArrayList<>(); while (n != null && r.size() < LIMIT) { r.add(n.${LIST_FIELD}); n = n.next; } return r; }
  static List<Integer> treeValues(TreeNode root) {
    List<Integer> r = new ArrayList<>(); if (root == null) return r;
    LinkedList<TreeNode> q = new LinkedList<>(); q.add(root);
    while (!q.isEmpty()) { TreeNode n = q.poll(); if (n == null) { r.add(null); continue; } r.add(n.val); q.add(n.left); q.add(n.right); }
    while (!r.isEmpty() && r.get(r.size() - 1) == null) r.remove(r.size() - 1);
    return r;
  }
  static Object special(String kind, Object v) {
    if (kind.equals("unsigned32")) return Integer.toUnsignedLong(((Number) v).intValue());
    if (kind.equals("value")) {
      if (v == null) return null;
      if (v instanceof ListNode) return ((ListNode) v).${LIST_FIELD};
      if (v instanceof TreeNode) return ((TreeNode) v).val;
      return v;
    }
    if (kind.equals("nextLevels")) {
      List<List<Integer>> levels = new ArrayList<>(); TreeNode head = (TreeNode) v;
      while (head != null && levels.size() < LIMIT) { List<Integer> level = new ArrayList<>(); TreeNode n = head, nxt = null;
        while (n != null && level.size() < LIMIT) { level.add(n.val); if (nxt == null) nxt = n.left != null ? n.left : n.right; n = n.next; }
        levels.add(level); head = nxt; }
      return levels;
    }
    if (kind.equals("nextChain")) {
      List<Integer> r = new ArrayList<>(); TreeNode n = (TreeNode) v;
      while (n != null && r.size() < LIMIT) { r.add(n.val); n = n.next; }
      return r;
    }
    return v;
  }
  static Object prefix(Object value, Object length) {
    int size = ((Number) length).intValue();
    int max = java.lang.reflect.Array.getLength(value);
    if (size < 0 || size > max) throw new IllegalArgumentException("The returned length is outside the output buffer");
    List<Object> result = new ArrayList<>();
    for (int i = 0; i < size; i++) result.add(java.lang.reflect.Array.get(value, i));
    return result;
  }
}
`;

const JAVA_TYPE: Record<Exclude<ValueType, "void">, [javaType: string, converter: string]> = {
  int: ["int", "J.toInt"],
  long: ["long", "J.toLong"],
  double: ["double", "J.toDouble"],
  boolean: ["boolean", "J.toBoolean"],
  string: ["String", "J.toStr"],
  char: ["char", "J.toChar"],
  "int[]": ["int[]", "J.toIntArray"],
  "long[]": ["long[]", "J.toLongArray"],
  "double[]": ["double[]", "J.toDoubleArray"],
  "char[]": ["char[]", "J.toCharArray"],
  "string[]": ["String[]", "J.toStrArray"],
  "boolean[]": ["boolean[]", "J.toBooleanArray"],
  "int[][]": ["int[][]", "J.toIntMatrix"],
  "char[][]": ["char[][]", "J.toCharMatrix"],
  "List<int>": ["List<Integer>", "J.toIntList"],
  "List<boolean>": ["List<Boolean>", "J.toBoolList"],
  "List<double>": ["List<Double>", "J.toDoubleList"],
  "List<string>": ["List<String>", "J.toStrList"],
  "List<List<int>>": ["List<List<Integer>>", "J.toIntListList"],
  "List<List<string>>": ["List<List<String>>", "J.toStrListList"],
  "List<int[]>": ["List<int[]>", "J.toIntArrayList"],
  ListNode: ["ListNode", "J.toListNode"],
  "ListNode[]": ["ListNode[]", "J.toListNodeArray"],
  TreeNode: ["TreeNode", "J.toTree"],
  GraphNode: ["Node", "GraphSupport.build"],
  RandomNode: ["Node", "RandomSupport.build"],
  NaryNode: ["Node", "NarySupport.build"],
  NextNode: ["Node", "NextSupport.build"],
  ParentNode: ["Node", "NextSupport.find"],
  DoublyNode: ["Node", "NextSupport.build"],
  MultiNode: ["Node", "MultiSupport.build"],
  CircularNode: ["Node", "NextSupport.circularBuild"],
  NestedInteger: ["NestedInteger", "J.toNested"],
  "List<NestedInteger>": ["List<NestedInteger>", "J.toNestedList"],
  IntIterator: ["Iterator<Integer>", "CollectionSupport.iterator"],
  "List<Employee>": ["List<Employee>", "CollectionSupport.employees"],
  HtmlParser: ["HtmlParser", "CollectionSupport.parser"],
  Robot: ["Robot", "InteractionSupport.robot"],
  Master: ["Master", "InteractionSupport.master"],
  SparseVector: ["SparseVector", ""],
  "List<TreeNode>": ["List<TreeNode>", ""],
  Interval: ["Interval", "J.toInterval"],
  "Interval[]": ["Interval[]", "J.toIntervalArray"],
  "List<Interval>": ["List<Interval>", "J.toIntervalList"],
  "List<List<Interval>>": ["List<List<Interval>>", "J.toIntervalListList"],
  ArrayReader: ["ArrayReader", "J.toArrayReader"],
};

export function javaType(t: ValueType): string {
  return t === "void" ? "void" : JAVA_TYPE[t][0];
}

function declareParams(params: Param[], source: string, prefix = "p") {
  return params
    .map((p, k) => {
      if (p.type === "void") throw new Error("void parameter");
      const [jt, conv] = JAVA_TYPE[p.type];
      if (p.type === "SparseVector") return `SparseVector ${prefix}${k} = new SparseVector(J.toIntArray(${source}.get(${k})));`;
      if (p.fromTree !== undefined) return `TreeNode ${prefix}${k} = J.findNode(${prefix}${p.fromTree}, J.toInt(${source}.get(${k})));`;
      if (!conv) throw new Error(`Type ${p.type} is not supported as a Java input`);
      if (p.type === "ListNode") {
        const raw = `${source}.get(${k})`;
        const value = p.fromList !== undefined ? `J.joinList(${conv}(${raw}), original${prefix}${p.fromList}, ${raw})` : `${conv}(${raw})`;
        return `ListNode original${prefix}${k} = ${value}; ListNode ${prefix}${k} = J.listArgument(original${prefix}${k}, ${raw});`;
      }
      return `${jt} ${prefix}${k} = ${source}.get(${k}) == null ? ${defaultFor(jt)} : ${conv}(${source}.get(${k}));`;
    })
    .join(" ");
}

function defaultFor(javaT: string) {
  if (["int", "long", "double", "char"].includes(javaT)) return "0";
  if (javaT === "boolean") return "false";
  return "null";
}

function javaCall(spec: FunctionSpec, args: string) {
  const codec = spec.roundTrip;
  if (!codec) return `sol.${spec.function.java}(${args})`;
  const decoder = codec.sameInstance ? "sol" : `new ${codec.className}()`;
  return `${decoder}.${codec.decode}(sol.${codec.encode}(${args}))`;
}

function javaEnvironmentSetup(spec: FunctionSpec) {
  const inputIndex = spec.params.length;
  if (spec.environment?.kind === "parentTree") return `NextSupport.parentRoot = NextSupport.build(a.get(${inputIndex}));`;
  if (spec.environment) return `JudgeEnvironment.value = a.get(${inputIndex}); JudgeEnvironment.position = 0;`;
  return "";
}

/** Support class that clones and serializes graph-like results, checking they reuse no input node. */
function cloneSupportFor(returns: ValueType) {
  if (returns === "GraphNode") return "GraphSupport";
  if (returns === "RandomNode") return "RandomSupport";
  return undefined;
}

const ORIGINAL_NODE_SETS: Partial<Record<ValueType, string>> = {
  CircularNode: "Set<Node> originalCircular = NextSupport.circularNodes(p0);",
  MultiNode: "Set<Node> originalMulti = MultiSupport.nodes(p0);",
  DoublyNode: "Set<Node> originalDoubly = NextSupport.nodes(p0);",
};

/** Serializes a node-helper result, comparing against the original nodes where identity matters. */
function nodeOutput(returns: ValueType, val: string): string | undefined {
  switch (returns) {
    case "MultiNode": return `MultiSupport.values((Node) ${val}, originalMulti)`;
    case "NaryNode": return `NarySupport.values((Node) ${val})`;
    case "NextNode": return `NextSupport.levels((Node) ${val})`;
    case "ParentNode": return `NextSupport.parentValue((Node) ${val})`;
    case "DoublyNode": return `NextSupport.circular((Node) ${val}, true, originalDoubly)`;
    case "CircularNode": return `NextSupport.insertion((Node) ${val}, p0, originalCircular)`;
    default: return undefined;
  }
}

function outputSource(output: FunctionSpec["output"]) {
  if (output?.arg === undefined) return "ret";
  const prefix = output.root ? "originalp" : "p";
  return `${prefix}${output.arg}`;
}

/** The tree argument whose nodes a TreeNode result must come from, if any. */
function treeSourceFor(spec: FunctionSpec) {
  if (spec.returns !== "TreeNode") return undefined;
  return spec.returnTree ?? spec.params.find((p) => p.fromTree !== undefined)?.fromTree;
}

function checksListIdentity(spec: FunctionSpec) {
  return spec.returns === "ListNode" && spec.params.some((p) => p.fromList !== undefined);
}

function identitySetup(spec: FunctionSpec, cloneSupport: string | undefined) {
  const lines = [ORIGINAL_NODE_SETS[spec.returns] ?? ""];
  if (cloneSupport) {
    const inputs = spec.params.flatMap((p, k) => (p.type === spec.returns ? [`originals.addAll(${cloneSupport}.nodes(p${k}));`] : []));
    lines.push(["Set<Node> originals = Collections.newSetFromMap(new IdentityHashMap<>());", ...inputs].join(" "));
  }
  const treeSource = treeSourceFor(spec);
  if (treeSource !== undefined) lines.push(`Set<TreeNode> originalTree = J.treeNodes(p${treeSource});`);
  if (checksListIdentity(spec)) {
    const inputs = spec.params.flatMap((p, k) => (p.type === "ListNode" ? [`originalLists.addAll(J.listNodes(originalp${k}));`] : []));
    lines.push(["Set<ListNode> originalLists = Collections.newSetFromMap(new IdentityHashMap<>());", ...inputs].join(" "));
  }
  return lines.join("\n    ");
}

function identityChecks(spec: FunctionSpec) {
  const lines: string[] = [];
  if (treeSourceFor(spec) !== undefined) {
    lines.push('if (ret != null && !originalTree.contains(ret)) throw new IllegalArgumentException("Return a node from the original tree");');
  }
  if (checksListIdentity(spec)) {
    lines.push('if (ret != null && !originalLists.contains(ret)) throw new IllegalArgumentException("Return a node from the original lists");');
  }
  return lines.join("\n    ");
}

function outputExpression(spec: FunctionSpec, cloneSupport: string | undefined) {
  const output = spec.output;
  const val = outputSource(output);
  if (output?.as === "interaction") return `${val}.result()`;
  if (output?.as === "listIndex") return "J.listIndex(originalp0, (ListNode) ret)";
  if (cloneSupport) return `${cloneSupport}.values((Node) ${val}, originals)`;
  return nodeOutput(spec.returns, val) ?? specialOutput(output, val, "ret");
}

function specialOutput(output: FunctionSpec["output"], val: string, ret: string) {
  if (output?.as) return `J.special(${JSON.stringify(output.as)}, ${val})`;
  if (output?.prefix) return `J.prefix(${val}, ${ret})`;
  return val;
}

/** Design methods apply a prefix adapter before any special conversion. */
function methodOutput(output: FunctionSpec["output"], val: string) {
  if (output?.prefix) return `J.prefix(${val}, r)`;
  return specialOutput(output, val, "r");
}

function nodeHelpers(node: ValueType | undefined) {
  switch (node) {
    case "MultiNode": return JAVA_MULTI;
    case "RandomNode": return JAVA_RANDOM;
    case "NaryNode": return JAVA_NARY;
    case "NextNode":
    case "ParentNode":
    case "DoublyNode":
    case "CircularNode":
      return JAVA_NEXT;
    default: return "";
  }
}

function functionBody(spec: FunctionSpec) {
  const call = javaCall(spec, spec.params.map((_, k) => `p${k}`).join(", "));
  const invoke = spec.returns === "void" ? `${call}; Object ret = null;` : `Object ret = ${call};`;
  const cloneSupport = cloneSupportFor(spec.returns);
  const className = spec.roundTrip?.className ?? "Solution";
  return `
  static String runCase(Object input) throws Exception {
    List<Object> a = J.L(input);
    ${javaEnvironmentSetup(spec)}
    ${className} sol = new ${className}();
    ${declareParams(spec.params, "a")}
    ${identitySetup(spec, cloneSupport)}
    ${invoke}
    ${identityChecks(spec)}
    return J.json(${outputExpression(spec, cloneSupport)});
  }`;
}

function designBody(spec: DesignSpec) {
  const designCase = (method: DesignSpec["methods"][number]) => {
    const args = method.params.map((_, k) => `p${k}`).join(", ");
    const call = `obj.${method.java}(${args})`;
    const invoke = method.returns === "void" ? `${call}; r = null;` : `r = ${call};`;
    const value = method.output?.arg !== undefined ? `p${method.output.arg}` : "r";
    const params = declareParams(method.params, "args");
    const output = methodOutput(method.output, value);
    return `case ${JSON.stringify(method.name)}: { ${params} ${invoke} r = ${output}; break; }`;
  };
  const cases = spec.methods.map(designCase).join("\n        ");
  return `
  static String runCase(Object input) throws Exception {
    Map<?, ?> in = (Map<?, ?>) input;
    ${spec.environment ? 'JudgeEnvironment.value = in.get("environment"); JudgeEnvironment.position = 0;' : ""}
    List<Object> ctor = J.L(in.get("ctor"));
    List<Object> ops = J.L(in.get("ops"));
    List<Object> argsList = J.L(in.get("args"));
    ${declareParams(spec.ctorParams, "ctor", "ctor")}
    ${spec.className} obj = new ${spec.className}(${spec.ctorParams.map((_, k) => `ctor${k}`).join(", ")});
    List<Object> results = new ArrayList<>();
    for (int k = 0; k < ops.size(); k++) {
      String op = (String) ops.get(k);
      List<Object> args = J.L(argsList.get(k));
      Object r = null;
      switch (op) {
        ${cases}
        default: throw new IllegalArgumentException("Unknown operation " + op);
      }
      results.add(JudgeJson.parse(J.json(r)));
    }
    return J.json(results);
  }`;
}

export function listFieldFor(style: SpecStyle | undefined) {
  return style === "leetcode" ? "val" : "value";
}

function b64(s: string) {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCodePoint(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

/** Make the user's top-level `public class X` package-private so everything fits in Main.java. */
export function prepareJavaUserCode(code: string) {
  const declarationTypes = new Set(["class", "interface", "enum", "record"]);
  const modifiers = new Set(["final", "abstract"]);
  return code
    .split("\n")
    .map((line) => {
      const indentLength = line.length - line.trimStart().length;
      const indent = line.slice(0, indentLength);
      const trimmed = line.slice(indentLength);
      if (!trimmed.startsWith("public ")) return line;
      const declaration = trimmed.slice("public ".length).trimStart();
      const tokens = declaration.split(/\s+/);
      let type = tokens[0] ?? "";
      let tokenIndex = 1;
      while (modifiers.has(type)) {
        type = tokens[tokenIndex++] ?? "";
      }
      return declarationTypes.has(type) ? indent + declaration : line;
    })
    .join("\n");
}

export function buildJavaProgram(spec: ProblemSpec, userCode: string, tests: AnyTestCase[]): string {
  if (spec.kind === "sql") throw new Error("SQL problems must use SQLite");
  const body = spec.kind === "design" ? designBody(spec) : functionBody(spec);
  const inputs = JSON.stringify(tests.map((t) => t.input));
  const chunks = b64(inputs).match(/.{1,60000}/g) ?? [""];
  const listField = listFieldFor(spec.style);
  const node = nodeType(spec);
  const marker = JSON.stringify(RESULT_MARKER);
  const okLine = String.raw`        line = "{\"i\":" + i + ",\"status\":\"ok\",\"output\":" + output + ",\"ms\":" + ms + ",\"stdout\":" + JudgeJson.quote(trim(buf)) + "}";`;
  const errorLine = String.raw`        line = "{\"i\":" + i + ",\"status\":\"error\",\"error\":" + JudgeJson.quote(msg) + ",\"stdout\":" + JudgeJson.quote(trim(buf)) + "}";`;
  return `${IMPORTS}
${prepareJavaUserCode(userCode)}
${JAVA_HELPERS.replaceAll(LIST_FIELD, listField)}
${usesGraph(spec) ? JAVA_GRAPH : ""}
${nodeHelpers(node)}
${usesCollectionHelpers(spec) ? JAVA_COLLECTION_HELPERS : ""}
${usesInteractive(spec) ? JAVA_INTERACTIVE : ""}
${javaEnvironment(spec)}
${JAVA_RUNTIME.replaceAll(LIST_FIELD, listField)}
public class Main {
  static final String MARKER = ${marker};
${body}

  static String userFrame(Throwable e) {
    for (StackTraceElement el : e.getStackTrace()) {
      String c = el.getClassName();
      if ("Main.java".equals(el.getFileName()) && !c.equals("Main") && !c.equals("J") && !c.equals("JudgeJson")) {
        return " (line " + (el.getLineNumber() - ${JAVA_USER_LINE_OFFSET}) + ")";
      }
    }
    return "";
  }

  public static void main(String[] argv) throws Exception {
    StringBuilder enc = new StringBuilder();
    ${chunks.map((c) => `enc.append("${c}");`).join("\n    ")}
    List<Object> tests = J.L(JudgeJson.parse(new String(Base64.getDecoder().decode(enc.toString()), "UTF-8")));
    PrintStream out = new PrintStream(new FileOutputStream(FileDescriptor.out), true, "UTF-8");
    for (int i = 0; i < tests.size(); i++) {
      ByteArrayOutputStream buf = new ByteArrayOutputStream();
      System.setOut(new PrintStream(buf, true, "UTF-8"));
      long t0 = System.nanoTime();
      String line;
      try {
        String output = runCase(tests.get(i));
        double ms = (System.nanoTime() - t0) / 1e6;
${okLine}
      } catch (Throwable e) {
        String msg = e.getClass().getSimpleName() + (e.getMessage() != null ? ": " + e.getMessage() : "") + userFrame(e);
        if (e instanceof StackOverflowError) msg = "StackOverflowError: recursion is too deep" + userFrame(e);
${errorLine}
      }
      System.setOut(out);
      out.println(MARKER + line);
      out.flush();
    }
  }

  static String trim(ByteArrayOutputStream buf) throws Exception {
    String s = buf.toString("UTF-8");
    return s.length() > 20000 ? s.substring(0, 20000) : s;
  }
}
`;
}

/** Map javac diagnostics from Main.java line numbers back to the user's editor lines. */
export function mapJavaCompileErrors(stderr: string): string {
  return stderr.replace(/Main\.java:(\d+):/g, (_, n) => `Line ${Math.max(1, Number(n) - JAVA_USER_LINE_OFFSET)}:`);
}
