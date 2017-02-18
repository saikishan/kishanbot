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
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD 
});
var bot = new builder.UniversalBot(connector);
server.post('api/messages',connector.listen());
//=============================================================Working on intents==========================================================//
var intents = new builder.IntentDialog();
bot.dialog('/',intents);
intents.matches(/^change name/i,[
    function(session){
        session.beginDialog('/profile');
},
    function(session,results){
        session.send("the username is changed to %s",session.userData.name);
    }
]);
intents.matches(/^i love you/i,[
    function(session){
        session.send("i love you to %s",session.userData.name);
    }
]);
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
bot.dialog('/coordinator',[
    function(session){
        builder.Prompts.text(session,"please specify the department ?");
    },
    function(session,results){
        switch(results.response){
            case 'cse':
            case 'CSE': session.send("K sUMANth");  break;
            case 'ECE':
            case 'ece': session.send("MR ece"); break;
            case 'eee':
            case 'EEE': session.send("MR EEE"); break;
            case 'CIVIL':
            case 'civil': session.send("MR civil");  break;
            case 'mech':
            case 'MECH': session.send("MR MECH");   break;
            default : session.send("their is no such method try agin!!");
        }
        session.endDialog();
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