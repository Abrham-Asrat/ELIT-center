import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: string;
  name: string;
  role: string;
  department: string;
  workType: string;
}

interface Appointment {
  id: string;
  time: string;
  duration: string;
  patientName: string;
  service: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed';
  phone: string;
}

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
  appointmentTime?: string;
  appointmentStatus?: 'ongoing' | 'pending' | 'completed';
}

interface WaitingPatient {
  name: string;
  service: string;
  waitTime: string;
}

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  service: string;
  text: string;
  date: string;
  approved: boolean;
}

interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  completed: boolean;
}

interface PatientHistory {
  id: string;
  patientId: string;
  date: string;
  service: string;
  doctor: string;
  notes: string;
}

@Component({
  selector: 'app-tab-content',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.scss'],
})
export class TabContentComponent {
  @Input() activeTab: string = 'appointments';
  @Input() currentUser: User = {
    id: '',
    name: '',
    role: '',
    department: '',
    workType: '',
  };
  
  @Input() todayAppointmentsList: Appointment[] = [];
  @Input() waitingList: WaitingPatient[] = [];
  @Input() patients: Patient[] = [];
  @Input() testimonials: Testimonial[] = [];
  @Input() myTasks: Task[] = [];
  
  @Input() serviceOptions: string[] = [];
  @Input() timeOptions: string[] = [];
  
  @Input() totalTasks: number = 0;
  @Input() completedTasksCount: number = 0;
  @Input() pendingTasksCount: number = 0;
  @Input() overdueTasks: number = 0;
  
  @Input() showNewAppointmentForm: boolean = false;
  @Input() showViewAppointmentModal: boolean = false;
  @Input() showRescheduleModal: boolean = false;
  @Input() showAddPatientModal: boolean = false;
  @Input() showPatientHistoryModal: boolean = false;
  @Input() showScheduleFollowUpModal: boolean = false;
  @Input() showAddTaskModal: boolean = false;
  
  @Input() newAppointment: any = {};
  @Input() newPatient: any = {};
  @Input() followUpData: any = {};
  @Input() rescheduleData: any = {};
  @Input() newTask: any = {};
  @Input() viewedAppointment: Appointment | null = null;
  @Input() viewedPatient: Patient | null = null;
  @Input() patientSearch: string = '';
  
  @Input() patientHistory: PatientHistory[] = [];
  
  @Output() switchTab = new EventEmitter<string>();
  @Output() addAppointment = new EventEmitter<void>();
  @Output() saveNewAppointment = new EventEmitter<void>();
  @Output() cancelNewAppointment = new EventEmitter<void>();
  @Output() viewAppointment = new EventEmitter<string>();
  @Output() closeViewAppointmentModal = new EventEmitter<void>();
  @Output() reschedule = new EventEmitter<string>();
  @Output() saveReschedule = new EventEmitter<void>();
  @Output() cancelReschedule = new EventEmitter<void>();
  @Output() markComplete = new EventEmitter<string>();
  @Output() showAddPatientForm = new EventEmitter<void>();
  @Output() saveNewPatient = new EventEmitter<void>();
  @Output() cancelAddPatient = new EventEmitter<void>();
  @Output() searchPatients = new EventEmitter<void>();
  @Output() viewPatientHistory = new EventEmitter<string>();
  @Output() closePatientHistoryModal = new EventEmitter<void>();
  @Output() scheduleFollowUp = new EventEmitter<string>();
  @Output() saveFollowUp = new EventEmitter<void>();
  @Output() cancelScheduleFollowUp = new EventEmitter<void>();
  @Output() approveTestimonial = new EventEmitter<string>();
  @Output() rejectTestimonial = new EventEmitter<string>();
  @Output() addTask = new EventEmitter<void>();
  @Output() saveNewTask = new EventEmitter<void>();
  @Output() cancelAddTask = new EventEmitter<void>();
  @Output() toggleTask = new EventEmitter<string>();
  @Output() editTask = new EventEmitter<string>();
  @Output() deleteTask = new EventEmitter<string>();
  
  isActiveTab(tabName: string): boolean {
    return this.activeTab === tabName;
  }
  
  onTaskToggle(taskId: string): void {
    this.toggleTask.emit(taskId);
  }
}