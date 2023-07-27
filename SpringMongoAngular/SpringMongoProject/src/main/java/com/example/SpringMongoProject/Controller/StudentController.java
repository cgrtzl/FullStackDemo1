package com.example.SpringMongoProject.Controller;

import com.example.SpringMongoProject.Entity.Student;
import com.example.SpringMongoProject.Service.StudentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/v1/student")
public class StudentController {

    @Autowired
    private StudentServices studentServices;

    @PostMapping(value = "/save")
    private String saveStudent(@RequestBody Student students){

        studentServices.saveorUpdate(students);
        return students.get_id();

    }

    @GetMapping(value = "/getall")
    public ResponseEntity<List<Student>> getStudents() {
        return ResponseEntity.ok(studentServices.listAll());
    }

    @PostMapping(value = "/edit/{id}")
    private  Student update(@RequestBody Student student,@PathVariable(name ="id")String _id){
        student.set_id(_id);
        studentServices.saveorUpdate(student);
        return student;
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/delete/{id}")
    public void deleteStudent(@PathVariable("id")String id){
        studentServices.deleteStudent(id);
    }

    @RequestMapping("/search/{id}")
    private Student getStudents(@PathVariable(name = "id")String studentid){
        return studentServices.getStudentByID(studentid);
    }



}
