import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router"

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  searchWord: string = "";

  constructor(private route: Router) {


  }

  ngOnInit(): void {

  }


  public onSearchType(searchWord: string) {
    if (searchWord == "") {
      this.route.navigate(["/employee"]);
      return;
    }
    if (this.route.url == "/employee" || this.route.url.includes("/employee/search/")
      || this.route.url.includes("/employee/jobs/")) {
      this.route.navigate([`/employee/search/${searchWord}`]);
    }


  }
  public clear() {
    if (this.route.url == "/employee" || this.route.url.includes("/employee/search/")
      || this.route.url.includes("/employee/jobs/")) {
      this.route.navigate([`/employee`]);
    }
  }



}
