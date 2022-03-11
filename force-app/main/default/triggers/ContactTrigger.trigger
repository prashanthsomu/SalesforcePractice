trigger ContactTrigger on Contact (after insert, before insert, after update, before update, after delete, before delete,after undelete ) {
    if(Trigger.isInsert){
        if(Trigger.isAfter){
            ContactTriggerHandler.onAfterInsert(Trigger.new); 
            ContactTriggerHandler.getSumValue(Trigger.new);
            
        }
        else if(Trigger.isBefore){
            ContactTriggerHandler.onEmailCheck(Trigger.new);
        }
        
    }

    else if(Trigger.isUpdate){
        if(Trigger.isAfter){
            ContactTriggerHandler.onAfterInsert(Trigger.new);
            // ContactTriggerHandler.onAfterUpdate(Trigger.old);
            ContactTriggerHandler.getSumValue(Trigger.new);
            
        }
        else if(Trigger.isBefore){
            //no code
        }
       
        
    }

    else if(Trigger.isDelete){
        if(Trigger.isAfter){
             ContactTriggerHandler.afterDel(Trigger.old);
             ContactTriggerHandler.getSumValue(Trigger.old);
            
        }    
    
        else{
        //no code
        }

}



    // if(Trigger.isAfter){
    //     if(Trigger.isDelete){

    //         ContactTriggerHandler.onAfterDelete(Trigger.old);
    //     }
    // }

    
}