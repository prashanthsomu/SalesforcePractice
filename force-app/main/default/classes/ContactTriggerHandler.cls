public with sharing class ContactTriggerHandler {
    public static void onAfterInsert(List<Contact> contactList) {

        set<Id> accountId = new set<Id>();

        for(Contact con : contactList)  {

             accountId.add(con.AccountId);
        
        }


        List<Account> accountList = [SELECT Name,Dependent_contact_count__c,(SELECT Name FROM Contacts) From Account WHERE Id = :accountId ];   

                for(Account acc : accountList)  {

                        integer conCount = acc.Contacts.size();

                        acc.Dependent_Contact_count__c = concount++ ; // why pre-increment//
            
                    }

        update accountList ;
           

        
    }


     public static void afterDel(List<Contact> contactListDel) {

        
        set<Id> accountIds = new set<Id>();
        
        for(Contact con : contactListDel)   {

                accountIds.add(con.AccountId);
        }

        List<Account> accountList = [SELECT Name,Dependent_contact_count__c,(SELECT Name FROM Contacts) From Account WHERE Id = :accountIds ];

                for(Account acc : accountList)  {

                        integer accNumber = acc.contacts.size();
        
                        acc.Dependent_contact_count__c = accNumber ;
                }

                        //  integer conCount = acc.Contacts.size();
                        // integer conCount = integer.valueof(acc.Dependent_Contact_count__c);
                        // integer Concountt = --concount;
                        // acc.Dependent_Contact_count__c = --concount; 
                
        update accountList ;

    }


    

public static void onEmailCheck(List<Contact> emailIdCheckList) {
 
            set<String> contactEmailList = new set<String>();

            String errorMessage = 'Duplicate Email-id';   
           
            for(Contact Con : emailIdCheckList )    {

                    ContactEmailList.add(Con.Email);
           
            }

             List<Contact> overAllContact = [ SELECT Name ,Email FROM Contact WHERE Email = :ContactEmailList ]; 

              Map<String,Contact> EmailMap = new Map<String,Contact>();

                         for(Contact con_map : overAllContact){

                                 EmailMap.put(con_map.Email,con_map);
                
                         }  

                                for( Contact emailIdCheck : emailIdCheckList)   {

                                        if(EmailMap.containskey(emailIdCheck.Email))     {

                                                if(emailIdCheck != null){
                                        
                                                emailIdCheck.addError(errorMessage);
                                                   
                                                }
                                        }       
                                }

                         
            update overAllContact;

        }



         //!  ---------  Task 2 ---------


        public static void  getSumValue(List<Contact> newContactList ) {

                Set<Id> accIdSet = new  Set<Id>();

 

                 for(Contact con : newContactList)   {
                        accIdSet.add( con.AccountId );
                  }  

                 AggregateResult[ ] results = [ SELECT   AccountId, SUM(Individual_Revenue__c) individualAmount ,MAX(Individual_Revenue__c ) maxAmount FROM Contact WHERE AccountId IN : accIdSet GROUP BY AccountId ];

                //   List<Account> accList = [SELECT Id, Name,Total_Revenue__c,Total_Revenue_max__c FROM Account Where Id IN : accIdSet ];

                
                List<Account> accList = new List<Account>();

                  for (AggregateResult result : results ){

                        //    for( Account acc : accList) {
                             Account acc = new Account();
                                acc.Id = (Id)result.get('AccountId');
                                acc.Total_Revenue__c =(Decimal) result.get('individualAmount');
                                acc.Total_Revenue_max__c = (Decimal) result.get('maxAmount');
                                accList.add(acc);
                        //  }
                }

                update accList;   
    }
}

     


       

               


               








    



