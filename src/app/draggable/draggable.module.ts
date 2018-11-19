import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from './draggable.directive';
import { DraggablerxDirective } from './draggablerx.directive';
import { MoveableDirective } from './moveable.directive';
import { MoveableAreaDirective } from './moveable-area.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DraggableDirective, DraggablerxDirective, MoveableDirective, MoveableAreaDirective],
  exports:[DraggableDirective,DraggablerxDirective,MoveableDirective,MoveableAreaDirective]
})
export class DraggableModule { }
