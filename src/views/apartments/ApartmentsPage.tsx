import { Endpoint } from '@rest-hooks/rest';
import * as _ from 'lodash';
import { useDLE } from 'rest-hooks';

import { Apartment, User, ApartmentService } from '@/domain';

import { AppLayout } from '@/layout/app-layout';

import { ApartmentsTable, Card } from '@/components';

export function ApartmentsPage() {
  const { data, error, loading } = useDLE(
    new Endpoint(ApartmentService.loadApartments)
  );

  if (error) {
    console.error(error);
  }

  const user = new User();
  user.username = 'admin';

  return (
    <AppLayout
      title="Квартиры"
      user={user}
      isError={!_.isNil(error)}
      isLoading={loading}
    >
      <Card>{data && <ApartmentsTable data={data} />}</Card>
    </AppLayout>
  );
}
