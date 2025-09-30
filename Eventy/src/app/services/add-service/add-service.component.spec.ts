import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddServiceComponent } from './add-service.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { SolutionCategoryService } from '../../solutions/services/solutions/solution-category.service';
import { EventTypeService } from '../../events/event-type.service';
import { ServicesService } from '../services/services/services.service';
import { Router } from '@angular/router';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { of } from 'rxjs';  // to mock observables
import { By } from '@angular/platform-browser';
import { Category, Status } from '../../solutions/model/category.model';
import { ServicesServiceMock } from '../services/services/services.service.mock';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { EventType, EventTypeCard } from '../../events/model/events.model';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { CategoryWithId } from '../../solutions/model/category-with-id.model';

describe('AddServiceComponent - Valid Form Submission', () => {
  let component: AddServiceComponent;
  let fixture: ComponentFixture<AddServiceComponent>;
  let solutionCategoryServiceSpy: jasmine.SpyObj<SolutionCategoryService>;
  let eventTypeServiceSpy: jasmine.SpyObj<EventTypeService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  // Mock event types outside the test
  const mockEventTypes: EventTypeCard[] = [
    { id: 1, name: 'Event 1' },
    { id: 2, name: 'Event 2' }
  ];

  const mockCategories: Category[] = [
    { name: 'test1cat', description: 'test', status: Status.ACCEPTED },
    { name: 'test2cat', description: 'test', status: Status.ACCEPTED }
  ]

  const mockCreatedCategory: CategoryWithId = {
    id: 3, name: "NewTestCategory", description: "NewTestCatDesc", status: Status.ACCEPTED 
  }

  beforeEach(async () => {
    const categorySpy = jasmine.createSpyObj('SolutionCategoryService', ['getAll', 'create']);
    categorySpy.getAll.and.returnValue(of(mockCategories));
    categorySpy.create.and.returnValue(of(mockCreatedCategory));
    const eventSpy = jasmine.createSpyObj('EventTypeService', ['getActiveEventTypes']);
    eventSpy.getActiveEventTypes.and.returnValue(of(mockEventTypes));
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const dialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    const authServiceMock = jasmine.createSpyObj('AuthService', ['getId']);

    authServiceMock.getId.and.returnValue('mock-user-id');

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatCheckboxModule,
        MatSelectModule, BrowserAnimationsModule
      ],
      providers: [
        { provide: ServicesService, useClass: ServicesServiceMock },
        { provide: SolutionCategoryService, useValue: categorySpy },
        { provide: EventTypeService, useValue: eventSpy },
        { provide: Router, useValue: routerMock },
        { provide: MatDialog, useValue: dialogMock },
        provideHttpClientTesting(),
        { provide: AuthService, useValue: authServiceMock }
      ],
      declarations: [AddServiceComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AddServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    solutionCategoryServiceSpy = TestBed.inject(SolutionCategoryService) as jasmine.SpyObj<SolutionCategoryService>;
    eventTypeServiceSpy = TestBed.inject(EventTypeService) as jasmine.SpyObj<EventTypeService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should submit the form with valid data', (done) => {
    component.serviceForm.controls['name'].setValue('Valid Service Name');
    component.serviceForm.controls['description'].setValue('This is a description for the valid service.');
    component.serviceForm.controls['specifics'].setValue('Specific details of the service.');
    component.serviceForm.controls['serviceType'].setValue('fixed');
    component.serviceForm.controls['duration'].setValue(30);
    component.serviceForm.controls['daysNoticeForReservation'].setValue(7);
    component.serviceForm.controls['daysNoticeForCancellation'].setValue(3);
    component.serviceForm.controls['autoAccept'].setValue(true);
    component.serviceForm.controls['serviceCategory'].setValue(1);
    component.serviceForm.controls['relevantEventTypes'].setValue([1]);
    component.serviceForm.controls['price'].setValue(99.99);
    component.serviceForm.controls['discount'].setValue(20);

    component.selectedFiles = [{ file: new File([], 'image1.jpg'), preview: 'data:image/jpg;base64,xyz' }];
    component.serviceForm.controls['images'].setValue(component.selectedFiles);

    component.submit();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['my-services']);

    expect(dialogSpy.open).not.toHaveBeenCalled();
    
    done();
  });

  it('should not submit the form with null name', (done) => {
    component.serviceForm.controls['name'].setValue(null);
    component.serviceForm.controls['description'].setValue('This is a description for the valid service.');
    component.serviceForm.controls['specifics'].setValue('Specific details of the service.');
    component.serviceForm.controls['serviceType'].setValue('fixed');
    component.serviceForm.controls['duration'].setValue(30);
    component.serviceForm.controls['daysNoticeForReservation'].setValue(7);
    component.serviceForm.controls['daysNoticeForCancellation'].setValue(3);
    component.serviceForm.controls['autoAccept'].setValue(true);
    component.serviceForm.controls['serviceCategory'].setValue(1);
    component.serviceForm.controls['relevantEventTypes'].setValue([1]);
    component.serviceForm.controls['price'].setValue(99.99);
    component.serviceForm.controls['discount'].setValue(20);

    component.selectedFiles = [{ file: new File([], 'image1.jpg'), preview: 'data:image/jpg;base64,xyz' }];
    component.serviceForm.controls['images'].setValue(component.selectedFiles);

    component.submit();

    expect(routerSpy.navigate).not.toHaveBeenCalled()

    expect(dialogSpy.open).toHaveBeenCalledWith(ErrorDialogComponent, {
      width: '400px',
        disableClose: true,
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: 'Input Error',
          message: 'Please make sure that all inputs are valid.',
        },
    });
    
    done();
  });

  it('should not submit the form with null description', (done) => {
    component.serviceForm.controls['name'].setValue('Valid service');
    component.serviceForm.controls['description'].setValue(null);
    component.serviceForm.controls['specifics'].setValue('Specific details of the service.');
    component.serviceForm.controls['serviceType'].setValue('fixed');
    component.serviceForm.controls['duration'].setValue(30);
    component.serviceForm.controls['daysNoticeForReservation'].setValue(7);
    component.serviceForm.controls['daysNoticeForCancellation'].setValue(3);
    component.serviceForm.controls['autoAccept'].setValue(true);
    component.serviceForm.controls['serviceCategory'].setValue(1);
    component.serviceForm.controls['relevantEventTypes'].setValue([1]);
    component.serviceForm.controls['price'].setValue(99.99);
    component.serviceForm.controls['discount'].setValue(20);

    component.selectedFiles = [{ file: new File([], 'image1.jpg'), preview: 'data:image/jpg;base64,xyz' }];
    component.serviceForm.controls['images'].setValue(component.selectedFiles);

    component.submit();

    expect(routerSpy.navigate).not.toHaveBeenCalled()

    expect(dialogSpy.open).toHaveBeenCalledWith(ErrorDialogComponent, {
      width: '400px',
        disableClose: true,
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: 'Input Error',
          message: 'Please make sure that all inputs are valid.',
        },
    });
    
    done();
  });

  it('should not submit the form with null specifics', (done) => {
    component.serviceForm.controls['name'].setValue('Valid service');
    component.serviceForm.controls['description'].setValue('This is a description for the valid service.');
    component.serviceForm.controls['specifics'].setValue(null);
    component.serviceForm.controls['serviceType'].setValue('fixed');
    component.serviceForm.controls['duration'].setValue(30);
    component.serviceForm.controls['daysNoticeForReservation'].setValue(7);
    component.serviceForm.controls['daysNoticeForCancellation'].setValue(3);
    component.serviceForm.controls['autoAccept'].setValue(true);
    component.serviceForm.controls['serviceCategory'].setValue(1);
    component.serviceForm.controls['relevantEventTypes'].setValue([1]);
    component.serviceForm.controls['price'].setValue(99.99);
    component.serviceForm.controls['discount'].setValue(20);

    component.selectedFiles = [{ file: new File([], 'image1.jpg'), preview: 'data:image/jpg;base64,xyz' }];
    component.serviceForm.controls['images'].setValue(component.selectedFiles);

    component.submit();

    expect(routerSpy.navigate).not.toHaveBeenCalled()

    expect(dialogSpy.open).toHaveBeenCalledWith(ErrorDialogComponent, {
      width: '400px',
        disableClose: true,
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: 'Input Error',
          message: 'Please make sure that all inputs are valid.',
        },
    });
    
    done();
  });

  it('should not submit the form with null serviceType', (done) => {
    component.serviceForm.controls['name'].setValue('Valid service');
    component.serviceForm.controls['description'].setValue('This is a description for the valid service.');
    component.serviceForm.controls['specifics'].setValue('Specific details of the service.');
    component.serviceForm.controls['serviceType'].setValue(null);
    component.serviceForm.controls['duration'].setValue(30);
    component.serviceForm.controls['daysNoticeForReservation'].setValue(7);
    component.serviceForm.controls['daysNoticeForCancellation'].setValue(3);
    component.serviceForm.controls['autoAccept'].setValue(true);
    component.serviceForm.controls['serviceCategory'].setValue(1);
    component.serviceForm.controls['relevantEventTypes'].setValue([1]);
    component.serviceForm.controls['price'].setValue(99.99);
    component.serviceForm.controls['discount'].setValue(20);

    component.selectedFiles = [{ file: new File([], 'image1.jpg'), preview: 'data:image/jpg;base64,xyz' }];
    component.serviceForm.controls['images'].setValue(component.selectedFiles);

    component.submit();

    expect(routerSpy.navigate).not.toHaveBeenCalled()

    expect(dialogSpy.open).toHaveBeenCalledWith(ErrorDialogComponent, {
      width: '400px',
        disableClose: true,
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: 'Input Error',
          message: 'Please make sure that all inputs are valid.',
        },
    });
    
    done();
  });

  it('should not submit the form with null minDuration if serviceType is variable', (done) => {
    component.serviceForm.controls['name'].setValue('Valid service');
    component.serviceForm.controls['description'].setValue('This is a description for the valid service.');
    component.serviceForm.controls['specifics'].setValue('Specific details of the service.');
    component.serviceForm.controls['serviceType'].setValue('variable');
    component.serviceForm.controls['minDuration'].setValue(null);
    component.serviceForm.controls['maxDuration'].setValue(60);
    component.serviceForm.controls['daysNoticeForReservation'].setValue(7);
    component.serviceForm.controls['daysNoticeForCancellation'].setValue(3);
    component.serviceForm.controls['autoAccept'].setValue(true);
    component.serviceForm.controls['serviceCategory'].setValue(1);
    component.serviceForm.controls['relevantEventTypes'].setValue([1]);
    component.serviceForm.controls['price'].setValue(99.99);
    component.serviceForm.controls['discount'].setValue(20);

    component.selectedFiles = [{ file: new File([], 'image1.jpg'), preview: 'data:image/jpg;base64,xyz' }];
    component.serviceForm.controls['images'].setValue(component.selectedFiles);

    component.submit();

    expect(routerSpy.navigate).not.toHaveBeenCalled()

    expect(dialogSpy.open).toHaveBeenCalledWith(ErrorDialogComponent, {
      width: '400px',
        disableClose: true,
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: 'Input Error',
          message: 'Please make sure that all inputs are valid.',
        },
    });
    
    done();
  });

  it('should not submit the form with null maxDuration if serviceType is variable', (done) => {
    component.serviceForm.controls['name'].setValue('Valid service');
    component.serviceForm.controls['description'].setValue(null);
    component.serviceForm.controls['specifics'].setValue('Specific details of the service.');
    component.serviceForm.controls['serviceType'].setValue('variable');
    component.serviceForm.controls['minDuration'].setValue(30);
    component.serviceForm.controls['maxDuration'].setValue(null);
    component.serviceForm.controls['daysNoticeForReservation'].setValue(7);
    component.serviceForm.controls['daysNoticeForCancellation'].setValue(3);
    component.serviceForm.controls['autoAccept'].setValue(true);
    component.serviceForm.controls['serviceCategory'].setValue(1);
    component.serviceForm.controls['relevantEventTypes'].setValue([1]);
    component.serviceForm.controls['price'].setValue(99.99);
    component.serviceForm.controls['discount'].setValue(20);

    component.selectedFiles = [{ file: new File([], 'image1.jpg'), preview: 'data:image/jpg;base64,xyz' }];
    component.serviceForm.controls['images'].setValue(component.selectedFiles);

    component.submit();

    expect(routerSpy.navigate).not.toHaveBeenCalled()

    expect(dialogSpy.open).toHaveBeenCalledWith(ErrorDialogComponent, {
      width: '400px',
        disableClose: true,
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: 'Input Error',
          message: 'Please make sure that all inputs are valid.',
        },
    });
    
    done();
  });

  it('should not submit the form if minDuration is greater than maxDuration if serviceType is variable', (done) => {
    component.serviceForm.controls['name'].setValue('Valid service');
    component.serviceForm.controls['description'].setValue(null);
    component.serviceForm.controls['specifics'].setValue('Specific details of the service.');
    component.serviceForm.controls['serviceType'].setValue('variable');
    component.serviceForm.controls['minDuration'].setValue(60);
    component.serviceForm.controls['maxDuration'].setValue(30);
    component.serviceForm.controls['daysNoticeForReservation'].setValue(7);
    component.serviceForm.controls['daysNoticeForCancellation'].setValue(3);
    component.serviceForm.controls['autoAccept'].setValue(true);
    component.serviceForm.controls['serviceCategory'].setValue(1);
    component.serviceForm.controls['relevantEventTypes'].setValue([1]);
    component.serviceForm.controls['price'].setValue(99.99);
    component.serviceForm.controls['discount'].setValue(20);

    component.selectedFiles = [{ file: new File([], 'image1.jpg'), preview: 'data:image/jpg;base64,xyz' }];
    component.serviceForm.controls['images'].setValue(component.selectedFiles);

    component.submit();

    expect(routerSpy.navigate).not.toHaveBeenCalled()

    expect(dialogSpy.open).toHaveBeenCalledWith(ErrorDialogComponent, {
      width: '400px',
        disableClose: true,
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: 'Input Error',
          message: 'Please make sure that all inputs are valid.',
        },
    });
    
    done();
  });

  it('should not submit the form with null daysNoticeForReservation', (done) => {
    component.serviceForm.controls['name'].setValue('Valid service');
    component.serviceForm.controls['description'].setValue('This is a description for the valid service.');
    component.serviceForm.controls['specifics'].setValue('Specific details of the service.');
    component.serviceForm.controls['serviceType'].setValue('fixed');
    component.serviceForm.controls['duration'].setValue(30);
    component.serviceForm.controls['daysNoticeForReservation'].setValue(null);
    component.serviceForm.controls['daysNoticeForCancellation'].setValue(3);
    component.serviceForm.controls['autoAccept'].setValue(true);
    component.serviceForm.controls['serviceCategory'].setValue(1);
    component.serviceForm.controls['relevantEventTypes'].setValue([1]);
    component.serviceForm.controls['price'].setValue(99.99);
    component.serviceForm.controls['discount'].setValue(20);

    component.selectedFiles = [{ file: new File([], 'image1.jpg'), preview: 'data:image/jpg;base64,xyz' }];
    component.serviceForm.controls['images'].setValue(component.selectedFiles);

    component.submit();

    expect(routerSpy.navigate).not.toHaveBeenCalled()

    expect(dialogSpy.open).toHaveBeenCalledWith(ErrorDialogComponent, {
      width: '400px',
        disableClose: true,
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: 'Input Error',
          message: 'Please make sure that all inputs are valid.',
        },
    });
    
    done();
  });

  it('should not submit the form with null daysNoticeForCancellation', (done) => {
    component.serviceForm.controls['name'].setValue('Valid service');
    component.serviceForm.controls['description'].setValue('This is a description for the valid service.');
    component.serviceForm.controls['specifics'].setValue('Specific details of the service.');
    component.serviceForm.controls['serviceType'].setValue('fixed');
    component.serviceForm.controls['duration'].setValue(30);
    component.serviceForm.controls['daysNoticeForReservation'].setValue(7);
    component.serviceForm.controls['daysNoticeForCancellation'].setValue(null);
    component.serviceForm.controls['autoAccept'].setValue(true);
    component.serviceForm.controls['serviceCategory'].setValue(1);
    component.serviceForm.controls['relevantEventTypes'].setValue([1]);
    component.serviceForm.controls['price'].setValue(99.99);
    component.serviceForm.controls['discount'].setValue(20);

    component.selectedFiles = [{ file: new File([], 'image1.jpg'), preview: 'data:image/jpg;base64,xyz' }];
    component.serviceForm.controls['images'].setValue(component.selectedFiles);

    component.submit();

    expect(routerSpy.navigate).not.toHaveBeenCalled()

    expect(dialogSpy.open).toHaveBeenCalledWith(ErrorDialogComponent, {
      width: '400px',
        disableClose: true,
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: 'Input Error',
          message: 'Please make sure that all inputs are valid.',
        },
    });
    
    done();
  });

  it('should not submit the form with null serviceCategory', (done) => {
    component.serviceForm.controls['name'].setValue('Valid service');
    component.serviceForm.controls['description'].setValue('This is a description for the valid service.');
    component.serviceForm.controls['specifics'].setValue('Specific details of the service.');
    component.serviceForm.controls['serviceType'].setValue('fixed');
    component.serviceForm.controls['duration'].setValue(30);
    component.serviceForm.controls['daysNoticeForReservation'].setValue(7);
    component.serviceForm.controls['daysNoticeForCancellation'].setValue(3);
    component.serviceForm.controls['autoAccept'].setValue(true);
    component.serviceForm.controls['serviceCategory'].setValue(null);
    component.serviceForm.controls['relevantEventTypes'].setValue([1]);
    component.serviceForm.controls['price'].setValue(99.99);
    component.serviceForm.controls['discount'].setValue(20);

    component.selectedFiles = [{ file: new File([], 'image1.jpg'), preview: 'data:image/jpg;base64,xyz' }];
    component.serviceForm.controls['images'].setValue(component.selectedFiles);

    component.submit();

    expect(routerSpy.navigate).not.toHaveBeenCalled()

    expect(dialogSpy.open).toHaveBeenCalledWith(ErrorDialogComponent, {
      width: '400px',
        disableClose: true,
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: 'Input Error',
          message: 'Please make sure that all inputs are valid.',
        },
    });
    
    done();
  });

  it('should submit the form with valid data even with a new serviceCategory', (done) => {
    component.serviceForm.controls['name'].setValue('Valid Service Name');
    component.serviceForm.controls['description'].setValue('This is a description for the valid service.');
    component.serviceForm.controls['specifics'].setValue('Specific details of the service.');
    component.serviceForm.controls['serviceType'].setValue('fixed');
    component.serviceForm.controls['duration'].setValue(30);
    component.serviceForm.controls['daysNoticeForReservation'].setValue(7);
    component.serviceForm.controls['daysNoticeForCancellation'].setValue(3);
    component.serviceForm.controls['autoAccept'].setValue(true);
    component.serviceForm.controls['serviceCategory'].setValue(-1337);
    component.serviceForm.controls['newCategoryName'].setValue('NewTestCategory');
    component.serviceForm.controls['newCategoryDescription'].setValue('NewTestCatDesc');
    component.serviceForm.controls['relevantEventTypes'].setValue([1]);
    component.serviceForm.controls['price'].setValue(99.99);
    component.serviceForm.controls['discount'].setValue(20);

    component.selectedFiles = [{ file: new File([], 'image1.jpg'), preview: 'data:image/jpg;base64,xyz' }];
    component.serviceForm.controls['images'].setValue(component.selectedFiles);

    component.submit();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['my-services']);

    expect(solutionCategoryServiceSpy.create).toHaveBeenCalledWith({name: 'NewTestCategory', description: 'NewTestCatDesc', status: Status.PENDING})

    expect(dialogSpy.open).not.toHaveBeenCalled();
    
    done();
  });

  it('should not submit the form with null newCategoryName if serviceCategory is -1337', (done) => {
    component.serviceForm.controls['name'].setValue('Valid service');
    component.serviceForm.controls['description'].setValue('This is a description for the valid service.');
    component.serviceForm.controls['specifics'].setValue('Specific details of the service.');
    component.serviceForm.controls['serviceType'].setValue('fixed');
    component.serviceForm.controls['duration'].setValue(30);
    component.serviceForm.controls['daysNoticeForReservation'].setValue(7);
    component.serviceForm.controls['daysNoticeForCancellation'].setValue(3);
    component.serviceForm.controls['autoAccept'].setValue(true);
    component.serviceForm.controls['serviceCategory'].setValue(-1337);
    component.serviceForm.controls['newCategoryName'].setValue(null);
    component.serviceForm.controls['newCategoryDescription'].setValue('NewTestCatDesc');
    component.serviceForm.controls['relevantEventTypes'].setValue([1]);
    component.serviceForm.controls['price'].setValue(99.99);
    component.serviceForm.controls['discount'].setValue(20);

    component.selectedFiles = [{ file: new File([], 'image1.jpg'), preview: 'data:image/jpg;base64,xyz' }];
    component.serviceForm.controls['images'].setValue(component.selectedFiles);

    component.submit();

    expect(routerSpy.navigate).not.toHaveBeenCalled()

    expect(dialogSpy.open).toHaveBeenCalledWith(ErrorDialogComponent, {
      width: '400px',
        disableClose: true,
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: 'Input Error',
          message: 'Please make sure that all inputs are valid.',
        },
    });
    done()
  });
    
    it('should not submit the form with null newCategoryDescription if serviceCategory is -1337', (done) => {
    component.serviceForm.controls['name'].setValue('Valid service');
    component.serviceForm.controls['description'].setValue('This is a description for the valid service.');
    component.serviceForm.controls['specifics'].setValue('Specific details of the service.');
    component.serviceForm.controls['serviceType'].setValue('fixed');
    component.serviceForm.controls['duration'].setValue(30);
    component.serviceForm.controls['daysNoticeForReservation'].setValue(7);
    component.serviceForm.controls['daysNoticeForCancellation'].setValue(3);
    component.serviceForm.controls['autoAccept'].setValue(true);
    component.serviceForm.controls['serviceCategory'].setValue(-1337);
    component.serviceForm.controls['newCategoryName'].setValue('NewTestCategory');
    component.serviceForm.controls['newCategoryDescription'].setValue(null);
    component.serviceForm.controls['relevantEventTypes'].setValue([1]);
    component.serviceForm.controls['price'].setValue(99.99);
    component.serviceForm.controls['discount'].setValue(20);

    component.selectedFiles = [{ file: new File([], 'image1.jpg'), preview: 'data:image/jpg;base64,xyz' }];
    component.serviceForm.controls['images'].setValue(component.selectedFiles);

    component.submit();

    expect(routerSpy.navigate).not.toHaveBeenCalled()

    expect(dialogSpy.open).toHaveBeenCalledWith(ErrorDialogComponent, {
      width: '400px',
        disableClose: true,
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: 'Input Error',
          message: 'Please make sure that all inputs are valid.',
        },
    });

    done();
  });

  it('should not submit the form with null relevantEventTypes', (done) => {
    component.serviceForm.controls['name'].setValue('Valid service');
    component.serviceForm.controls['description'].setValue('This is a description for the valid service.');
    component.serviceForm.controls['specifics'].setValue('Specific details of the service.');
    component.serviceForm.controls['serviceType'].setValue('fixed');
    component.serviceForm.controls['duration'].setValue(30);
    component.serviceForm.controls['daysNoticeForReservation'].setValue(7);
    component.serviceForm.controls['daysNoticeForCancellation'].setValue(3);
    component.serviceForm.controls['autoAccept'].setValue(true);
    component.serviceForm.controls['serviceCategory'].setValue(1);
    component.serviceForm.controls['relevantEventTypes'].setValue(null);
    component.serviceForm.controls['price'].setValue(99.99);
    component.serviceForm.controls['discount'].setValue(20);

    component.selectedFiles = [{ file: new File([], 'image1.jpg'), preview: 'data:image/jpg;base64,xyz' }];
    component.serviceForm.controls['images'].setValue(component.selectedFiles);

    component.submit();

    expect(routerSpy.navigate).not.toHaveBeenCalled()

    expect(dialogSpy.open).toHaveBeenCalledWith(ErrorDialogComponent, {
      width: '400px',
        disableClose: true,
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: 'Input Error',
          message: 'Please make sure that all inputs are valid.',
        },
    });
    
    done();
  });

  it('should not submit the form with null price', (done) => {
    component.serviceForm.controls['name'].setValue('Valid service');
    component.serviceForm.controls['description'].setValue('This is a description for the valid service.');
    component.serviceForm.controls['specifics'].setValue('Specific details of the service.');
    component.serviceForm.controls['serviceType'].setValue('fixed');
    component.serviceForm.controls['duration'].setValue(30);
    component.serviceForm.controls['daysNoticeForReservation'].setValue(7);
    component.serviceForm.controls['daysNoticeForCancellation'].setValue(3);
    component.serviceForm.controls['autoAccept'].setValue(true);
    component.serviceForm.controls['serviceCategory'].setValue(1);
    component.serviceForm.controls['relevantEventTypes'].setValue([1]);
    component.serviceForm.controls['price'].setValue(null);
    component.serviceForm.controls['discount'].setValue(20);

    component.selectedFiles = [{ file: new File([], 'image1.jpg'), preview: 'data:image/jpg;base64,xyz' }];
    component.serviceForm.controls['images'].setValue(component.selectedFiles);

    component.submit();

    expect(routerSpy.navigate).not.toHaveBeenCalled()

    expect(dialogSpy.open).toHaveBeenCalledWith(ErrorDialogComponent, {
      width: '400px',
        disableClose: true,
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: 'Input Error',
          message: 'Please make sure that all inputs are valid.',
        },
    });
    
    done();
  });

  it('should not submit the form with negative price', (done) => {
    component.serviceForm.controls['name'].setValue('Valid service');
    component.serviceForm.controls['description'].setValue('This is a description for the valid service.');
    component.serviceForm.controls['specifics'].setValue('Specific details of the service.');
    component.serviceForm.controls['serviceType'].setValue('fixed');
    component.serviceForm.controls['duration'].setValue(30);
    component.serviceForm.controls['daysNoticeForReservation'].setValue(7);
    component.serviceForm.controls['daysNoticeForCancellation'].setValue(3);
    component.serviceForm.controls['autoAccept'].setValue(true);
    component.serviceForm.controls['serviceCategory'].setValue(1);
    component.serviceForm.controls['relevantEventTypes'].setValue([1]);
    component.serviceForm.controls['price'].setValue(-1);
    component.serviceForm.controls['discount'].setValue(20);

    component.selectedFiles = [{ file: new File([], 'image1.jpg'), preview: 'data:image/jpg;base64,xyz' }];
    component.serviceForm.controls['images'].setValue(component.selectedFiles);

    component.submit();

    expect(routerSpy.navigate).not.toHaveBeenCalled()

    expect(dialogSpy.open).toHaveBeenCalledWith(ErrorDialogComponent, {
      width: '400px',
        disableClose: true,
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: 'Input Error',
          message: 'Please make sure that all inputs are valid.',
        },
    });
    
    done();
  });

  it('should not submit the form with null discount', (done) => {
    component.serviceForm.controls['name'].setValue('Valid service');
    component.serviceForm.controls['description'].setValue('This is a description for the valid service.');
    component.serviceForm.controls['specifics'].setValue('Specific details of the service.');
    component.serviceForm.controls['serviceType'].setValue('fixed');
    component.serviceForm.controls['duration'].setValue(30);
    component.serviceForm.controls['daysNoticeForReservation'].setValue(7);
    component.serviceForm.controls['daysNoticeForCancellation'].setValue(3);
    component.serviceForm.controls['autoAccept'].setValue(true);
    component.serviceForm.controls['serviceCategory'].setValue(1);
    component.serviceForm.controls['relevantEventTypes'].setValue([1]);
    component.serviceForm.controls['price'].setValue(99.99);
    component.serviceForm.controls['discount'].setValue(null);

    component.selectedFiles = [{ file: new File([], 'image1.jpg'), preview: 'data:image/jpg;base64,xyz' }];
    component.serviceForm.controls['images'].setValue(component.selectedFiles);

    component.submit();

    expect(routerSpy.navigate).not.toHaveBeenCalled()

    expect(dialogSpy.open).toHaveBeenCalledWith(ErrorDialogComponent, {
      width: '400px',
        disableClose: true,
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: 'Input Error',
          message: 'Please make sure that all inputs are valid.',
        },
    });
    
    done();
  });

  it('should not submit the form with negative discount', (done) => {
    component.serviceForm.controls['name'].setValue('Valid service');
    component.serviceForm.controls['description'].setValue('This is a description for the valid service.');
    component.serviceForm.controls['specifics'].setValue('Specific details of the service.');
    component.serviceForm.controls['serviceType'].setValue('fixed');
    component.serviceForm.controls['duration'].setValue(30);
    component.serviceForm.controls['daysNoticeForReservation'].setValue(7);
    component.serviceForm.controls['daysNoticeForCancellation'].setValue(3);
    component.serviceForm.controls['autoAccept'].setValue(true);
    component.serviceForm.controls['serviceCategory'].setValue(1);
    component.serviceForm.controls['relevantEventTypes'].setValue([1]);
    component.serviceForm.controls['price'].setValue(99.99);
    component.serviceForm.controls['discount'].setValue(-1);

    component.selectedFiles = [{ file: new File([], 'image1.jpg'), preview: 'data:image/jpg;base64,xyz' }];
    component.serviceForm.controls['images'].setValue(component.selectedFiles);

    component.submit();

    expect(routerSpy.navigate).not.toHaveBeenCalled()

    expect(dialogSpy.open).toHaveBeenCalledWith(ErrorDialogComponent, {
      width: '400px',
        disableClose: true,
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: 'Input Error',
          message: 'Please make sure that all inputs are valid.',
        },
    });
    
    done();
  });

  it('should not submit the form with 100+ discount', (done) => {
    component.serviceForm.controls['name'].setValue('Valid service');
    component.serviceForm.controls['description'].setValue('This is a description for the valid service.');
    component.serviceForm.controls['specifics'].setValue('Specific details of the service.');
    component.serviceForm.controls['serviceType'].setValue('fixed');
    component.serviceForm.controls['duration'].setValue(30);
    component.serviceForm.controls['daysNoticeForReservation'].setValue(7);
    component.serviceForm.controls['daysNoticeForCancellation'].setValue(3);
    component.serviceForm.controls['autoAccept'].setValue(true);
    component.serviceForm.controls['serviceCategory'].setValue(1);
    component.serviceForm.controls['relevantEventTypes'].setValue([1]);
    component.serviceForm.controls['price'].setValue(99.99);
    component.serviceForm.controls['discount'].setValue(101);

    component.selectedFiles = [{ file: new File([], 'image1.jpg'), preview: 'data:image/jpg;base64,xyz' }];
    component.serviceForm.controls['images'].setValue(component.selectedFiles);

    component.submit();

    expect(routerSpy.navigate).not.toHaveBeenCalled()

    expect(dialogSpy.open).toHaveBeenCalledWith(ErrorDialogComponent, {
      width: '400px',
        disableClose: true,
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: 'Input Error',
          message: 'Please make sure that all inputs are valid.',
        },
    });
    
    done();
  });

  it('should not submit the form with null image', (done) => {
    component.serviceForm.controls['name'].setValue('Valid service');
    component.serviceForm.controls['description'].setValue('This is a description for the valid service.');
    component.serviceForm.controls['specifics'].setValue('Specific details of the service.');
    component.serviceForm.controls['serviceType'].setValue('fixed');
    component.serviceForm.controls['duration'].setValue(30);
    component.serviceForm.controls['daysNoticeForReservation'].setValue(7);
    component.serviceForm.controls['daysNoticeForCancellation'].setValue(3);
    component.serviceForm.controls['autoAccept'].setValue(true);
    component.serviceForm.controls['serviceCategory'].setValue(1);
    component.serviceForm.controls['relevantEventTypes'].setValue([1]);
    component.serviceForm.controls['price'].setValue(99.99);
    component.serviceForm.controls['discount'].setValue(20);

    component.serviceForm.controls['images'].setValue(null);

    component.submit();

    expect(routerSpy.navigate).not.toHaveBeenCalled()

    expect(dialogSpy.open).toHaveBeenCalledWith(ErrorDialogComponent, {
      width: '400px',
        disableClose: true,
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: 'Input Error',
          message: 'Please make sure that all inputs are valid.',
        },
    });
    
    done();
  });

});
