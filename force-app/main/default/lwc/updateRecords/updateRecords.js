import { LightningElement, api, track, wire } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import CHILD_CASE_OBJECT from '@salesforce/schema/child_case__c';
import PARENT_CASE_FIELD from '@salesforce/schema/child_case__c.Parent_Case__c'
import CHILD_CASE_NAME_FIELD from '@salesforce/schema/child_case__c.Name'
import EXPECTED_LAST_DATE from '@salesforce/schema/child_case__c.Expected_Last_Date__c'
import CASE_SEVERITY from '@salesforce/schema/child_case__c.Case_severity__c'
import DESCRIPTION from '@salesforce/schema/child_case__c.description__c'
import IMMEDIATE_ACTION from '@salesforce/schema/child_case__c.Immediate_Action_Needed__c'

export default class UpdateRecords extends LightningElement {

    @api recordId;

    objectName = CHILD_CASE_OBJECT;
    fields = [PARENT_CASE_FIELD, CHILD_CASE_NAME_FIELD, EXPECTED_LAST_DATE, CASE_SEVERITY, DESCRIPTION, IMMEDIATE_ACTION];
}