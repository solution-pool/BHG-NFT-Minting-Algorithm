# Welcome to BHG-Cardano-P5-mint

You have downloaded the BHG-Cardano-P5-mint files.

# Contents of the p5 folder

* p5.js file
* p5.min.js file
* addons folder
  * p5.sound.js
  * p5.sound.min.js
* empty-example folder
  * index.html
  * p5.js
  * p5.sound.js
  * sketch.js
* modules folder
  * differentialLine.js
  * growth.js
  * helpers.js
  * render.js
  * segments.js
  * show.js
  * zonemap.js

## p5.js

This file stores the complete p5.js library. It is easy to read by humans, so feel free to open it and explore its contents. It also has a friendly error system, which helps new programmers with common user errors.

## p5.min.js

This file is a minified version of the p5.js file. It is a lighter version, with the same functionalities, but smaller file size. This minified version is harder to read for humans, and does not include the friendly error system.

## addons folder

The addons folder includes additional p5.js related libraries, in both original versions and minified versions.

### p5.sound.js, p5.sound.min.js

p5.sound extends p5.js with Web Audio functionality including audio input, playback, analysis, and synthesis.

## empty-example folder

This is an empty example of a website. The folder includes the file for the website, index.html, the p5.js library, other related p5.js libraries, and a template starting point for your p5.js sketch, called sketch.js.

### index.html

index.html is a template for an HTML file. This index.html first imports the libraries included in the folder (p5.js, p5.sound.js) then loads and executes the file sketch.js which is where you can write your own code.

### sketch.js

The sketch.js is a template for the p5.js sketch, with the functions setup() and draw() that you can complete.

## modules folder

This modules folder includes core files of the algorithms.
The main functions of each file follows.

### differentialLine.js

This is the entrypoint of the algorithm. You can create and initialize the algorithm object.

### segments.js

This is the core module of the algorithm.
You can control the all of the points which compose the graphics

### zonemap.js

This is to manage the zonemap that the graphics are displayed

### growth.js

This is charge for the growth of the graphics.

## README.txt

This README file formatted with Markdown :)

# What's next?

Will insert initial geometries and images files.

# License

This product is free software; you can redistribute it and/or modify it under the terms of the GNU Lesser General Public License as published by the Free Software Foundation, version 2.1.
