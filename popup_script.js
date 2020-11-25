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
	var filterParam = getFilterParam(searchField, inputLine.value);
	var entities = new Array();
	entities = getEntities(searchField, config, filterParam);
	if (entities.length == 0) return;
	putInResultTable(entities);
}

function putInResultTable(entities) {
	debugger;
	var resultTable = document.getElementById("exampleFormControlSelect2");
	for (var i = 0; i < entities.length; i++) {
	 var optionEl = document.createElement("option");
	 optionEl.innerHTML = entities[i].fullname;
	 resultTable.appendChild(optionEl);
	}
}

function getFilterParam(searchField, inputValue) {
	debugger;
	var filterParam = "&$filter=";
	if (/\d/.test(inputValue)) {
		if (inputValue.includes('+')) {
			inputValue = inputValue.replace("+", "%2B");
		}
		filterParam += searchField + " eq '" + inputValue + "'";
		return filterParam;
	} else {
		filterParam += "startswith(" + searchField + ", '" + inputValue + "')";
		return filterParam;
	}
}

function getEntities(searchField, config, filterParam) {
	debugger;
	var selectFields = getFieldForConnectingString(config);
	var oDataEndpointUrl = config.Address + "api/data/v9.0/contacts?$select=" + config.FindEntityRecord + "id" + selectFields + filterParam;
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

function defineField(inputValue, config) {
	if (/\d/.test(inputValue)) {
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
        //var retrieved = JSON.parse(service.responseText);
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
