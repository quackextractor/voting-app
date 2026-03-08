# SPA Frontend Test Scenario

This document contains step-by-step instructions for the browser subagent to interactively verify the React SPA router migration.

1. **Start the applications (if not already running)**
   - The backend runs on port 3000.
   - The frontend runs on port 5173. Both are likely already running from previous tests.
2. **Open the App**
   - Open `http://localhost:5173` in the browser.
3. **Verify Header**
   - Ensure the new unified React NavBar is present at the top.
4. **Test Navigation: Admin**
   - Click the "Admin" link in the header.
   - Verify that the URL changes or the page renders the "Admin Control Panel".
5. **Test Navigation: Monitor**
   - Click the "Monitor" link in the header.
   - Verify that the page renders the "System Monitor" with the 4 data cards.
6. **Test Navigation: Docs**
   - Click the "Docs" link in the header.
   - Verify that the page renders "Technical and Visual Design".
7. **Test Navigation: Contact from Footer**
   - Scroll to the bottom of the page and click "Report an Issue / Contact Us" link in the footer.
   - Verify that the page renders "Contact Information" with "slezak@spsejecna.cz".
8. **Test Voting Functionality**
   - Go back to "Poll" link in the header.
   - Verify that the original Coffee Poll question appears.
   - Select option "a" ("0 to 1") and click "Vote"
   - Confirm it redirects to the Results view and the "a" option has a "Your vote" badge displayed next to it.
9. **Test Duplicate Vote Prevention**
   - Click "Back to voting" underneath the Poll Results.
   - Verify that the form now displays a "Already Voted" notification.
   - Verify that the radio inputs and the "Vote" button are disabled or cannot be interacted with.
   - Click the "Proceed to Results" button inside the warning notification and verify it returns to results.

Return a report verifying that all features and routing logic work as expected.
