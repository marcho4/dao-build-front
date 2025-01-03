import React, { useEffect, useState } from 'react';

export default function Modal({ isOpen, type, cardId, onClose }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        if (isOpen && type && cardId) {
            // Здесь делаем запрос к внешнему API
            // Например, pseudoFetchData - это некий метод, который по type и cardId
            // вернёт нам нужные данные
            pseudoFetchData(type, cardId).then((resp) => {
                setData(resp);
            });
        } else {
            // Если модалка закрывается, то данные "сбрасываем"
            setData(null);
        }
    }, [isOpen, type, cardId]);

    if (!isOpen) {
        return null; // Модалка скрыта
    }

    // Рендерим контент в зависимости от типа
    let content = null;
    if (type === 'subscription') {
        content = data ? (
            <div>
                <h2>Подробная информация о подписке</h2>
                <p>Название: {data.title}</p>
                <p>Стоимость: {data.price}</p>
                {/* ... и т.д. */}
            </div>
        ) : (
            <p>Загрузка...</p>
        );
    } else if (type === 'community') {
        content = data ? (
            <div>
                <h2>Меню управления сообществом</h2>
                <p>Название сообщества: {data.title}</p>
                <button>Редактировать</button>
                <button>Удалить</button>
                {/* ... и т.д. */}
            </div>
        ) : (
            <p>Загрузка...</p>
        );
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className="modal-close">
                    X
                </button>
                {content}
            </div>
        </div>
    );
}

// Заглушка для запроса данных
function pseudoFetchData(type, cardId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (type === 'subscription') {
                resolve({ id: cardId, title: 'Подписка №1', price: '10$ в месяц' });
            } else if (type === 'community') {
                resolve({ id: cardId, title: 'Сообщество №1' });
            }
        }, 1000);
    });
}