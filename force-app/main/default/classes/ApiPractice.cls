@RESTResource(urlMapping = '/createLead/')
global class ApiPractice {

    // @HTTPGet
    // global static String showLead(){

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

   



    
    @HTTPPost
    global static String doPost()
    {

        String fName,lName,company;
        String fieldName , fieldValue;

        RestRequest req = RestContext.request;
        RestResponse res = RestContext.response;
        String jsonBody = req.requestBody.toString();
        JSONParser parser = JSON.createParser(jsonBody);
        while(parser.nextToken()!= null){
            if(parser.getCurrentToken() != JSONToken.END_OBJECT ){
                fieldName = parser.getCurrentName();
                fieldValue = parser.getText();

                if(fieldName == 'FirstName'){
                    fName = fieldValue;
                }
                else if(fieldName == 'LastName'){
                    lName = fieldValue;
                }
                else if(fieldName == 'Company'){
                    company = fieldValue;
                }
            }

        }

        lead leadd = new lead (firstName = fname, lastName = lname,Company = company);
        insert leadd;

        return leadd.Id;

    }

}
