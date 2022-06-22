import './app-layout.scss';

import { PropsWithChildren } from 'react';

import { useUser } from '@/hooks';
import { CNProps } from '@/types';

import { Navbar } from './navbar';
import { Sidebar } from './sidebar';

export interface IAppLayoutProps extends PropsWithChildren, CNProps {
  title: string;
}

export function AppLayout(props: IAppLayoutProps) {
  const user = useUser();

  return (
    <div className="app-layout">
      <div className="app-layout__wrapper">
        <Sidebar className="app-layout__sidebar" />
        <main className="app-layout__main">
          <Navbar title={props.title} user={user} />
          <div className="app-layout__page-content">{props.children}</div>
        </main>
      </div>
    </div>
  );
}
