	    document.addEventListener("DOMContentLoaded",function(dcle) {
			document.getElementById("cc").addEventListener("click", createContact());
    });
	
function createContact() {
	var url = window.location.href.split("#")[0]+"?etn=account&pagetype=entityrecord";
	window.location.href = url;
}