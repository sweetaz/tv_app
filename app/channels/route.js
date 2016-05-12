import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params) {
		return this.store.query('channel',{user: params.user_id});
	},
	actions: {
		addChannel: function() {
			var channel = this.store.createRecord('channel', {
				title: this.controller.get('title'),
				user: this.controllerFor('application').get('user')
			});
			channel.save().then(() => {
				console.log('save successful');
				this.controller.set('title',null);
				this.refresh();
			}, function() {
				console.log('save failed');
			});
		}
	}
});
