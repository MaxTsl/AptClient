import { Injectable} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //registerForm: FormGroup;
  submitted = false;
  readonly BaseURI = 'http://localhost:60844/api';
  
  constructor(private fb:FormBuilder, private http:HttpClient) { }

    registerForm = this.fb.group({
      UserName :[''/*, [Validators.required]*/],
      Email :[''/* , [Validators.email] */],
      FullName :[''],
      Password :[''/* , [Validators.required, Validators.minLength(6)] */],
      ConfirmPassword :[''/* , [Validators.required, Validators.minLength(6)] */]
      
    });

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  /* onSubmit() {
    this.submitted = true;
    alert(' UserService onSubmit!! :-)\n\n');
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    } 

    // display form values on success
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }*/

  register(){
    var body = {
      UserName: this.registerForm.value.UserName,
      Email:this.registerForm.value.Email,
      Password: this.registerForm.value.Email,
    }

    return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
  }

  public login(formData) {
    return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData);
  }

  getUserProfile() {
    var tokenHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')});
    return this.http.get(this.BaseURI + '/UserProfile',{headers:tokenHeader});
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    allowedRoles.forEach(element => {
      if (userRole == element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
}
