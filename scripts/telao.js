var fjson = "https://picasaweb.google.com/data/feed/base/user/achvaicer/albumid/5588740059809037009?alt=json&kind=photo&authkey=Gv1sRgCPXT_IDYp8OfGA&hl=en_US";
var vjson = "http://gdata.youtube.com/feeds/users/machinima/uploads?alt=json&format=5";

$(document).ready(function() {
//	loadPhoto();
	loadVideo();
});

function doAjax(url, cb) {
	$.getJSON(url, function(data) {cb(data);});
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
		var f = data.feed.entry;
		if (f && f.length)
			showPhoto(f[f.length -1].content.src);
	});
}

function loadVideo() {
	doAjax(vjson, function(data) {
		var v = data.feed.entry;
		if (v && v.length)
			showVideo($.url.setUrl(v[v.length-1].link[0].href).param("v"));
		console.log(data);		
	});
}
