import { LightningElement, api, track, wire } from 'lwc';
import showLead from '@salesforce/apex/ApiPractice.showLead';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class ApiPractice extends LightningElement {


    createLead() {
        console.log('clicked');
        showLead() 
            .then(result => {
                console.log(result);
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success',
                    message: 'Lead created',
                    variant: 'success'
                }));
            })
            .catch(error => {
                console.log(error);
            });
    }

}