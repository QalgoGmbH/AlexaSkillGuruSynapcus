var Alexa = require('alexa-sdk');

const APP_ID = undefined;

const skillData = [
    {
        helpTopic: "CRM",
        suggestion: "Das CRM-Modul unterstützt Sie bei der Aquise neuer Projekten."
    },
    {
        helpTopic: "PM",
        suggestion: "Das Projektmanagement-Modul unterstützt Sie bei der Abwicklung von Projekten."
    },
    {
        helpTopic: "DOX",
        suggestion: "Das Dokumentenmanagement-Modul unterstützt Sie bei der Ablage und Übermittlung von Dokumenten."
    }
];

var handlers = {
  'LaunchRequest': function () {
    this.emit(':ask', 'Ich kann dir Informationen über diverse Synapcus-Features geben. Für welches Modul interessierst du dich?', 'Sag mir ein Modul und ich erzähle dir über seine Features.');
  },
  'MakeSuggestion': function() {
      var helpTopicSlot = this.event.request.intent.slots.helpTopic.value;
      this.emit(':tell', getSuggestion(skillData, 'helpTopic', helpTopicSlot.toUpperCase()).suggestion);
  },
  'Unhandled': function () {
    this.emit(':tell', 'Tut mir leid, ich weiß nicht genau was du möchtest.');
  },
  'AMAZON.HelpIntent': function () {
      this.emit(':ask', "Wie kann ich dir helfen?", "Kann ich dir behilflich sein?");
  },
  'AMAZON.CancelIntent': function () {
      this.emit(':tell', "Okay!");
  },
  'AMAZON.StopIntent': function () {
      this.emit(':tell', "Tschüß, bis bald!");
  },
};

exports.handler = function(event, context){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

function getSuggestion(data, propName, propValue) {
  for (var i=0; i < data.length; i++) {
    if (data[i][propName] == propValue) {
      return data[i];
    }
  }
}
