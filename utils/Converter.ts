class Converter {



    public static longToShortConversion(url: string): string{
        // const longexample = 'https://indepth.dev/posts/1300/double-question-marks-typescript-3-7-nullish-coalescing';
         const baseURL: string = 'shrnt.bit.sdf';
         let newURLEnding: string = ""; //rename with fachname
 
         let weight: number = 1;
 
         for (let i = 1; i < 9; i++) {
             newURLEnding += url[Math.floor((url.length-1)*weight)];
             weight -= 0.1
           }
         
         const newURL: string = baseURL+ newURLEnding;
         return newURL;
     }

    public static removeSpecialCharsFromShortUrl(shortUrl: string): string{
      shortUrl = shortUrl.replace(/\//g, "_");
      shortUrl = shortUrl.replace(/\?/g, "_");
      return shortUrl;
    }

}

export default Converter;