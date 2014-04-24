define(['jquery'], function($){
	var Video = function(video){
		console.log(video);
		this.video = video;
		this.title = this.video.title.$t;
		this.href = '';
		
		$('#video-page header h1').html(this.title);
		
	}

	return Video;
	
});