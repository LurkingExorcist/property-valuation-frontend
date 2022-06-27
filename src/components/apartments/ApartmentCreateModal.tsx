import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import * as React from 'react';

import { ApartmentPayload, CityService } from '@/domain';

import { useAPI, useForm, useNotifications } from '@/hooks';
import { ApiError } from '@/lib';

export function ApartmentCreateModal() {
  const notify = useNotifications();
  const { data, callAPI: loadCities } = useAPI(CityService.loadCities);

  const { form, setProp, selectProp } = useForm<ApartmentPayload>({
    cityId: undefined,
    floor: 0,
    totalArea: 0,
    livingArea: 0,
    kitchenArea: 0,
    roomCount: 0,
    height: 0,
    isStudio: false,
    totalPrice: 0,
    viewsInWindowIds: [],
  });

  React.useEffect(() => {
    loadCities().catch((err) => notify.push(ApiError.fromError(err)));
  }, []);
  return (
    <>
      <DialogTitle>Создание</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={8}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={8}></Grid>
        </Grid>
        <FormControl fullWidth>
          <InputLabel>Город</InputLabel>
          <Select<string>
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={form.cityId}
            label="Age"
            onChange={selectProp('cityId')}
          >
            {data?.content?.map((city, idx) => (
              <MenuItem value={city.id} key={idx}>
                {city.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Этаж"
          value={form.floor}
          variant="filled"
          onChange={setProp('floor')}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" autoFocus>
          Save changes
        </Button>
      </DialogActions>
    </>
  );
}
