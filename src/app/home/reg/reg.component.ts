import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { Organisation } from "../../shared/Organisation";
import { RoleData } from "../../shared/RoleData.model";

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  public orgs: Array<Organisation>;
  public roles: Array<RoleData>;
  model: any = {};
  
  constructor(public service: UserService, private toastr: ToastrService) {
   }

  // convenience getter for easy access to form fields
  

  ngOnInit() {
    //alert('RegistrationComponent inited!! :-) null = ' + this.service == null+'\n\n');
    this.getAvalibalOrgs();
    this.getAvalibalRoles();
  }

  public getAvalibalOrgs(){
    this.service.getOrgs().subscribe((data: Organisation[]) => {
      //alert('SUCCESS data!! :-)\n\n' + data);
      console.log(data);
      this.orgs = data.filter(element => {
         return element !== null; 
      });
    }); 
   // console.log(this.orgs);
  }

  public getAvalibalRoles(){
    this.service.getRoles().subscribe((data: RoleData[]) => {
      //alert('SUCCESS data!! :-)\n\n' + data);
      console.log(data);
      this.roles = data.filter(element => {
         return element !== null; 
      });
    }); 
  }

  getSelectedValue()
  {
    console.log(this.orgs.filter(el=>{return el == this.service.registerForm.value.OrgIdForUser})[0].orgId);
    return this.orgs.filter(el=>{return el == this.service.registerForm.value.OrgIdForUser})[0].orgId;
  }

  get f() { return this.service.f; }

  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.service.registerForm.reset();
          this.toastr.success('New user created!', 'Registration successful.');
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Username is already taken','Registration failed.');
                break;

              default:
              this.toastr.error(element.description,'Registration failed.');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
