document.addEventListener('DOMContentLoaded', () => {
    const adminForm = document.getElementById('admin-form');
    const userNameInput = document.getElementById('user-name');
    const userEmailInput = document.getElementById('user-email');
    const clearFormBtn = document.getElementById('clear-form-btn');
    const searchInput = document.getElementById('search-input');
    const deleteAllBtn = document.getElementById('delete-all-btn');
    const userList = document.getElementById('user-list');

    const STORAGE_KEY = 'cafeClubMembers';

    const getUsers = () => {
        const users = localStorage.getItem(STORAGE_KEY);
        return users ? JSON.parse(users) : [];
    };

    const saveUsers = (users) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    };

    const renderUsers = (usersToRender) => {
        userList.innerHTML = '';
        const users = usersToRender || getUsers();
        
        if (users.length === 0) {
            userList.innerHTML = '<li style="background: none; border: none; text-align: center; color: #666;">Nenhum membro cadastrado.</li>';
            return;
        }

        users.forEach(user => {
            const li = document.createElement('li');
            li.dataset.id = user.id;
            
            li.innerHTML = `
                <div class="user-info">
                    <span class="user-name">${user.name}</span>
                    <span class="user-email">${user.email}</span>
                    <span class="user-date">Cadastrado em: ${new Date(user.date).toLocaleDateString('pt-BR')}</span>
                </div>
                <button class="delete-btn" title="Excluir membro">Excluir</button>
            `;
            userList.appendChild(li);
        });
    };
    
    adminForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        const users = getUsers();
        
        const newUser = {
            id: Date.now().toString(),
            name: userNameInput.value.trim(),
            email: userEmailInput.value.trim(),
            date: new Date().toISOString()
        };
        
        users.push(newUser); 
        saveUsers(users); 
        renderUsers(); 
        adminForm.reset(); 
    });

    clearFormBtn.addEventListener('click', () => {
        adminForm.reset();
    });

    userList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const li = e.target.closest('li'); 
            const userId = li.dataset.id;
            
            let users = getUsers();
            users = users.filter(user => user.id !== userId);
            
            saveUsers(users);
            renderUsers();
        }
    });

    deleteAllBtn.addEventListener('click', () => {
        const users = getUsers();
        if (users.length === 0) {
            alert('Não há membros cadastrados para excluir.');
            return;
        }

        if (confirm('Tem certeza que deseja excluir todos os membros?')) {
            localStorage.removeItem(STORAGE_KEY);
            renderUsers(); 
        }
    });

    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const users = getUsers();
        
        const filteredUsers = users.filter(user => 
            user.name.toLowerCase().includes(searchTerm) || 
            user.email.toLowerCase().includes(searchTerm)
        );
        
        renderUsers(filteredUsers);
    });
    
    renderUsers();
});

