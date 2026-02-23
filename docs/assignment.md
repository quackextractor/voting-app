## What Will We Build?

A single-question poll with the ability to view results and perform a reset. You will propose a simple question, for example, "How many open tabs are still normal?" and possible answers to it in the style of a), b), c). You will choose the topic of the question and the answer options yourself. Then, you will program a web page that will run the poll. **Minimum scope:** 1 question and at least 3 answers.

---

## Functional Requirements

### F1 Voting

* Display a question and at least 3 answer options.
* The user can select one option.
* After submitting a vote, the server saves the vote and returns the current results.
* There must be an option to only view the results and not vote.

### F2 Viewing Results

* The user can view the current results without voting.
* The results contain the number of votes for each option.
* Data must be shared among all users.
* Data must be preserved after a page restart.

### F3 Resetting Votes

* The application must include an option to reset votes.
* Resetting is only allowed upon entering the correct token.
* The token is stored on the server.
* If the token is correct, all votes will be reset to zero.
* If the token is incorrect, the reset will not be performed.
* The token can be a hardcoded value in the backend or stored in a configuration variable.

---

## Technical Requirements

The application must communicate using the HTTP protocol and show the results as a web HTML page. It can store data wherever it wants, but it must be shared for all visitors, for example, in a file or in the application's memory.

---

## What is Not Allowed

* Storing votes only in `localStorage`.
* Storing votes only in a JavaScript variable.
* Resetting without token verification.