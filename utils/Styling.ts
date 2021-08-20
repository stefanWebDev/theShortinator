class Styling{


    public static letterAnimationHeading(){
        const heading: JQuery<HTMLElement> = $('#heading')      
        const headingText: string = heading.text();
        const headingTextSplit: string[] = headingText.split("");

        let headingTextForRemove: string[] = headingTextSplit;
 
        let i = 0;
        this.removeLetterAnimationLoop(i,headingTextForRemove, heading, headingTextSplit)
        
    }

    private static removeLetterAnimationLoop(i: number, headingTextForRemove: string[], heading:JQuery<HTMLElement>, headingTextSplit: string[]) {         
       if(i < 15){
        setTimeout(() => {   
            const headingTextAfterRemove: string = headingTextForRemove.join("");
            heading.text(headingTextAfterRemove);
            headingTextForRemove.pop();
            i++;                   
 
            this.removeLetterAnimationLoop(i, headingTextForRemove, heading, headingTextSplit);            
                  
        }, 100)
       } else {
            
            i = 15;  
            this.addLetterAnimationLoop(i, heading);
       }
      }

    private static addLetterAnimationLoop(i: number, heading: JQuery<HTMLElement>){

        const str: string = "THE SHORTINATOR"
        const headingTextSplit: string[] = str.split("");

     
        setTimeout(() => {   
          
            for(let j= 1; j < i; j++){
                headingTextSplit.pop()
            }
        
            const headingText: string = headingTextSplit.join("");
            heading.text(headingText);
            i--;                           

            if (i > 0) {           
                this.addLetterAnimationLoop(i, heading);            
            }                       
        }, 100)
    }
}

export default Styling;