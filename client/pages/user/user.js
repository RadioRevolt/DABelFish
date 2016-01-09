Template.user.helpers({
  inRole: function(role){
    check(role, String);
    return _.contains(this.roles, role);
  },
});

Template.user.events({
  "click #disableUser": function(event, template){
    Meteor.call("addToRole", this._id, "disabled", function(error, result){
      if(error){
        sAlert.error("Could not disable user");
        console.log("error", error);
      } else {
        sAlert.success("User disabled");
      }
    });
  },
  "click #enableUser": function(event, template){
    Meteor.call("removeFromRole", this._id, "disabled", function(error, result){
      if(error){
        sAlert.error("Could not enable user");
        console.log("error", error);
      } else {
        sAlert.success("User enabled");
      }
    });
  },
  "click #addAdmin": function(event, template){
    Meteor.call("addToRole", this._id, "admin", function(error, result){
      if(error){
        sAlert.error("Could not pull admin priveleges");
        console.log("error", error);
      } else {
        sAlert.success("Blessed the user with admin privileges");
      }
    });
  },
  "click #removeAdmin": function(event, template){
    Meteor.call("removeFromRole", this._id, "admin", function(error, result){
      if(error){
        sAlert.error("Could not give admin priveleges");
        console.log("error", error);
      } else {
        sAlert.success("Zapped the users admin privileges");
      }
    });
  },
  "click #resetPassword": function(event, template){
    // Temporary default password, will send a new random password by mail in the future
    password = "secret";
    Meteor.call("setPassword", this._id, password, function(error, result){
      if(error){
        sAlert.error("Unable to reset password");
        console.log("error", error);
      } else {
        sAlert.success("Password set to: " + password, {timeout: 'none', position: 'bottom'});
      }
    });
  }
});