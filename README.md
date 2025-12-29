https://admin.gustaf.se/

## How to Deploy

This project uses a GitOps-based CI/CD flow powered by GitHub Actions and Docker Hub.

### 1. Prerequisites
Ensure the following secrets are set in the GitHub Repository (**Settings** -> **Secrets and variables** -> **Actions**):
*   `DOCKER_USERNAME`: Your Docker Hub username.
*   `DOCKER_PASSWORD`: Your Docker Hub Access Token.

### 2. Deployment Flow

#### **Step 1: Development (Feature Branches)**
1.  Create a feature branch locally and push it:
    ```bash
    git checkout -b feature/your-feature-name
    # ... make changes ...
    git add .
    git commit -m "Describe your changes"
    git push origin feature/your-feature-name
    ```
2.  Open a **Pull Request (PR)** targeting the `develop` branch via GitHub UI.
3.  **CI Action:** Runs `npm lint` and `npm run build` to validate code quality. *No Docker image is pushed.*

#### **Step 2: Staging (Automatic)**
1.  Merge the feature PR into `develop` (via GitHub UI).
    *Alternative via CLI:*
    ```bash
    git checkout develop
    git pull origin develop
    git merge feature/your-feature-name
    git push origin develop
    ```
2.  **CI Action:**
    *   Builds the Docker image.
    *   Pushes it to Docker Hub with the tag: `gustaf-monospace-frontend:develop`.
3.  **Kubernetes (Staging):** The Staging environment (configured to pull `:develop`) will automatically update.

#### **Step 3: Production (Manual Approval)**
1.  Create a **Pull Request** from `develop` into `main` via GitHub UI.
2.  **Merge** the PR into `main` after review.
    *Alternative via CLI:*
    ```bash
    git checkout main
    git pull origin main
    git merge develop
    git push origin main
    ```
3.  **CI Action:**
    *   Builds the Docker image.
    *   Pushes it to Docker Hub with tags: 
        *   `gustaf-monospace-frontend:latest`
        *   `gustaf-monospace-frontend:main`
        *   `gustaf-monospace-frontend:sha-<commit-hash>`
4.  **Kubernetes (Production):** The Production environment (configured to pull `:latest`) will automatically update.

### 3. How to Open a Pull Request

You can open a Pull Request (PR) to merge changes between branches (e.g., from `feature` to `develop`, or `develop` to `main`) using any of the following methods:

#### **Method A: GitHub Web UI (Recommended)**
1.  Push your branch: `git push origin your-branch-name`.
2.  Go to your repository on GitHub.
3.  Click the **"Compare & pull request"** button on the yellow banner that appears.
4.  Select the **base branch** (e.g., `develop` for features, or `main` for production releases).
5.  Click **"Create pull request"**.

#### **Method B: GitHub CLI (`gh`)**
If you have the [GitHub CLI](https://cli.github.com/) installed:
```bash
# PR to staging
gh pr create --base develop --title "Feature description" --body "Details"

# PR to production
gh pr create --base main --head develop --title "Release v1.0.0"
```

#### **Method C: Direct URL**
After running `git push`, look at the terminal output. GitHub provides a direct link to create a PR:
`remote: Create a pull request for 'feature/...' by visiting:`
`remote: https://github.com/user/repo/pull/new/feature/...`
Simply copy-paste or click the link in your terminal.