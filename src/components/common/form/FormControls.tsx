import { Button } from '@mui/material';
import { MouseEventHandler } from 'react';

type Props = {
  isValid: boolean;
  isDirty: boolean;
  onClickSubmit: MouseEventHandler<HTMLButtonElement>;
  onClickReset: MouseEventHandler<HTMLButtonElement>;
};

export function FormControls({
  isValid,
  isDirty,
  onClickSubmit,
  onClickReset,
}: Props) {
  return (
    <>
      <Button variant="contained" disabled={!isValid} onClick={onClickSubmit}>
        Отправить
      </Button>

      <Button variant="outlined" disabled={!isDirty} onClick={onClickReset}>
        Сбросить
      </Button>
    </>
  );
}
