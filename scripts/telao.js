var fjson = "https://picasaweb.google.com/data/feed/base/user/achvaicer/albumid/5588740059809037009?alt=json&kind=photo&authkey=Gv1sRgCPXT_IDYp8OfGA&hl=en_US";
var vjson = "http://gdata.youtube.com/feeds/users/achvaicer/uploads?alt=json&format=5";

var items = [];

$(document).ready(function() {
	loadPhoto();
	loadVideo();
	setInterval(showLessViewed, 60000);
});

function doAjax(url, cb) {
	$.getJSON(url, function(data) {cb(data);});
}

function showLessViewed() {
	if (!items.length) return;
	items.sort(function (a,b) { return a.viewed < b.viewed ? -1 : 1 });
	var first = items[0];
	first.show(first.src);
	first.viewed++;
}

function showPhoto(src) {
	$("#foto").attr("src", src).show();
	$("#video").hide();
}

function showVideo(src) {
	$("#video").attr("src", "http://www.youtube.com/embed/" + src + "?rel=0&autoplay=1&controls=0").show();
	$("#foto").hide();

}

function loadPhoto() {
	doAjax(fjson, function(data) {
		console.log(data);
		var f = data.feed.entry || [];
		for (var i=0; i < f.length; i++) {
			var src = f[i].content.src;
			if (!items.filter(function(e) { return e.type == "photo" && e.src == src }).length)
				items.push({"src":src, type:"photo", viewed:0, show:showPhoto});
		}
		setTimeout(loadPhoto, 60000);		
	});
}

function loadVideo() {
	doAjax(vjson, function(data) {
		console.log(data);
		var v = data.feed.entry || [];
		for (var i =0; i < v.length; i++) {
			var src = $.url.setUrl(v[i].link[0].href).param("v");
			if (!items.filter(function(e) { return e.type == "video" && e.src== src }).length)
				items.push({"src":src, type:"video", viewed:0, show:showVideo});

		}
		setTimeout(loadVideo, 60000);
	});
}
