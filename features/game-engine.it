#language: it

Funzionalità: Motore del Gioco - Indovinare Lettera
  Come giocatore
  Voglio indovinare lettere nel gioco dell'impiccato
  In modo da poter scoprire la parola segreta

  Contesto:
    Data la parola segreta "scrum"
    E il gioco è stato avviato

  Scenario: Il giocatore fa un tentativo sbagliato
    Quando indovino la lettera "z"
    Allora il mio numero di vite dovrebbe diminuire di 1
    # E la lettera "z" dovrebbe essere aggiunta ai miei tentativi
    # E dovrei vedere un messaggio che dice che la lettera non è nella parola
    Ma lo stato del gioco dovrebbe rimanere "RUNNING" se ho vite rimanenti
