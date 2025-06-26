# Istruzioni per il Modello JSON - Esercizi di Inglese (25 domande)



## Struttura Generale

Il file JSON rappresenta un insieme di esercizi di inglese organizzati in sezioni, 25 domande totali. La struttura principale è:

```json
{
  "sections": [
    // Array di sezioni
  ]
}
```

## Struttura delle Sezioni

Ogni sezione nell'array `sections` contiene:

### Campi Comuni
- **`title`** (string): Il titolo della sezione (es. "READING", "GRAMMAR", "WRITING")

### Tipi di Sezioni

#### 1. Sezione READING
## Esercizi esempio

SECTION TWO: READING
Read the passage below and circle the letter that corresponds to your answer.
Charlotte King made a once-in-a-lifetime visit to China last October and took lots of photographs. When
she got back, she decided to send away her films for printing one at a time. In this way she would more
easily be able to match her photographs to the diary she had kept while she was there. It was a good
thing that she did, because the first film she sent to the company for printing was lost. Miss King was
very upset that she would never see her precious pictures of Shanghai and Souzhou. The company
offered her a free roll of film, but Miss King refused to accept this offer and wrote back to say that their
offer wasn't enough. They then offered her £20 but she refused this too and asked for £75, which she
thought was quite fair. When the firm refused to pay, she said she would go to court. Before the matter
went to court, however, the firm decided to pay Miss King £75. This shows what can be done if you
make the effort to complain to a firm or manufacturer and insist on getting fair treatment.
6. What is the writer trying to do?
a. To complain about photographic printing.
b. To give advice on how to complain.
c. To inform us about legal problems.
7. This text is from …
a. a diary.
b. a letter.
c. a newspaper.
8. Before her visit, Charlotte had …
a. been to China once before.
b. never been to China before.
c. already been to China several times.
9. It was a good thing that Miss King sent her films away one at a time because not all the films were
lost.
TRUE
FALSE
10. When Miss King said she would go to court, the company offered her £20.
TRUE
FALSE

```json
{
  "title": "READING",
  "passage": "Testo da leggere...",
  "questions": [
    // Array di domande
  ]
}
```

#### 2. Sezione GRAMMAR
## Esercizi esempio

SECTION THREE: GRAMMAR
PART ONE. Read this article and for each question circle the correct letter A, B. C, D. Only one answer
is possible.
Some people are saying that social media is harming our lives. Twenty years ago, people talked to (11)
______ other, but now they prefer to message someone instead of talk. Many people worry too (12)
____ about what others think. They post photos and want everyone to like the photo and they (13)
_____ sad if people do not like it. Maybe people should take a break (14) _____ social media. It would
be better for people to like each other instead of liking online 'likes'. Also, there is a lot of fake news or
posts telling lies about people. This is a global problem. Several parents are banning (15) ________
children from using social media, but it is not all bad as it helps to connect people in the world.
11. A each B one C some D many
12. A most B much C many D lot
13. A will B make C have D get
14. A on B in C from D for
15. A they B there C them D their

PART TWO. Put the verbs given in brackets into the correct forms
16. I would have read the letter if I ____________________ (know) it was from you.
17. While I ______________________ (walk) home last Monday I saw a terrible car accident.
18. Yesterday faulty goods ...................... (take back) to the shop.
19. Listen! There's someone at the door. I….......................(open) the door for you.
20. 'Is Sonia here?' 'No, she….........................................…(not/come) yet.'

PART THREE. Read the text and use the words in CAPITALS to form a word which fits into the gap in
the same line. There is an example (0) at the beginning of the text to help you.
A MEMO FROM THE MANAGING DIRECTOR
I have to bring a matter to your (0) attention. 0. ATTEND
Unfortunately, we have received a lot of (21) …………………… 21. COMPLAIN
from customers about late delivery of parcels.
I have come to the conclusion that the new system we
introduced last month is a complete (22) ………………….. . 22. FAIL
This seems to be due to a combination of factors,
but one of the most important ones is that some (23) ………….. 23. EMPLOY
are not very responsible. The Union says it’s not the workers but
the (24) …………………… who are at fault. What is clear is that we 24. MANAGE
have to improve communication within the company. Nowadays
there’s a lot of (25) …………….in the messenger service industry 25. COMPETE
and we can’t afford to be less than the best.

```json
{
  "title": "GRAMMAR",
  "parts": [
    {
      "part": "PART ONE",
      "instructions": "Istruzioni per la parte...",
      "text": "Testo con spazi vuoti...", // Opzionale
      "questions": [
        // Array di domande
      ]
    }
  ]
}
```

#### 3. Sezione WRITING
## Esercizi esempio

SECTION FOUR: WRITING
Read the invitation email from Sue Jenkins, PR Manager of Reef Technologies plc to Mr Smith.
Fill each space with one word only.
There is an example to help you

(0) …....Dear........ Mr Smith,
My name is Sue Jenkins and I am writing (26).................... behalf of Reef Technologies plc.
We are pleased to announce that we are sponsoring a series of presentations on the future of
renewable energy. The presentations are (27)…................................... to be performed by worldrenowned experts in the field (for example Dr Josh Bartlett from MIT and Mrs Jennifer Woods from
Clean Future inc.) and will consider future advances in the technology of renewable technology.
Due to your company having worked with Reef Technologies plc in the past, we would
(28)................................to invite you to the event. The event will be held at the Randalls Conference
Centre in Leeds between 3pm and 8pm on the 12 April 2013. If you require directions to the venue,
please let me know.
(29)…......................... you would like to attend, please confirm your attendance by replying to this email
by the 18 March 2013.
If you have any questions about the event, please do not hesitate to contact me by email (on
sjenkins@reeftech.com) or by mobile/cell (on 07867 7433123).
I (30)…............................ forward to receiving your reply.
Yours faithfully,
Sue Jenkins
PR Manager
Reef Technologies plc

Altre email dal quale prendere spunto

Subject: Follow-Up on Client Proposal

Dear Mr. Thomas,
Thank you for your interest in our services. I’m writing to follow up on the proposal we sent last week.
If you have any questions about the details of the proposal, feel free to reach out to me directly.
Please send your response by Friday, as we would like to finalise the timeline of the project as soon as possible.

Best regards,
Daniel Kim
----

Subject: Request for Updated Budget Figures

Dear Sarah,
I’m reaching out to request the updated budget figures on the Q3 report. We need the final numbers for the finance meeting on Monday.
Could you please send the document by the end of the week?
Thank you for your support and for being part of the team.

Best regards,
Liam Carter
----

Subject: Request for information – local doctor registration 

Good morning,
My name is Antonia Green, I am 31 years old and I live in Catania (Corso Italia, 140).
I am writing to your office to ask for some information. I moved to Catania from Palermo two weeks ago, and I would like to register with a local doctor. If possible – as I have a newborn baby – I would like to find a doctor that has experience with infants and small children, and is located near my house.
Could you please send me information about the registration process, the necessary documents that I need to submit, and whether I need to make an appointment with the Central Health Office in Catania to finalise the registration?
Thank you in advance for your reply.

Sincerely,
Antonia Green

```json
{
  "title": "WRITING",
  "instructions": "Istruzioni generali...",
  "text": "Testo con spazi da completare...",
  "questions": [
    // Array di domande
  ]
}
```

## Struttura delle Domande

Ogni domanda ha una struttura base comune e campi specifici per tipo:

### Campi Comuni
- **`id`** (number): Identificatore numerico univoco della domanda (se già c'è non lo mettere due volte)
- **`question`** (string): Il testo della domanda
- **`type`** (string): Il tipo di domanda
- **`correct_answer`**: La risposta corretta (formato varia per tipo)

### Tipi di Domande

#### 1. Multiple Choice (`"type": "multiple_choice"`)
```json
{
  "id": 6,
  "question": "What is the writer trying to do?",
  "type": "multiple_choice",
  "options": [
    "Opzione A",
    "Opzione B", 
    "Opzione C"
  ],
  "correct_answer": 1  // Indice dell'opzione corretta (0-based)
}
```

#### 2. True/False (`"type": "true_false"`)
```json
{
  "id": 9,
  "question": "Statement to evaluate...",
  "type": "true_false",
  "options": ["TRUE", "FALSE"],
  "correct_answer": 0  // 0 per TRUE, 1 per FALSE
}
```

#### 3. Open Ended (`"type": "open_ended"`)
```json
{
  "id": 16,
  "question": "I would have read the letter if I ____ (know) it was from you.",
  "type": "open_ended",
  "correct_answer": "had known"  // Stringa con la risposta corretta
}
```

#### 4. Word Formation (`"type": "word_form"`)
```json
{
  "id": 21,
  "question": "(21) …………………… from customers (COMPLAIN)",
  "type": "word_form",
  "correct_answer": "complaints"  // Forma corretta della parola
}
```

#### 5. Fill in the Blank (`"type": "fill_in_blank"`)
```json
{
  "id": 26,
  "question": "I am writing (26).................... behalf of Reef Technologies plc",
  "type": "fill_in_blank",
  "correct_answer": "on"  // Parola mancante
}
```

## Convenzioni e Note

### Tempi verbali da usare nell'esercizio "PART TWO. Put the verbs given in brackets into the correct forms"

Condizionale di Terzo Tipo 
Past Continuous 
Simple Past Passivo 
Future Simple con "will" 
Present Perfect 

### Difficoltà 
- Il livello di difficoltà deve essere B1

### Numerazione
- Gli ID delle domande sono numerici e generalmente sequenziali
- Per domande multiple choice, `correct_answer` usa indici base-0
- Per domande true/false, 0 = TRUE, 1 = FALSE

### Formattazione Testi
- I testi possono contenere spazi vuoti rappresentati con underscore `____` o puntini `........`
- Le parole in maiuscolo tra parentesi (es. "COMPLAIN") indicano la parola base per word formation

### Opzioni Multiple Choice
- Possono essere semplici stringhe o includere lettere identificative (A, B, C, D)
- L'array `options` contiene tutte le scelte possibili

### Struttura Modulare
- Ogni sezione può avere sottosezioni (`parts`) con proprie istruzioni
- Le domande sono sempre raggruppate in array `questions`
- Ogni parte può avere istruzioni specifiche oltre al testo principale 



