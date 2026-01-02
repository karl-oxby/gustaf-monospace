# Simplified Deployment Guide (With PR Approvals)

Follow these steps to move a change from your computer to Production using Pull Requests for safety/approval.

## Step 1: Create & Work on Feature
```bash
# 1. Create a new branch
git checkout -b feature/my-new-change

# 2. Make your changes and commit
git add .
git commit -m "Brief description of change"

# 3. Push to GitHub
git push origin feature/my-new-change
```
*Output will provide a link to create a Pull Request. Click it!*

## Step 2: Deploy to Staging (develop)
**Action on GitHub:**
1.  Open a Pull Request: **feature/my-new-change** → **develop**.
2.  Review your changes.
3.  Click **Merge pull request**.
    *   *This triggers the Staging Deployment.*
    *   *Tick "Delete branch" on GitHub to clean up the remote branch.*

**Local Cleanup (Back on your computer):**
```bash
# 1. Switch back to develop and sync
git checkout develop
git pull origin develop

# 2. Delete the local feature branch (since it's merged)
git branch -d feature/my-new-change
```
*Check your staging site to verify the change.*

## Step 3: Deploy to Production (main)
**Action on GitHub:**
1.  Open a Pull Request: **develop** → **main**.
2.  Review the Staging changes.
3.  Click **Merge pull request**.
    *   *This triggers the Production Deployment.*

**Local Sync (Optional):**
```bash
git checkout main
git pull origin main
```
*The app is now live on Production!*