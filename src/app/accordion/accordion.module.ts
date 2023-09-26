import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { AccordionItem } from "./directives/accordion-item.directive";
import { AccordionContent } from "./directives/accordion-content.directive";
import { AccordionTitle } from "./directives/accordion-title.directive";
import { AccordionHeader } from "./directives/accordion-header.directive";
import { AccordionComponent } from "./accordion/accordion.component";

@NgModule({
  declarations: [
    AccordionComponent,
    AccordionItem,
    AccordionContent,
    AccordionTitle,
    AccordionHeader
  ],
  imports: [CommonModule],
  exports: [
    AccordionComponent,
    AccordionItem,
    AccordionContent,
    AccordionTitle,
    AccordionHeader
  ]
})
export class AccordionModule {}
