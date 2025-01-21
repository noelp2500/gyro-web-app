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
          setGyroscopeData({ z: alpha, x: beta, y: gamma });
        }
      };
      window.addEventListener("devicemotion", handleDeviceMotion);
      return () => {
        window.removeEventListener("devicemotion", handleDeviceMotion);
      };
    }
  }, [permissionGranted]);

  return (
    <>
      <h2>Gyroscope Reader</h2>
      {!permissionRequested ? (
        <div>
          <h2>Request Permission to Access Gyroscope</h2>
          <button onClick={requestPermission}>Grant Permission</button>
        </div>
      ) : permissionGranted ? (
        <div>
          {/* <h3>Gyroscope Data</h3> */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              marginLeft: "10%",
            }}
          >
            <p>
              <strong>
                Alpha (Rotation around Z axis):{" "}
                {gyroscopeData.z
                  ? (gyroscopeData.z * 57.2958).toFixed(3)
                  : "N/A"}
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
                  : "N/A"}
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
                  : "N/A"}
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
