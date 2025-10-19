import React, { useState } from 'react';

export default function LogoForm({ onCreated }) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt) return;
    setLoading(true);

    const jobId = 'job_' + Date.now();

    // Trigger parent callback
    onCreated({ jobId, prompt });

    setPrompt('');
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="font-medium">Enter logo prompt:</label>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="border p-2 rounded"
        placeholder="e.g., Tech startup logo with blue tones"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {loading ? 'Creating...' : 'Create Logo'}
      </button>
    </form>
  );
}
