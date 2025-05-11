import AuthService from '../services/authService';

export class Register {
    constructor() {
        this.createRegisterForm();
        this.addEventListeners();
    }

    createRegisterForm() {
        const container = document.createElement('div');
        container.className = 'flex min-h-screen items-center justify-center bg-gray-900';
        
        container.innerHTML = `
            <div class="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                <h2 class="text-3xl font-bold mb-6 text-white text-center">Create Account</h2>
                <form id="registerForm" class="space-y-4">
                    <div>
                        <label class="block text-white mb-2" for="username">Username</label>
                        <input type="text" id="username" 
                            class="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                            required>
                    </div>
                    <div>
                        <label class="block text-white mb-2" for="displayName">Display Name</label>
                        <input type="text" id="displayName" 
                            class="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                            required>
                    </div>
                    <div>
                        <label class="block text-white mb-2" for="age">Age</label>
                        <input type="number" id="age" min="4" max="10"
                            class="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                            required>
                    </div>
                    <div>
                        <label class="block text-white mb-2" for="password">Password</label>
                        <input type="password" id="password" 
                            class="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                            required>
                    </div>
                    <div>
                        <label class="block text-white mb-2" for="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" 
                            class="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                            required>
                    </div>
                    <div>
                        <label class="block text-white mb-2">Account Type</label>
                        <select id="role" 
                            class="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none">
                            <option value="STUDENT">Student</option>
                            <option value="PARENT">Parent</option>
                            <option value="TEACHER">Teacher</option>
                        </select>
                    </div>
                    <button type="submit" 
                        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200">
                        Register
                    </button>
                </form>
                <p class="text-center mt-4 text-gray-400">
                    Already have an account? 
                    <a href="#" id="loginLink" class="text-blue-500 hover:text-blue-400">Login</a>
                </p>
                <div id="errorMessage" class="mt-4 text-red-500 text-center hidden"></div>
            </div>
        `;

        document.body.appendChild(container);
        this.container = container;
    }

    addEventListeners() {
        const form = this.container.querySelector('#registerForm');
        const loginLink = this.container.querySelector('#loginLink');
        const errorMessage = this.container.querySelector('#errorMessage');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = form.querySelector('#username').value;
            const displayName = form.querySelector('#displayName').value;
            const age = parseInt(form.querySelector('#age').value);
            const password = form.querySelector('#password').value;
            const confirmPassword = form.querySelector('#confirmPassword').value;
            const role = form.querySelector('#role').value;

            if (password !== confirmPassword) {
                errorMessage.textContent = 'Passwords do not match';
                errorMessage.classList.remove('hidden');
                return;
            }

            try {
                await AuthService.register({
                    username,
                    password,
                    displayName,
                    age,
                    role
                });
                window.location.href = '/login'; // Redirect to login page after successful registration
            } catch (error) {
                errorMessage.textContent = 'Registration failed. Please try again.';
                errorMessage.classList.remove('hidden');
            }
        });

        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '/login';
        });
    }

    destroy() {
        if (this.container) {
            this.container.remove();
        }
    }
}
