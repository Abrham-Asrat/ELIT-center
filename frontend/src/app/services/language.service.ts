import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Translations {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>('en');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  private translations: { [key: string]: Translations } = {
    en: {
      // App Title
      title: 'ELIT ENT Center',

      // Navbar
      home: 'Home',
      services: 'Services',
      doctor: 'Doctor Profile',
      about: 'About Us',
      appointment: 'Book Appointment',
      language: 'Language',

      // Home Page
      welcomeTitle: 'Welcome to ELIT ENT Center',
      welcomeSubtitle:
        'Expert ear, nose, and throat care with Dr. Abiy - your trusted ENT specialist providing comprehensive medical solutions with compassionate care.',
      bookAppointment: 'Book Appointment',
      ourServices: 'Our Services',
      specializedServices: 'Our Specialized Services',
      specializedServicesDesc:
        'Comprehensive ENT care tailored to your specific needs',
      viewAllServices: 'View All Services',
      meetSpecialist: 'Meet Your ENT Specialist',
      meetSpecialistDesc:
        'Dr. Abiy brings extensive experience and cutting-edge techniques to provide the highest quality ENT care. Specializing in both medical and surgical treatments, Dr. Abiy is committed to improving your quality of life.',
      yearsExperience: 'Years Experience',
      patientsTreated: 'Patients Treated',
      viewFullProfile: 'View Full Profile',
      patientTestimonials: 'What Our Patients Say',
      testimonialsDesc:
        'Real experiences from patients who trust us with their ENT care',
      readyToStart: 'Ready to Get Started?',
      readyToStartDesc:
        'Take the first step towards better ENT health. Schedule your appointment today.',

      // Testimonials
      testimonials: [
        {
          name: 'Sarah Johnson',
          text: 'Dr. Abiy provided exceptional care for my chronic sinus issues. I can breathe freely again!',
          rating: 5,
        },
        {
          name: 'Michael Brown',
          text: 'The hearing test was thorough and the staff was incredibly professional and caring.',
          rating: 5,
        },
        {
          name: 'Emily Davis',
          text: 'Outstanding treatment for my throat condition. Dr. Abiy is truly an expert in his field.',
          rating: 5,
        },
        {
          name: 'Jennifer Wilson',
          text: 'Excellent service and very knowledgeable doctor. Highly recommend for ENT issues.',
          rating: 5,
        },
        {
          name: 'David Miller',
          text: 'Professional, caring, and effective treatment. My family trusts Dr. Abiy completely.',
          rating: 5,
        },
        {
          name: 'Lisa Anderson',
          text: 'Great experience from start to finish. The clinic is modern and the staff is friendly.',
          rating: 5,
        },
        {
          name: 'Robert Thompson',
          text: "Dr. Abiy solved my hearing problems that other doctors couldn't. Truly exceptional!",
          rating: 5,
        },
      ],

      // Services
      hearingTests: 'Hearing Tests',
      hearingTestsDesc:
        'Comprehensive hearing evaluations and audiometry services',
      sinusTreatment: 'Sinus Treatment',
      sinusTreatmentDesc:
        'Advanced treatment for chronic sinusitis and nasal disorders',
      throatDisorders: 'Throat Disorders',
      throatDisordersDesc:
        'Expert care for voice, swallowing, and throat conditions',
      allergyManagement: 'Allergy Management',
      allergyManagementDesc:
        'Comprehensive allergy testing and treatment plans',
      completeENTCare: 'Complete ENT Care',
      completeENTCareDesc:
        'From diagnosis to treatment, we provide comprehensive care for all ENT conditions',
      diagnosticServices: 'Diagnostic Services',
      diagnosticServicesDesc:
        'Advanced diagnostic procedures for accurate ENT condition assessment',
      surgicalProcedures: 'Surgical Procedures',
      surgicalProceduresDesc:
        'Minimally invasive and traditional surgical options for ENT conditions',

      // Doctor Page
      doctorTitle: 'Dr. Abiy',
      doctorSubtitle: 'ENT Specialist & Surgeon',
      doctorDescription:
        'Board-certified ENT specialist with over 15 years of experience providing comprehensive care for ear, nose, and throat conditions with a focus on patient-centered treatment and innovative surgical techniques.',
      educationQualifications: 'Education & Qualifications',
      areasOfSpecialization: 'Areas of Specialization',
      professionalExperience: 'Professional Experience',
      awardsRecognition: 'Awards & Recognition',
      recentPublications: 'Recent Publications',
      doctorPhilosophy: "Dr. Abiy's Philosophy",
      philosophyText:
        "My approach to medicine is founded on the belief that every patient deserves personalized, compassionate care. I strive to combine the latest medical advances with a deep understanding of each patient's unique needs.",
      philosophyQuote:
        "Healing is not just about treating symptoms—it's about restoring quality of life and empowering patients to live their best lives.",
      scheduleConsultation: 'Schedule Your Consultation',
      consultationDesc:
        'Experience expert ENT care with Dr. Abiy. Book your appointment today and take the first step towards better health.',
      callNow: 'Call Now',
      patientCenteredCare: 'Patient-Centered Care',
      surgeries: 'Surgeries Performed',
      patientSatisfaction: 'Patient Satisfaction',

      // About Us
      aboutTitle: 'About ELIT ENT Center',
      aboutSubtitle:
        'Dedicated to providing exceptional ear, nose, and throat care with compassion, expertise, and cutting-edge medical technology.',
      ourMission: 'Our Mission',
      missionText:
        'At ELIT ENT Center, our mission is to provide comprehensive, patient-centered care for all ear, nose, and throat conditions. We are committed to combining advanced medical technology with compassionate care to improve the quality of life for our patients.',
      ourVision: 'Our Vision',
      visionText:
        'To be recognized as the leading ENT center, known for excellence in patient care, innovative treatments, and outstanding medical outcomes.',
      coreValues: 'Our Core Values',
      coreValuesDesc:
        'The principles that guide everything we do at ELIT ENT Center',

      // Appointment
      appointmentTitle: 'Book Your Appointment',
      appointmentSubtitle:
        'Schedule your visit with Dr. Abiy and take the first step towards better ENT health.',
      personalInfo: 'Personal Information',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      dateOfBirth: 'Date of Birth',
      appointmentDetails: 'Appointment Details',
      preferredDate: 'Preferred Date',
      preferredTime: 'Preferred Time',
      serviceType: 'Type of Service',
      reasonForVisit: 'Reason for Visit',
      submitRequest: 'Submit Appointment Request',
      contactInfo: 'Contact Information',
      emergencyCare: 'Emergency Care',

      // Footer
      footerDesc:
        'Providing comprehensive ear, nose, and throat care with the latest medical technology and compassionate service under the expert guidance of Dr. Abiy.',
      quickLinks: 'Quick Links',
      contactUs: 'Contact Info',
      allRightsReserved: 'All rights reserved.',
      designedWithCare: 'Designed with care for your health',
    },

    am: {
      // App Title
      title: 'ኤሊት ኢ.ኤን.ቲ ማዕከል',

      // Navbar
      home: 'ቤት',
      services: 'አገልግሎቶች',
      doctor: 'የዶክተር መዝገብ',
      about: 'ስለ እኛ',
      appointment: 'ቀጠሮ ይያዙ',
      language: 'ቋንቋ',

      // Home Page
      welcomeTitle: 'ወደ ኤሊት ኢ.ኤን.ቲ ማዕከል እንኳን በደህና መጡ',
      welcomeSubtitle:
        'በዶክተር አብይ - የአንተ የተመረጠ ኢ.ኤን.ቲ ስፔሻሊስት በሚሰጥ አጠቃላይ የህክምና መፍትሄዎች እና በርህራሄ የተሞላ እንክብካቤ የጆሮ፣ የአፍንጫ እና የጉሮሮ ባለሙያ እንክብካቤ።',
      bookAppointment: 'ቀጠሮ ይያዙ',
      ourServices: 'የእኛ አገልግሎቶች',
      specializedServices: 'የተለየ የእኛ አገልግሎቶች',
      specializedServicesDesc: 'ለአንተ የተለየ ፍላጎት የተዘጋጀ አጠቃላይ ኢ.ኤን.ቲ እንክብካቤ',
      viewAllServices: 'ሁሉንም አገልግሎቶች ይመልከቱ',
      meetSpecialist: 'የእኛን ኢ.ኤን.ቲ ስፔሻሊስት ይገናኙ',
      meetSpecialistDesc:
        'ዶክተር አብይ ከፍተኛ ተሞክሮ እና የዘመናዊ ቴክኒኮችን በማጣመር ከፍተኛ ጥራት ያለው ኢ.ኤን.ቲ እንክብካቤ ይሰጣል። በህክምና እና በቀዶ ጥገና ሕክምናዎች ላይ ስፔሻሊስት በመሆን የእርስዎን የህይወት ጥራት ለማሻሻል ቁርጠኝነት አለው።',
      yearsExperience: 'ዓመታት ተሞክሮ',
      patientsTreated: 'የታከሙ ታካሚዎች',
      viewFullProfile: 'ሙሉ መገለጫ ይመልከቱ',
      patientTestimonials: 'ታካሚዎቻችን ምን ይላሉ',
      testimonialsDesc: 'ለኢ.ኤን.ቲ እንክብካቤ የሚታመኑን ታካሚዎች እውነተኛ ተሞክሮዎች',
      readyToStart: 'ለመጀመር ዝግጁ ነዎት?',
      readyToStartDesc:
        'የተሻለ ኢ.ኤን.ቲ ጤንነት ዘንድ የመጀመሪያውን እርምጃ ይውሰዱ። ዛሬ ቀጠሮዎን ያርሱ።',

      // Testimonials
      testimonials: [
        {
          name: 'ሳራ ጆንሰን',
          text: 'ዶክተር አብይ ለሥር የሰደደ የሳይናስ ችግሮቼ ልዩ እንክብካቤ ሰጠኝ። አሁን በነፃነት መተንፈስ እችላለሁ!',
          rating: 5,
        },
        {
          name: 'ሚካኤል ብራውን',
          text: 'የመስማት ፈተናው ሁለንተናዊ ነበር እና ሰራተኞቹ በጣም ባለሙያ እና አሳቢ ነበሩ።',
          rating: 5,
        },
        {
          name: 'ኤሚሊ ዴቪስ',
          text: 'ለጉሮሮ ሁኔታዬ ድንቅ ሕክምና። ዶክተር አብይ በእውነት በመስኩ ባለሙያ ነው።',
          rating: 5,
        },
        {
          name: 'ጄኒፈር ዊልሰን',
          text: 'ድንቅ አገልግሎት እና በጣም እውቀት ያለው ዶክተር። ለኢ.ኤን.ቲ ችግሮች በጣም እመክራለሁ።',
          rating: 5,
        },
        {
          name: 'ዴቪድ ሚለር',
          text: 'ባለሙያ፣ አሳቢ እና ውጤታማ ሕክምና። ቤተሰቤ ዶክተር አብይን ሙሉ በሙሉ ይታመናል።',
          rating: 5,
        },
        {
          name: 'ሊሳ አንደርሰን',
          text: 'ከመጀመሪያ እስከ መጨረሻ ድንቅ ተሞክሮ። ክሊኒኩ ዘመናዊ ሲሆን ሰራተኞቹ ወዳጃዊ ናቸው።',
          rating: 5,
        },
        {
          name: 'ሮበርት ቶምፕሰን',
          text: 'ዶክተር አብይ ሌሎች ዶክተሮች ሊፈቱ የማይችሉትን የመስማት ችግሮቼን ፈታ። በእውነት ልዩ!',
          rating: 5,
        },
      ],

      // Services
      hearingTests: 'የመስማት ፈተናዎች',
      hearingTestsDesc: 'አጠቃላይ የመስማት ግምገማ እና የኦዲዮሜትሪ አገልግሎቶች',
      sinusTreatment: 'የሳይናስ ሕክምና',
      sinusTreatmentDesc: 'ለሥር የሰደደ ሳይኑሳይተስ እና የአፍንጫ ችግሮች የላቀ ሕክምና',
      throatDisorders: 'የጉሮሮ ችግሮች',
      throatDisordersDesc: 'ለድምፅ፣ መዋጥ እና የጉሮሮ ሁኔታዎች ባለሙያ እንክብካቤ',
      allergyManagement: 'የአለርጂ አስተዳደር',
      allergyManagementDesc: 'አጠቃላይ የአለርጂ ፈተና እና የሕክምና እቅዶች',
      completeENTCare: 'ሙሉ ኢ.ኤን.ቲ እንክብካቤ',
      completeENTCareDesc:
        'ከምርመራ እስከ ሕክምና፣ ለሁሉም ኢ.ኤን.ቲ ሁኔታዎች አጠቃላይ እንክብካቤ እንሰጣለን',
      diagnosticServices: 'የምርመራ አገልግሎቶች',
      diagnosticServicesDesc: 'ለትክክለኛ ኢ.ኤን.ቲ ሁኔታ ግምገማ የላቀ የምርመራ ሂደቶች',
      surgicalProcedures: 'የቀዶ ጥገና ሂደቶች',
      surgicalProceduresDesc: 'ለኢ.ኤን.ቲ ሁኔታዎች አነስተኛ ወራሪ እና ባህላዊ የቀዶ ጥገና አማራጮች',

      // Doctor Page
      doctorTitle: 'ዶክተር አብይ',
      doctorSubtitle: 'የኢ.ኤን.ቲ ስጴሻሊስት እና ቀዶ ጦርኖን',
      doctorDescription:
        'ለ 15 ዓመታት ከተገጣሶች የተሳሳበው የበአል ኢ.ኤን.ቲ ስጴሻሊስት በታካሚ መካከል ዕና ግርብል ሕክምና ሖዳች ላይ ካተከተለ አጠቃላይ እንክብካቤ ይሰጣል።',
      educationQualifications: 'የትምሕርት እና የእምጢ አግፂነቶች',
      areasOfSpecialization: 'የስፐሽላይዜሽን አረጦች',
      professionalExperience: 'የቀራያ ተምዎክኈ',
      awardsRecognition: 'ትራቶች እና እጠቅታ',
      recentPublications: 'የቀርቦጹ ምጥፍፎች',
      doctorPhilosophy: 'የዶክተር አብይ የፍልስፈ አሰራር',
      philosophyText:
        'የሕክምና አመልካፄ ሜላሜዅ ታካሚ የግል ን እና ሳላወይ እንክብካቤ የመሹባት እምኔት ላይ የተሳሳበ ነው፡',
      philosophyQuote:
        'ምክንያት ስምፕተሞችን ማካከም ብቻ አይደለም። የህይወት ጥራትን ማስተጣወን እና ታካሚዎች የተታያ ህይወታቸውን እንዲወሑ መዓማገጡ ነው፡',
      scheduleConsultation: 'የከፈና አገልግሎትን ያርሱ',
      consultationDesc:
        'ከዶክተር አብይ ጋር የኢ.ኤን.ቲ የባልሙያ እንክብካቤ ይወስዱ፡ ቀደሞን ያርሱ እና ዳሸሰ ተከላ መራ ከፈና ስያትን ይኩ፡',
      callNow: 'አሁን ይመዑ',
      patientCenteredCare: 'በታካሚ መካከል ከፈባ የኤንክብካቤ አግልግቦት',
      surgeries: 'የተወሰዱ ቀዶ ጥገናዎች',
      patientSatisfaction: 'የታካሚ ዥችጋሴ',

      // About Us
      aboutTitle: 'ስለ ኤሊት ኢ.ኤን.ቲ ማዕከል',
      aboutSubtitle:
        'በርህራሄ፣ በባለሙያነት እና በዘመናዊ የሕክምና ቴክኖሎጂ ልዩ የጆሮ፣ የአፍንጫ እና የጉሮሮ እንክብካቤ ለመስጠት ተጠቅሞላል።',
      ourMission: 'የእኛ ተልዕኮ',
      missionText:
        'በኤሊት ኢ.ኤን.ቲ ማዕከል፣ የእኛ ተልዕኮ ለሁሉም የጆሮ፣ የአፍንጫ እና የጉሮሮ ሁኔታዎች አጠቃላይ፣ በታካሚ ላይ ያተኮረ እንክብካቤ መስጠት ነው። የላቀ የሕክምና ቴክኖሎጂን ከርህራሄ እንክብካቤ ጋር በማጣመር የታካሚዎቻችንን የህይወት ጥራት ለማሻሻል ቁርጠኝነት አለን።',
      ourVision: 'የእኛ ራዕይ',
      visionText:
        'በታካሚ እንክብካቤ፣ በፈጠራ ሕክምናዎች እና በድንቅ የሕክምና ውጤቶች ላይ በእኩልነት የሚታወቅ ግንባር ቀደም ኢ.ኤን.ቲ ማዕከል ሆኖ መታወቅ።',
      coreValues: 'የእኛ ዋና እሴቶች',
      coreValuesDesc: 'በኤሊት ኢ.ኤን.ቲ ማዕከል የምንሰራቸውን ሁሉ የሚመሩ መርሆዎች',

      // Appointment
      appointmentTitle: 'ቀጠሮዎን ያርሱ',
      appointmentSubtitle:
        'ከዶክተር አብይ ጋር ጉብኝትዎን ያርሱ እና የተሻለ ኢ.ኤን.ቲ ጤንነት ዘንድ የመጀመሪያውን እርምጃ ይውሰዱ።',
      personalInfo: 'የግል መረጃ',
      firstName: 'የመጀመሪያ ስም',
      lastName: 'የአባት ስም',
      email: 'የኢሜይል አድራሻ',
      phone: 'የስልክ ቁጥር',
      dateOfBirth: 'የትውልድ ቀን',
      appointmentDetails: 'የቀጠሮ ዝርዝሮች',
      preferredDate: 'የተመረጠ ቀን',
      preferredTime: 'የተመረጠ ሰዓት',
      serviceType: 'የአገልግሎት አይነት',
      reasonForVisit: 'የመጎብኘት ምክንያት',
      submitRequest: 'የቀጠሮ ጥያቄ አስገባ',
      contactInfo: 'የእውቂያ መረጃ',
      emergencyCare: 'የአስቸኳይ እንክብካቤ',

      // Footer
      footerDesc:
        'በዶክተር አብይ የባለሙያ አመራር ስር ከዘመናዊ የሕክምና ቴክኖሎጂ እና በርህራሄ የተሞላ አገልግሎት ጋር አጠቃላይ የጆሮ፣ የአፍንጫ እና የጉሮሮ እንክብካቤ መስጠት።',
      quickLinks: 'ፈጣን አገናኞች',
      contactUs: 'የእውቂያ መረጃ',
      allRightsReserved: 'ሁሉም መብቶች የተጠበቁ ናቸው።',
      designedWithCare: 'ለጤንነትዎ በእንክብካቤ የተነደፈ',
    },
  };

  constructor() {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'am')) {
      this.currentLanguageSubject.next(savedLanguage);
    }
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  changeLanguage(lang: string) {
    this.currentLanguageSubject.next(lang);
    localStorage.setItem('selectedLanguage', lang);
  }

  getTranslation(key: string): string {
    const currentLang = this.getCurrentLanguage();
    return this.translations[currentLang][key] || key;
  }

  getTranslations(): Translations {
    const currentLang = this.getCurrentLanguage();
    return this.translations[currentLang];
  }

  getTestimonials(): any[] {
    const currentLang = this.getCurrentLanguage();
    return this.translations[currentLang]['testimonials'] || [];
  }
}
