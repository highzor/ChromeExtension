  chrome.runtime.onMessage.addListener(function (msg, sender) {
      if (msg == "toggle") {
          toggle();
      }
  })
  var iframe = document.getElementById("mySlide");
  if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.style.height = "100%";
      iframe.style.position = "absolute";
      iframe.style.top = "0px";
      iframe.style.right = "-20%";
      iframe.style.minWidth = "250px";
      iframe.style.width = "20%";
      iframe.setAttribute("id", "mySlide");
      iframe.style.zIndex = "9000000000000000000";
      iframe.style.transition = "all 150ms ease-in-out";
      iframe.frameBorder = "5px";
      iframe.src = chrome.extension.getURL("popup.html");
      document.body.appendChild(iframe);
  }

  function toggle() {
	  if (!topBar) {
	  var topBar = window.top.document.querySelector('#navTabGroupDiv');
	  var powerPaneButton = document.getElementById("crm-gmcs-button");
	  topBar.style.transition = "all 150ms ease-in-out";
	  powerPaneButton.style.transition = "all 150ms ease-in-out";
	  }
      if (iframe.style.right == "-20%") {
		  iframe.style.right = "0%";
		  powerPaneButton.style.marginRight = "20%";
		  topBar.style.marginRight = "20%";
      } else {
		  iframe.style.right = "-20%";
		  iframe.style.position = "absolute";
		  powerPaneButton.style.marginRight = "0%";
		  topBar.style.marginRight = "0%";
      }
  }
