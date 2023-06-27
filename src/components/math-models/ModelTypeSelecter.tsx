import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useEffect } from 'react';

import { ModelTypeService } from '@/domain';

import { useAPI } from '@/hooks';

type Props = {
  name: string;
  value: string;
  error?: boolean;
  errorMessage?: string;
  onChange: (value: string) => void;
};

export function ModelTypeSelecter({
  name,
  value,
  error,
  errorMessage,
  onChange,
}: Props) {
  const { data: modelTypes = [], callAPI: loadModelTypes } = useAPI(() =>
    ModelTypeService.loadModelTypes().then((data) => data.content)
  );

  useEffect(() => {
    loadModelTypes();
  }, []);

  return (
    <FormControl variant="standard" fullWidth>
      <InputLabel id="model-type-selecter">Тип модели</InputLabel>
      <Select
        labelId="model-type-selecter"
        name={name}
        value={value}
        label="Тип модели"
        error={error}
        onChange={(e) => onChange(e.target.value)}
      >
        {modelTypes.map((modelType) => (
          <MenuItem value={modelType.id} key={modelType.id}>
            {modelType.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  );
}
