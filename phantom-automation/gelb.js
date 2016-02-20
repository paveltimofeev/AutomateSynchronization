function js_login( args )
{
    var inputs = document.getElementsByTagName('input');
    inputs[0].value = args.acc;
    inputs[1].value = args.pass;
    inputs[2].click();
}

exports.js_login = js_login;
