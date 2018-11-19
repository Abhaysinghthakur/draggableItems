import { Directive, ContentChildren, QueryList, AfterContentInit, ElementRef, HostBinding } from '@angular/core';
import { MoveableDirective } from './moveable.directive';
import { Subscription } from 'rxjs';
import { DomSanitizer,SafeStyle } from '@angular/platform-browser';

interface Boundries {
  minX: number,
  maxX: number,
  minY: number,
  maxY: number
}

@Directive({
  selector: '[appMoveableArea]'
})
export class MoveableAreaDirective implements AfterContentInit {

  @ContentChildren(MoveableDirective) moveables: QueryList<MoveableDirective>;

  private boundries: Boundries;
  

  // @HostBinding('style.background') get background():SafeStyle{
  //   return this.sanitizer.bypassSecurityTrustStyle(
  //     // `translateX(${this.position.x}px) translateY(${this.position.y}px)`
  //     `blue`
  //     );
  // }

  private subscription: Subscription[] = [];

  constructor(private element: ElementRef,private sanitizer:DomSanitizer) { }

  ngAfterContentInit(): void {

    this.moveables.changes.subscribe(() => {
      this.subscription.forEach(x => x.unsubscribe());
      this.moveables.forEach((moveable) => {
        this.subscription.push(moveable.dragStart.subscribe(() => this.measureBoundries(moveable)));
        this.subscription.push(moveable.dragMove.subscribe(() => this.maintainBoundries(moveable)));
      });
    });

    this.moveables.notifyOnChanges();
  }

  private measureBoundries = (moveable) => {
    const viewRect = this.element.nativeElement.getBoundingClientRect();
    const moveableClientRect = moveable.element.nativeElement.getBoundingClientRect();
    this.boundries = {
      minX: viewRect.left - moveableClientRect.left + moveable.position.x,
      maxX: viewRect.right - moveableClientRect.right + moveable.position.x,
      minY: viewRect.top - moveableClientRect.top + moveable.position.y,
      maxY: viewRect.bottom - moveableClientRect.bottom + moveable.position.y,
    }
    console.log('measuring...');
  }

  private maintainBoundries = (moveable) => {
    moveable.position.x = Math.min(this.boundries.maxX, moveable.position.x);
    moveable.position.x = Math.max(this.boundries.minX, moveable.position.x);
    moveable.position.y = Math.min(this.boundries.maxY, moveable.position.y);
    moveable.position.y = Math.max(this.boundries.minY, moveable.position.y);
  }
}
