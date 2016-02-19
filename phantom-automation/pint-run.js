var system = require('system');
var core = require('./core');
var pint = require('./pint');

console.log('Started...');

core.maxWorkingTime( 5 * 60 * 1000 );

if( !system.env.PINT_LOGIN )
  console.error('You have to export/set PINT_LOGIN variable');

if( !system.env.PINT_PASSW )
  console.error('You have to export/set PINT_PASSW variable');

function getRundomUrl()
{
    var targets = 
    [
    //'https://ru.pinterest.com',
    'https://ru.pinterest.com/search/pins/?q=anime&rs=typed&0=anime|typed',
    'https://ru.pinterest.com/search/pins/?q=anime%20figurine&rs=typed&0=anime|typed&1=figurine|typed',
    'https://ru.pinterest.com/search/pins/?q=figma&rs=typed&0=figma|typed',
    'https://ru.pinterest.com/search/pins/?q=vocaloid&rs=typed&0=vocaloid|typed',
    'https://ru.pinterest.com/search/pins/?q=sonico&rs=typed&0=sonico%7Ctyped',
    'https://ru.pinterest.com/search/pins/?q=animu&rs=typed&0=animu%7Ctyped',
    'https://ru.pinterest.com/search/pins/?q=manga&rs=typed&0=manga%7Ctyped',
    'https://ru.pinterest.com/search/pins/?q=attack%20on%20titan&rs=remove&0=attack%20on%20titan%7Cguide%7Cword%7C9&remove_refine=animu%7Ctyped',
    'https://ru.pinterest.com/search/pins/?q=cosplay&rs=typed&0=cosplay%7Ctyped&remove_refine=sonico%7Ctyped'
    ];
    
    return targets[parseInt(Math.random() * targets.length)];
}

function totalIncrement( incr )
{
  total += incr;
  console.log( 'liked: ' + total + ' (+' + incr + ')' );
}

var total = 0;
var p = null;
core.processing( 'https://ru.pinterest.com/login', { viewportSize:{ width: 1920, height: 1080 * 2} }, 
          function( page )
          { 
            p = page;
            core.makeScreenshot( p, '-before' ); 
          }, 
          { func: pint.js_login, args: { acc: system.env.PINT_LOGIN, pass: system.env.PINT_PASSW } }, 
          function( data, opts )
          {
            core.makeScreenshot( p, '-after' );
            
            core.runSteps( 5000, 
            [
            
              function()
              {
                core.makeScreenshot( p, '3-signed-in' ); 
                var urlForLikes = getRundomUrl();
                console.log( 'navigating to ' + urlForLikes );
                p.evaluate(function( loc ){ document.location = loc; }, urlForLikes );
              },
              
              
              function()
              {
                core.makeScreenshot( p, '4-navigated' );
                
                var liked = p.evaluate( pint.js_likeall );
                totalIncrement( liked );
                p.scrollPosition = { top: 1080 * 2, left: 0 };
              },
              
              
              function()
              {
                if( total != 0 )
                {
                  var liked = p.evaluate( pint.js_likeall );
                  totalIncrement( liked );
                  p.scrollPosition = { top: 1080 * 3, left: 0 };
                }
                else
                {
                  var urlForLikes = getRundomUrl();
                  console.log( 'nothing was liked, navigating to ' + urlForLikes );
                  p.evaluate(function( loc ){ document.location = loc; }, urlForLikes );
                }
              },
              
              
              function()
              {
                var liked = p.evaluate( pint.js_likeall );
                totalIncrement( liked );
              },
              
              
              function()
              {
                console.log('saving log data' );
                
                var head = { "index":{ "_index":"pint", "_type":"likes" }};
                var data = { datetime: new Date() , added:total };
                var fs = require('fs');
                fs.write( './data/pin-log.elastic', JSON.stringify( head ) + '\n', 'a');
                fs.write( './data/pin-log.elastic', JSON.stringify( data ) + '\r\n', 'a');
              },  
              
              
              function()
              {
                core.makeScreenshot( p, '5-done' );
                console.log('Done');
                core.maxWorkingTime( 1000 );
              }

            ]);

          });
