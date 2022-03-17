public with sharing class customMetaData {

    @AuraEnabled(cacheable = true)
    public static List<String> fieldDetails(String objectApiName){

        FormFields__mdt formFields = [SELECT Fields_Api__c FROM FormFields__mdt WHERE DeveloperName =:objectApiName ];
        list<String> fieldList = formFields.Fields_Api__c.split(',');
        return fieldList;
        
    }

}
