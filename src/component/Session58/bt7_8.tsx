import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Student {
  id: number;
  student_name: string;
  email: string;
  address: string;
  phone: string;
}

const StudentControl = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:9999/student', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        setStudents(response.data);
      } else {
        throw new Error('Failed to fetch students');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
  };

  const handleDelete = async (studentId: number) => {
    try {
      await axios.delete(`http://localhost:9999/student/${studentId}`);
      setStudents(students.filter(student => student.id !== studentId));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <>
      <div>
        <h1>Quản lí sinh viên</h1>
        <button>Thêm mới sinh viên</button>
      </div>
      <StudentList 
        students={students} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </>
  );
};

interface StudentListProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (studentId: number) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, onEdit, onDelete }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="checkbox1" />
              <label className="form-check-label" htmlFor="checkbox1"></label>
            </div>
          </th>
          <th scope="col">Tên Sinh Viên</th>
          <th scope="col">Email</th>
          <th scope="col">Địa chỉ</th>
          <th scope="col">Số Điện Thoại</th>
          <th scope="col">Lựa Chọn</th>
        </tr>
      </thead>
      <tbody>
        {students.map(student => (
          <StudentRow 
            key={student.id} 
            student={student} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
        ))}
      </tbody>
    </table>
  );
};

interface StudentRowProps {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (studentId: number) => void;
}

const StudentRow: React.FC<StudentRowProps> = ({ student, onEdit, onDelete }) => {
  return (
    <tr>
      <th>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id={`checkbox${student.id}`} />
          <label className="form-check-label" htmlFor={`checkbox${student.id}`}></label>
        </div>
      </th>
      <th scope="row" className='text'>{student.student_name}</th>
      <td>{student.email}</td>
      <td>{student.address}</td>
      <td>{student.phone}</td>
      <td>
        <button onClick={() => onEdit(student)}>Edit</button>
        <button onClick={() => onDelete(student.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default StudentControl;
