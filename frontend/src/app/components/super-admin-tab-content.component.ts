import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface StaffMember {
  id: string;
  name: string;
  role: 'Super Admin' | 'Sub Admin' | 'Staff';
  department: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  avatar: string;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  lastVisit: string;
  totalVisits: number;
  status: 'active' | 'inactive';
}

interface Activity {
  description: string;
  time: string;
  type: 'success' | 'warning' | 'info' | 'danger';
  icon: string;
}

interface PaymentMethod {
  name: string;
  percentage: number;
}

interface LabTestType {
  id: string;
  name: string;
  standardPrice: number;
  alternativePrice: number;
}

@Component({
  selector: 'app-super-admin-tab-content',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './super-admin-tab-content.component.html',
  styleUrls: ['./super-admin-tab-content.component.scss'],
})
export class SuperAdminTabContentComponent {
  @Input() activeTab: string = 'overview';

  @Input() staffMembers: StaffMember[] = [];
  @Input() patients: Patient[] = [];
  @Input() recentActivities: Activity[] = [];
  @Input() paymentMethods: PaymentMethod[] = [];
  @Input() labTestTypes: LabTestType[] = [];

  @Input() totalAppointments: number = 0;
  @Input() newAppointments: number = 0;
  @Input() totalPatients: number = 0;
  @Input() activePatients: number = 0;
  @Input() totalStaff: number = 0;
  @Input() activeStaff: number = 0;
  @Input() monthlyRevenue: number = 0;
  @Input() yearlyRevenue: number = 0;
  @Input() averagePerPatient: number = 0;
  @Input() revenueGrowth: number = 0;

  // Private variables to hold the actual values
  private _patientSearchTerm: string = '';
  private _patientFilter: string = '';

  // Use getters and setters to automatically trigger search/filter
  @Input()
  get patientSearchTerm(): string {
    return this._patientSearchTerm;
  }
  set patientSearchTerm(value: string) {
    this._patientSearchTerm = value;
    this.onSearch();
  }

  @Input()
  get patientFilter(): string {
    return this._patientFilter;
  }
  set patientFilter(value: string) {
    this._patientFilter = value;
    this.onFilter();
  }

  @Input() showStaffModal: boolean = false;
  @Input() showReportModal: boolean = false;
  @Input() showBackupModal: boolean = false;
  @Input() showLabTestModal: boolean = false;

  @Input() editingStaff: boolean = false;
  @Input() isGeneratingReport: boolean = false;
  @Input() isBackingUp: boolean = false;

  @Input() newStaff: any = {
    name: '',
    role: 'Staff',
    department: '',
    email: '',
    phone: '',
    password: '',
    workType: '',
  };

  @Input() reportType: string = 'daily';
  @Input() reportStartDate: string = '';
  @Input() reportEndDate: string = '';

  @Input() newLabTestType: any = {
    name: '',
    standardPrice: 0,
    alternativePrice: 0,
  };

  @Input() editingLabTestType: LabTestType | null = null;

  // Add viewed patient state
  viewedPatient: Patient | null = null;
  showViewPatientModal: boolean = false;

  @Output() switchTab = new EventEmitter<string>();
  @Output() addNewStaff = new EventEmitter<void>();
  @Output() editStaff = new EventEmitter<string>();
  @Output() deactivateStaff = new EventEmitter<string>();
  @Output() viewPatientRecord = new EventEmitter<string>();
  @Output() scheduleAppointment = new EventEmitter<string>();
  @Output() showAddStaffForm = new EventEmitter<void>();
  @Output() showEditStaffForm = new EventEmitter<StaffMember>();
  @Output() saveStaff = new EventEmitter<void>();
  @Output() closeStaffModal = new EventEmitter<void>();
  @Output() approveTestimonial = new EventEmitter<string>();
  @Output() rejectTestimonial = new EventEmitter<string>();
  @Output() removeTestimonial = new EventEmitter<string>();
  @Output() viewPatientHistory = new EventEmitter<string>();
  @Output() downloadPatientList = new EventEmitter<void>();
  @Output() showReportModalFunc = new EventEmitter<void>();
  @Output() closeReportModal = new EventEmitter<void>();
  @Output() generateReport = new EventEmitter<void>();
  @Output() showAddLabTestForm = new EventEmitter<void>();
  @Output() showEditLabTestForm = new EventEmitter<LabTestType>();
  @Output() saveLabTestType = new EventEmitter<void>();
  @Output() deleteLabTestType = new EventEmitter<string>();
  @Output() closeLabTestModal = new EventEmitter<void>();
  @Output() closeBackupModal = new EventEmitter<void>();
  @Output() performBackup = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();
  @Output() goHome = new EventEmitter<void>();
  @Output() goToAdminSelection = new EventEmitter<void>();
  @Output() refreshDashboard = new EventEmitter<void>();

  // Add search and filter outputs
  @Output() searchPatients = new EventEmitter<string>();
  @Output() filterPatients = new EventEmitter<string>();

  isActiveTab(tabName: string): boolean {
    return this.activeTab === tabName;
  }

  // Method to trigger search
  onSearch() {
    this.searchPatients.emit(this._patientSearchTerm);
  }

  // Method to trigger filter
  onFilter() {
    this.filterPatients.emit(this._patientFilter);
  }

  // Method to view patient details
  viewPatient(id: string) {
    // Find the patient by ID
    const patient = this.patients.find((p) => p.id === id);
    if (patient) {
      this.viewedPatient = patient;
      this.showViewPatientModal = true;
      // Emit event to parent component
      this.viewPatientRecord.emit(id);
    }
  }

  // Method to close the view patient modal
  closeViewPatientModal() {
    this.showViewPatientModal = false;
    this.viewedPatient = null;
  }
}
