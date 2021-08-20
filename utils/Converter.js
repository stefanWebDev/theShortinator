"use strict";
exports.__esModule = true;
var Converter = /** @class */ (function () {
    function Converter() {
    }
    Converter.longToShortConversion = function (url) {
        // const longexample = 'https://indepth.dev/posts/1300/double-question-marks-typescript-3-7-nullish-coalescing';
        var baseURL = 'shrnt.bit.sdf';
        var newURLEnding = ""; //rename with fachname
        var weight = 1;
        for (var i = 1; i < 9; i++) {
            newURLEnding += url[Math.floor((url.length - 1) * weight)];
            weight -= 0.1;
        }
        var newURL = baseURL + newURLEnding;
        return newURL;
    };
    Converter.removeSpecialCharsFromShortUrl = function (shortUrl) {
        shortUrl = shortUrl.replace(/\//g, "_");
        shortUrl = shortUrl.replace(/\?/g, "_");
        return shortUrl;
    };
    return Converter;
}());
exports["default"] = Converter;
