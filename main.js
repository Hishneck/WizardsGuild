const API = 'http://localhost:4000';


document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cards-container');
    
    fetch(`http://localhost:4000/orders`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка загрузки данных');
            }
            return response.json();
        })
        .then(data => {
            // Создаем карточки
            const cards = data.map(item => createCard(item));
            container.append(...cards);
        })
        .catch(error => {
            console.error('Произошла ошибка:', error);
            container.innerHTML = '<p>Не удалось загрузить данные</p>';
        });
});

function createCard(item) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    card.innerHTML = `
        <button id:"remove">X</button>
        <h2>${item.title}</h2>
        <p>ОПИСАНИЕ: ${item.description}</p>
        <p>ЗАКАЗЧИК: ${item.customerName}</p>
        <p>Статус: ${item.status}</p>
        <p>Награда: ${item.reward}</p>
        <p>Выполнить до: ${item.deadline}</p>
        <p>Дата создания: ${item.createdAt}</p>
        <img src="${item.assignee.avatar}" alt="${item.assignee.name}" width="300">
        <p>ИСПОЛЬНИТЕЛЬ: ${item.assignee.name}</p>
    `;
    
    return card;
}