node-arduino-web-notifier
==

# Testing
- Install "Node.js" to your PC from [here](https://nodejs.org/)
- Download or clone this repository to your PC.
- Open `node-arduino-web-notifier.ino` and write to your Arduino.
- Get the name of the USB port that is connected to your Arduino (like "/dev/cu.usbmodem14431")
  - You can find the device name on ArduinoIDE
- Input command to terminal like: `npm run start <portname>` like: `npm run start /dev/cu.usbmodem14431`
- Open URL `http://localhost:8080`. You can use any web browser.
