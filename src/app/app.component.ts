import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Account} from './account';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  firstName:string = '';
  accounts:Account[] = [];
  url:string = 'http://localhost:8080';
  constructor(public http:HttpClient) {}

  ngOnInit(){
    this.getData();
  }

  createAccount(){
    if(this.firstName){
      this.postData(this.firstName);
      this.getData();
    }
  }

  postData(name:string){
    this.http.post(this.url + '/account', {
      firstName: name
    }).toPromise().then((data:any) => {
      console.log(data);
    });
  }

	getData(){
    return this.http.get(this.url + '/account').subscribe((res:any)=>{
      if(res){
        console.log(res.totalSize);
        this.accounts = res.records;
      }
    });
  }

  deleteData(id:string){
    this.http.delete(this.url + '/account/' + id).subscribe((res:any)=>{
      if(res[0].success){
        console.log(res.success);
        this.getData();
      }else{
        console.log(res[0].errors.message);
      }

    });
  }
}
