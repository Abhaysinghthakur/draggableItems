import { Directive, HostBinding, HostListener, Output,EventEmitter, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap,takeUntil, repeat,take } from 'rxjs/operators'; 

@Directive({
  selector: '[appDraggablerx]'
})
export class DraggablerxDirective implements OnInit{

  @HostBinding('class.draggable') draggable = true;
  @HostBinding('class.dragging') dragging: boolean = false;


  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent>();

  private pointerDown = new Subject<PointerEvent>();
  private pointerMove = new Subject<PointerEvent>();
  private pointerUp = new Subject<PointerEvent>();

  @HostListener('pointerdown',['$event'])
  onPointerDown(event:PointerEvent):void{
    this.pointerDown.next(event);
  }

  @HostListener('document:pointermove',['$event'])
  onpointerMove(event:PointerEvent):void{
    this.pointerMove.next(event);
  }

  @HostListener('document:pointerup',['$event'])
  onPointerUp(event:PointerEvent):void{
    this.pointerUp.next(event);
  }

  ngOnInit():void{

    this.pointerDown.asObservable().subscribe(
      event=>{
        this.dragStart.emit(event);
        this.dragging = true;
      }
    );

    const dragMoves = this.pointerDown.pipe(
      switchMap(()=>this.pointerMove),
      takeUntil(this.pointerUp),
      repeat()
    ).subscribe(
      event=>this.dragMove.emit(event)
    );

    const dragEnds = this.pointerDown.pipe(
      switchMap(()=>this.pointerUp),
      take(1),
      repeat()
    ).subscribe(
      event=>{
        this.dragEnd.emit(event);
        this.dragging = false;
      }
    );
  }

}
