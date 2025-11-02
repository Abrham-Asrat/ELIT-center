import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../services/language.service';
import { SuperAdminTabContentComponent } from '../components/super-admin-tab-content.component';
import {
  pageEnter,
  fadeIn,
  slideUp,
  scaleIn,
  staggerCards,
} from '../shared/animations';

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
  selector: 'app-super-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SuperAdminTabContentComponent,
  ],
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.scss'],
  animations: [pageEnter, fadeIn, slideUp, scaleIn, staggerCards],
})
export class SuperAdminComponent implements OnInit {
  // Active tab management
  activeTab = 'overview';

  // Dropdown state
  isDropdownOpen = false;

  // Statistics
  totalAppointments = 234;
  newAppointments = 12;
  totalPatients = 156;
  activePatients = 89;
  totalStaff = 8;
  activeStaff = 6;
  monthlyRevenue = 25600;
  yearlyRevenue = 184200;
  averagePerPatient = 165;
  revenueGrowth = 15;

  // Search and filter
  patientSearchTerm = '';
  patientFilter = '';

  // Store original patient list for search functionality
  originalPatients: Patient[] = [];

  // Modal states
  showStaffModal = false;
  showReportModal = false;
  showBackupModal = false;
  editingStaff = false;
  isGeneratingReport = false;
  isBackingUp = false;

  // Add new properties for enhanced functionality
  reportType: string = 'daily';
  reportStartDate: string = '';
  reportEndDate: string = '';

  // Add form data for staff management
  newStaff: any = {
    name: '',
    role: 'Staff',
    department: '',
    email: '',
    phone: '',
    password: '',
    workType: '', // Added work type
  };

  staffMembers: StaffMember[] = [
    {
      id: '1',
      name: 'Dr. Abiy Tekle',
      role: 'Super Admin',
      department: 'Administration',
      status: 'active',
      lastLogin: '2024-01-15 14:30',
      avatar: './images/dr.jpg',
    },
    {
      id: '2',
      name: 'Nurse Sarah Johnson',
      role: 'Sub Admin',
      department: 'Nursing',
      status: 'active',
      lastLogin: '2024-01-15 13:45',
      avatar: './images/staff-avatar.png',
    },
    {
      id: '3',
      name: 'Receptionist Mary Wilson',
      role: 'Staff',
      department: 'Reception',
      status: 'active',
      lastLogin: '2024-01-15 08:00',
      avatar: './images/staff-avatar.png',
    },
    {
      id: '4',
      name: 'Technician John Smith',
      role: 'Staff',
      department: 'Laboratory',
      status: 'active',
      lastLogin: '2024-01-14 17:30',
      avatar: './images/staff-avatar.png',
    },
  ];

  patients: Patient[] = [
    {
      id: 'P001',
      name: 'Michael Brown',
      age: 45,
      lastVisit: '2024-01-10',
      totalVisits: 8,
      status: 'active',
    },
    {
      id: 'P002',
      name: 'Emily Davis',
      age: 32,
      lastVisit: '2024-01-08',
      totalVisits: 3,
      status: 'active',
    },
    {
      id: 'P003',
      name: 'Jennifer Wilson',
      age: 28,
      lastVisit: '2023-12-15',
      totalVisits: 12,
      status: 'inactive',
    },
  ];

  recentActivities: Activity[] = [
    {
      description: 'New appointment scheduled for tomorrow',
      time: '2 minutes',
      type: 'success',
      icon: 'fas fa-calendar-check',
    },
    {
      description: 'Staff member Mary logged in',
      time: '15 minutes',
      type: 'info',
      icon: 'fas fa-sign-in-alt',
    },
    {
      description: 'System backup completed successfully',
      time: '1 hour',
      type: 'success',
      icon: 'fas fa-database',
    },
    {
      description: 'Low inventory alert: Medical supplies',
      time: '2 hours',
      type: 'warning',
      icon: 'fas fa-exclamation-triangle',
    },
    {
      description: 'New patient registration',
      time: '3 hours',
      type: 'info',
      icon: 'fas fa-user-plus',
    },
  ];

  paymentMethods: PaymentMethod[] = [
    { name: 'Cash', percentage: 45 },
    { name: 'Insurance', percentage: 35 },
    { name: 'Credit Card', percentage: 15 },
    { name: 'Bank Transfer', percentage: 5 },
  ];

  // Add lab test types management
  labTestTypes: LabTestType[] = [
    {
      id: 'LT001',
      name: 'Complete Blood Count',
      standardPrice: 25.0,
      alternativePrice: 20.0,
    },
    {
      id: 'LT002',
      name: 'Liver Function Test',
      standardPrice: 35.0,
      alternativePrice: 30.0,
    },
    {
      id: 'LT003',
      name: 'Kidney Function Test',
      standardPrice: 30.0,
      alternativePrice: 25.0,
    },
  ];

  // Add form data for lab test management
  newLabTestType = {
    name: '',
    standardPrice: 0,
    alternativePrice: 0,
  };

  editingLabTestType: LabTestType | null = null;
  showLabTestModal = false;

  constructor(
    public languageService: LanguageService,
    private router: Router
  ) {}

  ngOnInit() {
    // Initialize super admin dashboard
    this.originalPatients = [...this.patients];
  }

  // Tab Management
  switchTab(tabName: string) {
    this.activeTab = tabName;
  }

  isActiveTab(tabName: string): boolean {
    return this.activeTab === tabName;
  }

  // Dropdown Management
  toggleDropdown(event?: Event) {
    event?.preventDefault();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  // Quick Actions
  addNewStaff() {
    this.editingStaff = false;
    this.newStaff = {
      name: '',
      role: 'Staff',
      department: '',
      email: '',
      phone: '',
      password: '',
    };
    this.showStaffModal = true;
  }

  viewReports() {
    this.showReportModal = true;
  }

  manageSchedule() {
    console.log('Manage schedule');
    // Implement schedule management
  }

  systemBackup() {
    this.showBackupModal = true;
  }

  // Staff Management
  editStaff(id: string) {
    console.log('Edit staff:', id);
    // Implement edit staff functionality
  }

  deactivateStaff(id: string) {
    const staff = this.staffMembers.find((s) => s.id === id);
    if (staff) {
      staff.status = staff.status === 'active' ? 'inactive' : 'active';
      console.log('Staff status changed:', id);
    }
  }

  scheduleAppointment(id: string) {
    console.log('Schedule appointment for patient:', id);
    // Find the patient by ID
    const patient = this.patients.find((p) => p.id === id);
    if (patient) {
      // In a real implementation, you would show a modal with appointment scheduling form
      // For now, we'll show a more detailed modal with appointment options
      const appointmentDetails = `
        Scheduling appointment for patient: ${patient.name} (ID: ${patient.id})
        
        Please fill in the appointment details:
        - Date: [Date Picker]
        - Time: [Time Slot Selection]
        - Service: [Service Type Dropdown]
        - Doctor: [Doctor Selection]
        - Notes: [Additional Notes Textarea]
      `;

      this.openModal('Schedule Appointment', appointmentDetails);
    }
  }

  // Navigation and System Actions
  logout() {
    // Clear session data
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentShift');
    sessionStorage.removeItem('staffId');

    // Navigate back to admin selection
    this.router.navigate(['/admin']);
  }

  goHome() {
    this.router.navigate(['/']);
  }

  goToAdminSelection() {
    this.router.navigate(['/admin']);
  }

  refreshDashboard() {
    // Reload current route
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/super-admin']);
    });
  }

  // Search and filter methods
  searchPatients(searchTerm: string) {
    this.patientSearchTerm = searchTerm;
    if (!searchTerm) {
      // If search term is empty, reset to original patients
      this.patients = [...this.originalPatients];
      return;
    }

    // Filter patients based on search term
    this.patients = this.originalPatients.filter(
      (patient: Patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  filterPatients(filter: string) {
    this.patientFilter = filter;
    if (!filter) {
      // If no filter, reset to original patients
      this.patients = [...this.originalPatients];
      return;
    }

    // Filter patients based on status
    this.patients = this.originalPatients.filter(
      (patient: Patient) => patient.status === filter
    );
  }

  // Enhanced staff management methods
  showAddStaffForm() {
    this.editingStaff = false;
    this.newStaff = {
      name: '',
      role: 'Staff',
      department: '',
      email: '',
      phone: '',
      password: '',
      workType: '',
    };
    this.showStaffModal = true;
  }

  showEditStaffForm(staff: StaffMember) {
    this.editingStaff = true;
    this.newStaff = { ...staff };
    this.showStaffModal = true;
  }

  closeStaffModal() {
    this.showStaffModal = false;
    this.editingStaff = false;
  }

  saveStaff() {
    if (this.editingStaff) {
      console.log('Updating staff:', this.newStaff);
      // Update existing staff
      this.openModal(
        'Staff Updated',
        `Staff member "${this.newStaff.name}" has been updated.`,
        'info'
      );
    } else {
      console.log('Adding new staff:', this.newStaff);
      // Add new staff to the list
      this.staffMembers.push({
        id: (this.staffMembers.length + 1).toString(),
        name: this.newStaff.name,
        role: this.newStaff.role as 'Super Admin' | 'Sub Admin' | 'Staff',
        department: this.newStaff.department,
        status: 'active',
        lastLogin: 'Never',
        avatar: './images/staff-avatar.png',
      });

      this.openModal(
        'Staff Added',
        `New staff member "${this.newStaff.name}" has been added.`,
        'info'
      );
    }

    this.closeStaffModal();
  }

  // Testimonial management methods
  approveTestimonial(id: string) {
    // In a real implementation, you would update the testimonial status
    console.log('Approving testimonial:', id);
    this.openModal(
      'Testimonial Approved',
      'The testimonial has been approved and is now visible to patients.',
      'info'
    );
  }

  rejectTestimonial(id: string) {
    // In a real implementation, you would remove or mark the testimonial as rejected
    console.log('Rejecting testimonial:', id);
    this.openModal(
      'Testimonial Rejected',
      'The testimonial has been rejected and removed.',
      'info'
    );
  }

  removeTestimonial(id: string) {
    // In a real implementation, you would completely remove the testimonial
    console.log('Removing testimonial:', id);
    this.openModal(
      'Testimonial Removed',
      'The testimonial has been permanently removed.',
      'info'
    );
  }

  // Patient management methods
  viewPatientRecord(id: string) {
    console.log('View patient record:', id);
    // Find the patient by ID
    const patient = this.patients.find((p) => p.id === id);
    if (patient) {
      console.log(
        `Viewing record for patient: ${patient.name} (ID: ${patient.id})`
      );
    }
  }

  viewPatientHistory(id: string) {
    console.log('Viewing patient history:', id);
    // Implement view patient history
    this.openModal(
      'Patient History',
      'Patient history would be displayed here.',
      'info'
    );
  }

  downloadPatientList() {
    console.log('Downloading patient list');
    // Implement download patient list
    this.openModal(
      'Download Started',
      'Patient list download has started. The file will be available shortly.',
      'info'
    );
  }

  // Report generation methods
  showReportModalFunc() {
    this.showReportModal = true;
  }

  closeReportModal() {
    this.showReportModal = false;
  }

  generateReport() {
    console.log('Generating report:', this.reportType);
    this.isGeneratingReport = true;

    // Simulate report generation
    setTimeout(() => {
      this.isGeneratingReport = false;
      this.closeReportModal();

      this.openModal(
        'Report Generated',
        `The ${this.reportType} report has been generated and is ready for download.`,
        'info'
      );
    }, 2000);
  }

  // Lab test management methods
  showAddLabTestForm() {
    this.editingLabTestType = null;
    this.newLabTestType = {
      name: '',
      standardPrice: 0,
      alternativePrice: 0,
    };
    this.showLabTestModal = true;
  }

  showEditLabTestForm(testType: LabTestType) {
    this.editingLabTestType = testType;
    this.newLabTestType = { ...testType };
    this.showLabTestModal = true;
  }

  saveLabTestType() {
    if (this.newLabTestType.name && this.newLabTestType.standardPrice > 0) {
      if (this.editingLabTestType) {
        // Update existing lab test type
        const index = this.labTestTypes.findIndex(
          (t) => t.id === this.editingLabTestType!.id
        );
        if (index !== -1) {
          this.labTestTypes[index] = {
            ...this.editingLabTestType!,
            name: this.newLabTestType.name,
            standardPrice: this.newLabTestType.standardPrice,
            alternativePrice: this.newLabTestType.alternativePrice,
          };
        }

        this.openModal(
          'Lab Test Updated',
          `Lab test "${this.newLabTestType.name}" has been updated.`,
          'info'
        );
      } else {
        // Add new lab test type
        const labTestType: LabTestType = {
          id: 'LT' + (this.labTestTypes.length + 1).toString().padStart(3, '0'),
          name: this.newLabTestType.name,
          standardPrice: this.newLabTestType.standardPrice,
          alternativePrice: this.newLabTestType.alternativePrice,
        };

        this.labTestTypes.push(labTestType);

        this.openModal(
          'Lab Test Added',
          `New lab test "${labTestType.name}" has been added.`,
          'info'
        );
      }

      this.closeLabTestModal();
    } else {
      this.openModal(
        'Validation Error',
        'Please fill in all required fields (Name and Standard Price).',
        'info'
      );
    }
  }

  deleteLabTestType(id: string) {
    const testType = this.labTestTypes.find((t) => t.id === id);
    if (testType) {
      if (confirm(`Are you sure you want to delete "${testType.name}"?`)) {
        this.labTestTypes = this.labTestTypes.filter((t) => t.id !== id);

        this.openModal(
          'Lab Test Deleted',
          `Lab test "${testType.name}" has been removed.`,
          'info'
        );
      }
    }
  }

  closeLabTestModal() {
    this.showLabTestModal = false;
    this.editingLabTestType = null;
    this.newLabTestType = {
      name: '',
      standardPrice: 0,
      alternativePrice: 0,
    };
  }

  // Add missing backup methods
  closeBackupModal() {
    this.showBackupModal = false;
  }

  performBackup() {
    this.isBackingUp = true;

    // Simulate backup process
    setTimeout(() => {
      this.isBackingUp = false;
      this.closeBackupModal();

      this.openModal(
        'Backup Completed',
        'System backup has been completed successfully.',
        'info'
      );
    }, 3000);
  }

  // Helper method to open modals
  openModal(
    title: string,
    content: string,
    type: 'info' | 'confirm' | 'form' = 'info'
  ) {
    // This would integrate with your existing modal system
    alert(`${title}: ${content}`);
  }
}
