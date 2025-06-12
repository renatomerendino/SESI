# 📚 Piattaforma di Simulazione Esami di Inglese (SESI)

Una piattaforma web interattiva per simulare esami di inglese con correzione automatica e analisi dettagliata dei risultati.

## 🌟 Caratteristiche Principali

- **📤 Caricamento File JSON**: Sistema drag & drop per caricare file di esercizi in formato JSON
- **📝 Tipi di Domande Multiple**: Supporta diversi tipi di domande (scelta multipla, vero/falso, risposta aperta, word formation, fill-in-the-blank)
- **🎯 Correzione Automatica**: Valutazione immediata delle risposte con punteggio percentuale
- **📊 Analisi Dettagliata**: Visualizzazione completa dei risultati con confronto tra risposte corrette e date
- **🔄 Riavvio Esame**: Possibilità di ripetere l'esame o caricare un nuovo file
- **💫 Interfaccia Moderna**: Design responsive con animazioni e feedback visivi

## 🚀 Come Utilizzare la Piattaforma

### 1. Struttura del Progetto
Il progetto è organizzato in tre file principali:
- **`index.html`** - Struttura HTML della pagina
- **`styles.css`** - Tutti gli stili e animazioni CSS
- **`script.js`** - Logica JavaScript per la gestione degli esami

### 2. Avvio della Piattaforma
```bash
# Apri il file index.html in un browser web moderno
# Oppure utilizza un server locale per migliori prestazioni
python -m http.server 8000
# Poi vai su http://localhost:8000
```

### 3. Caricamento del File di Esame
- **Drag & Drop**: Trascina il file JSON nella zona di caricamento
- **Selezione File**: Clicca sulla zona di caricamento e seleziona il file
- Il file deve essere in formato `.json` e rispettare lo schema specificato

### 4. Svolgimento dell'Esame
- Rispondi alle domande in ordine o come preferisci
- Le risposte vengono salvate automaticamente
- La barra di progresso mostra l'avanzamento
- Clicca "Invia Esame" per la correzione

### 5. Visualizzazione Risultati
- Punteggio percentuale con indicatori visivi
- Dettaglio domanda per domanda
- Confronto tra risposta data e risposta corretta
- Opzioni per riavviare o caricare un nuovo esame

## 📋 Struttura del File JSON

Il file JSON deve seguire questo schema:

```json
{
  "sections": [
    {
      "title": "NOME_SEZIONE",
      "passage": "Testo del brano (opzionale)",
      "questions": [
        {
          "id": 1,
          "question": "Testo della domanda",
          "type": "multiple_choice",
          "options": ["Opzione A", "Opzione B", "Opzione C"],
          "correct_answer": 0
        }
      ]
    }
  ]
}
```

### Tipi di Domande Supportati

#### 1. **Multiple Choice** (`multiple_choice`)
```json
{
  "id": 1,
  "question": "What is the capital of Italy?",
  "type": "multiple_choice",
  "options": ["Rome", "Milan", "Naples"],
  "correct_answer": 0
}
```

#### 2. **True/False** (`true_false`)
```json
{
  "id": 2,
  "question": "Rome is the capital of Italy.",
  "type": "true_false",
  "options": ["TRUE", "FALSE"],
  "correct_answer": 0
}
```

#### 3. **Risposta Aperta** (`open_ended`)
```json
{
  "id": 3,
  "question": "Complete: I would have read the letter if I _____ (know) it was from you.",
  "type": "open_ended",
  "correct_answer": "had known"
}
```

#### 4. **Word Formation** (`word_form`)
```json
{
  "id": 4,
  "question": "We received many _____ (COMPLAIN) from customers.",
  "type": "word_form",
  "correct_answer": "complaints"
}
```

#### 5. **Fill in the Blank** (`fill_in_blank`)
```json
{
  "id": 5,
  "question": "Writing _____ behalf of the company...",
  "type": "fill_in_blank",
  "correct_answer": "on"
}
```

## 🏗️ Struttura delle Sezioni

### Sezione con Domande Dirette
```json
{
  "title": "READING",
  "passage": "Testo del brano da leggere...",
  "questions": [...]
}
```

### Sezione con Parti Multiple
```json
{
  "title": "GRAMMAR",
  "parts": [
    {
      "part": "PART ONE",
      "instructions": "Istruzioni specifiche per questa parte",
      "text": "Testo di riferimento (opzionale)",
      "questions": [...]
    }
  ]
}
```

## 🎯 Esempi di File Disponibili

La repository include file di esempio:

- **`esercizio.json`**: Esame completo con sezioni Reading, Grammar e Writing
- **`esercizio-sample.json`**: Versione estesa con più esempi
- **`mock-test-written-exam.md`**: Versione cartacea dell'esame per riferimento

## 🔧 Funzionalità Tecniche

### Validazione Schema
- Controllo automatico della struttura JSON
- Validazione dei tipi di domande
- Verifica della presenza di campi obbligatori

### Correzione Intelligente
- **Risposte a scelta**: Confronto esatto con l'indice corretto
- **Risposte testuali**: Confronto case-insensitive con trim automatico
- **Punteggio**: Calcolo percentuale automatico

### Interfaccia Utente
- **Responsive Design**: Funziona su desktop, tablet e mobile
- **Animazioni Fluide**: Transizioni e feedback visivi
- **Accessibilità**: Supporto per screen reader e navigazione da tastiera

## 🎨 Personalizzazione

### Modifica del Design
Gli stili sono contenuti nel file `styles.css` e possono essere personalizzati modificando le classi CSS.

### Aggiunta di Nuovi Tipi di Domanda
Per aggiungere nuovi tipi di domanda, modifica nel file `script.js`:
1. La funzione `validateQuestion()` per la validazione
2. La funzione `renderQuestion()` per il rendering
3. La funzione `checkAnswer()` per la correzione

### Modifica della Struttura HTML
La struttura della pagina è definita nel file `index.html` e può essere personalizzata modificando gli elementi HTML.

## 🚨 Risoluzione Problemi

### File Non Caricato
- Verifica che il file sia in formato `.json`
- Controlla la validità della sintassi JSON
- Assicurati che rispetti lo schema richiesto

### Domande Non Visualizzate
- Verifica la presenza del campo `questions` o `parts`
- Controlla che ogni domanda abbia `id` e `type` validi
- Assicurati che i tipi di domanda siano supportati

### Risultati Incorretti
- Verifica che `correct_answer` sia del tipo giusto (numero per scelta multipla, stringa per risposte aperte)
- Controlla che gli indici delle opzioni partano da 0

## 📱 Compatibilità Browser

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## 📄 Licenza

Questo progetto è open source. Sentiti libero di modificarlo e utilizzarlo per i tuoi scopi educativi.

## 🤝 Contributi

Per miglioramenti o segnalazioni:
1. Crea un issue con la descrizione del problema
2. Proponi modifiche tramite pull request
3. Documenta le modifiche nel changelog

---

**Sviluppato per l'apprendimento e la valutazione della lingua inglese** 🇬🇧📚 