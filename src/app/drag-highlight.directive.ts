import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: '[dragHighlight]',
    standalone: true
})
export class HighlightDirective {
    private originalBackground: string | null = null;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) {

    }

    @HostListener('dragenter', ['$event'])
    onDragEnter(event: DragEvent) {

        event.preventDefault();
        event.stopPropagation();

        if (this.originalBackground === null) {
            this.originalBackground = this.el.nativeElement.style.backgroundColor;
        }

        this.renderer.setStyle(this.el.nativeElement, 'background-color', '#e0f7fa');

    }


    @HostListener('dragleave', ['$event'])
    onDragExit(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();



        this.renderer.setStyle(this.el.nativeElement, 'background-color', this.originalBackground || '');

    }


    @HostListener('drop', ['$event'])
    @HostListener('dragend', ['$event'])
    onDrop(event: DragEvent) {
        event.preventDefault();
        // event.stopPropagation();



        this.renderer.setStyle(this.el.nativeElement, 'background-color', this.originalBackground || '');

    }


}