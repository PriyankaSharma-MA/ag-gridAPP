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

    SaveGridViewState(InputGridViewstate) {
        //Create header object
        let headers = new HttpHeaders();
        //Mention http header details
        let finalheaders = headers.append('Content-Type', 'application/json');
        finalheaders.append("Access-Control-Allow-Origin", "true")

        let body = JSON.stringify(InputGridViewstate);
        //Call the put function
        return this.http.post<any>(this.webApiUrl + "SavegridViewState", body, { headers: finalheaders })
            //.catch(this.handleError)
            ;
    }
    DeleteGridViewState(id) {
        //Create header object
        let headers = new HttpHeaders();
        //Mention http header details
        let finalheaders = headers.append('Content-Type', 'application/json');
        finalheaders.append("Access-Control-Allow-Origin", "true")

        //let body = JSON.stringify(id);
        //Call the put function
        return this.http.post<any>(this.webApiUrl + "DeletegridViewState?id="+ id, { headers: finalheaders })
            //.catch(this.handleError)
            ;
    }
    GetgridViewState(getgridViewStateParam,id,foundationId): Observable<[]> {
        //Create header object
        let headers = new HttpHeaders();
        //Mention http header details
        let finalheaders = headers.append('Content-Type', 'application/json');
        finalheaders.append("Access-Control-Allow-Origin", "true")
        let body = JSON.stringify(getgridViewStateParam);
        //Call the get function
        return this.http.get<[]>(this.webApiUrl + "GetgridViewState?id="+ id + "&foundationId="+ foundationId, { headers: finalheaders,params:getgridViewStateParam,observe: 'body'})
           // .catch(this.handleError);
    }
    GetGridViewData(foundationId,viewId): Observable<[]> {
        //Create header object
        let headers = new HttpHeaders();
        //Mention http header details
        let finalheaders = headers.append('Content-Type', 'application/json');
        finalheaders.append("Access-Control-Allow-Origin", "true")
        //Call the get function
        return this.http.get<[]>(this.webApiUrl + "GetGridViewData?foundationId="+ foundationId  + "&viewId=" +viewId , { headers: finalheaders })
           // .catch(this.handleError);
    }
    GetGridViewStructure(): Observable<[]> {
        //Create header object
        let headers = new HttpHeaders();
        //Mention http header details
        let finalheaders = headers.append('Content-Type', 'application/json');
        finalheaders.append("Access-Control-Allow-Origin", "true")
        //Call the get function
        return this.http.get<[]>(this.webApiUrl + "GetGridViewStructure" , { headers: finalheaders })
           // .catch(this.handleError);
    }
    GetFoundationName(foundationId): Observable<[]> {
        //Create header object
        let headers = new HttpHeaders();
        //Mention http header details
        let finalheaders = headers.append('Content-Type', 'application/json');
        finalheaders.append("Access-Control-Allow-Origin", "true")
        //Call the get function
        return this.http.get<[]>(this.webApiUrl + "GetFoundationName?foundationId="+ foundationId   , { headers: finalheaders })
           // .catch(this.handleError);
    }
    //Error Handling
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }
}