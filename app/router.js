import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('register');
  this.route('login');
  this.route('channels', { path:'channels/:user_id' }, function() {});
});

export default Router;
