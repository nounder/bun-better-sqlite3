import { Database as BunDatabase } from "bun:sqlite"

interface DatabaseOptions {
  readonly?: boolean
  timeout?: number
  verbose?: (sql: string) => void
}

interface RunResult {
  changes: number
  lastInsertRowid: number
}

class Statement {
  private stmt: any
  private verbose?: (sql: string) => void
  private boundParams?: any[]

  constructor(stmt: any, verbose?: (sql: string) => void, boundParams?: any[]) {
    this.stmt = stmt
    this.verbose = verbose
    this.boundParams = boundParams
  }

  run(...params: any[]): RunResult {
    if (this.verbose) {
      this.verbose(this.stmt.toString())
    }
    const finalParams = this.boundParams || params
    const result = this.stmt.run(...finalParams)
    return {
      changes: result.changes,
      lastInsertRowid: result.lastInsertRowid,
    }
  }

  get(...params: any[]): any {
    if (this.verbose) {
      this.verbose(this.stmt.toString())
    }
    const finalParams = this.boundParams || params
    return this.stmt.get(...finalParams)
  }

  all(...params: any[]): any[] {
    if (this.verbose) {
      this.verbose(this.stmt.toString())
    }
    const finalParams = this.boundParams || params
    return this.stmt.all(...finalParams)
  }

  *iterate(...params: any[]): IterableIterator<any> {
    if (this.verbose) {
      this.verbose(this.stmt.toString())
    }
    const finalParams = this.boundParams || params
    const results = this.stmt.all(...finalParams)
    for (const row of results) {
      yield row
    }
  }

  bind(...params: any[]): Statement {
    return new Statement(this.stmt, this.verbose, params)
  }
}

class Database {
  private db: BunDatabase
  private verbose?: (sql: string) => void

  constructor(path: string, options: DatabaseOptions = {}) {
    this.db = new BunDatabase(path, {
      readwrite: !options.readonly,
      readonly: options.readonly,
      timeout: options.timeout,
    })
    this.verbose = options.verbose
  }

  prepare(sql: string): Statement {
    const stmt = this.db.prepare(sql)
    return new Statement(stmt, this.verbose)
  }

  exec(sql: string): this {
    if (this.verbose) {
      this.verbose(sql)
    }
    this.db.exec(sql)
    return this
  }

  close(): this {
    this.db.close()
    return this
  }

  transaction<T extends (...args: any[]) => any>(fn: T): T {
    return this.db.transaction(fn)
  }
}

export default Database
export {
  Database,
}
