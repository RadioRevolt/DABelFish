/* Server-side code */

Meteor.publish("allUserData", function() {
  if(Roles.userIsInRole(this.userId, 'admin')){
    return Meteor.users.find();
  } else {
    this.stop();
    return;
  }
});

Meteor.publish("dabText", function(s) {
  if(this.userId){
    return DABText.find({}, {
      sort: {createdAt: -1},
      skip: s || 0,
      limit: 20
    });
  }
});

Meteor.publish("userLog", function(s, u) {
  if (Roles.userIsInRole(this.userId, "admin")){
    return UserLog.find({$or: [{createdById: u}, {userId: u}]}, {
      sort: {createdAt: -1},
      skip: s || 0,
      limit: 10
    });
  } else {
    this.stop();
    return;
  }
})

Meteor.startup(function(){
  if(!Meteor.users.findOne()) {
    console.log("Found no users in the database, creating the default user.");
    userId = Meteor.users.insert({
      username: "radioteknisk@studentmediene.no",
      roles: ["admin"],
      profile: {
        name: "Radioteknisk"
      },
      createdBy: "GLaDOS",
      createdByID: Random.id()
    });
    Accounts.setPassword(userId, "secret");
  }
});
