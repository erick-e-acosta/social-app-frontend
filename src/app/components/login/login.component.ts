import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from "../../models/user";
import { UserService } from '../../services/user.service'
import { error } from 'protractor';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  providers:[UserService]
})
export class LoginComponent implements OnInit {
  public title : String;
  public user:User;
  public status:string;
  public token;
  public identity;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UserService
  ) {
    this.title = "Identificate";
    this.user = new User("","","","","","","ROLE_USER","");
   }

  ngOnInit(): void {
    console.log("Cargando componente Login...");
  }
  onSubmit(){
    this._userService.signup(this.user,'true').subscribe(
      response  =>{
        console.log(response);
        this.token = response.token;
        console.log(this.token);
        debugger
        if(this.token.length <=0 ){
          this.status = 'error';
        }else{
          this.status ='success';
          // PERSIST DATA USER

          //conoseguir contadores o estadisticas user
          this.getToken();
        }
      },error =>{
        var errorMessage = <any>error;
        console.log(errorMessage)
        if(errorMessage != null){
          this.status = 'error';
        }
      }
    )
  }

  getToken(){
    this._userService.signup(this.user,this.getToken).subscribe(
      response  =>{
        this.identity = response.user;
        if(!this.identity || this.identity._id){
          this.status = 'error';
        }else{
          this.status ='success';
          // PERSIST DATA USER

          //get token
        }
      },error =>{
        var errorMessage = <any>error;
        console.log(errorMessage)
        if(errorMessage != null){
          this.status = 'error';
        }
      }
    )
  }
}
