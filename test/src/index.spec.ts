import { expect } from 'chai';
import faker from 'faker';

import { createPagination, PaginationComponent } from '../../src';

describe('Pagination', function () {
  let pagination: PaginationComponent;

  const config = {
    limit: 30
  };

  it('should be a function', function () {
    expect(createPagination).to.be.a('function');
  });

  it('should not configure without a config', function () {
    expect(() => createPagination(undefined)).to.throw();
  });

  it('should not configure with a null config', function () {
    expect(() => createPagination(null)).to.throw();
  });

  it('should configure with a valid config', function () {
    expect(() => { pagination = createPagination(config); }).to.not.throw();
    expect(pagination.limit).to.equal(30);
  });

  it('should handle negative pages', function () {
    const skip = pagination.skip(-1);

    expect(skip).to.equal(0);
  });

  it('should handle float pages', function () {
    const skip = pagination.skip(1.5);

    expect(skip).to.equal(0);
  });

  it('should not skip items on page 0', function () {
    const skip = pagination.skip(0);

    expect(skip).to.equal(0);
  });

  it('should not skip items on first page', function () {
    const skip = pagination.skip(1);

    expect(skip).to.equal(0);
  });

  it('should skip a total of `limit` items on the second page', function () {
    const skip = pagination.skip(2);

    expect(skip).to.equal(pagination.limit);
  });

  it('should skip a total of `limit * (page - 1)` items on each page', function () {
    for (let i = 0, l = 1000; i < l; ++i) {
      const page = faker.random.number({ min: 1, max: 1000 });
      const skip = pagination.skip(page);

      expect(skip).to.equal(pagination.limit * (page - 1));
    }
  });

  it('should paginate page a page', function () {
    const { limit, skip } = pagination.paginate(3);

    expect(limit).to.equal(pagination.limit);
    expect(skip).to.equal(limit * 2);
  });

  it('should paginate each page', function () {
    for (let i = 0, l = 10000; i < l; ++i) { // Run 10.000 iterations
      const page = faker.random.number({ min: 1, max: 10000 });
      const { limit, skip } = pagination.paginate(page);

      expect(skip).to.equal(pagination.limit * (page - 1));
      expect(limit).to.equal(pagination.limit);
    }
  });
});
