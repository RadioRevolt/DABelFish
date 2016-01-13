/* Controller for home page */

Template.home.rendered = function(){
  Session.set("dabTextCursor", 0);
  if (!Session.get("automatic"))
    Session.set("automatic", false);
}


Template.home.helpers({
  textLimit: function() {
    return 140;
  },
  currentText: function() {
    return DABText.findOne({}, {
      sort: {createdAt: -1}
    });
  },
  formatDate: function(date) {
    return moment(date).calendar(null, {
      sameDay: '[Today at] HH:mm',
      lastDay: '[Yesterday at] HH:mm',
      lastWeek: '[Last] dddd [at] HH:mm',
      thisWeek: 'dddd [at] HH:mm',
      sameElse: 'dddd DD/MM/YY [at] HH:mm'
    });
  },
  texts: function() {
    cursor = Session.get("dabTextCursor");
    return DABText.find({},
    {
      sort: {createdAt: -1},
      skip: cursor || 0,
      limit: 20
    });
  },
  paginationNewerDisabled: function() {
    if(Number(Session.get("dabTextCursor")) < 20)
      return "disabled";
    return "";
  },
  paginationOlderDisabled: function() {
    if(Number(Session.get("dabTextCursor")) >= DABText.find().count() - 20)
      return "disabled";
    return "";
  },
  time_limits: function() {
    var list = [];
    var times = [1,2,3,4,5,7,10,15,20,30,45,60]
    for (var limit in times)
      list.push({value: times[limit]});
    return list;
  },
  auto_on: function() {
    return Session.get("automatic");
  }
});

Template.home.events({
  "submit #new-text": function(event, template) {
    var text = event.target.text.value;

    // Validation
    if(!text) {
      sAlert.error("The text cannot be empty");
      return false;
    }
    if (!Meteor.userId()) {
      sAlert.error("You must logg in to do this");
      return false;
    }

    var limit = (parseInt(event.target.timeLimit.value) != NaN ? Number(event.target.timeLimit.value): null);

    Meteor.call("addText", {
      text: text
    }, limit, function(error, result){
      if(error){
        sAlert.error(error.reason);
        console.log("error", error);
      } else {
        sAlert.success("Success!");
        event.target.text.value = "";
      }
    });
    return false;
  },
  "click #pagination-newer": function(event, template) {
    var cursor = Number(Session.get("dabTextCursor"));
    if(cursor >= 20)
      Session.set("dabTextCursor", cursor - 20);
  },
  "click #pagination-older": function(event, template) {
    var cursor = Number(Session.get("dabTextCursor"));
    var count = DABText.find().count() - 20;
    if(cursor < count)
      Session.set("dabTextCursor", cursor + 20);
  },
  "click #reset-text": function(event, template) {
    Meteor.call("resetText", function(error, result){
      if(error){
        sAlert.error(error.reason);
        console.log("error", error);
      } else {
        sAlert.success("Text reset to default");
      }
    });
  },
  "click #automatic": function(event, template) {
    Meteor.call("switch_automatic", event.target.checked, function(error, result){
      if(error){
        sAlert.error(error.reason);
        console.log("error", error);
      } else {
        sAlert.success("Automatic text turned on");
      }
    });
  }
});
