// State management
let mediaRecorder;
let audioChunks = [];
let timerInterval;
let recordingSeconds = 0;
let isRecording = false;
let hasRecorded = false;
let recordedAudioBlob = null;

// DOM elements
const startRecordingBtn = document.getElementById('startRecordingBtn');
const recordingModal = document.getElementById('recordingModal');
const closeModal = document.getElementById('closeModal');
const toggleRecordBtn = document.getElementById('toggleRecordBtn');
const analyzeBtn = document.getElementById('analyzeBtn');
const recordingStatus = document.getElementById('recordingStatus');
const recordingTimerDisplay = document.getElementById('recordingTimer');
const visualizer = document.getElementById('visualizer');
const kanbanSection = document.getElementById('kanban');
const backToLanding = document.getElementById('backToLanding');

// Navigation elements
const navBrand = document.getElementById('navBrand');
const featuresLink = document.getElementById('featuresLink');
const howItWorksLink = document.getElementById('howItWorksLink');
const getStartedBtn = document.getElementById('getStartedBtn');

// Save/Load elements
const saveRoadmapBtn = document.getElementById('saveRoadmapBtn');
const viewSavedBtn = document.getElementById('viewSavedBtn');
const savedRoadmapsModal = document.getElementById('savedRoadmapsModal');
const closeSavedModal = document.getElementById('closeSavedModal');
const savedRoadmapsList = document.getElementById('savedRoadmapsList');

// Product frameworks database for simulation
const frameworks = [
    {
        name: 'Lean Startup',
        description: 'Build-Measure-Learn approach for rapid iteration',
        phases: [
            { title: 'Problem Validation', description: 'Identify and validate the core problem', priority: 'high', tags: ['Research', 'User Interviews'] },
            { title: 'Build MVP', description: 'Create minimum viable product', priority: 'high', tags: ['Development', 'Core Features'] },
            { title: 'Measure Metrics', description: 'Define and track key metrics', priority: 'medium', tags: ['Analytics', 'KPIs'] },
            { title: 'Customer Feedback Loop', description: 'Gather and analyze user feedback', priority: 'high', tags: ['User Research', 'Iteration'] },
            { title: 'Pivot or Persevere', description: 'Decide on direction based on data', priority: 'medium', tags: ['Strategy', 'Decision Making'] },
            { title: 'Scale Marketing', description: 'Expand marketing efforts', priority: 'low', tags: ['Marketing', 'Growth'] }
        ]
    },
    {
        name: 'Design Thinking',
        description: 'Human-centered approach to innovation',
        phases: [
            { title: 'Empathize with Users', description: 'Deep dive into user needs and pain points', priority: 'high', tags: ['User Research', 'Interviews'] },
            { title: 'Define Problem Statement', description: 'Clearly articulate the problem to solve', priority: 'high', tags: ['Problem Definition', 'Strategy'] },
            { title: 'Ideate Solutions', description: 'Brainstorm multiple solution approaches', priority: 'medium', tags: ['Ideation', 'Creativity'] },
            { title: 'Prototype', description: 'Build low-fidelity prototypes', priority: 'high', tags: ['Design', 'Prototyping'] },
            { title: 'Test with Users', description: 'Validate prototypes with real users', priority: 'high', tags: ['Testing', 'Validation'] },
            { title: 'Iterate and Refine', description: 'Improve based on feedback', priority: 'medium', tags: ['Iteration', 'Improvement'] }
        ]
    },
    {
        name: 'Agile Scrum',
        description: 'Iterative development with regular sprints',
        phases: [
            { title: 'Product Backlog Creation', description: 'List all features and requirements', priority: 'high', tags: ['Planning', 'Requirements'] },
            { title: 'Sprint Planning', description: 'Plan first 2-week sprint', priority: 'high', tags: ['Sprint', 'Planning'] },
            { title: 'Sprint 1 Development', description: 'Build core features in first sprint', priority: 'high', tags: ['Development', 'Sprint 1'] },
            { title: 'Daily Standups', description: 'Establish daily sync meetings', priority: 'medium', tags: ['Communication', 'Team'] },
            { title: 'Sprint Review', description: 'Demo completed work', priority: 'medium', tags: ['Review', 'Demo'] },
            { title: 'Sprint Retrospective', description: 'Reflect and improve process', priority: 'low', tags: ['Retrospective', 'Improvement'] },
            { title: 'Sprint 2 Planning', description: 'Plan next iteration', priority: 'medium', tags: ['Sprint', 'Planning'] }
        ]
    },
    {
        name: 'Jobs-to-be-Done',
        description: 'Focus on the job customers are trying to accomplish',
        phases: [
            { title: 'Identify Customer Jobs', description: 'Understand what users are trying to accomplish', priority: 'high', tags: ['Research', 'Customer Jobs'] },
            { title: 'Map Job Execution', description: 'Document how customers currently solve the problem', priority: 'high', tags: ['Process Mapping', 'Analysis'] },
            { title: 'Find Pain Points', description: 'Identify friction in current solutions', priority: 'high', tags: ['Pain Points', 'Opportunities'] },
            { title: 'Design Better Solution', description: 'Create solution that does the job better', priority: 'high', tags: ['Design', 'Solution'] },
            { title: 'Test Job Completion', description: 'Validate solution helps complete the job', priority: 'medium', tags: ['Testing', 'Validation'] },
            { title: 'Optimize Job Flow', description: 'Streamline the job completion process', priority: 'low', tags: ['Optimization', 'UX'] }
        ]
    },
    {
        name: 'Double Diamond',
        description: 'Divergent and convergent thinking in problem-solving',
        phases: [
            { title: 'Discover - Research', description: 'Broad research into the problem space', priority: 'high', tags: ['Research', 'Discovery'] },
            { title: 'Define - Synthesis', description: 'Narrow down to specific problem', priority: 'high', tags: ['Analysis', 'Problem Definition'] },
            { title: 'Develop - Ideation', description: 'Explore multiple solution concepts', priority: 'medium', tags: ['Ideation', 'Concepts'] },
            { title: 'Develop - Prototyping', description: 'Create multiple prototypes', priority: 'high', tags: ['Prototyping', 'Design'] },
            { title: 'Deliver - Testing', description: 'Test and refine solution', priority: 'high', tags: ['Testing', 'Refinement'] },
            { title: 'Deliver - Launch', description: 'Finalize and launch product', priority: 'medium', tags: ['Launch', 'Deployment'] }
        ]
    }
];

// Event listeners
startRecordingBtn.addEventListener('click', openRecordingModal);
closeModal.addEventListener('click', closeRecordingModal);
toggleRecordBtn.addEventListener('click', toggleRecording);
analyzeBtn.addEventListener('click', analyzePitch);
backToLanding.addEventListener('click', resetToLanding);

// Navigation listeners
navBrand.addEventListener('click', goToHome);
getStartedBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openRecordingModal();
});

// Save/Load listeners
saveRoadmapBtn.addEventListener('click', saveCurrentRoadmap);
viewSavedBtn.addEventListener('click', openSavedRoadmapsModal);
closeSavedModal.addEventListener('click', closeSavedRoadmapsModal);

// Click outside modal to close
recordingModal.addEventListener('click', (e) => {
    if (e.target === recordingModal) {
        closeRecordingModal();
    }
});

savedRoadmapsModal.addEventListener('click', (e) => {
    if (e.target === savedRoadmapsModal) {
        closeSavedRoadmapsModal();
    }
});

// Functions
function openRecordingModal() {
    recordingModal.classList.add('active');
    resetRecordingState();
}

function closeRecordingModal() {
    if (isRecording) {
        stopRecording();
    }
    recordingModal.classList.remove('active');
}

function resetRecordingState() {
    recordingSeconds = 0;
    hasRecorded = false;
    updateTimer();
    recordingStatus.textContent = 'Click the button below to start recording';
    toggleRecordBtn.textContent = 'Start Recording';
    analyzeBtn.style.display = 'none';
    visualizer.classList.remove('active');
}

async function toggleRecording() {
    if (!isRecording) {
        await startRecording();
    } else {
        stopRecording();
    }
}

async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            recordedAudioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            console.log('Recording completed', recordedAudioBlob);
        };

        mediaRecorder.start();
        isRecording = true;
        hasRecorded = true;

        recordingStatus.textContent = 'Recording in progress... Speak your pitch!';
        toggleRecordBtn.textContent = 'Stop Recording';
        toggleRecordBtn.classList.add('recording');
        visualizer.classList.add('active');

        startTimer();
    } catch (error) {
        console.error('Error accessing microphone:', error);
        recordingStatus.textContent = 'Error: Could not access microphone. Please check permissions.';
    }
}

function stopRecording() {
    if (mediaRecorder && isRecording) {
        mediaRecorder.stop();
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
        isRecording = false;

        stopTimer();
        recordingStatus.textContent = 'Recording completed! Click "Analyze Pitch" to continue.';
        toggleRecordBtn.textContent = 'Start New Recording';
        toggleRecordBtn.classList.remove('recording');
        visualizer.classList.remove('active');
        analyzeBtn.style.display = 'inline-block';
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        recordingSeconds++;
        updateTimer();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function updateTimer() {
    const minutes = Math.floor(recordingSeconds / 60);
    const seconds = recordingSeconds % 60;
    recordingTimerDisplay.textContent =
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

async function analyzePitch() {
    if (!recordedAudioBlob) {
        recordingStatus.textContent = 'Error: No recording found. Please record your pitch first.';
        return;
    }

    recordingStatus.textContent = 'Transcribing your pitch...';
    analyzeBtn.disabled = true;
    analyzeBtn.textContent = 'Processing...';

    try {
        // Convert audio blob to base64
        const reader = new FileReader();
        reader.readAsDataURL(recordedAudioBlob);

        reader.onloadend = async () => {
            const audioBase64 = reader.result;

            try {
                // Step 1: Transcribe audio
                const transcribeResponse = await fetch('/api/transcribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ audio: audioBase64 }),
                });

                if (!transcribeResponse.ok) {
                    throw new Error('Transcription failed');
                }

                const transcribeData = await transcribeResponse.json();
                console.log('Transcription:', transcribeData.transcription);

                // Step 2: Analyze pitch
                recordingStatus.textContent = 'Analyzing your pitch with AI...';

                const analyzeResponse = await fetch('/api/analyze', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ transcription: transcribeData.transcription }),
                });

                if (!analyzeResponse.ok) {
                    throw new Error('Analysis failed');
                }

                const analyzeData = await analyzeResponse.json();
                const framework = analyzeData.analysis;

                // Save to localStorage
                saveRoadmap(framework, transcribeData.transcription);

                // Close modal and show Kanban board
                recordingModal.classList.remove('active');
                document.querySelector('.hero').style.display = 'none';
                document.getElementById('features').style.display = 'none';
                kanbanSection.style.display = 'block';

                // Generate roadmap
                generateRoadmap(framework);

                analyzeBtn.disabled = false;
                analyzeBtn.textContent = 'Analyze Pitch';
            } catch (error) {
                console.error('Analysis error:', error);
                recordingStatus.textContent = 'Error: ' + error.message + '. Please try again.';
                analyzeBtn.disabled = false;
                analyzeBtn.textContent = 'Analyze Pitch';
            }
        };
    } catch (error) {
        console.error('Error:', error);
        recordingStatus.textContent = 'Error processing audio. Please try again.';
        analyzeBtn.disabled = false;
        analyzeBtn.textContent = 'Analyze Pitch';
    }
}

function generateRoadmap(framework) {
    // Set framework badge
    document.getElementById('frameworkBadge').textContent = framework.name;

    // Clear existing cards
    document.getElementById('backlog').innerHTML = '';
    document.getElementById('in-progress').innerHTML = '';
    document.getElementById('completed').innerHTML = '';

    // Generate cards in backlog
    framework.phases.forEach((phase, index) => {
        const card = createKanbanCard(phase, index);
        document.getElementById('backlog').appendChild(card);
    });

    updateItemCounts();
    initializeDragAndDrop();
}

function createKanbanCard(phase, index) {
    const card = document.createElement('div');
    card.className = 'kanban-card';
    card.draggable = true;
    card.dataset.id = index;

    const priorityClass = `priority-${phase.priority}`;

    card.innerHTML = `
        <div class="card-title">${phase.title}</div>
        <div class="card-description">${phase.description}</div>
        <div class="card-meta">
            <span class="card-priority ${priorityClass}">${phase.priority}</span>
            ${phase.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}
        </div>
    `;

    return card;
}

function initializeDragAndDrop() {
    const cards = document.querySelectorAll('.kanban-card');
    const columns = document.querySelectorAll('.column-content');

    console.log('Initializing drag and drop:', cards.length, 'cards,', columns.length, 'columns');

    cards.forEach(card => {
        // Remove existing listeners to prevent duplicates
        card.removeEventListener('dragstart', handleDragStart);
        card.removeEventListener('dragend', handleDragEnd);

        // Add listeners
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
    });

    columns.forEach(column => {
        // Remove existing listeners
        column.removeEventListener('dragover', handleDragOver);
        column.removeEventListener('drop', handleDrop);
        column.removeEventListener('dragleave', handleDragLeave);

        // Add listeners
        column.addEventListener('dragover', handleDragOver);
        column.addEventListener('drop', handleDrop);
        column.addEventListener('dragleave', handleDragLeave);
    });
}

let draggedElement = null;

function handleDragStart(e) {
    console.log('Drag start');
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    console.log('Drag end');
    this.classList.remove('dragging');

    // Remove drag-over class from all columns
    document.querySelectorAll('.column-content').forEach(column => {
        column.classList.remove('drag-over');
    });
}

function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();

    e.dataTransfer.dropEffect = 'move';
    this.classList.add('drag-over');

    return false;
}

function handleDragLeave(e) {
    // Only remove if we're leaving the column itself, not a child
    if (e.target.classList.contains('column-content')) {
        this.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    console.log('Drop triggered');
    e.stopPropagation();
    e.preventDefault();

    if (draggedElement && this.classList.contains('column-content')) {
        console.log('Appending card to column');
        this.appendChild(draggedElement);
        updateItemCounts();
        saveKanbanState();
    }

    this.classList.remove('drag-over');

    return false;
}

function updateItemCounts() {
    const columns = document.querySelectorAll('.kanban-column');

    columns.forEach(column => {
        const count = column.querySelector('.column-content').children.length;
        column.querySelector('.item-count').textContent = count;
    });
}

function resetToLanding() {
    kanbanSection.style.display = 'none';
    document.querySelector('.hero').style.display = 'block';
    document.getElementById('features').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// LocalStorage functions
function saveRoadmap(framework, transcription) {
    const roadmap = {
        framework,
        transcription,
        timestamp: new Date().toISOString(),
        kanbanState: {
            backlog: [],
            'in-progress': [],
            completed: []
        }
    };

    // Get existing roadmaps
    const roadmaps = JSON.parse(localStorage.getItem('vocalab_roadmaps') || '[]');

    // Add new roadmap
    roadmaps.unshift(roadmap); // Add to beginning

    // Keep only last 10 roadmaps
    if (roadmaps.length > 10) {
        roadmaps.pop();
    }

    // Save back to localStorage
    localStorage.setItem('vocalab_roadmaps', JSON.stringify(roadmaps));
    localStorage.setItem('vocalab_current_roadmap', JSON.stringify(roadmap));
}

function loadRoadmap() {
    const roadmap = JSON.parse(localStorage.getItem('vocalab_current_roadmap'));
    if (roadmap) {
        return roadmap;
    }
    return null;
}

function saveKanbanState() {
    const roadmap = loadRoadmap();
    if (!roadmap) return;

    // Save current kanban state
    const columns = ['backlog', 'in-progress', 'completed'];
    columns.forEach(columnId => {
        const column = document.getElementById(columnId);
        if (column) {
            const cards = Array.from(column.children).map(card => ({
                id: card.dataset.id,
                html: card.innerHTML
            }));
            roadmap.kanbanState[columnId] = cards;
        }
    });

    localStorage.setItem('vocalab_current_roadmap', JSON.stringify(roadmap));
}

// Navigation functions
function goToHome() {
    kanbanSection.style.display = 'none';
    document.querySelector('.hero').style.display = 'block';
    document.getElementById('features').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Save/Load functions
function saveCurrentRoadmap() {
    // Update the current roadmap with latest kanban state
    saveKanbanState();

    const roadmap = loadRoadmap();
    if (!roadmap) {
        alert('No roadmap to save!');
        return;
    }

    // Add timestamp for this save
    roadmap.savedAt = new Date().toISOString();

    // Get existing saved roadmaps
    const savedRoadmaps = JSON.parse(localStorage.getItem('vocalab_roadmaps') || '[]');

    // Check if this roadmap already exists (based on timestamp)
    const existingIndex = savedRoadmaps.findIndex(r => r.timestamp === roadmap.timestamp);

    if (existingIndex >= 0) {
        // Update existing roadmap
        savedRoadmaps[existingIndex] = roadmap;
        alert('Roadmap updated successfully!');
    } else {
        // Add new roadmap
        savedRoadmaps.unshift(roadmap);
        // Keep only last 10
        if (savedRoadmaps.length > 10) {
            savedRoadmaps.pop();
        }
        alert('Roadmap saved successfully!');
    }

    localStorage.setItem('vocalab_roadmaps', JSON.stringify(savedRoadmaps));
}

function openSavedRoadmapsModal() {
    const savedRoadmaps = JSON.parse(localStorage.getItem('vocalab_roadmaps') || '[]');

    if (savedRoadmaps.length === 0) {
        savedRoadmapsList.innerHTML = '<p style="text-align: center; color: #64748b; padding: 2rem;">No saved roadmaps yet. Create and save your first roadmap!</p>';
    } else {
        savedRoadmapsList.innerHTML = savedRoadmaps.map((roadmap, index) => {
            const date = new Date(roadmap.timestamp);
            const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
            return `
                <div class="saved-roadmap-item" style="border: 2px solid #e2e8f0; border-radius: 0.5rem; padding: 1rem; margin-bottom: 1rem; cursor: pointer; transition: all 0.3s;" data-index="${index}">
                    <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">${roadmap.framework.name}</h3>
                    <p style="color: #64748b; font-size: 0.9rem;">Created: ${formattedDate}</p>
                    <p style="color: #64748b; font-size: 0.9rem;">${roadmap.framework.phases.length} phases</p>
                </div>
            `;
        }).join('');

        // Add click handlers to load roadmaps
        document.querySelectorAll('.saved-roadmap-item').forEach(item => {
            item.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                loadSavedRoadmap(index);
            });
            item.addEventListener('mouseenter', function() {
                this.style.borderColor = '#14b8a6';
                this.style.transform = 'translateY(-2px)';
            });
            item.addEventListener('mouseleave', function() {
                this.style.borderColor = '#e2e8f0';
                this.style.transform = 'translateY(0)';
            });
        });
    }

    savedRoadmapsModal.classList.add('active');
}

function closeSavedRoadmapsModal() {
    savedRoadmapsModal.classList.remove('active');
}

function loadSavedRoadmap(index) {
    const savedRoadmaps = JSON.parse(localStorage.getItem('vocalab_roadmaps') || '[]');
    const roadmap = savedRoadmaps[index];

    if (roadmap) {
        // Set as current roadmap
        localStorage.setItem('vocalab_current_roadmap', JSON.stringify(roadmap));

        // Close modal
        closeSavedRoadmapsModal();

        // Show kanban section
        document.querySelector('.hero').style.display = 'none';
        document.getElementById('features').style.display = 'none';
        kanbanSection.style.display = 'block';

        // Generate roadmap
        generateRoadmap(roadmap.framework);

        // Restore kanban state if available
        if (roadmap.kanbanState) {
            setTimeout(() => {
                Object.keys(roadmap.kanbanState).forEach(columnId => {
                    const column = document.getElementById(columnId);
                    if (column && roadmap.kanbanState[columnId]) {
                        column.innerHTML = '';
                        roadmap.kanbanState[columnId].forEach(cardData => {
                            const card = document.createElement('div');
                            card.className = 'kanban-card';
                            card.draggable = true;
                            card.dataset.id = cardData.id;
                            card.innerHTML = cardData.html;
                            column.appendChild(card);
                        });
                    }
                });
                initializeDragAndDrop();
                updateItemCounts();
            }, 100);
        }
    }
}

// Initialize
console.log('Vocalab initialized');
