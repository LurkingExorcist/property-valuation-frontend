import './navbar.scss';

import clsx from 'clsx';

import { UserEntity } from '@/domain';

import { PropsWithClassName } from '@/types';

export interface INavbarProps extends PropsWithClassName {
  title: string;
  user: UserEntity | null;
}

export function Navbar({ className, title, user }: INavbarProps) {
  return (
    <div className={clsx(className, 'navbar')}>
      <div className="navbar__group navbar__group--main">
        <div className="navbar__page-title">{title}</div>
      </div>
      {user && (
        <>
          <div className="navbar__divider"></div>
          <div className="navbar__group">
            <div className="navbar__username">{user.username}</div>
            <div className="navbar__profile">
              <div
                className="navbar__profile-circle"
                style={{ backgroundColor: `#${user.id.slice(0, 6)}` }}
              />
              <div className="navbar__profile-icon">{user.username[0]}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
