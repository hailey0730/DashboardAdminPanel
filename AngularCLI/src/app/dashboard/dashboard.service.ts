import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";

@Injectable()
export class dashboardService {
    // private testlink = "../PHP/loadMapTime.php";
    // private testlink = "http://www.drcare.ai/php/loadMapTime.php";
    private testlink = "http://www.drcare.ai/php/test.php";

    private simpleChartsLink = "http://hayhay0730.000webhostapp.com/simpleCharts.php";
    private usersDataLink = "http://hayhay0730.000webhostapp.com/loadUsersConv.php";
//links are moved to dashboard.component.ts as inputs

    constructor(private http: Http) { }

    getJson(link): Promise<JSON[]>{
        return new Promise((resolve,reject) =>{

            var testJson = this.http.get(link)
                .map(res => res.json())
                .catch(error => {
                    console.log(error);
                    return Observable.throw(error);
                })
                .subscribe(val => {
                    resolve(val);
                });

        })
        
    }

    postJson(link, obj){
        this.http.post(link, obj);
    }

}