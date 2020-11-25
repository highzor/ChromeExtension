  var currentUrl;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    if(tabs.length != 0) {
        currentUrl = tabs[0].url;
    }
});

 document.addEventListener("DOMContentLoaded", function (dcle) {
     var createContactButton = document.getElementById("cc");
	 var searchButton = document.getElementById("button-addon2");
     if (createContactButton) {
         createContactButton.addEventListener("click", createContact);
     }
	 if (searchButton) {
         searchButton.addEventListener("click", searchEntity);
     }
 });
	
function searchEntity() {
	var inputLine = document.getElementById("searchForm");
	if (!inputLine && inputLine.value.length == 0) return;
	var config = getConfigObject();
	var searchField = defineField(inputLine.value, config);
	var filterParam = getFilterParam(searchField);
	var entities = new Array();
	entities = getEntities(searchField, config, inputLine.value);
	debugger;
}

function getFilterParam() {
	if 
}

function getEntities(searchField, config, inputValue) {
	var selectFields = getFieldForConnectingString(config);
	var oDataEndpointUrl = config.Address + "api/data/v9.0/contacts?$select=" + config.FindEntityRecord + "id" + selectFields + "&$filter=contains(" + searchField + ", '" + inputValue + "')";
    var service = GetRequestObject();
    if (service != null) {
        service.open("GET", oDataEndpointUrl, false);
        service.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        service.setRequestHeader("Accept", "application/json, text/javascript, */*");
        service.send(null);
        var retrieved = JSON.parse(service.responseText);
		debugger;
        if (retrieved.value.length > 0) {
            return retrieved.value;
        }
    }
}

function getFieldForConnectingString(config) {
	var selectFields = "";
	for	(var i = 0; i < config.SearchFields.length; i++) {
		selectFields += ", " + config.SearchFields[i];
	}
	return selectFields;
}

function defineField(fieldValue, config) {
	if (/\d/.test(fieldValue)) {
		return config.SearchFields[1];
	} else {
		return config.SearchFields[0];
	}
}
	
function createContact() {
	var config = getConfigObject();
	debugger;
	if (currentUrl) {
		var url = config.Address+"?etn=" +config.FindEntityRecord+ "&pagetype=entityrecord";
		window.open(url, "_blank"); 
	}
}

function getConfigObject() {
    var cutVar = currentUrl.split('/');
    var address = cutVar[0] + '/' + cutVar[1] + '/' + cutVar[2] + '/' + cutVar[3];
    var oDataEndpointUrl = address + "/WebResources/new_SidePanelConfig";
    var service = GetRequestObject();
    if (service != null) {
        service.open("GET", oDataEndpointUrl, false);
        service.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        service.setRequestHeader("Accept", "application/json, text/javascript, */*");
        service.send(null);
		var retrieved = service.responseText;
        if (retrieved.length > 0) {
			obj = eval(retrieved);
            return obj;
        }
    }
}

function GetRequestObject() {
    if (window.XMLHttpRequest) {
        return new window.XMLHttpRequest;
    } else {
        try {
            return new ActiveXObject("MSXML2.XMLHTTP.3.0");
        } catch (ex) {
            return null;
        }
    }
}
