# Change Log

## 11.0.0-6-next.7

### Major Changes

- 794af76c: Remove Node 12 support

  - We need move to the new `undici` and does not support Node.js 12

### Minor Changes

- 154b2ecd: refactor: remove @verdaccio/commons-api in favor @verdaccio/core and remove duplications

### Patch Changes

- Updated dependencies [794af76c]
- Updated dependencies [154b2ecd]
  - @verdaccio/core@6.0.0-6-next.2
  - @verdaccio/streams@11.0.0-6-next.5

## 11.0.0-6-next.6

### Major Changes

- 459b6fa7: refactor: search v1 endpoint and local-database

  - refactor search `api v1` endpoint, improve performance
  - remove usage of `async` dependency https://github.com/verdaccio/verdaccio/issues/1225
  - refactor method storage class
  - create new module `core` to reduce the ammount of modules with utilities
  - use `undici` instead `node-fetch`
  - use `fastify` instead `express` for functional test

  ### Breaking changes

  - plugin storage API changes
  - remove old search endpoint (return 404)
  - filter local private packages at plugin level

  The storage api changes for methods `get`, `add`, `remove` as promise base. The `search` methods also changes and recieves a `query` object that contains all query params from the client.

  ```ts
  export interface IPluginStorage<T> extends IPlugin {
    add(name: string): Promise<void>;
    remove(name: string): Promise<void>;
    get(): Promise<any>;
    init(): Promise<void>;
    getSecret(): Promise<string>;
    setSecret(secret: string): Promise<any>;
    getPackageStorage(packageInfo: string): IPackageStorage;
    search(query: searchUtils.SearchQuery): Promise<searchUtils.SearchItem[]>;
    saveToken(token: Token): Promise<any>;
    deleteToken(user: string, tokenKey: string): Promise<any>;
    readTokens(filter: TokenFilter): Promise<Token[]>;
  }
  ```

### Patch Changes

- Updated dependencies [459b6fa7]
  - @verdaccio/commons-api@11.0.0-6-next.4
  - @verdaccio/streams@11.0.0-6-next.4

## 11.0.0-6-next.5

### Patch Changes

- 6b1a28de: Fix the prefix used to delete from s3 when unpublishing packages

## 11.0.0-6-next.4

### Major Changes

- cb2281a5: # async storage plugin bootstrap

  Gives a storage plugin the ability to perform asynchronous tasks on initialization

  ## Breaking change

  Plugin must have an init method in which asynchronous tasks can be executed

  ```js
  public async init(): Promise<void> {
     this.data = await this._fetchLocalPackages();
     this._sync();
  }
  ```

## 10.0.0-alpha.3

### Patch Changes

- fecbb9be: chore: add release step to private regisry on merge changeset pr
- Updated dependencies [fecbb9be]
  - @verdaccio/commons-api@10.0.0-alpha.3
  - @verdaccio/streams@10.0.0-alpha.3

## 10.0.0-alpha.2

### Minor Changes

- 54c58d1e: feat: add server rate limit protection to all request

  To modify custom values, use the server settings property.

  ```markdown
  server:

  ## https://www.npmjs.com/package/express-rate-limit#configuration-options

  rateLimit:
  windowMs: 1000
  max: 10000
  ```

  The values are intended to be high, if you want to improve security of your server consider
  using different values.

### Patch Changes

- Updated dependencies [54c58d1e]
  - @verdaccio/commons-api@10.0.0-alpha.2
  - @verdaccio/streams@10.0.0-alpha.2

## 10.0.0-alpha.1

### Major Changes

- d87fa026: feat!: experiments config renamed to flags

  - The `experiments` configuration is renamed to `flags`. The functionality is exactly the same.

  ```js
  flags: token: false;
  search: false;
  ```

  - The `self_path` property from the config file is being removed in favor of `config_file` full path.
  - Refactor `config` module, better types and utilities

### Patch Changes

- Updated dependencies [d87fa026]
- Updated dependencies [da1ee9c8]
- Updated dependencies [26b494cb]
- Updated dependencies [b57b4338]
- Updated dependencies [31af0164]
  - @verdaccio/commons-api@10.0.0-alpha.1
  - @verdaccio/streams@10.0.0-alpha.1

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [9.7.2](https://github.com/verdaccio/monorepo/compare/v9.7.1...v9.7.2) (2020-07-20)

**Note:** Version bump only for package verdaccio-aws-s3-storage

## [9.7.1](https://github.com/verdaccio/monorepo/compare/v9.7.0...v9.7.1) (2020-07-10)

**Note:** Version bump only for package verdaccio-aws-s3-storage

# [9.7.0](https://github.com/verdaccio/monorepo/compare/v9.6.1...v9.7.0) (2020-06-24)

**Note:** Version bump only for package verdaccio-aws-s3-storage

## [9.6.1](https://github.com/verdaccio/monorepo/compare/v9.6.0...v9.6.1) (2020-06-07)

**Note:** Version bump only for package verdaccio-aws-s3-storage

# [9.6.0](https://github.com/verdaccio/monorepo/compare/v9.5.1...v9.6.0) (2020-06-07)

### Features

- allow providing session token in config ([#362](https://github.com/verdaccio/monorepo/issues/362)) ([acef36f](https://github.com/verdaccio/monorepo/commit/acef36f99c9028742bf417ee9879ed80bfbb7a8d))

# [9.5.0](https://github.com/verdaccio/monorepo/compare/v9.4.1...v9.5.0) (2020-05-02)

**Note:** Version bump only for package verdaccio-aws-s3-storage

# [9.4.0](https://github.com/verdaccio/monorepo/compare/v9.3.4...v9.4.0) (2020-03-21)

**Note:** Version bump only for package verdaccio-aws-s3-storage

## [9.3.2](https://github.com/verdaccio/monorepo/compare/v9.3.1...v9.3.2) (2020-03-08)

### Bug Fixes

- update dependencies ([#332](https://github.com/verdaccio/monorepo/issues/332)) ([b6165ae](https://github.com/verdaccio/monorepo/commit/b6165aea9b7e4012477081eae68bfa7159c58f56))

## [9.3.1](https://github.com/verdaccio/monorepo/compare/v9.3.0...v9.3.1) (2020-02-23)

**Note:** Version bump only for package verdaccio-aws-s3-storage

# [9.3.0](https://github.com/verdaccio/monorepo/compare/v9.2.0...v9.3.0) (2020-01-29)

**Note:** Version bump only for package verdaccio-aws-s3-storage

# [9.2.0](https://github.com/verdaccio/monorepo/compare/v9.1.0...v9.2.0) (2020-01-28)

### Features

- **verdaccio-aws-s3-storage:** Allow endpoint to be configurable ([#319](https://github.com/verdaccio/monorepo/issues/319)) ([1191dcd](https://github.com/verdaccio/monorepo/commit/1191dcd829b7d9f2dd0b4fab4910f4dc9d697565))

# [9.1.0](https://github.com/verdaccio/monorepo/compare/v9.0.0...v9.1.0) (2020-01-25)

### Features

- **verdaccio-aws-s3-storage:** separate s3 subfolders (key prefix for different packages) ([#313](https://github.com/verdaccio/monorepo/issues/313)) ([6639a71](https://github.com/verdaccio/monorepo/commit/6639a71c2d2056f93e913c71e27b4453acb029aa))
- **verdaccio-aws-s3-storage:** supporting environment variables ([#315](https://github.com/verdaccio/monorepo/issues/315)) ([0c532f0](https://github.com/verdaccio/monorepo/commit/0c532f0198aba786a3292e866e7a2d933a06d2fa))

# [9.0.0](https://github.com/verdaccio/monorepo/compare/v8.5.3...v9.0.0) (2020-01-07)

### chore

- update dependencies ([68add74](https://github.com/verdaccio/monorepo/commit/68add743159867f678ddb9168d2bc8391844de47))

### Features

- **eslint-config:** enable eslint curly ([#308](https://github.com/verdaccio/monorepo/issues/308)) ([91acb12](https://github.com/verdaccio/monorepo/commit/91acb121847018e737c21b367fcaab8baa918347))

### BREAKING CHANGES

- @verdaccio/eslint-config requires ESLint >=6.8.0 and Prettier >=1.19.1 to fix compatibility with overrides.extends config

## [8.5.3](https://github.com/verdaccio/monorepo/compare/v8.5.2...v8.5.3) (2019-12-27)

### Bug Fixes

- verdaccio/verdaccio/issues/1435 ([#289](https://github.com/verdaccio/monorepo/issues/289)) ([7a130ca](https://github.com/verdaccio/monorepo/commit/7a130ca0281ac2a008091753341baae4f17fb71a)), closes [/github.com/verdaccio/verdaccio/issues/1435#issuecomment-559977118](https://github.com//github.com/verdaccio/verdaccio/issues/1435/issues/issuecomment-559977118)

## [8.5.2](https://github.com/verdaccio/monorepo/compare/v8.5.1...v8.5.2) (2019-12-25)

### Bug Fixes

- add types for storage handler ([#307](https://github.com/verdaccio/monorepo/issues/307)) ([c35746e](https://github.com/verdaccio/monorepo/commit/c35746ebba071900db172608dedff66a7d27c23d))

## [8.5.1](https://github.com/verdaccio/monorepo/compare/v8.5.0...v8.5.1) (2019-12-24)

**Note:** Version bump only for package verdaccio-aws-s3-storage

# [8.5.0](https://github.com/verdaccio/monorepo/compare/v8.4.2...v8.5.0) (2019-12-22)

**Note:** Version bump only for package verdaccio-aws-s3-storage

## [8.4.2](https://github.com/verdaccio/monorepo/compare/v8.4.1...v8.4.2) (2019-11-23)

**Note:** Version bump only for package verdaccio-aws-s3-storage

## [8.4.1](https://github.com/verdaccio/monorepo/compare/v8.4.0...v8.4.1) (2019-11-22)

**Note:** Version bump only for package verdaccio-aws-s3-storage

# [8.4.0](https://github.com/verdaccio/monorepo/compare/v8.3.0...v8.4.0) (2019-11-22)

**Note:** Version bump only for package verdaccio-aws-s3-storage

# [8.3.0](https://github.com/verdaccio/monorepo/compare/v8.2.0...v8.3.0) (2019-10-27)

**Note:** Version bump only for package verdaccio-aws-s3-storage

# [8.2.0](https://github.com/verdaccio/monorepo/compare/v8.2.0-next.0...v8.2.0) (2019-10-23)

**Note:** Version bump only for package verdaccio-aws-s3-storage

# [8.2.0-next.0](https://github.com/verdaccio/monorepo/compare/v8.1.4...v8.2.0-next.0) (2019-10-08)

### Bug Fixes

- fixed lint errors ([5e677f7](https://github.com/verdaccio/monorepo/commit/5e677f7))

## [8.1.2](https://github.com/verdaccio/monorepo/compare/v8.1.1...v8.1.2) (2019-09-29)

**Note:** Version bump only for package verdaccio-aws-s3-storage

## [8.1.1](https://github.com/verdaccio/monorepo/compare/v8.1.0...v8.1.1) (2019-09-26)

**Note:** Version bump only for package verdaccio-aws-s3-storage

# [8.1.0](https://github.com/verdaccio/monorepo/compare/v8.0.1-next.1...v8.1.0) (2019-09-07)

### Features

- **verdaccio-aws-s3-storage:** update @verdaccio/types and add new required methods ([f39b7a2](https://github.com/verdaccio/monorepo/commit/f39b7a2))

## [8.0.1-next.1](https://github.com/verdaccio/monorepo/compare/v8.0.1-next.0...v8.0.1-next.1) (2019-08-29)

**Note:** Version bump only for package verdaccio-aws-s3-storage

## [8.0.1-next.0](https://github.com/verdaccio/monorepo/compare/v8.0.0...v8.0.1-next.0) (2019-08-29)

### Bug Fixes

- **package:** update aws-sdk to version 2.516.0 ([82f7117](https://github.com/verdaccio/monorepo/commit/82f7117))
- **package:** update aws-sdk to version 2.517.0 ([39183eb](https://github.com/verdaccio/monorepo/commit/39183eb))
- **package:** update aws-sdk to version 2.518.0 ([c4f18a6](https://github.com/verdaccio/monorepo/commit/c4f18a6))

# [8.0.0](https://github.com/verdaccio/verdaccio-aws-s3-storage/compare/v8.0.0-next.4...v8.0.0) (2019-08-22)

### Bug Fixes

- **package:** update aws-sdk to version 2.514.0 ([16860e6](https://github.com/verdaccio/verdaccio-aws-s3-storage/commit/16860e6))
- **package:** update aws-sdk to version 2.515.0 ([eed8547](https://github.com/verdaccio/verdaccio-aws-s3-storage/commit/eed8547))

# [8.0.0-next.4](https://github.com/verdaccio/verdaccio-aws-s3-storage/compare/v8.0.0-next.3...v8.0.0-next.4) (2019-08-18)

**Note:** Version bump only for package verdaccio-aws-s3-storage

# [8.0.0-next.2](https://github.com/verdaccio/verdaccio-aws-s3-storage/compare/v8.0.0-next.1...v8.0.0-next.2) (2019-08-03)

**Note:** Version bump only for package verdaccio-aws-s3-storage

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.1.2](https://github.com/verdaccio/verdaccio-aws-s3-storage/compare/v0.1.1...v0.1.2) (2019-07-15)

### Build System

- update dependencies @verdaccio/commons-api ([151e4df](https://github.com/verdaccio/verdaccio-aws-s3-storage/commit/151e4df))

### [0.1.1](https://github.com/verdaccio/verdaccio-aws-s3-storage/compare/v0.1.0...v0.1.1) (2019-07-12)

### Build System

- update dependencies ([7a7c3b7](https://github.com/verdaccio/verdaccio-aws-s3-storage/commit/7a7c3b7))

## 0.1.0 (2019-06-25)

### Features

- add aws s3 plugin in typescrip ([2e4df1d](https://github.com/verdaccio/verdaccio-aws-s3-storage/commit/2e4df1d))
- add logging ([#5](https://github.com/verdaccio/verdaccio-aws-s3-storage/issues/5)) ([16b9e0f](https://github.com/verdaccio/verdaccio-aws-s3-storage/commit/16b9e0f))
