var store = {

	// event where you are taking pics
	event_name: null,

	// hashtag
	event_tag: null,
	picture_index: 0,
	signup_count: 0,
	queue: [{'twitter':'@JeremyJacobskind', 'phone':'15169960257'}],
	addToQueue: function(twitter_handle, phone_num) {
		if(twitter_handle[0]!=='@') {
			twitter_handle = '@' + twitter_handle;
		}
		this.queue.push({'twitter':twitter_handle, 'phone':phone_num});
		this.signup_count++;
	},
	removeFromQueue: function() {
		
		this.queue.shift();
		this.picture_index++;
	}
};

module.exports = {
	'store': store
};



