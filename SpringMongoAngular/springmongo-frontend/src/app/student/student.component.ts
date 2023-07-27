import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Student } from '../model/student';
import { StudentService } from '../services/student.service';
declare let alertify:any
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {

  constructor(private studentService:StudentService){
    this.getAllStudent();
  }
  

  student: Student = new Student(); // Yeni Student nesnesi oluşturduk.

  StudentArray: Student[] = [];

  currentStudentID = "";

  register() {
    this.studentService.register(this.student).subscribe((resultData: any) => {
      console.log(resultData);
      alertify.success("Student added!")
      this.getAllStudent();

      this.student = new Student(); // Kayıttan sonra nesneyi sıfırlayın.
    });
  }

  getAllStudent() {
    this.studentService.getAllStudents().subscribe((resultData: Student[]) => {
      console.log(resultData);
      this.StudentArray = resultData;
    });
  }

  setUpdate(data: Student) {
    this.student = { ...data }; // Güncellenecek öğrenci verilerini nesneye kopyalayın.
  }

  updateRecords() {
    this.studentService.update(this.student).subscribe((resultData: any) => {
      console.log(resultData);
      alertify.success("Student updated!")
      this.getAllStudent();
      this.student = new Student(); // Güncellemeden sonra nesneyi sıfırlayın.
    });
  }

  save() {
    if (!this.student.studentname || !this.student.studentaddress || !this.student.mobile) {
      alertify.warning('Please fill in all the required fields.');
      return;
    }
  
    if (this.student._id === undefined || this.student._id === null || this.student._id === "") {
      this.register();
    } else {
      this.updateRecords();
    }      
  }

  sure() {
    alertify.confirm(
      'Confirmation',
      'Are you sure you want to delete this student?',
      () => {
        this.setDelete(this.student);
      },
      () => {
        alertify.error('Delete operation canceled.');
      }
    );
  }
  
  setDelete(data: Student) {
    alertify.confirm(
      'Confirmation',
      'Are you sure you want to delete this student?',
      () => {
        this.studentService.delete(data._id).subscribe(
          (resultData: any) => {
            console.log(resultData);
            alertify.success('Student deleted!');
            this.getAllStudent();
            this.student = new Student(); // Silmeden sonra nesneyi sıfırlayın.
          },
          (error: any) => {
            console.error(error);
            alertify.error('An error occurred while deleting the student.');
          }
        );
      },
      () => {
        alertify.error('Delete operation canceled.');
      }
    ).set('labels', {ok:'Delete',cancel:'Cancel'});
  }

  showMobileWarning: boolean = false;

  onMobileInput(event: any) {
    const mobileValue = event.target.value;
    const mobilePattern = /^\d*$/;

    if (!mobilePattern.test(mobileValue)) {
      this.showMobileWarning = true;
    } else {
      this.showMobileWarning = false;
    }
  }
  searchText: string = '';
  searchOption: string = 'name'; 

  // ...

  setSearchOption(option: string) {
    this.searchOption = option;
    this.closeDropdown();
  }

  filterStudents(): Student[] {
    const searchTextLower = this.searchText.toLowerCase(); 

    return this.StudentArray.filter(student => {
      const studentNameLower = student.studentname.toLowerCase();
      const studentAddressLower = student.studentaddress.toLowerCase();
      const studentMobileLower = student.mobile.toLowerCase();

      if (this.searchOption === 'name') {
        return studentNameLower.includes(searchTextLower);
      } else if (this.searchOption === 'address') {
        return studentAddressLower.includes(searchTextLower);
      } else if (this.searchOption === 'mobile') {
        return studentMobileLower.includes(searchTextLower);
      }

      return false;
    });
  }

  clearSearch() {
    this.searchText = ''; // Arama kutusunu temizle
    this.onSearch(); // Arama kutusunu temizlediğimizde aramayı tekrar çalıştır
  }
  onSearch() {
    this.filterStudents();
  }
  isDropdownOpen = false;

toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}

closeDropdown() {
  this.isDropdownOpen = false;
}

}
