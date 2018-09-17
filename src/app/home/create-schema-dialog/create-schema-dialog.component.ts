import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { SchemaService } from "../../services/schema.service";

@Component({
  selector: "app-create-schema-dialog",
  templateUrl: "./create-schema-dialog.component.html",
  styleUrls: ["./create-schema-dialog.component.scss"]
})
export class CreateSchemaDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreateSchemaDialogComponent>,
    private schemaService: SchemaService
  ) {}

  ngOnInit() {}

  onSubmit(schema: string) {
    console.log(schema);
    this.schemaService.loading = true;
    this.schemaService.createSchema(schema);
  }
}
