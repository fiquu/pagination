# @fiquu/pagination

[![Build Status](https://travis-ci.org/fiquu/pagination.svg?branch=master)](https://travis-ci.org/fiquu/pagination)
![GitHub](https://img.shields.io/github/license/fiquu/pagination)
![GitHub last commit](https://img.shields.io/github/last-commit/fiquu/pagination)
![npm (scoped)](https://img.shields.io/npm/v/@fiquu/pagination)
![npm](https://img.shields.io/npm/dw/@fiquu/pagination)

Simple pagination component.

## Installation

```sh
npm i @fiquu/pagination
```

## Usage
```ts
import { createPagination, PaginationComponent } from '@fiquu/pagination';

const pagination: PaginationComponent = createPagination({ limit: 50 });

const { limit, skip } = pagination.paginate(3); // limit = 50; skip = 100;

// Or in some query...
const query = await Posts.find()
  .skip(pagination.skip(req.query.page))
  .limit(pagination.limit);
```

## Documentation

Please see https://fiquu.github.io/pagination/ for more details.
