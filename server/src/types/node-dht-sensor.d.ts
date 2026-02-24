declare module 'node-dht-sensor' {
  interface SensorResult {
    temperature: number;
    humidity: number;
    isValid: boolean;
    errors: number;
  }

  function read(sensorType: number, pin: number): SensorResult;
  function readSync(sensorType: number, pin: number): SensorResult;
}
