---
layout: post
title: Using the Prototypal Inheritance Pattern in Javascript
---
As a self-starter in the JavaScript world, I began where many such beginners first dove into the world of programming: [Codecademy](http://codecademy.com). There, I learned about prototypes through the pseudoclassical style. Any time I researched after that, most resources I encountered relied on this style for instantiation patterns and it wasn't until last week that I learned about another, similar style which is more explicit about how it operates.

As a refresher, the pseudoclassical style utilizes the keyword `new` for instantiation.

```javascript
var Truck = function(awesomeness, wheels){
  this.awesomeness = awesomeness;
  this.wheels = wheels;
}

var monsterTruck = new Truck('Infinite', 8);
//now the monsterTruck is a new object which looks like
{awesomeness: 'Infinite', wheels: 8};
```

For most JavaScripters, this pattern will make sense, and is widely documented across the internet. However, how the pattern behaves under the hood is not as clear. After all, JavaScript is clearly doing something behind the scenes with the keyword `new` in order to return an object from the `Truck` function since we aren't returning anything from that function. Attempting to instantiate `monsterTruck` without the keyword new will cause `monsterTruck` to log as undefined.

##What the Keyword New Does

The keyword `new` tells the JavaScript interpreter to add a few lines of code to the Truck function when it operates. These lines create a `this` object (after which our function assigns two key-value pairs) and then, at the end of function, returns the newly created this object. I've refactored `Truck` to take into account these new lines of code.

```javascript
var Truck = function(awesomeness, wheels){
  //new line
  var this = Object.create(Truck.prototype);
  this.awesomeness = awesomeness;
  this.wheels = wheels;
  //new line
  return this;
}
```

##Avoiding New Altogether

Learning how JavaScript operates on a nuanced level is valuable for a JavaScript programmer. Although seeing how `new` operates might not change day-to-day operations, it builds depth of understanding in regards to the prototype chain, which should be welcome to any serious developer. However, the keyword `new` can be avoided altogether. Meet prototypal inheritance. Prototypal inheritance behaves similarly to pseudoclassical, but is more explicit about how it instantiates classes.

```javascript
var Truck = function(awesomeness, wheels){
  var obj = Object.create(Truck.prototype);
  obj.awesomeness = awesomeness;
  obj.wheels = wheels;
  return obj;
}
```
Now, when instantiating the Truck class, the keyword `new` is unnecessary. Aside from that, `Truck` will behave exactly like the pseudoclassical `Truck`. Whether this pattern should be used is a matter of style, and as is often the case, style is not necessarily set by an individual's personal preferences but rather by agreed upon standards set forth by a style guide for a specific company or open-source project. More likely than not, the pseudoclassical pattern will dominate, and many programmers might even find the prototypical pattern foreign or off-putting. At the very least, even if I don't use the prototypal pattern often, knowing how it works shows me how the pseudoclassical pattern operates with a bit of the 'magic' stripped away.