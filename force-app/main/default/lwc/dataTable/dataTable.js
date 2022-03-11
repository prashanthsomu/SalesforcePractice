import { LightningElement, wire, api, track } from 'lwc';
import getAccountList from '@salesforce/apex/accountCustomTable.getAccountList';
// import getAccount from '@salesforce/apex/AccountDatatableCls.getAccount';
import { refreshApex } from '@salesforce/apex';
import sample from '@salesforce/messageChannel/sample__c';
import { subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext, publish, createMessageContext } from 'lightning/messageService';
// import { reduceErrors } from 'c/ldsUtils';

const columns = [
    { label: 'Account Name',  fieldName: 'Name', editable: true},
    { label: 'Phone', fieldName: 'Phone', type: 'phone' ,editable: true },
    { label: 'Type', fieldName: 'Type', type: 'picklist', editable: true },
    { label: 'Customer Priority', fieldName: 'CustomerPriority__c', type: 'picklist', editable: true },
    // { label: 'Total Revenue', fieldName: 'Total_Revenue_max__c', type: 'number', editable: true },
    { label: 'Ticker Symbol', fieldName: 'TickerSymbol', editable: true },
]

export default class DataTable extends LightningElement {
    data = [];
    columns = columns;
    selectedIds = [];
    @wire(getAccountList) accounts;
    recordId;
    @track accountList;
    
    @wire(MessageContext)
    messageContext;

    selectedRow(event) {

        const selectedRows = event.detail.selectedRows;
        console.log(selectedRows);
        this.selectedIds = [];
        if (selectedRows != null && selectedRows != '' && selectedRows != undefined )  {
              for (let index = 0; index < selectedRows.length; index++) {
            this.selectedIds.push(selectedRows[index]);
        }
        
        const rec = this.selectedIds[0];
        console.log(rec);
        publish(this.messageContext, sample, rec)
            
        }
        else {
            console.error(reduceErrors('no code'));
        }
      
        
    }

       
    subscription = null;
    
    connectedCallback() {
        this.subscribeSample()
    }

    subscribeSample() {
        this.subscription = subscribe(this.messageContext, sample, (recordInput) => {
            this.handleMessage(recordInput);
        })
    }

    unsubscribeSample() {
        unsubscribe(this.subscription);
        this.subscription = null;
        
    }

    disconnectedCallback() {
        this.unsubscribeSample();
    }

    handleMessage(recordInput) {
        refreshApex(this.accounts);
    }
}
    
    
       
    

   

   
    


    // // datatable DML task Section //

    //  handleSave(event) {
    //     console.log(event.detail.draftValues)
    //     const recInput = event.detail.draftValues.map(draft => {
    //         console.log(draft)
    //         const fields = Object.assign({}, draft)
    //         return { fields }
    //     })
    //     console.log("recordInputs", recInput);
    //     recInput.forEach(recordId => {
    //         updateRecord(recordId).then(() => {
    //             console.log(recordId.Id);
    //             this.draftValues = [];
    //              this.dispatchEvent(
    //                 new ShowToastEvent({
    //                     title: 'Account has been Updated successfully',
    //                     message: JSON.stringify(recordId.Id),
    //                     variant: 'Success',
    //                 }),
    //              );
    //              return refreshApex(this.accounts)
    //         })
    //     });
    // }

    // deleteAccount() {
    //     this.selectedId.forEach(deleteId => {
    //         deleteRecord(deleteId).then(() => {
    //             console.log(deleteId);
    //              this.dispatchEvent(
    //                 new ShowToastEvent({
    //                     title: 'Account has been Deleted successfully',
    //                     message: JSON.stringify(deleteId.Id),
    //                     variant: 'Success',
    //                 }),
    //             );
    //             return refreshApex(this.accounts)
    //         })
    //     });   
    // }



    // addAccount() {
    //     const fields = {
    //         Name: 'Dummy Account',
    //         Phone:  '8754899222',
    //         Type :  'Customer - Channel'
    //     };
    //     const recordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields };
    //     createRecord(recordInput)
    //         .then(record => {
    //             console.log(record);
    //             this.dispatchEvent(
    //                 new ShowToastEvent({
    //                     title: 'New account has been created successfully',
    //                     message: JSON.stringify(record.Id),
    //                     variant: 'success',
    //                 }),
    //             );
    //             return refreshApex(this.accounts)
    //         })
    //         .catch(error => {
    //             this.dispatchEvent(
    //                 new ShowToastEvent({
    //                     title: 'Error while creating account',
    //                     message: error.body.message,
    //                     variant: 'error',
    //                 }),
    //             );
    //         });
    // }
    

    
    
    
    
       