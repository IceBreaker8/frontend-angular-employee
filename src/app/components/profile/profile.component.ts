import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from 'aws-amplify';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';
import { Profile } from '../profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  //
  profile?: Profile;

  username?: string;
  email?: string;
  empCount?: number;
  perJobNum?: number;
  //
  empNumberLoad = false;
  perJobCount = false;
  //
  editMode = false;
  constructor(
    private empService: EmployeeService,
    private userService: UserService,
    private fb: FormBuilder,
    private profileService: ProfileService
  ) { }

  myForm!: FormGroup;

  ngOnInit(): void {
    //
    //
    this.initForm();
    Auth.currentAuthenticatedUser()
      .then((res) => {
        this.username = res.username;
        this.email = res.attributes.email;
        this.getEmployeesNumber();
        this.initJobCount();
      })
      .then((res) => {
        this.profileService
          .getProfileByUserEmail(this.email!)
          .subscribe((profile: Profile) => {
            this.profile = profile;
            //console.log(this.profile);
          });
      })
      .catch();
  }

  //form handles
  public initForm(): void {
    this.myForm = this.fb.group({
      position: [
        this.profile?.position,
        [Validators.required, Validators.maxLength(20)]
      ],
      age: [
        this.profile?.age == 0 ? '' : this.profile?.age,
        [Validators.required, Validators.min(1), Validators.max(999)]
      ],
      phone: [
        this.profile?.phone,
        [Validators.required, Validators.maxLength(8)]
      ],
      company: [
        this.profile?.company,
        [Validators.required, Validators.maxLength(20), Validators.minLength(2)]
      ]
    });
  }

  //edit profile details
  public toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.initForm();
    }
  }
  public confirm(): void {
    this.profileService.updateProfile(this.email!, this.myForm.value).subscribe(
      (res: Profile) => {
        this.profile = res;
      },
      (error) => {
        // console.log(error.message);
      }
    );
  }
  //Form Warning and validation styling
  public inputOnChange(
    label: any,
    input: any,
    smallError: any,
    smallEmpty: any,
    divName: string
  ): void {
    if (this.myForm.get(divName)?.invalid) {
      input.style.borderColor = 'red';
      if (this.myForm.get(divName)?.value?.length == 0) {
        smallEmpty.style.display = 'block';
        smallError.style.display = 'none';
        smallEmpty.style.color = 'red';
      } else {
        smallError.style.display = 'block';
        smallEmpty.style.display = 'none';
      }

      smallError.style.color = 'red';
    } else {
      input.style.borderColor = 'green';
      smallError.style.display = 'none';
      smallEmpty.style.display = 'none';
    }
  }

  public getEmployeesNumber(): void {
    this.userService.getUserByEmail(this.email!).subscribe((res) => {
      this.empService.getEmployees(res.id!).subscribe((res) => {
        this.empCount = res.length;
        this.perJobNum = res.length;
        this.empNumberLoad = true;
      });
    });
  }
  array: any = { All: 0, Java: 0, Dart: 0, 'C++': 0, JavaScript: 0, Python: 0 };
  public initJobCount(): void {
    for (const key in this.array) {
      if (key == 'All') continue;
      this.getEmployeesByJob(key);
      // Use `key` and `value`
    }
  }

  public selectJob(sel: any): void {
    const value = sel.options[sel.selectedIndex].text;
    //console.log(value);
    this.perJobNum = this.array[value];
  }

  public sum(obj: any): number {
    let sum = 0;
    for (const el in obj) {
      if (obj.hasOwnProperty(el)) {
        sum += parseFloat(obj[el]);
      }
    }
    return sum;
  }
  public getEmployeesByJob(selectedValue: any): void {
    //console.log(selectedValue);
    this.userService.getUserByEmail(this.email!).subscribe((res) => {
      this.empService
        .getEmployeesByJobTitle(res.id!, selectedValue!)
        .subscribe((res) => {
          //alert(res.length);
          this.perJobCount = true;
          this.array[selectedValue] = res.length;
          if (selectedValue == 'Python') {
            this.perJobCount = true;
            this.array['All'] = this.sum(this.array);
            //console.table(this.array);
          }
        });
    });
  }
}
