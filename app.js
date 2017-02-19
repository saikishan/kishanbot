var restify = require('restify');
var builder = require('botbuilder');
//=================================================================
//Bot Setp
//=================================================================
//setup restify Server
var server = restify.createServer();
server.listen(process.env.port||process.env.PORT||3978,function(){
    console.log("%s lisening to %s",server.name,server.url);
});
//create chat bot
var connector = new builder.ChatConnector({
    appId: '351e1a98-1bd6-4865-8d64-61ab3902e4b9',
    appPassword: 'yPBwj4iMyj8fbRYRyqCjmAU'
});
var bot = new builder.UniversalBot(connector);
server.post('api/messages',connector.listen());
var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/2520ea80-4d88-4a6e-98e3-1905ebeb7731?subscription-key=aeca06be462d48eea65217dc45bf6595&verbose=true';
var recognizer = new builder.LuisRecognizer(model);
var intents = new builder.IntentDialog({ recognizers: [recognizer] });
bot.dialog('/', intents);
//=============================================================Working on intents==========================================================//
intents.matches('say_who',[
    function(session,args,next){
        var personco = builder.EntityRecognizer.findEntity(args.entities.person,'coordinator');
        var personhod = builder.EntityRecognizer.findEntity(args.entities,'hod');
        var personprincipal = builder.EntityRecognizer.findEntity(args.entities,'principal');
        var personvp = builder.EntityRecognizer.findEntity(args.entities,'viceprincipal');
        console.log(personco);
        if(personco)    session.beginDialog('/coordinator',session,args);
        else if(personhod)  session.beginDialog('/hod',session);
        else if(personprincipal) session.beginDialog('/principal',session);
        else if(personvp) session.beginDialog('/personvp')
        else session.send("person not availible");
},
    function(session,results){
        session.send("the username is changed to %s",session.userData.name);
    }
]);
bot.dialog('/coordinator',[
    function(session,args){
        var cse = builder.EntityRecognizer.findEntity(args.entities,'department','cse');
        var ece = builder.EntityRecognizer.findEntity(args.entities,'ece');
        var mech = builder.EntityRecognizer.findEntity(args.entities,'mech');
        var civil = builder.EntityRecognizer.findEntity(args.entities,'civil');
        var it = builder.EntityRecognizer.findEntity(args.entities,'it');
        var eee = builder.EntityRecognizer.findEntity(args.entities,'eee');
        if(cse) session.endDialog("k sumanth");
    }
]);
intents.matches(/^i love you/i,[
    function(session){
        session.send("i love you to %s",session.userData.name);
    }
]);
/*bot.dialog('/picture', [
    function (session) {
        session.send("You can easily send pictures to a user...");
        var msg = new builder.Message(session)
            .attachments([{
                contentType: "image/jpeg",
                contentUrl: "http://www.theoldrobots.com/images62/Bender-18.JPG"
            }]);
        session.endDialog(msg);
    }
]);*/
intents.matches(/^what is your age/i,[function(session){
    session.send("im just born");
}]);
intents.matches(/^who created you/i,[
    function(session){
        session.send("Master Kishan developed");
    }
]);
intents.matches(/^where is valiant/i,[
    function(session){
        session.send("This event is at VIT, vishnupur");
    }
]);
intents.matches(/^who is the coordinator/i,[
    function(session){
        session.beginDialog('/coordinator',session);
    }
]);
intents.onDefault([
    function(session,args,next){
        if(!session.userData.name){
            session.beginDialog('/profile');
        }
        else next();
    },
    function(session,results){
        session.send("Hello %s!",session.userData.name);
    }
]);
bot.dialog('/profile',[
    function(session){
        builder.Prompts.text(session,'Hi what is your name ?');
    },
    function(session,results){
        session.userData.name = results.response;
        session.endDialog();
    }
]);
//=====
//==bot Dialogs
//==========
/*
bot.dialog('/',[
    function(session){
        session.beginDialog('\ensure profile',session.userData.profile);
    },
    function(session,results){
        session.userData.profile= results.response;
        session.send("hiii %(name)s u r ID is %(ID)s\n ur age is %(age)d\n",session.userData.profile);    }
]);
bot.dialog('\ensure profile',[function(session,args,next){
    session.dialogData.profile =args || {};
    if(!session.dialogData.profile.name)  builder.Prompts.text(session,"hello what is your name ?");
    else next();
},function(session,results,next){
    if(results.response)    session.dialogData.profile.name = results.response;
    if(!session.dialogData.profile.ID)   builder.Prompts.text(session,"enter the ID number ");
    else next();
},function(session,results,next){
    if(results.response)    session.dialogData.profile.ID = results.response;
    if(!session.dialogData.profile.age) builder.Prompts.number(session,"enter the age");
    else next()
},function(session,results){
    if(results.response)   session.dialogData.profile.age = results.response;
    session.endDialogWithResult( { response: session.dialogData.profile });
}]);*/