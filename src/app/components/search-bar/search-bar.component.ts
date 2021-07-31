import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"

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
    this.route.navigate([`/employee/search/${searchWord}`]);

  }
  public clear() {
    this.route.navigate([`/employee`]);
  }



}
