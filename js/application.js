function Instagram(action){
	var self = this;

    self.hashtag = ko.observable("dakar2015");
	self.feed = ko.observableArray();
	self.feedShort = ko.observableArray();

	self.dummy = {
		count: 0,
		images: {
			low_resolution: {
				url: ''
			}
		},
		link: '',
		comments: {
			count: 0,
			data: [{
				from: {
					profile_picture: '',
					full_name: ''
				},
				text: ''
			}]
		}
	}

	self.image1 = ko.observable(null);
	self.image2 = ko.observable(null);

	self.load = function(){
		$.ajax({
			url: '/restful/instagram',
			method: 'GET',
			success: function(data){
				self.feed(data.data);
				self.feedShort(data.data.length > 8 ? data.data.splice(0,8) : data.data);
				self.image2(self.feed()[1])
				self.image1(self.feed()[0])
				console.log(data);
			},
			error: function(a,b,c){
				console.log(a.responseText);
			}
		});
	}

    self.loadHashTag = function(){
        $.ajax({
			url: '/restful/instagram/' + self.hashtag(),
			method: 'GET',
			success: function(data){
				self.feed(data.data);
				self.feedShort(data.data.length > 8 ? data.data.splice(0,8) : data.data);
				self.image2(self.feed()[1])
				self.image1(self.feed()[0])
				console.log(data);
			},
			error: function(a,b,c){
				console.log(a.responseText);
			}
		});
    }
}

function Twitter(){
	var self = this;
	self.feed = ko.observableArray();
	self.feedShort = ko.observableArray();

	self.load = function(){
		$.ajax({
			url: '/restful/twitter',
			method: 'GET',
			success: function(data){
				console.log(data);
				self.feed(data);
				self.feedShort(data.length > 3 ? data.splice(0,3) : data);
			},
			error: function(a,b,c){
				console.log(a.responseText);
			}
		});
	}

	self.load();
}