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
<<<<<<< HEAD
            session.userData.profile= results.response;
            session.send("hiii %(name)s u r ID is %(ID)s\n ur age is %(age)d\n",session.userData.profile);
=======
        session.userData.profile= results.response;
        session.send("hiii %(name)s u r ID is %(ID)s\n ur age is %(age)d\n",session.userData.profile);
>>>>>>> 63dee9aaec15354656c45ab535cba3b00da8775b
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
<<<<<<< HEAD
    if(!session.dialogData.profile.age) builder.Prompts.number(session,"enter the age");
=======
    if(!session.dialogData.profile.age) builder.Prompts.number(session,"enter the age")
>>>>>>> 63dee9aaec15354656c45ab535cba3b00da8775b
    else next()
},function(session,results){
    if(results.response)   session.dialogData.profile.age = results.response;
    session.endDialogWithResult( { response: session.dialogData.profile });
}]);