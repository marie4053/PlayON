'use client';

import { game, party, partyLog } from '@/api/game';
import { gameDetail } from '@/types/games';
import CustomPagination from '@/components/common/CustomPagination';
import EmptyLottie from '@/components/common/EmptyLottie';
import PickCard from '@/components/game/PickCard';
import ImFeelingLuckyBtn from './ImFeelingLuckyBtn';
import axios from 'axios';
import { GAME_ENDPOINTS } from '@/constants/endpoints/game';
import { useEffect, useState } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type Step = {
  keyword: string;
  isMacSupported: string;
  releaseDate: string;
  playerType: string;
  releaseStatus: string;
  genres: (string | undefined)[];
};
type Pagination = {
  page: number;
  size: number;
  sort: string[];
};

export default function SuspendedGameDisplay(props: { step: Step; pagination: Pagination }) {
  // const { totalItems, appIds, validData } = fetchGameScreenshots(props.step, props.pagination);
  const [totalItems, setTotalItems] = useState(48);
  const [appIds, setAppIds] = useState<number[]>([]);
  const [validData, setValidData] = useState<gameDetail[]>();

  useEffect(() => {
    async function fetchGameScreenshots(step: Step, pagination: Pagination) {
      const response = await axios.post(API_BASE_URL + GAME_ENDPOINTS.list, { ...step }, { params: { ...pagination } });
      const totalItems = response.data.data.totalItems;
      const appIds: number[] = response.data.data.items.map(
        (_: { appid: number; name: string; headerImage: string; genres: string[] }) => _.appid
      );
      const gameData = await Promise.all(
        appIds.map(async (appid: number) => {
          const detailResponse = await axios.get(API_BASE_URL + GAME_ENDPOINTS.details(appid));
          if (detailResponse && detailResponse.status === 200) {
            return {
              game: detailResponse.data.data.game as game,
              partyList: detailResponse.data.data.partyList as party[],
              partyLogList: detailResponse.data.data.completedPartyList as partyLog[],
            };
          }
          return undefined;
        })
      );
      function convertToClientGame(data: game): gameDetail {
        return {
          about: data.aboutTheGame,
          detail_desc: data.aboutTheGame,
          developer: [data.developers],
          genre: data.genres,
          homepage_url: data.website,
          img_src: data.headerImage,
          movie_src: data.movies,
          screenshot_src: data.screenshots,
          os: {
            linux: data.isLinuxSupported,
            mac: data.isMacSupported,
            windows: data.isWindowsSupported,
          },
          publisher: [data.publishers],
          release_date: data.releaseDate,
          short_desc: data.shortDescription,
          title: data.name,
        };
      }
      const validData = gameData.filter((_) => _ !== undefined).map((__) => convertToClientGame(__.game));
      setTotalItems(totalItems);
      setAppIds(appIds);
      setValidData(validData);
    }
    fetchGameScreenshots(props.step, props.pagination);
  }, [props.step, props.pagination]);

  return (
    <>
      {validData && validData.length > 0 && (
        <div className="lg:w-[1280px] grid grid-cols-4 grid-rows-3 gap-x-6 gap-y-12 mt-[100px]">
          {validData.map((e, ind) => (
            <PickCard data={e} key={ind} appid={appIds[ind]} />
          ))}
        </div>
      )}
      {validData && validData.length <= 0 && (
        <div className="w-full text-center mt-[100px] mb-[100px]">
          <EmptyLottie className="w-[400px]" text="원하는 게임이 없으신가요?">
            <ImFeelingLuckyBtn />
          </EmptyLottie>
        </div>
      )}
      {validData && validData.length > 0 && (
        <div className="mt-[100px] mb-[100px]">
          <CustomPagination pageSize={12} totalItems={totalItems} />
        </div>
      )}
    </>
  );
}
