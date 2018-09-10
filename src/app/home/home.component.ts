import { Component, OnInit } from "@angular/core";
import { TablesService } from "../services/tables.service";
import { ExecutionOptionsDialogService } from "./execution-dialog-options/execution-options-dialog.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  providers: [ExecutionOptionsDialogService]
})
export class HomeComponent implements OnInit {
  constructor(
    private _tableService: TablesService,
    public execDialog: ExecutionOptionsDialogService
  ) {}

  ngOnInit() {
    this._tableService.getTableNames();
  }

  openExecDialog() {
    this.execDialog
    .confirm()
    .subscribe(result =>{
      console.log(result)
      if(result) {
      }
    })
  }
}
