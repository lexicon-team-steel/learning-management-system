import { useNavigate } from 'react-router';
import ButtonCard from '../components/ButtonCard';
import Main from '../components/Main';

const Sandbox = () => {
  // Demo for <ButtonCard />
  // Doc: The <ButtonCard /> is a reusable card component that renders a list of buttons
  // with their own labels and click handlers. Useful for creating quick actions / shortcuts panels
  // like “Snabblänkar” "Kursadministration".
  const navigate = useNavigate();
  const handlerOnClickUser = () => {
    navigate('/admin/users');
  };
  const handlerOnClickCourse = () => {
    navigate('/admin/courses');
  };
  return (
    <Main>
      <ButtonCard
        buttons={[
          { text: 'Hantera användare', onClick: handlerOnClickUser },
          { text: 'Hantera kurser', onClick: handlerOnClickCourse },
        ]}
      />
    </Main>
  );
};

export default Sandbox;
