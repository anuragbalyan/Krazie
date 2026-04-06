import { useState } from 'react'
import Chatbot from './components/Chatbot'
import OutputSection from './components/OutputSection'
import { MessageCircle } from 'lucide-react'

export default function App() {
  const [readme, setReadme] = useState('')
  const [repoInput, setRepoInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  const handleAnalyze = async () => {
    if (!repoInput.trim()) {
      alert('Please enter a GitHub repository URL')
      return
    }

    setLoading(true)

    // Mock analysis delay
    setTimeout(() => {
      const repoName = repoInput.split('/').pop() || 'Your Project'
      const mockReadme = `# ${repoName} 🚀

## Description
An amazing project that does incredible things! This repository contains cutting-edge technology and innovative solutions.

## Features
- ✨ Feature 1
- 🚀 Feature 2
- 💡 Feature 3

## Installation
\`\`\`bash
git clone ${repoInput}
cd ${repoName}
npm install
\`\`\`

## Usage
\`\`\`bash
npm start
\`\`\`

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License.`

      setReadme(mockReadme)
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-navy text-slate-100">
      {/* Subtle Background Accents */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent opacity-5 rounded-full blur-3xl"></div>
      </div>

      <main className="relative z-10">
        {/* Header */}
        <header className="border-b border-slate-700/20 sticky top-0 z-40 bg-navy/95 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-5">
            <h1 className="text-3xl font-bold gradient-text">ReadmeAI</h1>
            <p className="text-sm text-slate-400 mt-1">Professional README generator powered by AI</p>
          </div>
        </header>

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="text-5xl font-bold text-slate-50 mb-3">Generate Professional READMEs</h2>
          <p className="text-lg text-slate-400 mb-12">Analyze your GitHub repository and create comprehensive documentation instantly</p>

          {/* Input Section */}
          <div className="card-base p-8 mb-12">
            <label className="block text-sm font-semibold text-slate-100 mb-4">GitHub Repository URL</label>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="https://github.com/username/repository"
                value={repoInput}
                onChange={(e) => setRepoInput(e.target.value)}
                className="input-base flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
              />
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="btn-primary px-8 py-3 whitespace-nowrap"
              >
                {loading ? 'Analyzing...' : 'Generate README'}
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-3">Paste your GitHub URL and let our AI analyze your project structure</p>
          </div>

          {/* Output Section with Chat Button */}
          {readme && (
            <>
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
                <h3 className="text-2xl font-semibold text-slate-50">Generated README</h3>
                <button
                  onClick={() => setChatOpen(!chatOpen)}
                  className="btn-accent flex items-center gap-2 px-6 py-3 rounded-lg whitespace-nowrap"
                >
                  <MessageCircle size={20} />
                  {chatOpen ? 'Close Assistant' : 'Open AI Assistant'}
                </button>
              </div>
              <OutputSection readme={readme} />
            </>
          )}
        </section>
      </main>

      {/* AI Assistant Chat Panel */}
      <Chatbot readme={readme} setReadme={setReadme} isOpen={chatOpen} setIsOpen={setChatOpen} />
    </div>
  )
}
