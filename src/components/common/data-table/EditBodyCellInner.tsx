import { Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { DTBodyCellRendererProps, DTRow } from './types';

type Props<T extends DTRow> = DTBodyCellRendererProps<T> & {
  onEdit: (props: DTBodyCellRendererProps<T>) => void;
};

export function EditBodyCellInner<T extends DTRow>({
  onEdit,
  ...props
}: Props<T>) {
  return (
    <IconButton onClick={() => onEdit(props)}>
      <Edit fontSize="small" />
    </IconButton>
  );
}
