import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FeedBack, FeedbackServices } from '../../_services/feedback-services';
import Swal from 'sweetalert2';
// Define the Feedback interface


@Component({
  selector: 'app-message-component',
  imports: [CommonModule],
  templateUrl: './message-component.html',
  styleUrl: './message-component.css',
})
export class MessageComponent implements OnInit {
  filters: string[] = [
    'All Feedback',
    'Supportive',
    'Unsupportive',
    'Unresponded',
  ];
  currentFilter: string = 'All Feedback';
  feedbackData: FeedBack[] = [];
  filteredFeedback: FeedBack[] = [];
  totalMessages: number = 0;
  supportiveMessages: number = 0;
  unsupportiveMessages: number = 0;
  archivedFeedback: FeedBack[] = [];

  constructor(public feedBackServices: FeedbackServices) {
    this.updateStats();
  }

  ngOnInit(): void {
    this.feedBackServices.GetFeedBacks().subscribe({
      next: (res: any) => {
        // ترتيب الداتا عشان الأحدث ييجي الأول
        this.feedbackData = res.sort(
          (a: FeedBack, b: FeedBack) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        this.setFilter(this.currentFilter); // عشان تتحدث الفلترة
        this.updateStats();
      },
    });
  }

  updateStats(): void {
    this.totalMessages = this.feedbackData.length;
    this.supportiveMessages = this.feedbackData.filter(
      (f) => f.type === 'supportive'
    ).length;
    this.unsupportiveMessages = this.feedbackData.filter(
      (f) => f.type === 'unsupportive'
    ).length;
  }

  setFilter(filter: string): void {
    this.currentFilter = filter;

    switch (filter) {
      case 'Supportive':
        this.filteredFeedback = this.feedbackData.filter(
          (f) => f.type === 'supportive'
        );
        break;
      case 'Unsupportive':
        this.filteredFeedback = this.feedbackData.filter(
          (f) => f.type === 'unsupportive'
        );
        break;
      case 'Unresponded':
        this.filteredFeedback = this.feedbackData.filter((f) => !f.responded);
        break;
      default:
        this.filteredFeedback = this.feedbackData;
    }
  }

  getSupportiveCount(): number {
    return this.filteredFeedback
      ? this.filteredFeedback.filter((f) => f.type === 'supportive').length
      : 0;
  }

  getUnsupportiveCount(): number {
    return this.filteredFeedback
      ? this.filteredFeedback.filter((f) => f.type === 'unsupportive').length
      : 0;
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  }

  replyToFeedback(feedback: FeedBack): void {
    Swal.fire({
      title: 'Do you want to Replay From ' + feedback.customerName,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        feedback.responded = true;
        feedback.date = new Date();
        this.updateStats();
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

  resolveFeedback(feedback: FeedBack): void {
    Swal.fire({
      title: 'Do you want to Resolve feedback  From ' + feedback.customerName,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        feedback.responded = true;
        feedback.date = new Date();
        this.updateStats();
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

  archiveFeedback(feedback: FeedBack): void {
    Swal.fire({
      title: 'Archive this feedback?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.feedbackData = this.feedbackData.filter(
          (f) => f.id !== feedback.id
        );
        this.filteredFeedback = this.filteredFeedback.filter(
          (f) => f.id !== feedback.id
        );
        this.archivedFeedback.unshift(feedback);
        this.updateStats();
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
  restoreFeedback(feedback: FeedBack): void {
    this.feedbackData.unshift(feedback);
    this.archivedFeedback = this.archivedFeedback.filter(
      (f) => f.id !== feedback.id
    );

    this.setFilter(this.currentFilter);
    this.updateStats();
  }

  DeleteMessage(id: number) {
    Swal.fire({
      title: 'Delete this feedback?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.feedBackServices.DeleteMessage(id).subscribe({
          next: () => {
            // اعمل refresh من الـ API
            this.feedBackServices.GetFeedBacks().subscribe((res) => {
              this.feedbackData = res.sort(
                (a: FeedBack, b: FeedBack) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              );
              this.setFilter(this.currentFilter);
              this.updateStats();
            });
          },
        });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
}
