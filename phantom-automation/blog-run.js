var system = require('system');
var core = require('./core');
var blog = require('./blog');

console.log('Started...');
core.maxWorkingTime( 5 * 60 * 1000 );

if( !system.env.BLOG_LOGIN )
  console.error('You have to export/set BLOG_LOGIN variable');

if( !system.env.BLOG_PASSW )
  console.error('You have to export/set BLOG_PASSW variable');

var p = null;
core.processing( 'https://animefigurines.myshopify.com/admin/articles/new', { viewportSize:{ width: 800, height: 600} }, 
          function( page )
          { 
            p = page;
            core.makeScreenshot( p, '-before' ); 
          }, 
          { func: blog.js_login, args: { acc: system.env.BLOG_LOGIN, pass: system.env.BLOG_PASSW } }, 
          function( data, opts )
          {
            core.runSteps( 5000, 
            [
              
              function()
              {
                core.makeScreenshot( p, '-creating-article' );
                
                p.sendEvent('click', 350, 135);
                var result = p.evaluate( 
                    blog.js_createArticle, {
                        title : 'test_title',
                        content : 'test_content',
                        excerpt : 'test_excert',
                        seotitle : 'test_seo_title',
                        metatag : 'test_meta',
                        visible : false
                    });
                
                p.sendEvent('click', 450, 300);
                core.makeScreenshot( p, '-entered-values' );
              },
              
              function()
              {
                  p.evaluate( blog.js_clickSave, null );
                  core.makeScreenshot( p, '-clicked' );
              },
              
              
              function()
              {
                core.makeScreenshot( p, '5-done' );
                console.log('Done');
                core.maxWorkingTime( 1000 );
              }

            ]);

          });

          