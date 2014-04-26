define(['jquery'], function($){
	var Channel = function(){
		this.videos = [];
		this.listClasses = "ui-btn ui-btn-icon-right ui-icon-carat-r".split(" ");
		this.url = "https://gdata.youtube.com/feeds/api/users/Harvard/uploads?alt=json";
	}
	
	Channel.prototype.getVideos = function(){
		var json;
		var that = this;
		$.ajax({
			url: this.url,
			type: "GET", 
			dataType: 'json',
		}).success(function(resp){
			// save the videos to the array
			this.videos = resp.feed.entry;
			// now just populate the list
			this.videos.forEach(function(item){
				var li = $(document.createElement("li"));
				var a = $(document.createElement("a"));
				a.attr("href", item.link[2].href);
				a.html(item.title.$t);
				// these classes are what jquery mobile adds
				// without this line, they don't get styled
				that.listClasses.forEach(function(cl){ a.addClass(cl); });
				li.append(a);
				$('#channels').append(li);
			})
		});

	}
	
	return Channel;
	
});