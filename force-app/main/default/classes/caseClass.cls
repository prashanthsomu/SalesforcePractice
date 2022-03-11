public with sharing class caseClass {



    @AuraEnabled(cacheable=true)
    public static Case fetchCase(String recordId){
    return [SELECT Id,Type,Status,Reason,Origin,Subject,Priority,Description,SlaStartDate,PotentialLiability__c,Product__c,Case_reason__c,CaseNumber,AccountId,ContactId FROM Case where Id=:recordId LIMIT 1];
    }


        @AuraEnabled
        public static Case cloneCaseRecord(Case clonecase){
        Case newCase = clonecase.clone(false,true,false,false);
        insert newCase;
        return newCase;
    }

    //     @AuraEnabled(cacheable = true)
    //     public static List<string> getFields(String selectedObject){

    //     List<String> reqFields = new List<String>();

    //     Map <String,Schema.SObjectType> gd = Schema.getGlobalDescribe();
    //     Schema.SObjectType sobjType = gd.get(selectedObject);
    //     Schema.DescribeSObjectResult r = sobjType.getDescribe();
    //     Map<String, Schema.SObjectField> MapofField = r.fields.getMap();
        
    //     for(String fieldName : MapofField.keySet()) {
    //         Schema.SObjectField field = MapofField.get(fieldName);
    //         Schema.DescribeFieldResult F = field.getDescribe();
    //         String fieldString = String.valueOf(field);
    //         System.debug('field-->'+field);
    //         System.debug('F-->'+F.getType()); 
	//         reqFields.add(fieldString);
    //     }
    //     System.debug(reqFields);
    //     return reqFields;
    //     }



        // Returns a dynamic SOQL statement for the whole object, includes only creatable fields since we will be inserting a cloned result of this query
    // public static string getCreatableFieldsSOQL(String objectName, String id){
         
    //     String selects = '';
         
    //     // Get a map of field name and field token
    //     Map<String, Schema.SObjectField> fMap = Schema.getGlobalDescribe().get(objectName.toLowerCase()).getDescribe().Fields.getMap();
    //     list<string> selectFields = new list<string>();
         
    //     if (fMap != null){
    //         for (Schema.SObjectField ft : fMap.values()){ // loop through all field tokens (ft)
    //             Schema.DescribeFieldResult fd = ft.getDescribe(); // describe each field (fd)
    //             if (fd.isCreateable()){ // field is creatable
    //                 selectFields.add(fd.getName());
    //             }
    //         }
    //     }
         
    //     if (!selectFields.isEmpty()){
    //         for (string s:selectFields){
    //             selects += s + ',';
    //         }
    //         if (selects.endsWith(',')){
    //             selects = selects.substring(0,selects.lastIndexOf(','));
    //         }    
    //     }
    //     return 'SELECT ' + selects + ' FROM ' + objectName + 'WHERE Id =:id'  ;
    // }

    // @AuraEnabled
    // public static Case cloneRec(String objectName, String id){
    // String soql = caseClass.getCreatableFieldsSOQL(objectName,id);
    // Case c = (Case)Database.query(soql);
    // Case c2 = c.clone(false, true,false,false);
    // insert c2;
    // return c2;
    // }

    // @AuraEnabled(cacheable = true)
    // public static Case fields(List<String> Fields, String recordId ){
    //     System.debug(Fields);
    //     String query = 'SELECT ';
    //     for (String fieldName : Fields) {
    //         query += fieldName + ', ';
    //     }
    //         String finalQuery = query.removeEnd(', ');
    //         finalQuery  += ' FROM Case ' + 'WHERE Id =:recordId';
    //         System.debug(finalQuery);
    //         return Database.query(finalQuery);      
    // }

    // @AuraEnabled(cacheable=true)
    // public static List<String> getCaseFields(){
    //     SObjectType caseType = Schema.getGlobalDescribe().get('Case');
    //     Map<String,Schema.SObjectField> mfields = caseType.getDescribe().fields.getMap();

    //     List<String> sObjectDetailsList = new List<String>();
    //     for(String s : mfields.keySet()){
    //         sObjectDetailsList.add(String.valueOf(mfields.get(s)));
    //     }
    //     return sObjectDetailsList;
    // }

}
 

// @AuraEnabled
// public static Case CloneCase(List<Case> allCase ){
//     try {
//         Case newCase = new Case();
//         for (Case clonedCase : allCase) {
//             newCase =  clonedCase;   
//         }
//         insert newCase;
//         return newCase;
//     } catch (Exception e) {
//         throw new AuraHandledException(e.getMessage());
//     }
// }










//     @AuraEnabled
//     public static Case cloneCase(string recordId){
//     try{
//     List<Case> caseRecord = new List<Case>();
//     Case clonedCase = new Case();
//     String query = 'SELECT ';
//     for(Schema.FieldSetMember f : SObjectType.Case.FieldSets.recordAFields.getFields()) {
//         query += f.getFieldPath() + ', ';
//     }
//     query += 'Description FROM Case ' + 'WHERE Id =:recordId';   
//     caseRecord = Database.query(query);
//    for (Case caseToBeClone : caseRecord ) {
//        clonedCase = caseToBeClone.clone(false,true,false,false);
//    }
//     insert clonedCase;
//     return clonedCase;
//     }
//     catch(Exception ex ){
//          throw new AuraHandledException(ex.getMessage());
//     }



// }















    // // to get fieldset list created on admin side
    // @AuraEnabled(cacheable = true)
    // public static List<Sobject> getFieldsList(String recordId) {

    //     List<Sobject> queriedFields = new List<Sobject>();
    //     String query = 'SELECT ';

    //     for(Schema.FieldSetMember f : SObjectType.Case.FieldSets.recordAFields.getFields()) {
    //         query += f.getFieldPath() + ', ';
    //     }

    //     query += 'Description FROM Case ' + 'WHERE Id =:recordId';

    //     System.debug(query);
         
    //     queriedFields = Database.query(query);
    //     system.debug(queriedFields);

    //     return queriedFields;
    // }



















