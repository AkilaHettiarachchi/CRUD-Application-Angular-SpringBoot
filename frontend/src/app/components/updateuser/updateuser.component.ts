import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'app/app.service';
import { User } from 'app/User';
import { AbstractControl} from '@angular/forms';


@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {

  user?: User
  data: any


  constructor(private service: AppService, private route: ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.service.getUserById(id).subscribe(data => {
      this.user = data
      console.log(this.user)
      this.form.patchValue(this.user);
    })
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
  form = new FormGroup({
    email: new FormControl('', [Validators.required,this.customeEmailValidator]),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
   // education: new FormControl('', [Validators.required]),
    //company: new FormControl('', [Validators.required]),
   // salary: new FormControl('', [Validators.required])
  })
 


  submit(){

    if(this.user){
        this.data = this.form.value
        this.service.updateUser(this.user.id, this.data).subscribe(data => {
        console.log(data)
        this.router.navigate(['/'])
        })
        this.router.navigate(['/']);
       
  } else{
    this.data = this.form.value
    this.service.adduser(this.data).subscribe(data => {
      console.log(data)
    

    })

    
    this.router.navigate(['/']);
    
  }
}

  cancel(){
    this.router.navigate(['/']);
  }

}
