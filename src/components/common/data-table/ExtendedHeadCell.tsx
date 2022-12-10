import {
  ArrowDownward,
  ArrowUpward,
  Check,
  Delete,
  FilterAlt,
  FilterAltOutlined,
} from '@mui/icons-material';
import {
  Fade,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Popper,
  Select,
} from '@mui/material';
import clsx from 'clsx';
import * as _ from 'lodash';
import { useState } from 'react';
import { useUpdateEffect } from 'react-use';

import { FILTER_OPERATORS } from '@/constants';
import { Utils } from '@/lib';
import { FilterOperation, FilterOperator, SortItem } from '@/types';

import { DTHeadCellRendererProps, DTRow } from './types';

import './extended-head-cell.scss';

type Props<T extends DTRow> = DTHeadCellRendererProps<T> & {
  onChangeSort: (sortItems: SortItem<T>) => void;
  onChangeFilter: (filter: FilterOperation | undefined) => void;
};

const DELIMITER = ',';

export function ExtendedHeadCell<T extends DTRow>({
  column,
  classes,
  onChangeSort,
  onChangeFilter,
}: Props<T>) {
  if (!column.prop) {
    throw new Error('Value of column.prop must be provided!');
  }

  const [filterOperator, setFilterOperator] = useState<FilterOperator>(
    FILTER_OPERATORS.EQUALS
  );

  const [filterValue, setFilterValue] = useState<string>('');
  const [isFilterOpened, setIsFilterOpened] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const [sortItem, setSortItem] = useState<SortItem<T>>({
    field: column.prop,
    sort: undefined,
  });

  useUpdateEffect(() => {
    onChangeSort(sortItem);
  }, [sortItem]);

  const onApplyFilter = () => {
    onChangeFilter([
      filterOperator,
      _.cond<FilterOperator, string | string[]>([
        [
          Utils.equals(FILTER_OPERATORS.BETWEEN),
          () => filterValue.split(DELIMITER).map((el) => el.trim()),
        ],
        [
          Utils.equals(FILTER_OPERATORS.IS_ANY_OF),
          () => filterValue.split(DELIMITER).map((el) => el.trim()),
        ],
        [_.stubTrue, () => filterValue],
      ])(filterOperator),
    ]);
    setIsFilterOpened(false);
    setIsFilterApplied(true);
  };

  const onResetFilter = () => {
    setFilterOperator(FILTER_OPERATORS.EQUALS);
    setFilterValue('');
    onChangeFilter(undefined);
    setIsFilterOpened(false);
    setIsFilterApplied(false);
  };

  const onFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
    setIsFilterOpened((prevValue) => !prevValue);
  };

  return (
    <th className={clsx('extended-head-cell', classes.headCell)}>
      <div className={clsx('extended-head-cell__inner', classes.headCellInner)}>
        <div className="extended-head-cell__label">{column.label}</div>
        <div
          className={clsx(
            'extended-head-cell__filter-btn',
            (isFilterApplied || isFilterOpened) &&
              'extended-head-cell__filter-btn--applied'
          )}
          onClick={onFilterClick}
        >
          {isFilterApplied || isFilterOpened ? (
            <FilterAlt color="primary" fontSize="small" />
          ) : (
            <FilterAltOutlined color="primary" fontSize="small" />
          )}
        </div>
        <div
          className={clsx(
            'extended-head-cell__sort-btn',
            sortItem.sort && 'extended-head-cell__sort-btn--applied'
          )}
          onClick={() =>
            setSortItem(({ sort, field }) => ({
              field,
              sort:
                sort === 'asc' ? 'desc' : sort === 'desc' ? undefined : 'asc',
            }))
          }
        >
          {!sortItem.sort || sortItem.sort === 'asc' ? (
            <ArrowUpward color="primary" fontSize="small" />
          ) : (
            <ArrowDownward color="primary" fontSize="small" />
          )}
        </div>
      </div>
      <Popper
        open={isFilterOpened}
        anchorEl={filterAnchorEl}
        placement="bottom-start"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper className="extended-head-cell__fliter-panel">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="filter-operator">Оператор</InputLabel>
                <Select
                  labelId="filter-operator"
                  value={filterOperator}
                  onChange={(e) =>
                    setFilterOperator(e.target.value as FilterOperator)
                  }
                >
                  <MenuItem value={FILTER_OPERATORS.EQUALS}>Равно</MenuItem>
                  <MenuItem value={FILTER_OPERATORS.LIKE}>Содержит</MenuItem>
                  <MenuItem value={FILTER_OPERATORS.LESS_THAN_EQUAL}>
                    Меньше
                  </MenuItem>
                  <MenuItem value={FILTER_OPERATORS.LESS_THAN}>
                    Меньше или равно
                  </MenuItem>
                  <MenuItem value={FILTER_OPERATORS.MORE_THEN_EQUAL}>
                    Больше
                  </MenuItem>
                  <MenuItem value={FILTER_OPERATORS.MORE_THEN}>
                    Больше или равно
                  </MenuItem>
                  <MenuItem value={FILTER_OPERATORS.IS_EMPTY}>
                    Пустое значение
                  </MenuItem>
                  <MenuItem value={FILTER_OPERATORS.IS_NOT_EMPTY}>
                    Не пустое значение
                  </MenuItem>
                  <MenuItem value={FILTER_OPERATORS.IS_ANY_OF}>
                    Один из
                  </MenuItem>
                  <MenuItem value={FILTER_OPERATORS.BETWEEN}>
                    В промежутке
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel htmlFor="filter-value">Значение</InputLabel>
                <Input
                  id="filter-value"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                />
              </FormControl>
              <div className="extended-head-cell__controls">
                <IconButton color="success" onClick={onApplyFilter}>
                  <Check />
                </IconButton>
                {isFilterApplied && (
                  <IconButton color="error" onClick={onResetFilter}>
                    <Delete />
                  </IconButton>
                )}
              </div>
            </Paper>
          </Fade>
        )}
      </Popper>
    </th>
  );
}
