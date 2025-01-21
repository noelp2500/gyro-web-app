import React, { useState, useEffect } from "react";
import ReactSpeedometer from "react-d3-speedometer";
const App = () => {
  const [gyroscopeData, setGyroscopeData] = useState({
    z: null,
    x: null,
    y: null,
  });
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [permissionRequested, setPermissionRequested] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);
  const updateInterval = 1000;

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
          const currentTime = Date.now();
          if (currentTime - lastUpdate > updateInterval) {
            // console.log("4444444");
            setGyroscopeData({ z: alpha, x: beta, y: gamma });
            setLastUpdate(currentTime);
          }
          // setGyroscopeData({ z: alpha, x: beta, y: gamma });
        }
      };
      window.addEventListener("devicemotion", handleDeviceMotion);
      return () => {
        window.removeEventListener("devicemotion", handleDeviceMotion);
      };
    }
  }, [permissionGranted, lastUpdate]);

  return (
    <>
      <h2>Khushboo's gyroscope app</h2>
      {!permissionRequested ? (
        <div>
          <h2>
            Please press the button below to grant this app permission to your
            inbuilt gyroscope
          </h2>
          <button onClick={requestPermission}>Grant Permission</button>
        </div>
      ) : permissionGranted ? (
        <div>
          {/* <h3>Gyroscope Data</h3> */}
          <div>
            <p>
              <strong>
                Alpha (Rotation around Z axis):{" "}
                {gyroscopeData.z
                  ? (gyroscopeData.z * 57.2958).toFixed(3)
                  : "N/A"}{" "}
                degrees
              </strong>{" "}
              <ReactSpeedometer
                needleHeightRatio={0.6}
                segmentColors={["limegreen", "gold", "tomato"]}
                maxValue={10}
                minValue={-5}
                width={200}
                height={175}
                value={
                  gyroscopeData.z
                    ? (gyroscopeData.z * 57.2958).toFixed(3)
                    : "N/A"
                }
                currentValueText="Z axis"
                segments={3}
                customSegmentLabels={[
                  {
                    text: "Good",
                    position: "INSIDE",
                    color: "#555",
                  },
                  {
                    text: "Ok",
                    position: "INSIDE",
                    color: "#555",
                    fontSize: "19px",
                  },
                  {
                    text: "Bad",
                    position: "INSIDE",
                    color: "#555",
                  },
                ]}
              />
            </p>
            <p>
              <strong>
                Beta (Rotation around X axis):{" "}
                {gyroscopeData.x
                  ? (gyroscopeData.x * 57.2958).toFixed(3)
                  : "N/A"}{" "}
                degrees
              </strong>{" "}
              <ReactSpeedometer
                segmentColors={["limegreen", "gold", "tomato"]}
                needleHeightRatio={0.6}
                maxValue={10}
                minValue={-5}
                width={200}
                height={175}
                value={
                  gyroscopeData.x
                    ? (gyroscopeData.x * 57.2958).toFixed(3)
                    : "N/A"
                }
                currentValueText="X axis"
                segments={3}
                customSegmentLabels={[
                  {
                    text: "Good",
                    position: "INSIDE",
                    color: "#555",
                  },
                  {
                    text: "Ok",
                    position: "INSIDE",
                    color: "#555",
                    fontSize: "19px",
                  },
                  {
                    text: "Bad",
                    position: "INSIDE",
                    color: "#555",
                  },
                ]}
              />
            </p>
            <p>
              <strong>
                Gamma (Rotation around Y axis):
                {gyroscopeData.y
                  ? (gyroscopeData.y * 57.2958).toFixed(3)
                  : "N/A"}{" "}
                degrees
              </strong>{" "}
              <ReactSpeedometer
                segmentColors={["limegreen", "gold", "tomato"]}
                needleHeightRatio={0.6}
                maxValue={10}
                minValue={-5}
                width={200}
                height={175}
                value={
                  gyroscopeData.y
                    ? (gyroscopeData.y * 57.2958).toFixed(3)
                    : "N/A"
                }
                currentValueText="Y axis"
                segments={3}
                customSegmentLabels={[
                  {
                    text: "Good",
                    position: "INSIDE",
                    color: "#555",
                  },
                  {
                    text: "Ok",
                    position: "INSIDE",
                    color: "#555",
                    fontSize: "19px",
                  },
                  {
                    text: "Bad",
                    position: "INSIDE",
                    color: "#555",
                  },
                ]}
              />
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
