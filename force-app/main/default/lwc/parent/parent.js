import { LightningElement,wire  } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import getAccountList from '@salesforce/apex/AccountDatatableCls.getAccountList';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';


const columns = [
    { label: 'Account Name',  fieldName: 'Name', editable: true},
    { label: 'Phone', fieldName: 'Phone', type: 'phone' ,editable: true },
    { label: 'Type', fieldName: 'Type', type: 'picklist', editable: true },
    { label: 'Customer Priority', fieldName: 'CustomerPriority__c', type: 'picklist', editable: true },
    { label: 'Total Revenue', fieldName: 'Total_Revenue_max__c', type: 'number', editable: true },
]

export default class Parent extends LightningElement {
    columns = columns;
    @wire(getAccountList) accounts;
    recordId;
    data = [];
    addacc() {
        const fields = {
            Name: 'Dummy Account',
            Phone: '8754899222',
            Type: 'Customer - Channel'
        };
        const recordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(record => {
                console.log(record);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'New account has been created successfully',
                        message: JSON.stringify(record.Id),
                        variant: 'success',
                    }),
                );
                return refreshApex(this.accounts)
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error while creating account',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    }

    
    // 		    count = 0;
    // increaseCount() {
    //     this.count = this.count + 1;
    // }
  // 
}


