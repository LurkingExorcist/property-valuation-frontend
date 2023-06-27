import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useEffect } from 'react';

import { DatasetService } from '@/domain';

import { useAPI } from '@/hooks';

type Props = {
  name: string;
  value: string;
  error?: boolean;
  errorMessage?: string;
  onChange: (value: string) => void;
};

export function DatasetSelector({
  name,
  value,
  error,
  errorMessage,
  onChange,
}: Props) {
  const { data: datasets = [], callAPI: loadDatasets } = useAPI(() =>
    DatasetService.loadDatasets().then((data) => data.content)
  );

  useEffect(() => {
    loadDatasets();
  }, []);

  return (
    <FormControl variant="standard" fullWidth>
      <InputLabel id="model-type-selecter">Датасет</InputLabel>
      <Select
        labelId="model-type-selecter"
        name={name}
        value={value}
        label="Датасет"
        error={error}
        onChange={(e) => onChange(e.target.value)}
      >
        {datasets.map((dataset) => (
          <MenuItem value={dataset.id} key={dataset.id}>
            {dataset.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  );
}
