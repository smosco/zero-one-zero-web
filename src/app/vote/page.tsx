'use client';

import { VoteInfo, castVote, getVoteAPI } from '@/api';
import Button from '@/components/Button';
import VoteMenu from '@/components/VoteMenu';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function VoteDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const param = searchParams.get('username');
  const roomCode = searchParams.get('roomCode');
  const roomId = searchParams.get('roomId');
  const username = param || '';

  const [voteInfo, setVoteInfo] = useState<VoteInfo>({
    roomId: 0,
    voteCreator: '',
    voteTitle: '',
    voteDescription: '',
    selectList: [],
  });
  const [selectedBtnIndex, setSelectedBtnIndex] = useState<number | null>(null);
  const [selectedVote, setSelectedVote] = useState<number | null>(null);

  const selectVote = (voteId: number) => {
    setSelectedBtnIndex(voteId);
    setSelectedVote(voteId);
  };

  const fetchVotes = async () => {
    try {
      const voteList = await getVoteAPI(roomCode!);
      setVoteInfo(voteList);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitClick = () => {
    if (selectedVote === null) {
      return;
    }
    try {
      const { roomId } = voteInfo;
      castVote(roomId, { userName: username, voteValueId: selectedVote });
      window.alert('투표 완료!');
      router.push(`/result/?roomCode=${roomCode}&roomId=${roomId}`);
    } catch (err) {
      throw new Error('투표를 가져오는데 문제가 생겼습니다.');
    }
  };

  useEffect(() => {
    // 로딩 UI 표현을 위해 0.3초 딜레이 추가
    const timeoutId = setTimeout(() => {
      fetchVotes();
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <main className="container relative flex flex-col justify-between gap-8 overflow-y-scroll">
      {voteInfo.selectList.length === 0 ? (
        <div className="container">
          <h1 className="w-full text-2xl text-center font-bold mb-4">투표도장에 잉크를 꼼꼼히 바르고 있습니다....</h1>
          <Image width={250} height={250} src="/image/vote.png" alt="vote" />
        </div>
      ) : (
        <>
          <div className="w-full h-fit flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-xl font-semibold">{voteInfo?.voteTitle}</h1>
              <p className="text-gray-400">{voteInfo?.voteDescription}</p>
            </div>
            <ul className="w-full flex flex-col justify-evenly gap-4">
              {voteInfo.selectList.map(({ voteValuesId, voteLabel }, idx) => {
                return (
                  <li
                    key={voteValuesId}
                    onClick={() => selectVote(voteValuesId)}
                    className={clsx(
                      idx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                      selectedBtnIndex === voteValuesId ? 'z-10 border-indigo-200 bg-indigo-50' : 'border-gray-200',
                      'relative cursor-pointer border px-4 py-3 rounded-md focus:outline-none',
                    )}
                  >
                    <span className="font-medium">{voteLabel}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <Button type="submit" onClick={onSubmitClick}>
              투표
            </Button>
            <VoteMenu roomCode={roomCode} roomId={Number(roomId)} />
          </div>
        </>
      )}
    </main>
  );
}
