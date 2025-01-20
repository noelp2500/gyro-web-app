// src/Gyroscope.js
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";

const App = () => {
  const [gyroscopeData, setGyroscopeData] = useState({
    alpha: null,
    beta: null,
    gamma: null,
  });

  useEffect(() => {
    if (window.DeviceMotionEvent) {
      const handleDeviceMotion = (event) => {
        const { alpha, beta, gamma } = event.rotationRate;
        setGyroscopeData({ alpha, beta, gamma });
      };
      window.addEventListener("deviceorientation", handleDeviceMotion);
      return () => {
        window.removeEventListener("deviceorientation", handleDeviceMotion);
      };
    } else {
      console.log("DeviceMotionEvent is not supported on this device/browser.");
    }
  }, []);

  return (
    <>
      <h1>Gyroscope Reader</h1>
      <div>
        <h2>Gyroscope Data</h2>
        <div>
          <p>
            <strong>Alpha (Rotation around Z axis):</strong>{" "}
            {gyroscopeData.alpha ? gyroscopeData.alpha.toFixed(2) : "N/A"}
          </p>
          <p>
            <strong>Beta (Rotation around X axis):</strong>{" "}
            {gyroscopeData.beta ? gyroscopeData.beta.toFixed(2) : "N/A"}
          </p>
          <p>
            <strong>Gamma (Rotation around Y axis):</strong>{" "}
            {gyroscopeData.gamma ? gyroscopeData.gamma.toFixed(2) : "N/A"}
          </p>
        </div>
      </div>
    </>
  );
};

export default App;
