// import { LightningElement } from 'lwc';
    

// export default class DevTask1 extends LightningElement {

//     clickedButtonLabel;
//     arr;
//     lengthOfWord;
//     count;
//     warning = false;
//     // output; 

//     handleClick(event) {
//         let output = {};
//          this.clickedButtonLabel = this.template.querySelector('lightning-input').value;  
//          this.arr = this.clickedButtonLabel.split(' ');
//         //  this.lengthOfWord = this.arr.count();
//         console.log(this.arr);

//         if (this.clickedButtonLabel == "") {
//             this.warning = true;
//         }
//         else {

//              for (let word of arr) {
//             if (!output[word]){
//                 output[word] = 1;
//             }
//             else {
//                 output[word]++;
//             }
//              }
//             // this.warning = false;
//             console.log('entry done');
            
//         }
       
        
//      }
    
// }


import { LightningElement } from 'lwc';

    let userInput;

    export default class extends LightningElement { 

    result;
    solution;
    errorMessage = false;
    ifAnswer = false;

    onSubmit() {

    let output = {};
    userInput = this.template.querySelector('lightning-input').value;

// check the input

    if (userInput == "") {

    this.errorMessage = true;

    this.ifAnswer = false;

    }

    else {

    this.ifAnswer = true;

    let words = userInput.split(' ');

    for (let word of words) {

        if (!output[word]) {

                output[word] = 1;

        }
         else {

            output[word]++;

        }

     }      

    this.result = output;

    console.log(this.result);

    let actualValue = JSON.stringify(this.result);

    this.solution = actualValue.toString().toUpperCase();

    this.errorMessage = false;

    }

}

}