import { Checkbox } from '@mui/material';
import clsx from 'clsx';

import { SelectionController } from '@/hooks';

import { DTHeadCellRendererProps, DTRow } from './types';

type Props<T extends DTRow> = DTHeadCellRendererProps<T> & {
  controller: SelectionController<T>;
};

export function SelectionHeadCell<T extends DTRow>({
  classes,
  controller,
}: Props<T>) {
  return (
    <th className={clsx('selection-head-cell', classes.headCell)}>
      <div
        className={clsx('selection-head-cell__inner', classes.headCellInner)}
      >
        <Checkbox
          indeterminate={
            controller.isAllSelected ? false : controller.isPartialSelected
          }
          checked={controller.isAllSelected}
          onChange={(e, checked) => controller.onSelectAll(checked)}
        />
      </div>
    </th>
  );
}
