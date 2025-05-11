export class AdminDashboard {
    constructor() {
        this.createDashboard();
        this.addEventListeners();
    }

    createDashboard() {
        const container = document.createElement('div');
        container.className = 'min-h-screen bg-gray-900';
        
        container.innerHTML = `
            <nav class="bg-gray-800 p-4">
                <div class="container mx-auto flex justify-between items-center">
                    <h1 class="text-white text-2xl font-bold">EduRacer Admin</h1>
                    <button id="logoutBtn" class="text-white hover:text-gray-300">Logout</button>
                </div>
            </nav>
            
            <div class="container mx-auto px-4 py-8">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Questions Management Card -->
                    <div class="bg-gray-800 rounded-lg p-6 shadow-lg">
                        <h2 class="text-xl font-bold text-white mb-4">Questions Management</h2>
                        <p class="text-gray-400 mb-4">Add, edit, or remove questions for different game modes</p>
                        <button id="manageQuestionsBtn" 
                            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200">
                            Manage Questions
                        </button>
                    </div>

                    <!-- User Management Card -->
                    <div class="bg-gray-800 rounded-lg p-6 shadow-lg">
                        <h2 class="text-xl font-bold text-white mb-4">User Management</h2>
                        <p class="text-gray-400 mb-4">View and manage user accounts and permissions</p>
                        <button id="manageUsersBtn" 
                            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200">
                            Manage Users
                        </button>
                    </div>

                    <!-- Analytics Card -->
                    <div class="bg-gray-800 rounded-lg p-6 shadow-lg">
                        <h2 class="text-xl font-bold text-white mb-4">Analytics</h2>
                        <p class="text-gray-400 mb-4">View game statistics and user performance</p>
                        <button id="viewAnalyticsBtn" 
                            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200">
                            View Analytics
                        </button>
                    </div>
                </div>

                <!-- Quick Stats -->
                <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="bg-gray-800 rounded-lg p-6 shadow-lg">
                        <h3 class="text-lg font-semibold text-white mb-2">Total Users</h3>
                        <p class="text-3xl font-bold text-blue-500" id="totalUsers">Loading...</p>
                    </div>
                    <div class="bg-gray-800 rounded-lg p-6 shadow-lg">
                        <h3 class="text-lg font-semibold text-white mb-2">Active Games Today</h3>
                        <p class="text-3xl font-bold text-green-500" id="activeGames">Loading...</p>
                    </div>
                    <div class="bg-gray-800 rounded-lg p-6 shadow-lg">
                        <h3 class="text-lg font-semibold text-white mb-2">Questions Answered</h3>
                        <p class="text-3xl font-bold text-purple-500" id="questionsAnswered">Loading...</p>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(container);
        this.container = container;
        this.loadStats();
    }

    async loadStats() {
        try {
            const response = await fetch('http://localhost:8080/api/admin/stats', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const stats = await response.json();
            
            document.getElementById('totalUsers').textContent = stats.totalUsers;
            document.getElementById('activeGames').textContent = stats.activeGames;
            document.getElementById('questionsAnswered').textContent = stats.questionsAnswered;
        } catch (error) {
            console.error('Failed to load stats:', error);
        }
    }

    addEventListeners() {
        const logoutBtn = this.container.querySelector('#logoutBtn');
        const manageQuestionsBtn = this.container.querySelector('#manageQuestionsBtn');
        const manageUsersBtn = this.container.querySelector('#manageUsersBtn');
        const viewAnalyticsBtn = this.container.querySelector('#viewAnalyticsBtn');

        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.href = '/login';
        });

        manageQuestionsBtn.addEventListener('click', () => {
            window.location.href = '/admin/questions';
        });

        manageUsersBtn.addEventListener('click', () => {
            window.location.href = '/admin/users';
        });

        viewAnalyticsBtn.addEventListener('click', () => {
            window.location.href = '/admin/analytics';
        });
    }

    destroy() {
        if (this.container) {
            this.container.remove();
        }
    }
}
