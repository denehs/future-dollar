# Deployment Guide for Tomorrow's Dollar

This document provides instructions for deploying the Tomorrow's Dollar application to various hosting platforms.

## ⚡ Cloudflare Workers (Recommended)

Cloudflare Workers provides global edge deployment with built-in analytics and excellent performance.

## 🔄 Git Integration Setup (Recommended)

Cloudflare Workers supports direct Git integration for automatic deployments on push.

### Prerequisites:
- A Cloudflare account (free tier available)
- GitHub repository with your code

### Setup Steps:
1. **Go to Cloudflare Dashboard**:
   - Navigate to https://dash.cloudflare.com
   - Go to "Workers & Pages"

2. **Create New Worker**:
   - Click "Create application"
   - Select "Workers" tab
   - Click "Create Worker"

3. **Connect GitHub Repository**:
   - In the worker settings, go to "Settings" tab
   - Find "Git integration" section
   - Click "Connect Git repository"
   - Authorize Cloudflare to access your GitHub account
   - Select your `future-dollar` repository
   - Choose the `main` branch for production deployments

4. **Configure Build Settings**:
   - Build command: (leave empty)
   - Build output directory: `assets`
   - Root directory: `/` (project root)

5. **Environment Variables** (if needed):
   - Add any required environment variables in the dashboard

6. **Deploy**:
   - Push changes to your main branch
   - Cloudflare will automatically deploy your worker
   - Access at: `https://future-dollar.{your-subdomain}.workers.dev`

### Features with Git Integration:
- **Automatic Deployments**: Every push to main branch triggers deployment
- **Preview Deployments**: Pull requests get preview URLs
- **Rollback Support**: Easy rollback to previous deployments
- **Build Logs**: View deployment logs in the dashboard

## 🛠 Manual Deployment (Alternative)

If you prefer manual deployment using Wrangler CLI:

### Prerequisites:
- Node.js 16.0.0 or later
- Wrangler CLI

### Steps:
1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Wrangler**:
   ```bash
   npx wrangler login
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

### Features:
- **Observability**: Built-in logging and analytics
- **Performance**: Global edge network with automatic caching
- **Security**: Automatic HTTPS and security headers
- **Analytics**: Track usage with Analytics Engine binding
- **Real-time logs**: Use `npm run tail` to stream logs

### Custom Domain:
1. Go to your Cloudflare dashboard
2. Navigate to Workers & Pages
3. Select your worker
4. Go to "Custom Domains" tab
5. Add your domain

### Monitoring:
- View logs: `npm run tail`
- Analytics: Available in Cloudflare dashboard
- Performance metrics: X-Response-Time header on all responses

### Troubleshooting:
- **Build errors**: Ensure you have the assets directory with your static files
- **404 errors**: Check that index.html and script.js are in the assets directory
- **Deployment fails**: Verify you're logged in with `npx wrangler whoami`
- **Custom domain issues**: Ensure DNS is properly configured in Cloudflare

## 🐙 GitHub Pages

GitHub Pages is a simple option for static hosting.

## 🌐 Netlify

Netlify offers easy deployment with continuous integration.

### Steps:
1. **Connect Repository**: 
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
2. **Configure Build Settings**:
   - Build command: (leave empty)
   - Publish directory: (leave empty or set to `/`)
3. **Deploy**: Click "Deploy site"

### Benefits:
- Automatic deployments on git push
- Form handling (for future contact forms)
- Custom domains with SSL
- Branch previews

## ⚡ Vercel

Vercel provides excellent performance and developer experience.

### Steps:
1. **Import Project**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
2. **Configure**:
   - Framework Preset: Other
   - Root Directory: `./`
   - Build and Output Settings: (leave default)
3. **Deploy**: Click "Deploy"

### Benefits:
- Edge network for fast loading
- Automatic HTTPS
- Preview deployments
- Analytics

## 🔧 Local Development Server

For local testing and development:

### Using Python (Built-in):
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Using Node.js:
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server
```

### Using PHP (if available):
```bash
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 📁 File Structure for Deployment

Your deployment should include these files:
```
├── index.html          # Main application file
├── script.js           # JavaScript functionality
├── README.md           # Documentation
├── LICENSE             # License information
├── package.json        # Project metadata
└── .gitignore         # Git ignore rules
```

## 🔍 Pre-Deployment Checklist

Before deploying, ensure:
- [ ] All links work correctly
- [ ] Application works on different screen sizes
- [ ] JavaScript functions properly
- [ ] All input validation works
- [ ] Error handling is in place
- [ ] Performance is optimized

## 🛠 Build Optimization (Optional)

For production deployment, you might want to:

### Minify JavaScript:
- Use tools like UglifyJS or Terser
- Reduces file size for faster loading

### Optimize Images:
- Compress any images you might add later
- Use appropriate formats (WebP, AVIF)

### Add Caching Headers:
Configure your hosting platform to set appropriate cache headers for static assets.

## 🔒 Security Considerations

Since this is a client-side application:
- No sensitive data processing
- No backend required
- HTTPS automatically provided by most platforms
- No database or user data storage

## 📊 Analytics (Optional)

To track usage, you can add:
- Google Analytics
- Plausible Analytics
- Simple Analytics

Add the tracking code to the `<head>` section of `index.html`.

## 🚨 Troubleshooting

### Common Issues:
1. **404 Error**: Check that `index.html` is in the root directory
2. **JavaScript not working**: Ensure `script.js` path is correct
3. **Styling issues**: Verify Tailwind CSS CDN link is working
4. **CORS errors**: Use a proper web server, not file:// protocol

### Testing Your Deployment:
1. Test on different devices and browsers
2. Check all calculations work correctly
3. Verify responsive design
4. Test the advanced assumptions toggle
5. Validate asset allocation error handling

## 📞 Support

If you encounter deployment issues:
1. Check the hosting platform's documentation
2. Verify all files are properly uploaded
3. Test locally first to isolate issues
4. Check browser console for JavaScript errors

---

**Your Tomorrow's Dollar application is now ready for deployment!** 🎉 