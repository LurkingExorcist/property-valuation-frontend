import './app-layout.scss';

import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { useUser } from '@/hooks';
import { PropsWithClassName } from '@/types';

import { Navbar } from './navbar';
import { Sidebar } from './sidebar';

export interface IAppLayoutProps extends PropsWithChildren, PropsWithClassName {
  title: string;
}

export function AppLayout({ className, title, children }: IAppLayoutProps) {
  const user = useUser();

  return (
    <div className="app-layout">
      <div className="app-layout__wrapper">
        <Sidebar className="app-layout__sidebar" />
        <main className="app-layout__main">
          <Navbar title={title} user={user} />
          <div className={clsx(className, 'app-layout__page-content')}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
