import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  return currentUser? <h1>You are signed in</h1>: <h1>You are Not signed in</h1>
};

LandingPage.getInitialProps = async context => {
  console.log('Landing Page!');
  const client = buildClient(context);
  try {
    const { data } = await client.get('/api/users/currentuser');
    return data;
  } catch (err) {
    // Handle 401 or any other error
    return { currentUser: null };
  }
};

export default LandingPage;