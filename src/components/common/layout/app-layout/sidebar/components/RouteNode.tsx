import clsx from 'clsx';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import arrowIcon from '@/assets/icons/arrow-icon.svg';

import { PropsWithClassName } from '@/types';

import './route-node.scss';

export interface IRouteNodeProps
  extends React.PropsWithChildren,
    PropsWithClassName {
  icon: React.ReactNode;
  title: string;
  path: string;
}

export function RouteNode(props: IRouteNodeProps) {
  const [isExpanded, setIsExpanded] = React.useState(true);
  return (
    <div className={clsx(props.className, 'route-node')}>
      <div className="route-node__parent">
        <NavLink className="route-node__title-group" to={props.path}>
          <div className="route-node__parent-icon">{props.icon}</div>
          <div className="route-node__parent-title">{props.title}</div>
        </NavLink>
        {props.children && (
          <div
            className={clsx(
              'route-node__expand-btn',
              isExpanded && 'route-node__expand-btn--expanded'
            )}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <img className="route-node__expand-icon" src={arrowIcon} />
          </div>
        )}
      </div>
      {isExpanded && (
        <div className="route-node__children">{props.children}</div>
      )}
    </div>
  );
}
