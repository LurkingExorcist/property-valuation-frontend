import { useMemo } from 'react';

import { DTColumn, SelectionBodyCell, SelectionHeadCell } from '@/components';
import { AnyObject } from '@/types';

import { SelectionController } from './useSelectionController';

export const useSelectionColumns = <T extends AnyObject>({
  selectionController,
}: {
  selectionController: SelectionController<T>;
}) => {
  const columns = useMemo(
    (): DTColumn<T>[] => [
      {
        id: 'selector',
        headCellRenderer: (props) => (
          <SelectionHeadCell controller={selectionController} {...props} />
        ),
        bodyCellRenderer: (props) => (
          <SelectionBodyCell controller={selectionController} {...props} />
        ),
      },
    ],
    [selectionController]
  );

  return columns;
};
