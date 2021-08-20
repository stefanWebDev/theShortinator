import $ = require("jquery");
import Converter from "../utils/Converter";
import Styling from  "../utils/Styling";
const mongoose = require('mongoose');


class Shortener {

    private inputFields: JQuery<HTMLElement>[] = [];
    private submitButtons: JQuery<HTMLElement>[] = [];

    constructor(){
        this.init();


    }

    private init(){
        const mainDiv: any= document.getElementById('main');

       
        this.getUberDiv("long to short").appendTo(mainDiv);
        this.getUberDiv("short to long").appendTo(mainDiv);
        this.setPlusIcon()
        //this.getUberDiv("keyword search").appendTo(mainDiv);
       // this.getConvertButton().appendTo(mainDiv);

  

    }

    private setForm(action: "long to short" | "short to long" | "keyword search"){
        let form: JQuery<HTMLElement>;
        if(action === "long to short"){
           form = $('<form class="my-form" id="post-form" action="/" method="POST"></form>')
        } else {
            form = $(`<form class="my-form" id="read-form" action="/" method="GET"></form>`)
        }    
        return form;
    }

    private getUberDiv(label: "long to short" | "short to long" | "keyword search"): JQuery<HTMLElement>{

        const uberDiv: JQuery<HTMLElement> = $('<div class="uber-div"></div>');
        // const subDivLeft: JQuery<HTMLElement> = $('<div class="sub-div-left"></div>');
        const subDivRight: JQuery<HTMLElement> = $('<div class="sub-div-right"></div>');
        const form: JQuery<HTMLElement> = this.setForm(label);
        // const returnValueDiv: JQuery<HTMLElement> = $('<div class="return-div"></div>');
        const input: JQuery<HTMLElement> = $('<input name="url" class="data-input">');
        const inputName: JQuery<HTMLElement> = $(`<h3 class="form-headings">${label}</h3>`); 
        let button: JQuery<HTMLElement>;
        if(label === "long to short"){
            button = this.getPostButton();  
        } else {
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
    }

    private getPostButton(){
        const button: JQuery<HTMLElement> = $('<button type="submit">go</button>');
        button.click(() => {
            this.handleClickPostButton();
           
        })

        return button;
    }

    private handleClickPostButton(){
        const inputFields: any = document.getElementsByClassName('data-input');
        const inputURL: string = String($(inputFields[0]).val());

        const urlIsValid: boolean = this.isValidUrl(inputURL);
        if(!urlIsValid) {       
            alert("url is not valid");
            $("#post-form").submit(() => { return false; });}
            location.reload();  
    }

    private getReadButton(form: JQuery<HTMLElement>){
        const button: JQuery<HTMLElement> = $('<button type="submit">go</button>');
        button.click(() => {
            const inputVal: string = String(this.inputFields[1].val());
            this.handleClickReadButton(inputVal);
            form.attr('action', inputVal);
        })

        return button;
    }

    private handleClickReadButton(shortUrl: string) {      
    }



    private shortToLongConversion(){

    }

    private keywordSearch(){

    }

      private isValidUrl(string: string) {
            let url;
            
            try {
              url = new URL(string);
            } catch (_) {
              return false;  
            }
          
            return url.protocol === "http:" || url.protocol === "https:";
          }
    private setPlusIcon(){
        const plusIcon: JQuery<HTMLElement> = $('#svg-icon');
        plusIcon.click(() => {
            $("#instructions-par").toggle();
        })
    }

}

function init(){
    new Shortener;
    Styling.letterAnimationHeading();
    const heading: JQuery<HTMLElement> = $('#heading')

}

init();