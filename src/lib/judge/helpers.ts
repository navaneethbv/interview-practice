import type { ProblemSpec } from "./types";

export function usesCollectionHelpers(spec: ProblemSpec): boolean {
  if (spec.kind === "sql") return false;
  const params = spec.kind === "design" ? [...spec.ctorParams, ...spec.methods.flatMap((m) => m.params)] : spec.params;
  return params.some((p) => ["IntIterator", "List<Employee>", "HtmlParser"].includes(p.type));
}

/** Deterministic local stand-ins for the collection and crawl interfaces. */
export const PYTHON_COLLECTION_HELPERS = `
class Iterator:
    def __init__(self, values):
        self.__values = tuple(values)
        self.__position = 0
    def hasNext(self):
        return self.__position < len(self.__values)
    def next(self):
        if not self.hasNext():
            raise StopIteration("Iterator is exhausted")
        value = self.__values[self.__position]
        self.__position += 1
        return value
    def __iter__(self):
        return self
    def __next__(self):
        return self.next()

class Employee:
    def __init__(self, id, importance, subordinates):
        self.id = id
        self.importance = importance
        self.subordinates = list(subordinates)

class HtmlParser:
    def __init__(self, fixture):
        urls = fixture["urls"]
        pages = {url: [] for url in urls}
        for source, target in fixture["edges"]:
            pages[urls[source]].append(urls[target])
        self.__pages = {url: tuple(links) for url, links in pages.items()}
    def getUrls(self, url):
        return list(self.__pages.get(url, ()))
`;

export const JAVA_COLLECTION_HELPERS = `
class Employee {
  public int id;
  public int importance;
  public List<Integer> subordinates;
  public Employee(int id, int importance, List<Integer> subordinates) {
    this.id = id;
    this.importance = importance;
    this.subordinates = new ArrayList<>(subordinates);
  }
}

interface HtmlParser {
  List<String> getUrls(String url);
}

final class CollectionSupport {
  static Iterator<Integer> iterator(Object value) {
    return J.toIntList(value).iterator();
  }
  static List<Employee> employees(Object value) {
    List<Employee> employees = new ArrayList<>();
    for (Object raw : J.L(value)) {
      List<Object> row = J.L(raw);
      employees.add(new Employee(J.toInt(row.get(0)), J.toInt(row.get(1)), J.toIntList(row.get(2))));
    }
    return employees;
  }
  static HtmlParser parser(Object value) {
    Map<?, ?> fixture = (Map<?, ?>) value;
    List<String> urls = J.toStrList(fixture.get("urls"));
    Map<String, List<String>> mutable = new HashMap<>();
    for (String url : urls) mutable.put(url, new ArrayList<>());
    for (Object raw : J.L(fixture.get("edges"))) {
      List<Object> edge = J.L(raw);
      mutable.get(urls.get(J.toInt(edge.get(0)))).add(urls.get(J.toInt(edge.get(1))));
    }
    Map<String, List<String>> pages = new HashMap<>();
    mutable.forEach((url, links) -> pages.put(url, List.copyOf(links)));
    Map<String, List<String>> immutable = Map.copyOf(pages);
    return url -> new ArrayList<>(immutable.getOrDefault(url, Collections.emptyList()));
  }
}
`;
