import React from 'react';

export default function ResultView({ url }) {
  if (!url) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', url.split('/').pop());
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <h3 className="text-xl font-semibold">Your Logo Preview</h3>
      <div className="border rounded-lg shadow p-4 w-full flex justify-center items-center bg-gray-50">
        <img src={url} alt="Generated Logo" className="max-h-64 max-w-full object-contain" />
      </div>
      <button
        onClick={handleDownload}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
      >
        Download
      </button>
    </div>
  );
}
