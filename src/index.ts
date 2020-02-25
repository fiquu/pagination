/**
 * Pagination Component module.
 *
 * @module pagination
 */

export type PaginationConfig = {
  /**
   * The limit per page.
   */
  limit: number;
}

export interface PaginationPaging extends PaginationConfig {
  /**
   * The number of items to skip.
   */
  skip: number;
}

export interface PaginationComponent extends PaginationConfig {
  /**
   * Calculates the skip count for the provided page and current limit.
   *
   * @param {number} page The page number to skip to.
   *
   * @returns {number} The skip count.
   */
  skip(page: number): number;

  /**
   * Computes the pagination object.
   *
   * @param {number} page The page number to paginate for.
   *
   * @returns {object} The pagination object.
   */
  paginate(page: number): PaginationPaging;
}

/**
 * Calculates the `skip` value according to the provided page number.
 *
 * @param {number} limit The limit to use.
 * @param {number} page The page to calculate the skip value for.
 *
 * @returns {number} The skip count.
 */
function skip(limit: number, page: number): number {
  const value = Math.max(Math.trunc(page), 1);

  return limit * (Math.max(value, 1) - 1);
}

/**
 * Calculates pagination parameters.
 *
 * @param {number} limit The limit to use.
 * @param {number} page The page number to paginate.
 *
 * @returns {object} The calculated pagination parameters.
 */
function paginate(limit: number, page: number): PaginationPaging {
  return Object.freeze<PaginationPaging>({
    skip: skip(limit, page),
    limit
  });
}

/**
 * Pagination Component factory.
 *
 * @param {object} config The configuration object.
 *
 * @returns {object} The component instance.
 */
export function createPagination({ limit }: PaginationConfig): PaginationComponent {
  const _limit = Math.trunc(limit);

  return Object.freeze<PaginationComponent>({
    paginate: paginate.bind(null, _limit),
    skip: skip.bind(null, _limit),
    limit: _limit
  });
}
