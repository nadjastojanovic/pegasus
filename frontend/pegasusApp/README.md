<a id="readme-top"></a>

<div align="center">

![Contributors](https://img.shields.io/badge/Contributors-3-green.svg?style=for-the-badge)
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
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![App Screenshots][app_screenshots]](#todo)

CodeCooks is a dynamic recipe-sharing web application built with Next.js, designed for users to create, browse, favorite, and manage recipes. It supports authentication, role-based authorization, and showcases recipes in an engaging, interactive way. External API integration also allows users to explore a surprise recipe each day.

### Key features
* <b>User Accounts & Roles</b> - users vs. admin
* <b>Social element</b> - in addition to creating and deleting recipes, authenticated users can also leave comments and favorite recipes to show their support!
* <b>Recipe search</b> - search bar and tag filtering system make finding a recipe quick and easy! 
* <b>Interactive UI</b> - real-time updates, animations, and other dynamic elements.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these steps.

### 1. Clone the repo

```
git clone https://github.com/nadjastojanovic/codeCooks.git
```

### 2. Dependencies

You must have node.js running on your machine.

```
cd codeCooks
npm install
```

### 3. Configure environment variables

Create a new file in the root of the repository called `.env`, and copy the contents of `.env.example` into `.env`. Update `.env` with your database credentials.

### 4. Run the development server
```
npm run dev
```

### 5. Check it out!

Visit <a href="http://localhost:3000/" target="_">http://localhost:3000</a> in your browser to view the app in action. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] In-place update of recipe grid after user adds recipe
- [x] Automatically log in and redirect to /home when user signs up
- [ ] Enable image upload when adding recipe
- [ ] Allow custom recipe tags
- [ ] Allow users to reply to comments and start comment threads
- [ ] Star rating system for recipes

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
### Contributors:

<a href="https://github.com/nadjastojanovic/codeCooks/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=nadjastojanovic/codecooks" />
</a>

Nada Stojanovic - [nadjastojanovic](https://github.com/nadjastojanovic) - nas225@lehigh.edu <br/>
Trevor Lachman - [TrevorAL](https://github.com/TrevorAL) - tal225@lehigh.edu

Project Link: [https://github.com/nadjastojanovic/codeCooks](https://github.com/nadjastojanovic/codeCooks)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Libraries used:

* [MaterialUI](https://www.npmjs.com/package/@mui/material)
* [MaterialUI Icons](https://www.npmjs.com/package/@mui/icons-material)
* [framer-motion](https://www.npmjs.com/package/framer-motion)
* [lottie-react](https://www.npmjs.com/package/lottie-react)
* [html2canvas](https://www.npmjs.com/package/html2canvas)
* [jsPDF](https://www.npmjs.com/package/jspdf)
* [react-photo-view](https://www.npmjs.com/package/react-photo-view)

External API used:
* [TheMealDB](https://www.themealdb.com/)

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