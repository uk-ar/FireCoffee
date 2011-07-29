//http://www.softwareishard.com/blog/firebug-tutorial/extending-firebug-toolbar-part-ii/
//function Coco() Cu.import('resource://helloworld/coffee-script.js', null).Coco
// Components.utils.import('resource://helloworld/coffee-script.js');
//resource://helloworld/content/coffee-script.js
// console.log("1");
// console.log(CoffeeScript.compile('alert "hoge"'));
// console.log("2");
//Components.utils.import("resource://chrome/content/helloworld/coffee-script.js");
// var a = [Components.utils.import("resource://helloworld/coffee-script.js")];
// console.log(CoffeeScript);
FBL.ns(function() { with (FBL) {
  var panelName = "HelloWorld";

  function HelloWorldPanel() {}
  HelloWorldPanel.prototype =
    extend(Firebug.Panel,
	   {
	     name: panelName,
	     title: "Hello World!",

	     initialize: function() {
	       Firebug.Panel.initialize.apply(this, arguments);
	     }
	   });
  Firebug.registerPanel(HelloWorldPanel);
  const commandPrefix = ">>>";
  Firebug.HelloWorldModel =
    extend(Firebug.Module,
	   {
	     showPanel: function(browser, panel) {
	       //var isHwPanel = panel &amp;&amp; panel.name == panelName;
	       var isHwPanel = panel && panel.name == panelName;
	       var hwButtons = browser.chrome.$("fbHelloWorldButtons");
	       collapse(hwButtons, !isHwPanel);
	     },
	     onMyButton: function(context) {
	       alert("Hello World!");
	     },
	     // runCoffee: function(context){
	     //   console.log(Firebug.CommandLine.acceptCompletionOrReturnIt(Firebug.currentContext));
	     //   var expr = Firebug.CommandLine.acceptCompletionOrReturnIt(Firebug.currentContext);
	     //   if (expr == "")
	     // 	 return;
	     // }
	     //Firebug.HelloWorldModel.runCoffee =
	     runCoffee: function(context, command){
	        var expr = command ? command : Firebug.CommandLine.acceptCompletionOrReturnIt(context);

                var mozJSEnabled = Firebug.getPref("javascript", "enabled");
                if (mozJSEnabled)
                {
	      	 Firebug.CommandLine.commandHistory.appendToHistory(expr);
                }
	        try{
	      	 expr=CoffeeScript.compile(expr, {bare: "on"});
	      	 //console.log(expr);
	      	 ori=Firebug.CommandLine.commandHistory.appendToHistory;
	      	 Firebug.CommandLine.commandHistory.appendToHistory=function(command){};
	      	 Firebug.CommandLine.enter(context, expr);
	      	 Firebug.CommandLine.commandHistory.appendToHistory=ori;
	        }catch(e){
		  Firebug.Console.log(commandPrefix + " " + expr, context, "command", FirebugReps.Text);
	      	  Firebug.Console.logFormatted(["SyntaxError:",e.message], context, "error", true);
	        }
	      }
	       
	       // function(context, command){
	       // 	 var expr = command ? command : Firebug.CommandLine.acceptCompletionOrReturnIt(context);

	       // 	 var mozJSEnabled = Firebug.getPref("javascript", "enabled");
	       // 	 if (mozJSEnabled)
	       // 	 {
	       // 	   Firebug.CommandLine.commandHistory.appendToHistory(expr);
	       // 	 }
	       // 	 try{
	       // 	   expr=CoffeeScript.compile(expr, {bare: "on"});
	       // 	   //console.log(expr);
	       // 	   ori=Firebug.CommandLine.commandHistory.appendToHistory;
	       // 	   Firebug.CommandLine.commandHistory.appendToHistory=function(command){};
	       // 	   Firebug.CommandLine.enter(context, expr);
	       // 	   Firebug.CommandLine.commandHistory.appendToHistory=ori;
	       // 	 }catch(e){
	       // 	   //        if (!Firebug.largeCommandLine || context.panelName != "console")
	       // 	   //{
	       // 	   //this.clear(context);
	       // 	   //Firebug.Console.log(commandPrefix + " " + expr, context, "command", FirebugReps.Text);
	       // 	   //}
	       // 	   //else
	       // 	   //{
	       // 	   //var shortExpr = cropString(stripNewLines(expr), 100);
	       // 	   //Firebug.Console.log(commandPrefix + " " + shortExpr, context, "command", FirebugReps.Text);
	       // 	   Firebug.Console.log(commandPrefix + " " + expr, context, "command", FirebugReps.Text);
	       // 	   //}
	       // 	   Firebug.Console.logFormatted(["SyntaxError:",e.message], context, "error", true);
	       // 	 }
	       // }
	   });
  Firebug.registerModule(Firebug.HelloWorldModel);

  //const commandPrefix = ">>>";
  function getNoScript()
  {
    if (!this.noscript)
      this.noscript = Cc["@maone.net/noscript-service;1"] &&
      Cc["@maone.net/noscript-service;1"].getService().wrappedJSObject;
    return this.noscript;
  }

  //Firebug.CommandLine.runCoffee
  // Firebug.HelloWorldModel.runCoffee =
  //   function(context, command){
  //     var expr = command ? command : Firebug.CommandLine.acceptCompletionOrReturnIt(context);
  //     try{
  // 	expr=CoffeeScript.compile(expr, {bare: "on"});
  // 	console.log(expr);
  // 	Firebug.CommandLine.enter(context, expr);
  //     }catch(e){
  // 	Firebug.Console.log(e);
  //     }
  //   }
    //alert("coffee");
    // console.log("coffee");
    // 
    // if (expr == "")
    //   return;

    // var mozJSEnabled = Firebug.getPref("javascript", "enabled");
    // if (mozJSEnabled)
    // {
    //   if (!Firebug.largeCommandLine || context.panelName != "console")
    //   {
    //     this.clear(context);
    //     Firebug.Console.log(commandPrefix + " " + expr, context, "command", FirebugReps.Text);
    //   }
    //   else
    //   {
    //     var shortExpr = cropString(stripNewLines(expr), 100);
    //     Firebug.Console.log(commandPrefix + " " + shortExpr, context, "command", FirebugReps.Text);
    //   }

    //   this.commandHistory.appendToHistory(expr);

    //   var noscript = getNoScript();
    //   if (noscript)
    //   {
    //     var noScriptURI = noscript.getSite(Firebug.chrome.getCurrentURI().spec);
    //     if (noScriptURI)
    //       noScriptURI = (noscript.jsEnabled || noscript.isJSEnabled(noScriptURI)) ? null : noScriptURI;
    //   }

    //   if (noscript && noScriptURI)
    //     noscript.setJSEnabled(noScriptURI, true);

    //   var goodOrBad = FBL.bind(Firebug.Console.log, Firebug.Console);
      //
    //   try{
    // 	//this.evaluate(expr, context, null, null, goodOrBad, goodOrBad);
    //   }
    //   catch(e){
    // 	Firebug.Console.log(e);
    //   }

    //   //   if (noscript && noScriptURI)
    //   //     noscript.setJSEnabled(noScriptURI, false);

    //   //   this.autoCompleter.reset();
    // }
    // else
    // {
    //   Firebug.Console.log($STR("console.JSDisabledInFirefoxPrefs"), context, "info");
    // }

      //Firebug.CommandLine.enter(context, expr);
  //}
  //Firebug.registerModule(Firebug.CommandLine);

  //const commandPrefix = ">>>";
    // Firebug.CommandLine =
  //   extend(Firebug.CommandLine,
  // 	   {
  // 	     runCoffee: function(context, command){
  // 	     //alert("coffee");
  // 	       console.log("coffee");
  // 	       // Firebug.CommandLine.enter(Firebug.currentContext, Firebug.CommandLine.acceptCompletionOrReturnIt(context));
  // 	       var expr = command ? command : this.acceptCompletionOrReturnIt(context);
  // 	       if (expr == "")
  // 		 return;

  // 	       var mozJSEnabled = Firebug.getPref("javascript", "enabled");
  // 	       if (mozJSEnabled)
  // 	       {
  // 		 if (!Firebug.largeCommandLine || context.panelName != "console")
  // 		 {
  // 		   this.clear(context);
  // 		   Firebug.Console.log(commandPrefix + " " + expr, context, "command", FirebugReps.Text);
  // 		 }
  // 		 else
  // 		 {
  // 		   var shortExpr = cropString(stripNewLines(expr), 100);
  // 		   Firebug.Console.log(commandPrefix + " " + shortExpr, context, "command", FirebugReps.Text);
  // 		 }

  // 		 this.commandHistory.appendToHistory(expr);

  // 		 var noscript = getNoScript();
  // 		 if (noscript)
  // 		 {
  // 		   var noScriptURI = noscript.getSite(Firebug.chrome.getCurrentURI().spec);
  // 		   if (noScriptURI)
  // 		     noScriptURI = (noscript.jsEnabled || noscript.isJSEnabled(noScriptURI)) ? null : noScriptURI;
  // 		 }

  // 		 if (noscript && noScriptURI)
  // 		   noscript.setJSEnabled(noScriptURI, true);

  // 		 var goodOrBad = FBL.bind(Firebug.Console.log, Firebug.Console);
  // 		 this.evaluate(expr, context, null, null, goodOrBad, goodOrBad);

  // 		 if (noscript && noScriptURI)
  // 		   noscript.setJSEnabled(noScriptURI, false);

  // 		 this.autoCompleter.reset();
  // 	       }
  // 	       else
  // 	       {
  // 		 Firebug.Console.log($STR("console.JSDisabledInFirefoxPrefs"), context, "info");
  // 	       }
  // 	     }
  // 	   });
  // Firebug.registerModule(Firebug.CommandLine);
}});

// Firebug.HelloWorldModel.onMyButton=function(context){
// alert("fuga");}
//http://getfirebug.com/wiki/index.php/Extension_Points#Console_Listener

//in chromebug filter helloworld file browser.xul
// Firebug.HelloWorldModel.runCoffee=function(context, command){
//   console.log(Firebug.CommandLine.acceptCompletionOrReturnIt(Firebug.currentContext));
//   var expr = Firebug.CommandLine.acceptCompletionOrReturnIt(Firebug.currentContext);
//   if (expr == "")
//     return;
// }