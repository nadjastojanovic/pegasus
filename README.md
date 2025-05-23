<a id="readme-top"></a>

<div align="center">

![Contributors](https://img.shields.io/badge/Contributors-2-green.svg?style=for-the-badge)
![Forks](https://img.shields.io/badge/Forks-0-blue.svg?style=for-the-badge)
![Stars](https://img.shields.io/badge/Stars-0-yellow.svg?style=for-the-badge)
![Issues](https://img.shields.io/badge/Issues-0-red.svg?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-lavender.svg?style=for-the-badge)

</div>

<div align="center">
    <h3 align="center">Pegasus</h3>

  <p align="center">
    A digital pegboard game combining Arduino-powered hardware and a companion mobile app to support hand dexterity training and cognitive rehabilitation. 
  </p>
</div>

<div align="center">

[![ReactNative][ReactNative]][ReactNative-url]
[![Expo][Expo]][Expo-url]
[![Node][Node.js]][Node.js-url]
[![Express][Express.js]][Express.js-url]
[![MongoDB][MongoDB]][MongoDB-url]

</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About the project</a>
      <ul>
        <li><a href="#key-features">Key features</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributors">Contributors</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![App Screenshots][app_screenshots]](#todo)

Pegasus is an assistive rehabilitation tool designed to support individuals with fine motor skill challenges through interactive, pattern-based exercises. The system integrates a physical pegboard powered by Arduino, light sensors and LED feedback, as well as a companion mobile app for session management and progress tracking.

### Key features
* <b>User Registration & Authentication</b>
* <b>Pattern Selection</b> - based on varying difficulty levels
* <b>Session Management & Progress Tracking</b> - allows users and their caretakers to monitor their rehabilitation
* <b>Serial communication to/from the Arduino</b> - to communicate the selected pattern and the time taken to complete it

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB (local or remote)
- Expo CLI (`npm install -g expo-cli`)
- Arduino IDE
- USB connection to an Arduino Uno

To get a local copy up and running follow these steps.

### 1. Backend setup

```
cd backend/node
npm install
node app.js
```

### 2. Frontend setup

```
cd frontend/pegasusApp
npm install
npm run web # or `npm start` to run on mobile via Expo Go
```

### Arduino

1. Open hardware/LDRThresholds.ino in the Arduino IDE. Make sure to select the correct port under Tools > Port, and upload the sketch.
2. Calibrate the LDR resistors' thresholds by manipulating the amount of light shone onto the resistors and check the serial monitor to see the corresponding resistance. LDR calibration should be repeated for every change in scenery due to variable light levels.
3. Now, open hardware/prototype.ino in the Arduino IDE. Again, make sure to select the correct port under Tools > Port, and upload the sketch.

### Make it all come together!

If your frontend and backend are running with no errors, scan the QR code using the Expo Go app on your phone!

<b>Note:</b> If you connect Arduino to a different USB port, update the port in app.js:
```
const ARDUINO_PORT = '/dev/tty.usbserial-110'; 
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Add real-time graphs and analytics for patient progress.
- [x] Gamify daily streaks and achievements to boost patient engagement.
- [ ] Add password encryption (bcrypt) and secure authentication (JWT).
- [ ] Improve mobile UI/UX for accessibility and ease of use.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
### Contributors:

<a href="https://github.com/nadjastojanovic/pegasus/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=nadjastojanovic/pegasus" />
</a>

Nada Stojanovic - [nadjastojanovic](https://github.com/nadjastojanovic) - nas225@lehigh.edu <br/>
Barbara Monteiro Carvalho - [bmcbarbara](https://github.com/bmcbarbara) - bam426@lehigh.edu

Project Link: [https://github.com/nadjastojanovic/pegasus](https://github.com/nadjastojanovic/pegasus)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[app_screenshots]: /frontend/pegasusApp/assets/images/app_screenshots.png

[ReactNative]: https://img.shields.io/badge/React_Native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB/
[ReactNative-url]: https://reactnative.dev/

[Expo]: https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=fff
[Expo-url]: https://docs.expo.dev/

[Node.js]: https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[Node.js-url]: https://nodejs.org/en

[Express.js]: https://img.shields.io/badge/Express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express.js-url]: https://expressjs.com/

[MongoDB]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/