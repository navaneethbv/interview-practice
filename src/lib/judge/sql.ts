import { RESULT_MARKER, type AnyTestCase, type SqlSpec } from "./types";

/** The same sqlite3 program runs locally and in Pyodide. Each test gets a fresh database. */
export function buildSqlProgram(spec: SqlSpec, query: string, tests: AnyTestCase[]) {
  const data = JSON.stringify({ spec, query, tests, marker: RESULT_MARKER });
  const runner = `
import sqlite3, json, time
_data = json.loads(${JSON.stringify(data)})
def _identifier(name):
    return '"' + name.replace('"', '""') + '"'
for _i, _test in enumerate(_data['tests']):
    _db = sqlite3.connect(':memory:')
    _start = time.perf_counter()
    try:
        for _table in _data['spec']['tables']:
            _name = _table['name']
            _cols = _table['columns']
            _schema = ', '.join(_identifier(c['name']) + ' ' + c['type'] for c in _cols)
            _db.execute('CREATE TABLE ' + _identifier(_name) + ' (' + _schema + ')')
            _rows = _test['input']['tables'].get(_name, [])
            _db.executemany('INSERT INTO ' + _identifier(_name) + ' VALUES (' + ','.join('?' for _ in _cols) + ')', _rows)
        _db.commit()
        _denied = {sqlite3.SQLITE_ATTACH, sqlite3.SQLITE_DETACH, sqlite3.SQLITE_PRAGMA}
        _db.set_authorizer(lambda action, a, b, db, source: sqlite3.SQLITE_DENY if action in _denied else sqlite3.SQLITE_OK)
        _ticks = [0]
        def _progress():
            _ticks[0] += 1
            return _ticks[0] > 10000
        _db.set_progress_handler(_progress, 1000)
        _cursor = _db.execute(_data['query'], _test['input'].get('params', {}))
        if _data['spec'].get('resultQuery'):
            _cursor = _db.execute(_data['spec']['resultQuery'])
        if _cursor.description is None:
            raise ValueError('The query must return the requested columns')
        _actual = [c[0] for c in _cursor.description]
        _wanted = _data['spec']['resultColumns']
        if len(_actual) != len(_wanted) or set(_actual) != set(_wanted):
            raise ValueError('Expected result columns: ' + ', '.join(_wanted))
        _order = [_actual.index(name) for name in _wanted]
        _rows = _cursor.fetchmany(10001)
        if len(_rows) > 10000:
            raise ValueError('The result exceeds 10000 rows')
        _output = [[row[j] for j in _order] for row in _rows]
        _result = {'i': _i, 'status': 'ok', 'output': _output, 'ms': (time.perf_counter() - _start) * 1000}
    except Exception as _error:
        _result = {'i': _i, 'status': 'error', 'error': str(_error)}
    finally:
        _db.close()
    print(_data['marker'] + json.dumps(_result))
`;
  return { prelude: "", user: "", runner, packages: ["sqlite3"] };
}
