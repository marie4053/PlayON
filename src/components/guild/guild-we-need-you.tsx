'use client';

import { guild } from '@/types/guild';
import RetroButton from '../common/RetroButton';
import CapsuleCategoryMenu from '@/components/common/capsule-category-menu';
import { useCallback, useState } from 'react';
import UserInfoHorizontal from '@/app/party/components/UserInfoHorizontal';
import Tag from '../common/Tag';
import SearchBar from '../common/SearchBar';
import Link from 'next/link';
import { GUILD_ROUTE } from '@/constants/routes/guild';
import { useParams, useRouter } from 'next/navigation';
import { PATH } from '@/constants/routes';
import { Home, RefreshCcw } from 'lucide-react';

type WeNeedYouProps = {
  guildData: guild;
  className?: string;
};

export default function WeNeedYou(props: WeNeedYouProps) {
  const params = useParams();
  const guildId = (params.guildid as string) ?? null;
  const postId = params.postid as string;
  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState<string>('');

  const HandleSearchClick = useCallback(
    (value: string) => {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('search', value);
      router.replace(newUrl.toString());
    },
    [router]
  );
  const HandleSearchClickDetail = useCallback(
    (value: string) => {
      router.replace(`${PATH.guild_community(guildId)}${value ? `?search=${value}` : ''}`);
    },
    [guildId, router, selectedTag]
  );

  const handleClickReset = useCallback(() => {
    router.replace(PATH.guild_community(guildId));
  }, [guildId, router]);

  return (
    <div
      className={`flex flex-col p-8 gap-9 rounded-xl border border-neutral-200 bg-white w-full overflow-hidden ${props.className} `}
    >
      <div className="flex flex-col gap-5 ">
        <div className="flex justify-between items-center">
          <Tag size="small" style="default" background="medium" className="w-12 font-suit font-bold">
            길드장
          </Tag>
          <div onClick={() => router.push(PATH.guild_detail(guildId))}>
            <Home className="size-5 hover:text-purple-500 text-neutral-400 cursor-pointer" />
          </div>
        </div>
        <UserInfoHorizontal size="small" data={props.guildData.owner} />
        <p className=" text-start font-dgm line-clamp-1 text-ellipsis overflow-hidden text-neutral-900 text-4xl break-words">
          {props.guildData.guild_name}
        </p>
        <p className="text-start font-suit line-clamp-2 text-ellipsis overflow-hidden text-neutral-900 break-words">
          {props.guildData.description}
        </p>
        <div className="flex gap-3">
          <p className="font-suit text-neutral-900">전체 인원</p>
          <p className="font-suit font-bold text-neutral-900">{props.guildData.num_members}명</p>
        </div>
      </div>
      <Link href={guildId ? GUILD_ROUTE.guild_community_create(guildId) : GUILD_ROUTE.guild}>
        <RetroButton
          type="purple"
          callback={() => {}}
          className="font-suit text-lg text-white font-semibold w-full h-11"
        >
          글쓰기
        </RetroButton>
      </Link>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="2" viewBox="0 0 347 2" fill="none">
        <path d="M0 1H347" stroke="#E5E5E5" />
      </svg>
      {!postId ? (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div
              className="flex gap-1 items-center self-end text-sm text-neutral-400 hover:text-purple-600 cursor-pointer"
              onClick={handleClickReset}
            >
              <RefreshCcw className=" size-3" />
              초기화
            </div>
            <SearchBar onChange={() => {}} onSearch={(value) => HandleSearchClick(value)} />
          </div>
          <CapsuleCategoryMenu />
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <SearchBar onChange={() => {}} onSearch={(value) => HandleSearchClickDetail(value)} />
          <CapsuleCategoryMenu onClick={(value) => router.replace(`${PATH.guild_community(guildId)}?tag=${value}`)} />
        </div>
      )}
    </div>
  );
}
