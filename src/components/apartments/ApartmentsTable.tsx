import { Checkbox } from '@mui/material';
import { useMemo } from 'react';

import { ApartmentEntity } from '@/domain';

import { SelectionController, useSelectionColumns } from '@/hooks';
import { FilterOperation, Path, PropsWithClassName, SortItem } from '@/types';

import { DataTable, DTColumn, ExtendedHeadCell } from '../common';

type Props = PropsWithClassName<{
  selectionController: SelectionController<ApartmentEntity>;
  rows: ApartmentEntity[];
  onChangeSort: (sortItem: SortItem<ApartmentEntity>) => void;
  onChangeFilter: (
    prop: Path<ApartmentEntity>
  ) => (filter: FilterOperation | undefined) => void;
}>;

export function ApartmentsTable({
  className,
  selectionController,
  rows,
  onChangeSort,
  onChangeFilter,
}: Props) {
  const selectionColumns = useSelectionColumns({ selectionController });

  const columns = useMemo(
    (): DTColumn<ApartmentEntity>[] => [
      {
        id: 'source',
        label: 'Источник',
        prop: 'source',
        headCellRenderer: (props) => (
          <ExtendedHeadCell
            onChangeSort={onChangeSort}
            onChangeFilter={onChangeFilter('source')}
            {...props}
          />
        ),
      },
      {
        id: 'city',
        label: 'Город',
        prop: 'city.name',
        headCellRenderer: (props) => (
          <ExtendedHeadCell
            onChangeSort={onChangeSort}
            onChangeFilter={onChangeFilter('city.name')}
            {...props}
          />
        ),
      },
      {
        id: 'floor',
        label: 'Этаж',
        prop: 'floor',
        headCellRenderer: (props) => (
          <ExtendedHeadCell
            onChangeSort={onChangeSort}
            onChangeFilter={onChangeFilter('floor')}
            {...props}
          />
        ),
      },
      {
        id: 'height',
        label: 'Высота',
        prop: 'height',
        headCellRenderer: (props) => (
          <ExtendedHeadCell
            onChangeSort={onChangeSort}
            onChangeFilter={onChangeFilter('height')}
            {...props}
          />
        ),
      },
      {
        id: 'roomCount',
        label: 'Количество комнат',
        prop: 'roomCount',
        headCellRenderer: (props) => (
          <ExtendedHeadCell
            onChangeSort={onChangeSort}
            onChangeFilter={onChangeFilter('roomCount')}
            {...props}
          />
        ),
      },
      {
        id: 'kitchenArea',
        label: 'Площадь кухни (кв. м.)',
        prop: 'kitchenArea',
        headCellRenderer: (props) => (
          <ExtendedHeadCell
            onChangeSort={onChangeSort}
            onChangeFilter={onChangeFilter('kitchenArea')}
            {...props}
          />
        ),
      },
      {
        id: 'livingArea',
        label: 'Жилая площадь (кв. м.)',
        prop: 'livingArea',
        headCellRenderer: (props) => (
          <ExtendedHeadCell
            onChangeSort={onChangeSort}
            onChangeFilter={onChangeFilter('livingArea')}
            {...props}
          />
        ),
      },
      {
        id: 'totalArea',
        label: 'Общая площадь (кв. м.)',
        prop: 'totalArea',
        headCellRenderer: (props) => (
          <ExtendedHeadCell
            onChangeSort={onChangeSort}
            onChangeFilter={onChangeFilter('totalArea')}
            {...props}
          />
        ),
      },
      {
        id: 'isStudio',
        label: 'Студия?',
        prop: 'isStudio',
        bodyCellInnerRenderer: (props) => (
          <Checkbox checked={props.value} disabled />
        ),
        headCellRenderer: (props) => (
          <ExtendedHeadCell
            onChangeSort={onChangeSort}
            onChangeFilter={onChangeFilter('isStudio')}
            {...props}
          />
        ),
      },
      {
        id: 'viewsInWindow',
        label: 'Виды из окна',
        prop: 'viewsInWindow',
        bodyCellInnerRenderer: (props) => (
          <div className="apartments-page__views-in-window">
            {props.row.viewsInWindow.map((view) => view.description).join('; ')}
          </div>
        ),
      },
    ],
    []
  );

  return (
    <DataTable
      className={className}
      identifier="id"
      rows={rows}
      columns={[...selectionColumns, ...columns]}
      isStickyHeader
    />
  );
}
