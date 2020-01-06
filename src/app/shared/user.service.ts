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
      OrgIdForUser :[''],
      Role :[''],
      UserName :[''/*, [Validators.required]*/],
      Email :[''/* , [Validators.email] */],
      FullName :[''],
      Password :[''/* , [Validators.required, Validators.minLength(6)] */],
      ConfirmPassword :[''/* , [Validators.required, Validators.minLength(6)] */]
      
    });

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  public getOrgs() {
    return this.http.get(this.BaseURI+'/Organisation');
  }

  public getRoles() {
    return this.http.get(this.BaseURI+'/Roles');
  }

  register(){
    var body = {
      OrgId: this.registerForm.value.OrgIdForUser,
      Role: this.registerForm.value.Role,
      UserName: this.registerForm.value.UserName,
      Email:this.registerForm.value.Email,
      Password: this.registerForm.value.Password,
    }

    return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
  }

  public login(formData) {
    return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData);
  }

  getUserProfile() {
    return this.http.get(this.BaseURI + '/UserProfile');
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    alert('roleMatch !! :-)\n\n' + payLoad.role);
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
