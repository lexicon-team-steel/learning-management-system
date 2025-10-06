import { ReactElement } from 'react';
import Table from './Table';
import { IActivity } from '../utilities/types';
import ActivityTableRow from './ActivityTableRow';

interface IActivityTableProps {
  activities: IActivity[];
  onEdit: (user: IActivity) => void;
  onDelete: (user: IActivity) => void;
}

const ActivityTable = ({ activities, onEdit, onDelete }: IActivityTableProps): ReactElement => (
  <Table
    headers={['Aktivitet', 'Aktivitetstyp', 'Datum & Tid', 'Åtgärder']}
    keyField="id"
    rows={activities}
    renderItem={(activity: IActivity) => (
      <ActivityTableRow activity={activity} onEdit={() => onEdit(activity)} onDelete={() => onDelete(activity)} />
    )}
  ></Table>
);

export default ActivityTable;
