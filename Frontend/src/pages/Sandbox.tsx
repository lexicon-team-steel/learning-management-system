import Main from '../components/Main';
import MuduleActivities from '../components/ModuleActivities';
import LinkCard from '../components/LinkCard';

const Sandbox = () => {
  // Temp Demo for <LinkCard />

  return (
    <Main>
      <MuduleActivities /> {/*  // temp for testing */}
      <LinkCard
        title="Snabblänk"
        buttons={[
          { text: 'Hantera användare', link: '/admin/users' },
          { text: 'Hantera kurser', link: '/admin/courses' },
        ]}
      />
    </Main>
  );
};

export default Sandbox;
