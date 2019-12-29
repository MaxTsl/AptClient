import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  model: any = {};
  
  constructor(public service: UserService, private toastr: ToastrService) {

    //this.service.registerForm.controls["UserName"].setValue( "123");
   }

  // convenience getter for easy access to form fields
  

  ngOnInit() {
    //alert('RegistrationComponent inited!! :-) null = ' + this.service == null+'\n\n');
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
