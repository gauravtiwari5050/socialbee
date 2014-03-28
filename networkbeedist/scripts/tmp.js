function test(){
    var test = $('td.Bu.y3');
    if(test === null || test === undefined){
      alert('Still Undefined');
    } else{
      console.log("Logging test");
      if ($('td.Bu.y3').size()>=1){
        $('td.Bu.y3').html('<h1> This is testing </h1>') 
      }
    }

}

NetworkBeeApp = function(){
	console.log("Bootstrapping the app");
	this.sidePanelElement = null;
	this.targetEmail = null
	this.targetName = null
	this.setupEventHandlers();
	this.waitForSidePanelToLoad();
};
NetworkBeeApp.prototype.setupEventHandlers = function() {
	var self = this;
	$('body').on('click','.fbconnect',function(){
		self.loadPath();
	});
};
NetworkBeeApp.prototype.waitForSidePanelToLoad = function() {
	console.log("Waiting for sidePanel to load");
	var self = this;
	var length = $('td.Bu.y3').size();
	if (length >= 1){
		self.sidePanelElement = $('td.Bu.y3')[0];
		self.loadContents();
		self.targetEmail = $('span.gD').attr('email');
		self.targetName = $('span.gD').attr('name');


	} else {
		setTimeout(function(){
			self.waitForSidePanelToLoad();
		},1000)	
	}
};
NetworkBeeApp.prototype.loadContents = function() {
	var self = this;
	$.read(
		'http://localhost:3000/login',
		function(error){
			console.log("Function1");
			console.log(error);
		},
		function(response){
			var response = response.responseText;
			console.log(response);
			$(self.sidePanelElement).html(response)

			console.log($(self.sidePanelElement).html());
			
		}
	);

	console.log(this.sidePanelElement);
	$(this.sidePanelElement).html('<img src="http://i.imgur.com/E4vWeyN.png" style="width:70%"></img> ');
};

NetworkBeeApp.prototype.loadPath = function() {
	var self = this;
	$(self.sidePanelElement).html('<center><h3> Looking up <br/>' + self.targetName + '</h3></center>');
	$.read(
		'http://localhost:3000/path?target=' + self.targetName,
		function(error){
			console.log("Function1");
			console.log(error);
		},
		function(response){
			var response = response.responseText;
			console.log(response);
			$(self.sidePanelElement).html(response)

			console.log($(self.sidePanelElement).html());
			
		}
	);
};
