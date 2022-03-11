public with sharing class newsController {
    
    @AuraEnabled
    public static Map<String, Object> retriveNews(){

        HttpRequest httpRequest = new HttpRequest();
        httpRequest.setEndpoint('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=460793b444594ee184f370496d859104');

        httpRequest.setMethod('GET');

        Map<String, Object> newsData = new Map<String, Object>();
        String strResponse = null ;

        try {
            Http http = new Http();
            HttpResponse httpResponse  = http.send(httpRequest);
            if (httpResponse.getStatusCode() == 200) {
                strResponse = httpRequest.getBody();
            }
            else {
                throw new CalloutException(httpRequest.getBody());
            }



        } catch (Exception ex) {

            throw ex;
            
        }

        if (!String.isBlank(strResponse)) {
            newsData = (Map<String, Object>)JSON.deserializeUntyped(strResponse); 
        }

        if (!newsData.isEmpty()) {
            return newsData;
        }
        else{
            return null; 
        }
    }
}



