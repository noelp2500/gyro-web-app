import React, { useState, useEffect } from "react";

const App = () => {
  const [gyroscopeData, setGyroscopeData] = useState({
    x: null,
    y: null,
    gamma: null,
  });
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [permissionRequested, setPermissionRequested] = useState(false);
  const [flag, setFlag] = useState(true);

  const requestPermission = async () => {
    if (typeof DeviceMotionEvent.requestPermission === "function") {
      try {
        const response = await DeviceMotionEvent.requestPermission();
        if (response === "granted") {
          setPermissionGranted(true);
        } else {
          console.log("Permission denied");
        }
      } catch (err) {
        console.error("Error requesting permission: ", err);
      }
    } else {
      setPermissionGranted(true);
    }
    setPermissionRequested(true);
  };
  setInterval(() => {
    setFlag(!flag);
  }, 10000);
  useEffect(() => {
    if (permissionGranted && window.DeviceMotionEvent) {
      // Create a function that handles device motion data
      const handleDeviceMotion = (event) => {
        if (event.rotationRate) {
          const { alpha, beta, gamma } = event.rotationRate;
          setGyroscopeData({ alpha, beta, gamma });
        }
      };

      // Set up an interval to update every 10 seconds
      const intervalId = setInterval(() => {
        window.addEventListener("devicemotion", handleDeviceMotion, {
          once: true,
        });
      }, 10000); // 10 seconds

      // Clean up the interval when component unmounts
      return () => {
        clearInterval(intervalId);
        window.removeEventListener("devicemotion", handleDeviceMotion);
      };
    }
  }, [permissionGranted, flag]);

  return (
    <>
      <h1>Gyroscope Reader</h1>
      {!permissionRequested ? (
        <div>
          <h2>Request Permission to Access Gyroscope</h2>
          <button onClick={requestPermission}>Grant Permission</button>
        </div>
      ) : permissionGranted ? (
        <div>
          <h2>Gyroscope Data</h2>
          <div>
            <p>
              <strong>Alpha (Rotation around Z axis):</strong>{" "}
              {gyroscopeData.alpha
                ? (gyroscopeData.alpha * 57.2958).toFixed(3)
                : "N/A"}
            </p>
            <p>
              <strong>Beta (Rotation around X axis):</strong>{" "}
              {gyroscopeData.beta
                ? (gyroscopeData.beta * 57.2958).toFixed(3)
                : "N/A"}
            </p>
            <p>
              <strong>Gamma (Rotation around Y axis):</strong>{" "}
              {gyroscopeData.gamma
                ? (gyroscopeData.gamma * 57.2958).toFixed(3)
                : "N/A"}
            </p>
          </div>
        </div>
      ) : (
        <div>
          <h2>Permission Denied</h2>
          <p>You need to grant permission to access the gyroscope data.</p>
        </div>
      )}
    </>
  );
};

export default App;
