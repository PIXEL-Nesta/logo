import React, { useEffect, useState } from "react";

export default function AdModal({ show, onClose, onComplete, job }) {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (!show) return;

    // Reset timer
    setTimer(30);

    // Start countdown
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (onComplete && job?.jobId) {
            // Unlock logo after 30s
            onComplete(`http://localhost:4000/static/${job.jobId}.png`);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Add Adsterra script dynamically
    const script = document.createElement("script");
    script.src =
      "//pl27881852.effectivegatecpm.com/80/a3/56/80a356b2a49926df0f50c4608d23e2da.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      clearInterval(interval);
      document.body.removeChild(script);
    };
  }, [show, job, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow max-w-md w-full text-center">
        <>
          <h2 className="text-xl font-bold mb-4">Watch this ad to get your logo</h2>
          <p className="mb-4">Time remaining: {timer}s</p>
          <p className="text-gray-500 text-sm">
            The ad will unlock your logo after the timer ends.
          </p>
        </>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
