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

interface User {
  id: string;
  name: string;
  role: string;
  department: string;
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

@Component({
  selector: 'app-sub-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './sub-admin.component.html',
  styleUrls: ['./sub-admin.component.scss'],
  animations: [pageEnter, fadeIn, slideUp, scaleIn, staggerCards],
})
export class SubAdminComponent implements OnInit {
  // Active tab management
  activeTab = 'appointments';

  // Dropdown state
  isDropdownOpen = false;

  currentUser: User = {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Sub Admin',
    department: 'Nursing',
  };

  // Statistics
  todayAppointments = 12;
  completedToday = 8;
  pendingTasks = 5;
  urgentTasks = 2;
  newMessages = 3;
  unreadCount = 7;
  completedTasks = 85;

  // Search
  patientSearch = '';

  // Task statistics
  totalTasks = 15;
  completedTasksCount = 10;
  pendingTasksCount = 5;
  overdueTasks = 2;

  todayAppointmentsList: Appointment[] = [
    {
      id: '1',
      time: '09:00',
      duration: '30 min',
      patientName: 'John Smith',
      service: 'General Consultation',
      status: 'confirmed',
      phone: '+251 91 123 4567',
    },
    {
      id: '2',
      time: '09:30',
      duration: '45 min',
      patientName: 'Mary Wilson',
      service: 'Hearing Test',
      status: 'in-progress',
      phone: '+251 91 234 5678',
    },
    {
      id: '3',
      time: '10:15',
      duration: '30 min',
      patientName: 'David Brown',
      service: 'Follow-up',
      status: 'pending',
      phone: '+251 91 345 6789',
    },
    {
      id: '4',
      time: '11:00',
      duration: '60 min',
      patientName: 'Lisa Davis',
      service: 'Sinus Treatment',
      status: 'confirmed',
      phone: '+251 91 456 7890',
    },
  ];

  waitingList: WaitingPatient[] = [
    { name: 'Michael Johnson', service: 'Check-up', waitTime: '15 min' },
    { name: 'Emma Wilson', service: 'Consultation', waitTime: '8 min' },
    { name: 'Robert Smith', service: 'Follow-up', waitTime: '3 min' },
  ];

  patients: Patient[] = [
    {
      id: 'P001',
      name: 'Alice Cooper',
      age: 34,
      phone: '+251 91 567 8901',
      lastVisit: '2024-01-10',
    },
    {
      id: 'P002',
      name: 'Bob Martin',
      age: 42,
      phone: '+251 91 678 9012',
      lastVisit: '2024-01-08',
    },
    {
      id: 'P003',
      name: 'Carol White',
      age: 28,
      phone: '+251 91 789 0123',
      lastVisit: '2024-01-05',
    },
  ];

  testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Jennifer Wilson',
      rating: 5,
      service: 'General Consultation',
      text: 'Excellent service and very knowledgeable staff. Highly recommend.',
      date: '2024-01-10',
      approved: false,
    },
    {
      id: '2',
      name: 'David Miller',
      rating: 4,
      service: 'Hearing Test',
      text: 'Professional and caring staff. Great experience overall.',
      date: '2024-01-08',
      approved: true,
    },
  ];

  myTasks: Task[] = [
    {
      id: '1',
      title: 'Update patient records',
      priority: 'high',
      dueDate: '2024-01-15',
      completed: false,
    },
    {
      id: '2',
      title: 'Prepare monthly report',
      priority: 'medium',
      dueDate: '2024-01-20',
      completed: false,
    },
    {
      id: '3',
      title: 'Order medical supplies',
      priority: 'high',
      dueDate: '2024-01-12',
      completed: true,
    },
    {
      id: '4',
      title: 'Schedule staff meeting',
      priority: 'low',
      dueDate: '2024-01-25',
      completed: false,
    },
  ];

  constructor(
    public languageService: LanguageService,
    private router: Router
  ) {}

  ngOnInit() {
    // Initialize sub admin dashboard
  }

  // Appointment Management
  addAppointment() {
    console.log('Add new appointment');
  }

  viewAppointment(id: string) {
    console.log('View appointment:', id);
  }

  markComplete(id: string) {
    const appointment = this.todayAppointmentsList.find((app) => app.id === id);
    if (appointment) {
      appointment.status = 'completed';
    }
  }

  reschedule(id: string) {
    console.log('Reschedule appointment:', id);
  }

  // Quick Actions
  checkInPatient() {
    console.log('Check-in patient');
  }

  addWalkIn() {
    console.log('Add walk-in patient');
  }

  viewSchedule() {
    console.log('View schedule');
  }

  emergencyAlert() {
    console.log('Emergency alert');
  }

  // Patient Management
  searchPatients() {
    console.log('Search patients:', this.patientSearch);
  }

  viewPatientHistory(id: string) {
    console.log('View patient history:', id);
  }

  scheduleFollowUp(id: string) {
    console.log('Schedule follow-up for patient:', id);
  }

  // Testimonial Management
  approveTestimonial(id: string) {
    const testimonial = this.testimonials.find((t) => t.id === id);
    if (testimonial) {
      testimonial.approved = true;
    }
  }

  rejectTestimonial(id: string) {
    this.testimonials = this.testimonials.filter((t) => t.id !== id);
  }

  // Task Management
  addTask() {
    console.log('Add new task');
  }

  toggleTask(id: string) {
    const task = this.myTasks.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.updateTaskStats();
    }
  }

  editTask(id: string) {
    console.log('Edit task:', id);
  }

  deleteTask(id: string) {
    this.myTasks = this.myTasks.filter((t) => t.id !== id);
    this.updateTaskStats();
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
      this.router.navigate(['/sub-admin']);
    });
  }

  // Tab Management
  switchTab(tabName: string) {
    this.activeTab = tabName;
  }

  isActiveTab(tabName: string): boolean {
    return this.activeTab === tabName;
  }

  // Dropdown Management
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  private updateTaskStats() {
    this.totalTasks = this.myTasks.length;
    this.completedTasksCount = this.myTasks.filter((t) => t.completed).length;
    this.pendingTasksCount = this.myTasks.filter((t) => !t.completed).length;
  }
}
