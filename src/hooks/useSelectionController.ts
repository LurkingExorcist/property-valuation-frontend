import * as _ from 'lodash';
import { useCallback, useMemo, useState } from 'react';

import { DTRow } from '@/components';
import { Path } from '@/types';

export type SelectionController<T extends DTRow> = {
  selectedRows: T[];
  isAllSelected: boolean;
  isPartialSelected: boolean;
  isSelected: (row: T) => boolean;
  onSelect: (row: T) => void;
  onSelectAll: (value: boolean) => void;
};

export const useSelectionController = <T extends DTRow>(options: {
  rows: T[];
  identifier: Path<T>;
}): SelectionController<T> => {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const selecter = useCallback(
    (row: T) => (sRow: T) =>
      _.get(sRow, options.identifier) === _.get(row, options.identifier),
    [options.identifier]
  );

  const isAllSelected = useMemo(
    () => options.rows.every((row) => !!selectedRows.find(selecter(row))),
    [options.rows, selecter, selectedRows]
  );

  const isPartialSelected = useMemo(
    () => options.rows.some((row) => !!selectedRows.find(selecter(row))),
    [options.rows, selecter, selectedRows]
  );

  const isSelected = useCallback(
    (row: T) => !!selectedRows.find(selecter(row)),
    [selecter, selectedRows]
  );

  const onSelect = useCallback(
    (row: T) => {
      const newSelectedRows = [...selectedRows];
      const index = newSelectedRows.findIndex(selecter(row));

      if (index === -1) {
        newSelectedRows.push(row);
      } else {
        newSelectedRows.splice(index, 1);
      }

      setSelectedRows(newSelectedRows);
    },
    [selecter, selectedRows]
  );

  const onSelectAll = useCallback(
    (value: boolean) => {
      if (value) {
        setSelectedRows([...options.rows]);
      } else {
        setSelectedRows([]);
      }
    },
    [options.rows]
  );

  const controller = useMemo(() => {
    const controller = {
      selectedRows,
      isAllSelected,
      isPartialSelected,
      isSelected,
      onSelect,
      onSelectAll,
    };

    return controller;
  }, [
    selectedRows,
    isAllSelected,
    isPartialSelected,
    isSelected,
    onSelect,
    onSelectAll,
  ]);

  return controller;
};
