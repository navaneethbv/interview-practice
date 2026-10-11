import type { CodeLang } from "../content-types";
import type { FunctionSpec } from "./types";

/**
 * Concurrency problems (LeetCode's "Print in Order" family). The user writes a class whose
 * methods are called from several threads; a driver per problem starts those threads, records
 * what they print, and checks the result. Each test runs REPEATS times with small random start
 * delays so ordering bugs surface, and a watchdog reports threads that never finish.
 *
 * These problems need real threads, so they run in Java, C++ and Go on the server; Pyodide has
 * no threads and the browser languages are single-threaded.
 */
export type ConcurrencyDriver = "printInOrder" | "fooBar" | "zeroEvenOdd" | "h2o" | "fizzBuzz" | "diningPhilosophers";

export const CONCURRENCY_LANGS: CodeLang[] = ["java", "cpp", "go"];
export const REPEATS = 20;
export const THREAD_TIMEOUT_MS = 3000;

const TIMEOUT_MESSAGE = `Threads did not finish within ${THREAD_TIMEOUT_MS / 1000} seconds: look for a deadlock or a missed signal`;

/* ---------------------------------------------------------------- Java */

export const JAVA_CONCURRENCY_IMPORTS = " import java.util.concurrent.*; import java.util.concurrent.atomic.*; import java.util.concurrent.locks.*;";

export const JAVA_CONCURRENCY_SUPPORT = String.raw`
final class Conc {
  interface Task { void run() throws Exception; }
  /** Starts every task on its own thread in the given order, then waits for all of them. */
  static void run(List<Task> tasks) throws Exception {
    final Throwable[] failure = new Throwable[1];
    List<Thread> threads = new ArrayList<>();
    for (Task task : tasks) {
      final int delay = ThreadLocalRandom.current().nextInt(3);
      Thread t = new Thread(() -> {
        try { Thread.sleep(delay); task.run(); }
        catch (Throwable e) { synchronized (failure) { if (failure[0] == null) failure[0] = e; } }
      });
      t.setDaemon(true);
      threads.add(t);
    }
    for (Thread t : threads) t.start();
    long deadline = System.currentTimeMillis() + ${THREAD_TIMEOUT_MS};
    for (Thread t : threads) t.join(Math.max(1, deadline - System.currentTimeMillis()));
    synchronized (failure) {
      if (failure[0] instanceof Exception) throw (Exception) failure[0];
      if (failure[0] != null) throw new RuntimeException(failure[0]);
    }
    for (Thread t : threads) if (t.isAlive()) throw new IllegalStateException(${JSON.stringify(TIMEOUT_MESSAGE)});
  }
  /** Runs one trial ${REPEATS} times; returns the first result that differs from the first trial. */
  static String repeat(Callable<String> trial) throws Exception {
    String first = trial.call();
    for (int i = 1; i < ${REPEATS}; i++) { String next = trial.call(); if (!next.equals(first)) return next; }
    return first;
  }
}
`;

const JAVA_DRIVERS: Record<ConcurrencyDriver, string> = {
  printInOrder: `
    int[] order = J.toIntArray(a.get(0));
    return Conc.repeat(() -> {
      Foo foo = new Foo(); StringBuffer out = new StringBuffer(); List<Conc.Task> tasks = new ArrayList<>();
      for (int k : order) {
        if (k == 1) tasks.add(() -> foo.first(() -> out.append("first")));
        else if (k == 2) tasks.add(() -> foo.second(() -> out.append("second")));
        else tasks.add(() -> foo.third(() -> out.append("third")));
      }
      Conc.run(tasks);
      return J.json(out.toString());
    });`,
  fooBar: `
    int n = J.toInt(a.get(0));
    return Conc.repeat(() -> {
      FooBar fb = new FooBar(n); StringBuffer out = new StringBuffer();
      Conc.run(Arrays.asList(() -> fb.bar(() -> out.append("bar")), () -> fb.foo(() -> out.append("foo"))));
      return J.json(out.toString());
    });`,
  zeroEvenOdd: `
    int n = J.toInt(a.get(0));
    return Conc.repeat(() -> {
      ZeroEvenOdd z = new ZeroEvenOdd(n); StringBuffer out = new StringBuffer(); IntConsumer print = x -> out.append(x);
      Conc.run(Arrays.asList(() -> z.odd(print), () -> z.even(print), () -> z.zero(print)));
      return J.json(out.toString());
    });`,
  h2o: `
    String water = J.toStr(a.get(0));
    return Conc.repeat(() -> {
      H2O h = new H2O(); StringBuffer out = new StringBuffer(); List<Conc.Task> tasks = new ArrayList<>();
      for (char c : water.toCharArray()) {
        if (c == 'H') tasks.add(() -> h.hydrogen(() -> out.append('H')));
        else tasks.add(() -> h.oxygen(() -> out.append('O')));
      }
      Conc.run(tasks);
      String s = out.toString();
      for (int k = 0; k + 3 <= s.length(); k += 3) {
        String group = s.substring(k, k + 3);
        if (group.chars().filter(c -> c == 'H').count() != 2) {
          throw new IllegalStateException("Molecule " + (k / 3 + 1) + " was released as " + group + "; every group of three must be two H and one O");
        }
      }
      if (s.length() != water.length()) throw new IllegalStateException("Released " + s.length() + " atoms instead of " + water.length());
      return J.json(s.length() / 3);
    });`,
  fizzBuzz: `
    int n = J.toInt(a.get(0));
    return Conc.repeat(() -> {
      FizzBuzz fb = new FizzBuzz(n); List<String> out = Collections.synchronizedList(new ArrayList<>());
      Conc.run(Arrays.asList(
        () -> fb.number(x -> out.add(String.valueOf(x))), () -> fb.fizzbuzz(() -> out.add("fizzbuzz")),
        () -> fb.buzz(() -> out.add("buzz")), () -> fb.fizz(() -> out.add("fizz"))));
      return J.json(out);
    });`,
  diningPhilosophers: `
    int n = J.toInt(a.get(0));
    return Conc.repeat(() -> {
      DiningPhilosophers dp = new DiningPhilosophers();
      AtomicIntegerArray forks = new AtomicIntegerArray(new int[] {-1, -1, -1, -1, -1});
      AtomicIntegerArray meals = new AtomicIntegerArray(5);
      List<Conc.Task> tasks = new ArrayList<>();
      for (int p = 0; p < 5; p++) {
        final int id = p, left = p, right = (p + 1) % 5;
        Runnable pickLeft = () -> { int owner = forks.getAndUpdate(left, x -> x == -1 ? id : x); if (owner != -1) throw new IllegalStateException("Philosopher " + id + " picked up fork " + left + " while philosopher " + owner + " held it"); };
        Runnable pickRight = () -> { int owner = forks.getAndUpdate(right, x -> x == -1 ? id : x); if (owner != -1) throw new IllegalStateException("Philosopher " + id + " picked up fork " + right + " while philosopher " + owner + " held it"); };
        Runnable eat = () -> { if (forks.get(left) != id || forks.get(right) != id) throw new IllegalStateException("Philosopher " + id + " ate without holding both forks"); meals.incrementAndGet(id); };
        Runnable putLeft = () -> { if (!forks.compareAndSet(left, id, -1)) throw new IllegalStateException("Philosopher " + id + " put down fork " + left + " without holding it"); };
        Runnable putRight = () -> { if (!forks.compareAndSet(right, id, -1)) throw new IllegalStateException("Philosopher " + id + " put down fork " + right + " without holding it"); };
        tasks.add(() -> { for (int i = 0; i < n; i++) dp.wantsToEat(id, pickLeft, pickRight, eat, putLeft, putRight); });
      }
      Conc.run(tasks);
      int[] result = new int[5];
      for (int p = 0; p < 5; p++) result[p] = meals.get(p);
      return J.json(result);
    });`,
};

export function javaConcurrencyBody(spec: FunctionSpec) {
  return `
  static String runCase(Object input) throws Exception {
    List<Object> a = J.L(input);${JAVA_DRIVERS[spec.concurrency!.driver]}
  }`;
}

/* ---------------------------------------------------------------- C++ */

export const CPP_CONCURRENCY_SUPPORT = String.raw`
namespace judge {
/** Runs each task on its own thread; a deadlock reports the running case and exits. */
inline void runThreads(const vector<function<void()>>& tasks) {
  auto state = make_shared<pair<mutex, condition_variable>>();
  auto done = make_shared<int>(0);
  auto failure = make_shared<string>();
  vector<thread> threads;
  for (auto& task : tasks) {
    int delay = rand() % 3;
    threads.emplace_back([task, delay, state, done, failure] {
      this_thread::sleep_for(chrono::milliseconds(delay));
      try { task(); }
      catch (const exception& e) { lock_guard<mutex> g(state->first); if (failure->empty()) *failure = e.what(); }
      catch (...) { lock_guard<mutex> g(state->first); if (failure->empty()) *failure = "unknown exception"; }
      lock_guard<mutex> g(state->first); (*done)++; state->second.notify_all();
    });
  }
  unique_lock<mutex> lock(state->first);
  bool finished = state->second.wait_for(lock, chrono::milliseconds(${THREAD_TIMEOUT_MS}), [&] { return *done == (int)tasks.size(); });
  if (!finished) {
    string line = "{\"i\":" + to_string((int)current) + ",\"status\":\"error\",\"error\":";
    quote(line, ${JSON.stringify(TIMEOUT_MESSAGE)} + (failure->empty() ? string() : "; first error: " + *failure));
    line += ",\"stdout\":\"\"}";
    emit(line);
    _exit(0);
  }
  lock.unlock();
  for (auto& t : threads) t.join();
  if (!failure->empty()) throw runtime_error(*failure);
}

inline string repeatTrials(const function<string()>& trial) {
  string first = trial();
  for (int i = 1; i < ${REPEATS}; i++) { string next = trial(); if (next != first) return next; }
  return first;
}

struct Sink {
  mutex m; string text; vector<string> items;
  void add(const string& s) { lock_guard<mutex> g(m); text += s; items.push_back(s); }
};
}  // namespace judge
`;

const CPP_DRIVERS: Record<ConcurrencyDriver, string> = {
  printInOrder: `
  vector<int> order; judge::from(a[0], order);
  return judge::repeatTrials([&] {
    Foo foo; judge::Sink out; vector<function<void()>> tasks;
    for (int k : order) {
      if (k == 1) tasks.push_back([&] { foo.first([&] { out.add("first"); }); });
      else if (k == 2) tasks.push_back([&] { foo.second([&] { out.add("second"); }); });
      else tasks.push_back([&] { foo.third([&] { out.add("third"); }); });
    }
    judge::runThreads(tasks);
    return judge::J(out.text);
  });`,
  fooBar: `
  int n; judge::from(a[0], n);
  return judge::repeatTrials([&] {
    FooBar fb(n); judge::Sink out;
    judge::runThreads({[&] { fb.bar([&] { out.add("bar"); }); }, [&] { fb.foo([&] { out.add("foo"); }); }});
    return judge::J(out.text);
  });`,
  zeroEvenOdd: `
  int n; judge::from(a[0], n);
  return judge::repeatTrials([&] {
    ZeroEvenOdd z(n); judge::Sink out; function<void(int)> print = [&](int x) { out.add(to_string(x)); };
    judge::runThreads({[&] { z.odd(print); }, [&] { z.even(print); }, [&] { z.zero(print); }});
    return judge::J(out.text);
  });`,
  h2o: `
  string water; judge::from(a[0], water);
  return judge::repeatTrials([&] {
    H2O h; judge::Sink out; vector<function<void()>> tasks;
    for (char c : water) {
      if (c == 'H') tasks.push_back([&] { h.hydrogen([&] { out.add("H"); }); });
      else tasks.push_back([&] { h.oxygen([&] { out.add("O"); }); });
    }
    judge::runThreads(tasks);
    const string& s = out.text;
    for (size_t k = 0; k + 3 <= s.size(); k += 3) {
      string group = s.substr(k, 3);
      if (count(group.begin(), group.end(), 'H') != 2)
        throw runtime_error("Molecule " + to_string(k / 3 + 1) + " was released as " + group + "; every group of three must be two H and one O");
    }
    if (s.size() != water.size()) throw runtime_error("Released " + to_string(s.size()) + " atoms instead of " + to_string(water.size()));
    return judge::J((int)(s.size() / 3));
  });`,
  fizzBuzz: `
  int n; judge::from(a[0], n);
  return judge::repeatTrials([&] {
    FizzBuzz fb(n); judge::Sink out;
    judge::runThreads({
      [&] { fb.number([&](int x) { out.add(to_string(x)); }); }, [&] { fb.fizzbuzz([&] { out.add("fizzbuzz"); }); },
      [&] { fb.buzz([&] { out.add("buzz"); }); }, [&] { fb.fizz([&] { out.add("fizz"); }); }});
    return judge::J(out.items);
  });`,
  diningPhilosophers: `
  int n; judge::from(a[0], n);
  return judge::repeatTrials([&] {
    DiningPhilosophers dp; atomic<int> forks[5]; atomic<int> meals[5];
    for (int p = 0; p < 5; p++) { forks[p] = -1; meals[p] = 0; }
    vector<function<void()>> tasks;
    for (int p = 0; p < 5; p++) {
      tasks.push_back([&, p] {
        int left = p, right = (p + 1) % 5;
        auto pick = [&, p](int fork) { int expected = -1; if (!forks[fork].compare_exchange_strong(expected, p)) throw runtime_error("Philosopher " + to_string(p) + " picked up fork " + to_string(fork) + " while philosopher " + to_string(expected) + " held it"); };
        auto put = [&, p](int fork) { int expected = p; if (!forks[fork].compare_exchange_strong(expected, -1)) throw runtime_error("Philosopher " + to_string(p) + " put down fork " + to_string(fork) + " without holding it"); };
        for (int i = 0; i < n; i++) {
          dp.wantsToEat(p, [&] { pick(left); }, [&] { pick(right); },
            [&] { if (forks[left] != p || forks[right] != p) throw runtime_error("Philosopher " + to_string(p) + " ate without holding both forks"); meals[p]++; },
            [&] { put(left); }, [&] { put(right); });
        }
      });
    }
    judge::runThreads(tasks);
    vector<int> result; for (int p = 0; p < 5; p++) result.push_back(meals[p]);
    return judge::J(result);
  });`,
};

export function cppConcurrencyBody(spec: FunctionSpec) {
  return `static string judgeRunCase(const JV& a) {${CPP_DRIVERS[spec.concurrency!.driver]}
}`;
}

/* ---------------------------------------------------------------- Go */

/** Always part of the Go harness so its imports are used in every program. */
export const GO_CONCURRENCY_SUPPORT = String.raw`
// judgeRunTasks starts each task on its own goroutine and waits for all of them.
func judgeRunTasks(tasks ...func()) {
	var wg sync.WaitGroup
	var mu sync.Mutex
	var failure any
	for _, task := range tasks {
		wg.Add(1)
		delay := time.Duration(rand.Intn(3)) * time.Millisecond
		go func(task func()) {
			defer wg.Done()
			defer func() {
				if r := recover(); r != nil {
					mu.Lock()
					if failure == nil {
						failure = r
					}
					mu.Unlock()
				}
			}()
			time.Sleep(delay)
			task()
		}(task)
	}
	done := make(chan struct{})
	go func() { wg.Wait(); close(done) }()
	select {
	case <-done:
	case <-time.After(${THREAD_TIMEOUT_MS} * time.Millisecond):
		panic(${JSON.stringify(TIMEOUT_MESSAGE)})
	}
	if failure != nil {
		panic(failure)
	}
}

func judgeRepeat(trial func() any) any {
	first := trial()
	firstJSON, _ := json.Marshal(first)
	for i := 1; i < ${REPEATS}; i++ {
		next := trial()
		nextJSON, _ := json.Marshal(next)
		if string(nextJSON) != string(firstJSON) {
			return next
		}
	}
	return first
}

type judgeSink struct {
	mu    sync.Mutex
	text  strings.Builder
	items []string
}

func (s *judgeSink) add(v string) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.text.WriteString(v)
	s.items = append(s.items, v)
}
`;

const GO_DRIVERS: Record<ConcurrencyDriver, string> = {
  printInOrder: `
	var order []int
	dec(a[0], &order)
	return judgeRepeat(func() any {
		foo := NewFoo()
		out := &judgeSink{}
		var tasks []func()
		for _, k := range order {
			switch k {
			case 1:
				tasks = append(tasks, func() { foo.First(func() { out.add("first") }) })
			case 2:
				tasks = append(tasks, func() { foo.Second(func() { out.add("second") }) })
			default:
				tasks = append(tasks, func() { foo.Third(func() { out.add("third") }) })
			}
		}
		judgeRunTasks(tasks...)
		return out.text.String()
	})`,
  fooBar: `
	var n int
	dec(a[0], &n)
	return judgeRepeat(func() any {
		fb := NewFooBar(n)
		out := &judgeSink{}
		judgeRunTasks(func() { fb.Bar(func() { out.add("bar") }) }, func() { fb.Foo(func() { out.add("foo") }) })
		return out.text.String()
	})`,
  zeroEvenOdd: `
	var n int
	dec(a[0], &n)
	return judgeRepeat(func() any {
		z := NewZeroEvenOdd(n)
		out := &judgeSink{}
		print := func(x int) { out.add(fmt.Sprint(x)) }
		judgeRunTasks(func() { z.Odd(print) }, func() { z.Even(print) }, func() { z.Zero(print) })
		return out.text.String()
	})`,
  h2o: `
	var water string
	dec(a[0], &water)
	return judgeRepeat(func() any {
		h := NewH2O()
		out := &judgeSink{}
		var tasks []func()
		for _, c := range water {
			if c == 'H' {
				tasks = append(tasks, func() { h.Hydrogen(func() { out.add("H") }) })
			} else {
				tasks = append(tasks, func() { h.Oxygen(func() { out.add("O") }) })
			}
		}
		judgeRunTasks(tasks...)
		s := out.text.String()
		for k := 0; k+3 <= len(s); k += 3 {
			if strings.Count(s[k:k+3], "H") != 2 {
				panic(fmt.Sprintf("Molecule %d was released as %s; every group of three must be two H and one O", k/3+1, s[k:k+3]))
			}
		}
		if len(s) != len(water) {
			panic(fmt.Sprintf("Released %d atoms instead of %d", len(s), len(water)))
		}
		return len(s) / 3
	})`,
  fizzBuzz: `
	var n int
	dec(a[0], &n)
	return judgeRepeat(func() any {
		fb := NewFizzBuzz(n)
		out := &judgeSink{}
		judgeRunTasks(
			func() { fb.Number(func(x int) { out.add(fmt.Sprint(x)) }) }, func() { fb.Fizzbuzz(func() { out.add("fizzbuzz") }) },
			func() { fb.Buzz(func() { out.add("buzz") }) }, func() { fb.Fizz(func() { out.add("fizz") }) })
		return append([]string{}, out.items...)
	})`,
  diningPhilosophers: `
	var n int
	dec(a[0], &n)
	return judgeRepeat(func() any {
		dp := NewDiningPhilosophers()
		var mu sync.Mutex
		forks := []int{-1, -1, -1, -1, -1}
		meals := make([]int, 5)
		var tasks []func()
		for p := 0; p < 5; p++ {
			p, left, right := p, p, (p+1)%5
			pick := func(fork int) {
				mu.Lock()
				defer mu.Unlock()
				if forks[fork] != -1 {
					panic(fmt.Sprintf("Philosopher %d picked up fork %d while philosopher %d held it", p, fork, forks[fork]))
				}
				forks[fork] = p
			}
			put := func(fork int) {
				mu.Lock()
				defer mu.Unlock()
				if forks[fork] != p {
					panic(fmt.Sprintf("Philosopher %d put down fork %d without holding it", p, fork))
				}
				forks[fork] = -1
			}
			eat := func() {
				mu.Lock()
				defer mu.Unlock()
				if forks[left] != p || forks[right] != p {
					panic(fmt.Sprintf("Philosopher %d ate without holding both forks", p))
				}
				meals[p]++
			}
			tasks = append(tasks, func() {
				for i := 0; i < n; i++ {
					dp.WantsToEat(p, func() { pick(left) }, func() { pick(right) }, eat, func() { put(left) }, func() { put(right) })
				}
			})
		}
		judgeRunTasks(tasks...)
		return append([]int{}, meals...)
	})`,
};

export function goConcurrencyBody(spec: FunctionSpec) {
  return `func judgeRunCase(input json.RawMessage) any {
	var a []json.RawMessage
	dec(input, &a)${GO_DRIVERS[spec.concurrency!.driver]}
}`;
}

/* ---------------------------------------------------------------- starters */

interface MethodSig {
  name: string;
  /** Callback parameters: name and whether it takes an int. */
  callbacks: { name: string; int?: boolean }[];
  /** Leading int parameter, for the dining philosophers. */
  intParam?: string;
}

interface ClassSig {
  className: string;
  ctorParam?: string;
  methods: MethodSig[];
}

const SIGNATURES: Record<ConcurrencyDriver, ClassSig> = {
  printInOrder: { className: "Foo", methods: ["first", "second", "third"].map((m) => ({ name: m, callbacks: [{ name: `print${m[0].toUpperCase()}${m.slice(1)}` }] })) },
  fooBar: { className: "FooBar", ctorParam: "n", methods: [{ name: "foo", callbacks: [{ name: "printFoo" }] }, { name: "bar", callbacks: [{ name: "printBar" }] }] },
  zeroEvenOdd: { className: "ZeroEvenOdd", ctorParam: "n", methods: ["zero", "even", "odd"].map((m) => ({ name: m, callbacks: [{ name: "printNumber", int: true }] })) },
  h2o: { className: "H2O", methods: [{ name: "hydrogen", callbacks: [{ name: "releaseHydrogen" }] }, { name: "oxygen", callbacks: [{ name: "releaseOxygen" }] }] },
  fizzBuzz: {
    className: "FizzBuzz",
    ctorParam: "n",
    methods: [
      { name: "fizz", callbacks: [{ name: "printFizz" }] },
      { name: "buzz", callbacks: [{ name: "printBuzz" }] },
      { name: "fizzbuzz", callbacks: [{ name: "printFizzBuzz" }] },
      { name: "number", callbacks: [{ name: "printNumber", int: true }] },
    ],
  },
  diningPhilosophers: {
    className: "DiningPhilosophers",
    methods: [{
      name: "wantsToEat",
      intParam: "philosopher",
      callbacks: ["pickLeftFork", "pickRightFork", "eat", "putLeftFork", "putRightFork"].map((name) => ({ name })),
    }],
  },
};

const capital = (s: string) => s[0].toUpperCase() + s.slice(1);

export function concurrencyStarter(spec: FunctionSpec, lang: CodeLang): string {
  const sig = SIGNATURES[spec.concurrency!.driver];
  const { className, ctorParam } = sig;
  if (lang === "java") {
    const fields = ctorParam ? `    private int ${ctorParam};\n\n` : "";
    const ctor = `    public ${className}(${ctorParam ? `int ${ctorParam}` : ""}) {\n        ${ctorParam ? `this.${ctorParam} = ${ctorParam};` : ""}\n    }`;
    const methods = sig.methods.map((m) => {
      const params = [...(m.intParam ? [`int ${m.intParam}`] : []), ...m.callbacks.map((c) => `${c.int ? "IntConsumer" : "Runnable"} ${c.name}`)];
      return `    public void ${m.name}(${params.join(", ")}) throws InterruptedException {\n        \n    }`;
    });
    return `class ${className} {\n${fields}${[ctor, ...methods].join("\n\n")}\n}\n`;
  }
  if (lang === "cpp") {
    const ctor = `    ${className}(${ctorParam ? `int ${ctorParam}` : ""})${ctorParam ? ` : ${ctorParam}(${ctorParam})` : ""} {\n        \n    }`;
    const methods = sig.methods.map((m) => {
      const params = [...(m.intParam ? [`int ${m.intParam}`] : []), ...m.callbacks.map((c) => `function<void(${c.int ? "int" : ""})> ${c.name}`)];
      return `    void ${m.name}(${params.join(", ")}) {\n        \n    }`;
    });
    const fields = ctorParam ? `private:\n    int ${ctorParam};\n\n` : "";
    return `class ${className} {\n${fields}public:\n${[ctor, ...methods].join("\n\n")}\n};\n`;
  }
  if (lang === "go") {
    const fields = ctorParam ? `    ${ctorParam} int\n` : "    \n";
    const ctor = `func New${className}(${ctorParam ? `${ctorParam} int` : ""}) *${className} {\n    return &${className}{${ctorParam ? `${ctorParam}: ${ctorParam}` : ""}}\n}`;
    const methods = sig.methods.map((m) => {
      const params = [...(m.intParam ? [`${m.intParam} int`] : []), ...m.callbacks.map((c) => `${c.name} func(${c.int ? "int" : ""})`)];
      return `func (this *${className}) ${capital(m.name)}(${params.join(", ")}) {\n    \n}`;
    });
    return `type ${className} struct {\n${fields}}\n\n${[ctor, ...methods].join("\n\n")}\n`;
  }
  throw new Error(`Concurrency problems are not available in ${lang}`);
}
