import type { AnyTestCase, DesignSpec, FunctionSpec, OutputSpec, Param, ProblemSpec, ValueType } from "./types";
import { RESULT_MARKER } from "./types";
import { listFieldFor } from "./java";
import { safeName, usesCoreFeatures } from "./languages";
import { CPP_CONCURRENCY_SUPPORT, cppConcurrencyBody } from "./concurrency";

/**
 * C++17 harness. User code is placed after a `#line 1 "solution.cpp"` directive so compiler
 * diagnostics point at the user's own lines, and test inputs are embedded as a raw string literal.
 * Each case runs on a thread with a large stack; crashes (segfaults, aborts) are reported as a
 * runtime error for the case that was running.
 */

const CPP_TYPE: Partial<Record<ValueType, string>> = {
  int: "int",
  long: "long long",
  double: "double",
  boolean: "bool",
  string: "string",
  char: "char",
  "int[]": "vector<int>",
  "long[]": "vector<long long>",
  "double[]": "vector<double>",
  "char[]": "vector<char>",
  "string[]": "vector<string>",
  "boolean[]": "vector<bool>",
  "int[][]": "vector<vector<int>>",
  "char[][]": "vector<vector<char>>",
  "List<int>": "vector<int>",
  "List<double>": "vector<double>",
  "List<boolean>": "vector<bool>",
  "List<string>": "vector<string>",
  "List<List<int>>": "vector<vector<int>>",
  "List<List<string>>": "vector<vector<string>>",
  "List<int[]>": "vector<vector<int>>",
  ListNode: "ListNode*",
  "ListNode[]": "vector<ListNode*>",
  TreeNode: "TreeNode*",
  "List<TreeNode>": "vector<TreeNode*>",
  Interval: "Interval",
  "Interval[]": "vector<Interval>",
  "List<Interval>": "vector<Interval>",
  void: "void",
};

export function cppType(t: ValueType): string {
  const name = CPP_TYPE[t];
  if (!name) throw new Error(`Type ${t} is not supported in C++`);
  return name;
}

/** LeetCode passes containers by reference and everything else by value. */
export function cppParam(p: Param): string {
  const t = cppType(p.type);
  const name = safeName(p.name, "cpp");
  return t.startsWith("vector") ? `${t}& ${name}` : `${t} ${name}`;
}

const FIELD = "__LISTFIELD__";

const CPP_PRELUDE = `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int ${FIELD};
    ListNode *next;
    ListNode() : ${FIELD}(0), next(nullptr) {}
    ListNode(int x) : ${FIELD}(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : ${FIELD}(x), next(next) {}
};

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode *next;
    TreeNode() : val(0), left(nullptr), right(nullptr), next(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr), next(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right), next(nullptr) {}
};

class Interval {
public:
    int start, end;
    Interval() : start(0), end(0) {}
    Interval(int start, int end) : start(start), end(end) {}
};
`;

const CPP_RUNTIME = String.raw`
#include <csignal>
#include <pthread.h>
#include <unistd.h>

namespace judge {
struct JV {
  enum Kind { NUL, BOOL, NUM, STR, ARR, OBJ } kind = NUL;
  bool b = false; double d = 0; long long i = 0; bool integer = true;
  string s; vector<JV> a; vector<pair<string, JV>> o;
  const JV& operator[](size_t k) const { return a.at(k); }
  const JV& get(const string& key) const {
    for (auto& kv : o) if (kv.first == key) return kv.second;
    static JV none; return none;
  }
  bool has(const string& key) const { for (auto& kv : o) if (kv.first == key) return true; return false; }
};

struct Parser {
  const string& s; size_t p = 0;
  explicit Parser(const string& s) : s(s) {}
  void ws() { while (p < s.size() && isspace((unsigned char)s[p])) p++; }
  JV value() {
    ws(); JV v; char c = s[p];
    if (c == '{') { p++; v.kind = JV::OBJ; ws(); if (s[p] == '}') { p++; return v; }
      while (true) { ws(); string k = str(); ws(); p++; JV x = value(); v.o.emplace_back(k, x); ws(); if (s[p++] == '}') return v; } }
    if (c == '[') { p++; v.kind = JV::ARR; ws(); if (s[p] == ']') { p++; return v; }
      while (true) { v.a.push_back(value()); ws(); if (s[p++] == ']') return v; } }
    if (c == '"') { v.kind = JV::STR; v.s = str(); return v; }
    if (s.compare(p, 4, "true") == 0) { p += 4; v.kind = JV::BOOL; v.b = true; return v; }
    if (s.compare(p, 5, "false") == 0) { p += 5; v.kind = JV::BOOL; return v; }
    if (s.compare(p, 4, "null") == 0) { p += 4; return v; }
    size_t st = p; while (p < s.size() && strchr("+-0123456789.eE", s[p])) p++;
    string num = s.substr(st, p - st); v.kind = JV::NUM;
    v.integer = num.find_first_of(".eE") == string::npos;
    v.d = stod(num); v.i = v.integer ? stoll(num) : (long long)v.d;
    return v;
  }
  string str() {
    string out; p++;
    while (true) { char c = s[p++];
      if (c == '"') return out;
      if (c != '\\') { out += c; continue; }
      char e = s[p++];
      switch (e) { case 'n': out += '\n'; break; case 't': out += '\t'; break; case 'r': out += '\r'; break;
        case 'b': out += '\b'; break; case 'f': out += '\f'; break;
        case 'u': { unsigned cp = stoul(s.substr(p, 4), nullptr, 16); p += 4;
          if (cp < 0x80) out += (char)cp;
          else if (cp < 0x800) { out += (char)(0xC0 | (cp >> 6)); out += (char)(0x80 | (cp & 0x3F)); }
          else { out += (char)(0xE0 | (cp >> 12)); out += (char)(0x80 | ((cp >> 6) & 0x3F)); out += (char)(0x80 | (cp & 0x3F)); }
          break; }
        default: out += e; }
    }
  }
};

inline void from(const JV& v, int& out) { out = (int)v.i; }
inline void from(const JV& v, long long& out) { out = v.i; }
inline void from(const JV& v, double& out) { out = v.d; }
inline void from(const JV& v, bool& out) { out = v.b; }
inline void from(const JV& v, string& out) { out = v.s; }
inline void from(const JV& v, char& out) { out = v.s.empty() ? '\0' : v.s[0]; }
inline void from(const JV& v, Interval& out) { out = Interval((int)v[0].i, (int)v[1].i); }
inline void from(const JV& v, ListNode*& out) {
  const JV& vals = v.kind == JV::OBJ ? v.get("values") : v;
  long long pos = v.kind == JV::OBJ && v.has("pos") && v.get("pos").kind == JV::NUM ? v.get("pos").i : -1;
  out = nullptr; if (vals.kind != JV::ARR || vals.a.empty()) return;
  vector<ListNode*> nodes; for (auto& x : vals.a) nodes.push_back(new ListNode((int)x.i));
  for (size_t k = 0; k + 1 < nodes.size(); k++) nodes[k]->next = nodes[k + 1];
  if (pos >= 0 && pos < (long long)nodes.size()) nodes.back()->next = nodes[pos];
  out = nodes[0];
}
inline void from(const JV& v, TreeNode*& out) {
  out = nullptr; if (v.kind != JV::ARR || v.a.empty() || v.a[0].kind == JV::NUL) return;
  out = new TreeNode((int)v.a[0].i); deque<TreeNode*> q{out}; size_t k = 1;
  while (!q.empty() && k < v.a.size()) { TreeNode* n = q.front(); q.pop_front();
    if (k < v.a.size() && v.a[k].kind != JV::NUL) { n->left = new TreeNode((int)v.a[k].i); q.push_back(n->left); } k++;
    if (k < v.a.size() && v.a[k].kind != JV::NUL) { n->right = new TreeNode((int)v.a[k].i); q.push_back(n->right); } k++; }
}
template <class T> void from(const JV& v, vector<T>& out) {
  out.clear(); for (auto& x : v.a) { T item{}; from(x, item); out.push_back(item); }
}

inline void quote(string& o, const string& s) {
  o += '"';
  for (unsigned char c : s) {
    if (c == '"' || c == '\\') { o += '\\'; o += (char)c; }
    else if (c == '\n') o += "\\n"; else if (c == '\t') o += "\\t"; else if (c == '\r') o += "\\r";
    else if (c < 0x20) { char b[8]; snprintf(b, sizeof b, "\\u%04x", c); o += b; }
    else o += (char)c;
  }
  o += '"';
}

template <class T> typename enable_if<is_integral<T>::value && !is_same<T, bool>::value && !is_same<T, char>::value>::type
w(string& o, T v) { o += to_string(v); }
inline void w(string& o, bool v) { o += v ? "true" : "false"; }
inline void w(string& o, char v) { quote(o, string(1, v)); }
inline void w(string& o, double v) {
  if (std::isnan(v)) { o += "\"nan\""; return; }
  if (std::isinf(v)) { o += v > 0 ? "\"inf\"" : "\"-inf\""; return; }
  char b[40]; snprintf(b, sizeof b, "%.17g", v); o += b;
}
inline void w(string& o, float v) { w(o, (double)v); }
inline void w(string& o, const string& v) { quote(o, v); }
inline void w(string& o, const char* v) { quote(o, v ? string(v) : string()); }
inline void w(string& o, const Interval& v) { o += '['; o += to_string(v.start); o += ','; o += to_string(v.end); o += ']'; }
inline void w(string& o, ListNode* n) {
  if (!n) { o += "null"; return; }
  o += '['; size_t count = 0;
  for (; n && count < 100000; n = n->next, count++) { if (count) o += ','; o += to_string(n->${FIELD}); }
  o += ']';
}
inline void w(string& o, TreeNode* root) {
  if (!root) { o += "null"; return; }
  vector<TreeNode*> q; if (root) q.push_back(root);
  for (size_t h = 0; h < q.size(); h++) if (q[h]) { q.push_back(q[h]->left); q.push_back(q[h]->right); }
  while (!q.empty() && !q.back()) q.pop_back();
  o += '[';
  for (size_t k = 0; k < q.size(); k++) { if (k) o += ','; if (q[k]) o += to_string(q[k]->val); else o += "null"; }
  o += ']';
}
template <class T> void w(string& o, const vector<T>& v) {
  o += '[';
  for (size_t k = 0; k < v.size(); k++) { if (k) o += ','; w(o, static_cast<T>(v[k])); }
  o += ']';
}
template <class T> string J(const T& v) { string o; w(o, v); return o; }
inline string nodeValue(ListNode* n) { return n ? to_string(n->${FIELD}) : "null"; }
inline string nodeValue(TreeNode* n) { return n ? to_string(n->val) : "null"; }
template <class T> string unsigned32(T v) { return to_string((long long)(uint32_t)v); }
template <class T> string prefix(const vector<T>& v, long long n) {
  if (n < 0 || n > (long long)v.size()) throw runtime_error("The returned length is outside the output buffer");
  return J(vector<T>(v.begin(), v.begin() + n));
}

volatile sig_atomic_t current = -1;
string pendingStdout;

void emit(const string& line) {
  string full = __JUDGE_MARKER__ + line + "\n";
  fwrite(full.data(), 1, full.size(), stdout); fflush(stdout);
}

void onSignal(int sig) {
  const char* what = sig == SIGSEGV ? "Segmentation fault (invalid memory access or stack overflow)"
    : sig == SIGFPE ? "Floating point exception (division by zero?)"
    : sig == SIGABRT ? "Aborted" : "Bus error";
  char buf[512];
  int n = snprintf(buf, sizeof buf, "%s{\"i\":%d,\"status\":\"error\",\"error\":\"Runtime Error: %s\",\"stdout\":\"\"}\n",
    __JUDGE_MARKER__, (int)current, what);
  if (n > 0) { ssize_t ignored = write(1, buf, (size_t)n); (void)ignored; }
  _exit(0);
}
}  // namespace judge

using judge::JV;

__JUDGE_BODY__

static const char* JUDGE_TESTS = R"__JUDGE__(__JUDGE_TESTS__)__JUDGE__";

static void* judgeMain(void*) {
  static char altStack[1 << 16];
  stack_t ss{}; ss.ss_sp = altStack; ss.ss_size = sizeof altStack; sigaltstack(&ss, nullptr);
  struct sigaction sa{}; sa.sa_handler = judge::onSignal; sa.sa_flags = SA_ONSTACK;
  for (int sig : {SIGSEGV, SIGFPE, SIGABRT, SIGBUS}) sigaction(sig, &sa, nullptr);
  string text(JUDGE_TESTS);
  judge::Parser parser(text);
  JV tests = parser.value();
  for (size_t i = 0; i < tests.a.size(); i++) {
    judge::current = (int)i;
    ostringstream buf; streambuf* old = cout.rdbuf(buf.rdbuf());
    auto t0 = chrono::steady_clock::now();
    string line;
    try {
      string output = judgeRunCase(tests.a[i]);
      double ms = chrono::duration<double, milli>(chrono::steady_clock::now() - t0).count();
      cout.rdbuf(old);
      string out = buf.str().substr(0, 20000);
      line = "{\"i\":" + to_string(i) + ",\"status\":\"ok\",\"output\":" + output + ",\"ms\":" + to_string(ms) + ",\"stdout\":";
      judge::quote(line, out); line += "}";
    } catch (const exception& e) {
      cout.rdbuf(old);
      line = "{\"i\":" + to_string(i) + ",\"status\":\"error\",\"error\":";
      judge::quote(line, string("Runtime Error: ") + e.what()); line += ",\"stdout\":";
      judge::quote(line, buf.str().substr(0, 20000)); line += "}";
    } catch (...) {
      cout.rdbuf(old);
      line = "{\"i\":" + to_string(i) + ",\"status\":\"error\",\"error\":\"Runtime Error: unknown exception\",\"stdout\":\"\"}";
    }
    judge::emit(line);
  }
  return nullptr;
}

int main() {
  pthread_attr_t attr; pthread_attr_init(&attr);
  pthread_attr_setstacksize(&attr, 256u << 20);
  pthread_t thread;
  if (pthread_create(&thread, &attr, judgeMain, nullptr) != 0) judgeMain(nullptr);
  else pthread_join(thread, nullptr);
  return 0;
}
`;

function declare(params: Param[], source: string, prefix: string) {
  return params.map((p, k) => `${cppType(p.type).replace(/&$/, "")} ${prefix}${k}{}; judge::from(${source}[${k}], ${prefix}${k});`).join(" ");
}

function outputExpr(output: OutputSpec | undefined, returns: ValueType, params: Param[], prefix: string, ret: string) {
  const value = output?.arg !== undefined ? `${prefix}${output.arg}` : ret;
  const type = output?.arg !== undefined ? params[output.arg].type : returns;
  if (output?.as === "value") return `judge::nodeValue(${value})`;
  if (output?.as === "unsigned32") return `judge::unsigned32(${value})`;
  if (output?.prefix) return `judge::prefix(${value}, ${ret})`;
  if (type === "void") return '"null"';
  return `judge::J(${value})`;
}

function functionBody(spec: FunctionSpec) {
  const args = spec.params.map((_, k) => `p${k}`).join(", ");
  const call = `sol.${safeName(spec.function.java, "cpp")}(${args})`;
  const invoke = spec.returns === "void" ? `${call};` : `auto ret = ${call};`;
  return `static string judgeRunCase(const JV& a) {
  Solution sol;
  ${declare(spec.params, "a", "p")}
  ${invoke}
  return ${outputExpr(spec.output, spec.returns, spec.params, "p", "ret")};
}`;
}

function designBody(spec: DesignSpec) {
  const cases = spec.methods.map((m) => {
    const args = m.params.map((_, k) => `p${k}`).join(", ");
    const call = `obj->${safeName(m.java, "cpp")}(${args})`;
    const invoke = m.returns === "void" ? `${call};` : `auto ret = ${call};`;
    const ret = m.returns === "void" && m.output?.arg === undefined ? '"null"' : outputExpr(m.output, m.returns, m.params, "p", "ret");
    return `if (op == ${JSON.stringify(m.name)}) { ${declare(m.params, "args", "p")} ${invoke} r = ${ret}; }`;
  });
  return `static string judgeRunCase(const JV& in) {
  const JV& ctor = in.get("ctor"); const JV& ops = in.get("ops"); const JV& argsList = in.get("args");
  ${declare(spec.ctorParams, "ctor", "c")}
  ${spec.className}* obj = new ${spec.className}(${spec.ctorParams.map((_, k) => `c${k}`).join(", ")});
  string out = "[";
  for (size_t k = 0; k < ops.a.size(); k++) {
    const string& op = ops[k].s; const JV& args = argsList[k]; string r;
    ${cases.join("\n    else ")}
    else throw runtime_error("Unknown operation " + op);
    if (k) out += ",";
    out += r;
  }
  return out + "]";
}`;
}

/** The result marker as a C string literal; C++ forbids `\u` escapes for control characters. */
function cMarker() {
  return `"${[...RESULT_MARKER].map((c) => (c.charCodeAt(0) < 0x20 ? `\\x${c.charCodeAt(0).toString(16).padStart(2, "0")}" "` : c)).join("")}"`;
}

export function buildCppProgram(spec: ProblemSpec, userCode: string, tests: AnyTestCase[]): string {
  const concurrent = spec.kind === "function" || spec.kind === undefined ? spec.concurrency : undefined;
  if (spec.kind === "sql" || (!usesCoreFeatures(spec) && !concurrent)) throw new Error("This problem is not available in C++ yet");
  const field = listFieldFor(spec.style);
  let body: string;
  if (spec.kind === "design") body = designBody(spec);
  else body = concurrent ? CPP_CONCURRENCY_SUPPORT + cppConcurrencyBody(spec) : functionBody(spec);
  const inputs = JSON.stringify(tests.map((t) => t.input));
  return [
    CPP_PRELUDE.replaceAll(FIELD, field),
    '#line 1 "solution.cpp"',
    userCode,
    '#line 1 "judge.cpp"',
    CPP_RUNTIME.replaceAll(FIELD, field)
      .replace("__JUDGE_BODY__", () => body)
      .replaceAll("__JUDGE_MARKER__", () => cMarker())
      .replace("__JUDGE_TESTS__", () => inputs),
  ].join("\n");
}

/** Keeps diagnostics about the user's file and drops the compiler's absolute paths. */
export function mapCppCompileErrors(stderr: string): string {
  return stderr
    .replace(/(^|\n)[^\n:]*solution\.cpp:(\d+):(\d+):/g, "$1Line $2:$3:")
    .replace(/(^|\n)[^\n:]*solution\.cpp: /g, "$1")
    .replace(/(^|\n)[^\n:]*judge\.cpp:\d+:\d+:/g, "$1judge:")
    .slice(0, 20000);
}
