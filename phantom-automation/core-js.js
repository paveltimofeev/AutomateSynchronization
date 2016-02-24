function info() {
   console.clear();
   var inputs = document.getElementsByTagName( 'input' );
   var textareas = document.getElementsByTagName( 'textarea' );
   for( i=0; i < inputs.length; i++) {
    console.log( inputs[i].id + ' ' + inputs[i].name + ' ' + inputs[i].className );
   }
   for( i=0; i < textareas.length; i++) {
    console.log( textareas[i].id + ' ' + textareas[i].name + ' ' + textareas[i].className );
   }
}
//info();

function getEl( name, prop ){
  
   var inputs = document.getElementsByTagName( 'input' );
   var textareas = document.getElementsByTagName( 'textarea' );
   
   function find(p) {
     
     for( i=0; i < inputs.length; i++) {
       
       if(inputs[i][p] === name )
         return inputs[i];
     }
     
     for( i=0; i < textareas.length; i++) {
       
       if(textareas[i][p] === name )
         return textareas[i];
     }
   }
   
   return inputs[name] || find( prop || 'id' ) || find( 'name' ) 
       || find( 'className' ) || null;
}

function setValue( name, val )
{  
  var el = getEl( name );
  if(el)
    el.value = val;
}

setValue( 'article-title', 'test' );
setValue( 'seo-title-tag', 'seo title' );
var con = getEl( 'article-content' );
getEl( 'ispublished-visible' )
getEl( 'article-upload-image' )


function clickOnButton( name )
{
    var buttons = document.getElementsByTagName( 'button' );
    for( i=0;i<buttons.length;i++)
    {
     if(buttons[i].textContent == name)
     {
         buttons[i].click();
         return;
     }
    }
}

function get( name )
{
    return document.getElementById( name ) || 
           document.getElementsByClassName( name )[0] || 
           document.getElementsByName( name )[0] || 
           document.getElementsByTagName( name )[0];
}

get( 'article-title' )
get( 'seo-title-tag' )
get( 'ispublished-visible' )
get( 'zxc' )
