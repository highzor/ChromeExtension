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
      iframe.style.right = "-25%";
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
	  var iframeMain1 = window.top.document.querySelector('#contentIFrame1');
	  var crmTopBar = window.top.document.querySelector('#crmTopBar');
	  var crmRibbonManager = window.top.document.querySelector('#crmRibbonManager');
	  var crmContentPanel = window.top.document.querySelector('#crmContentPanel');
	  crmTopBar.style.transition = "all 150ms ease-in-out";
	  crmRibbonManager.style.transition = "all 150ms ease-in-out";
	  crmContentPanel.style.transition = "all 150ms ease-in-out";
	  var iframeMain = window.top.document.querySelector('#contentIFrame0');
	  var powerPaneButton = document.getElementById("crm-gmcs-button");
	  var powerPaneButton2 = document.getElementById("navTabGMCSButton2div");
	  var dropDownMenuInfo = document.getElementById("navTabButtonUserInfoDropDownId");
	  var dropDownMenuSet = document.getElementById("navTabButtonSettingsDropDownId");
	  var dropDownMenuSearch = document.getElementsByClassName("navBarSearchTextBoxDiv navBarSearchIcon")[0];
	  var dropDownMenu;
	  if (iframeMain1) {
		  iframeMain1.style.transition = "all 150ms ease-in-out";
	  }
	  if (dropDownMenuInfo) {
		  dropDownMenu = dropDownMenuInfo;
		  dropDownMenu.style.transition = "all 150ms ease-in-out";
	  } else if (dropDownMenuSet) {
		  dropDownMenu = dropDownMenuSet;
		  dropDownMenu.style.transition = "all 150ms ease-in-out";
	  } else if (dropDownMenuSearch) {
		  dropDownMenu = dropDownMenuSearch;
		  dropDownMenu.style.transition = "all 150ms ease-in-out";
	  }
	  //var contentPage = window.top.document.querySelector('#mainTable');
	  iframeMain.style.transition = "all 150ms ease-in-out";
	  topBar.style.transition = "all 150ms ease-in-out";
	  powerPaneButton.style.transition = "all 150ms ease-in-out";
	  powerPaneButton2.style.transition = "all 150ms ease-in-out";
	  
	  }
      if (iframe.style.right == "-25%") {
		 if (iframeMain1) {
			 iframeMain1.style.width = "80%";
		 }
		 crmContentPanel.style.top = "130px";
	  crmTopBar.style.height = "80px";
	  crmTopBar.style.width = "70%";
	  crmRibbonManager.style.display = "block";
		  iframe.style.right = "0%";
		  iframeMain.style.width = "80%";
		  powerPaneButton.style.marginRight = "20%";
		  powerPaneButton2.style.marginRight = "20%";
		  if (dropDownMenu) {
			  dropDownMenu.style.marginRight = "20%";
		  }
		  topBar.style.marginRight = "20%";
      } else {
		  iframe.style.right = "-25%";
		  iframe.style.position = "absolute";
		 
	  crmTopBar.style.height = "40px";
	  crmTopBar.style.width = "100%";
	  crmRibbonManager.style.display = "inline";
		  if (iframeMain1) {
			 iframeMain1.style.width = "100%";
		 }
		  iframeMain.style.width = "100%";
		  powerPaneButton.style.marginRight = "0%";
		  powerPaneButton2.style.marginRight = "0%";
		  if (dropDownMenu) {
			  dropDownMenu.style.marginRight = "0%";
		  }
		  topBar.style.marginRight = "0%";
		  crmContentPanel.style.top = "90px";
      }
  }
