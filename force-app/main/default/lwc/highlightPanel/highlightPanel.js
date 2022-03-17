import { LightningElement, api, wire, track } from 'lwc';
// import fetchCase from '@salesforce/apex/caseClass.fetchCase';
import cloneCase from '@salesforce/apex/caseClass.cloneCase';
import cloneCaseRecord from '@salesforce/apex/caseClass.cloneCaseRecord';

import { getRecord, getFieldValue, deleteRecord} from 'lightning/uiRecordApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

import { loadStyle } from 'lightning/platformResourceLoader';
import STYLE_CSS from '@salesforce/resourceUrl/stylepanel';

import CASE from '@salesforce/schema/Case';
import PARENT_ACCOUNT from '@salesforce/schema/Case.Account.Name';
import PARENT_CONTACT from '@salesforce/schema/Case.Contact.Name';
import PRIORITY from '@salesforce/schema/Case.Priority'; 
import CASE_NUMBER from '@salesforce/schema/Case.CaseNumber'; 
import STATUS from '@salesforce/schema/Case.Status'; 

export default class HighlightPanel extends NavigationMixin(LightningElement) {

    // to import css sheet
     renderedCallback() {
        Promise.all([loadStyle(this, STYLE_CSS)]);
    }

    // variable and other declarations 
    @track triggerDeleteModal = false;
    @track triggerCloneModal = false;

    @api recordId;
    @api objectApiName;
    @track recordTypeId;
    @track error;
    caseRecord;

    temparr = [];
    recArr = [];
    fieldSetArr = [];
    ownerName;
    fieldSetKey = [];
    creatObjKey = [];
    dummyCloneObject = {};
    cloneObjDummy = {};
    @api objectFieldsArr = [];
    objectFields = {};
    recDataKey = [];
    cDataKey = [];
    cData;
    
    
    // fetches a case record from Apex static query
    // @wire (fetchCase,{recordId : '$recordId'})
    // fetchedCase({error, data}){
    //     if (data) {
    //         this.recData = data;
    //         this.recDataKey = Object.keys(data);
    //         this.caseRecord = JSON.stringify(data);
    //         console.log(this.caseRecord);
    //         console.log('olddata',data);
    //     }
        
    // }

    // fetch recod using dynamic query and fieldsets
    
    @wire(cloneCase, { recordId: '$recordId' })
    cloneCase({error, data}){
        if (data) {
            this.cData = data;
            this.cDataKey = Object.keys(data);
            console.log('clonedcase',data);
        }
    }



    // to get owner name
    @wire(getRecord, { recordId: '$recordId', fields: ['Case.Owner.Name'] })
    caseowner({ error, data }) {
        if (data) {
            console.log('version count ---> 34');
            console.log('Case Owner data', data);
            this.temparr = JSON.stringify(data);
            this.ownerName = JSON.parse(this.temparr)['fields']['Owner'].displayValue;
        }
        if (error) {
            console.log(error);
        }
    }


    // to get record for highlight panel
    @wire(getRecord, { recordId: '$recordId', fields: [PARENT_ACCOUNT, PARENT_CONTACT, PRIORITY, CASE_NUMBER, STATUS] })
    cases;

 
    // to inject fieldvalues in html
    get priority() {
        return getFieldValue(this.cases.data, PRIORITY);
    }

    get status() {
        return getFieldValue(this.cases.data, STATUS);
    }

    get caseNumber(){
        return getFieldValue(this.cases.data, CASE_NUMBER);
    }
    
    get parentAccount() {
        return getFieldValue(this.cases.data, PARENT_ACCOUNT);
    }

    get parentContact() {
        return getFieldValue(this.cases.data, PARENT_CONTACT);
    }
    
    
    
    //Delete Events ---------------->
    closeDeleteModal() {
        console.log('close delete modal triggered');
        this.triggerDeleteModal = false;
    }
    
    onDelete() {
        console.log('delete modal triggered');
         this.triggerDeleteModal = true;
    }

    deleteRecord() {
        deleteRecord(this.recordId)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Case "'+ this.recordId + '" was deleted' ,
                        variant: 'success'
                    })
                );
                
                this[NavigationMixin.Navigate]({
                    type: 'standard__objectPage',
                    attributes: {
                        objectApiName: 'Case',
                        actionName: 'home',
                    },
                });
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error deleting record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }


    //edit case modal ------------------>
     onEdit() {
        console.log('Edit modal triggered');
        
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Case', 
                actionName: 'edit'
            }
        });
     }
    


    //clone modal trigger
    onClone() {
        console.log('clone modal triggered');
        this.triggerCloneModal = true;
    }

    closeCloneModal() {
        console.log('clone modal closed');
        this.triggerCloneModal = false;
        this.dummyCloneObject = {};
        allobj = {};   
    }

    cloneChangeHandler(event) { //when changing field value in form to clone with different values from current rec
        let name = event.target.name;
        let value = event.target.value;
        Object.assign(this.dummyCloneObject, { [`${name}`]: value });
        console.log(this.dummyCloneObject); 
        
        // let casess = { 'sobjectType': 'Case' };
        // let key = [`${name}`];
        // casess[key] = value;
        // console.log('cases',casess);
    }

    cloneSuccess() {  
        const allobj = Object.assign({}, this.cData, this.dummyCloneObject);
        delete allobj.Id;
        allobj.sobjectType = 'Case'; 
        console.log('allob', allobj);

        // let cases = { 'sobjectType': 'Case' };
        // cases.Type = 'Mechanical';
        // cases.Case_reason__c = 'reason 2';
        // cases.Origin = 'Web';
        // cases.Status = 'New'
        // console.log('cases', cases);
        
        cloneCaseRecord({ clonecase: allobj }) //apex class to clone record
        .then(result => {
               console.log(result);
               this.dispatchEvent(new ShowToastEvent({
                   title: 'Success',
                   message: 'Case was created' ,
                   variant: 'success'
               }));
        })
        .catch(error => {
            console.log(error);
            this.error = error;
        });
        this.dummyCloneObject = {};
        allobj = {};

        // cloneCaseRecord({clonecase: cases})
        // .then(result => {
        //     this.recordId = result;
        //     console.log(result);
        // })
        // .catch(error => {
        //     console.log(error);
        //     this.error = error;
        // });


        
    }


    SaveCloneModal() {

        const allobj = Object.assign({}, this.recData, this.dummyCloneObject);
        delete allobj.Id;
        console.log('allob', allobj);
        cloneCaseRecord({ clonecase: allobj }) //apex class to clone record
           .then(result => {
               console.log(result);
               this.dispatchEvent(new ShowToastEvent({
                   title: 'Success',
                   message: 'Case was created' ,
                   variant: 'success'
               }));

                this.triggerCloneModal = false;

                this[NavigationMixin.Navigate]({
                    type: 'standard__objectPage',
                    attributes: {
                    objectApiName: 'Case',
                    actionName: 'new'                
                    },
                });
        })
        .catch(error => {
            console.log(error);
            this.error = error;
        });
          this.dummyCloneObject = {};
          allobj = {};
        
        
    }
   

    // to get checkbox option in footer in edit modal
    get options() {
        return [
            { label: 'Send notification email to contact', value: 'email' }
            
        ];
    }

    value = []; // checkbox value true or not

// checkbox selection event change
    checkboxSelection(event) {

        if (this.value.length = 0) {
            this.value = event.detail.value;
        }

        else if (this.value.length > 0) {
            this.value = [];
            console.log(this.value);
        }

    }

}


  
       
   

    // to get recordType id 
    // @wire(getObjectInfo, { objectApiName: CASE })
    // getObjectInfos({ error, data }) {
        
    //     if(data){
    //         console.log('objinfo',data);
    //         console.log('Default Record Type Id' + data.defaultRecordTypeId);
    //         console.log('recordtype info' + data.recordTypeInfos);
    //         this.recArr = JSON.stringify(data.recordTypeInfos);
    //         this.recordTypeId = data.defaultRecordTypeId;
    //         console.log(this.recArr);
    //         this.objectFields = data.fields;
    //         this.objectFieldsArr = Object.keys(data.fields);
    //         console.log('objFields',this.objectFieldsArr);
    //     }
    //     else if (error) {
    //         this.error = error;
    //     }
    // }


    //        @wire(fields, { Fields:'$objectFieldsArr' , recordId: '$recordId' })
    // fieldsList({ error, data }) {
    //     if (data) {
    //         console.log('listfromcls', data);
    //     }
    //     if (error) {
    //         console.error(error);
    //     }
    //        }
    

    // @wire(getCaseFields)
    // fieldsList({ error, data }) {
    //     if (data) {
    //         console.log('listfromcls', data);
    //     }
    //     if (error) {
    //         console.error(error);
    //     }
    // }

 



    // wiring fieldlist values for edit only
    // @wire(fieldSetList,{recordId : '$recordId'})
    // fieldSetList({ error, data }) {
    //     if (data) {
    //         console.log('fieldSetList', data);
    //         // this.fieldSetArr = data;
    //         console.log('fieldset array',this.fieldSetArr);
    //         this.fieldSetKey = Object.keys(this.fieldSetArr[0]);
    //         this.tempKeyFields.push(this.fieldSetKey);
    //         console.log('field set key',this.fieldSetKey);
            
    //     }
    //     else if (error) {
    //         console.log(error);
    //     }
    // }


    // @wire(getFields, { selectedObject: '$objectApiName' })
    // fieldslist({ error, data }) {
    //     if (data) {
    //         console.log(data);
    //         console.log('today', data);
    //         this.fieldSetArr = data;
    //     }
    //     if (error) {
    //         console.error(error.body.message);
    //     }
    // }


