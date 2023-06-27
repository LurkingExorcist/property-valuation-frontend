import './navbar.scss';

import { Logout } from '@mui/icons-material';
import { Button, ClickAwayListener, Fade, Paper, Popper } from '@mui/material';
import clsx from 'clsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToggle } from 'react-use';

import { UserEntity } from '@/domain';

import { ROUTE_NAMES } from '@/constants';
import { authSlice } from '@/store';
import { PropsWithClassName } from '@/types';

export interface INavbarProps extends PropsWithClassName {
  title: string;
  user: UserEntity | null;
}

export function Navbar({ className, title, user }: INavbarProps) {
  const navigate = useNavigate();
  const [isProfileOpened, toggleProfile] = useToggle(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState<HTMLDivElement | null>(
    null
  );

  const logout = () => {
    authSlice.actions.setToken(null);
    navigate(ROUTE_NAMES.AUTHENTICATION);
  };

  return (
    <div className={clsx(className, 'navbar')}>
      <div className="navbar__group navbar__group--main">
        <div className="navbar__page-title">{title}</div>
      </div>
      {user && (
        <>
          <div className="navbar__divider"></div>
          <div
            className="navbar__group navbar__group--profile"
            onClick={(event) => {
              setProfileAnchorEl(event.currentTarget);
              toggleProfile(true);
            }}
          >
            <div className="navbar__username">{user.username}</div>
            <div className="navbar__profile">
              <div
                className="navbar__profile-circle"
                style={{ backgroundColor: `#${user.id.slice(0, 6)}` }}
              />
              <div className="navbar__profile-icon">{user.username[0]}</div>
            </div>
          </div>
          <Popper
            open={isProfileOpened}
            anchorEl={profileAnchorEl}
            placement="bottom-end"
            modifiers={[{ name: 'offset', options: { offset: [0, 16] } }]}
            transition
          >
            {({ TransitionProps }) => (
              <ClickAwayListener onClickAway={() => toggleProfile()}>
                <Fade {...TransitionProps} timeout={350}>
                  <Paper className="navbar__profile-panel">
                    <Button
                      variant="text"
                      startIcon={<Logout />}
                      onClick={() => logout()}
                    >
                      Выйти
                    </Button>
                  </Paper>
                </Fade>
              </ClickAwayListener>
            )}
          </Popper>
        </>
      )}
    </div>
  );
}
