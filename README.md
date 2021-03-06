mobility-workshop
=================

Get your mobility on.

Overview of What We'll Be Doing!
* Setting up
 * The Github
* [Step 00](#step-00)
 * Get jQuery
 * Get jQuery Mobile
* [Step 01](#step-01)
 * Header
 * Viewport
* [Step 02](#step-02)
 * RequireJS
 * [Optimization](#optimization)
* [Step 03](#step-03)
 * Listviews
* [Step 04](#step-04)
 * Intermediate step (with listviews, before ajax)
* [Step 05](#step-05)
 * Search Filter
* [Step 06](#step-06)
 * Intermediate step (with search filter, before new video page)
* [Step 07](#step-07)
 * Pages (SPA)
* [Step 08](#step-08)
 * Prefetching
 * Transitions
* [Step 09](#step-09)
 * Menu
* [Step 10](#step-10)
 * Forms
 * Grids (ish)


# Prerequisites
## This code repository
You will need to clone this code repository to your local machine using Git.  If you already know how to use Git, simply clone this this repository, otherwise read on.

If you do not have a Git client installed, visit GitHub's [set up Git](https://help.github.com/articles/set-up-git) page and follow the instructions to install a client.  Once you have a working client (or the GitHub app), clone this repository:

```
git clone https://github.com/jazahn/mobility-workshop.git
cd mobility-workshop
```

## The first step in the workshop
Switch to the branch containing the first step in the workshop:

```
git checkout step00
```

# Step 00
We start with the initial, basic HTML layout without any mobility components. In this step we will install those basic components:

- Downloading jQuery
- Downloading jQuery Mobile
- Integrate jQuery and jQuery Mobile into the basic HTML.

If you already know how to do these things, you can move on to step 01 by running `git checkout step01` and skiping to the [next section](#step-01)

## Download jQuery
The jQuery library is the most used JavaScript library in the world. More than 50% of all of the pages on the internet include this library. (I heard that somewhere and it sounds believable, right?)

Download the newest 2.x version from [http://jquery.com/download/]().
(If you need to support IE 8 or earlier, you will need to use the older jQuery 1.x versions.)

## Download jQuery Mobile
The jQuery Mobile library is an extension to the jQuery library that is focused on creating HTML and CSS layouts that are mobile-compatible. It is a great, easy way to get started with mobile design.

Download the complete zip file that contains all of the JavaScript, CSS, and images from: [http://jquerymobile.com/download/]()

## Put them in the right place
Convention dictates that a good layout for your project resembles the following tree. Unpack the jQuery and jQuery mobile files you downloaded and place them in your directory so that it matches this layout:

```
├── css
│   ├── jquery.mobile.css
│   ├── images
├── js
│   ├── lib
│      ├── jquery.js
│      ├── jquery.mobile.js
```

Note that typically external JavaScript library dependencies go in a "lib" directory as shown here, or are included from third-party content delivery networks.

## Check in the files to version control
Good version control practice is to check in when you reach a logical end point. Adding all of your libraries and dependencies is a good point at which to commit a check-in, which you can do by running the following Git commands from the top level of your repository (i.e. the `mobility-workshop` directory):
```
git status
```

Prints a long output that shows you what has changed and is not yet committed.
```
git checkout -b <yourname>
```
Creates a new branch for your changes (rather than checking in to the step00 branch).
```
git add js css
```

Stage all of the new files under the `js` and `css` directories for commit.
```
git commit -m "adding jquery and jquery mobile"
```

Commit your staged changes with a commit message that explains the check-in.

Now you can easily switch between the work you have done (on your own branch) and the other steps in this tutorial.  We will use this functionality later.

## Add the libraries to the HTML
Now that the libraries are installed, they need to be included in the HTML of the webpage. To do that, add these lines of HTML at the top of the `index.html` file:
```html
<link rel="stylesheet" href="css/jquery.mobile.css"></link>
<script src="js/lib/jquery.js"></script>
<script src="js/lib/jquery.mobile.js"></script>
```

Check in your changes (using the same method as in the step above). Now checkout the step01 branch to move on to the next step in the tutorial:
```
git checkout step01
```

## Step 01

#### Insert a basic header
Now we want to make sure these libs work. The first thing we need to do with jQuery Mobile is add a "page". jQM uses an idea of pages to switch between, we will use that later. For now, let's add a page div with a theme of "a", (which is actually the default theme, so that's redundant).
```html
<div data-role="page" data-theme="a">
</div>
```
For the most part, all of our content will go in there.

Now add the header. (Inside of the page div.)
```html
<header data-role="header" data-position="fixed">
This is a header
</header>
```
For the most part, the data-role on this does nothing but adds a class to the header. The data-position fixed does the cool stuff. That's what will keep it stuck to the top. Similar to what `position: sticky` will do if it ever actually gets added to standard CSS.

#### Add Viewport
Now notice that viewing it... Looks fine. Because you're viewing it in a browser, probably. But on a mobile device / iOS sim / ripple, it looks bad, trust me?

Add the viewport meta tag with
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```
In the `<head>`

Now view it again and take my word for it, it shapes up.

## Step 02

In this step, we're going to switch it all up and use RequireJS. RequireJS uses the AMD specification. What that means is it loads your JavaScript on-demand, and for the most part, after onload. To mobility, this means it keeps the delays associated with fetching JavaScript to a minimum.

It also has the added benefit of modularizing your code. 

So go get [RequireJS](http://requirejs.org/docs/download.html) (or `git checkout step02` and start from there)

* If you want to discard your changes, use 
 * `git checkout -f step02`
* If you want to save your changes to come back to later
 * `git checkout -b mybranch`
 * `git commit -a -m "my changes"`
 * `git checkout step02`

RequireJS is based on the idea that it's the only script you need to load. So load it, and only it. And be sure to **remove the jquery and jquery.mobile javascript includes**.
```html
<script src="/js/lib/require.js"></script>
```

Now we need the config to control where it gets our jquery libs from. We're going to add this in a script tag (in the `<head>`, as straight up in-line JavaScript. Why? Because the whole point is to avoid trips to the server.
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

RequireJS is made up of 2 methods. `define()` and `require()`. These function almost identically. `define` is used for creating modules. `require` is used to create a block of actions that has dependencies -- like jquery.

So let's create a simple `require`, that includes both of our libs. Add this into the `<head>` after the config. We'll just wrap an alert in a document ready...
```html
<script>
  require(['jquery', 'jquery.mobile'], function($){
    $(document).ready(function(){
      alert("jQuery must have loaded to get here. (Remove this immediately, no one likes alerts)");
    });
  });
</script>
```

Test it. (And then you can remove the alert.)

Now when you refresh, you should notice something else wrong. A massive delay in the time between the text displaying and the styles being applied. What's happening?

The power of RequireJS is that it doesn't load the libs unless you need them, so whereas before, when we were adding the libs directly through `<script src=...>` the libs were loading before the DOM was ready, now they're not loading until sometime after `load`, before `ready`. The point being not to slow the construction of the DOM with script file fetches.

However, in this case, we are using html5 data-attributes to style the page, set the theme. This is bad practice in general for many reasons you don't care about.

This is both a strength and a flaw of jQM, depending on how you look at it, and it's important to understand why. jQuery Mobile is a great way to get you started, it's great for prototypes because you can get something out there quickly, but it's not done in a way that is optimized for mobile devices. Go figure. 

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

(That said, we *are* prototyping, so don't sweat the optimization so much. Just know that when you want to bring this to production, you'll have to deconstruct the class/tag manipulations that the javascript is doing)

**Let it load slowly, but understand why it's doing that.** There are hacky ways to get it looking better, but let's focus on understanding why it's loading slow and move on.

## Step 03

listviews

"99% of what I do is lists" is something I've heard said. Makes sense. Lists are important, so lets do a list.

Add the following after the `<header>`:
```html
<section>
  <ul data-role="listview">
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

Why didn't that work? 

Probably because 

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

## Step 06

Let's make use of our links now in a more jQM way.

We can create another page, video.html, and a js module to go with it... and let's not waste time writing all that, skip ahead to step07: `git checkout step07`

## Step 07

Let's look at what we have. We click on a link and it opens a new page. Though it's just a blank page. Look at the code though, the Video constructor actually sets the `<h1>` in the header with a value from `localStorage`. But that's not happening... if we refresh video.html, it does get the header and sets it appropriately... but now if we click "back", the list doesn't load in index.html... why?

So now we're getting into the jQuery Mobile topic of "pages". jQuery Mobile acutally does a pseudo-SPA (Single-Page Application) by linking things together via the `data-role="page"`. When a link is clicked on the page, jQuery Mobile hijacks the request and actually inserts the content of the new page into the div-page tag. So the issue we're hitting is the `$(document).ready()` is not happening more than once, even though it seems like we're going to a new page. This means the `<head>` is only being executed in the first loaded page.

So we actually have to work the JS differently. We can't have page specific JS loaded in `<head>`.

The easiest way to deal with this is to remove the `$(document).ready()`s, **but don't remove the content** (in both files) and move the script tags containing those `require()`s to the bottom of the `<div data-role="page">` tag. (But still inside of the "page" tag.)

So the script tag you're inserting looks like this:
```html
<script>
	require(['jquery', 'js/Channel', 'jquery.mobile'], function($, Channel){
		var chan = new Channel();
		chan.getVideos();
	});
</script>
```

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

Let's add a Menu. One of those cool slidey menus.

First we're going to add the icon / link into the header. So add in this link to the header like so:
```html
<header data-role="header" data-position="fixed">
	<h1>This is a header</h1>
	<a href="#nav-panel" data-icon="bars" data-iconpos="notext">Menu</a>
</header>
```

So we have a link that does nothing, let's add in the magic. This div should be placed after the `<header>` (because semantically, that's where it should be)
```html
</header>

<div data-role="panel" data-position="left" data-position-fixed="false" data-display="reveal" id="nav-panel"></div>

<section data-role="main">
```

You'll notice a lot more *awesome* data-attributes. We love those, right? They're all pretty self explanitory. The most important thing to note is probably the `id`, and how it links to the `href` of the preceeding `<a>` we just put in.

But what's wrong now?! Damnit! If you're using Chrome, or a modern browser, using webkit (I love using the word "modern" to describe things I use) you will notice a really annoying screw-up with the transition / slide effect of the reveal from the left. It's a bug with the current version of jQM and can be mitigated by removing the `data-position=fixed` from the header. 

Let the transition suck or remove the `fixed`, it's up to you.

Let's move on to adding content to the menu. We can do this with a simple list... Everything is lists!
```html
<div data-role="panel" data-position="left" data-position-fixed="false" data-display="reveal" id="nav-panel" data-theme="a">
	<ul data-role="listview" style="margin-top:-16px;" class="nav-search">
		<li data-icon="delete" style="background-color:#111;">
			<a href="#" data-rel="close">Close menu</a>
		</li>
		<li>
			<a href="#">Something</a>
		</li>
		<li>
			<a href="#">Something Else</a>
		</li>
	</ul>
</div>
```

That's it!

## Step 10

Now that we've done a menu on the left, let's do some other panel on the right. Like an absurd, useless form! Woo!

This is going to work very similar to the left panel. Let's add in the link first:
```html
<header data-role="header" data-position="fixed">
	<h1>This is a header</h1>
	<a href="#nav-panel" data-icon="bars" data-iconpos="notext">Menu</a>
	<a href="#nav-form" data-icon="plus" data-iconpos="notext">Add Something</a>
</header>
```

You'll notice I'm not explicitly positioning them. A list of `data-icon`s can be found here: http://api.jquerymobile.com/resources/icons-list.html But let's take a quick look at what happens when we add more links to the header. Add another link. Refresh. Add 3 more. Refresh.

I'll wait.

You'll see that it really only cares about the first 2 links. Beyond that, it wraps to the "next line of the header" -- which just looks bad.

Anyway, here's the panel code to actually get a form -- you're going to want to place this after the other panel. Let's try to maintain a logical DOM order.
```html
<div data-role="panel" data-position="right" data-position-fixed="false" data-display="overlay" id="add-form">

	<form class="userform">
		<h2>Create new user</h2>
		<label for="name">Name</label>
		<input type="text" name="name" id="name" value="" data-clear-btn="true" data-mini="true">

		<label for="email">Email</label>
		<input type="email" name="email" id="status" value="" data-clear-btn="true" data-mini="true">

		<label for="password">Password:</label>
		<input type="password" name="password" id="password" value="" data-clear-btn="true" autocomplete="off" data-mini="true">

		<div class="switch">
		<label for="status">Status</label>
		<select name="status" id="slider" data-role="slider" data-mini="true">
			<option value="off">Inactive</option>
			<option value="on">Active</option>
		</select>
		</div>

		<a href="#" data-rel="close" data-role="button" data-mini="true" data-inline="true">Cancel</a>
		<a href="#" data-rel="close" data-role="button" data-mini="true" data-inline="true">Save</a>

	</form>
</div>
```

This is just a silly form, but there are some things we would like to tweak.

First, you'll notice the Active/Inactive "slider" "select" issue. The text is too long for the element. We have to make it bigger. We probably want to add this to a specific styles.css for the app that is included in the base template (the one that other templates call for the header information) -- however your backend framework chooses to handle that.

For the moment, let's fix it the WRONG way, but pay attention to how we have to do it anyway! 

We have to add a `<style>` tag inside the `<div data-role="page">` element -- because *remember*, the head isn't loaded every time, it is retained and the "page" contents are funneled in.

So let's add the following directly before the "panel" `<div>` we just added.
```html
<style>
.switch .ui-slider-switch { width: 8.5em !important }
</style>
```

#### The UI Grid

And then there's the buttons. They're next to each other only because of the `data-inline`, otherwise, guess or try it.

What if we wanted each button to have a width of like, 50%? 

For that we need a `ui-grid`. http://api.jquerymobile.com/grid-layout/

I know what you're thinking, "what the hell?! why are they using css here when they're so invested in data-attributes?!?" I dunno.

Change the 2 buttons as follows:
```html
<div class="ui-grid-a">
	<div class="ui-block-a">
		<a href="#" data-rel="close" data-role="button" data-mini="true">Cancel</a>
	</div>
	<div class="ui-block-b">
		<a href="#" data-rel="close" data-role="button" data-mini="true">Save</a>
	</div>
</div>
```

A little prettier.




