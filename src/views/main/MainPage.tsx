import { Paper } from '@mui/material';

import { AppLayout } from '@/components';

export function MainPage() {
  return (
    <AppLayout className="main-page" title="Главная страница">
      <Paper className="main-page__card">Главная страница</Paper>
    </AppLayout>
  );
}
