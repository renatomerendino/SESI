let examData = null;
let userAnswers = {};
let totalQuestions = 0;
let currentFileName = '';

// Gestione drag & drop
const uploadZone = document.getElementById('uploadZone');

uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('dragover');
});

uploadZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
});

uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
});

// Gestione selezione file
function handleFileSelect(input) {
    if (input.files.length > 0) {
        handleFile(input.files[0]);
    }
}

// Gestione del file caricato
async function handleFile(file) {
    currentFileName = file.name;
    
    if (!file.name.toLowerCase().endsWith('.json')) {
        showError('Il file deve essere in formato JSON (.json)');
        return;
    }

    showLoading(true);
    clearMessages();

    try {
        // Legge il file usando FileReader API
        const fileContent = await readFileContent(file);
        
        // Parse del JSON
        const jsonData = JSON.parse(fileContent);
        
        // Validazione dello schema
        if (validateJsonSchema(jsonData)) {
            examData = jsonData;
            showSuccess(`File "${file.name}" caricato correttamente! Pronto per iniziare l'esame.`);
            initializeExam();
        } else {
            showError('Il file JSON non rispetta lo schema richiesto. Controlla la struttura del file.');
        }
    } catch (error) {
        console.error('Errore nel caricamento del file:', error);
        if (error.name === 'SyntaxError') {
            showError('Il file JSON non è valido. Controlla la sintassi.');
        } else {
            showError('Errore nel caricamento del file: ' + error.message);
        }
    } finally {
        showLoading(false);
    }
}

// Funzione per leggere il contenuto del file
function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            resolve(e.target.result);
        };
        
        reader.onerror = function(e) {
            reject(new Error('Errore nella lettura del file'));
        };
        
        reader.readAsText(file, 'utf-8');
    });
}

// Validazione dello schema JSON
function validateJsonSchema(data) {
    if (!data || typeof data !== 'object') return false;
    if (!Array.isArray(data.sections)) return false;
    
    for (const section of data.sections) {
        if (!section.title || typeof section.title !== 'string') return false;
        
        // Validazione per sezioni con domande dirette
        if (section.questions) {
            if (!Array.isArray(section.questions)) return false;
            for (const question of section.questions) {
                if (!validateQuestion(question)) return false;
            }
        }
        
        // Validazione per sezioni con parti
        if (section.parts) {
            if (!Array.isArray(section.parts)) return false;
            for (const part of section.parts) {
                if (!part.questions || !Array.isArray(part.questions)) return false;
                for (const question of part.questions) {
                    if (!validateQuestion(question)) return false;
                }
            }
        }
        
        // Deve avere almeno questions o parts
        if (!section.questions && !section.parts) return false;
    }
    
    return true;
}

// Validazione di una singola domanda
function validateQuestion(question) {
    if (!question.id || !question.type) return false;
    
    const validTypes = ['multiple_choice', 'true_false', 'open_ended', 'word_form', 'fill_in_blank'];
    if (!validTypes.includes(question.type)) return false;
    
    // Per multiple choice e true/false devono avere options e correct_answer
    if (question.type === 'multiple_choice' || question.type === 'true_false') {
        if (!Array.isArray(question.options)) return false;
        if (typeof question.correct_answer !== 'number') return false;
    }
    
    // Per altri tipi deve avere correct_answer come stringa
    if (['open_ended', 'word_form', 'fill_in_blank'].includes(question.type)) {
        if (typeof question.correct_answer !== 'string') return false;
    }
    
    return true;
}

// Mostra messaggi di errore
function showError(message) {
    const container = document.getElementById('errorContainer');
    container.innerHTML = `<div class="error-message"><strong>❌ Errore:</strong> ${message}</div>`;
}

// Mostra messaggi di successo
function showSuccess(message) {
    const container = document.getElementById('successContainer');
    container.innerHTML = `<div class="success-message"><strong>✅ Successo:</strong> ${message}</div>`;
}

// Pulisce i messaggi
function clearMessages() {
    document.getElementById('errorContainer').innerHTML = '';
    document.getElementById('successContainer').innerHTML = '';
}

// Mostra/nasconde loading
function showLoading(show) {
    document.getElementById('loading').style.display = show ? 'block' : 'none';
}

// Gestione semplificata degli event listeners
function initializeButtonListeners() {
    const submitBtn = document.getElementById('submitBtn');
    const restartBtn = document.getElementById('restartBtn');
    const newFileBtn = document.getElementById('newFileBtn');
    
    // Rimuove eventuali event listeners esistenti usando onclick
    if (submitBtn) {
        submitBtn.onclick = function(e) {
            e.preventDefault();
            submitExam();
        };
    }
    
    if (restartBtn) {
        restartBtn.onclick = function(e) {
            e.preventDefault();
            restartExam();
        };
    }
    
    if (newFileBtn) {
        newFileBtn.onclick = function(e) {
            e.preventDefault();
            loadNewFile();
        };
    }
}

// Inizializza l'esame
function initializeExam() {
    if (!examData) return;
    
    showLoading(true);
    
    setTimeout(() => {
        // Nasconde il container di upload
        document.getElementById('uploadContainer').classList.add('hidden');
        
        // Mostra la progress bar
        document.getElementById('progressContainer').style.display = 'block';
        
        // Renderizza l'esame
        renderExam();
        
        // Mostra i pulsanti
        document.getElementById('submitBtn').classList.remove('hidden');
        document.getElementById('newFileBtn').classList.remove('hidden');
        
        // Inizializza gli event listeners
        initializeButtonListeners();
        
        // Conta le domande e aggiorna il progresso
        countTotalQuestions();
        updateProgress();
        
        showLoading(false);
    }, 1000);
}

// Conta il numero totale di domande
function countTotalQuestions() {
    totalQuestions = 0;
    if (!examData) return;
    
    examData.sections.forEach(section => {
        if (section.questions) {
            totalQuestions += section.questions.length;
        } else if (section.parts) {
            section.parts.forEach(part => {
                totalQuestions += part.questions.length;
            });
        }
    });
}

// Aggiorna la barra di progresso
function updateProgress() {
    const answeredQuestions = Object.keys(userAnswers).length;
    const percentage = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
    
    document.getElementById('progressFill').style.width = percentage + '%';
    document.getElementById('progressText').textContent = `Domanda ${answeredQuestions} di ${totalQuestions}`;
}

// Renderizza l'esame
function renderExam() {
    if (!examData) return;
    
    const container = document.getElementById('examContent');
    container.innerHTML = '';

    // Aggiunge informazioni sul file caricato
    const fileInfo = document.createElement('div');
    fileInfo.className = 'file-info';
    fileInfo.innerHTML = `<strong>📄 File caricato:</strong> ${currentFileName} | <strong>📊 Sezioni:</strong> ${examData.sections.length} | <strong>❓ Domande totali:</strong> ${totalQuestions}`;
    container.appendChild(fileInfo);

    examData.sections.forEach(section => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'exam-card';
        
        let sectionHTML = `
            <div class="card-header">
                📖 ${section.title}
            </div>
            <div class="card-content">
        `;

        if (section.passage) {
            sectionHTML += `<div class="passage">${section.passage}</div>`;
        }

        if (section.instructions) {
            sectionHTML += `<div class="instructions"><strong>Istruzioni:</strong> ${section.instructions}</div>`;
        }

        if (section.text && section.title === 'WRITING') {
            sectionHTML += `<div class="passage">${section.text}</div>`;
        }

        if (section.questions) {
            section.questions.forEach(question => {
                sectionHTML += renderQuestion(question);
            });
        } else if (section.parts) {
            section.parts.forEach(part => {
                sectionHTML += `<div class="part-header">${part.part}</div>`;
                if (part.instructions) {
                    sectionHTML += `<div class="instructions"><strong>Istruzioni:</strong> ${part.instructions}</div>`;
                }
                if (part.text) {
                    sectionHTML += `<div class="passage">${part.text}</div>`;
                }
                part.questions.forEach(question => {
                    sectionHTML += renderQuestion(question);
                });
            });
        }

        sectionHTML += '</div>';
        sectionDiv.innerHTML = sectionHTML;
        container.appendChild(sectionDiv);
    });
}

// Renderizza una singola domanda
function renderQuestion(question) {
    let questionHTML = `<div class="question-container">
        <div class="question-text">${question.id}. ${question.question}</div>`;

    if (question.type === 'multiple_choice') {
        questionHTML += '<div class="options">';
        question.options.forEach((option, index) => {
            questionHTML += `
                <div class="option" onclick="selectOption(${question.id}, ${index})">
                    <input type="radio" name="q${question.id}" value="${index}" onchange="updateProgress()">
                    <span>${option}</span>
                </div>
            `;
        });
        questionHTML += '</div>';
    } else if (question.type === 'true_false') {
        questionHTML += '<div class="options">';
        question.options.forEach((option, index) => {
            questionHTML += `
                <div class="option" onclick="selectOption(${question.id}, ${index})">
                    <input type="radio" name="q${question.id}" value="${index}" onchange="updateProgress()">
                    <span>${option}</span>
                </div>
            `;
        });
        questionHTML += '</div>';
    } else if (question.type === 'open_ended' || question.type === 'word_form' || question.type === 'fill_in_blank') {
        questionHTML += `<input type="text" class="text-input" placeholder="Inserisci la tua risposta..." 
                        onchange="saveTextAnswer(${question.id}, this.value)" 
                        oninput="updateProgress()" id="input${question.id}">`;
    }

    questionHTML += '</div>';
    return questionHTML;
}

// Seleziona un'opzione
function selectOption(questionId, optionIndex) {
    const radio = document.querySelector(`input[name="q${questionId}"][value="${optionIndex}"]`);
    radio.checked = true;
    userAnswers[questionId] = optionIndex;
    updateProgress();
}

// Salva risposta testuale
function saveTextAnswer(questionId, value) {
    if (value.trim()) {
        userAnswers[questionId] = value.trim();
    } else {
        delete userAnswers[questionId];
    }
    updateProgress();
}

// Invia l'esame
function submitExam() {
    if (Object.keys(userAnswers).length < totalQuestions) {
        if (!confirm('Non hai risposto a tutte le domande. Vuoi procedere comunque con la correzione?')) {
            return;
        }
    }

    showResults();
}

// Mostra i risultati
function showResults() {
    let correctAnswers = 0;
    let results = [];

    // Calcola i risultati
    examData.sections.forEach(section => {
        if (section.questions) {
            section.questions.forEach(question => {
                const result = checkAnswer(question);
                results.push(result);
                if (result.correct) correctAnswers++;
            });
        } else if (section.parts) {
            section.parts.forEach(part => {
                part.questions.forEach(question => {
                    const result = checkAnswer(question);
                    results.push(result);
                    if (result.correct) correctAnswers++;
                });
            });
        }
    });

    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Crea HTML dei risultati
    let resultsHTML = `
        <div class="score-display">
            <div class="score-circle">${score}%</div>
            <div class="score-details">
                <h2>Il tuo punteggio</h2>
                <p><strong>${correctAnswers}</strong> su <strong>${totalQuestions}</strong> risposte corrette</p>
                <p>📄 File: <strong>${currentFileName}</strong></p>
                <p>📊 Percentuale: <strong>${score}%</strong></p>
            </div>
        </div>
        <div class="results-header">
            <h3>📊 Dettaglio delle risposte</h3>
        </div>
    `;

    results.forEach(result => {
        const isCorrect = result.correct;
        const userAnswerClass = isCorrect ? 'user' : 'wrong';
        
        resultsHTML += `
            <div class="question-result ${isCorrect ? 'correct' : 'incorrect'}">
                <div class="question-title">
                    📝 Domanda ${result.id}: ${result.question}
                </div>
                <div class="answer-section">
                    <div class="user-answer-row">
                        <span class="answer-label">La tua risposta:</span>
                        <span class="answer-value ${userAnswerClass}">
                            ${result.userAnswer || 'Non risposto'}
                        </span>
                    </div>
                    ${!isCorrect ? `
                        <div class="user-answer-row">
                            <span class="answer-label">Risposta corretta:</span>
                            <span class="answer-value correct-answer">
                                ${result.correctAnswer}
                            </span>
                        </div>
                    ` : `
                        <div class="user-answer-row">
                            <span class="answer-label">Stato:</span>
                            <span class="answer-value correct-answer">
                                ✅ Corretto!
                            </span>
                        </div>
                    `}
                </div>
            </div>
        `;
    });

    document.getElementById('resultsContainer').innerHTML = resultsHTML;
    document.getElementById('resultsContainer').style.display = 'block';
    
    // Gestione pulsanti
    document.getElementById('submitBtn').classList.add('hidden');
    document.getElementById('restartBtn').classList.remove('hidden');
    
    // Reinizializza gli event listeners per tutti i pulsanti
    setTimeout(() => {
        initializeButtonListeners();
    }, 100);

    // Scroll ai risultati
    document.getElementById('resultsContainer').scrollIntoView({ behavior: 'smooth' });
}

// Controlla una singola risposta
function checkAnswer(question) {
    const userAnswer = userAnswers[question.id];
    let correct = false;
    let correctAnswer = '';
    let displayUserAnswer = '';

    if (question.type === 'multiple_choice' || question.type === 'true_false') {
        correct = userAnswer === question.correct_answer;
        correctAnswer = question.options[question.correct_answer];
        displayUserAnswer = userAnswer !== undefined ? question.options[userAnswer] : 'Non risposto';
    } else {
        correctAnswer = question.correct_answer;
        displayUserAnswer = userAnswer || 'Non risposto';
        
        if (userAnswer) {
            // Controllo flessibile per le risposte aperte
            correct = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
        }
    }

    return {
        id: question.id,
        question: question.question,
        correct: correct,
        userAnswer: displayUserAnswer,
        correctAnswer: correctAnswer
    };
}

// Ricomincia l'esame
function restartExam() {
    if (confirm('Sei sicuro di voler ricominciare l\'esame? Tutte le risposte saranno cancellate.')) {
        userAnswers = {};
        document.getElementById('resultsContainer').style.display = 'none';
        document.getElementById('submitBtn').classList.remove('hidden');
        document.getElementById('restartBtn').classList.add('hidden');
        
        // Reset form
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });
        document.querySelectorAll('.text-input').forEach(input => {
            input.value = '';
        });
        
        updateProgress();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Carica nuovo file
function loadNewFile() {
    if (confirm('Vuoi caricare un nuovo file? L\'esame attuale sarà resettato.')) {
        // Reset completo
        examData = null;
        userAnswers = {};
        totalQuestions = 0;
        currentFileName = '';
        
        // Nasconde tutto
        document.getElementById('examContent').innerHTML = '';
        document.getElementById('resultsContainer').style.display = 'none';
        document.getElementById('progressContainer').style.display = 'none';
        
        // Nasconde i pulsanti
        document.getElementById('submitBtn').classList.add('hidden');
        document.getElementById('restartBtn').classList.add('hidden');
        document.getElementById('newFileBtn').classList.add('hidden');
        
        // Mostra il container di upload
        document.getElementById('uploadContainer').classList.remove('hidden');
        
        // Reset del file input
        document.getElementById('fileInput').value = '';
        
        // Pulisce i messaggi
        clearMessages();
        
        // Scroll in alto
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
} 