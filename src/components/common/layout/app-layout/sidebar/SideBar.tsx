import './sidebar.scss';

import {
  ApartmentOutlined,
  DatasetOutlined,
  LocationOnOutlined,
  PeopleOutlined,
  VisibilityOutlined,
} from '@mui/icons-material';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import mathIconSrc from '@/assets/icons/math-icon.svg';
import logoIconSrc from '@/assets/images/logo.svg';

import { ROUTE_NAMES } from '@/constants';
import { PropsWithClassName } from '@/types';

import { RouteNode } from './components';

export interface ISidebarProps extends PropsWithClassName {}

export function Sidebar(props: ISidebarProps) {
  const navigate = useNavigate();

  return (
    <div className={clsx(props.className, 'sidebar')}>
      <div className="sidebar__logo" onClick={() => navigate(ROUTE_NAMES.MAIN)}>
        <img className="sidebar__logo-img" src={logoIconSrc} />
        <div className="sidebar__logo-title">
          Модели оценки стоимости квартир
        </div>
      </div>
      <div className="sidebar__routes-tree">
        <RouteNode
          icon={<ApartmentOutlined />}
          title="Квартиры"
          path={ROUTE_NAMES.APARTMENTS}
        >
          <RouteNode
            icon={<LocationOnOutlined />}
            title="Города"
            path={ROUTE_NAMES.CITIES}
          />
          <RouteNode
            icon={<VisibilityOutlined />}
            title="Виды из окна"
            path={ROUTE_NAMES.VIEWS_IN_WINDOW}
          />
        </RouteNode>
        <RouteNode
          icon={<img src={mathIconSrc} />}
          title="Мат. модели"
          path={ROUTE_NAMES.MATH_MODELS}
        >
          <RouteNode
            icon={<DatasetOutlined />}
            title="Датасеты"
            path={ROUTE_NAMES.DATASETS}
          />
        </RouteNode>
        <RouteNode
          icon={<PeopleOutlined />}
          title="Пользователи"
          path={ROUTE_NAMES.USERS}
        />
      </div>
    </div>
  );
}
