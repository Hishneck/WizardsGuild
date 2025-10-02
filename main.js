const API = 'http://localhost:4000';
const container = document.getElementById('cards-container');
const confirmWindow = document.getElementById('confirm')
const btnClose = document.getElementById('btn-close')
const btnConfirm = document.getElementById('btn-confirm')

function createCard(item) {
    const card = document.createElement('div');
    cart = card
    card.classList.add('card');
    card.dataset.id = item.id;
    card.innerHTML = `
        <button class="btn-remove" data-type = "btn-remove" data-index="${item.id}">X</button>
        <h2>${item.title}</h2>
        <p>ОПИСАНИЕ: ${item.description}</p>
        <p>ЗАКАЗЧИК: ${item.customerName}</p>
        <p>Статус: ${item.status}</p>
        <p>Награда: ${item.reward}</p>
        <p>Выполнить до: ${item.deadline}</p>
        <p>Дата создания: ${item.createdAt}</p>
        <img src="${item.assignee.avatar}" alt="${item.assignee.name}" width="300">
        <p>ИСПОЛЬНИТЕЛЬ: ${item.assignee.name}</p>
        <button class="btn-edit" data-type = "btn-edit"> Редактировать </button>
    `;
    const removeButton = card.querySelector('[data-type="btn-remove"]');
        removeButton.addEventListener('click', () => {
        showConfirmModal(card);
    });
    const editButton = card.querySelector('[data-type="btn-edit"]');
        editButton.addEventListener('click', () => {
        showEditModal(card);
    });

    return card 
}
// Функция показа модального окна
function showConfirmModal(card) {
    const modal = document.getElementById('confirm');
    modal.style.display = 'flex';
    // Обработчики кнопок модального окна
    document.querySelector('[id="btn-confirm"]').addEventListener('click', () => {
        removeCard(card.dataset.id);
        hideModal();
    });
    
    document.querySelector('[id="btn-close"]').addEventListener('click', () => {
        hideModal();
    });
}
// Функция скрытия модального окна
function hideModal() {
    document.getElementById('confirm').style.display = 'none';
    document.getElementById('edit').style.display ='none'
}

function showEditModal(card){
    const modalEdit = document.getElementById('edit')
    modalEdit.style.display = 'flex'

    // Получаем текущие значения
    const currentTitle = card.querySelector('h2').innerText;
    const currentDescription = card.querySelector('p:nth-child(3)').innerText.split(': ')[1];
    const cardId = card.dataset.id;
    // Заполняем поля формы
    document.getElementById('edit-title').value = currentTitle;
    document.getElementById('edit-description').value = currentDescription;

    document.querySelector('[data-action="save"]').addEventListener('click',async () =>{
        console.log('click');
        
        const newTitle = document.getElementById('edit-title').value;
        const newDescription = document.getElementById('edit-description').value;
         try {
            // Вызываем нашу новую функцию
            updateCard(cardId, newTitle, newDescription);
            
            // Обновляем UI
            updateCardUI(card, newTitle, newDescription); 
            hideModal();
        
        } catch (error) {
            console.error('Произошла ошибка при сохранении:', error);
        }
    })
    document.querySelector('[data-action="cancel"]').addEventListener('click', () =>{
        hideModal()
    })
}

