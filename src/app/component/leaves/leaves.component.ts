import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service';
import { LeaveBalanceComponent } from './modal-forms/leave-balance/leave-balance.component';
import { LeaveRequestComponent } from './modal-forms/leave-request/leave-request.component';


@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.scss']
})
export class LeavesComponent implements OnInit {

  pendingList = [];
  approvalList = [];

  constructor(
    private _modalService: NgbModal,
    private _dataService: DataService) {}

  ngOnInit(): void {
    this.pendingLeaves();
    this.approvalLeaves();
    
  }

  leaveBanlence = ()=>{
    const modalRef = this._modalService.open(LeaveBalanceComponent,{size:'lg'})
  }

  addleave = ()=>{
    const modalRef = this._modalService.open(LeaveRequestComponent,{size:'lg'})
  }

  pendingLeaves = ()=>{
    this._dataService.getPendingLeaves().subscribe(res =>{
      console.log(res[0])
      if(res[0].status == 'success'){
        this.pendingList = res[0].data
      }
    })
  }
  approvalLeaves=() => {
    let data = {"empcode":"10225",
      "from_date":"01-01-2018",
      "to_date":"31-Jan-2022"
      }
    this._dataService.getApprovalLeaves(data).subscribe(res =>{
      console.log(res[0])
      if(res[0].status == 'success'){
        this.approvalList = res[0].data
      }
    })
  }

}
