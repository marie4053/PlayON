import Game from '@/app/game/page';
import { communityTags } from '@/types/Tags/communityTags';

const typeMap = {
  playStyle: {
    KoToEn: {
      맛보기: 'BEGINNER',
      캐주얼: 'CASUAL',
      노멀: 'NORMAL',
      하드: 'HARDCORE',
      익스트림: 'EXTREME',
      도전과제: 'COMPLETIONIST',
      스피드러너: 'SPEEDRUN',
    },
    EnToKo: {
      BEGINNER: '맛보기',
      CASUAL: '캐주얼',
      NORMAL: '노멀',
      HARDCORE: '하드',
      EXTREME: '익스트림',
      COMPLETIONIST: '도전과제',
      SPEEDRUN: '스피드러너',
    },
  },
  skillLevel: {
    KoToEn: {
      뉴비: 'NEWBIE',
      프로: 'PRO',
      해커: 'HACKER',
      마스터: 'MASTER',
    },
    EnToKo: {
      NEWBIE: '뉴비',
      PRO: '프로',
      HACKER: '해커',
      MASTER: '마스터',
    },
  },
  gender: {
    KoToEn: {
      남자만: 'MALE',
      여자만: 'FEMALE',
    },
    EnToKo: {
      MALE: '남자만',
      FEMALE: '여자만',
    },
  },
  userGender: {
    KoToEn: {
      남자: 'MALE',
      여자: 'FEMALE',
    },
    EnToKo: {
      MALE: '남자',
      FEMALE: '여자',
    },
  },
  friendly: {
    KoToEn: {
      '친목 환영': 'SOCIAL_FRIENDLY',
      '게임 전용': 'GAME_ONLY',
      '대화 없음': 'NO_CHAT',
    },
    EnToKo: {},
  },
  // communityTags: {
  //   KoToEn : {
  //     '일상':
  //     '유머':
  //     '게임추천':
  //     '게임소식':
  //     '질문':
  //     '파티모집':
  //   },
  //   EnToKo : {

  //   }
  // },
  guildCommunityTags: {
    KoToEn: {
      공지: 'FREE',
      자유: 'GAME',
      게임관련: 'NOTICE',
    },
    EnToKo: {
      FREE: '공지',
      GAME: '자유',
      NOTICE: '게임관련',
    },
  },
  GameGenreTags: {
    KoToEn: {
      액션: 'Action',
      인디: 'Indie',
      어드벤처: 'Adventure',
      시뮬레이션: 'Simulation',
      RPG: 'RPG',
      전략: 'Strategy',
      캐주얼: 'Casual',
    },
    EnToKo: {
      Action: '액션',
      Indie: '인디',
      Adventure: '어드벤처',
      Simulation: '시뮬레이션',
      RPG: 'RPG',
      Strategy: '전략',
      Casual: '캐주얼',
    },
  },
  GamePlayerTypeTags: {
    KoToEn: {
      멀티플레이: 'MULTI',
      싱글플레이: 'SINGLE',
    },
    EnToKo: {
      MULTIPLE: '멀티플레이',
      SINGLE: '싱글플레이',
    },
  },
  GameReleaseStatusTags: {
    KoToEn: {
      발매: 'RELEASED',
      출시예정: 'UNRELEASED',
    },
    EnToKo: {
      RELEASED: '발매',
      UNRELEASED: '출시예정',
    },
  },
};

type TypeMap = typeof typeMap;
type ConvertingType = keyof TypeMap;
type Direction = keyof TypeMap[ConvertingType];

export default function typeConverter<T extends ConvertingType, D extends Direction, I extends keyof TypeMap[T][D]>(
  convertingType: T,
  direction: D,
  input: I
): TypeMap[T][D][I] | undefined {
  return typeMap[convertingType][direction][input];
}
