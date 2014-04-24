define(['jquery'], function($){
	var Video = function(video){
		console.log(video);
		this.video = video;
		this.title = this.video.title.$t;
		this.href = '';
		
		$('header h1').html(this.title);
		
	}
	
	Video.prototype.setup = function(){
		
		
	}

	return Video;
	
});