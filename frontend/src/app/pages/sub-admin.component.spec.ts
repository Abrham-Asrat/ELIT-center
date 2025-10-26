import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubAdminComponent } from './sub-admin.component';
import { LanguageService } from '../services/language.service';
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('SubAdminComponent', () => {
  let component: SubAdminComponent;
  let fixture: ComponentFixture<SubAdminComponent>;
  let mockRouter: any;
  let mockElementRef: any;
  let mockLanguageService: any;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockElementRef = jasmine.createSpyObj('ElementRef', ['nativeElement']);
    mockLanguageService = jasmine.createSpyObj('LanguageService', ['getCurrentLanguage']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterModule, FormsModule, SubAdminComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ElementRef, useValue: mockElementRef },
        { provide: LanguageService, useValue: mockLanguageService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SubAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('hasAccessTo', () => {
    it('should return true for receptionist accessing appointments', () => {
      component.currentUser.workType = 'reception';
      expect(component.hasAccessTo('appointments')).toBe(true);
    });

    it('should return true for doctor accessing appointments', () => {
      component.currentUser.workType = 'doctor';
      expect(component.hasAccessTo('appointments')).toBe(true);
    });

    it('should return false for lab technician accessing appointments', () => {
      component.currentUser.workType = 'lab';
      expect(component.hasAccessTo('appointments')).toBe(false);
    });

    it('should return true for lab technician accessing patients', () => {
      component.currentUser.workType = 'lab';
      expect(component.hasAccessTo('patients')).toBe(true);
    });

    it('should return false for unknown feature', () => {
      component.currentUser.workType = 'other';
      expect(component.hasAccessTo('unknown-feature')).toBe(false);
    });
  });

  describe('setRoleName', () => {
    it('should set role to Receptionist for reception work type', () => {
      component.currentUser.workType = 'reception';
      component.setRoleName();
      expect(component.currentUser.role).toBe('Receptionist');
    });

    it('should set role to Doctor for doctor work type', () => {
      component.currentUser.workType = 'doctor';
      component.setRoleName();
      expect(component.currentUser.role).toBe('Doctor');
    });

    it('should set role to Staff Member for unknown work type', () => {
      component.currentUser.workType = 'unknown';
      component.setRoleName();
      expect(component.currentUser.role).toBe('Staff Member');
    });
  });
});