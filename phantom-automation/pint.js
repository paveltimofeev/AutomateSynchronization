function js_login( args )
{
    document.getElementsByClassName('loginUsername')[0].getElementsByTagName('input')[0].value = args.acc;
    document.getElementsByClassName('loginPassword')[0].getElementsByTagName('input')[0].value = args.pass;
    document.getElementsByClassName('formFooterButtons')[0].getElementsByTagName('button')[0].click();
}

function js_likeall()
{
    var counter = 0;
    var MAX_LIKES_PER_SESSION = 250;
    var likes = document.getElementsByClassName( 'likeEditButtonWrapper' );
    
    function js_util_notLikedYet( el )
    {
        return el.getElementsByClassName( 'unlike' ).length == 0;
    }
    
    function getTextContent( pin, className )
    {
      var found = pin.getElementsByClassName( className )
      return found && found.length > 0 ? found[0].textContent.trim() : '';
    }

    function textIsLegal( txt )
    {
       txt = txt.toLowerCase();
       return    txt.indexOf( 'hentai' ) == -1
              && txt.indexOf( 'tits' ) == -1
              && txt.indexOf( 'xxx' ) == -1
              && txt.indexOf( 'ecchi' ) == -1
              && txt.indexOf( 'nude' ) == -1
              && txt.indexOf( 'uncensored' ) == -1
              && txt.indexOf( 'Дквочки' ) == -1
              && txt.indexOf( 'Asian' ) == -1
              && txt.indexOf( 'women' ) == -1
              && txt.indexOf( 'body' ) == -1
              && txt.indexOf( 'Jhon Padilla' ) == -1
              && txt.indexOf( 'Play Boy' ) == -1
              ;
    }
    
    function pinIsLegal( pin )
    {
      // get pin info
      var descr = getTextContent( pin, 'pinDescription' );
      var owner = getTextContent( pin, 'creditName' );
      var board = getTextContent( pin, 'creditTitle' );

      return textIsLegal(descr) && textIsLegal(owner) && textIsLegal(board);
    }
    
    function isBlocked()
    {
      var f = document.getElementsByClassName("ConfirmDialog")[0];
      if( f ){

        var t = f.getElementsByTagName("h1")[0];
        if(t && t.textContent && t.textContent.indexOf("Ой!") >= 0)
          return true;
      }
      
      return false;
    }
    
    for( i=0; i < likes.length && i < MAX_LIKES_PER_SESSION ; i++ )
    {
        var like = likes[i];
        if( js_util_notLikedYet( likes[i] ) )
        {
            var pin = like.parentNode.parentNode;
            
            // if pin info is legal, click it
            if( pinIsLegal( pin ) & !isBlocked() )
            {
              likes[ i ]
                      .getElementsByTagName( 'button' )
                      [0]
                      .click();
                      
              counter++;
            }
        }
    }
    
    return counter;
}

exports.js_login = js_login;
exports.js_likeall = js_likeall;
