import Chart from 'chart.js/auto';

export class Analytics {
    constructor() {
        this.createAnalytics();
        this.loadData();
    }

    createAnalytics() {
        const container = document.createElement('div');
        container.className = 'min-h-screen bg-gray-900 p-8';
        
        container.innerHTML = `
            <div class="container mx-auto">
                <h1 class="text-3xl font-bold text-white mb-8">Analytics Dashboard</h1>
                
                <!-- Time Range Filter -->
                <div class="bg-gray-800 p-4 rounded-lg mb-8">
                    <div class="flex items-center space-x-4">
                        <label class="text-white">Time Range:</label>
                        <select id="timeRange" class="bg-gray-700 text-white rounded p-2">
                            <option value="day">Last 24 Hours</option>
                            <option value="week">Last Week</option>
                            <option value="month">Last Month</option>
                            <option value="year">Last Year</option>
                        </select>
                    </div>
                </div>

                <!-- Charts Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- User Activity Chart -->
                    <div class="bg-gray-800 p-6 rounded-lg">
                        <h2 class="text-xl font-bold text-white mb-4">User Activity</h2>
                        <canvas id="userActivityChart"></canvas>
                    </div>

                    <!-- Performance by Game Mode -->
                    <div class="bg-gray-800 p-6 rounded-lg">
                        <h2 class="text-xl font-bold text-white mb-4">Performance by Game Mode</h2>
                        <canvas id="gameModeChart"></canvas>
                    </div>

                    <!-- Difficulty Distribution -->
                    <div class="bg-gray-800 p-6 rounded-lg">
                        <h2 class="text-xl font-bold text-white mb-4">Difficulty Distribution</h2>
                        <canvas id="difficultyChart"></canvas>
                    </div>

                    <!-- Learning Progress -->
                    <div class="bg-gray-800 p-6 rounded-lg">
                        <h2 class="text-xl font-bold text-white mb-4">Learning Progress</h2>
                        <canvas id="progressChart"></canvas>
                    </div>
                </div>

                <!-- Detailed Stats -->
                <div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="bg-gray-800 p-6 rounded-lg">
                        <h3 class="text-lg font-semibold text-white mb-2">Average Session Time</h3>
                        <p class="text-3xl font-bold text-blue-500" id="avgSessionTime">Loading...</p>
                    </div>
                    <div class="bg-gray-800 p-6 rounded-lg">
                        <h3 class="text-lg font-semibold text-white mb-2">Completion Rate</h3>
                        <p class="text-3xl font-bold text-green-500" id="completionRate">Loading...</p>
                    </div>
                    <div class="bg-gray-800 p-6 rounded-lg">
                        <h3 class="text-lg font-semibold text-white mb-2">Active Users</h3>
                        <p class="text-3xl font-bold text-purple-500" id="activeUsers">Loading...</p>
                    </div>
                    <div class="bg-gray-800 p-6 rounded-lg">
                        <h3 class="text-lg font-semibold text-white mb-2">Total Games Played</h3>
                        <p class="text-3xl font-bold text-yellow-500" id="totalGames">Loading...</p>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(container);
        this.container = container;
    }

    async loadData() {
        try {
            const timeRange = this.container.querySelector('#timeRange').value;
            const response = await fetch(`http://localhost:8080/api/admin/analytics?timeRange=${timeRange}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            this.updateCharts(data);
            this.updateStats(data);
        } catch (error) {
            console.error('Failed to load analytics data:', error);
        }
    }

    updateCharts(data) {
        // User Activity Chart
        new Chart(document.getElementById('userActivityChart'), {
            type: 'line',
            data: {
                labels: data.userActivity.labels,
                datasets: [{
                    label: 'Active Users',
                    data: data.userActivity.data,
                    borderColor: '#3B82F6',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#fff'
                        }
                    }
                },
                scales: {
                    y: {
                        ticks: { color: '#fff' }
                    },
                    x: {
                        ticks: { color: '#fff' }
                    }
                }
            }
        });

        // Game Mode Performance Chart
        new Chart(document.getElementById('gameModeChart'), {
            type: 'bar',
            data: {
                labels: data.gameModePerformance.labels,
                datasets: [{
                    label: 'Average Score',
                    data: data.gameModePerformance.data,
                    backgroundColor: ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#fff'
                        }
                    }
                },
                scales: {
                    y: {
                        ticks: { color: '#fff' }
                    },
                    x: {
                        ticks: { color: '#fff' }
                    }
                }
            }
        });

        // Similar chart creation for difficulty and progress charts...
    }

    updateStats(data) {
        document.getElementById('avgSessionTime').textContent = data.stats.avgSessionTime;
        document.getElementById('completionRate').textContent = data.stats.completionRate + '%';
        document.getElementById('activeUsers').textContent = data.stats.activeUsers;
        document.getElementById('totalGames').textContent = data.stats.totalGames;
    }

    destroy() {
        if (this.container) {
            this.container.remove();
        }
    }
}
