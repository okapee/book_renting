import { Heading, useTheme } from '@aws-amplify/ui-react';
import { Text } from '@chakra-ui/react';

export function SignInHeader() {
  const { tokens } = useTheme();

  return (
    <Heading level={3} padding={`${tokens.space.xl} ${tokens.space.xl} 0`}>
      初めての方はアカウントを作成してください
      <p className='auth-construction-cmnt'>※Googleアカウントでのログインは現在、実装中です。もう暫くお待ち下さい。</p>
    </Heading>
  );
}
