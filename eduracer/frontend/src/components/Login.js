import AuthService from '../services/authService';

export class Login {
    constructor() {
        this.createLoginForm();
        this.addEventListeners();
    }

    createLoginForm() {
        const container = document.createElement('div');
        container.className = 'flex min-h-screen items-center justify-center bg-gray-900';
        
        container.innerHTML = `
            <div class="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                <h2 class="text-3xl font-bold mb-6 text-white text-center">Login to EduRacer</h2>
                <form id="loginForm" class="space-y-4">
                    <div>
                        <label class="block text-white mb-2" for="username">Username</label>
                        <input type="text" id="username" 
                            class="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                            required>
                    </div>
                    <div>
                        <label class="block text-white mb-2" for="password">Password</label>
                        <input type="password" id="password" 
                            class="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                            required>
                    </div>
                    <button type="submit" 
                        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200">
                        Login
                    </button>
                </form>
                <p class="text-center mt-4 text-gray-400">
                    Don't have an account? 
                    <a href="#" id="registerLink" class="text-blue-500 hover:text-blue-400">Register</a>
                </p>
                <div id="errorMessage" class="mt-4 text-red-500 text-center hidden"></div>
            </div>
        `;

        document.body.appendChild(container);
        this.container = container;
    }

    addEventListeners() {
        const form = this.container.querySelector('#loginForm');
        const registerLink = this.container.querySelector('#registerLink');
        const errorMessage = this.container.querySelector('#errorMessage');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = form.querySelector('#username').value;
            const password = form.querySelector('#password').value;

            try {
                await AuthService.login(username, password);
                window.location.href = '/game'; // Redirect to game page after successful login
            } catch (error) {
                errorMessage.textContent = 'Invalid username or password';
                errorMessage.classList.remove('hidden');
            }
        });

        registerLink.addEventListener('click', (e) => {
            e.preventDefault();
            // Navigate to register page
            window.location.href = '/register';
        });
    }

    destroy() {
        if (this.container) {
            this.container.remove();
        }
    }
}
