import { Button } from '@mui/material';
import { MouseEventHandler } from 'react';

type FormControlsLabels = Partial<{
  submit: string;
  reset: string;
}>;

type Props = {
  labels?: FormControlsLabels;
  isValid: boolean;
  isDirty: boolean;
  onClickSubmit: MouseEventHandler<HTMLButtonElement>;
  onClickReset: MouseEventHandler<HTMLButtonElement>;
};

export function FormControls({
  labels,
  isValid,
  isDirty,
  onClickSubmit,
  onClickReset,
}: Props) {
  return (
    <>
      <Button variant="contained" disabled={!isValid} onClick={onClickSubmit}>
        {labels?.submit || 'Отправить'}
      </Button>
      <Button variant="outlined" disabled={!isDirty} onClick={onClickReset}>
        {labels?.reset || 'Сбросить'}
      </Button>
    </>
  );
}
