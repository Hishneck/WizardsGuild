async function loadCards() {
    const container = document.getElementById('cards-container');
    container.innerHTML = ''; // Очищаем контейнер
    
    try {
        const response = await fetch('http://localhost:4000/orders');
        const data = await response.json();
        
        const cards = data.map(item => createCard(item));
        container.append(...cards);
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        container.innerHTML = '<p>Не удалось загрузить данные</p>';
    }
}

// document.addEventListener('DOMContentLoaded', () => {
//     loadCards();
// });
loadCards();
async function removeCard(id) {
    try {
        const response = await fetch(`http://localhost:4000/orders/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Ошибка при удалении');
        }
        
        // Перезагружаем данные
        await loadCards();
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

// Функция обновления карточки в базе данных
async function updateCard(cardId, newTitle, newDescription) {
    console.log('otpravka');
    try {
        // Получаем текущие данные карточки из API
        const response = await fetch(`http://localhost:4000/orders/${cardId}`);
        const currentCardData = await response.json();
            
        // Создаем объект с обновленными данными
        const updatedData = {
            ...currentCardData,
            title: newTitle,
            description: newDescription
         };
            
        // Отправляем PUT запрос
        const updateResponse = await fetch(`http://localhost:4000/orders/${cardId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });
    // updateCardUI(card, newTitle, newDescription);    
    if (!updateResponse.ok) {
            throw new Error('Ошибка при обновлении данных');
        }
    } catch (error) {
        console.error('Ошибка обновления:', error);
    }
    
    
}

function updateCardUI(card, title, description) {
    // const card = document.querySelector(`.card[data-id="${id}"]`);
    card.querySelector('h2').innerText = title;
    card.querySelector('p:nth-child(3)').innerText = `ОПИСАНИЕ: ${description}`;
}
