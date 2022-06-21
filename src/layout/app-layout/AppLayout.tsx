import './app-layout.scss';

import { PropsWithChildren } from 'react';

import { User } from '@/domain/User';

import { Navbar } from './navbar';
import { Sidebar } from './sidebar';

export interface IAppLayoutProps extends PropsWithChildren {
  title: string;
  user: User;
  isError: boolean;
  isLoading: boolean;
}

export function AppLayout(props: IAppLayoutProps) {
  return (
    <div className="app-layout">
      <div className="app-layout__wrapper">
        <Sidebar className="app-layout__sidebar" />
        <main className="app-layout__main">
          <Navbar title={props.title} user={props.user} />
          <div className="app-layout__page-content">{props.children}</div>
        </main>
      </div>
    </div>
  );
}
