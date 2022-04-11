// eslint-disable-next-line
import '@aws-amplify/ui-react/styles.css';
import { Authenticator, Flex, Grid, Image, useTheme, View } from '@aws-amplify/ui-react';
import { Header } from './amplify_login/Header';
import { Footer } from './amplify_login/Footer';
import { SignInHeader } from './amplify_login/SignInHeader';
import { SignInFooter } from './amplify_login/SignInFooter';

const components = {
  Header,
  SignIn: {
    Header: SignInHeader,
    Footer: SignInFooter,
  },
  Footer,
};

export default function NotLoggedin() {
  const { tokens } = useTheme();

  return (
    <Grid>
      <Flex justifyContent="center">
        <Authenticator components={components} socialProviders={['facebook', 'google']} />
      </Flex>
    </Grid>
  );
}
