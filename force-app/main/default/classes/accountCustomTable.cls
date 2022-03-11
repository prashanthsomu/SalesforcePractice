public with sharing class accountCustomTable {

    // for datatble task
     @AuraEnabled(cacheable=true)
    public static List<Account> accountListTable() {

        return [SELECT  Id, Name, Phone, Type, CustomerPriority__c, AccountNumber, NumberofLocations__c, Rating,SLA__c FROM Account ORDER BY AccountNumber LIMIT 500 ]; 
    }


    // for selection updation deletion task datable and child datatble
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() { 

        return [SELECT  Id, Name, 	Phone, Type, CustomerPriority__c, 	Total_Revenue__c,TickerSymbol,SLA__c,SLASerialNumber__c,UpsellOpportunity__c FROM Account ];      
    }


    //for datatbel with pagination using lwc datatable
    @AuraEnabled(cacheable=true)
    public  static List<Account> accountsData(String searchKey, String sortBy, String sortDirection) {
        String query =  'SELECT  Id, Name, 	Phone, Type, CustomerPriority__c, 	Total_Revenue__c,TickerSymbol,SLA__c,SLASerialNumber__c,UpsellOpportunity__c FROM Account' ;  
        System.debug('query-' + query );

         if ( searchKey != null && searchKey != '' ) {
           String key = '%' + searchKey + '%';
           query += ' WHERE Name LIKE :key';
       }
       if ( sortBy != null && sortDirection != null ) {
           query += ' ORDER BY ' + sortBy + ' ' + sortDirection;
       }
       return Database.query( query );
    }



    // for custom datatable with pagination
    @AuraEnabled(cacheable = true)
    public static Map<string,string> GetPickListValue(){

                Map<string, string> pickListValue = new Map<string, string>();
        
                Schema.DescribeFieldResult objFieldDescribe = Account.Type.getDescribe();
                
                List<Schema.PicklistEntry> lstPickListValues = objFieldDescribe.getPickListValues();
                

                for (Schema.PicklistEntry objPickList : lstPickListValues) {

                    pickListValue.put(objPickList.getValue(),objPickList.getLabel());

                }

                return pickListValue;            
        
    }


    // for dynamic table columns changing task with html table
    @AuraEnabled(cacheable = true)
    public static List<Account> dynamicTable(List<String> selectedField){

                String databaseQuery = 'SELECT ID';
               
                String objName = 'Account';

                for (String Field : selectedField) {
                    
                    databaseQuery += ', ' + field;
                }

                databaseQuery += ' FROM '+objName + ' LIMIT 10';

                List<sObject>accList = Database.query(databaseQuery);

                return accList;
       
    }



}
