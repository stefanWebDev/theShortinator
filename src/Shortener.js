"use strict";
exports.__esModule = true;
var $ = require("jquery");
var Styling_1 = require("../utils/Styling");
var mongoose = require('mongoose');
var Shortener = /** @class */ (function () {
    function Shortener() {
        this.inputFields = [];
        this.submitButtons = [];
        this.init();
    }
    Shortener.prototype.init = function () {
        var mainDiv = document.getElementById('main');
        this.getUberDiv("long to short").appendTo(mainDiv);
        this.getUberDiv("short to long").appendTo(mainDiv);
        this.setPlusIcon();
        //this.getUberDiv("keyword search").appendTo(mainDiv);
        // this.getConvertButton().appendTo(mainDiv);
    };
    Shortener.prototype.setForm = function (action) {
        var form;
        if (action === "long to short") {
            form = $('<form class="my-form" id="post-form" action="/" method="POST"></form>');
        }
        else {
            form = $("<form class=\"my-form\" id=\"read-form\" action=\"/\" method=\"GET\"></form>");
        }
        return form;
    };
    Shortener.prototype.getUberDiv = function (label) {
        var uberDiv = $('<div class="uber-div"></div>');
        // const subDivLeft: JQuery<HTMLElement> = $('<div class="sub-div-left"></div>');
        var subDivRight = $('<div class="sub-div-right"></div>');
        var form = this.setForm(label);
        // const returnValueDiv: JQuery<HTMLElement> = $('<div class="return-div"></div>');
        var input = $('<input name="url" class="data-input">');
        var inputName = $("<h3 class=\"form-headings\">" + label + "</h3>");
        var button;
        if (label === "long to short") {
            button = this.getPostButton();
        }
        else {
            button = this.getReadButton(form);
        }
        this.inputFields.push(input);
        this.submitButtons.push(button);
        inputName.appendTo(form);
        input.appendTo(form);
        button.appendTo(form);
        form.appendTo(subDivRight);
        // returnValueDiv.appendTo(subDivRight);
        // subDivLeft.appendTo(uberDiv);
        subDivRight.appendTo(uberDiv);
        return uberDiv;
    };
    Shortener.prototype.getPostButton = function () {
        var _this = this;
        var button = $('<button type="submit">go</button>');
        button.click(function () {
            _this.handleClickPostButton();
        });
        return button;
    };
    Shortener.prototype.handleClickPostButton = function () {
        var inputFields = document.getElementsByClassName('data-input');
        var inputURL = String($(inputFields[0]).val());
        var urlIsValid = this.isValidUrl(inputURL);
        if (!urlIsValid) {
            alert("url is not valid");
            $("#post-form").submit(function () { return false; });
        }
        location.reload();
    };
    Shortener.prototype.getReadButton = function (form) {
        var _this = this;
        var button = $('<button type="submit">go</button>');
        button.click(function () {
            var inputVal = String(_this.inputFields[1].val());
            _this.handleClickReadButton(inputVal);
            form.attr('action', inputVal);
        });
        return button;
    };
    Shortener.prototype.handleClickReadButton = function (shortUrl) {
    };
    Shortener.prototype.shortToLongConversion = function () {
    };
    Shortener.prototype.keywordSearch = function () {
    };
    Shortener.prototype.isValidUrl = function (string) {
        var url;
        try {
            url = new URL(string);
        }
        catch (_) {
            return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    };
    Shortener.prototype.setPlusIcon = function () {
        var plusIcon = $('#svg-icon');
        plusIcon.click(function () {
            $("#instructions-par").toggle();
        });
    };
    return Shortener;
}());
function init() {
    new Shortener;
    Styling_1["default"].letterAnimationHeading();
    var heading = $('#heading');
}
init();
