import { Checkbox } from '@mui/material';
import clsx from 'clsx';

import { SelectionController } from '@/hooks';

import { DTBodyCellRendererProps, DTRow } from './types';

type Props<T extends DTRow> = DTBodyCellRendererProps<T> & {
  controller: SelectionController<T>;
};

export function SelectionBodyCell<T extends DTRow>({
  row,
  classes,
  controller,
}: Props<T>) {
  return (
    <td className={clsx('selection-body-cell', classes.bodyCell)}>
      <div
        className={clsx('selection-body-cell__inner', classes.bodyCellInner)}
      >
        <Checkbox
          checked={controller.isSelected(row)}
          onChange={() => controller.onSelect(row)}
        />
      </div>
    </td>
  );
}
