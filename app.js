var Audios = new FS.Collection("audios", {
  stores: [new FS.Store.FileSystem("audios")]
});



if (Meteor.isClient) {

  player = null

  Template.hello.helpers({
    counter: function () {
      return Session.get("counter");
    },
    audios: function() {
      return Audios.find()
    }
  });

  Template.hello.events({
    'click .reload': function () {
      console.log("reload");
      Meteor.call("reloadData");
    },
    "click .play": function() {
      console.log("play");
      if (player) {
        player.stop();
      }
      player = new buzz.sound(Audios.findOne().url());
      player.play();
    },
    "click .stop": function() {
      console.log("stop");
      if (player) {
        player.stop();
      }
    },
    "click .settime12": function() {
      console.log("settime 12");
      if (player) {
        player.setTime(12);
      }
    },
    "click .settimeStart": function() {
      console.log("settime Start");
      if (player) {
        player.setTime(0);
      }
    }
  });
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    addFirstRecord(process);

  });

  Meteor.methods({
      reloadData: function () {
        Audios.remove({});
        addFirstRecord(process);
      }
  });

  addFirstRecord = function(process) {
    if (Audios.find().count() === 0) {
      fileObj = new FS.File();
      fileObj.attachData(process.env.PWD+"/david.mp3");
      a_id = Audios.insert(fileObj);
    }
  };
}
