import { LightningElement, wire, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import fieldDetails from '@salesforce/apex/customMetaData.fieldDetails'

export default class CustomMetaData extends NavigationMixin(LightningElement) {

    @track fields;
    @api objectName = 'Account';
    @api buttonlabel = 'Create Account';

    @wire(fieldDetails, { objectApiName: '$objectName' })
    fieldDetails({ error, data }) {
        if (data) {
            console.log(data);
            this.fields = data;
        }
        if (error) {
            console.error(error.body.message);
        }
    }

    saverecord(event) {
        console.log('button clicked');
    }
}