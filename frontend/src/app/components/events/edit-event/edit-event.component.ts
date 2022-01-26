import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { EventService } from 'src/app/service/event/event.service';
import { EventEntry } from 'src/app/model/event-entry.interface';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
})
export class EditEventComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    readonly authService: AuthenticationService,
    private eventService: EventService,
    private router: Router
  ) {}

  eventId: any = location.href.split('update-event/')[1];
  ngOnInit(): void {
    this.form = this.formbuilder.group({
      id: [{ value: null, disabled: true }, [Validators.required]],
      eventBody: [null, [Validators.required]],
      eventTitle: [null, [Validators.required]],
      eventDescription: [null, [Validators.required]],
      eventPrice: [null, [Validators.pattern('^[0-9]*$')]],
      dueDate: [null, [Validators.required]],
      eventImage: [null],
    });
    this.eventService
      .findOne(Number(this.eventId))
      .pipe(
        tap((event: EventEntry) => {
          this.form.patchValue({
            id: event.id,
            eventBody: event.eventBody,
            eventTitle: event.eventTitle,
            eventDescription: event.eventDescription,
            eventImage: event.eventImage,
            eventPrice: event.eventPrice,
            dueDate: event.dueDate,
          });
        })
      )
      .subscribe();
  }
  update() {
    this.eventService.updateOne(this.form.getRawValue()).subscribe();
    this.router.navigateByUrl('/events');
  }
  config = {
    toolbar: [['bold', 'italic', 'underline', 'strike']],
  };
}
