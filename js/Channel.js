define(['jquery', 'jquery.mobile'], function($){
	var Channel = function(){
		this.videos = [];
		this.listClasses = "ui-btn ui-btn-icon-right ui-icon-carat-r".split(" ");
		this.url = "https://gdata.youtube.com/feeds/api/users/Harvard/uploads?alt=json";
	}
	
	Channel.prototype.getVideos = function(){
		var json;
		var that = this;
		$.mobile.loadPage( "video.html", { showLoadMsg: false } );
		$.ajax({
			url: this.url,
			type: "GET", 
			dataType: 'json',
		}).success(function(resp){
			// set localStorage
			// save the videos to the array
			this.videos = resp.feed.entry;
			// now just populate the list
			this.videos.forEach(function(item){
				var li = $(document.createElement("li"));
				var a = $(document.createElement("a"));
				a.attr("href", "video.html");
				a.html(item.title.$t);
				a.attr("data-transition", "slide");
				a.on('click', function(){ window.localStorage['currentVideo'] = JSON.stringify(item); });
				// these classes are what jquery mobile adds
				// without this line, they don't get styled
				that.listClasses.forEach(function(cl){ a.addClass(cl); });
				li.append(a);
				$('#channels').append(li);
			});
		});

	}
	
	return Channel;
	
});