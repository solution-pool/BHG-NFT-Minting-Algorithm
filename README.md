# Welcome to BHG-Cardano-P5-mint

You have downloaded the BHG-Cardano-P5-mint files.

# About the nfts of this project

* Mint Size:
  - 8,888

* Rarities: apply to all traits
  - Normal (31%) 2755
  - Unusual (25%) 2222
  - Special (19%) 1688
  - Rare (12%) 1066
  - Ultra Rare (7%) 622
  - Legendary (5%) 444
  - Exo (1%) 88
  (- Unique (0.0001%) 3)


* Growth Type:
  - Bursting: ref. 13, 112
  - Overlapping Circle: ref. 3
  - OG Coral Beta 2D: ref. 838 (line)
  - OG Coral Alpha 2D: ref. 50 (Circle)
  - OG Coral Beta 3D (From Line): ref. 16, 17, 20, Discord
  - OG Coral Beta 3D (From center): ref. 279
  - OG Coral Alpha 3D: ref. 53, 60, 275
  (- Unique Growth Type: ref. )

* Colors
  - send several colors to choose from please 

* Location
  - Added later to metadata after collection is done (randomized)

* Thumbnail Image
  - Capture Full Growth
* Groth rate
* Size: 
  - 7 different possible sizes rarity from smallest being least rare, to largest being the most rare.
* Growth speed 
  - 7 different possible growth speeds from slowest being least rare to fastest being most rare.
* Growth rythm (contraction and expansion)
  - 7 different kinds of repeated expansion and contraction
  - for example continoues growth, which just grows out and then contracts again fully and then pulsating (6  variations) where it expands and grows for a bit, contracts a little bit and then  grows again until full size    where the pattern is just reversed.

# Contents of the p5 folder

* p5.js file
* p5.min.js file
* addons folder
  * p5.sound.js
  * p5.sound.min.js
* coral folder
  * Normal
  * Unusual
  * Special
  * Rare
  * Ultra rare
  * Legendary
  * Exo
  * Unique
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

## corals folder

All the nfts is here. This folder includes the file for the website, index.html, the p5.js library, other related p5.js libraries, and a template starting point for your p5.js sketch, called sketch.js.
There are 7 types of growth types of the nfts and each types have many nfts of its type except unique.
In total, there are 8888 nfts in this folder now.

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

Will insert plusating function to the nfts.

# License

This product is free software; you can redistribute it and/or modify it under the terms of the GNU Lesser General Public License as published by the Free Software Foundation, version 2.1.


For more information about the algorithms and p5js, please visit those URLs.

https://github.com/inconvergent/differential-line
https://inconvergent.net/generative/differential-line/

https://p5js.org/