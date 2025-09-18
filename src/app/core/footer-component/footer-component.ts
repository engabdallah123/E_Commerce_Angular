import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import lottie from 'lottie-web';

@Component({
  selector: 'app-footer-component',
  imports: [],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.css',
})
export class FooterComponent implements OnInit {
  @ViewChild('anim', { static: true })
  anim!: ElementRef;

  ngOnInit() {
    lottie.loadAnimation({
      container: this.anim.nativeElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'Order.json',
    });
  }
}
