/* Client-side code */

Accounts.onLogin(function(){
  Meteor.subscribe("dabText");
  Meteor.subscribe("allUserData");
});

sAlert.config({
  effect: 'slide',
  position: 'bottom-right'
});
