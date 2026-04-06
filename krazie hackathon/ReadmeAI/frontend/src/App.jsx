import { useState } from 'react'
import HeroSection from './components/HeroSection'
import OutputSection from './components/OutputSection'
import LoadingSpinner from './components/LoadingSpinner'
import Chatbot from './components/Chatbot'
import { analyzeGitHub } from './utils/chatbotLogic'
import { Zap, Github } from 'lucide-react'

export default function App() {
  const [readme, setReadme] = useState('')
  const [loading, setLoading] = useState(false)
  const [tone, setTone] = useState('Professional')
  const [repoData, setRepoData] = useState(null)
  const [repoInput, setRepoInput] = useState('')
  const [analyzing, setAnalyzing] = useState(false)

  // Mock GitHub analyzer
  const handleAnalyzeRepo = async () => {
    if (!repoInput.trim()) {
      alert('Please enter a GitHub repository URL');
      return;
    }

    setAnalyzing(true);
    try {
      const data = await analyzeGitHub(repoInput);
      setRepoData(data);

      // Generate mock README based on repo data
      const mockReadme = `# ${data.name} 🚀

![License](https://img.shields.io/badge/license-MIT-blue) ![Stars](https://img.shields.io/github/stars/...?style=social) ![Language](https://img.shields.io/badge/language-${data.language}-blue)

## Description

${data.description}

**Topics:** ${data.topics.join(', ')}

## Features

✨ **Feature 1** - Advanced capabilities  
⚡ **Feature 2** - Lightning fast performance  
🎯 **Feature 3** - Highly customizable  
📱 **Feature 4** - Responsive design  

## Installation

\`\`\`bash
git clone https://github.com/${data.owner}/${data.name}.git
cd ${data.name}
npm install
npm run dev
\`\`\`

## Usage

\`\`\`bash
npm start
\`\`\`

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

## License

MIT
`;

      setReadme(mockReadme);
      setRepoInput('');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to analyze repository');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleGenerate = async (repoUrl) => {
    setLoading(true);
    try {
      // Mock implementation - simulate API call
      const mockReadme = `# ${repoUrl.split('/').pop() || 'Project'} 🚀

![License](https://img.shields.io/badge/license-MIT-blue) ![Status](https://img.shields.io/badge/status-active-brightgreen)

## Description

AI-powered README generator that creates professional documentation automatically using advanced machine learning.

## Features

✨ **AI-Powered** - Generates professional READMEs instantly  
⚡ **Fast** - Creates documentation in seconds  
🎯 **Customizable** - Choose tone and style  
📱 **Responsive** - Works on all devices

## Installation

\`\`\`bash
git clone ${repoUrl}
cd project
npm install
\`\`\`

## Usage

\`\`\`bash
npm run dev
\`\`\`

## Contributing

Contributions welcome! Please submit pull requests.

## License

MIT
`;

      setReadme(mockReadme);
    } catch (error) {
      console.error('Error:', error);
      alert('Error generating README. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy font-inter">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[420px] h-[420px] bg-sky opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] bg-purple opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-pink opacity-10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <main className="relative z-10">
        {/* Header */}
        <header className="border-b border-slate-700/20 backdrop-blur-sm sticky top-0 z-50 bg-glass/80 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-extrabold gradient-text drop-shadow-lg">ReadmeAI 🚀</h1>
              <div className="text-xs text-slate-400">Smart README Generator</div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <HeroSection 
          onGenerate={handleGenerate}
          tone={tone}
          setTone={setTone}
          disabled={loading}
        />

        {/* GitHub Analyzer Section */}
        {!readme && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="card-base p-8 border border-sky/30">
              <div className="flex items-center gap-3 mb-6">
                <Github size={28} className="text-sky" />
                <h2 className="text-2xl font-bold gradient-text">Quick GitHub Analysis</h2>
              </div>
              <p className="text-slate-400 mb-6">Paste a GitHub repository URL to get started instantly:</p>
              
              <div className="flex gap-3">
                <input
                  type="text"
                  value={repoInput}
                  onChange={(e) => setRepoInput(e.target.value)}
                  placeholder="https://github.com/user/repo"
                  className="flex-1 input-base"
                  disabled={analyzing}
                />
                <button
                  onClick={handleAnalyzeRepo}
                  disabled={analyzing}
                  className="btn-primary px-8 flex items-center gap-2 disabled:opacity-50"
                >
                  <Zap size={18} />
                  {analyzing ? 'Analyzing...' : 'Analyze'}
                </button>
              </div>

              {repoData && (
                <div className="mt-8 p-6 bg-white/5 rounded-xl border border-slate-700/50">
                  <h3 className="text-xl font-bold mb-4 gradient-text">{repoData.name}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-slate-400">Owner</p>
                      <p className="font-semibold text-white">{repoData.owner}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Stars</p>
                      <p className="font-semibold text-sky">⭐ {repoData.stars}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Language</p>
                      <p className="font-semibold text-purple">{repoData.language}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Updated</p>
                      <p className="font-semibold text-pink">{repoData.lastUpdated}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Output or Loading State */}
        {loading ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <LoadingSpinner />
          </div>
        ) : readme && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <OutputSection readme={readme} />
          </div>
        )}
      </main>

      {/* Chatbot - Always available when README exists */}
      {readme && <Chatbot readme={readme} setReadme={setReadme} />}
    </div>
  )
}
