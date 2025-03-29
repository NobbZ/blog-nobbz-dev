// SPDX-FileCopyrightText: 2025 Norbert Melzer
// SPDX-FileContributor: Norbert Melzer
//
// SPDX-License-Identifier: MIT

export type DateSortable = {
  data: {
    date: Date;
  };
};

export const byDate = (a: DateSortable, b: DateSortable): number =>
  b.data.date.getTime() - a.data.date.getTime();
