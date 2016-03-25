(function(){
	const CLIENT_ID ="02gUJC0hH2ct1EGOcYXQIzRFU91c72Ea";

	function get(url, callback){
		var d = new XMLHttpRequest;
		d.addEventListener("load", function(a) {
			callback(a.target.responseText)
		});
		d.open("GET", url);
		d.send();
	}

	function download(file, name) {
	    var link = document.createElement('a');
	    link.download = name;
	    link.href = file;
	    console.log(link);
	    link.click();
	}

	function fetchSoundById(trackId, callback){
		var url = "https://api.soundcloud.com/i1/tracks/"
			+ trackId
			+ "/streams?client_id="
			+ CLIENT_ID 
			+ "&app_version=cc53575";
		get(url, function(data){
			var url = JSON.parse(data).http_mp3_128_url;
			callback(url);
		});

	}

	function fetchSoundFromUrl(url, callback){
		//fetch track id
		var encodedURL = encodeURI(url);
		get("https://api.soundcloud.com/resolve.json?url="
				+ encodedURL
				+ "&client_id="
				+ CLIENT_ID
			, function(data){
				var resolveData = JSON.parse(data);
				console.log(resolveData);
				var trackId = resolveData.id;
				fetchSoundById(trackId, callback);
		});
	}


	var buttonContainer = document.querySelector(".sc-button-group.sc-button-group-medium");
	if(buttonContainer === null){
		return;
	}
	var existingButtons = buttonContainer.childNodes;
	for(var i=0; i<existingButtons.length; i++){
		if(existingButtons[i].title === "Download"){
			return;
		}
	}

	var downloadButton = document.createElement("button");
	downloadButton.className = "sc-button sc-button-medium sc-button-responsive sc-button-download sc-button-klau";
	downloadButton.title = "Download";
	downloadButton.innerHTML = "Download";
	buttonContainer.appendChild(downloadButton);

	fetchSoundFromUrl(document.location.href, function(url){
		downloadButton.addEventListener('click', function(){
			download(url, "track.mp3");
		});
	});

	

})();