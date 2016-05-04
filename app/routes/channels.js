import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return ['Channel One', 'Channel Two', 'Channel Three'];
	}
});
