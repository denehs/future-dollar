# Cloudflare Workers Git Integration Setup Guide

This guide walks you through setting up automatic deployments for your Cloudflare Worker using Git integration.

## Quick Setup Steps

### 1. Prepare Your Repository
Ensure your repository has:
- `wrangler.toml` configuration file ✅
- `worker.js` script ✅
- Static assets in `assets/` directory ✅
- Valid package.json ✅

### 2. Cloudflare Dashboard Setup

1. **Navigate to Cloudflare Dashboard**:
   ```
   https://dash.cloudflare.com
   ```

2. **Go to Workers & Pages**:
   - Click on "Workers & Pages" in the left sidebar

3. **Create New Application**:
   - Click "Create application"
   - Select "Workers" tab
   - Click "Create Worker"

4. **Connect Your Repository**:
   - In the worker overview, click "Settings"
   - Scroll to "Git integration" section
   - Click "Connect Git repository"
   - Choose "GitHub" as your Git provider
   - Authorize Cloudflare to access your GitHub account
   - Select your repository: `future-dollar`
   - Choose production branch: `main`

### 3. Configure Build Settings

When prompted, use these settings:

```
Framework preset: None
Build command: (leave empty)
Build output directory: assets
Root directory: /
Environment variables: (none required for basic setup)
```

### 4. Deployment Configuration

The system will automatically:
- Detect your `wrangler.toml` configuration
- Use the worker script at `worker.js`
- Serve static assets from `assets/` directory
- Enable observability features from your config

### 5. First Deployment

After connecting:
1. Push any change to your `main` branch
2. Cloudflare will automatically trigger a deployment
3. Monitor the deployment in the dashboard
4. Your worker will be available at: `https://future-dollar.{your-subdomain}.workers.dev`

## Features Enabled

### Automatic Deployments
- ✅ Push to `main` branch → automatic deployment
- ✅ Pull request → preview deployment
- ✅ Deployment status in GitHub commits

### Observability
- ✅ Real-time logs in Cloudflare dashboard
- ✅ Analytics tracking via Analytics Engine
- ✅ Performance metrics on all responses
- ✅ Error tracking and alerting

### Developer Experience
- ✅ Zero-config deployment
- ✅ Instant rollbacks
- ✅ Preview deployments for testing
- ✅ Build logs and deployment history

## Environment Configuration

For production deployments, you can set environment variables in the Cloudflare dashboard:

1. Go to your worker's "Settings" tab
2. Find "Environment Variables" section
3. Add variables as needed:
   ```
   ENVIRONMENT=production
   ANALYTICS_ENABLED=true
   ```

## Custom Domains

After Git integration is working:

1. Go to worker "Custom Domains" tab
2. Click "Add Custom Domain"
3. Enter your domain (e.g., `app.yourdomain.com`)
4. Cloudflare will handle SSL certificates automatically

## Troubleshooting

### Common Issues:

**Deployment Fails**:
- Check that `wrangler.toml` is valid
- Ensure `worker.js` exists in repository root
- Verify `assets/` directory contains your static files

**Assets Not Loading**:
- Confirm `index.html` and `script.js` are in `assets/` directory
- Check worker logs in Cloudflare dashboard
- Verify file paths in worker script

**Git Integration Not Working**:
- Ensure you have admin access to the GitHub repository
- Re-authorize Cloudflare's GitHub access if needed
- Check webhook delivery in GitHub repository settings

### Getting Help:

1. **Cloudflare Dashboard**: Check deployment logs and worker logs
2. **GitHub**: Verify webhook deliveries in repository settings
3. **Local Testing**: Use `npm run dev` to test locally before pushing

## Next Steps

Once Git integration is working:

1. **Set up branch protection** for your main branch
2. **Configure custom domains** in Cloudflare dashboard
3. **Set up monitoring** and alerting for your worker
4. **Review analytics** to understand usage patterns

Your Cloudflare Worker is now automatically deployed on every push! 🚀