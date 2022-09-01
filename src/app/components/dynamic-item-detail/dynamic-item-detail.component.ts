import { Component, Input, OnInit } from '@angular/core';
import Game from '../../../../../common/src/models/game';

@Component({
  selector: 'app-dynamic-item-detail',
  templateUrl: './dynamic-item-detail.component.html',
  styleUrls: ['./dynamic-item-detail.component.scss'],
})
export class DynamicItemDetailComponent implements OnInit {
  @Input('item') item: Game;
  @Input('keys2show') keys2show: Array<string>;
  @Input('keysAlwaysReadOnly') keysAlwaysReadOnly: Array<string>;
  @Input('readonly') readonly: boolean;
  
  constructor() { }

  ngOnInit() { }

  public getEntries() {
    //if keys2show have keys return if not we show all of the object
    if(this.keys2show)
      return this.keys2show;
    return Object.keys(this.item);
  }

  public getItemType(prp: string) {
    if(typeof(this.item[prp]) == "number")
      return "number"
    return "string";
    //"date" ｜ "datetime-local" ｜ "email" ｜ "month" ｜ "number" ｜ "password" ｜ "search" ｜ "tel" ｜ "text" ｜ "time" ｜ "url" ｜ "week"
  }

}
