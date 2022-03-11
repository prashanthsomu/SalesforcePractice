import { LightningElement, api, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/accountCustomTable.accountListTable';
import getFieldValue from '@salesforce/apex/accountCustomTable.GetPickListValue';
import dynamicTable from '@salesforce/apex/accountCustomTable.dynamicTable';

const selectedFieldObj = ['Name', 'Type', 'SLA__C'];

export default class AccountCustomTable extends LightningElement {
    renderTable = true;
    @track accountList = [];
    filterAccounts = [];
    tempAccountHolder = [];
    @track typeValue = '';
    @track page = 1; 
    @track data = [];  
    @track startingRecord = 1;
    @track endingRecord = 0; 
    @track pageSize = 25; 
    @track totalRecountCount = 0;
    @track totalPage = 1;
    @track pageLastRecord = 25;
    @track accountChange; 
     fieldOptions;
    
    
    //Getting Accounts from Database
     @wire(getAccounts)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accountList = data;
            this.totalRecountCount = data.length; 
            this.totalPage = Math.ceil(this.totalRecountCount / this.pageSize); 
            this.data = this.accountList.slice(0,this.pageSize); 
            this.endingRecord = this.pageSize;
            this.error = undefined;
            console.log(this.accountList);
            console.log('version Count ->  22');
            this.accountChange = true;
            console.log(this.accountChange);

        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
     } 
    
    @wire(getFieldValue)
    wiredFieldValue({ error, data }) {
        let tempArr = [];
        if (data) {
            console.log(data);
            for (const key in data) {
                tempArr.push({ label : data[key], value : key})
            }
            this.fieldOptions = tempArr;
        }
    } 

    // @wire(dynamicTable, { selectedField: ['Name', 'Type','SLA__c'] }) 
    //vscode ctrl click not working
         
    @wire(dynamicTable, { selectedField : selectedFieldObj }) 
    fetchingSelectedCols({ error, data }) {
        if (data) {
            console.log('dynamic query of data -> ',data);
        }
        if (error) {
            console.error(error);
        }
    }
    

    //to filter the record display in datatable
    filterChange(event) {
        this.typeValue = event.detail.value;
        console.log(this.typeValue);
        this.accountChange = false;
        if (this.typeValue != 'None') {
            this.accountList.filter((value) => {
                if (value.Type == this.typeValue)
                    this.filterAccounts.push(value)
            });
        }
        else if (this.typeValue == 'None') {
            this.filterAccounts = this.accountList;
        }
        this.totalRecountCount = this.filterAccounts.length; 
        this.totalPage = Math.ceil(this.totalRecountCount / this.pageSize); 
        this.data = this.filterAccounts.slice(0, this.pageSize); 
        if (this.totalRecountCount < this.pageSize) {
            this.pageLastRecord = this.totalRecountCount;
        }
        if (this.totalRecountCount >= this.pageSize) {
            this.pageLastRecord = this.pageSize;
        }

        this.tempAccountHolder = this.filterAccounts;
        console.log(this.data);
        console.log('expecting non-empty array', this.filterAccounts);
        this.page = 1;
        this.filterAccounts = [];
        console.log('expecting empty array',this.filterAccounts);
        console.log(this.pageLastRecord);
        console.log(this.accountChange);
     
    }
    
     
     
    //clicking on previous button this method will be called
    previousHandler() {
        if (this.page > 1) {
            this.page = this.page - 1; //decrease page by 1
            this.displayRecordPerPage(this.page);
        }
    }

    //clicking on next button this method will be called
    nextHandler() {
        if((this.page<this.totalPage) && this.page !== this.totalPage){
            this.page = this.page + 1; //increase page by 1
            this.displayRecordPerPage(this.page);     
        }             
    }

    //clicking on first button this method will be called
    firstHandler() {
        this.page = 1;
        this.displayRecordPerPage(this.page);
        console.log('firstpage');

    }

    //clicking on  last button this method will be called
    LastHandler() {
        this.page = this.totalPage;
        this.displayRecordPerPage(this.page);
        console.log('lastpage');
    }


    
    //this method displays records page by page
    displayRecordPerPage(page){

        this.startingRecord = ((page -1) * this.pageSize) ;
        this.endingRecord = (this.pageSize * page);
     
        if (this.accountChange == false) { 
            this.data = this.tempAccountHolder.slice(this.startingRecord, this.endingRecord);  
            console.log('false received');
        }
        else if (this.accountChange == true) {
            this.data = this.accountList.slice(this.startingRecord, this.endingRecord);    
            console.log('true received');
        }
         
        this.startingRecord = this.startingRecord + 1;
        this.pageLastRecord = this.endingRecord;
    }    
   
    // get options() {
    //     return this.fieldOptions.forEach((value) => {
    //         console.log(value);
    //     });
    // }
        //  [
        //     { label: 'None', value: 'None' },
        //     { label: 'Prospect', value: 'Prospect' },
        //     { label: 'Customer - Direct', value: 'Customer - Direct' },
        //     { label: 'Customer - Channel', value: 'Customer - Channel' },
        //     { label: 'Channel Partner / Reseller', value: 'Channel Partner / Reseller' },
        //     { label: 'Installation Partner', value: 'Installation Partner' },
        //     { label: 'Technology Partner', value: 'Technology Partner' },
        //     { label: 'Type example 1', value: 'Type example 1' },
        //     { label: 'Type example 2', value: 'Type example 2' },
        //     { label: 'Type example 3', value: 'Type example 3' }, 
        // ];
     }