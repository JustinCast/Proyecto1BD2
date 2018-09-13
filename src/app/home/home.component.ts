import { Component, OnInit } from "@angular/core";
import { TablesService } from "../services/tables.service";
import { ExecutionOptionsDialogService } from "./execution-dialog-options/execution-options-dialog.service";
import { MatCheckbox, MatCheckboxChange } from "@angular/material";
import { Table } from "../models/Table";
import { speedDialFabAnimations } from "./speed-dial-fab-animations";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  providers: [ExecutionOptionsDialogService],
  animations: speedDialFabAnimations
})
export class HomeComponent implements OnInit {
  disabled: boolean = true;
  private selectedTables: Array<Table> = [];
  private selectedCheckboxes: Array<MatCheckbox> = [];
  constructor(
    private _tableService: TablesService,
    public execDialog: ExecutionOptionsDialogService
  ) {}

  ngOnInit() {
    this._tableService.getTableNames();
  }

  selectOrDeselectTable(check: MatCheckbox, index: number) {
    if (!check.checked) {
      this.selectedTables.unshift(this._tableService.extractedTables[index]);
      this.selectedCheckboxes.unshift(check);
    } else {
      this.selectedTables.splice(
        this.selectedTables.findIndex(
          t => t === this._tableService.extractedTables[index]
        ),
        1
      );
      this.selectedCheckboxes.splice(
        this.selectedCheckboxes.findIndex(c => c === check),
        1
      );
    }
    this.manageDisabled();
  }

  manageDisabled(): void {
    if (this.selectedTables.length !== 0) this.disabled = false;
    else this.disabled = true;
  }

  openExecDialog() {
    this.execDialog.confirm(this.selectedTables).subscribe(result => {
      if (result) {
      }
      this.deSelectChecboxes();
      this.manageDisabled();
    });
  }

  deSelectChecboxes() {
    this.selectedCheckboxes.forEach(c => {
      this.selectOrDeselectTable(c, this.selectedCheckboxes.findIndex(ch => ch === c));
      c.checked = false
    });
  }
}
