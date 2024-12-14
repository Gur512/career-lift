import { select, listen } from './utils.js';

async function fetchAndDisplayUsers() {
    try {
        const response = await fetch('https://randomuser.me/api/?nat=CA&results=10');
        const data = await response.json();
        const users = data.results;

        const container = select('.random-users');

        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.classList.add('user-card');

            const addFriendIcon = document.createElement('i');
            addFriendIcon.className = 'fas fa-user-plus add-friend';
            addFriendIcon.title = 'Add Friend';

            addFriendIcon.addEventListener('click', () => {
                addFriendIcon.classList.remove('fa-user-plus');
                addFriendIcon.classList.add('fa-check'); // Change icon to checkmark
                addFriendIcon.style.color = 'green';
                addFriendIcon.title = 'Friend Added';

                const confirmation = document.createElement('span');
                confirmation.className = 'friend-confirmation';
                confirmation.textContent = `${user.name.first} ${user.name.last} added as a friend!`;
                userCard.appendChild(confirmation);

                setTimeout(() => {
                    confirmation.remove();
                }, 3000);
            });

            userCard.innerHTML = `
                <img src="${user.picture.medium}" alt="Profile of ${user.name.first} ${user.name.last}">
                <div class="user-info">
                    <p class="user-name">${user.name.first} ${user.name.last}</p>
                    <p class="user-city">${user.location.city}</p>
                </div>
            `;

            userCard.appendChild(addFriendIcon);
            container.appendChild(userCard);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        const container = select('.random-users');
        container.innerHTML = '<p>Unable to load users. Please try again later.</p>';
    }
}

fetchAndDisplayUsers();