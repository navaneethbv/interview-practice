import type { AnyTestCase, DesignSpec, FunctionSpec, OutputSpec, Param, ProblemSpec, ValueType } from "./types";
import { RESULT_MARKER } from "./types";
import { goMethodName, safeName, usesCoreFeatures } from "./languages";

/**
 * Go harness. The user's code is its own file (solution.go) in package main, so it keeps its own
 * imports and line numbers; the harness (judge.go) defines the helper types and runs each case,
 * recovering panics and capturing anything printed to stdout.
 */

const GO_TYPE: Partial<Record<ValueType, string>> = {
  int: "int",
  long: "int64",
  double: "float64",
  boolean: "bool",
  string: "string",
  char: "byte",
  "int[]": "[]int",
  "long[]": "[]int64",
  "double[]": "[]float64",
  "char[]": "[]byte",
  "string[]": "[]string",
  "boolean[]": "[]bool",
  "int[][]": "[][]int",
  "char[][]": "[][]byte",
  "List<int>": "[]int",
  "List<double>": "[]float64",
  "List<boolean>": "[]bool",
  "List<string>": "[]string",
  "List<List<int>>": "[][]int",
  "List<List<string>>": "[][]string",
  "List<int[]>": "[][]int",
  ListNode: "*ListNode",
  "ListNode[]": "[]*ListNode",
  TreeNode: "*TreeNode",
  "List<TreeNode>": "[]*TreeNode",
  Interval: "*Interval",
  "Interval[]": "[]*Interval",
  "List<Interval>": "[]*Interval",
};

export function goType(t: ValueType): string {
  const name = GO_TYPE[t];
  if (!name) throw new Error(`Type ${t} is not supported in Go`);
  return name;
}

/** Decoder for each type; plain JSON types use encoding/json directly. */
const GO_DECODER: Partial<Record<ValueType, string>> = {
  char: "decChar",
  "char[]": "decChars",
  "char[][]": "decCharGrid",
  ListNode: "decList",
  "ListNode[]": "decLists",
  TreeNode: "decTree",
  "List<TreeNode>": "decTrees",
  Interval: "decInterval",
  "Interval[]": "decIntervals",
  "List<Interval>": "decIntervals",
};

const FIELD = "__LISTFIELD__";
/** Go struct tags and raw strings need backticks, which cannot appear inside a template literal. */
const BACKTICK = "__BT__";

const GO_HARNESS = String.raw`package main

import (
	"encoding/json"
	"fmt"
	"io"
	"math"
	"os"
	"reflect"
	"regexp"
	"runtime/debug"
	"strings"
	"time"
)

type ListNode struct {
	${FIELD} int
	Next *ListNode
}

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
	Next  *TreeNode
}

type Interval struct {
	Start int
	End   int
}

const judgeMarker = __JUDGE_MARKER__
const judgeLimit = 100000

func dec(raw json.RawMessage, out any) {
	if err := json.Unmarshal(raw, out); err != nil {
		panic(fmt.Sprintf("invalid input: %v", err))
	}
}

func decChar(raw json.RawMessage) byte {
	var s string
	dec(raw, &s)
	if s == "" {
		return 0
	}
	return s[0]
}

func decChars(raw json.RawMessage) []byte {
	var items []string
	dec(raw, &items)
	out := make([]byte, len(items))
	for i, s := range items {
		if s != "" {
			out[i] = s[0]
		}
	}
	return out
}

func decCharGrid(raw json.RawMessage) [][]byte {
	var rows []json.RawMessage
	dec(raw, &rows)
	out := make([][]byte, len(rows))
	for i, r := range rows {
		out[i] = decChars(r)
	}
	return out
}

func decList(raw json.RawMessage) *ListNode {
	var values []int
	pos := -1
	if strings.HasPrefix(strings.TrimSpace(string(raw)), "{") {
		var obj struct {
			Values []int __BT__json:"values"__BT__
			Pos    *int  __BT__json:"pos"__BT__
		}
		dec(raw, &obj)
		values = obj.Values
		if obj.Pos != nil {
			pos = *obj.Pos
		}
	} else {
		dec(raw, &values)
	}
	if len(values) == 0 {
		return nil
	}
	nodes := make([]*ListNode, len(values))
	for i, v := range values {
		nodes[i] = &ListNode{${FIELD}: v}
	}
	for i := 0; i+1 < len(nodes); i++ {
		nodes[i].Next = nodes[i+1]
	}
	if pos >= 0 && pos < len(nodes) {
		nodes[len(nodes)-1].Next = nodes[pos]
	}
	return nodes[0]
}

func decLists(raw json.RawMessage) []*ListNode {
	var items []json.RawMessage
	dec(raw, &items)
	out := make([]*ListNode, len(items))
	for i, r := range items {
		out[i] = decList(r)
	}
	return out
}

func decTree(raw json.RawMessage) *TreeNode {
	var v []*int
	dec(raw, &v)
	if len(v) == 0 || v[0] == nil {
		return nil
	}
	root := &TreeNode{Val: *v[0]}
	queue := []*TreeNode{root}
	k := 1
	for len(queue) > 0 && k < len(v) {
		n := queue[0]
		queue = queue[1:]
		if k < len(v) && v[k] != nil {
			n.Left = &TreeNode{Val: *v[k]}
			queue = append(queue, n.Left)
		}
		k++
		if k < len(v) && v[k] != nil {
			n.Right = &TreeNode{Val: *v[k]}
			queue = append(queue, n.Right)
		}
		k++
	}
	return root
}

func decTrees(raw json.RawMessage) []*TreeNode {
	var items []json.RawMessage
	dec(raw, &items)
	out := make([]*TreeNode, len(items))
	for i, r := range items {
		out[i] = decTree(r)
	}
	return out
}

func decInterval(raw json.RawMessage) *Interval {
	var pair []int
	dec(raw, &pair)
	return &Interval{Start: pair[0], End: pair[1]}
}

func decIntervals(raw json.RawMessage) []*Interval {
	var items []json.RawMessage
	dec(raw, &items)
	out := make([]*Interval, len(items))
	for i, r := range items {
		out[i] = decInterval(r)
	}
	return out
}

func listValues(n *ListNode) []int {
	out := []int{}
	for n != nil && len(out) < judgeLimit {
		out = append(out, n.${FIELD})
		n = n.Next
	}
	return out
}

func treeValues(root *TreeNode) []any {
	out := []any{}
	if root == nil {
		return out
	}
	queue := []*TreeNode{root}
	for h := 0; h < len(queue); h++ {
		n := queue[h]
		if n == nil {
			out = append(out, nil)
			continue
		}
		out = append(out, n.Val)
		queue = append(queue, n.Left, n.Right)
	}
	for len(out) > 0 && out[len(out)-1] == nil {
		out = out[:len(out)-1]
	}
	return out
}

func plain(v any) any {
	switch x := v.(type) {
	case nil:
		return nil
	case *ListNode:
		if x == nil {
			return nil
		}
		return listValues(x)
	case *TreeNode:
		if x == nil {
			return nil
		}
		return treeValues(x)
	case *Interval:
		if x == nil {
			return nil
		}
		return []int{x.Start, x.End}
	case Interval:
		return []int{x.Start, x.End}
	case byte:
		return string([]byte{x})
	case rune:
		return string(x)
	case float64:
		if math.IsNaN(x) {
			return "nan"
		}
		if math.IsInf(x, 0) {
			if x > 0 {
				return "inf"
			}
			return "-inf"
		}
		return x
	case float32:
		return plain(float64(x))
	}
	rv := reflect.ValueOf(v)
	switch rv.Kind() {
	case reflect.Slice, reflect.Array:
		if rv.Kind() == reflect.Slice && rv.IsNil() {
			return []any{}
		}
		out := make([]any, rv.Len())
		for i := range out {
			out[i] = plain(rv.Index(i).Interface())
		}
		return out
	case reflect.Map:
		out := map[string]any{}
		for _, k := range rv.MapKeys() {
			out[fmt.Sprint(k.Interface())] = plain(rv.MapIndex(k).Interface())
		}
		return out
	case reflect.Ptr:
		if rv.IsNil() {
			return nil
		}
		return plain(rv.Elem().Interface())
	}
	return v
}

func prefix(v any, n int) any {
	rv := reflect.ValueOf(v)
	if n < 0 || n > rv.Len() {
		panic("The returned length is outside the output buffer")
	}
	return plain(rv.Slice(0, n).Interface())
}

func unsigned32(v any) any {
	rv := reflect.ValueOf(v)
	if rv.CanUint() {
		return int64(uint32(rv.Uint()))
	}
	return int64(uint32(rv.Int()))
}

var judgeLine = regexp.MustCompile(__BT__solution\.go:(\d+)__BT__)

func runCaptured(input json.RawMessage) (output string, printed string, errMsg string) {
	real := os.Stdout
	r, w, err := os.Pipe()
	if err == nil {
		os.Stdout = w
	}
	done := make(chan string)
	go func() {
		if r == nil {
			done <- ""
			return
		}
		data, _ := io.ReadAll(io.LimitReader(r, 1<<20))
		io.Copy(io.Discard, r)
		done <- string(data)
	}()
	func() {
		defer func() {
			if rec := recover(); rec != nil {
				where := ""
				if m := judgeLine.FindStringSubmatch(string(debug.Stack())); m != nil {
					where = " (line " + m[1] + ")"
				}
				errMsg = fmt.Sprintf("panic: %v%s", rec, where)
			}
		}()
		value := judgeRunCase(input)
		data, mErr := json.Marshal(value)
		if mErr != nil {
			panic(mErr)
		}
		output = string(data)
	}()
	if w != nil {
		w.Close()
	}
	os.Stdout = real
	printed = <-done
	if r != nil {
		r.Close()
	}
	if len(printed) > 20000 {
		printed = printed[:20000]
	}
	return
}

func main() {
	debug.SetMaxStack(512 << 20)
	var tests []json.RawMessage
	if err := json.Unmarshal([]byte(judgeTests), &tests); err != nil {
		panic(err)
	}
	for i, input := range tests {
		start := time.Now()
		output, printed, errMsg := runCaptured(input)
		ms := float64(time.Since(start).Microseconds()) / 1000
		var line []byte
		if errMsg != "" {
			line, _ = json.Marshal(map[string]any{"i": i, "status": "error", "error": errMsg, "stdout": printed})
		} else {
			line, _ = json.Marshal(map[string]any{"i": i, "status": "ok", "output": json.RawMessage(output), "ms": ms, "stdout": printed})
		}
		fmt.Fprint(os.Stdout, judgeMarker+string(line)+"\n")
	}
}

__JUDGE_BODY__

const judgeTests = __JUDGE_TESTS__
`;

function declare(params: Param[], source: string, prefix: string) {
  return params
    .map((p, k) => {
      const decoder = GO_DECODER[p.type];
      if (decoder) return `\t${prefix}${k} := ${decoder}(${source}[${k}])`;
      return `\tvar ${prefix}${k} ${goType(p.type)}\n\tdec(${source}[${k}], &${prefix}${k})`;
    })
    .join("\n");
}

function outputExpr(output: OutputSpec | undefined, returns: ValueType, params: Param[], prefix: string) {
  const value = output?.arg !== undefined ? `${prefix}${output.arg}` : "ret";
  const type = output?.arg !== undefined ? params[output.arg].type : returns;
  if (output?.as === "value") {
    return `func() any { if ${value} == nil { return nil }; return ${value}.${type === "ListNode" ? FIELD : "Val"} }()`;
  }
  if (output?.as === "unsigned32") return `unsigned32(${value})`;
  if (output?.prefix) return `prefix(${value}, int(ret))`;
  if (type === "void") return "nil";
  return `plain(${value})`;
}

function functionBody(spec: FunctionSpec) {
  const args = spec.params.map((_, k) => `p${k}`).join(", ");
  const call = `${safeName(spec.function.java, "go")}(${args})`;
  const invoke = spec.returns === "void" ? `\t${call}` : `\tret := ${call}\n\t_ = ret`;
  return `func judgeRunCase(input json.RawMessage) any {
\tvar a []json.RawMessage
\tdec(input, &a)
${declare(spec.params, "a", "p")}
${invoke}
\treturn ${outputExpr(spec.output, spec.returns, spec.params, "p")}
}`;
}

function designBody(spec: DesignSpec) {
  const cases = spec.methods.map((m) => {
    const args = m.params.map((_, k) => `p${k}`).join(", ");
    const call = `obj.${goMethodName(m.java)}(${args})`;
    const invoke = m.returns === "void" ? `\t\t\t${call}` : `\t\t\tret := ${call}\n\t\t\t_ = ret`;
    const ret = m.returns === "void" && m.output?.arg === undefined ? "nil" : outputExpr(m.output, m.returns, m.params, "p");
    const decl = declare(m.params, "args", "p").replaceAll("\n\t", "\n\t\t\t").replace(/^\t/, "\t\t\t");
    return `\t\tcase ${JSON.stringify(m.name)}:\n${decl}\n${invoke}\n\t\t\tresults = append(results, ${ret})`;
  });
  return `func judgeRunCase(input json.RawMessage) any {
\tvar in struct {
\t\tCtor []json.RawMessage   \`json:"ctor"\`
\t\tOps  []string            \`json:"ops"\`
\t\tArgs [][]json.RawMessage \`json:"args"\`
\t}
\tdec(input, &in)
\tctor := in.Ctor
\t_ = ctor
${declare(spec.ctorParams, "ctor", "c")}
\tobj := Constructor(${spec.ctorParams.map((_, k) => `c${k}`).join(", ")})
\tresults := []any{}
\tfor k, op := range in.Ops {
\t\targs := in.Args[k]
\t\t_ = args
\t\tswitch op {
${cases.join("\n")}
\t\tdefault:
\t\t\tpanic("Unknown operation " + op)
\t\t}
\t}
\treturn results
}`;
}

export function listFieldForGo(style: ProblemSpec["style"]) {
  return style === "leetcode" ? "Val" : "Value";
}

/** Prepends the package clause on the user's first line when it is missing, keeping line numbers. */
export function prepareGoUserCode(code: string) {
  return /^\s*package\s+main\b/m.test(code) ? code : `package main; ${code}`;
}

export function buildGoProgram(spec: ProblemSpec, userCode: string, tests: AnyTestCase[]): { harness: string; solution: string } {
  if (spec.kind === "sql" || !usesCoreFeatures(spec)) throw new Error("This problem is not available in Go yet");
  const field = listFieldForGo(spec.style);
  const body = spec.kind === "design" ? designBody(spec) : functionBody(spec);
  const inputs = JSON.stringify(tests.map((t) => t.input));
  const harness = GO_HARNESS.replace("__JUDGE_BODY__", () => body)
    .replace("__JUDGE_MARKER__", () => JSON.stringify(RESULT_MARKER))
    .replace("__JUDGE_TESTS__", () => "`" + inputs.replaceAll("`", "` + \"`\" + `") + "`")
    .replaceAll(FIELD, field)
    .replaceAll(BACKTICK, "`");
  return { harness, solution: prepareGoUserCode(userCode) };
}

/** Keeps diagnostics about solution.go with editor line numbers. */
export function mapGoCompileErrors(stderr: string): string {
  return stderr
    .split("\n")
    .filter((line) => !/^# /.test(line))
    .join("\n")
    .replace(/(^|\n)[^\n]*?solution\.go:(\d+):(\d+):/g, "$1Line $2:$3:")
    .replace(/(^|\n)[^\n]*?judge\.go:\d+:\d+:/g, "$1judge:")
    .trim()
    .slice(0, 20000);
}
