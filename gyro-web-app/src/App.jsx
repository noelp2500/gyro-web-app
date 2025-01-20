import React, { useState, useEffect } from "react";

const App = () => {
  const [gyroscopeData, setGyroscopeData] = useState({
    alpha: null,
    beta: null,
    gamma: null,
  });
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    // Function to request permission for accessing device motion data on iOS
    const requestMotionPermission = async () => {
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
        // If permission request isn't needed (non-iOS or older iOS)
        setPermissionGranted(true);
      }
    };

    // Request permission on initial load
    if (window.DeviceMotionEvent) {
      requestMotionPermission();
    } else {
      console.log("DeviceMotionEvent is not supported on this device/browser.");
    }

    // Add event listener for device motion once permission is granted
    const handleDeviceMotion = (event) => {
      if (event.rotationRate) {
        const { alpha, beta, gamma } = event.rotationRate;
        setGyroscopeData({ alpha, beta, gamma });
      }
    };

    // Add event listener if permission is granted
    if (permissionGranted) {
      window.addEventListener("devicemotion", handleDeviceMotion);
      return () => {
        window.removeEventListener("devicemotion", handleDeviceMotion);
      };
    }
  }, [permissionGranted]);

  return (
    <>
      <h1>Gyroscope Reader</h1>
      {permissionGranted ? (
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
      ) : (
        <div>
          <h2>Permission to access motion data is required</h2>
          <p>Please grant permission to access the gyroscope data.</p>
        </div>
      )}
    </>
  );
};

export default App;
