import { Flex, Image, useTheme } from '@aws-amplify/ui-react';
import header_img from '../assets/images/twitter_header_photo_2.png';

export function Header() {
  const { tokens } = useTheme();

  return (
    <Flex justifyContent="center">
      <Image
        alt="logo"
        src={header_img}
        padding={tokens.space.medium}
        width="100%"
      />
    </Flex>
  );
}
