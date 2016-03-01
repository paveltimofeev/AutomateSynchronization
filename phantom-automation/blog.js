function login( args )
{
    var inputs = document.getElementsByTagName('input')
    inputs[3].value = args.acc;
    inputs[4].value = args.pass;
    inputs[5].click();
}

function createArticle( article )
{
    document.getElementById('rte-show-html').click();
    document.getElementsByClassName('btn js-show-edit-website-seo btn--link')[0].click();
    
    var inputs = document.getElementsByTagName('input');
    inputs[3].focus();
    inputs[3].value = article.title;
    inputs[5].value = article.seotitle || article.title;
    inputs[6].value = article.visible || false;
    
    var tas = document.getElementsByTagName('textarea');    
    tas[0].focus();
    tas[0].value = article.content;
    tas[1].value = article.excerpt || '';
    tas[2].value = article.metatag || article.title;
    
    var buttons = document.getElementsByTagName('button');    
    buttons[6].click();
    //inputs[14].click();
}

function clickSave()
{
    var buttons = document.getElementsByTagName('button');    
    buttons[6].click();
}

exports.js_login = login;
exports.js_createArticle = createArticle;
exports.js_clickSave = clickSave;
