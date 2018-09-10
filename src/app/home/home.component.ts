import { Component, OnInit, ViewChild } from "@angular/core";
import { TablesService } from "../services/tables.service";
import { ExecutionOptionsDialogService } from "./execution-dialog-options/execution-options-dialog.service";
import { MatCheckbox } from "@angular/material";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  providers: [ExecutionOptionsDialogService]
})
export class HomeComponent implements OnInit {
  //@ViewChild('myCheckbox') private myCheckbox: MatCheckbox;
  constructor(
    private _tableService: TablesService,
    public execDialog: ExecutionOptionsDialogService
  ) {}

  ngOnInit() {
    this._tableService.getTableNames();
  }

  openExecDialog(check: MatCheckbox) {
    this.execDialog
    .confirm()
    .subscribe(result =>{
      check.checked = !check.checked
      if(result) {
      }
    })
  }
}
