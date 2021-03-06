function Auth()
{
  console.log('Auth');
  
  PDK.login({ scope: 'read_public, write_public'}, function (response) {
  
    if (!response || response.error) {
      console.log( resp.error || 'Error occurred' );
    }
  
    console.log(response);
  });
}


function GetBoardsList()
{
  console.log('GetBoardsList');
  
  PDK.me('boards', function (response) { 
    if (!response || response.error) {
      console.log( resp.error || 'Error occurred' );
    } else {
    
      console.log('Ok');
      console.log( response.data );
    }
    });
}


function GetBoard( board, isRequrvise, callback )
{
  console.log('GetBoard');
  
  var pins = [];
  var params = { 
  fields: 
  'note,link,original_link,image,counts,board,created_at,media' 
  };
  var uri = '/boards/'+board+'/pins/';
  
  PDK.request( uri, params, function( resp ) { 
    
    if ( !resp || resp.error ) 
      console.log( resp.error || 'Error occurred' );
    else 
    {
      console.log( resp.data || 'Ok' );
      pins = pins.concat(resp.data);
      
      if (isRequrvise && resp.hasNext) { 
        resp.next(); 
      }
      else if( !isRequrvise || !resp.hasNext ) {
        
        console.log( 'got ' + pins.length );
        if( callback )
            callback( resp.error, pins );
      }
    }
  });
}


function GetLatestPin( board, callback )
{
  console.log('GetLatestPin');
    
  GetBoard( board, false, function(err,data){
    
    var pin = (data && data.length > 0) ? data[0] : null;
    
    console.log( err || pin );
    
    if(callback)
      callback(err, pin);
  });
}


function MoveLatestPin( fromBoard, toBoard ){
  
  console.log('MoveLatestPin');
  
  GetLatestPin( fromBoard, function( err, pin ){
    
    console.log( err || pin );
    uri = '/v1/pins/'+pin.id+'/';
    params = {                  
              pin: pin.id,
              board: toBoard,
              link:'https://anime-figures.com'
            };
    
    PDK.request( uri, 'patch', params, function( resp ) { 
    
      if ( !resp || resp.error ) 
        console.log( resp.error || 'Error occurred' );
      else 
        console.log( resp.data || 'Ok' );
      
    });
  });
}
