import './users-page.scss';

import { Delete } from '@mui/icons-material';
import {
  Button,
  Divider,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
} from '@mui/material';
import { useMemo } from 'react';

import { UserEntity, UserService } from '@/domain';

import { AppLayout } from '@/components/common/layout/app-layout';

import {
  UserCreateModal,
  DataTable,
  DTColumn,
  ExtendedHeadCell,
  EditBodyCellInner,
  UserEditModal,
} from '@/components';
import {
  usePaginatedAPI,
  useSelectionController,
  useModal,
  useBatchRemove,
  useSelectionColumns,
  useErrorHandler,
} from '@/hooks';

export function UsersPage() {
  const handleError = useErrorHandler();

  const createModal = useModal(UserCreateModal);
  const editModal = useModal(UserEditModal);

  const {
    data: usersData,
    where,
    pageIndex,
    pagesCount,
    setPageIndex,
    onChangeSort,
    onChangeFilter,
    callAPI: loadUsers,
  } = usePaginatedAPI(UserService.loadUsers, { initialPageSize: 20 });

  const selectionController = useSelectionController({
    rows: usersData?.content || [],
    identifier: 'id',
  });

  const openCreateModal = () => createModal.show({ onSubmit: loadUsers });
  const openEditModal = (data: UserEntity) =>
    editModal.show({ data, onSubmit: loadUsers });

  const batchRemove = useBatchRemove({
    where,
    selectionController,
    identifier: 'id',
    method: async (query) => {
      try {
        await UserService.batchRemove(query);
        await loadUsers();
      } catch (err) {
        handleError(err);
      }
    },
  });

  const selectionColumns = useSelectionColumns({ selectionController });

  const columns = useMemo(
    (): DTColumn<UserEntity>[] => [
      {
        id: 'username',
        label: 'Логин',
        prop: 'username',
        headCellRenderer: (props) => (
          <ExtendedHeadCell
            onChangeSort={onChangeSort}
            onChangeFilter={onChangeFilter('username')}
            {...props}
          />
        ),
      },
      {
        id: 'email',
        label: 'Email',
        prop: 'email',
        headCellRenderer: (props) => (
          <ExtendedHeadCell
            onChangeSort={onChangeSort}
            onChangeFilter={onChangeFilter('email')}
            {...props}
          />
        ),
      },
      {
        id: 'phoneNumber',
        label: 'Номер телефона',
        prop: 'phoneNumber',
        headCellRenderer: (props) => (
          <ExtendedHeadCell
            onChangeSort={onChangeSort}
            onChangeFilter={onChangeFilter('phoneNumber')}
            {...props}
          />
        ),
      },
      {
        id: 'edit',
        classes: {
          bodyCell: () => 'users-page__table-body-cell--edit',
        },
        bodyCellInnerRenderer: (props) => (
          <EditBodyCellInner
            onEdit={(props) => openEditModal(props.row)}
            {...props}
          />
        ),
      },
    ],
    []
  );

  return (
    <AppLayout className="users-page" title="Пользователи">
      <Paper className="users-page__card">
        <div className="users-page__controls">
          <Button variant="contained" onClick={openCreateModal}>
            Создать
          </Button>
          {selectionController.isPartialSelected && (
            <IconButton aria-label="delete" onClick={batchRemove}>
              <Delete color="error" />
            </IconButton>
          )}
        </div>
        <Divider />
        <div className="users-page__table-container">
          {usersData ? (
            <DataTable
              className="users-page__table"
              identifier="id"
              classes={{
                bodyCell: 'users-page__table-body-cell',
              }}
              rows={usersData.content}
              columns={[...selectionColumns, ...columns]}
              isStickyHeader
            />
          ) : (
            <LinearProgress />
          )}
        </div>
      </Paper>
      <div className="users-page__pagination-container">
        {usersData && pagesCount > 1 && (
          <Pagination
            className="users-page__pagination"
            page={pageIndex}
            count={pagesCount}
            color="primary"
            onChange={(e, page) => setPageIndex(page)}
          />
        )}
      </div>
    </AppLayout>
  );
}
