---
layout: post
title: Getting Started With Gulp
---

Gulp.js is a powerful javascript task-runner which many view as the successor of respected colleague Grunt.js. For those new to task-runners and their ecosystems, task-runners allow you to easily run repetitious tasks such as concatenating files, minifying them, uglifying them, preprocessor compiling, removing unused CSS, code linting and much more.

## It Looks Difficult

When I first dipped my fingers into the node ecosystem, I wanted to know how to use Gulp because it seemed to simplify many developmental pain points. However, I worried about the amount of work required to get started. Earlier this week, I set up the basic Gulpfile.js for a team project, and I'm glad to say that process was incredibly easy - more so than my prior Grunt experience. For those interested, I would say jump in. The water's warm. I promise.

## Requirements

Gulp requires Node, so you'll want that installed on your machine. Secondly, you need a package.json in your project folder, which you can create by running `npm init` from the root of your directory and following the fairly self-explanatory prompts. Once you done that, you need to figure out which Gulp tasks you're hoping to run. Check out the [Gulp website](http://gulpjs.com/), specifically the plugin section. A bit of scrolling there will likely turn up a few plugins to get you started.

For me, I used the gulp-sass plugin (for compiling scss files into valid css), and gulp-jshint, which lints the javascript of projects. Once you've found the tasks you'd like to run, click on the relevant link, which should take you to the npm page. I'd recommend following the instructions on the npm specific page, as though were set by the developers of said module. Even still, don't be daunted by the documentation. Likely, you'll need to copy and paste it, and then you should be good to go.

As for installing the modules, you will want to run `npm install gulp-modulename --save-dev`, where `modulename` is the module you're going to install. The `--save-dev` prefix installs the module in a specific section in the package.json which indicates that this module is used for development purposes, rather than what you want to deploy to the server.

## And Now For the Gulpfile

Next, you'll want to create a file in your project's root directory titled Gulpfile.js.

The first thing you want to do in this file is require the necessary modules (or else it won't run). See below for using gulp, gulp-sass, and gulp-jshint.

```javascript
var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
```

Next you need to configure the specific tasks. For sass:

```javascript
gulp.task('sass', function () {
  return gulp.src('./client/assets/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./client/assets/css'));
});
```

Keep in mind, this was mostly boilerplate code pulled from the docs for the gulp-sass npm module, and tweaked to fit my project. And by tweaked, I mean that I changed the directories for `.src` and `.dest`. Easy. A total of about five minutes of work (and that work mainly being installations and googling).

For linting, it was fairly similar.

```javascript
gulp.task('lint', function() {
  return gulp.src('./client/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
```

This one required about the same amount of work as the gulp-sass (ie, lots of copy-pasting), although I did run into one sticky issue which took a bit of googling. I wanted to lint an entire directory rather than adding the files individually to the `.src`. In order to do this, I needed to add the directory (`./client`), then tell it to find all javascript files in that directory, here being the `**/*.js`.

And that's it. In order to run the tasks, all you need to do is type `gulp sass` or `gulp lint` in the terminal.
