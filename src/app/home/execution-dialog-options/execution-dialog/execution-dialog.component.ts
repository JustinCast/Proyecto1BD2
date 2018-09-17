import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatListOption,
  MatRadioButton
} from "@angular/material";
import { Table } from "../../../models/Table";
import { SchemaService } from "../../../services/schema.service";
import { Procedure } from "../../../models/Procedure";
import { ProcService } from "../../../services/proc.service";

@Component({
  selector: "app-execution-dialog",
  templateUrl: "./execution-dialog.component.html",
  styleUrls: ["./execution-dialog.component.scss"],
  providers: [SchemaService, ProcService]
})
export class ExecutionDialogComponent implements OnInit, OnDestroy {
  proc: Procedure = {};
  methods: Array<number> = [];
  options: Array<MatListOption> = [];
  selectedRadio: number;
  constructor(
    public dialogRef: MatDialogRef<ExecutionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public tables: Array<Table>,
    public _schemaService: SchemaService,
    public _procService: ProcService
  ) {}

  ngOnInit() {
    if (this._schemaService.schemas.length === 0)
      this._schemaService.getSchemas();
  }

  tableRadioClick(index: number, radio: MatRadioButton) {
    this.selectedRadio = radio.value;
    this.proc.tableSchema = this.tables[index].TABLE_SCHEMA;
    this.proc.table = this.tables[index].TABLE_NAME;
  }

  submit() {
    this.reset();
  }

  reset() {
    this.tables.splice(this.selectedRadio, 1);
    this.proc = {};
    console.log(this.options);
    this.methods = [];
    this.uncheckOptions();
  }

  methodsToCreate(method: number) {
    switch(method) {
      case 0:
        this._procService.building = true;
        this._procService.genInsertProc(this.proc);
        break;
      case 1:
        this._procService.building = true;
        this._procService.genUpdateProc(this.proc);
        break;
      case 2:
        this._procService.building = true;
        this._procService.genDeleteProc(this.proc);
        break;
      default: break;

    }
  }

  ngOnDestroy(): void {
    this.tables = [];
  }

  uncheckOptions() {
    this.options.forEach(o => (o.selected = false));
    this.options = [];
  }
}
