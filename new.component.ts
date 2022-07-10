import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  public new !: FormGroup;
  public verifyOtpForm!: FormGroup;
  constructor(private FormBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.new = this.FormBuilder.group({
      panNumber: ['', Validators.required],
      city: ['', Validators.required],
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required]
    });

    this.verifyOtpForm = this.FormBuilder.group({
      mobile: ['', Validators.required],
      otp: ['', Validators.required]
    });
  }


  public ResendOtp: boolean = false;
  public ErrorMsg: string = "";
  public UserName: any = "";
  public ShowVeryOtpFiled: boolean = false;

  submit() {

    localStorage.setItem('UserName', this.new.value.fullname);
    this.http.post<any>("https://jocata.thinkoverit.com/api/getOTP.php", this.new.value)
      .subscribe(res => {
        if (res.status == "Success") {
          this.ShowVeryOtpFiled = true;

          setTimeout(() => {
            this.ResendOtp = true;
          }, 180 * 1000);
        }
        else {
          this.ErrorMsg = "Something Went Wrong Please Try Again..";
        }
      })

  }
  public successMsg: boolean = false;
  VerifyYourMobileNo() {
    this.http.post<any>("https://jocata.thinkoverit.com/api/verifyOTP.php", this.verifyOtpForm.value)
      .subscribe(res => {
        if (res.status == "Success") {
          alert("Verify Sucessful ")
          this.UserName = localStorage.getItem('UserName');
          this.successMsg = true;

        }

      })

  }

}
