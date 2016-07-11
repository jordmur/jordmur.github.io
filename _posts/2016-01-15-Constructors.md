---
layout: post
title: Constructor Functions and Constructor Properties
---
So, I'm knee deep in the beautiful mud of learning, and as any learner can attest, I've run into my share of challenging concepts that cause my brain to stutter. One such topic: constructors.

## What is a Constructor?
When working with class instantiation, I ran into a couple references to constructors. Initially, I thought I understood constructors as well as most other javascript concepts, which is to say, I would have bumbled around a bit, lost my words mid-sentence, but overall, known what I was discussing. So what did I think a constructor was? Simply stated, a constructor is a function that creates a new instance of a class. I can follow that. EZ-PZ.
Here's an example of a basic constructor function (in the pseudoclassical instantiation style):

```javascript
var Person = function(name){
  this.name = name;
}
```

In order to use the constructor function to then make a new class, all we need to run the function using 'new', as such:

```javascript
var john = new Person('John Friendlyface');
```

Our variable john is now an object with the assigned properties, all this through the constructor function.

```javascript
console.log(john);
//logs Person {name: "John Friendlyface"}
```
From here, I could add methods.

```javascript
Person.prototype.changeName = function(newName){
  this.name = newName;
}
```
Granted, this is a simple (and not particularly illustrative example beyond the bare bones operation) but constructors work more or less this way across the instantiation patterns. The constructor function *constructs* new instances of the class as laid out in the constructor function. Constructor constructor constructor. Tired yet?

However, constructor pops up as another term in the language, closely related, but with a different meaning. When the constructor function runs, the new instance has a constructor property that references the constructor which created it.
### What?
It's actually quite simple. More than anything, the vocabulary of my own mental model kept tripping me up. The constructor function creates the instances (as shown), whereas the constructor property of the new instance refers back to the constructor function which created it. The constructor property does not refer to the prototype of the instance, only to the constructor function which instantiated the instance.

For our john object, if we were to log the constructor property, we should expect to see the constructor function.

```javascript
console.log(john.constructor);
//logs function (name){
//this.name = name;
//}
```
One other rule for the constructor property involves literals (ie, an object created using the following syntax var obj = {}, or var array = []). In this case, the constructor property will now refer to the Object or Array prototype(respectively), which makes sense we did not use an a constructor function to create the literal.

```javascript
var newObj = {};
console.log(newObj.constructor);
//logs function Object(){
//       [native code]
//     }
```
My main takeaway from this constructor hullabaloo: I needed to adjust my own mental model. Yes, constructor functions and prototypes are not especially complicated on their own, yet in my brain, the wires kept getting crossed. However, simply saying to myself that the constructor **function** creates the instances and that the constructor **prototype** on the instance refers back to the constructor function which created it cleared up the confusion. Specificity in my language allowed me to hammer out this minor hiccup.
