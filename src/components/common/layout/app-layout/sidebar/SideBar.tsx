import './sidebar.scss';

import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import addressBookIcon from '@/assets/icons/address-book-icon.svg';
import eyeIcon from '@/assets/icons/eye-icon.svg';
import houseIcon from '@/assets/icons/house-icon.svg';
import mapPinIcon from '@/assets/icons/map-pin-icon.svg';
import mathIcon from '@/assets/icons/math-icon.svg';
import logo from '@/assets/images/logo.svg';

import { ROUTE_NAMES } from '@/constants';
import { PropsWithClassName } from '@/types';

import { RouteNode } from './components';

export interface ISidebarProps extends PropsWithClassName {}

export function Sidebar(props: ISidebarProps) {
  const navigate = useNavigate();

  return (
    <div className={clsx(props.className, 'sidebar')}>
      <div className="sidebar__logo" onClick={() => navigate(ROUTE_NAMES.MAIN)}>
        <img className="sidebar__logo-img" src={logo} />
        <div className="sidebar__logo-title">
          Модели оценки стоимости квартир
        </div>
      </div>
      <div className="sidebar__routes-tree">
        <RouteNode
          icon={<img src={houseIcon} />}
          title="Квартиры"
          path={ROUTE_NAMES.APARTMENTS}
        >
          <RouteNode
            icon={<img src={mapPinIcon} />}
            title="Города"
            path={ROUTE_NAMES.CITIES}
          />
          <RouteNode
            icon={<img src={eyeIcon} />}
            title="Виды из окна"
            path={ROUTE_NAMES.VIEWS_IN_WINDOW}
          />
        </RouteNode>
        <RouteNode
          icon={<img src={addressBookIcon} />}
          title="Пользователи"
          path={ROUTE_NAMES.USERS}
        />
        <RouteNode
          icon={<img src={mathIcon} />}
          title="Мат. модели"
          path={ROUTE_NAMES.MATH_MODELS}
        />
      </div>
    </div>
  );
}
