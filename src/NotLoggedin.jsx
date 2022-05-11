import { Authenticator, Flex, Grid, useTheme } from '@aws-amplify/ui-react';
import { Header } from './amplify_login/Header';
import { Footer } from './amplify_login/Footer';
import { SignInHeader } from './amplify_login/SignInHeader';
import { SignInFooter } from './amplify_login/SignInFooter';
import SEO from './seo';

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
      <SEO title="みんなで本書評" description="皆で本を書評したり紹介しあったりするサイトです。同年代の人が興味のある本や同じ所属の人が興味のある本を見てみましょう。" />
      <Flex justifyContent="center">
        <Authenticator components={components} socialProviders={['google']} />
      </Flex>
    </Grid>
  );
}
