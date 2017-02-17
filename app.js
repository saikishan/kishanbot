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
//=====
//==bot Dialogs
//==========
bot.dialog('/',[
    function(session){
        session.beginDialog('\ensure profile',session.userData.profile);
    },
    function(session,results){
            session.userData.profile= results.response;
            session.send("hiii %(name)s u r ID is %(ID)s\n ur age is %(age)d\n",session.userData.profile);
            session.beginDialog('\get scores',session.userData.scores); 
    },
    function(session,results){
        session.userData.scores = results.responsescore;
        session.send("hii %(name)s u r ID is %(ID)s u r age is %(age)d\n your score is %(y1)d",session.userData.profile,session.userData.scores);
    }
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
    if(!session.dialogData.profile.age) builder.Prompts.number(session,"enter the age")
    else next()
},function(session,results){
    if(results.response)   session.dialogData.profile.age = results.response;
    session.endDialogWithResult( { response: session.dialogData.profile });
}]);
bot.dialog('\get scores',[function(session,args,next){
    session.dialogData.scores =args||{};
  //  if(!session.dialogData.scores.y1)
        builder.Prompts.number(session,"enter the year 1 scores");
    //else next();    
},
function(session ,results){
    if(results.response)   session.dialogData.scores.y1 = results.response;
    console.log(session.dialogData.scores.y1);
    session.endDialogWithResult({ responsescore: session.dialogData.scores  });
}
]);