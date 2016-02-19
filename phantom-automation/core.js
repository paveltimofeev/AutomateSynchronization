/// utility
function urlToPath( url, ext )
{
  return (url.replace('https://','')
             .replace('http://','')
             .replace('?','_')
             .replace('&','-')) 
             + ( ext || '/' );
}

function runSteps( delay, funcs )
{
  for( i=0 ; i<funcs.length; i++ ) {
     setTimeout( funcs[i], delay * (i+1) );
  }
}

function processing( url, opts, preProcessing, jsEvaluating, postProcessing ) {

  var page = require('webpage').create();
  page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:43.0) Gecko/20100101 Firefox/43.0';
  page.viewportSize = (opts && opts.viewportSize || { width: 1600, height: 900});
  
  console.log( 'page created' );
  
  page.open( url, function( status ){ 
    
        console.log( 'url opened' );
        if (status === 'fail') 
        {
            console.log( 'status fail' );
        }
        else 
        {
          console.log( 'status ' + status );
          
          if(preProcessing != null)
          {
            console.log( 'pre processing' );
            preProcessing( page );
          }
          
          if(jsEvaluating != null)
          {
            console.log( 'function evaluating' );
            //var data = page.evaluate( jsEvaluating );
            var data = page.evaluate( jsEvaluating.func || jsEvaluating, jsEvaluating.args );
          }
          
          if(postProcessing != null)
          {
            console.log( 'data returning' );
            postProcessing( data, opts );
          }
          
          console.log( 'done' );
        }
    }); 
}

/// preProcessing
function makeScreenshot( page, name )
{
  console.log( 'make screenshot ' + ( name || '' ) );
  page.render('screenshots/'+ urlToPath( page.url + ( name || '' ), '.png') );
}

function maxWorkingTime( milliseconds )
{
  setTimeout(
    function()
    {
      phantom.exit();
    }, 
    milliseconds);  
}

exports.processing = processing;
exports.urlToPath = urlToPath;
exports.makeScreenshot = makeScreenshot;
exports.maxWorkingTime = maxWorkingTime;
exports.runSteps = runSteps;
