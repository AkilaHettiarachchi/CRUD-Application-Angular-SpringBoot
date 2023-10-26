import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'app/app.service';
import { AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  constructor(private service: AppService, private router: Router) { }

  data: any

  
  form = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required,this.customeEmailValidator]),
    dob: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    education: new FormControl('', [Validators.required]),
    company: new FormControl('', [Validators.required]),
    salary: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
  }
  getError(control:any) : string {
    if(control.errors?.required && control.touched)
      return 'This field is required!';
    else if(control.errors?.emailError && control.touched)
      return 'Please enter valid email address!';
    else return '';
}

customeEmailValidator(control:AbstractControl) {
  const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;
  const value = control.value;
  if(!pattern.test(value) && control.touched) 
    return {
      emailError:true
    }
  else return null;
}


  
  submit(){
    this.data = this.form.value
    console.log(this.data)

    this.service.adduser(this.data).subscribe(data => {
      console.log(data)
      this.router.navigate(['/']);

    })

    
    
    this.router.navigate(['/']);
  }

}
