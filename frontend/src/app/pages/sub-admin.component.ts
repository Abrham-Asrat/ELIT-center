import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../services/language.service';
import { TabContentComponent } from '../components/tab-content.component';
import {
  pageEnter,
  fadeIn,
  slideUp,
  scaleIn,
  staggerCards,
  slideInLeft,
  slideInRight,
  bounceIn,
  rotateIn,
  buttonHover,
} from '../shared/animations';

interface User {
  id: string;
  name: string;
  role: string;
  department: string;
  workType: string; // Added work type
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
  // Added patient status details
  status: 'active' | 'inactive' | 'discharged';
  bloodType: string;
  allergies: string;
  medicalHistory: string;
  currentMedications: string[];
  labTests: LabTest[];
  prescriptions: Prescription[];
  // Added for doctor view
  appointmentTime?: string;
  appointmentStatus?: 'ongoing' | 'pending' | 'completed';
}

// Added LabTest interface
interface LabTest {
  id: string;
  testName: string;
  status: 'pending' | 'in-progress' | 'completed';
  result: string;
  notes: string;
  dateRequested: string;
  dateCompleted: string;
}

// Added Prescription interface
interface Prescription {
  id: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes: string;
  datePrescribed: string;
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

interface ModalState {
  isOpen: boolean;
  title: string;
  content: string;
  type: 'info' | 'confirm' | 'form';
}

interface Medicine {
  id: string;
  name: string;
  type: string;
  price: number;
  category: string;
  description: string;
  stock: number;
}

@Component({
  selector: 'app-sub-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TabContentComponent],
  templateUrl: './sub-admin.component.html',
  styleUrls: ['./sub-admin.component.scss'],
  animations: [
    pageEnter,
    fadeIn,
    slideUp,
    scaleIn,
    staggerCards,
    slideInLeft,
    slideInRight,
    bounceIn,
    rotateIn,
    buttonHover,
  ],
})
export class SubAdminComponent implements OnInit {
  ngOnInit() {
    // Store original patient list for search functionality
    this.originalPatients = [...this.patients];
    // Generate time options
    this.generateTimeOptions();
    // Get work type from session storage
    this.currentUser.workType = sessionStorage.getItem('workType') || 'other';

    // Set the appropriate role name based on work type
    this.setRoleName();

    // Set default tab based on work type
    if (this.currentUser.workType === 'doctor') {
      this.activeTab = 'results'; // Default to results tab for doctors
    } else {
      this.activeTab = 'appointments'; // Default to appointments for others
    }

    // Calculate doctor-specific statistics if user is a doctor
    if (this.currentUser.workType === 'doctor') {
      setTimeout(() => {
        this.calculateDoctorStats();
      }, 0);
    }
  }

  // Active tab management
  activeTab = 'appointments';

  // Doctor sub-tab management
  doctorSubTab = 'patients';

  // Dropdown state
  isDropdownOpen = false;

  // Button hover state for animations
  buttonHover = 'normal';

  // Modal state
  modalState: ModalState = {
    isOpen: false,
    title: '',
    content: '',
    type: 'info',
  };

  currentUser: User = {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Sub Admin',
    department: 'Nursing',
    workType: 'reception', // Default work type
  };

  // Statistics
  todayAppointments = 10;
  completedToday = 8;
  pendingTasks = 5;
  urgentTasks = 2;
  unreadCount = 7;
  completedTasks = 85;
  activePatients = 0; // Add this line

  // Search
  patientSearch = '';

  // Store original patient list
  originalPatients: Patient[] = [];

  // Task statistics
  totalTasks = 15;
  completedTasksCount = 10;
  pendingTasksCount = 5;
  overdueTasks = 2;

  // New appointment form data
  newAppointment = {
    patientName: '',
    phone: '',
    service: '',
    time: '',
    duration: '30 min',
    status: 'pending' as 'pending' | 'confirmed' | 'in-progress' | 'completed',
  };

  // New patient form data
  newPatient = {
    id: '',
    name: '',
    age: null,
    phone: '',
    lastVisit: '',
  };

  // Patient history data
  patientHistory = [
    {
      id: 'H001',
      patientId: 'P001',
      date: '2024-01-10',
      service: 'General Consultation',
      doctor: 'Dr. Abiy',
      notes:
        'Patient presented with mild symptoms. Prescribed medication and scheduled follow-up.',
    },
    {
      id: 'H002',
      patientId: 'P001',
      date: '2023-12-15',
      service: 'Hearing Test',
      doctor: 'Dr. Smith',
      notes: 'Normal hearing test results. No issues detected.',
    },
  ];

  // Follow-up form data
  followUpData = {
    date: '',
    time: '',
    service: '',
    notes: '',
  };

  // Currently viewed patient
  viewedPatient: Patient | null = null;

  // Services dropdown options
  serviceOptions = [
    'General Consultation',
    'Hearing Test',
    'Follow-up',
    'Sinus Treatment',
    'Medication Review',
    'Allergy Consultation',
    'Throat Check',
    'Other',
  ];

  // Time options (9:00 AM to 5:00 PM in 30-min intervals)
  timeOptions: string[] = [];

  // Form visibility
  showAddPatientModal = false;
  showPatientHistoryModal = false;
  showScheduleFollowUpModal = false;
  showNewAppointmentForm = false;

  // Reschedule form data
  rescheduleData = {
    time: '',
    duration: '30 min',
    date: '',
  };

  // Form visibility
  showViewAppointmentModal = false;
  showRescheduleModal = false;

  // Task form data
  newTask = {
    title: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    dueDate: '',
  };

  // Form visibility
  showAddTaskModal = false;

  // Add new form data for doctor features
  newLabTest = {
    testName: '',
    notes: '',
  };

  newPrescription = {
    medicineName: '',
    dosage: '',
    frequency: '',
    duration: '',
    notes: '',
  };

  // Add form visibility flags
  showAddLabTestModal = false;
  showAddPrescriptionModal = false;

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
    {
      id: '5',
      time: '12:30',
      duration: '20 min',
      patientName: 'Michael Johnson',
      service: 'Medication Review',
      status: 'pending',
      phone: '+251 91 567 8901',
    },
    {
      id: '6',
      time: '14:00',
      duration: '40 min',
      patientName: 'Sarah Williams',
      service: 'Allergy Consultation',
      status: 'confirmed',
      phone: '+251 91 678 9012',
    },
    {
      id: '7',
      time: '15:15',
      duration: '35 min',
      patientName: 'Robert Garcia',
      service: 'Throat Check',
      status: 'in-progress',
      phone: '+251 91 789 0123',
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
      status: 'active',
      bloodType: 'O+',
      allergies: 'Penicillin',
      medicalHistory: 'Hypertension, Diabetes',
      currentMedications: ['Metformin', 'Lisinopril'],
      labTests: [
        {
          id: 'LT001',
          testName: 'Complete Blood Count',
          status: 'completed',
          result: 'Normal',
          notes: 'All parameters within normal range',
          dateRequested: '2024-01-05',
          dateCompleted: '2024-01-06',
        },
      ],
      prescriptions: [
        {
          id: 'RX001',
          medicineName: 'Amoxicillin',
          dosage: '500mg',
          frequency: 'Twice daily',
          duration: '7 days',
          notes: 'Take with food',
          datePrescribed: '2024-01-10',
        },
      ],
    },
    {
      id: 'P002',
      name: 'Bob Martin',
      age: 42,
      phone: '+251 91 678 9012',
      lastVisit: '2024-01-08',
      status: 'active',
      bloodType: 'A-',
      allergies: 'None',
      medicalHistory: 'Asthma',
      currentMedications: ['Albuterol inhaler'],
      labTests: [],
      prescriptions: [],
    },
    {
      id: 'P003',
      name: 'Carol White',
      age: 28,
      phone: '+251 91 789 0123',
      lastVisit: '2024-01-05',
      status: 'discharged',
      bloodType: 'B+',
      allergies: 'Shellfish',
      medicalHistory: 'Migraines',
      currentMedications: ['Sumatriptan'],
      labTests: [],
      prescriptions: [],
    },
    {
      id: 'P004',
      name: 'David Thompson',
      age: 56,
      phone: '+251 91 890 1234',
      lastVisit: '2024-01-02',
      status: 'active',
      bloodType: 'AB+',
      allergies: 'Latex',
      medicalHistory: 'Heart disease',
      currentMedications: ['Aspirin', 'Atorvastatin'],
      labTests: [],
      prescriptions: [],
    },
    {
      id: 'P005',
      name: 'Emma Johnson',
      age: 29,
      phone: '+251 91 901 2345',
      lastVisit: '2024-01-12',
      status: 'active',
      bloodType: 'O-',
      allergies: 'None',
      medicalHistory: 'None',
      currentMedications: [],
      labTests: [],
      prescriptions: [],
    },
    {
      id: 'P006',
      name: 'Frank Williams',
      age: 47,
      phone: '+251 91 012 3456',
      lastVisit: '2024-01-03',
      status: 'inactive',
      bloodType: 'A+',
      allergies: 'Dust',
      medicalHistory: 'Arthritis',
      currentMedications: ['Ibuprofen'],
      labTests: [],
      prescriptions: [],
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
    {
      id: '3',
      name: 'Amanda Thompson',
      rating: 5,
      service: 'Sinus Treatment',
      text: 'The treatment was effective and the staff was incredibly attentive. I felt well taken care of throughout my visit.',
      date: '2024-01-12',
      approved: true,
    },
    {
      id: '4',
      name: 'James Rodriguez',
      rating: 3,
      service: 'Follow-up Appointment',
      text: 'Good service but had to wait longer than expected. Overall satisfactory experience.',
      date: '2024-01-05',
      approved: false,
    },
    {
      id: '5',
      name: 'Emily Chen',
      rating: 5,
      service: 'Allergy Consultation',
      text: 'Dr. Abiy is amazing! Very thorough and took the time to explain everything. Highly recommend this clinic.',
      date: '2024-01-15',
      approved: false,
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
    {
      id: '5',
      title: 'Review patient feedback',
      priority: 'medium',
      dueDate: '2024-01-18',
      completed: false,
    },
    {
      id: '6',
      title: 'Update clinic website',
      priority: 'low',
      dueDate: '2024-01-30',
      completed: false,
    },
    {
      id: '7',
      title: 'Process insurance claims',
      priority: 'high',
      dueDate: '2024-01-14',
      completed: false,
    },
  ];

  constructor(
    public languageService: LanguageService,
    private router: Router,
    private elementRef: ElementRef
  ) {
    // Get work type from session storage
    this.currentUser.workType = sessionStorage.getItem('workType') || 'other';

    // Set the appropriate role name based on work type
    this.setRoleName();

    // Generate time options
    this.generateTimeOptions();
  }

  // Set role name based on work type
  setRoleName() {
    const workTypeToRole: { [key: string]: string } = {
      reception: 'Receptionist',
      doctor: 'Doctor',
      surgeon: 'Surgeon',
      lab: 'Lab Technician',
      pharmacy: 'Pharmacist',
      employer: 'Employer',
      other: 'Staff Member',
    };

    this.currentUser.role =
      workTypeToRole[this.currentUser.workType] || 'Staff Member';
  }

  // Get portal title based on work type
  getPortalTitle(): string {
    const workTypeToTitle: { [key: string]: string } = {
      reception: 'Reception Portal',
      doctor: 'Doctor Portal',
      surgeon: 'Surgeon Portal',
      lab: 'Lab Portal',
      pharmacy: 'Pharmacy Portal',
      employer: 'Employer Portal',
      other: 'Staff Portal',
    };

    return workTypeToTitle[this.currentUser.workType] || 'Staff Portal';
  }

  // Generate time options for dropdown
  generateTimeOptions() {
    const startHour = 9;
    const endHour = 17;
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        const timeString = `${displayHour}:${
          minute === 0 ? '00' : minute
        } ${period}`;
        this.timeOptions.push(timeString);
      }
    }
    // Add 5:00 PM
    this.timeOptions.push('5:00 PM');
  }

  // Check if current user has access to a specific feature based on work type
  hasAccessTo(feature: string): boolean {
    const workType = this.currentUser.workType;

    // Define privileges for each work type
    const privileges: { [key: string]: string[] } = {
      reception: [
        'appointments',
        'finance',
        'testimonials',
        'patients',
        'reports',
      ],
      doctor: ['patients', 'Results', 'results'], // Added 'results' for the new tab
      surgeon: ['LabTest'],
      lab: ['patients'],
      pharmacy: ['Priscriptions', 'Medicine'],
    };

    // Return true if the feature is in the user's privileges or if user is reception (has all privileges)
    return (
      workType === 'reception' ||
      privileges[workType]?.includes(feature) ||
      false
    );
  }

  // Doctor-specific statistics
  pendingPatients = 0;
  ongoingPatients = 0;
  totalPatientsSeen = 0;
  labResultsCount = 0;

  // Calculate doctor-specific statistics
  calculateDoctorStats() {
    // Count pending patients (those with pending appointments)
    this.pendingPatients = this.todayAppointmentsList.filter(
      (appointment) => appointment.status === 'pending'
    ).length;

    // Count ongoing patients (those with in-progress appointments)
    this.ongoingPatients = this.todayAppointmentsList.filter(
      (appointment) => appointment.status === 'in-progress'
    ).length;

    // For total patients seen, we'll use the length of the patients array as a sample
    // In a real implementation, this would be fetched from a database
    this.totalPatientsSeen = this.patients.length;

    // Count lab results with completed status
    let completedLabTests = 0;
    this.patients.forEach((patient) => {
      completedLabTests += patient.labTests.filter(
        (test) => test.status === 'completed'
      ).length;
    });
    this.labResultsCount = completedLabTests;
  }

  // Appointment Management
  addAppointment() {
    if (!this.hasAccessTo('appointments')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to add appointments.',
        'info'
      );
      return;
    }

    console.log('Add new appointment');
    // Show the new appointment form
    this.showNewAppointmentForm = true;
    // Reset form data
    this.newAppointment = {
      patientName: '',
      phone: '',
      service: '',
      time: '',
      duration: '30 min',
      status: 'pending',
    };
  }

  // Save new appointment
  saveNewAppointment() {
    if (!this.hasAccessTo('appointments')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to save appointments.',
        'info'
      );
      return;
    }

    if (
      this.newAppointment.patientName &&
      this.newAppointment.phone &&
      this.newAppointment.service &&
      this.newAppointment.time
    ) {
      // Create new appointment object
      const appointment: Appointment = {
        id: (this.todayAppointmentsList.length + 1).toString(),
        time: this.newAppointment.time,
        duration: this.newAppointment.duration,
        patientName: this.newAppointment.patientName,
        service: this.newAppointment.service,
        status: this.newAppointment.status,
        phone: this.newAppointment.phone,
      };

      // Add to the beginning of the list
      this.todayAppointmentsList.unshift(appointment);

      // Update stats
      this.todayAppointments++;

      // Update stats if user is a doctor
      if (this.currentUser.workType === 'doctor') {
        this.calculateDoctorStats();
      }

      // Close form
      this.showNewAppointmentForm = false;
    } else {
      // Show validation error
      this.openModal(
        'Validation Error',
        'Please fill in all required fields (Patient Name, Phone, Service, and Time).',
        'info'
      );
    }
  }

  // Cancel new appointment
  cancelNewAppointment() {
    this.showNewAppointmentForm = false;
  }

  // Currently viewed appointment
  viewedAppointment: Appointment | null = null;

  // View appointment details
  viewAppointment(id: string) {
    if (!this.hasAccessTo('appointments')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to view appointments.',
        'info'
      );
      return;
    }

    const appointment = this.todayAppointmentsList.find((app) => app.id === id);
    if (appointment) {
      this.viewedAppointment = appointment;
      this.showViewAppointmentModal = true;
    }
  }

  // Close view appointment modal
  closeViewAppointmentModal() {
    this.showViewAppointmentModal = false;
    this.viewedAppointment = null;
  }

  // Reschedule appointment
  reschedule(id: string) {
    if (!this.hasAccessTo('appointments')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to reschedule appointments.',
        'info'
      );
      return;
    }

    const appointment = this.todayAppointmentsList.find((app) => app.id === id);
    if (appointment) {
      this.viewedAppointment = appointment;
      // Pre-fill reschedule form with current appointment data
      this.rescheduleData = {
        time: appointment.time,
        duration: appointment.duration,
        date: new Date().toISOString().split('T')[0], // Today's date as default
      };
      this.showRescheduleModal = true;
    }
  }

  // Save rescheduled appointment
  saveReschedule() {
    if (!this.hasAccessTo('appointments')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to save rescheduled appointments.',
        'info'
      );
      return;
    }

    if (
      this.viewedAppointment &&
      this.rescheduleData.time &&
      this.rescheduleData.date
    ) {
      // Update the appointment
      this.viewedAppointment.time = this.rescheduleData.time;
      this.viewedAppointment.duration = this.rescheduleData.duration;
      this.viewedAppointment.status = 'confirmed'; // Reset status to confirmed

      // Close modal
      this.showRescheduleModal = false;
      this.viewedAppointment = null;

      // Show success message
      this.openModal(
        'Appointment Rescheduled',
        'The appointment has been successfully rescheduled.',
        'info'
      );
    } else {
      // Show validation error
      this.openModal(
        'Validation Error',
        'Please fill in all required fields (Time and Date).',
        'info'
      );
    }
  }

  // Cancel rescheduling
  cancelReschedule() {
    this.showRescheduleModal = false;
    this.viewedAppointment = null;
  }

  // Mark appointment as complete
  markComplete(id: string) {
    if (!this.hasAccessTo('appointments')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to mark appointments as complete.',
        'info'
      );
      return;
    }

    const appointment = this.todayAppointmentsList.find((app) => app.id === id);
    if (appointment) {
      appointment.status = 'completed';

      // Update stats if user is a doctor
      if (this.currentUser.workType === 'doctor') {
        this.calculateDoctorStats();
      }
    }
  }

  // Modal methods
  openModal(
    title: string,
    content: string,
    type: 'info' | 'confirm' | 'form' = 'info'
  ) {
    this.modalState = {
      isOpen: true,
      title,
      content,
      type,
    };
  }

  closeModal() {
    this.modalState.isOpen = false;
  }

  // Patient Management
  showAddPatientForm() {
    if (!this.hasAccessTo('patients')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to add patients.',
        'info'
      );
      return;
    }

    // Generate a new patient ID
    const newId = 'P' + (this.patients.length + 1).toString().padStart(3, '0');

    // Reset form data
    this.newPatient = {
      id: newId,
      name: '',
      age: null,
      phone: '',
      lastVisit: new Date().toISOString().split('T')[0],
    };

    // Show the modal
    this.showAddPatientModal = true;
  }

  saveNewPatient() {
    if (!this.hasAccessTo('patients')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to save patient information.',
        'info'
      );
      return;
    }

    if (
      this.newPatient.name &&
      this.newPatient.age &&
      this.newPatient.phone &&
      this.newPatient.id
    ) {
      // Create new patient object with all required fields
      const patient: Patient = {
        id: this.newPatient.id,
        name: this.newPatient.name,
        age: this.newPatient.age,
        phone: this.newPatient.phone,
        lastVisit:
          this.newPatient.lastVisit || new Date().toISOString().split('T')[0],
        status: 'active',
        bloodType: '',
        allergies: '',
        medicalHistory: '',
        currentMedications: [],
        labTests: [],
        prescriptions: [],
      };

      // Add to the beginning of the list
      this.patients.unshift(patient);

      // Also add to original patients list to maintain search functionality
      this.originalPatients.unshift(patient);

      // Update stats if user is a doctor
      if (this.currentUser.workType === 'doctor') {
        this.calculateDoctorStats();
      }

      // Close modal
      this.showAddPatientModal = false;

      // Show success message
      this.openModal(
        'Patient Added',
        `Patient ${patient.name} has been successfully added to the system.`,
        'info'
      );
    } else {
      // Show validation error
      this.openModal(
        'Validation Error',
        'Please fill in all required fields (Name, Age, Phone, and Patient ID).',
        'info'
      );
    }
  }

  cancelAddPatient() {
    this.showAddPatientModal = false;
  }

  searchPatients() {
    if (this.patientSearch.trim() === '') {
      // If search is empty, show all patients
      this.patients = [...this.originalPatients];
    } else {
      // Filter patients based on search term (name, ID, or phone)
      this.patients = this.originalPatients.filter(
        (patient) =>
          patient.name
            .toLowerCase()
            .includes(this.patientSearch.toLowerCase()) ||
          patient.id.toLowerCase().includes(this.patientSearch.toLowerCase()) ||
          patient.phone.includes(this.patientSearch)
      );
    }

    // No modal - just update the display silently
  }

  viewPatientHistory(id: string) {
    if (!this.hasAccessTo('patients')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to view patient history.',
        'info'
      );
      return;
    }

    const patient = this.patients.find((p) => p.id === id);
    if (patient) {
      this.viewedPatient = patient;
      this.showPatientHistoryModal = true;
    }
  }

  closePatientHistoryModal() {
    this.showPatientHistoryModal = false;
    this.viewedPatient = null;
  }

  scheduleFollowUp(id: string) {
    if (!this.hasAccessTo('appointments')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to schedule follow-ups.',
        'info'
      );
      return;
    }

    const patient = this.patients.find((p) => p.id === id);
    if (patient) {
      this.viewedPatient = patient;
      // Pre-fill follow-up form with default data
      const today = new Date();
      this.followUpData = {
        date: today.toISOString().split('T')[0],
        time: '10:00 AM',
        service: 'Follow-up',
        notes: '',
      };
      this.showScheduleFollowUpModal = true;
    }
  }

  saveFollowUp() {
    if (!this.hasAccessTo('appointments')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to save follow-up appointments.',
        'info'
      );
      return;
    }

    if (
      this.viewedPatient &&
      this.followUpData.date &&
      this.followUpData.time &&
      this.followUpData.service
    ) {
      // Store patient name before closing modal
      const patientName = this.viewedPatient.name;

      // Close modal
      this.showScheduleFollowUpModal = false;
      this.viewedPatient = null;

      // Show success message
      this.openModal(
        'Follow-up Scheduled',
        `Follow-up appointment for ${patientName} has been successfully scheduled for ${this.followUpData.date} at ${this.followUpData.time}.`,
        'info'
      );
    } else {
      // Show validation error
      this.openModal(
        'Validation Error',
        'Please fill in all required fields (Date, Time, and Service).',
        'info'
      );
    }
  }

  cancelScheduleFollowUp() {
    this.showScheduleFollowUpModal = false;
    this.viewedPatient = null;
  }

  // Testimonial Management
  approveTestimonial(id: string) {
    if (!this.hasAccessTo('testimonials')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to approve testimonials.',
        'info'
      );
      return;
    }

    const testimonial = this.testimonials.find((t) => t.id === id);
    if (testimonial) {
      testimonial.approved = true;
    }
  }

  rejectTestimonial(id: string) {
    if (!this.hasAccessTo('testimonials')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to reject testimonials.',
        'info'
      );
      return;
    }

    this.testimonials = this.testimonials.filter((t) => t.id !== id);
  }

  // Task Management
  addTask() {
    // Show the add task modal
    this.showAddTaskModal = true;
    // Reset form data
    this.newTask = {
      title: '',
      priority: 'medium',
      dueDate: '',
    };
  }

  // Save new task
  saveNewTask() {
    if (this.newTask.title && this.newTask.dueDate) {
      // Create new task object
      const task: Task = {
        id: (this.myTasks.length + 1).toString(),
        title: this.newTask.title,
        priority: this.newTask.priority,
        dueDate: this.newTask.dueDate,
        completed: false,
      };

      // Add to the beginning of the list
      this.myTasks.unshift(task);

      // Update stats
      this.updateTaskStats();

      // Close modal
      this.showAddTaskModal = false;
    } else {
      // Show validation error
      this.openModal(
        'Validation Error',
        'Please fill in all required fields (Task Title and Due Date).',
        'info'
      );
    }
  }

  // Cancel adding task
  cancelAddTask() {
    this.showAddTaskModal = false;
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

  // Finance Management
  viewFinance() {
    if (!this.hasAccessTo('finance')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to access finance information.',
        'info'
      );
      return;
    }

    // Placeholder for finance functionality
    this.openModal(
      'Finance Information',
      'Finance management features would be implemented here.',
      'info'
    );
  }

  approvePayment() {
    if (!this.hasAccessTo('finance')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to approve payments.',
        'info'
      );
      return;
    }

    // Placeholder for payment approval functionality
    this.openModal(
      'Payment Approved',
      'Payment has been successfully approved.',
      'info'
    );
  }

  exportDailyFinanceReport() {
    if (!this.hasAccessTo('finance')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to export finance reports.',
        'info'
      );
      return;
    }

    // Placeholder for finance report export functionality
    this.openModal(
      'Report Exported',
      'Daily finance report has been exported to Excel format.',
      'info'
    );
  }

  // Report Management
  exportDailyTransactionReport() {
    if (!this.hasAccessTo('reports')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to export transaction reports.',
        'info'
      );
      return;
    }

    // Placeholder for transaction report export functionality
    this.openModal(
      'Report Exported',
      'Daily transaction report has been exported to Excel format.',
      'info'
    );
  }

  exportPatientHistoryReport() {
    if (!this.hasAccessTo('reports')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to export patient history reports.',
        'info'
      );
      return;
    }

    // Placeholder for patient history report export functionality
    this.openModal(
      'Report Exported',
      'Patient history report has been exported to Excel format.',
      'info'
    );
  }

  // Navigation and System Actions
  logout() {
    // Clear session data
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentShift');
    sessionStorage.removeItem('staffId');
    sessionStorage.removeItem('workType');

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
      // Get current route from work type
      const dashboardRoute = `/${this.currentUser.workType}-dashboard`;
      this.router.navigate([dashboardRoute]);
    });
  }

  // Tab Management
  switchTab(tabName: string) {
    // Check if user has access to this tab
    if (tabName !== 'dashboard' && !this.hasAccessTo(tabName)) {
      this.openModal(
        'Access Denied',
        `You do not have permission to access the ${tabName} section.`,
        'info'
      );
      return;
    }

    this.activeTab = tabName;
  }

  switchDoctorSubTab(subTabName: string) {
    this.doctorSubTab = subTabName;
  }

  isActiveDoctorSubTab(subTabName: string): boolean {
    return this.doctorSubTab === subTabName;
  }

  isActiveTab(tabName: string): boolean {
    return this.activeTab === tabName;
  }

  // Dropdown Management
  toggleDropdown(event: MouseEvent) {
    event?.preventDefault();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const dropdownElement =
      this.elementRef.nativeElement.querySelector('.dropdown');
    if (
      dropdownElement &&
      !dropdownElement.contains(event.target) &&
      this.isDropdownOpen
    ) {
      this.closeDropdown();
    }
  }

  // Add scroll event listener for sticky tabs
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    this.handleScroll();
  }

  private updateTaskStats() {
    if (this.myTasks) {
      this.totalTasks = this.myTasks.length;
      this.completedTasksCount = this.myTasks.filter(
        (t: Task) => t.completed
      ).length;
      this.pendingTasksCount = this.myTasks.filter(
        (t: Task) => !t.completed
      ).length;
    }
  }

  // Doctor-specific methods
  addLabTest(patientId: string) {
    if (!this.hasAccessTo('patients')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to add lab tests.',
        'info'
      );
      return;
    }

    const patient = this.patients.find((p) => p.id === patientId);
    if (patient && this.newLabTest.testName) {
      const labTest: LabTest = {
        id: 'LT' + (patient.labTests.length + 1).toString().padStart(3, '0'),
        testName: this.newLabTest.testName,
        status: 'pending',
        result: '',
        notes: this.newLabTest.notes,
        dateRequested: new Date().toISOString().split('T')[0],
        dateCompleted: '',
      };

      patient.labTests.push(labTest);

      // Reset form
      this.newLabTest = {
        testName: '',
        notes: '',
      };

      this.showAddLabTestModal = false;

      this.openModal(
        'Lab Test Added',
        `Lab test "${labTest.testName}" has been added for ${patient.name}.`,
        'info'
      );
    }
  }

  addPrescription(patientId: string) {
    if (!this.hasAccessTo('patients')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to add prescriptions.',
        'info'
      );
      return;
    }

    const patient = this.patients.find((p) => p.id === patientId);
    if (patient && this.newPrescription.medicineName) {
      const prescription: Prescription = {
        id:
          'RX' + (patient.prescriptions.length + 1).toString().padStart(3, '0'),
        medicineName: this.newPrescription.medicineName,
        dosage: this.newPrescription.dosage,
        frequency: this.newPrescription.frequency,
        duration: this.newPrescription.duration,
        notes: this.newPrescription.notes,
        datePrescribed: new Date().toISOString().split('T')[0],
      };

      patient.prescriptions.push(prescription);

      // Reset form
      this.newPrescription = {
        medicineName: '',
        dosage: '',
        frequency: '',
        duration: '',
        notes: '',
      };

      this.showAddPrescriptionModal = false;

      this.openModal(
        'Prescription Added',
        `Prescription for "${prescription.medicineName}" has been added for ${patient.name}.`,
        'info'
      );
    }
  }

  // View lab test results
  viewLabResults(patientId: string) {
    if (!this.hasAccessTo('patients')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to view lab results.',
        'info'
      );
      return;
    }

    const patient = this.patients.find((p) => p.id === patientId);
    if (patient) {
      this.viewedPatient = patient;
      // We'll use the patient history modal to show lab results
      this.showPatientHistoryModal = true;
    }
  }

  // Update patient details (only recent data can be edited)
  updatePatientDetails(patientId: string) {
    if (!this.hasAccessTo('patients')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to update patient details.',
        'info'
      );
      return;
    }

    const patient = this.patients.find((p) => p.id === patientId);
    if (patient) {
      // Only allow editing of recent data (status, current medications, etc.)
      // In a real implementation, you would show a form to edit these fields
      this.openModal(
        'Update Patient',
        `Updating details for ${patient.name}. Only recent data can be modified.`,
        'info'
      );
    }
  }

  // Show modal to add lab test
  showAddLabTestForm(patientId: string) {
    if (!this.hasAccessTo('patients')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to add lab tests.',
        'info'
      );
      return;
    }

    const patient = this.patients.find((p) => p.id === patientId);
    if (patient) {
      this.viewedPatient = patient;
      this.showAddLabTestModal = true;
    }
  }

  // Show modal to add prescription
  showAddPrescriptionForm(patientId: string) {
    if (!this.hasAccessTo('patients')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to add prescriptions.',
        'info'
      );
      return;
    }

    const patient = this.patients.find((p) => p.id === patientId);
    if (patient) {
      this.viewedPatient = patient;
      this.showAddPrescriptionModal = true;
    }
  }

  // Close modals
  closeAddLabTestModal() {
    this.showAddLabTestModal = false;
    this.viewedPatient = null;
  }

  closeAddPrescriptionModal() {
    this.showAddPrescriptionModal = false;
    this.viewedPatient = null;
  }

  // Add form data for lab functionality
  labTestResult = {
    result: '',
    notes: '',
  };

  showLabTestResultModal = false;

  // Add property to track selected test
  selectedTestId: string = '';
  selectedTest: any = null;

  // Lab-specific methods
  processLabTest(patientId: string, testId: string) {
    if (!this.hasAccessTo('patients')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to process lab tests.',
        'info'
      );
      return;
    }

    const patient = this.patients.find((p) => p.id === patientId);
    if (patient) {
      const test = patient.labTests.find((t) => t.id === testId);
      if (test) {
        this.viewedPatient = patient;
        this.selectedTestId = testId;
        this.selectedTest = test;
        // We'll use a modal to enter results
        this.showLabTestResultModal = true;
      }
    }
  }

  submitLabTestResult(patientId: string, testId: string) {
    if (!this.hasAccessTo('patients')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to submit lab test results.',
        'info'
      );
      return;
    }

    const patient = this.patients.find((p) => p.id === patientId);
    if (patient && this.labTestResult.result) {
      const test = patient.labTests.find((t) => t.id === testId);
      if (test) {
        test.result = this.labTestResult.result;
        test.status = 'completed';
        test.dateCompleted = new Date().toISOString().split('T')[0];
        test.notes = this.labTestResult.notes;

        // Reset form
        this.labTestResult = {
          result: '',
          notes: '',
        };

        this.showLabTestResultModal = false;
        this.viewedPatient = null;

        // Update stats if user is a doctor
        if (this.currentUser.workType === 'doctor') {
          this.calculateDoctorStats();
        }

        this.openModal(
          'Test Result Submitted',
          `Lab test result for "${test.testName}" has been submitted for ${patient.name}.`,
          'info'
        );
      }
    }
  }

  closeLabTestResultModal() {
    this.showLabTestResultModal = false;
    this.viewedPatient = null;
    this.selectedTestId = '';
    this.selectedTest = null;
    // Reset form
    this.labTestResult = {
      result: '',
      notes: '',
    };
  }

  // Add pharmacy-specific data
  medicines: Medicine[] = [
    {
      id: 'MED001',
      name: 'Amoxicillin',
      type: 'Antibiotic',
      price: 15.99,
      category: 'Prescription',
      description: 'Used to treat bacterial infections',
      stock: 100,
    },
    {
      id: 'MED002',
      name: 'Paracetamol',
      type: 'Painkiller',
      price: 5.99,
      category: 'Over-the-counter',
      description: 'Used to treat pain and fever',
      stock: 200,
    },
    {
      id: 'MED003',
      name: 'Ibuprofen',
      type: 'Anti-inflammatory',
      price: 8.99,
      category: 'Over-the-counter',
      description: 'Used to treat pain and inflammation',
      stock: 150,
    },
  ];

  // Add form data for pharmacy functionality
  newMedicine = {
    name: '',
    type: '',
    price: 0,
    category: '',
    description: '',
    stock: 0,
  };

  editingMedicine: Medicine | null = null;
  showMedicineModal = false;

  // Pharmacy-specific methods
  showAddMedicineForm() {
    if (!this.hasAccessTo('patients')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to manage medicines.',
        'info'
      );
      return;
    }

    this.editingMedicine = null;
    this.newMedicine = {
      name: '',
      type: '',
      price: 0,
      category: '',
      description: '',
      stock: 0,
    };
    this.showMedicineModal = true;
  }

  showEditMedicineForm(medicine: Medicine) {
    if (!this.hasAccessTo('patients')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to manage medicines.',
        'info'
      );
      return;
    }

    this.editingMedicine = medicine;
    this.newMedicine = {
      name: medicine.name,
      type: medicine.type,
      price: medicine.price,
      category: medicine.category,
      description: medicine.description,
      stock: medicine.stock,
    };
    this.showMedicineModal = true;
  }

  saveMedicine() {
    if (!this.hasAccessTo('patients')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to manage medicines.',
        'info'
      );
      return;
    }

    if (
      this.newMedicine.name &&
      this.newMedicine.type &&
      this.newMedicine.price > 0 &&
      this.newMedicine.category
    ) {
      if (this.editingMedicine) {
        // Update existing medicine
        const index = this.medicines.findIndex(
          (m) => m.id === this.editingMedicine!.id
        );
        if (index !== -1) {
          this.medicines[index] = {
            ...this.editingMedicine!,
            name: this.newMedicine.name,
            type: this.newMedicine.type,
            price: this.newMedicine.price,
            category: this.newMedicine.category,
            description: this.newMedicine.description,
            stock: this.newMedicine.stock,
          };
        }

        this.openModal(
          'Medicine Updated',
          `Medicine "${this.newMedicine.name}" has been updated.`,
          'info'
        );
      } else {
        // Add new medicine
        const medicine: Medicine = {
          id: 'MED' + (this.medicines.length + 1).toString().padStart(3, '0'),
          name: this.newMedicine.name,
          type: this.newMedicine.type,
          price: this.newMedicine.price,
          category: this.newMedicine.category,
          description: this.newMedicine.description,
          stock: this.newMedicine.stock,
        };

        this.medicines.push(medicine);

        this.openModal(
          'Medicine Added',
          `Medicine "${medicine.name}" has been added to the inventory.`,
          'info'
        );
      }

      this.closeMedicineModal();
    } else {
      this.openModal(
        'Validation Error',
        'Please fill in all required fields (Name, Type, Price, and Category).',
        'info'
      );
    }
  }

  deleteMedicine(medicineId: string) {
    if (!this.hasAccessTo('patients')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to manage medicines.',
        'info'
      );
      return;
    }

    const medicine = this.medicines.find((m) => m.id === medicineId);
    if (medicine) {
      if (confirm(`Are you sure you want to delete "${medicine.name}"?`)) {
        this.medicines = this.medicines.filter((m) => m.id !== medicineId);

        this.openModal(
          'Medicine Deleted',
          `Medicine "${medicine.name}" has been removed from the inventory.`,
          'info'
        );
      }
    }
  }

  closeMedicineModal() {
    this.showMedicineModal = false;
    this.editingMedicine = null;
    this.newMedicine = {
      name: '',
      type: '',
      price: 0,
      category: '',
      description: '',
      stock: 0,
    };
  }

  // Print prescription
  printPrescription(patientId: string) {
    if (!this.hasAccessTo('patients')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to print prescriptions.',
        'info'
      );
      return;
    }

    const patient = this.patients.find((p) => p.id === patientId);
    if (patient) {
      // In a real implementation, this would generate a printable prescription
      this.openModal(
        'Print Prescription',
        `Prescription for ${patient.name} is ready to print.`,
        'info'
      );
    }
  }

  // Add method to approve prescriptions
  approvePrescription(patientId: string, prescriptionId: string) {
    if (!this.hasAccessTo('patients')) {
      this.openModal(
        'Access Denied',
        'You do not have permission to approve prescriptions.',
        'info'
      );
      return;
    }

    const patient = this.patients.find((p) => p.id === patientId);
    if (patient) {
      const prescription = patient.prescriptions.find(
        (p) => p.id === prescriptionId
      );
      if (prescription) {
        // In a real implementation, you might want to mark the prescription as approved
        // For now, we'll just show a confirmation message
        this.openModal(
          'Prescription Approved',
          `Prescription for "${prescription.medicineName}" has been approved for ${patient.name}.`,
          'info'
        );
      }
    }
  }

  // Sticky nav state
  isNavSticky = false;
  stickyTabsHeight = 80; // Default height in pixels

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    // Recalculate tab height when window is resized and tabs are sticky
    if (this.isNavSticky) {
      setTimeout(() => {
        const tabsElement = document.querySelector('.sub-admin-tabs');
        if (tabsElement) {
          this.stickyTabsHeight = tabsElement.clientHeight;
        }
      }, 0);
    }
  }

  // Handle scroll event for sticky nav
  handleScroll() {
    if (typeof window !== 'undefined') {
      const scrollPosition = window.scrollY;
      const wasSticky = this.isNavSticky;
      this.isNavSticky = scrollPosition > 100;

      // If tabs just became sticky, calculate their height
      if (this.isNavSticky && !wasSticky) {
        setTimeout(() => {
          const tabsElement = document.querySelector('.sub-admin-tabs');
          if (tabsElement) {
            this.stickyTabsHeight = tabsElement.clientHeight;
          }
        }, 0);
      }
    }
  }

  // Add method to filter patient history based on viewed patient
  getFilteredPatientHistory(): any[] {
    if (this.viewedPatient) {
      return this.patientHistory.filter(
        (history: any) => history.patientId === this.viewedPatient?.id
      );
    }
    return [];
  }
}
