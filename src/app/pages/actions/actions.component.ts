import { Component, OnInit } from '@angular/core';
import { IActionResponse } from 'src/app/shared/interfaces/action/action.interface';
import { ActionService } from 'src/app/shared/services/action/action.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  public actions:Array<IActionResponse> = []

  constructor(
   public actionService:ActionService
  ) { }

  ngOnInit(): void {
    this.allActions()
  }

  allActions():void{
    this.actionService.getAll().subscribe(data=>this.actions = data)
  }

}
