import { LightningElement, wire, api, track } from 'lwc';
import accountsData from '@salesforce/apex/accountCustomTable.accountsData';

const columns = [
    { label: 'Account Name',  fieldName: 'Name', editable: true, sortable: true},
    { label: 'Phone', fieldName: 'Phone', type: 'phone' ,editable: true,sortable: true},
    { label: 'Type', fieldName: 'Type', type: 'picklist', editable: true,sortable: true },
    { label: 'Customer Priority', fieldName: 'CustomerPriority__c', type: 'picklist', editable: true ,sortable: true},
    { label: 'Total Revenue', fieldName: 'Total_Revenue_max__c', type: 'number', editable: true,sortable: true },
    { label: 'Ticker Symbol', fieldName: 'TickerSymbol', editable: true,sortable: true },
    { label: 'SLA', fieldName: 'SLA__c', editable: true,sortable: true },
    { label: 'SLA Serial Number', fieldName: 'SLASerialNumber__c', type: 'number', editable: true ,sortable: true},
    { label: 'Upsell Opportunity', fieldName: 'UpsellOpportunity__c', editable: true ,sortable: true}
]


export default class DataTableWithPagination extends LightningElement {
   @track value;
    @track error;
    @track data;
    @api sortedDirection = 'asc';
    @api sortedBy = 'Name';
    @api searchKey = '';
    result;

     @track page = 1; 
    @track items = []; 
    @track data = []; 
    @track columns; 
    @track startingRecord = 1;
    @track endingRecord = 0; 
    @track pageSize = 5; 
    @track totalRecountCount = 0;
    @track totalPage = 0;

     @wire(accountsData, {searchKey: '$searchKey', sortBy: '$sortedBy', sortDirection: '$sortedDirection'})
    wiredAccounts({ error, data }) {
        if (data) {
        
            this.items = data;
            this.totalRecountCount = data.length; 
            this.totalPage = Math.ceil(this.totalRecountCount / this.pageSize); 
            this.data = this.items.slice(0,this.pageSize); 
            this.endingRecord = this.pageSize;
            this.columns = columns;

            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
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
   
      //this method displays records page by page
    displayRecordPerPage(page){

        this.startingRecord = ((page -1) * this.pageSize) ;
        this.endingRecord = (this.pageSize * page);

        this.endingRecord = (this.endingRecord > this.totalRecountCount) 
                            ? this.totalRecountCount : this.endingRecord; 

        this.data = this.items.slice(this.startingRecord, this.endingRecord);

        this.startingRecord = this.startingRecord + 1;
    }    

    sortColumns(event) {
       
            this.sortedBy = event.detail.fieldName;
            this.sortedDirection = event.detail.sortDirection;
            return refreshApex(this.result);
        
        
    }
  
    handleKeyChange(event) {
         this.searchKey = event.target.value;
        clearTimeout(this.timeout); // no-op if invalid id
        this.timeout = setTimeout(this.dataSearch.bind(this), 500);
    }

    dataSearch() {
        console.log(this.searchKey);
        return refreshApex(this.result);
    }

}


// sorting using Lwc without Apex call

// sortBy(field, rerverse, primer)
// {
//     const key = primer
//     ? function (x){
//         return primer(x[field])
//     } 
//     :
//     function(x){
//         return x(field)
//     };
//     return function(a, b){
//         a = key(a);
//         b = key(b);
//         return rerverse * ((a>b) - (b>a));
//     }
// }



