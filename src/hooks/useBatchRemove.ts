import * as _ from 'lodash';
import { useCallback, useMemo } from 'react';

import { FILTER_OPERATORS } from '@/constants';
import { AnyObject, Path, Where } from '@/types';

import { useConfirm } from './useConfirm';
import { useErrorHandler } from './useErrorHandler';
import { useNotifications } from './useNotifications';
import { SelectionController } from './useSelectionController';

type BatchRemoveOptions<T extends AnyObject> = {
  identifier: Path<T>;
  selectionController: SelectionController<T>;
  where: Where<T>;
  method: (query: Where<T>) => Promise<void>;
};

export const useBatchRemove = <T extends AnyObject>({
  identifier,
  selectionController,
  where,
  method,
}: BatchRemoveOptions<T>) => {
  const notify = useNotifications();
  const handleError = useErrorHandler();
  const confirm = useConfirm();

  const count = useMemo(
    () => selectionController.selectedRows.length,
    [selectionController.selectedRows]
  );

  const runMethod = async (query: Where<T>) => {
    notify.push({
      title: 'Подождите, идет удаление данных...',
      color: 'info',
    });

    await method(query);

    notify.push({
      title: 'Данные успешно удалены',
      color: 'success',
    });
  };

  const removeByIDS = useCallback(
    () =>
      confirm(`Подтвердить удаление "${count}" записей?`)
        .then(async () => {
          try {
            const query: Where<T> = {};

            _.set(query, identifier, [
              FILTER_OPERATORS.IS_ANY_OF,
              selectionController.selectedRows.map((row) =>
                _.get(row, identifier)
              ),
            ]);

            await runMethod(query);
          } catch (err) {
            handleError(err);
          }
        })
        .catch(() => console.log('cancel')),
    [identifier, selectionController.selectedRows, method, confirm, handleError]
  );

  const batchRemove = useCallback(async () => {
    if (selectionController.isAllSelected) {
      await confirm(
        `Выбрано только "${count}" записей. Удалить ВСЕ записи по указанным фильтрам?`
      )
        .then(() => runMethod(where).catch(handleError))
        .catch(removeByIDS);

      return;
    }

    await removeByIDS();
  }, [
    selectionController.isAllSelected,
    confirm,
    method,
    handleError,
    removeByIDS,
  ]);

  return batchRemove;
};
