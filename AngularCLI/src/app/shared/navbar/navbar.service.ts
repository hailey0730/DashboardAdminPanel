import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";

@Injectable()
export class navbarService {
    
    private notificationsLink = "http://hayhay0730.000webhostapp.com/loadNotifications.php";
    constructor(private http: Http) { }

    notificationsData(): Promise<JSON[]>{
        return new Promise((resolve,reject) => {
            var data = this.http.get(this.notificationsLink)
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
}