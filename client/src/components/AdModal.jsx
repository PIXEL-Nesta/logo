import React, { useEffect, useState } from "react";

export default function AdModal({ show, onClose, onComplete, job }) {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (!show) return;

    setTimer(40);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (onComplete && job?.jobId) {
            onComplete(`http://localhost:4000/static/${job.jobId}.png`);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
const script = document.createElement("script");
    script.src =
      "//pl27881852.effectivegatecpm.com/80/a3/56/80a356b2a49926df0f50c4608d23e2da.js";
    script.async = true;
    document.body.appendChild(script);
    // Create script for atOptions
    const script1 = document.createElement("script");
    script1.innerHTML = `
      atOptions = {
        'key' : '76de5c27e6be126c380c821c2b83a265',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    `;
    document.getElementById("ad-container").appendChild(script1);

    // Create script to invoke ad
    const script2 = document.createElement("script");
    script2.src =
      "//www.highperformanceformat.com/76de5c27e6be126c380c821c2b83a265/invoke.js";
    script2.async = true;
    document.getElementById("ad-container").appendChild(script2);

    return () => {
      clearInterval(interval);
      if (document.getElementById("ad-container")) {
        document.getElementById("ad-container").innerHTML = "";
      }
    };
  }, [show, job, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow max-w-md w-full text-center">
        {/* Timer */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Watch this ad to get your logo</h2>
          <p className="text-gray-700 text-lg">Time remaining: {timer}s</p>
        </div>

        {/* Ad container */}
        <div
          id="ad-container"
          className="flex justify-center border border-red-500"
          style={{ minHeight: "250px", marginBottom: "20px", width: "300px" }}
        ></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
