Template.login.helpers({
  atDisabled: function() {
    return AccountsTemplates.disabled();
  },
  atClass: function() {
    return AccountsTemplates.disabled() ? 'disabled' : 'active';
  }
});