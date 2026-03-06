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
7. **Test Navigation: Contact**
   - Click the "Contact" link in the header.
   - Verify that the page renders "Contact Information" with "slezak@spsejecna.cz".
8. **Test Navigation: Poll**
   - Click the "Poll" link in the header.
   - Verify that the original Coffee Poll question re-appears.

Return a report on how the unified UI looks, and confirm that all 5 links load successfully without triggering full page reloads.
