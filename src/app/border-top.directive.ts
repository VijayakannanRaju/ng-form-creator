import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: '[borderTopHighlight]',
    standalone: true
})
export class BorderTopDirective {

    private dragCounter = 0;


    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) {

    }

    @HostListener('dragenter', ['$event'])
    onDragEnter(event: DragEvent) {
        // console.log('Enter : Visibility of top highlight set to visible');

        event.preventDefault();
        event.stopPropagation();

        this.dragCounter++;

        if (this.dragCounter === 1) {

            // const highlightDiv = this.renderer.createElement('div');

            // this.renderer.addClass(highlightDiv, 'top-highlight');
            // this.renderer.appendChild(this.el.nativeElement, highlightDiv);
            if (this.el.nativeElement.querySelector('.top-highlight')) {
                this.renderer.setStyle(this.el.nativeElement.querySelector('.top-highlight'), 'visibility', 'visible');
            }

        }
        // this.renderer.setStyle(this.el.nativeElement, 'border-top', '20px pink solid');

    }


    @HostListener('dragleave', ['$event'])
    onDragExit(event: DragEvent) {
        // console.log('Exit : Visibility of top highlight set to hidden');
        event.preventDefault();
        event.stopPropagation();

        this.dragCounter--;

        if (this.dragCounter === 0) {
            if (this.el.nativeElement.querySelector('.top-highlight')) {
                this.renderer.setStyle(this.el.nativeElement.querySelector('.top-highlight'), 'visibility', 'hidden');
            }
        }
        // this.renderer.removeChild(this.el.nativeElement, this.el.nativeElement.querySelector('.top-highlight'));

        // this.renderer.setStyle(this.el.nativeElement, 'border-top', 'none');

    }


    @HostListener('drop', ['$event'])
    @HostListener('dragend', ['$event'])
    onDrop(event: DragEvent) {
        event.preventDefault();
        // event.stopPropagation();
        this.dragCounter--;

        if (this.dragCounter === 0) {

            if (this.el.nativeElement.querySelector('.top-highlight')) {
                this.renderer.setStyle(this.el.nativeElement.querySelector('.top-highlight'), 'visibility', 'hidden');
            }
        }
        // this.renderer.removeChild(this.el.nativeElement, this.el.nativeElement.querySelector('.top-highlight'));

        // this.renderer.setStyle(this.el.nativeElement, 'border-top', 'none');

    }


}