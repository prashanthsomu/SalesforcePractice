// @RESTResource(urlMapping = '/createLead/')
global class ApiPractice {

    @AuraEnabled //!get method
        global static Void showLead(){
        
            Lead le = new Lead();
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint('https://my.api.mockaroo.com/sfdemo.json?key=3c5fcd70');
            request.setMethod('GET');
            HttpResponse response = http.send(request);
            // If the request is successful, parse the JSON response.
            if(response.getStatusCode() == 200) {

                JSONParser parser = JSON.createParser(response.getBody());
                while (parser.nextToken() != null) {
                        if (parser.getCurrentToken() == JSONToken.START_OBJECT) {
                            Lead leads = (Lead)parser.readValueAs(Lead.class);
                            le = leads;
                        }
                }
            }
            // Lead leadsa = new Lead(FirstName='SFDC Lead',LastName='Smith',Company='tcRUCS');
            // insert leadsa;
            insert le;
            // return le; 
            //TODO :  method which contains DML operation should not have return statement and (cacheable=true). if contains, error is too many DML operations.(no of dml statements : 1 out of 0)
        }
}












    //     String objName;
    //     Id i ;

    //     RestRequest req = RestContext.request;
    //     RestResponse res = RestContext.response;

    //     String jsonBody = req.requestBody.toString();
    //     JsonParser parser = JSON.createParser(jsonBody);
        
    //     while (parser.nextToken()!= null) {

    //         if (parser.getCurrentToken()!= JSONToken.END_OBJECT) {

    //             String fName = parser.getCurrentName();
    //             String fValue = parser.getText();
    //         }

    //         if(fName == 'objectName'){
    //             objName = fValue;
    //         }
    //         else if(fName == 'ID' ){
    //             i = fValue;
    //         }            
    //     }

    //      String qr = 'SELECT Name FROM' + objName + 'WHERE ID =' + i +'LIMIT 1';
    //      sObject s = Database.query(qr);
    //      String jsonResponse = '{\"Name\":\"'+s.get('Name')+'\"}';
    //      return jsonResponse;

    // }

   




    
    // @HTTPPost
    // global static String doPost()
    // {

    //     String fName,lName,comp;

    //     RestRequest req = RestContext.request;
    //     RestResponse res = RestContext.response;

    //     String arr = req.requestBody.toString();
    //     System.debug('Body is : ' + arr);
    //     return 'hey';

    // }




    
        // String fName,lName,company;
        // String fieldName , fieldValue;

        // RestRequest req = RestContext.request;
        // RestResponse res = RestContext.response;
        // String jsonBody = req.requestBody.toString();
        // JSONParser parser = JSON.createParser(jsonBody);
        // while(parser.nextToken()!= null){
        //     if(parser.getCurrentToken() != JSONToken.END_OBJECT ){
        //         fieldName = parser.getCurrentName();
        //         fieldValue = parser.getText();

        //         if(fieldName == 'FirstName'){
        //             fName = fieldValue;
        //         }
        //         else if(fieldName == 'LastName'){
        //             lName = fieldValue;
        //         }
        //         else if(fieldName == 'Company'){
        //             company = fieldValue;
        //         }
        //     }

        // }

        // lead leadd = new lead (firstName = fname, lastName = lname,Company = company);
        // insert leadd;

        // return leadd.Id;

    // }


