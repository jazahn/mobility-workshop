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
* Insert in a basic sticky header
* Add the Viewport

You can skip through this step with `git checkout step01`

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
├── css
│   ├── jquery.mobile.css
│   ├── images
├── js
│   ├── lib
│      ├── jquery.js
│      ├── jquery.mobile.js

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
