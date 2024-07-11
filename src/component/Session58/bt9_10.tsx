import React, { useState } from 'react';

interface Student {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
}

const FormTable = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [student, setStudent] = useState<Student>({ id: 0, name: '', email: '', address: '', phone: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const validate = () => {
    let tempErrors: { [key: string]: string } = {};
    if (!student.name) tempErrors.name = "Tên sinh viên không được để trống";
    if (!student.email) {
      tempErrors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(student.email)) {
      tempErrors.email = "Email không đúng định dạng";
    }
    if (!student.phone) {
      tempErrors.phone = "Số điện thoại không được để trống";
    } else if (!/^\d+$/.test(student.phone)) {
      tempErrors.phone = "Số điện thoại chỉ được phép nhập số";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleAdd = async () => {
    if (validate()) {
      try {
        const response = await fetch('http://localhost:9999/student', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(student),
        });
        if (response.ok) {
          const newStudent = await response.json();
          setStudents([...students, newStudent]);
          setStudent({ id: 0, name: '', email: '', address: '', phone: '' });
          setErrors({});
        } else {
          console.error('Không lưu sinh viên được');
        }
      } catch (error) {
        console.error('An error occurred while saving the student.', error);
      }
    }
  };

  const handleEdit = (studentToEdit: Student) => {
    setStudent(studentToEdit);
    setEditingStudent(studentToEdit);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (validate()) {
      try {
        const response = await fetch(`http://localhost:9999/student/${editingStudent?.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(student),
        });
        if (response.ok) {
          const updatedStudent = await response.json();
          setStudents(students.map(s => (s.id === updatedStudent.id ? updatedStudent : s)));
          setStudent({ id: 0, name: '', email: '', address: '', phone: '' });
          setEditingStudent(null);
          setIsEditing(false);
          setErrors({});
        } else {
          console.error('Failed to update the student.');
        }
      } catch (error) {
        console.error('An error occurred while updating the student.', error);
      }
    }
  };

  const handleCancel = () => {
    setStudent({ id: 0, name: '', email: '', address: '', phone: '' });
    setEditingStudent(null);
    setIsEditing(false);
    setErrors({});
  };

  return (
    <div className="formtable">
      <h1>{isEditing ? 'Sửa thông tin sinh viên' : 'Thêm mới sinh viên'}</h1>

      <p>Tên sinh viên</p>
      <input
        type="text"
        name="name"
        value={student.name}
        onChange={handleInputChange}
      />
      {errors.name && <span className="error">{errors.name}</span>}

      <p>Email</p>
      <input
        type="text"
        name="email"
        value={student.email}
        onChange={handleInputChange}
      />
      {errors.email && <span className="error">{errors.email}</span>}

      <p>Địa chỉ</p>
      <input
        type="text"
        name="address"
        value={student.address}
        onChange={handleInputChange}
      />

      <p>Số điện thoại</p>
      <input
        type="text"
        name="phone"
        value={student.phone}
        onChange={handleInputChange}
      />
      {errors.phone && <span className="error">{errors.phone}</span>}

      <button onClick={handleCancel}>Cancel</button>
      {isEditing ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={handleAdd}>Add</button>
      )}

      <h2>Danh sách sinh viên</h2>
      <table>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Số điện thoại</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.address}</td>
              <td>{s.phone}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormTable;
