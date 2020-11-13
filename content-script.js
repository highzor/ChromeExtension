chrome.runtime.onMessage.addListener(function(msg, sender){
    if(msg == "toggle"){
        toggle();
    }
})

var iframe = document.createElement('iframe'); 
iframe.style.height = "100%";
iframe.style.width = "0px";
iframe.style.position = "fixed";
iframe.style.top = "0px";
iframe.style.right = "0px";
iframe.setAttribute("id", "mySlide");
iframe.style.zIndex = "9000000000000000000";
iframe.style.transition = "300ms linear";
iframe.frameBorder = "5px"; 
iframe.src = chrome.extension.getURL("popup.html")

document.body.appendChild(iframe);
function toggle(){
    if(iframe.style.width == "0px"){
		iframe.style.width="265px";
    }
    else{
        iframe.style.width="0px";
    }
}