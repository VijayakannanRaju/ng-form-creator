import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: '[borderTopHighlight]',
    standalone: true
})
export class BorderTopDirective {

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) {

    }

    @HostListener('dragenter', ['$event'])
    onDragEnter(event: DragEvent) {
        console.log('Drag enter before placeholder');

        event.preventDefault();
        event.stopPropagation();



        this.renderer.setStyle(this.el.nativeElement, 'border-top', '10px pink solid');

    }


    @HostListener('dragleave', ['$event'])
    onDragExit(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();



        this.renderer.setStyle(this.el.nativeElement, 'border-top', 'none');

    }


    @HostListener('drop', ['$event'])
    @HostListener('dragend', ['$event'])
    onDrop(event: DragEvent) {
        event.preventDefault();
        // event.stopPropagation();



        this.renderer.setStyle(this.el.nativeElement, 'border-top', 'none');

    }


}