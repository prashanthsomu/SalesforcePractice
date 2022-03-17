public with sharing class receipeCls {

    private static final String SPOONACULAR_API = 'https://api.spoonacular.com';
    private static final String API_KEY = '563e4623a3fe400db8eb55cc48b19a7e';

    @AuraEnabled
    public static String getRandomReceipe() {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(SPOONACULAR_API+'/recipes/random?apiKey='+API_KEY);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        // If the request is successful, parse the JSON response.
		system.debug( 'response code '+ response.getStatusCode());
        if(response.getStatusCode() == 200) {
            system.debug('response ' + response.getBody());
            return response.getBody();
        }
        else return '';

    }
    @AuraEnabled
    public static String getReceipe(String receipeId) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(SPOONACULAR_API+'/recipes/'+receipeId+'/information?apiKey='+API_KEY);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        // If the request is successful, parse the JSON response.
        system.debug( 'response code '+ response.getStatusCode());
        if(response.getStatusCode() == 200) {
            system.debug('response ' + response.getBody());
            return response.getBody();
        }
        else return '';

    }
    @AuraEnabled
    public static String getReceipeByIngredient(String ingredients) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(SPOONACULAR_API+'/recipes/findByIngredients?apiKey='+API_KEY+'&ingredients='+ingredients);
        
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        // If the request is successful, parse the JSON response.
		system.debug( 'response code '+ response.getStatusCode());
        if(response.getStatusCode() == 200) {
            return response.getBody();
        }
        else return '';

    }

}
