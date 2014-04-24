mobility-workshop
=================

Get your mobility on.

# Setting Up
## Github
Pull down the github.

Don’t worry, the only git commands you’ll need to know for this are:
* `git clone <repo>` 
* `git checkout <branch>`
* `git add <files>`
* `git commit -m "some commit message!"` (
* (jk, you can't use ! in inline commit messages!)

If you need git: ...

So now pull down the repo into your workspace with:
`git clone `

now `cd mobility-workshop`
and checkout the first step:
`git checkout step00`

## Node
Now I’m only making you use node to run a localhost so you can avoid any potential cross-site security errors. If you want to do something like python -m SimpleHTTPServer, that’s just as good. But this workshop is all javascripty. So.

Installing Node:
* `curl https://npmjs.org/install.sh | sh`
* `npm install http-server -g`
(The -g installs it so it’s globally available.)
* From the directory you’re in, just type:
`http-server`

## Step 00
This is the initial, basic html layout.

What we want to do in this step is get to Step 01. What this step covers is:
* Download jQuery
* Download jQuery Mobile
* Adding those to the html

You can skip through this step with `git checkout step01` and [click here](https://github.com/jazahn/mobility-workshop#step-01)

#### Download jQuery
You only need the js for this. This is the most used javascript library in the world. More than 50% of all of the pages of the internet include this lib. (I heard that somewhere, I didn't actually fact check that. It's believable, right?)

http://jquery.com/download/

2.x or 1.x? I usually go with 2.x because I'm all about the future! But you need to go 1.x if you're interested in supporting IE 8 (or back). So...

#### Download jQuery Mobile
jQuery Mobile is a lib that is much more focused on the Mobile than the jQuery. The js that it does include is mostly implementations of existing jQuery functionality. As such jQuery Mobile is much more focused on the HTML/CSS side than the js. It is a great, easy way to get your styles up to par with mobile designs. 

http://jquerymobile.com/download/

You'll need the JS, CSS, and images, so go ahead and get the zip. 

#### Put them in the right place
Where's the right place? Convention / best practice dictates JavaScript goes in a js directory, CSS goes in a CSS directory off of your project. Images go in an images directory (in the case of jQuery Mobile's images, the directory should be. Also 3rd party JS libraries are generally put in a lib sub directory. So:
```
├── css
│   ├── jquery.mobile.css
│   ├── images
├── js
│   ├── lib
│      ├── jquery.js
│      ├── jquery.mobile.js
```

#### Add them to version control
Now we're going to use git to keep control of them. So we can easily switch back and forth between what we have and maybe the next step. (This part added to help give some familiarity with git.)
* `git status` 
 * (from some directory above the JS/CSS)
 * Take a look around
* `git checkout -b <yourname or something easy to type>`
 * This will create and checkout (switch to) a new branch.
* `git add js`
* `git add css`
 * These will add everything in those directories to the queue of what will be committed
* `git commit -m "adding jquery / jquery mobile libs"`
With that done, now we can switch between what we've done and the finished product of what we're currently doing. We'll do that later.

#### Add the libraries to the HTML
Before we can actually add anything, we need to make sure that the libs are included. So add the these script tags to the top of the page:
```html
<link rel="stylesheet" href="css/jquery.mobile-1.4.2.min.css"></link>
<script src="/js/lib/jquery.js"></script>
<script src="/js/lib/jquery.mobile.js"></script>
```

## Step 01

#### Insert a basic header
Now we want to make sure these libs work. The first thing we need to do with jQuery Mobile is add a "page". jQM uses an idea of pages to switch between, we will use that later. For now, let's add a page div with a theme of "a",
```html
<div data-role="page" data-theme="a">
</div>
```
For the most part, all of our content will go in there.

Now add the header.
```html
<header data-role="header" data-position="fixed">
This is a header
</header>
```
For the most part, the data-role on this does nothing but adds a class to the header. The data-position fixed does the cool stuff. That's what will keep it stuck to the top. Similar to what `position: sticky` will do if it ever actually gets added to standard CSS.

#### Add Viewport
Now notice that viewing it...

Add the viewport meta tag with
```html
	<meta name="viewport" content="width=device-width, initial-scale=1">
```
In the `<head>`

Now view it again and you'll see it shapes up.

## Step 02

In this step, we're going to switch it all up and use RequireJS. RequireJS uses the AMD specification. What that means is it loads your JavaScript on-demand, and for the most part, after onload. To mobility, this means it keeps the delays associated with fetching JavaScript to a minimum.

It also has the added benefit of modularizing your code. 

So go get [RequireJS](http://requirejs.org/download) (or `git checkout step02` and start from there)

RequireJS is based on the idea that it's the only script you need to load. So load it.
```html
<script src="/js/lib/require.js"></script>
```

Now we need the config to control where it gets our jquery libs from. We're going to add this in a script tag, as straight up in-line JavaScript. Why? Because the whole point is to avoid trips to the server.
```html
<script>
  requirejs.config({
		paths: {
			'jquery'        : '/js/lib/jquery-2.1.0.min', //=> http://code.jquery.com/jquery-2.1.0.min
			'jquery.mobile' : '/js/lib/jquery.mobile-1.4.2.min', //=> http://code.jquery.com/mobile/1.4.2/jquery.mobile-1.4.2.min
		},
  });
</script>
```

All this has done is set the paths on where to find the libs and naming them. (also note the comments -- those are the CDNs we'll use later) We still need to add the "shim". The shim will declare dependencies -- which is important, because jquery.mobile requires jquery as a dependency. The whole config follows.
```html
<script>
  requirejs.config({
		paths: {
			'jquery'        : '/js/lib/jquery-2.1.0.min', //=> http://code.jquery.com/jquery-2.1.0.min
			'jquery.mobile' : '/js/lib/jquery.mobile-1.4.2.min', //=> http://code.jquery.com/mobile/1.4.2/jquery.mobile-1.4.2.min
		},
		shim: {
			'jquery' : '$', 
			'jquery.mobile': {
				deps: ['jquery'],
			},
		},
  });
</script>
```

#### Test it

Now when you refresh, you will notice something very wrong. The jquery.mobile styles aren't being applied. Why? Because we never applied them.

Let's add a simple require statement, so the libs get added to the page.

RequireJS is made up of 2 methods. define() and require(). define is used for creating modules. require is used to create a block that has dependencies -- like jquery.

So let's create a simple require, that includes both of our libs. Add this into the `<head>` after the config. We'll just wrap an alert in a document ready...
```html
<script>
  require(['jquery', 'jquery.mobile'], function($){
    $(document).ready(function(){
      alert("bam");
    });
  }
</script>
```

Now when you refresh, you should notice something else wrong. A massive delay in the time between the text displaying and the styles being applied. What's happening?

The power of RequireJS is that it doesn't load the libs unless you need them, so whereas before, when we were adding the libs directly through `<script src=...>` the libs were loading before the DOM was ready, now they're not loading until sometime after load, before ready. The point being not to slow the construction of the DOM with script file fetches.

However, in this case, we are using html5 data-attributes to style the page, set the theme. This is bad practice in general for many reasons you may not care about. There are 2 workarounds for this. One is lazy, one is hard.

* Lazy
 * Include jquery and jquery.mobile the way we had originally
 * This negates what we're trying to accomplish with optimizations
* Hard
 * Look at what the JS did to the HTML we wrote
 * * It took the data-attributes and added classes based on those attributes
 * Copy the classes it created into the elements it created them in

The hard way is hard, but this is a flaw in jquery.mobile and it's important to understand why. jQuery Mobile is a great way to get you started, it's great for prototypes because you can get something out there quickly, but it's not done in a way that is optimized for mobile devices. Go figure. 

This brings me to optimization...

#### Optimization

From the jQuery Mobile docs:
>Providing pre-rendered markup
You can improve the load time of your page by providing the markup that the button widget would normally create during its initialization.

>By providing this markup yourself, and by indicating that you have done so by setting the attribute data-enhanced="true", you instruct the button widget to skip these DOM manipulations during instantiation and to assume that the required DOM structure is already present.

>When you provide such pre-rendered markup you must also set all the classes that the framework would normally set, and you must also set all data attributes whose values differ from the default to indicate that the pre-rendered markup reflects the non-default value of the corresponding widget option.


tldr;

This is potentially the most important thing I'm going to say about jQuery Mobile:

**Everything done with a data-attribute is for prototyping, and not for production.**

(That said, we're prototyping, so don't sweat it so much.)

## Step 03

listviews

"99% of what I do is lists" is something I've heard said. Makes sense. Lists are important, so lets do lists, mobile style...

Let's do a simple list now.

Add the following after the `<header>`:
```html
<section>
  <ul xmlns="" data-role="listview">
    <li><a href="#">One</a></li>
    <li><a href="#">Two</a></li>
    <li><a href="#">Three</a></li>
    <li>Four</li>
  </ul>
</section>	
```

Note the difference between `<li>`s with `<a>`s and without.

#### Ajax!

Let's populate the list from an ajax call. That's still cool, right? I'm going to use an API available elsewhere, specifically the youtube video API.

We're not doing a full course on JavaScript, but you should do this in a module, and we're not going to skimp. But I'm not going to make you type it all in. So just move on to step05. `git checkout step05`

## Step 04

What happened to this step? This step is an intermediate that has the `listview` added. Just move on to step05.

## Step 05

Look at what we have. A module named "Channel.js" in the js directory. This will have a Channel object, with one method, getVideos. That method is just an $.ajax call to the youtube public API.

You'll also notice I've got a snippet of code calling that module in the head of index.html. It's using `require()` instead of the `define()` used in Channel.js These mostly do exactly the same thing and are just semantically different. `require()` is for doing stuff, this is typically done in the template files. `define()` is used for "defining" stuff, this is how modules are defined and are usually wrappers for single .js files.

Don't worry too much about it.

#### Search Filter

Now that we have a pretty list, let's add a search filter!

This can be done a few different ways, let's do the easiest! Just add `data-filter="true"` to the `<ul>`
```html
<ul id="channels" data-role="listview" data-filter="true">
```

That's it!

Now, I don't know about you, but I don't like putting complete control of elements into data-attributes. It's sloppy. So let's talk a second about optimization.

But wait, what's going on with the 2 x's in the search filter?

See, we're running into a problem having to do with optimization. We're going to hack our way through it, but I want you to understand what's happening. Because we're using data-attributes that are actually adding html elements, and because we are already doing a work around for making the page load a little nicer for us, we are running the create element 2 times, causing a doubled up search filter.

Let's fix that...

A quick "fix" for that is to remove `jquery.mobile` from the `require()` on this page. We're already synchronously adding that dependency globally, so just screw it.

Again, the right way to fix this is to do what I said earlier with **Optimization**.

## Step 06

Let's make use of our links now... then maybe stop with the stupid jQuery Mobile crap?

We can create another page, video.html, and a js module to go with it... and let's not waste time writing all that, skip ahead to step07: `git checkout step07`

## Step 07

Let's look at what we have. We click on a link and it opens a new page. Though it's just a blank page. Look at the code though, the Video constructor actually sets the `<h1>` in the header with a value from `localStorage`. But that's not happening... if we refresh video.html, it does get the header and sets it appropriately... but now if we click "back", the list doesn't load in index.html... why?

So now we're getting into the jQuery Mobile topic of "pages". jQuery Mobile acutally does a pseudo-SPA (Single-Page Application) by linking things together via the `data-role="page"`. When a link is clicked on the page, jQuery Mobile hijacks the request and actually inserts the content of the new page into the page tag. So the issue we're hitting is the `$(document).ready()` is not happening more than once, even though it seems like we're going to a new page. So we actually have to listen for something else.

The easiest way to deal with this is to remove the `$(document).ready()`s and move the script tags containing those `require()`s to the bottom of the `page` tag. (But still inside of the page tag.)

## Step 08

Now we have a functioning page "transition". Let's do some fun mobily stuff with that.

#### Pre-fetching

Let's pre-fetch all of the possible pages. What this will actually be doing is adding the page to the DOM. This is the "power" of having that "peudo-SPA" I was talking about before. Because this is actually just one page, that runs JS on it, we can just load it once and it will become part of the same DOM, so when we do actually click on it, it does not make a trip to the "server" for it.

Add the following line to somewhere in the `getVideos()` method in Channel.js:
```javascript
$.mobile.loadPage( "video.html", { showLoadMsg: false } );
```

Unfortunately, doing this locally, it's hard to appreciate the gain from that. Oh well.

#### Transitioning

This is what makes things pretty, I guess. Let's add a nice slide to the page transition. To do this with a link, you just need to add the data-attribute `data-transition="slide"` in the actual tag. Since we are building our links/list items, we need to add that in the forEach in Channel.js
```javascript
a.attr("data-transition", "slide");
```

That's it. There are other transitions available, play with a couple: (http://demos.jquerymobile.com/1.2.0/docs/pages/page-transitions.html)

## Step 09

Now let's play with the appcache manifest.





