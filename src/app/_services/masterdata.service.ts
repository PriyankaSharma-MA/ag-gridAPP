import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
//import { ProgramList,RegionList,ResourceList,RoadMapData } from '../_models/masterdata.model'


@Injectable()
export class MasterService {
    //HttpClient should be passed as a parameter in constructor
    constructor(private http: HttpClient) { }

    //Mention API URL
    private webApiUrl = environment.apiurl;
    
    GetAllCarTable(): Observable<[]> {
        //Create header object
        let headers = new HttpHeaders();
        //Mention http header details
        let finalheaders = headers.append('Content-Type', 'application/json');
        finalheaders.append("Access-Control-Allow-Origin", "true")
        //Call the get function
        return this.http.get<[]>(this.webApiUrl + "GetAllCarTable" , { headers: finalheaders })
           // .catch(this.handleError);
    }
    //Error Handling
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }
}