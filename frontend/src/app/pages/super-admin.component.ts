import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../services/language.service';
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

@Component({
  selector: 'app-super-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
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

  // Modal states
  showStaffModal = false;
  showReportModal = false;
  showBackupModal = false;
  editingStaff = false;
  isGeneratingReport = false;
  isBackingUp = false;

  // Form data
  newStaff: any = {
    name: '',
    role: 'Staff',
    department: '',
    email: '',
    phone: '',
    password: '',
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

  constructor(
    public languageService: LanguageService,
    private router: Router
  ) {}

  ngOnInit() {
    // Initialize super admin dashboard
  }

  // Tab Management
  switchTab(tabName: string) {
    this.activeTab = tabName;
  }

  isActiveTab(tabName: string): boolean {
    return this.activeTab === tabName;
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

  // Patient Management
  viewPatientRecord(id: string) {
    console.log('View patient record:', id);
    // Implement view patient record
  }

  scheduleAppointment(id: string) {
    console.log('Schedule appointment for patient:', id);
    // Implement appointment scheduling
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

  // Modal Management
  closeStaffModal() {
    this.showStaffModal = false;
    this.editingStaff = false;
  }

  closeReportModal() {
    this.showReportModal = false;
  }

  closeBackupModal() {
    this.showBackupModal = false;
  }

  saveStaff() {
    if (this.editingStaff) {
      console.log('Updating staff:', this.newStaff);
      // Update existing staff
    } else {
      console.log('Adding new staff:', this.newStaff);
      // Add new staff to the list
      this.staffMembers.push({
        id: (this.staffMembers.length + 1).toString(),
        name: this.newStaff.name,
        role: this.newStaff.role,
        department: this.newStaff.department,
        status: 'active',
        lastLogin: 'Never',
        avatar: './images/staff-avatar.png',
      });
    }
    this.closeStaffModal();
  }

  generateReport(reportType: string) {
    this.isGeneratingReport = true;
    console.log('Generating report:', reportType);
    
    // Simulate report generation
    setTimeout(() => {
      this.isGeneratingReport = false;
      alert(`${reportType} report generated successfully!`);
      this.closeReportModal();
    }, 2000);
  }

  performBackup() {
    this.isBackingUp = true;
    console.log('Starting backup...');
    
    // Simulate backup process
    setTimeout(() => {
      this.isBackingUp = false;
      alert('System backup completed successfully!');
      this.closeBackupModal();
    }, 3000);
  }
}
