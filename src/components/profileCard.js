import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  HStack,
  Button,
  Link,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FacebookShareButton,
  LineShareButton,
  TwitterShareButton,
  FacebookIcon,
  LineIcon,
  TwitterIcon,
} from 'react-share';
import prof_img from '../assets/images/okapi.png';

// SNSシェアボタン用
const URL = 'https://www.reviewbooks.tokyo/';
const QUOTE =
  '読んだ本を互いにシェアすることで、互いの興味・関心を知り、未知の本に出会い、新たなコミュニケーションが生まれたり知識が獲得できるサービスです。';

export default function SocialProfileSimple() {
  return (
    <Center>
      <Box
        // maxW={'100%'}
        w={'100%'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
      >
        <Avatar
          size={'xl'}
          src={prof_img}
          alt={'Avatar Alt'}
          mb={4}
          pos={'relative'}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: 'green.300',
            border: '2px solid white',
            rounded: 'full',
            pos: 'absolute',
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          Okapee
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          <Link href="https://twitter.com/okapee0608" isExternal>
            @okapee0608
          </Link>
        </Text>
        <Text textAlign={'center'} color={useColorModeValue('gray.700', 'gray.400')} px={3}>
          読んだ本を互いにシェアすることで、互いの興味・関心を知り、未知の本に出会い、新たなコミュニケーションが生まれたり知識が獲得できれば嬉しいです。
        </Text>

        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          <Badge px={2} py={1} bg={useColorModeValue('gray.50', 'gray.800')} fontWeight={'400'}>
            #book
          </Badge>
          <Badge px={2} py={1} bg={useColorModeValue('gray.50', 'gray.800')} fontWeight={'400'}>
            #development
          </Badge>
          <Badge px={2} py={1} bg={useColorModeValue('gray.50', 'gray.800')} fontWeight={'400'}>
            #music
          </Badge>
        </Stack>

        <HStack justifyContent='center' mt={4}>
          <FacebookShareButton url={URL} quote={QUOTE}>
            <FacebookIcon size={24} square />
          </FacebookShareButton>
          <TwitterShareButton url={URL} title={QUOTE}>
            <TwitterIcon size={24} square />
          </TwitterShareButton>
          <LineShareButton url={URL} title={QUOTE}>
            <LineIcon size={24} square />
          </LineShareButton>
        </HStack>
      </Box>
    </Center>
  );
}
