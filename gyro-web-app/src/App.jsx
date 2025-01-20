import React, { useState, useEffect } from "react";

const App = () => {
  const [gyroscopeData, setGyroscopeData] = useState({
    x: null,
    y: null,
    z: null,
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
    if (permissionGranted && window.DeviceMotionEvent) {
      const handleDeviceMotion = (event) => {
        if (event.rotationRate) {
          const { alpha, beta, gamma } = event.rotationRate;

          // Update gyroscope data immediately
          setGyroscopeData({ x: alpha, y: beta, z: gamma });
        }
      };

      // Set interval to trigger every 10 seconds
      const motionInterval = setInterval(() => {
        if (window.DeviceMotionEvent) {
          window.addEventListener("devicemotion", handleDeviceMotion);
        }
      }, 10000); // Every 10 seconds

      // Cleanup the interval when the component is unmounted or permission is revoked
      return () => {
        clearInterval(motionInterval);
        window.removeEventListener("devicemotion", handleDeviceMotion);
      };
    }
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
              {gyroscopeData.x ? (gyroscopeData.x * 57.2958).toFixed(3) : "N/A"}
            </p>
            <p>
              <strong>Beta (Rotation around X axis):</strong>{" "}
              {gyroscopeData.y ? (gyroscopeData.y * 57.2958).toFixed(3) : "N/A"}
            </p>
            <p>
              <strong>Gamma (Rotation around Y axis):</strong>{" "}
              {gyroscopeData.z ? (gyroscopeData.z * 57.2958).toFixed(3) : "N/A"}
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
