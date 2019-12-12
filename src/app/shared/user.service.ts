import { Injectable} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {HttpClient} from '@angular/common/http'

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
}
