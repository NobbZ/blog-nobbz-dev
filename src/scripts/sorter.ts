// SPDX-FileCopyrightText: 2025 Norbert Melzer
// SPDX-FileContributor: Norbert Melzer
//
// SPDX-License-Identifier: MIT

export type DateSortable = {
  data: {
    date: Date;
  };
};

/**
 * Can be used for any `ContentCollection` that has a `data.date` field to sort
 * by it.
 *
 * @param a first item to compare
 * @param b second item to compare
 * @returns positive number if `a` is older than `b`, negative number if `a` is
 *   newer than `b`
 */
export const byDate = (a: DateSortable, b: DateSortable): number =>
  b.data.date.getTime() - a.data.date.getTime();
