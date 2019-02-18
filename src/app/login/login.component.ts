import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { MasterService } from '../../app/_services/masterdata.service'
import { environment } from '../../environments/environment';
import { FoundationList } from '../../app/_models/masterdata.model'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MasterService]
})
export class LoginComponent implements OnInit {
  searchFoundation: FormGroup;
  siteurl: string = environment.siteurl;
  listFoundation: FoundationList[];
  filteredlistFoundation: FoundationList[];
  foundationId: string;
  selectedFoundation: string[];
  navigationPath: string;
  public foundationFilterCtrl: FormControl = new FormControl();
  constructor(private fb: FormBuilder, private masterService: MasterService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.searchFoundation = this.fb.group({

      foundation: new FormControl('')

    });
    this.foundationFilterCtrl.valueChanges
    .subscribe(() => {
      this.filterFoundation();
    });
    this.getFoundationName();
    this.navigationPath = 'view'
  }
  private filterFoundation() {
    var newlist;
    if (!this.listFoundation) {
      return;
    }
    // get the search keyword
    let search = this.foundationFilterCtrl.value;
    if (!search) {

      this.filteredlistFoundation = this.listFoundation
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the userlist
    newlist =
      this.filteredlistFoundation = this.listFoundation.filter(item => item.Foundation_Name.toLowerCase().indexOf(search) > -1)

  }
  login() {
 
    localStorage.setItem('foundationId', JSON.stringify(this.selectedFoundation["Foundation_Id"]));
    localStorage.setItem('foundationName', JSON.stringify(this.selectedFoundation["Foundation_Name"]));
    this.router.navigate([this.navigationPath]);

  }
  getFoundationName() {
    this.foundationId = null;
    this.masterService.GetFoundationName(this.foundationId).subscribe(
      data => {
        this.listFoundation = data;
        this.filteredlistFoundation = data; 
      }
    )

  }

}