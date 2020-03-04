// service for encapsulating the code that deals with consuming data from the REST API server.

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Product } from './product';
import {  throwError } from 'rxjs';
import { retry, catchError,tap  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService 
{
  private SERVER_URL = "http://localhost:3000/products"; //address of our REST API server

  constructor(private httpClient: HttpClient) { }

  public first: string = "";  
  public prev: string = "";  
  public next: string = "";  
  public last: string = "";

  handleError(error: HttpErrorResponse)
  {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent)
    {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } 
    else 
    {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  //sends a GET request to the REST API endpoint to retrieve JSON data:
  public sendGetRequest()
  {
    // observe option with the response value for full HTTP response with headers
    //  RxJS tap() operator for parsing the Link header before returning the final Observable.
    return this.httpClient.get<Product[]>(this.SERVER_URL, {  params: new HttpParams({fromString: "_page=1&_limit=9"}), observe: "response"}).pipe(retry(3), catchError(this.handleError), tap(res => {
    console.log(res.headers.get('Link'));
    this.parseLinkHeader(res.headers.get('Link'));

    }));
  }

  //  takes the URL to which we need to send an HTTP GET request.
  public sendGetRequestToUrl(url: string)
  {
    return this.httpClient.get<Product[]>(url, { observe: "response"}).pipe(retry(3), catchError(this.handleError), tap(res => {
    console.log(res.headers.get('Link'));
    this.parseLinkHeader(res.headers.get('Link'));
    }));
  }

  //parses the Link header and populate the previous variables accordingly
  parseLinkHeader(header) 
  {
    if (header.length == 0) 
    {
      return ;
    }

    let parts = header.split(',');
    var links = {};
    parts.forEach( p => {
      let section = p.split(';');
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;

    });

    this.first  = links["first"];
    this.last   = links["last"];
    this.prev   = links["prev"];
    this.next   = links["next"]; 
  }
}
