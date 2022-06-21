import './navbar.scss';

import clsx from 'clsx';

import { User } from '@/domain';

import { CNProps } from '@/types';

export interface INavbarProps extends CNProps {
  title: string;
  user: User;
}

export function Navbar(props: INavbarProps) {
  return (
    <div className={clsx(props.className, 'navbar')}>
      <div className="navbar__group navbar__group--main">
        <div className="navbar__page-title">{props.title}</div>
      </div>
      <div className="navbar__divider"></div>
      <div className="navbar__group">
        <div className="navbar__username">{props.user.username}</div>
        <div
          className="navbar__profile"
          style={{ backgroundColor: `#${props.user.id.slice(0, 6)}` }}
        >
          <div className="navbar__profile-icon">{props.user.username[0]}</div>
        </div>
      </div>
    </div>
  );
}
