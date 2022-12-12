import { AppLayout, InfoMessage } from '@/components';

import './main.scss';

export function MainPage() {
  return (
    <AppLayout className="main-page" title="Главная страница">
      <InfoMessage
        className="main-page__message"
        title="Релиз 1.0.1"
        text={
          <>
            <p>Добавлены информационные сообщения на главном экране</p>
            <p>Добавлена кнопка для выхода</p>
          </>
        }
      />
      <InfoMessage
        className="main-page__message"
        title="Релиз 1.0.0"
        text={
          <>
            <p>Добавлены разделы:</p>
            <ul className="main-page__message-list">
              <li>Квартиры</li>
              <li>Города</li>
              <li>Виды из окна</li>
              <li>Математические модели</li>
              <li>Датасеты</li>
              <li>Пользователи</li>
            </ul>
          </>
        }
      />
    </AppLayout>
  );
}
