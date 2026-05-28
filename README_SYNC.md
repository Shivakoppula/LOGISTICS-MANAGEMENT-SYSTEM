═══════════════════════════════════════════════════════════════════════════════
                    HOW TO RUN sync.ps1 - COMPLETE GUIDE
═══════════════════════════════════════════════════════════════════════════════

📌 WHAT IS sync.ps1?
   Purpose: Automatically copies all frontend files from frontend/static/ to 
            backend/src/main/resources/static/ so Spring Boot can serve them.
   
   Why: When you edit frontend files, you need to update the backend copy too.
        This script does it automatically.

───────────────────────────────────────────────────────────────────────────────
STEP 1: OPEN WINDOWS POWERSHELL
───────────────────────────────────────────────────────────────────────────────

METHOD A - Using Start Menu (Easiest):
   1. Click "Windows Start" button (bottom left of screen)
   2. Type: PowerShell
   3. Click "Windows PowerShell" (the blue icon)
   4. A new terminal window opens (dark blue background)

METHOD B - Using keyboard shortcut:
   1. Press: Windows Key + X
   2. Click: "Windows PowerShell" or "Terminal"
   3. Window opens

✅ RESULT: You see a terminal window with blinking cursor
   Example: PS C:\Users\YourName>

───────────────────────────────────────────────────────────────────────────────
STEP 2: NAVIGATE TO PROJECT FOLDER
───────────────────────────────────────────────────────────────────────────────

Copy and paste this command into PowerShell:

   cd "c:\Users\SHIVA KOPPULA\Downloads\logistick"

Press: ENTER key

Explanation:
   cd = "change directory" (means: go to this folder)
   "c:\Users\SHIVA KOPPULA\Downloads\logistick" = full path to your project

✅ RESULT: Terminal shows:
   PS C:\Users\SHIVA KOPPULA\Downloads\logistick>

───────────────────────────────────────────────────────────────────────────────
STEP 3: RUN THE SYNC SCRIPT
───────────────────────────────────────────────────────────────────────────────

Copy and paste this command:

   powershell -ExecutionPolicy Bypass -File .\sync.ps1

Press: ENTER key

Explanation:
   powershell = run PowerShell command
   -ExecutionPolicy Bypass = allow script to run without restrictions
   -File = load script file
   .\sync.ps1 = the script name to run

✅ RESULT: You see green checkmarks:
   ✅ Synced: admin-dashboard.css
   ✅ Synced: admin-dashboard.html
   ✅ Synced: admin-dashboard.js
   ✅ Synced: customer-dashboard.html
   ✅ Synced: login.html
   
   ✅ All frontend files synced to backend successfully!

───────────────────────────────────────────────────────────────────────────────
FASTER METHOD - Double-Click sync.bat
───────────────────────────────────────────────────────────────────────────────

Step 1: Open File Explorer
   - Press: Windows Key + E
   - Navigate to: c:\Users\SHIVA KOPPULA\Downloads\logistick

Step 2: Find file called "sync.bat"
   - You'll see it in the folder list
   - It has a gear/wrench icon

Step 3: Double-click on "sync.bat"
   - A PowerShell window opens automatically
   - Runs the sync script
   - Shows "✅ All frontend files synced to backend successfully!"
   - Automatically closes after completion

✅ DONE! All files synced!

───────────────────────────────────────────────────────────────────────────────
WHEN TO RUN sync.ps1?
───────────────────────────────────────────────────────────────────────────────

Run AFTER you:
   ✅ Edit login.html
   ✅ Edit admin-dashboard.html
   ✅ Edit admin-dashboard.css
   ✅ Edit admin-dashboard.js
   ✅ Edit customer-dashboard.html

Before you:
   ✅ Refresh browser page
   ✅ Test changes in application
   ✅ Deploy to server

───────────────────────────────────────────────────────────────────────────────
TROUBLESHOOTING
───────────────────────────────────────────────────────────────────────────────

❌ Problem: "sync.ps1 cannot be loaded because running scripts is disabled"
✅ Solution: Use the batch file instead (sync.bat)
             OR use command: powershell -ExecutionPolicy Bypass -File .\sync.ps1

❌ Problem: "File not found"
✅ Solution: Make sure you're in correct folder:
             Type: cd c:\Users\SHIVA KOPPULA\Downloads\logistick
             Then try again

❌ Problem: No green checkmarks appear
✅ Solution: Check if frontend files exist in:
             c:\Users\SHIVA KOPPULA\Downloads\logistick\frontend\static

═══════════════════════════════════════════════════════════════════════════════
