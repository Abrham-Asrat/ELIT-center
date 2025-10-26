import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Patient {
  id: string;
  name: string;
  age: number;
  phone: string;
  lastVisit: string;
  status: 'active' | 'inactive' | 'discharged';
  bloodType: string;
  allergies: string;
  medicalHistory: string;
  currentMedications: string[];
  labTests: any[];
  prescriptions: any[];
  appointmentTime: string; // Added for sorting by time
  appointmentStatus: 'ongoing' | 'pending' | 'completed'; // Added for status tracking
}

@Component({
  selector: 'app-doctor-patient',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="doctor-patient-card">
      <div class="patient-header">
        <h6 class="patient-name">{{ patient.name }}</h6>
        <span class="patient-id">ID: {{ patient.id }}</span>
      </div>
      <div class="patient-info">
        <p><i class="fas fa-clock me-2"></i>{{ patient.appointmentTime }}</p>
        <p>
          <i class="fas fa-birthday-cake me-2"></i>{{ patient.age }} years old
        </p>
        <p><i class="fas fa-phone me-2"></i>{{ patient.phone }}</p>
        <p>
          <span
            class="badge"
            [class.bg-success]="patient.appointmentStatus === 'ongoing'"
            [class.bg-warning]="patient.appointmentStatus === 'pending'"
            [class.bg-secondary]="patient.appointmentStatus === 'completed'"
          >
            {{ patient.appointmentStatus | titlecase }}
          </span>
        </p>
      </div>
      <div class="patient-actions">
        <button class="btn btn-sm btn-primary" (click)="viewDetails()">
          <i class="fas fa-history"></i> Details
        </button>
        <button class="btn btn-sm btn-success" (click)="addInfo()">
          <i class="fas fa-plus-circle"></i> Add Info
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .doctor-patient-card {
        border: 1px solid #dee2e6;
        border-radius: 0.375rem;
        padding: 1rem;
        margin-bottom: 1rem;
        background-color: #fff;
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
      }

      .patient-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #eee;
      }

      .patient-name {
        margin: 0;
        font-weight: 600;
      }

      .patient-id {
        font-size: 0.8rem;
        color: #6c757d;
      }

      .patient-info p {
        margin: 0.25rem 0;
        font-size: 0.9rem;
      }

      .patient-actions {
        display: flex;
        gap: 0.5rem;
        margin-top: 1rem;
      }

      .patient-actions .btn {
        flex: 1;
      }
    `,
  ],
})
export class DoctorPatientComponent {
  @Input() patient!: Patient;
  @Output() viewPatient = new EventEmitter<string>();
  @Output() addPatientInfo = new EventEmitter<string>();

  viewDetails() {
    this.viewPatient.emit(this.patient.id);
  }

  addInfo() {
    this.addPatientInfo.emit(this.patient.id);
  }
}
