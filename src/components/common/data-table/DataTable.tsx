import './data-table.scss';

import clsx from 'clsx';
import * as _ from 'lodash';
import { ReactNode, useCallback, useMemo } from 'react';

import {
  DTBodyCellRendererProps,
  DTClasses,
  DTColumn,
  DTFootCellRendererProps,
  DTHeadCellRendererProps,
  DTProps,
  DTRow,
} from './types';

export function DataTable<T extends DTRow>({
  identifier,
  className,
  columns,
  rows,
  classes,
  shouldShowFooter,
  isStickyHeader,
  ...tableProps
}: DTProps<T>) {
  const getHeadCellProps = useCallback(
    (options: {
      cellIndex: number;
      column: DTColumn<T>;
      classes: Required<Pick<DTClasses, 'headCell' | 'headCellInner'>>;
    }): DTHeadCellRendererProps<T> => ({
      columns,
      column: options.column,
      cellIndex: options.cellIndex,
      rowIndex: 0,
      classes: {
        headCell: options.classes.headCell,
        headCellInner: options.classes.headCellInner,
      },
    }),
    [columns, classes]
  );

  const getBodyCellProps = useCallback(
    (options: {
      cellIndex: number;
      rowIndex: number;
      column: DTColumn<T>;
      row: T;
      value: any;
      classes: Required<Pick<DTClasses, 'bodyCell' | 'bodyCellInner'>>;
    }): DTBodyCellRendererProps<T> => ({
      columns,
      row: options.row,
      value: options.value,
      column: options.column,
      cellIndex: options.cellIndex,
      rowIndex: options.rowIndex,
      classes: {
        bodyCell: options.classes.bodyCell,
        bodyCellInner: options.classes.bodyCellInner,
      },
    }),
    [columns, classes]
  );

  const getFootCellProps = useCallback(
    (options: {
      cellIndex: number;
      column: DTColumn<T>;
      classes: Required<Pick<DTClasses, 'footCell' | 'footCellInner'>>;
    }): DTFootCellRendererProps<T> => ({
      columns,
      column: options.column,
      cellIndex: options.cellIndex,
      rowIndex: 0,
      classes: {
        footCell: options.classes.footCell,
        footCellInner: options.classes.footCellInner,
      },
    }),
    [columns, classes]
  );

  const getValue = useMemo(
    () =>
      ({
        row,
        props,
        column: { prop, display },
      }: {
        row: T;
        column: DTColumn<T>;
        props: DTBodyCellRendererProps<T>;
      }) => {
        const value = prop ? _.get(row, prop) : null;

        return display ? display(value, props) : value;
      },
    []
  );

  return (
    <table className={clsx(className, 'data-table')} {...tableProps}>
      <thead className={clsx(classes?.head, 'data-table__head')}>
        <tr className={(clsx(classes?.headRow), 'data-table__head-row')}>
          {columns.map((column, cellIndex) => {
            const headCellProps = getHeadCellProps({
              cellIndex,
              column,
              classes: {
                headCell: classes?.headCell || 'data-table__head-cell',
                headCellInner:
                  classes?.headCellInner || 'data-table__head-cell-inner',
              },
            });

            headCellProps.classes.headCell = clsx(
              classes?.headCell,
              column.classes?.headCell?.(headCellProps),
              'data-table__head-cell',
              isStickyHeader && 'data-table__head-cell--sticky'
            );

            headCellProps.classes.headCellInner = clsx(
              classes?.headCellInner,
              column.classes?.headCellInner?.(headCellProps),
              'data-table__head-cell-inner'
            );

            if (column.headCellRenderer) {
              return (
                <column.headCellRenderer key={column.id} {...headCellProps} />
              );
            }

            return (
              <th className={headCellProps.classes.headCell} key={column.id}>
                {column.headCellInnerRenderer ? (
                  <column.headCellInnerRenderer {...headCellProps} />
                ) : (
                  <div className={headCellProps.classes.headCellInner}>
                    {column.label}
                  </div>
                )}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className={clsx(classes?.body, 'data-table__body')}>
        {rows.map((row, rowIndex) => (
          <tr
            className={(clsx(classes?.bodyRow), 'data-table__body-row')}
            key={_.get(row, identifier) as React.Key}
          >
            {columns.map((column, cellIndex) => {
              const props = getBodyCellProps({
                cellIndex,
                column,
                row,
                rowIndex,
                value: undefined,
                classes: {
                  bodyCell: classes?.bodyCell || 'data-table__body-cell',
                  bodyCellInner:
                    classes?.bodyCellInner || 'data-table__body-cell-inner',
                },
              });

              const value = getValue({
                row,
                column,
                props,
              });

              const bodyCellProps = {
                ...props,
                value,
                classes: {
                  bodyCell: clsx(
                    classes?.bodyCell,
                    column.classes?.bodyCell?.(props),
                    'data-table__body-cell'
                  ),
                  bodyCellInner: clsx(
                    classes?.bodyCellInner,
                    column.classes?.bodyCellInner?.(props),
                    'data-table__body-cell-inner'
                  ),
                },
              };

              if (column.bodyCellRenderer) {
                return (
                  <column.bodyCellRenderer key={column.id} {...bodyCellProps} />
                );
              }

              return (
                <td className={bodyCellProps.classes.bodyCell} key={column.id}>
                  {column.bodyCellInnerRenderer ? (
                    <column.bodyCellInnerRenderer {...bodyCellProps} />
                  ) : (
                    <div className={bodyCellProps.classes.bodyCellInner}>
                      {value as ReactNode}
                    </div>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
      {shouldShowFooter && (
        <tfoot className={clsx(classes?.foot, 'data-table__foot')}>
          <tr className={(clsx(classes?.footRow), 'data-table__foot-row')}>
            {columns.map((column, cellIndex) => {
              const footCellProps = getFootCellProps({
                cellIndex,
                column,
                classes: {
                  footCell: classes?.footCell || 'data-table__foot-cell',
                  footCellInner:
                    classes?.footCellInner || 'data-table__foot-cell-inner',
                },
              });

              footCellProps.classes.footCell = clsx(
                classes?.footCell,
                column.classes?.footCell?.(footCellProps),
                'data-table__foot-cell'
              );

              footCellProps.classes.footCellInner = clsx(
                classes?.footCellInner,
                column.classes?.footCellInner?.(footCellProps),
                'data-table__foot-cell-inner'
              );

              if (column.footCellRenderer) {
                return (
                  <column.footCellRenderer key={column.id} {...footCellProps} />
                );
              }

              return (
                <td className={footCellProps.classes.footCell} key={column.id}>
                  {column.footCellInnerRenderer ? (
                    <column.footCellInnerRenderer {...footCellProps} />
                  ) : (
                    <div className={footCellProps.classes.footCellInner}>
                      {column.label}
                    </div>
                  )}
                </td>
              );
            })}
          </tr>
        </tfoot>
      )}
    </table>
  );
}
