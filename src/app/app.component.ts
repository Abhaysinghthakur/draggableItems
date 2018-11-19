import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'draggableProject';

  boxes:string[] = ['box 1','box 2']

  onDragStart= ():void =>{
    console.log('start');
  }

  onDragMove= (event:PointerEvent):void =>{
    console.log(`move ${event.clientX} ${event.clientY} `);
  }

  onDragEnd= ():void =>{
    console.log('end');
  }

  addBox = ()=>{
    this.boxes.push('new Box');
  }
}
