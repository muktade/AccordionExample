import { trigger, state, style, transition, animate } from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  QueryList,
} from '@angular/core';
import { map } from 'rxjs/operators';
import { merge, of } from 'rxjs';
import { AccordionItem } from '../directives/accordion-item.directive';
import * as memoizee from 'memoizee';

@Component({
  selector: 'accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('contentExpansion', [
      state('expanded', style({ height: '*', opacity: 1, visibility: 'visible' })),
      state('collapsed', style({ height: '0px', opacity: 0, visibility: 'hidden' })),
      transition('expanded <=> collapsed', animate('300ms cubic-bezier(.37,1.04,.68,.98)')),
    ]),
  ],
})
export class AccordionComponent implements AfterViewInit {
  expanded = new Set<number>();

  @Input() collapsing = true;

  @ContentChildren(AccordionItem) items: QueryList<AccordionItem>;

  constructor(private readonly cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    merge(this.items.changes, of(this.items))
      .pipe(map(() => this.items.toArray()))
      .subscribe((items) => {
        items.forEach((item, index) => {
          if (item.expanded) {
            this.expanded.add(index);
          }
        });
        this.cdr.detectChanges();
      });
  }

  getToggleState = memoizee((index: number) => {
    return this.toggleState.bind(this, index);
  });

  toggleState = (index: number) => {
    this.expanded.has(index) ? this.expanded.delete(index) : this.expanded.add(index);
    // if (this.expanded.has(index)) {
    //   this.expanded.delete(index);
    // } else {
    //   // if (this.collapsing) { 
    //   //   this.expanded.clear();
    //   // }
    //   this.expanded.add(index);
    // }
  };
}
