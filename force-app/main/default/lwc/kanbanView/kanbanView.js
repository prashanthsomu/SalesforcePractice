import { LightningElement, api, track, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import { updateRecord } from 'lightning/uiRecordApi';
import {getPicklistValues, getObjectInfo} from 'lightning/uiObjectInfoApi'
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity'
import STAGE_FIELD from '@salesforce/schema/Opportunity.StageName'
import OPPORTUNITY_ID from '@salesforce/schema/opportunity.Id'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class KanbanView extends LightningElement {

    records;
    pickVals;
    recordId;

    @wire(getListUi, { objectApiName: OPPORTUNITY_OBJECT, listViewApiName: 'AllOpportunities' })
    wiredListView({ error, data }) {
        if (data) {
            this.records = data.records.records.map(items => { 
            let field = items.fields
            let account = field.Account.value.fields
            return {'Id' : field.Id.value, 'Name': field.Name.value, 'AccountId' : account.Id.value, 'AccountName' : account.Name.value, 'CloseDate' : field.CloseDate.value, 'StageName': field.StageName.value, 'Amount' : field.Amount.value }
            })
            console.log(data);

            console.log(this.records);
        }
    }


    @wire(getObjectInfo, { objectApiName: OPPORTUNITY_OBJECT })
    objectInfo;



    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: STAGE_FIELD })
    picklistValues({ error, data }) {
        if (data) {
            console.log('stagePickList', data);
            this.pickVals = data.values.map(item => item.value)
        }
        if (error) {
            console.error(error);
        }
    }

    get calcwidth() {
        let len = this.pickVals.length + 1;
        return `width : calc(100vw/ ${len})`
    }

    listItemDrag(event) {
        this.recordId = event.detail
    }

    listItemDrop(event) {
        let stage = event.detail
       this.records =  this.records.map(item => {
            return item.Id === this.recordId ? {...item, StageName:stage} :{...item}
       })
        console.log(stage);
        this.updateHandler(stage)
    }


    updateHandler(stage) {
        fields = {};
        fields[OPPORTUNITY_ID.fieldApiName] = this.recordId;
        fields[STAGE_FIELD.fieldApiName] = stage;
        const recordInput = {fields}


        updateRecord(recordInput)
            .then((record) => {
                console.log('updated successfully');
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success',
                    message: 'Stage updated',
                    variant: 'success'
                }));
            }).catch(error => {
            console.error(error);
        })
    }


}