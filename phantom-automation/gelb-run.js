var system = require('system');
var core = require('./core');
var gelb = require('./gelb');

console.log('Started...');
core.maxWorkingTime( 5 * 60 * 1000 );

if( !system.env.PINT_LOGIN )
  console.error('You have to export/set PINT_LOGIN variable');

if( !system.env.PINT_PASSW )
  console.error('You have to export/set PINT_PASSW variable');

var p = null;
core.processing( 'http://gelbooru.com/index.php?page=account&s=login&code=00', { viewportSize:{ width: 1920, height: 1080 * 2} }, 
          function( page )
          { 
            p = page;
            core.makeScreenshot( p, '-before' ); 
          }, 
          { func: gelb.js_login, args: { acc: system.env.PINT_LOGIN, pass: system.env.PINT_PASSW } }, 
          function( data, opts )
          {
            core.makeScreenshot( p, '-after' );
            
            core.runSteps( 5000, 
            [
            
              function()
              {
                core.makeScreenshot( p, '-signed-in' ); 
                var url = 'http://gelbooru.com/index.php?page=post&s=add';
                console.log( 'navigating to ' + url );
                p.evaluate(function( loc ){ document.location = loc; }, url );
              },
              
              function()
              {
                console.log('uploading');
                p.uploadFile('input[name=upload]', 'screenshots/tzxc.jpg');
                p.evaluate(function( args ){
                    
                    document.getElementsByTagName('textarea')[0].value = args.tags;
                    var inputs = document.getElementsByTagName('input');
                    inputs[1].value = args.sourceurl;
                    inputs[2].value = args.title;
                    inputs[3].checked = false;
                    inputs[4].checked = false;
                    inputs[5].checked = true;
                    inputs[6].click();
                }, 
                {
                    sourceurl: 'https://anime-figures.com/blogs/news/post?472789790', 
                    title: 'mecha', 
                    tags:' 1girl blue_eyes dress solo white_dress soniani super_sonico large_breasts long_hair'
                } );
                
                core.makeScreenshot( p, '-uploading' );
              },
              
              function()
              {
                core.makeScreenshot( p, '5-uploaded' );
                console.log('Done');
                core.maxWorkingTime( 1000 );
              }

            ]);

          });
