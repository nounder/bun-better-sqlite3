[better-sqlite3](https://github.com/WiseLibs/better-sqlite3) x [bun:sqlite](https://bun.com/docs/api/sqlite) compatibility layer.
It's simple. It's around 100 lines. And it works.

## Installation

```
bun add better-sqlite3@nounder/bun-better-sqlite3
```

OR add directly to `package.json`

```json
{
  "dependencies": {
    "better-sqlite3": "nounder/bun-better-sqlite3"
  }
}
```

## DrizzleKit

It allows you to use `bun:sqlite` with `Drizzle Kit` which, as of 2025-07-30, doesn't support Bun:

```
$ bun --bun drizzle-kit push
No config path provided, using default 'drizzle.config.ts'
Reading config file '/Users/rg/Projects/cosnet/drizzle.config.ts'
Please install either 'better-sqlite3' or '@libsql/client' for Drizzle Kit to connect to SQLite databases
```
