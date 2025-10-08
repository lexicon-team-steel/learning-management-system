import { ReactElement } from 'react';
import Table from './Table';
import { ICourse } from '../utilities/types';
import CourseTableRow from './CourseTableRow';

interface ICourseTableProps {
  courses: ICourse[];
  onEdit: (course: ICourse) => void;
  onDelete: (course: ICourse) => void;
}

const CourseTable = ({ courses, onEdit, onDelete }: ICourseTableProps): ReactElement => (
  <Table
    headers={['Namn', 'Period', 'Moduler', 'Åtgärder']}
    keyField="id"
    rows={courses}
    sortableField="startDate"
    renderItem={(course: ICourse) => (
      <CourseTableRow course={course} onEdit={() => onEdit(course)} onDelete={() => onDelete(course)} />
    )}
  ></Table>
);

export default CourseTable;
