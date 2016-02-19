var core = require('./core');
var pika = require('./pika');

core.maxWorkingTime( 30 * 1000 );

core.processing( 'http://pikabu.ru/tag/anime%20art/hot', 'data/anime_art', core.makeScreenshot, pika.js_getPikabuImages, pika.savePicsToJson );
core.processing( 'http://pikabu.ru/tag/%D0%B0%D0%BD%D0%B8%D0%BC%D0%B5/hot', 'data/anime', core.makeScreenshot, pika.js_getPikabuImages, pika.savePicsToJson );
core.processing( 'http://pikabu.ru/tag/%D0%A0%D0%B8%D1%81%D1%83%D0%BD%D0%BE%D0%BA/hot', 'data/drawing', core.makeScreenshot, pika.js_getPikabuImages, pika.savePicsToJson );
core.processing( 'http://pikabu.ru/tag/%D0%BA%D0%BE%D1%82/hot', 'data/cat', core.makeScreenshot, pika.js_getPikabuImages, pika.savePicsToJson );
