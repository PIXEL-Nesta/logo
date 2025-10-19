import React, { useState } from 'react';
import LogoForm from './components/LogoForm';
import AdModal from './components/AdModal';
import ResultView from './components/ResultView';

export default function App() {
  const [job, setJob] = useState(null);
  const [showAd, setShowAd] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Logo Studio</h1>
          <p className="text-lg md:text-xl mb-6">
            Create stunning AI-generated logos instantly. Watch a short sponsored clip to unlock your free preview.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8 mt-8">
        <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">Generate Your Logo</h2>
          <LogoForm
            onCreated={(jobInfo) => {
              setJob(jobInfo);
              setShowAd(true);
            }}
          />
        </div>

        <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col items-center">
          {resultUrl ? (
            <ResultView url={resultUrl} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <p className="text-center">Your logo preview will appear here after generation.</p>
            </div>
          )}
        </div>
      </main>

      <AdModal
        show={showAd}
        job={job}
        onClose={() => setShowAd(false)}
        onComplete={(url) => {
          setResultUrl(url);
          setShowAd(false);
        }}
      />
    </div>
  );
}
