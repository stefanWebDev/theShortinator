"use strict";
exports.__esModule = true;
var Styling = /** @class */ (function () {
    function Styling() {
    }
    Styling.letterAnimationHeading = function () {
        var heading = $('#heading');
        var headingText = heading.text();
        var headingTextSplit = headingText.split("");
        var headingTextForRemove = headingTextSplit;
        var i = 0;
        this.removeLetterAnimationLoop(i, headingTextForRemove, heading, headingTextSplit);
    };
    Styling.removeLetterAnimationLoop = function (i, headingTextForRemove, heading, headingTextSplit) {
        var _this = this;
        if (i < 15) {
            setTimeout(function () {
                var headingTextAfterRemove = headingTextForRemove.join("");
                heading.text(headingTextAfterRemove);
                headingTextForRemove.pop();
                i++;
                _this.removeLetterAnimationLoop(i, headingTextForRemove, heading, headingTextSplit);
            }, 100);
        }
        else {
            i = 15;
            this.addLetterAnimationLoop(i, heading);
        }
    };
    Styling.addLetterAnimationLoop = function (i, heading) {
        var _this = this;
        var str = "THE SHORTINATOR";
        var headingTextSplit = str.split("");
        setTimeout(function () {
            for (var j = 1; j < i; j++) {
                headingTextSplit.pop();
            }
            var headingText = headingTextSplit.join("");
            heading.text(headingText);
            i--;
            if (i > 0) {
                _this.addLetterAnimationLoop(i, heading);
            }
        }, 100);
    };
    return Styling;
}());
exports["default"] = Styling;
