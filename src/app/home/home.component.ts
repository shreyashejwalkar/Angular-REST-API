import { Component, OnInit, OnDestroy } from '@angular/core';  
import { ApiService } from '../api.service';
import { HttpResponse } from '@angular/common/http';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs';
import { Product } from '../product';

@Component({  
	selector: 'app-home',  
	templateUrl: './home.component.html',  
	styleUrls: ['./home.component.css']  
})  

export class HomeComponent implements OnInit, OnDestroy 
{
  products: Product[] = [];

 // created an instance of Subject which can emit boolean values, that will be used as the notifier of the takeUntil() operator.
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private apiService: ApiService) { }
  
  ngOnInit()
  {
    // sendGetRequest() method returns the return value of the HttpClient.get() method which is an RxJS Observable,
    // we subscribed to the returned Observable to actually send the HTTP GET request and process the HTTP response.
    this.apiService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<Product[]>) => 
    {
      // access the data from the body object of the received HTTP response.
      console.log(res);
      this.products = res.body;
    })
  }

  //ngOnDestroy() lifecycle method calls the next() method to emit a value so RxJS completes all subscribed Observables.
  ngOnDestroy() 
  {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  public firstPage() 
  {
    this.products = [];
    this.apiService.sendGetRequestToUrl(this.apiService.first).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.products = res.body;
    })
  }

  public previousPage() 
  {
    if (this.apiService.prev !== undefined && this.apiService.prev !== '') {
      this.products = [];
      this.apiService.sendGetRequestToUrl(this.apiService.prev).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      })
    }
  }

  public nextPage() 
  {
    if (this.apiService.next !== undefined && this.apiService.next !== '') {
      this.products = [];
      this.apiService.sendGetRequestToUrl(this.apiService.next).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      })
    }
  }

  public lastPage() 
  {
    this.products = [];
    this.apiService.sendGetRequestToUrl(this.apiService.last).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.products = res.body;
    })
  }
}