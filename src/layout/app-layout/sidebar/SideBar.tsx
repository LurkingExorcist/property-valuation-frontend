import './sidebar.scss';

import clsx from 'clsx';

import { ROUTE_NAMES } from '@/config';

import houseIcon from '@/assets/icons/house-icon.svg';
import logo from '@/assets/images/logo.svg';

import { CNProps } from '@/types';

import { RouteNode } from './components';

export interface ISidebarProps extends CNProps {}

export function Sidebar(props: ISidebarProps) {
  return (
    <div className={clsx(props.className, 'sidebar')}>
      <div className="sidebar__logo">
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
            icon={<img src={houseIcon} />}
            title="Города"
            path={ROUTE_NAMES.CITIES}
          />
          <RouteNode
            icon={<img src={houseIcon} />}
            title="Виды из окна"
            path={ROUTE_NAMES.VIEWS_IN_WINDOW}
          />
        </RouteNode>
        <RouteNode
          icon={<img src={houseIcon} />}
          title="Пользователи"
          path={ROUTE_NAMES.USERS}
        />
        <RouteNode
          icon={<img src={houseIcon} />}
          title="Мат. модели"
          path={ROUTE_NAMES.MATH_MODELS}
        />
      </div>
    </div>
  );
}
