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
  const toDegrees = (radian) => radian * (180 / Math.PI);

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
                Single Speedometer:{" "}
                {gyroscopeData.z
                  ? Number(
                      Math.sqrt(
                        gyroscopeData.x ** 2 +
                          gyroscopeData.y ** 2 +
                          gyroscopeData.z ** 2
                      ).toFixed(3)
                    )
                  : "N/A"}{" "}
                degrees/sec
              </strong>{" "}
              <ReactSpeedometer
                needleHeightRatio={0.6}
                segmentColors={["limegreen", "gold", "tomato"]}
                maxValue={200}
                minValue={0}
                customSegmentStops={[0, 8, 15, 200]}
                width={400}
                height={375}
                value={
                  gyroscopeData.z
                    ? Number(
                        Math.sqrt(
                          gyroscopeData.x ** 2 +
                            gyroscopeData.y ** 2 +
                            gyroscopeData.z ** 2
                        ).toFixed(3)
                      )
                    : "N/A"
                }
                currentValueText={
                  gyroscopeData.z
                    ? (() => {
                        const val = Number(
                          Math.sqrt(
                            gyroscopeData.x ** 2 +
                              gyroscopeData.y ** 2 +
                              gyroscopeData.z ** 2
                          ).toFixed(3)
                        );
                        const label =
                          val <= 8
                            ? "STABLE"
                            : val <= 15
                            ? "MODERATE"
                            : "UNSTABLE";
                        return `Status: ${label}`;
                      })()
                    : "Status: N/A"
                }
                // segments={3}
                customSegmentLabels={[
                  {
                    text: "",
                    position: "INSIDE",
                    color: "#555",
                    fontSize: "10px",
                  },
                  {
                    text: "",
                    position: "INSIDE",
                    color: "#555",
                    fontSize: "10px",
                  },
                  {
                    text: "UNSTABLE",
                    position: "INSIDE",
                    color: "#555",
                    fontSize: "10px",
                  },
                ]}
              />
            </p>
            {/* <p>
              <strong>
                Beta (Rotation around X axis):{" "}
                {gyroscopeData.x ? gyroscopeData.x.toFixed(3) : "N/A"} radians
              </strong>{" "}
              <ReactSpeedometer
                segmentColors={[
                  "tomato",
                  "limegreen",
                  "gold",
                  "limegreen",
                  "tomato",
                ]}
                needleHeightRatio={0.6}
                maxValue={2}
                minValue={-2}
                width={200}
                height={175}
                value={gyroscopeData.x ? gyroscopeData.x.toFixed(3) : "N/A"}
                currentValueText="X axis"
                segments={5}
                customSegmentLabels={[
                  {
                    text: "",
                    position: "INSIDE",
                    color: "#555",
                  },
                  {
                    text: "",
                    position: "INSIDE",
                    color: "#555",
                  },
                  {
                    text: "",
                    position: "INSIDE",
                    color: "#555",
                    fontSize: "19px",
                  },
                  {
                    text: "",
                    position: "INSIDE",
                    color: "#555",
                  },
                  {
                    text: "",
                    position: "INSIDE",
                    color: "#555",
                  },
                ]}
              />
            </p>
            <p>
              <strong>
                Gamma (Rotation around Y axis):
                {gyroscopeData.y ? gyroscopeData.y.toFixed(3) : "N/A"} radians
              </strong>{" "}
              <ReactSpeedometer
                segmentColors={[
                  "tomato",
                  "limegreen",
                  "gold",
                  "limegreen",
                  "tomato",
                ]}
                needleHeightRatio={0.6}
                maxValue={2}
                minValue={-2}
                width={200}
                height={175}
                value={gyroscopeData.y ? gyroscopeData.y.toFixed(3) : "N/A"}
                currentValueText="Y axis"
                segments={5}
                customSegmentLabels={[
                  {
                    text: "",
                    position: "INSIDE",
                    color: "#555",
                  },
                  {
                    text: "",
                    position: "INSIDE",
                    color: "#555",
                  },
                  {
                    text: "",
                    position: "INSIDE",
                    color: "#555",
                    fontSize: "19px",
                  },
                  {
                    text: "",
                    position: "INSIDE",
                    color: "#555",
                  },
                  {
                    text: "",
                    position: "INSIDE",
                    color: "#555",
                  },
                ]}
              />
            </p> */}
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
