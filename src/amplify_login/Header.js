import { Flex, Image, useTheme } from '@aws-amplify/ui-react';

export function Header() {
  const { tokens } = useTheme();

  return (
    <Flex justifyContent="center">
      <Image
        alt="logo"
        src="../assets/images/logo.png"
        padding={tokens.space.medium}
      />
    </Flex>
  );
}
