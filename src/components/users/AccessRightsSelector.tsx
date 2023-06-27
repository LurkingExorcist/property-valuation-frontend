import {
  Box,
  Chip,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import * as _ from 'lodash';
import { useEffect, useMemo } from 'react';

import {
  AccessLevel,
  AccessRight,
  AccessRightService,
  DomainEntityType,
} from '@/domain';

import { useAPI } from '@/hooks';

import { ACCESS_LEVELS_NAMES, DOMAIN_ENTITY_NAMES } from './constants';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type Props = {
  name: string;
  value: AccessRight[];
  errorMessage?: string;
  error?: boolean;
  onChange: (value: AccessRight[]) => void;
};

export function AccessRightsSelector({
  name,
  value,
  errorMessage,
  error,
  onChange,
}: Props) {
  const ids = useMemo(
    () => value.map((accessRight) => accessRight.id),
    [value]
  );

  const { data: accessRights = [], callAPI: loadAccessRights } = useAPI(() =>
    AccessRightService.loadAccessRights().then((data) => data.content)
  );

  const fromIds = (selectedIds: string[]) =>
    _(selectedIds)
      .map((id) => accessRights.find((accessRight) => accessRight.id === id))
      .filter(
        (accessRight): accessRight is AccessRight => !_.isNil(accessRight)
      )
      .value();

  useEffect(() => {
    loadAccessRights();
  }, []);

  const getAccessRightName = (options: {
    domainEntity: DomainEntityType;
    accessLevel: AccessLevel;
  }) =>
    [
      DOMAIN_ENTITY_NAMES[options.domainEntity],
      ACCESS_LEVELS_NAMES[options.accessLevel],
    ].join(': ');

  return (
    <FormControl variant="standard" error={error} fullWidth>
      <InputLabel id="access-rights-label">Права доступа</InputLabel>
      <Select
        name={name}
        value={ids}
        labelId="access-rights-label"
        input={<Input />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {_.thru(selected, fromIds).map((value) => (
              <Chip
                key={getAccessRightName(value)}
                label={getAccessRightName(value)}
              />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
        onChange={(e) => onChange(fromIds(e.target.value as string[]))}
        multiple
      >
        {accessRights.map((accessRight) => (
          <MenuItem
            key={getAccessRightName(accessRight)}
            value={accessRight.id}
          >
            {getAccessRightName(accessRight)}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  );
}
