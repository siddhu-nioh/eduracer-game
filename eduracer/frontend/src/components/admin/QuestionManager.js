export class QuestionManager {
    constructor() {
        this.questions = [];
        this.currentPage = 1;
        this.questionsPerPage = 10;
        this.createQuestionManager();
        this.addEventListeners();
        this.loadQuestions();
    }

    createQuestionManager() {
        const container = document.createElement('div');
        container.className = 'min-h-screen bg-gray-900 p-8';
        
        container.innerHTML = `
            <div class="container mx-auto">
                <div class="flex justify-between items-center mb-8">
                    <h1 class="text-3xl font-bold text-white">Question Management</h1>
                    <button id="addQuestionBtn" 
                        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200">
                        Add New Question
                    </button>
                </div>

                <!-- Filters -->
                <div class="bg-gray-800 p-4 rounded-lg mb-8">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-white mb-2">Game Mode</label>
                            <select id="gameModeFilter" class="w-full bg-gray-700 text-white rounded p-2">
                                <option value="">All Modes</option>
                                <option value="ALPHABET">Alphabet</option>
                                <option value="NUMBERS">Numbers</option>
                                <option value="MATH">Math</option>
                                <option value="COLORS">Colors</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-white mb-2">Difficulty</label>
                            <select id="difficultyFilter" class="w-full bg-gray-700 text-white rounded p-2">
                                <option value="">All Difficulties</option>
                                <option value="1">Level 1</option>
                                <option value="2">Level 2</option>
                                <option value="3">Level 3</option>
                                <option value="4">Level 4</option>
                                <option value="5">Level 5</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-white mb-2">Status</label>
                            <select id="statusFilter" class="w-full bg-gray-700 text-white rounded p-2">
                                <option value="">All Status</option>
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Questions Table -->
                <div class="bg-gray-800 rounded-lg overflow-hidden">
                    <table class="w-full">
                        <thead>
                            <tr class="bg-gray-700">
                                <th class="px-6 py-3 text-left text-white">Question</th>
                                <th class="px-6 py-3 text-left text-white">Game Mode</th>
                                <th class="px-6 py-3 text-left text-white">Difficulty</th>
                                <th class="px-6 py-3 text-left text-white">Status</th>
                                <th class="px-6 py-3 text-left text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="questionsTableBody">
                            <!-- Questions will be inserted here -->
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div class="mt-4 flex justify-between items-center text-white">
                    <div>
                        <span id="pageInfo">Page 1 of 1</span>
                    </div>
                    <div>
                        <button id="prevPageBtn" class="px-4 py-2 bg-gray-700 rounded mr-2 disabled:opacity-50">
                            Previous
                        </button>
                        <button id="nextPageBtn" class="px-4 py-2 bg-gray-700 rounded disabled:opacity-50">
                            Next
                        </button>
                    </div>
                </div>
            </div>

            <!-- Add/Edit Question Modal -->
            <div id="questionModal" class="fixed inset-0 bg-black bg-opacity-50 hidden flex items-center justify-center">
                <div class="bg-gray-800 p-8 rounded-lg w-full max-w-2xl">
                    <h2 class="text-2xl font-bold text-white mb-6" id="modalTitle">Add New Question</h2>
                    <form id="questionForm">
                        <div class="space-y-4">
                            <div>
                                <label class="block text-white mb-2">Question Text</label>
                                <input type="text" id="questionText" class="w-full bg-gray-700 text-white rounded p-2">
                            </div>
                            <div>
                                <label class="block text-white mb-2">Game Mode</label>
                                <select id="gameMode" class="w-full bg-gray-700 text-white rounded p-2">
                                    <option value="ALPHABET">Alphabet</option>
                                    <option value="NUMBERS">Numbers</option>
                                    <option value="MATH">Math</option>
                                    <option value="COLORS">Colors</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-white mb-2">Difficulty</label>
                                <select id="difficulty" class="w-full bg-gray-700 text-white rounded p-2">
                                    <option value="1">Level 1</option>
                                    <option value="2">Level 2</option>
                                    <option value="3">Level 3</option>
                                    <option value="4">Level 4</option>
                                    <option value="5">Level 5</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-white mb-2">Correct Answer</label>
                                <input type="text" id="correctAnswer" class="w-full bg-gray-700 text-white rounded p-2">
                            </div>
                            <div>
                                <label class="block text-white mb-2">Options (comma-separated)</label>
                                <input type="text" id="options" class="w-full bg-gray-700 text-white rounded p-2">
                            </div>
                        </div>
                        <div class="mt-6 flex justify-end space-x-4">
                            <button type="button" id="cancelBtn" 
                                class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                                Cancel
                            </button>
                            <button type="submit" 
                                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                Save Question
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(container);
        this.container = container;
    }

    async loadQuestions() {
        try {
            const response = await fetch('http://localhost:8080/api/admin/questions', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            this.questions = await response.json();
            this.renderQuestions();
        } catch (error) {
            console.error('Failed to load questions:', error);
        }
    }

    renderQuestions() {
        const tbody = this.container.querySelector('#questionsTableBody');
        const startIndex = (this.currentPage - 1) * this.questionsPerPage;
        const endIndex = startIndex + this.questionsPerPage;
        const pageQuestions = this.questions.slice(startIndex, endIndex);

        tbody.innerHTML = pageQuestions.map(question => `
            <tr class="border-t border-gray-700">
                <td class="px-6 py-4 text-white">${question.questionText}</td>
                <td class="px-6 py-4 text-white">${question.gameMode}</td>
                <td class="px-6 py-4 text-white">Level ${question.difficulty}</td>
                <td class="px-6 py-4">
                    <span class="px-2 py-1 rounded ${question.active ? 'bg-green-600' : 'bg-red-600'} text-white">
                        ${question.active ? 'Active' : 'Inactive'}
                    </span>
                </td>
                <td class="px-6 py-4">
                    <button class="text-blue-400 hover:text-blue-300 mr-2" 
                        onclick="editQuestion(${question.id})">Edit</button>
                    <button class="text-red-400 hover:text-red-300"
                        onclick="deleteQuestion(${question.id})">Delete</button>
                </td>
            </tr>
        `).join('');

        // Update pagination
        const totalPages = Math.ceil(this.questions.length / this.questionsPerPage);
        this.container.querySelector('#pageInfo').textContent = `Page ${this.currentPage} of ${totalPages}`;
        this.container.querySelector('#prevPageBtn').disabled = this.currentPage === 1;
        this.container.querySelector('#nextPageBtn').disabled = this.currentPage === totalPages;
    }

    addEventListeners() {
        // Add event listeners for pagination, filters, and modal actions
        const prevPageBtn = this.container.querySelector('#prevPageBtn');
        const nextPageBtn = this.container.querySelector('#nextPageBtn');
        const addQuestionBtn = this.container.querySelector('#addQuestionBtn');
        const cancelBtn = this.container.querySelector('#cancelBtn');
        const questionForm = this.container.querySelector('#questionForm');
        const modal = this.container.querySelector('#questionModal');

        prevPageBtn.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderQuestions();
            }
        });

        nextPageBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(this.questions.length / this.questionsPerPage);
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.renderQuestions();
            }
        });

        addQuestionBtn.addEventListener('click', () => {
            modal.classList.remove('hidden');
        });

        cancelBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        questionForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(questionForm);
            const questionData = {
                questionText: formData.get('questionText'),
                gameMode: formData.get('gameMode'),
                difficulty: parseInt(formData.get('difficulty')),
                correctAnswer: formData.get('correctAnswer'),
                options: formData.get('options').split(',').map(opt => opt.trim()),
                active: true
            };

            try {
                await this.saveQuestion(questionData);
                modal.classList.add('hidden');
                await this.loadQuestions();
            } catch (error) {
                console.error('Failed to save question:', error);
            }
        });
    }

    async saveQuestion(questionData) {
        await fetch('http://localhost:8080/api/admin/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(questionData)
        });
    }

    destroy() {
        if (this.container) {
            this.container.remove();
        }
    }
}
