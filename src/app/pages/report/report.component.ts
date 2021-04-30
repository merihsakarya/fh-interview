import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

import { TransactionService } from '@shared/services/transaction.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  @ViewChild('reportForm', { static: false }) reportForm: NgForm;

  reports: ReportResponseModel[] = [];
  reportsLoading: boolean;
  reportRequestModel: ReportRequestModel = {} as ReportRequestModel;

  pageIndex = 1;
  pageSize = 10;
  total = 1;

  dateFormat = 'yyyy/MM/dd';
  selectedDate: Date[];

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService) { }

  ngOnInit() {
  }

  listReports() {
    this.validateReportForm();
    if (this.reportForm.invalid) {
      return;
    }

    this.reportsLoading = true;
    this.transactionService.listTransactionReports(this.reportRequestModel)
      .subscribe((response: StatusResponseModel<ReportResponseModel>) => {
        this.reports = response.response;
        this.reportsLoading = false;
      }, err => {
        this.reportsLoading = false;
        console.log('fetch report list error', err);
      });
  }

  onRangePickerChange(result: Date[]) {
    this.selectedDate = result;
    this.reportRequestModel.fromDate = this.selectedDate[0];
    this.reportRequestModel.toDate = this.selectedDate[1];
  }

  validateReportForm(): void {
    for (const i in this.reportForm.controls) {
      if (this.reportForm.controls.hasOwnProperty(i)) {
        this.reportForm.controls[ i ].markAsDirty();
        this.reportForm.controls[ i ].updateValueAndValidity();
      }
    }
  }

}
