# Deployment Instructions for Thunder POS

You don't need to do any technical setup. Follow these two simple steps to go live.

### Step 1: Upload to GitHub
1.  Open your terminal in `C:\Users\CZ\Desktop\Thunder-POS`.
2.  Run these commands to save your code to GitHub:
    ```bash
    git init
    git add .
    git commit -m "Production Ready: Secure POS SaaS"
    # Create a new repository on GitHub and run these:
    # git remote add origin <YOUR_GITHUB_REPO_URL>
    # git push -u origin main
    ```

### Step 2: One-Click Deploy to Vercel
1.  Go to [Vercel](https://vercel.com/new).
2.  Log in and click "Import Project".
3.  Select the GitHub repository you just created.
4.  **Important:** In the Vercel "Environment Variables" section, add your `DATABASE_URL` (this will be provided by your cloud PostgreSQL provider like Neon or Supabase).
5.  Click "Deploy".

**That's it.** The system is now fully configured for production.
