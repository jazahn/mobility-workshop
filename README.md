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

### Download jQuery
You only need the js for this. This is the most used javascript library in the world. More than 50% of all of the pages of the internet include this lib. (I heard that somewhere, I didn't actually fact check that. It's believable, right?)

http://jquery.com/download/

2.x or 1.x? I usually go with 2.x because I'm all about the future! But you need to go 1.x if you're interested in supporting IE 8 (or back). So...

### Download jQuery Mobile
jQuery Mobile is a lib that is much more focused on the Mobile than the jQuery. The js that it does include is mostly implementations of existing jQuery functionality. As such jQuery Mobile is much more focused on the HTML/CSS side than the js. It is a great, easy way to get your styles up to par with mobile designs. 

http://jquerymobile.com/download/

You'll need the JS, CSS, and images, so go ahead and get the zip. 

### Put them in the right place
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

### Add them to version control
Now we're going to use git to keep control of them. So we can easily switch back and forth between what we have and maybe the next step. (This part added to help give some familiarity with git.)
* `git status` 
** (from some directory above the JS/CSS)
** Take a look around
* `git checkout -b <yourname or something easy to type>`
** This will create and checkout (switch to) a new branch.
* `git add js`
* `git add css`
** These will add everything in those directories to the queue of what will be committed
* `git commit -m "adding jquery / jquery mobile libs"`
With that done, now we can switch between what we've done and the finished product of what we're currently doing. We'll do that later.

### Add the libraries to the HTML
Before we can actually add anything, we need to make sure that the libs are included. So add the these script tags to the top of the page:
```html
<link rel="stylesheet" href="css/jquery.mobile-1.4.2.min.css"></link>
<script src="/js/lib/jquery.js"></script>
<script src="/js/lib/jquery.mobile.js"></script>
```

## Step 01

### Insert a basic header
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

### Add Viewport
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

### Test it

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
** Include jquery and jquery.mobile the way we had originally
** This negates what we're trying to accomplish with optimizations
* Hard
** Look at what the JS did to the HTML we wrote
*** It took the data-attributes and added classes based on those attributes
** Copy the classes it created into the elements it created them in

The hard way is hard, but this is a flaw in jquery.mobile and it's important to understand why. jQuery Mobile is a great way to get you started, it's great for prototypes because you can get something out there quickly, but it's not done in a way that is optimized for mobile devices. Go figure. 

My point, if you want something optimized well for mobile platforms, you may need to do the styles yourself.

(Go with "Lazy" moving forward.)

## Step 03

listviews

"99% of what I do is lists" is something I've heard said. Makes sense. Lists are important, so lets do lists, mobile style...
