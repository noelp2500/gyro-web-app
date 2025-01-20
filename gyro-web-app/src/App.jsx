import React, { useState, useEffect } from "react";

const App = () => {
  const [gyroscopeData, setGyroscopeData] = useState({
    alpha: null,
    beta: null,
    gamma: null,
  });
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [permissionRequested, setPermissionRequested] = useState(false);

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

  useEffect(() => {
    // Function to handle gyroscope data and update state
    const handleDeviceMotion = (event) => {
      if (event.rotationRate) {
        const { alpha, beta, gamma } = event.rotationRate;
        setGyroscopeData({ alpha, beta, gamma });
      }
    };

    let intervalId;
    if (permissionGranted && window.DeviceMotionEvent) {
      intervalId = setInterval(() => {
        window.addEventListener("devicemotion", handleDeviceMotion);
      }, 2000);

      return () => {
        clearInterval(intervalId);
        window.removeEventListener("devicemotion", handleDeviceMotion);
      };
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [permissionGranted]);

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
                ? gyroscopeData.alpha.toFixed(2) * 57.2958
                : "N/A"}
            </p>
            <p>
              <strong>Beta (Rotation around X axis):</strong>{" "}
              {gyroscopeData.beta
                ? gyroscopeData.beta.toFixed(2) * 57.2958
                : "N/A"}
            </p>
            <p>
              <strong>Gamma (Rotation around Y axis):</strong>{" "}
              {gyroscopeData.gamma
                ? gyroscopeData.gamma.toFixed(2) * 57.2958
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
