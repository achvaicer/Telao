var fjson = "https://picasaweb.google.com/data/feed/base/user/achvaicer/albumid/5588740059809037009?alt=json&kind=photo&authkey=Gv1sRgCPXT_IDYp8OfGA&hl=en_US";
var vjson = "ttp://gdata.youtube.com/feeds/users/achvaicer/uploads?alt=json&format=5";

$(document).ready(function() {
	$.getJSON(fjson,
		function(data) {
			var f = data.feed.entry;
			if (f && f.length)
				$("#foto").attr("src", f[f.length -1].content.src);
			console.log(data);
		});
});
