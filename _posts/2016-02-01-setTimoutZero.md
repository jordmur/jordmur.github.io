---
layout: post
title: Why Would I Ever Use setTimeout With a 0ms Delay?
---
I spent a couple hours today acquainting myself with the way that JavaScript (and in particular, the browser) handles the call stack as well as the event loop. For a much better primer on the topic than I’d dare to summarize, I’d check out this [video](https://youtu.be/8aGhZQkoFbQ). One thing stuck out to me while I watched the video: the use of `setTimeout(callback, 0)`.

Being naive, I would have expected the setTimeout callback to run right away, much like any other function invocation in Javascript. After all, there is no delay. In my brain `0 delay === instantly`. But that’s not what happens. Let’s examine a simple example where I log a few values to the console with a setTimeout thrown in there to see what happens.

```javascript
console.log(1);
console.log(2);
setTimeout(function()
  console.log(3);
}, 0);
console.log(4);
```

Naturally, I’d expect the numbers 1, 2, 3, 4 to log to the console in order. Instead, what logs is 1, 2, 4, 3. Why does this happen?

## The Singlethreaded Problem

JavaScript does not handle multiple processes simultaneously, even if the speed of the browser and modern computers might at times conceal this from the user. JavaScript handles functions and expressions one at a time as it is able. It keeps track of what to run via the call stack. When the interpreter hits a function invocation, that function is added to the call stack, and as long as there is nothing else in the call stack, then the function runs. However, if another function is running (let’s pretend it’s a very slow-running function), the newly added function will have to wait until the other function is completed. This is the first key in understanding what was going on in our JavaScript console.log example above.

When the interpreter hits setTimeout, JavaScript actually puts the setTimeout function into the call stack and runs it in order. However, the callback won’t be executed, only the setTimeout. The callback function (in our example, the anonymous function with a console.log in it) is added to another area called the task queue. Items from the task queue can only enter the call stack if the call stack is empty. Once they enter the call stack, they will run as normal.

It is vital to understand how JavaScript will handle process the task queue and asynchronous callbacks. The asynchronous callbacks will be added to the task queue, and can only enter the stack queue if the call stack is empty. Anything running in the call stack can block the  task queue from populating the call stack. This might cause issues if JavaScript gets tied up in some DOM intensive rendering which clogs up the call stack, preventing the behavior one might have expected from setTimeout or setInterval. In our example above, the console.log(3) was waiting to leave the task queue at the earliest available oppurtunity, but couldn’t while other function calls blocked it.

So, knowing what we now do, how might setTimeout with a 0ms be useful? Say you have a callback that you want to run at the next available instance after other functions outlined in your JavaScript but not before those other function? setTimeout wtih 0ms delay offers a handy solution. 