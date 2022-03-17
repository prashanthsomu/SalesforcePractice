public with sharing class SalesforceConnect {

        public static String getCasesFromOrgB() {
            Http http = new Http();
            HttpRequest request = new HttpRequest();

            // request.setEndpoint('https://technorucs4-dev-ed.my.salesforce.com/services/apexrest/case'); //! 1
            // request.setMethod('GET'); //! 2
            // request.setHeader('Authorization','Bearer !AQUAQPhebhYtdgaMdp9OtbS4dQf9jS8H3RjFThzfrpXfx7D19UAHS0pBhkskEorfK6lW_k5F2Dj681feGqd25QWX3rn1JpOd'); //! 3

            /*
                1. above 3 steps are not fiesible for all scenarios so we go for another method.

                2. so we create connected app from the data donating org 
                3. it will give consumer key and consumer secret and when creating callback should have dummy link  like localhost:3000
                4.Selected OAuth Scopes : full access(full) , manage user data via APIs (api), perform request at any time(refresh_token,offline access)
                
                5. in receving org we create auth.provider
                6. in that we use consumer key and consumer secret which we got from donating org
                7. default scope should be (refresh_token full).
                8. next we need to create named credentials 
                9. url should be donating org's base url, we can get that url from donating org using -> system.debug(System.Url.getSalesforceBaseUrl()); -> result ->  https://technorucs4-dev-ed.my.salesforce.com //! dont use url from address bar
                10.use system.debug(System.UserInfo.getSessionId().SubString(15)); -> to get auth token which we used in //!3 
                11. identity type -> named principle
                12. auth protocol -> OAuth 2.0
                13. Start Authentication Flow on Save -> true (only when creating) 
                14. will redirect to login screen login using donating org credentials and accept all. thats it.

                15. above request process 3 can be eliminated 1 can be changed to following code and callout:named credentils apiname
            */

            
            request.setEndpoint('callout:SFOrg4Dev/services/apexrest/case');
            request.setMethod('GET');
            HttpResponse response = http.send(request);
            // If the request is successful, parse the JSON response.
            system.debug( 'response code '+ response.getStatusCode());
            if(response.getStatusCode() == 200) {
                system.debug('response ' + response.getBody());
                List<Object> casesFromOrgB = (List<Object>)JSON.deserializeUntyped(response.getBody());
                System.debug('list of orgB case'+casesFromOrgB);
                for (Object eachcase : casesFromOrgB) {
                    System.debug(eachcase);
                }
                return response.getBody();
            }
            else return '';

    }
   
}





//TODO : APEX CODE OF DONATING ORG TO GIVE DATA AND OTHER STUFFS #FOR FUTURE REF 
// https://technorucs4-dev-ed.my.salesforce.com  
// CREDENTIALS : prashanth@technorucs.dev : tnj613009 

/*
@RestResource(urlMapping='/case/*')
// system.debug(System.Url.getSalesforceBaseUrl()); -- use this always line alone in anonymous window to get SF url. urladdress is not gud... 
// debuged statement -> https://technorucs4-dev-ed.my.salesforce.com
// above statement + /services/apexrest/urlMapping->string only for postman call
// debug statement for getting  -> system.debug(System.UserInfo.getSessionId().SubString(15));

global class CaseWebService {

    @HttpGet
    global static List<Case> getCase() {
        List<Case> result =  [SELECT CaseNumber,Subject,Status,Origin,Priority
                        FROM Case LIMIT 10];
        return result;
    }
    
    @HttpPost
    global static ID createCase(String subject, String status,
        String origin, String priority) {
        Case thisCase = new Case(
            Subject=subject,
            Status=status,
            Origin=origin,
            Priority=priority);
        insert thisCase;
        return thisCase.Id;
    }   
    
    @HttpDelete
    global static void deleteCase() {
        RestRequest request = RestContext.request;
        String caseId = request.requestURI.substring(
            request.requestURI.lastIndexOf('/')+1);
        Case thisCase = [SELECT Id FROM Case WHERE Id = :caseId];
        delete thisCase;
    }    
    
    @HttpPut
    global static ID upsertCase(String subject, String status,
        String origin, String priority, String id) {
        Case thisCase = new Case(
                Id=id,
                Subject=subject,
                Status=status,
                Origin=origin,
                Priority=priority);
        // Match case by Id, if present.
        // Otherwise, create new case.
        upsert thisCase;
        // Return the case ID.
        return thisCase.Id;
    }
    
    @HttpPatch
    global static ID updateCaseFields() {
        RestRequest request = RestContext.request;
        String caseId = request.requestURI.substring(
            request.requestURI.lastIndexOf('/')+1);
        Case thisCase = [SELECT Id FROM Case WHERE Id = :caseId];
        // Deserialize the JSON string into name-value pairs
        Map<String, Object> params = (Map<String, Object>)JSON.deserializeUntyped(request.requestbody.tostring());
        // Iterate through each parameter field and value
        for(String fieldName : params.keySet()) {
            // Set the field and value on the Case sObject
            thisCase.put(fieldName, params.get(fieldName));
        }
        update thisCase;
        return thisCase.Id;
    }     
}
*/
