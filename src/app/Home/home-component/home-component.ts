import { CommonModule, JsonPipe } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import lottie from 'lottie-web';
import { FeedbackServices } from '../../_services/feedback-services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.css'],
  imports: [RouterLink, ReactiveFormsModule, CommonModule, FormsModule],
})
export class HomeComponent implements OnInit {
  useFeedBackForm: FormGroup;
  constructor(
    private router: Router,
    public feedBackServices: FeedbackServices
  ) {
    this.useFeedBackForm = new FormGroup({
      customerName: new FormControl(``),
      customerEmail: new FormControl(``),
      message: new FormControl(``),
      type: new FormControl(``),
    });
  }
  @ViewChild('anim', { static: true })
  anim!: ElementRef;

  ngOnInit() {
    lottie.loadAnimation({
      container: this.anim.nativeElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'shopping.json',
    });
  }
  AddFeedBack() {
    this.feedBackServices.PostFeedBack(this.useFeedBackForm.value).subscribe({
      next: () => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your Message Is Sent Successfully',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'my-swal',
          },
        });
      },
    });
  }
}
