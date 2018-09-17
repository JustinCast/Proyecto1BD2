import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { SchemaService } from "../../services/schema.service";

@Component({
  selector: "app-create-schema-dialog",
  templateUrl: "./create-schema-dialog.component.html",
  styleUrls: ["./create-schema-dialog.component.scss"]
})
export class CreateSchemaDialogComponent implements OnInit {
  schema = '';
  constructor(
    public dialogRef: MatDialogRef<CreateSchemaDialogComponent>,
    private schemaService: SchemaService
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.schemaService.createSchema(this.schema);
  }
}
