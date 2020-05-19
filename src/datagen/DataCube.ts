import {Row, Measure, Category, ResultRow, Filter} from './types';

/**
 * This cube is conceptually an n-dimensional array of numbers. The cube
 * represents categories and measures. Each category corresponds to a
 * dimension of the cube. Each category has several different values it can
 * take on. Each category value corresponds to a slice of the cube.
 *
 * For example, look at the following two dimensional cube (i.e. a table):
 *
 *       \ Chrome \ Firefox
 * -------+--------+--------
 * USA    |   65   |   78
 * Canada |  101   |   34
 * Mexico |   72   |  156
 *
 * This table has two categories: Country and Browser. Country has three
 * category values: USA, Canada, Mexico, whereas Browser has two: Chrome and
 * Firefox. This cube has only one measure (say, Active Users). So, the table
 * is saying that there were 65 active users from the USA using Chrome.
 * Similarly there were 156 Firefox users from Mexico.
 *
 * The slice represented by USA is the list [65, 78]. The slice represented by
 * Chrome is [65, 101, 72].
 *
 * The cube can support any number of categories, and any number of measures.
 * More categories mean a higher dimensional cube, and more measures means each
 * cell in the cube will be represented by a vector where each element in the
 * vector corresponds to a different measure. Here is a three dimensional
 * (Gender, Source and OS) cube with two measures (Average Visit Duration and
 * Event Count):
 *
 * Male:                              * Female:
 *       \ Windows \   Mac  \  Linux  *       \ Windows \   Mac  \  Linux
 * -------+---------+--------+------- * -------+---------+--------+-------
 * Direct |  5s, 60 | 9s, 23 | 6s, 64 * Direct |  2s, 57 | 6s, 65 | 3s, 34
 * Email  |  7s, 90 | 2s, 98 | 2s, 90 * Email  |  3s, 93 | 4s, 73 | 6s, 72
 * Search |  1s, 32 | 3s, 21 | 4s, 23 * Search |  8s, 86 | 3s, 53 | 5s, 35
 *
 * This cube is saying, for example, that female Linux users coming from
 * Search stayed on the page for an average of 5 seconds.
 *
 * The cube can be queried for specific categories and measures. This
 * will combine together the values for all the other categories and give
 * a breakdown based on the requested categories. For more information, see
 * the documentation for the `getDataFor()` method.
 */
export class DataCube {
  constructor(
    private readonly rows: Row[],
    private readonly measures: Measure[],
    private readonly categories: Category[]
  ) {}

  /**
   * Get a breakdown by the given categories in the given measures.
   *
   * Breaks down the data in the cube by the given categories and returns
   * the given measures in a table. So, for the following cube, with
   * categories Gender, Source and OS and measures Event Count and Sessions:
   *
   * Male:                              * Female:
   *       \ Windows \   Mac  \  Linux  *       \ Windows \   Mac  \  Linux
   * -------+---------+--------+------- * -------+---------+--------+-------
   * Direct |  12, 60 |  1, 23 | 44, 64 * Direct |  50, 57 | 43, 65 | 25, 34
   * Email  |  23, 90 | 51, 98 | 21, 90 * Email  |  39, 93 | 24, 73 | 64, 72
   * Search |  16, 32 | 10, 21 |  9, 23 * Search |  93, 86 | 38, 53 | 31, 35
   *
   * If you get data for the Source category and Sessions measure, the
   * result would be
   *
   * Categories | Measures
   * -----------+------------
   * Source     | Sessions
   * ===========+============
   * Direct     | 303
   * Email      | 516
   * Search     | 250
   *
   * The value of the measure Sessions for the category value "Direct",
   * for example, is calculated by adding the the Sessions values
   * across all the other categories
   * (across the top row: 60 + 23 + 64 + 57 + 65 + 34). Other category
   * values are calculated similarly.
   *
   * The data can be broken down by multiple categories, and multiple
   * measures can be provided. For example, given the same cube as before,
   * with the category names Gender and OS, and measure Event Count, the
   * resulting table will be:
   *
   *    Categories    |  Measures
   * -----------------+------------
   * Gender |   OS    | Event Count
   * =======+=========+============
   * Male   | Windows | 51
   * Male   | Mac     | 62
   * Male   | Linux   | 74
   * Female | Windows | 182
   * Female | Mac     | 105
   * Female | Linux   | 110
   *
   * Special handling is applied to the "nthDay" category. No matter what
   * actual day it corresponds to, the earliest nthDay will always correspond
   * to 0, the second earliest to 1, and so on.
   *
   * This method also supports filtering by category or measure values.
   * Filtering takes place before the counting is done, so it is possible to
   * filter on categories that are not in the query. By default, nothing is
   * filtered.
   *
   * It's also possible to sort the results by any category or measure.
   * By default, the results are sorted by the first requested category, then
   * the second, and so on.
   *
   * @param categoryNames The categories to request a breakdown from.
   * @param measureNames The measures to provide values for.
   * @param filters The filters to apply to the cube before finding the results.
   * @param sortBy The concept names to sort in ascending order.
   */
  getDataFor(
    categoryNames: string[],
    measureNames: string[],
    filters: Filter[] = [],
    sortBy?: string[]
  ): ResultRow[] {
    const measureIndices = measureNames.map(name =>
      this.measures.findIndex(measure => measure.name === name)
    );
    const categoryIndices = categoryNames.map(name =>
      this.categories.findIndex(category => category.name === name)
    );
    const categoryTrie: TrieNode = {children: {}};
    const filterFuncs = filters.map(filter =>
      filter(this.categories, this.measures)
    );
    for (const row of this.rows.filter(row =>
      filterFuncs.every(filter => filter(row))
    )) {
      let trieNode = categoryTrie;
      for (const categoryIndex of categoryIndices) {
        if (!trieNode.children[row.header[categoryIndex]]) {
          trieNode.children[row.header[categoryIndex]] = {children: {}};
        }
        trieNode = trieNode.children[row.header[categoryIndex]];
      }
      if (!trieNode.values) {
        trieNode.values = measureNames.map(() => 0);
      }
      for (const [index, measureIndex] of measureIndices.entries()) {
        trieNode.values[index] += row.values[measureIndex];
      }
    }

    const result: ResultRow[] = [];
    const labelList: string[] = [];
    const traverseNode = (node: TrieNode) => {
      if (node.values) {
        result.push({
          categories: new Map(
            labelList.map((label, index) => [categoryNames[index], label])
          ),
          values: new Map(
            node.values.map((value, index) => [measureNames[index], value])
          ),
        });
      } else {
        for (const [label, child] of Object.entries(node.children)) {
          labelList.push(label);
          traverseNode(child);
          labelList.pop();
        }
      }
    };
    traverseNode(categoryTrie);
    this.normalizeNthDay(result, categoryNames);
    this.sortResults(
      result,
      categoryNames,
      measureNames,
      sortBy ?? [...categoryNames, ...measureNames]
    );
    return result;
  }

  private normalizeNthDay(result: ResultRow[], categoryNames: string[]) {
    const nthDayIndex = categoryNames.findIndex(name => name === 'nthDay');
    if (nthDayIndex < 0) {
      return;
    }
    const largestNthDay = result.reduce(
      (largestNthDay, row) =>
        Math.max(largestNthDay, row.categories.get('nthDay') as number),
      0
    );
    for (const row of result) {
      const nthDay = row.categories.get('nthDay') as number;
      row.categories.set('nthDay', largestNthDay - nthDay);
    }
  }

  private sortResults(
    results: ResultRow[],
    categoryNames: string[],
    measureNames: string[],
    sortBy: string[]
  ) {
    function getComparator(sortConcept: string) {
      if (categoryNames.includes(sortConcept)) {
        return (a: ResultRow, b: ResultRow) => {
          const aCategory = a.categories.get(sortConcept)!;
          const bCategory = b.categories.get(sortConcept)!;
          if (aCategory < bCategory) {
            return -1;
          }
          if (aCategory > bCategory) {
            return 1;
          }
          return 0;
        };
      }
      if (measureNames.includes(sortConcept)) {
        return (a: ResultRow, b: ResultRow) =>
          a.values.get(sortConcept)! - b.values.get(sortConcept)!;
      }
      return () => 0;
    }

    const comparators = sortBy.map(getComparator);
    const combinedComparator = (a: ResultRow, b: ResultRow) => {
      for (const comparator of comparators) {
        const result = comparator(a, b);
        if (result !== 0) {
          return result;
        }
      }
      return 0;
    };
    results.sort(combinedComparator);
  }
}

interface TrieNode {
  children: Record<string, TrieNode>;
  values?: number[];
}
