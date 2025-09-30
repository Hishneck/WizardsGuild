const API = 'http://localhost:4000';
const container = document.getElementById('cards-container');
const confirmWindow = document.getElementById('confirm')
const btnClose = document.getElementById('btn-close')
const btnConfirm = document.getElementById('btn-confirm')
const btnRemove = document.getElementById('btn-remove')

document.addEventListener('DOMContentLoaded', () => {
    
    
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
    card.dataset.id = item.id; 
    card.addEventListener('click', () => {
        handleCardClick(item.id);
    });
    card.innerHTML = `
        <button data-type = "btn-remove" data-index="${item.id}">X</button>
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

container.onclick = function(event){
    if (event.target.dataset.id){
        const index = parseInt(event.target.dataset.id)
        const type = event.target.dataset.type
        if (type==='btn-remove'){
            confirmOpen(index)
        }
        render()
    }
}

const confirmOpen =function(){
    confirmWindow.classList.toggle('active')
    btnClose.onclick = ()=>{
        confirmWindow.classList.remove('active')
    }
    btnConfirm.onclick=()=>{
        confirmWindow.classList.remove('active')
        console.log('dsahwodacfawdsa')
    }
    
}
function handleCardClick(id) {
    console.log('Выбран ID:', id);
    // Здесь можно добавить логику обработки клика
}
