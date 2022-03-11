import { LightningElement, api, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAccountList from '@salesforce/apex/accountCustomTable.getAccountList';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import Id from '@salesforce/schema/Account.Id'
import TICKER_SYMBOL from '@salesforce/schema/Account.TickerSymbol' ;
import SLA from '@salesforce/schema/Account.SLA__c';
import SLA_SERIAL_NUMBER from '@salesforce/schema/Account.SLASerialNumber__c';
import UPSELL_OPPORTUNITY from '@salesforce/schema/Account.UpsellOpportunity__c';
import { updateRecord } from 'lightning/uiRecordApi'
import sample from '@salesforce/messageChannel/sample__c';
import { subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext ,publish,createMessageContext} from 'lightning/messageService';


export default class DataTableChild extends LightningElement {

    
    @track currentObject = { Id: '', TickerSymbol: '', sla: '', slaSerialNumber: '', UpsellOpportunity: '' };
    @wire(MessageContext)
    messageContext;

    newUpdatedFields = {};

    handleChange(event){
        const values = event.target.name;
         if (values === 'TickerSymbol') {
             this.currentObject.TickerSymbol = event.target.value;
             console.log(this.currentObject.TickerSymbol);
        } else if (values === 'SLA') {
             this.currentObject.sla = event.target.value;
             console.log(this.currentObject.sla);
        }else if (values === 'SLASerialNumber') {
             this.currentObject.slaSerialNumber = event.target.value;
             console.log(this.currentObject.slaSerialNumber);
        }else if (values === 'UpsellOpportunity') {
             this.currentObject.UpsellOpportunity = event.target.value;
             console.log(this.currentObject.UpsellOpportunity);
        }
        }
    

    updateAccount() {
       
        console.log('test1');

        this.newUpdatedFields = {...this.currentObject};
       
        const fields = {};
        fields[Id.fieldApiName] = this.newUpdatedFields.Id;
        fields[TICKER_SYMBOL.fieldApiName] =this.newUpdatedFields.TickerSymbol;
        fields[SLA.fieldApiName] =this.newUpdatedFields.sla;
        fields[SLA_SERIAL_NUMBER.fieldApiName] =this.newUpdatedFields.slaSerialNumber;
        fields[UPSELL_OPPORTUNITY.fieldApiName] =this.newUpdatedFields.UpsellOpportunity;

        console.log('value got');
        const recordInput = { fields };
        console.log(recordInput);

        updateRecord(recordInput)
            .then(() => { 
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account updated',
                        variant: 'success'
                    })
                );
                // Display fresh data in the form
                console.log('updated');
                publish(this.messageContext, sample, recordInput);
    
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }
            
       
    subscription = null;
    
    connectedCallback() {
        this.subscribeSample()
    }

    subscribeSample() {
        this.subscription = subscribe(this.messageContext, sample, (rec) => {
            this.handleMessage(rec);
        })
    }

    unsubscribeSample() {
        unsubscribe(this.subscription);
        this.subscription = null;
        
    }

    disconnectedCallback() {
        this.unsubscribeSample();
    }

    handleMessage(rec) {
        this.currentObject.TickerSymbol = rec.TickerSymbol;
        this.currentObject.sla = rec.SLA__c;
        this.currentObject.slaSerialNumber = rec.SLASerialNumber__c;
        this.currentObject.UpsellOpportunity = rec.UpsellOpportunity__c;
        this.currentObject.Id = rec.Id;
    }

}



