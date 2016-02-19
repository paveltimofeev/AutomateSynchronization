var system = require('system');
var core = require('./core');

core.maxWorkingTime( 60 * 1000 );

if( !system.env.LOGIN )
  console.error('You have to export/set LOGIN variable');

if( !system.env.PASSW )
  console.error('You have to export/set PASSW variable');

var p = null;
core.processing( 'https://accounts.unity3d.com/sign-in', { viewportSize:{ width: 800, height: 600} }, 
          function( page )
          { 
            p = page;
            core.makeScreenshot( p, '-before' ); 
          }, 
          {func: function( args )
          {
            document.getElementById('user_email').value = args.login;
            document.getElementById('user_password').value = args.passw;
            document.forms[0].submit();
          }, args: { login:system.env.LOGIN, passw:system.env.PASSW }}, 
          function( data, opts )
          {
            core.makeScreenshot( p, 'after' ); 
            
            setTimeout(function()
            {
              core.makeScreenshot( p, 'signed-in' ); 
              p.evaluate(function(){ document.location = "http://forum.unity3d.com"; });
            }, 15000);
            
            setTimeout(function()
            {
              //p.sendEvent('click', 1333, 44); for 1600x900 only
              core.makeScreenshot( p, 'checked-login' ); 
              
              phantom.exit();
              
            }, 30000); 
          });
