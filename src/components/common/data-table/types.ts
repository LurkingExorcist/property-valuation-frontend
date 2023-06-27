import { ClassValue } from 'clsx';
import { FunctionComponent, HTMLProps } from 'react';

import { AnyObject, Path, Primitive } from '@/types';

export type DTRow = AnyObject;

/**
 * Классы для внутренних компонентов DataTable
 */
export type DTClasses = {
  head?: string;
  headRow?: string;
  headCell?: string;
  headCellInner?: string;
  body?: string;
  bodyRow?: string;
  bodyCell?: string;
  bodyCellInner?: string;
  foot?: string;
  footRow?: string;
  footCell?: string;
  footCellInner?: string;
};

type DTCellRendererProps = {
  cellIndex: number;
  rowIndex: number;
};

export type DTColumnRendererProps<T extends DTRow> = DTCellRendererProps & {
  column: DTColumn<T>;
  columns: DTColumn<T>[];
};

export type DTHeadCellRendererProps<T extends DTRow> =
  DTColumnRendererProps<T> & {
    classes: Required<Pick<DTClasses, 'headCell' | 'headCellInner'>>;
  };

export type DTFootCellRendererProps<T extends DTRow> =
  DTColumnRendererProps<T> & {
    classes: Required<Pick<DTClasses, 'footCell' | 'footCellInner'>>;
  };

export type DTBodyRowRendererProps<T extends DTRow> = {
  rowIndex: number;
  row: T;
};

export type DTBodyCellRendererProps<T extends DTRow> =
  DTColumnRendererProps<T> & {
    row: T;
    value: any;
    classes: Required<Pick<DTClasses, 'bodyCell' | 'bodyCellInner'>>;
  };

export type DTHeadCellRenderer<T extends DTRow> = FunctionComponent<
  DTHeadCellRendererProps<T>
>;

export type DTFootCellRenderer<T extends DTRow> = FunctionComponent<
  DTFootCellRendererProps<T>
>;

export type DTBodyCellRenderer<T extends DTRow> = FunctionComponent<
  DTBodyCellRendererProps<T>
>;

export type EventListeners = Partial<
  Record<
    keyof HTMLElementEventMap,
    (evt: HTMLElementEventMap[keyof HTMLElementEventMap]) => void
  >
>;

export type DTElementListeners<T extends DTRow> = Partial<{
  headCell: (props: DTHeadCellRendererProps<T>) => EventListeners;
  cell: (props: DTBodyCellRendererProps<T>) => EventListeners;
}>;

export type DTColumnPropGetter<T extends DTRow> = (
  value: any,
  props: DTBodyCellRendererProps<T>
) => Primitive;

export type DTColumnClasses<T extends DTRow> = {
  headCell?: (props: DTHeadCellRendererProps<T>) => ClassValue;
  headCellInner?: (props: DTHeadCellRendererProps<T>) => ClassValue;
  bodyCell?: (props: DTBodyCellRendererProps<T>) => ClassValue;
  bodyCellInner?: (props: DTBodyCellRendererProps<T>) => ClassValue;
  footCell?: (props: DTFootCellRendererProps<T>) => ClassValue;
  footCellInner?: (props: DTFootCellRendererProps<T>) => ClassValue;
};

export type DTColumn<T extends DTRow> = {
  id: string;
  prop?: Path<T>;
  display?: DTColumnPropGetter<T>;
  label?: string;
  classes?: Partial<DTColumnClasses<T>>;
  listeners?: DTElementListeners<T>;
  bodyCellRenderer?: DTBodyCellRenderer<T>;
  bodyCellInnerRenderer?: DTBodyCellRenderer<T>;
  headCellRenderer?: DTHeadCellRenderer<T>;
  headCellInnerRenderer?: DTHeadCellRenderer<T>;
  footCellRenderer?: DTFootCellRenderer<T>;
  footCellInnerRenderer?: DTFootCellRenderer<T>;
};

export type DTProps<Row extends DTRow> = Omit<
  HTMLProps<HTMLTableElement>,
  'className' | 'rows'
> & {
  identifier: Path<Row>;
  className?: ClassValue;
  columns: DTColumn<Row>[];
  rows: Row[];
  classes?: DTClasses;
  isStickyHeader?: boolean;
  shouldShowFooter?: boolean;
};
