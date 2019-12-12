import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  model: any = {};
  
  constructor(public service: UserService) {

    //this.service.registerForm.controls["UserName"].setValue( "123");
   }

  // convenience getter for easy access to form fields
  

  ngOnInit() {
    //alert('RegistrationComponent inited!! :-) null = ' + this.service == null+'\n\n');
  }

  get f() { return this.service.f; }

  onSubmit(){
    alert(' UserService onSubmit!! :-)\n\n');
    this.service.register().subscribe(
      
      (res:any)=>{
        if(res.succeded)
        {
          this.service.registerForm.reset();
        } else {
          res.errors.array.forEach(element => {
            switch(element.code)
            {
              case 'DublicateUserName':
                //Username is already taken
                break;
              default:
                //reg failed
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
