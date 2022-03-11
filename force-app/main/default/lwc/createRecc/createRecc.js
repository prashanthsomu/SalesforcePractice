import { LightningElement,wire,api,track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CHILD_CASE_OBJECT from '@salesforce/schema/child_case__c';
import PARENT_CASE_FIELD from '@salesforce/schema/child_case__c.Parent_Case__c'
import CHILD_CASE_NAME_FIELD from '@salesforce/schema/child_case__c.Name'
import EXPECTED_LAST_DATE from '@salesforce/schema/child_case__c.Expected_Last_Date__c'
import CASE_SEVERITY from '@salesforce/schema/child_case__c.Case_severity__c'
import DESCRIPTION from '@salesforce/schema/child_case__c.description__c'
import IMMEDIATE_ACTION from '@salesforce/schema/child_case__c.Immediate_Action_Needed__c'
import { createRecord } from 'lightning/uiRecordApi'


export default class CreateRecc extends LightningElement {

    @api recordId;
    
    caseName = "";
    lastDate = "";
    caseSeverity = "";
    description = "";
    immediateAction = "";

    onchanging(event) {
         if (event.target.name == 'childCaseName') {
             this.caseName = event.target.value;
             console.log(this.caseName);
         }
         if (event.target.name == 'expectedDate') {
             this.lastDate = event.target.value;
             console.log(this.lastDate);
         }
         if (event.target.name == 'caseSeverity') {
             this.caseSeverity = event.target.value;
             console.log(this.caseSeverity);
         }
         if (event.target.name == 'description') {
             this.description = event.target.value;
             console.log(this.description);
         }
         if (event.target.name == 'immediateAction') {
             this.immediateAction = event.target.value;
             console.log(this.immediateAction);
        }
    }

    onSubmit() {
        console.log('Create button clicked');
        const fields = {};
        fields[PARENT_CASE_FIELD.fieldApiName] = this.recordId;
        fields[CHILD_CASE_NAME_FIELD.fieldApiName] = this.caseName;
        fields[EXPECTED_LAST_DATE.fieldApiName] = this.lastDate;
        fields[CASE_SEVERITY.fieldApiName] = this.caseSeverity;
        fields[DESCRIPTION.fieldApiName] = this.description;
        fields[IMMEDIATE_ACTION.fieldApiName] = this.immediateAction;
        console.log(fields);
        const recordInput = { apiName: CHILD_CASE_OBJECT.objectApiName, fields };
        console.log(recordInput);
        createRecord(recordInput)

            .then(record => {
                            console.log(record);
                            this.dispatchEvent(
                                new ShowToastEvent({
                                    title: 'New ChildCase has been created',
                                    message: JSON.stringify(record.Id),
                                    variant: 'success',
                                }),
                            );
                        })
                        .catch(error => {
                            this.dispatchEvent(
                                new ShowToastEvent({
                                    title: 'Error while creating ChildCase',
                                    message: error.body.message,
                                    variant: 'error',
                                }),
                            );
                        });
                        
    }

}
