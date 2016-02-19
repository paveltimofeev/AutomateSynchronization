var fs = require('fs');

/// postProcessing
function savePicsToJson( pics, opts )
{
  console.log( 'save pics to json' );
  
  for ( i= 0; i < pics.length; i++ ) {
    console.log( pics[i] );
  }
  
  var output = { urls:pics }
  var picsJson = JSON.stringify( output );
  fs.write( ( opts || 'data') + '.json', picsJson );
}

/// postProcessing
function save(data)
{
  fs.write( 'pic_' + (Math.random() * 100) + '.jpg', data);
}

/// jsEvaluating
function js_getPikabuImages()
{
    var imgs = document.querySelectorAll('div.b-story__content_type_media img');
    
    var pics = [];
    forEach(imgs, function(img){
      pics.push( img.src );
    });
    
    return pics;
}

/// jsEvaluating
function js_download()
{
  var out;
  $.ajax({
      'async' : false,
      'url' : url,
      'success' : function(data, status, xhr) { out = data; }
  });
  
  return out;
}


exports.savePicsToJson = savePicsToJson;
exports.save = save;
exports.js_getPikabuImages = js_getPikabuImages;
exports.js_download = js_download;
 