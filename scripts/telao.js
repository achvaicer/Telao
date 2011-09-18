var fjson = "https://picasaweb.google.com/data/feed/base/user/{userid}/albumid/{albumid}?alt=json&kind=photo&authkey={authkey_if_necessary}&=en_US";
var vjson = "http://gdata.youtube.com/feeds/users/{userid}/uploads?alt=json&format=5";

var items = [];
var interval = 0;
var min = 0;

$(document).ready(function() {
	loadPhoto();
	interval = setInterval(showLessViewed, 5000);
});

function doAjax(url, cb) {
	$.getJSON(url + "&nochache="+(new Date()).getTime(), function(data) {cb(data);});
}

function showLessViewed() {
	if (!items.length) return;
	clearInterval(interval);
	items.sort(function (a,b) { return a.viewed <= b.viewed ? -1 : 1 });
	var first = items[0];
	first.show(first.src);
	min = first.viewed++;
	setTimeout(showLessViewed, first.duration);
}

function showPhoto(src) {
	$(".incoming .foto").attr("src", src).show();
	$(".incoming .video").hide();
	switchMediaDivs();	
}

function showVideo(src) {
	$(".incoming .video").attr("src", "http://www.youtube.com/embed/" + src + "?rel=0&autoplay=1&controls=0").show();
	$(".incoming .foto").hide();
	switchMediaDivs();
}

function loadPhoto() {
	doAjax(fjson, function(data) {
		var f = data.feed.entry || [];
		for (var i=0; i < f.length; i++) {
			var src = f[i].content.src;
			if (!items.filter(function(e) { return e.type == "photo" && e.src == src }).length)
				items.push({"src":src, type:"photo", viewed:min, show:showPhoto, duration:10000});
				
		}
		setTimeout(loadPhoto, 60000);		
	});
}

function loadVideo() {
	
	doAjax(vjson, function(data) {
		var v = data.feed.entry || [];
		for (var i =0; i < v.length; i++) {
			var src = $.url.setUrl(v[i].link[0].href).param("v");
			if (!items.filter(function(e) { return e.type == "video" && e.src== src }).length)
				items.push({"src":src, type:"video", viewed:min, show:showVideo, duration:v[i].media$group.yt$duration.seconds * 1000});

		}
		setTimeout(loadVideo, 60000);
	});
}

function switchMediaDivs() {
	$(".incoming").removeClass("incoming").addClass("temp");
	$(".outgoing").removeClass("outgoing").addClass("incoming");
	$(".temp").removeClass("temp").addClass("outgoing");
	$(".incoming .foto").hide();
}
