import React, { useEffect, useState } from 'react';

export default function AdModal({ show, onClose, onComplete, job }) {
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (!show) return;
    setTimer(30);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete(`http://localhost:4000/static/${job.jobId}.png`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [show, job, onComplete]);

  if (!show) return null;

  return (
    <div dangerouslySetInnerHTML={{
  __html: `<script type='text/javascript' src='//pl27881852.effectivegatecpm.com/80/a3/56/80a356b2a49926df0f50c4608d23e2da.js'></script>`,
}} />

    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow max-w-md w-full text-center">
        <h2 className="text-xl font-bold mb-4">Watch this ad to get your logo</h2>
        <p className="mb-4">Time remaining: {timer}s</p>

        {/* Google AdSense placeholder */}
        <div className="h-40 bg-gray-200 flex items-center justify-center mb-4">
          <span className="text-gray-500">
            {/* Google AdSense script will go here */}
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            ></script>
            <ins
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-XXXXXXXXXXXXXX"
              data-ad-slot="1234567890"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
          </span>
        </div>

        <button
          onClick={onClose}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
