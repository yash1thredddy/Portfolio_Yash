# 🚀 Portfolio Setup Instructions for Yashwanth

## 📋 **Step 1: Install Dependencies**

Run this command in your terminal:

```bash
pnpm install
```

This will install the DeepSeek AI SDK (via OpenAI-compatible interface) and other dependencies.

## 🔐 **Step 2: Set Up Environment Variables**

Create a file called `.env.local` in your project root with this content:

```env
# DeepSeek AI API Configuration
DEEPSEEK_API_KEY=your_actual_deepseek_api_key_here

# Optional: GitHub Token for star count
GITHUB_TOKEN=your_github_token_here

# Environment
NODE_ENV=development
```

**Replace `your_actual_deepseek_api_key_here` with your real DeepSeek API key.**
Get your API key from: [platform.deepseek.com](https://platform.deepseek.com)

## 🎯 **Step 3: Test Locally**

Run the development server:

```bash
pnpm dev
```

Visit `http://localhost:3000` to test your portfolio.

## 🚀 **Step 4: Deploy to Vercel**

1. **Push to GitHub** (if not already done)
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `DEEPSEEK_API_KEY` with your DeepSeek API key
     - `GITHUB_TOKEN` (optional) with your GitHub token
3. **Deploy!**

## ✅ **What's Been Updated:**

- ✅ **Personal Information**: Yashwanth Reddy Dasari, Software Engineer at ImpacterAI
- ✅ **Contact Details**: Email, phone, LinkedIn, GitHub (San Francisco, CA)
- ✅ **E-Shaped Engineer Profile**: Showcasing expertise across multiple domains
- ✅ **API Integration**: Switched from Mistral to DeepSeek AI
- ✅ **Professional Experience**: ImpacterAI, UIC, SimplyFI with metrics and impact
- ✅ **Skills**: Backend, Distributed Systems, AI/ML, Full-Stack expertise
- ✅ **Projects**: Updated with your actual projects (AI Bias Mitigation, LLM Optimization, DynamicFlow, CrashLens)
- ✅ **AI Personality**: Customized to showcase E-shaped engineering expertise

## 🎨 **Next Steps:**

1. **Test the AI chat** functionality - ask it about your projects, skills, experience
2. **Replace project screenshots** - Add screenshots for your projects in `/public/projects/`
3. **Customize colors** (if desired) - current theme is clean and professional
4. **Add additional projects** - Update `src/components/projects/Data.tsx` if needed
5. **Optional**: Replace memoji images with your own profile photos

## 🔧 **Troubleshooting:**

If you see linter errors about missing modules:
1. Make sure you ran `pnpm install`
2. Restart your development server
3. The errors should disappear after installation
