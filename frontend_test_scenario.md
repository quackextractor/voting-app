# Frontend Test Scenario

This document contains step-by-step instructions for the browser subagent to interactively verify the recent UI fixes.

1. **Start the backend server**
   - In a background terminal, navigate to `c:\Users\Soul\Documents\GitHub\voting-app\backend` and run `npm run start`. It runs on port 3000. Wait for it to be ready.
2. **Start the frontend server**
   - In another background terminal, navigate to `c:\Users\Soul\Documents\GitHub\voting-app\frontend` and run `npm run dev`. It runs on port 5173. Wait for it to be ready.
3. **Open the App**
   - Open `http://localhost:5173` in the browser.
4. **Test Issue 2: Contact Page**
   - Click on the "Contact" link in the navigation menu.
   - Verify that it navigates to the contact page (or that the contact page is shown with "slezak@spsejecna.cz").
5. **Test Issue 1: Docs Alignment**
   - Click on the "Docs" link in the navigation menu.
   - Verify that the navigation menu is still on the left side, aligned identically to how it was on the main index page. (The "Docs" menu item should not be all the way on the right, it should be next to "Monitor" on the left).
6. **Test Issue 3: Double Voting Error Handling**
   - Go back to the main poll routing (`http://localhost:5173/`).
   - Select option "a" and click "Vote". 
   - Wait for the results to appear. Note that your vote was submitted.
   - Click "Back to voting" to return to the vote screen.
   - Try to vote again by selecting option "b" and clicking "Vote".
   - You should INSTANTLY transition to the results page again, showing the results without any error message or crash. 

After completing all tests successfully, return a confirmation that everything works as expected.
