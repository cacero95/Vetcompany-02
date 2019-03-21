import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PetInfoService {

  
  tip:any;
  key = 'bf65e258ccfc65a60d2f9adc0d8bf9ed';
  secret = '8a6f53a102297e338cc6c9495abb5938';
  constructor(private http:HttpClient) {
    
  }

  all_tips(){
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer BQA268DazWCThN-Dy8N0kf5lP2_fuSLXVl_sul1ooGXf0Tpvj00-ntDCGR_fl6JwIN7jES_lWslu_myVSjs`
      });

    return this.http.get('https://vetcompany-cacero95.c9users.io/02vetcompany/api_rest.php',{ headers });
    
  }

  twitter(){
    return this.http.get('https://calm-oasis-89280.herokuapp.com/twitter');
  }

  setTip(tip){
     this.tip = tip;   
  }
  getTip(){
    return this.tip;
  }


}
