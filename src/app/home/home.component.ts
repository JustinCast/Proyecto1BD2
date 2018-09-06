import { Component, OnInit } from '@angular/core';
import { TablesService } from '../services/tables.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private _tableService: TablesService
  ) { }

  ngOnInit() {
    this._tableService.getTableNames()
  }

}
