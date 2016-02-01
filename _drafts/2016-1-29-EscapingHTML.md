---
layout: post
title: How to Implement Escaping Characters in JavaScript
---
I recently worked on a basic chat application which allowed users to chat with other users. Exciting? Okay, I know this isn't 1999, and live chatting isn't the thrill ride it used to be. Nevertheless, working with a partner, we developed slimmed-down prototype with basic functionality. And within minutes of our first `GET` request, which pulled 100 entries down from the server via an API, we encountered a problem. One of the user messages contained instructions which logged the an innoucuous phrase to the console. 

**Umm what??**
##XSS Attacks
XSS, which stands for cross-site script injection, is a type of attack whereby a hacker attempts to run a script on a website. They typically will do this through insecure access points on the site, namely forms, as well as parts of a site where the site dynamically creates DOM elements. 

What might this look like in the real world? Picture a twitter feed, which pulls statuses from various users and serves
##New Start
Recently, I had to build a simple chat client and prevent XSS attacks using HTML escaping. One little problem: I had no idea what either of those things was. After a bit of research, I learned that an XSS, or cross-site script injection was a type of hack where a user (likely malicious) attempts to upload a script on your website. One example might be a bit of jQuery where the site serves up user comments from an AJAX request and then converts those comments into HTML on the DOM. If one of those comments was simply: “hey what’s up Jordan, you’re the coolest dude that lives in your house”, then that would render on the website easily enough. However, if the comment contained a script tag, like this: <script src=‘dobad stuff’> </script>, what would happen?
##The Bad News
If the code didn’t HTML escape, that script would have run. There are lots of forms this scpecific script injection could take, and I won’t endeavor to describe them in detail. Check out []() for an in-depth analysis on the most common types of script attacks.
##HTML Escaping to the Rescue
In order to prevent this specifc type of attack, you need to properly escape certain characters of the content that is going to be added to the DOM. As a refresher, most programming languages allow for escaping characters that might cause hangups for the interpreter. In JavaScript, I could escape a new line in a string by add `/n` so that the new line appears where intened. `'Q:Hi, how are you Susy? /n A:I am fine'`. Many more examples abound, and to learn more about what characters need escaping in JavaScript, check out the [Mozilla Developer Network](find resource). Wherever other languages go to check these things out, see the appropriate source.

Okay, so how does this work when putting HTML in the DOM. Many programmers utilize jQuery and append the HTML to a specific div.

```javascript
var userComment = 'Hi, how are you?';
$('body').append(userComment);
//now the userComment is a child of the body
```
But, what if our userComment wasn't a simple collection of letters and the most common punctuation, but instead a script, like so:

```javascript
var badUserComment = "<script>console.log('youz been hacked')</script>";
$('body').append(badUserComment);
```
Here's what that does in a page which has jQuery loaded:![htmlnonescapedconsolelog.png]('../images/htmlnonescapedconsolelog.PNG')

![_config.yml]({{ site.baseurl }}/images/config.png)

[htmlnonescapedconsolelog.png]('../images/htmlnonescapedconsolelog.PNG')

When we try to insert this comment, this script will execute. If you're curious about whether this actually works, open a website with 