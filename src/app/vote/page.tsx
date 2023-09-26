'use client';

import { VoteInfo, castVote, getVoteAPI } from '@/api';
import Button from '@/components/Button';
import VoteMenu from '@/components/VoteMenu';
import { RoomContext } from '@/context/RoomContext';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useContext } from 'react';

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

  console.log(voteInfo);

  const selectVote = (voteId: number) => {
    setSelectedBtnIndex(voteId);
    setSelectedVote(voteId);
  };

  const fetchVotes = async () => {
    try {
      const voteList = await getVoteAPI(roomCode!);
      setVoteInfo(voteList);
    } catch (error) {
      /** @todo 에러 핸들링 */
      console.error(error);
    }
  };

  const onSubmitClick = () => {
    if (selectedVote === null) {
      return;
    }
    try {
      /** @todo 버튼 눌렀을 때 필요한 데이터를 서버로 넘기기 */
      const { roomId } = voteInfo;
      castVote(roomId, { userName: username, voteValueId: selectedVote });
      window.alert('투표 완료!');
      router.push(`/result/?roomCode=${roomCode}&roomId=${roomId}`);
    } catch (err) {
      throw new Error('투표를 가져오는데 문제가 생겼습니다.');
    }
  };

  useEffect(() => {
    // 로딩 UI 표현을 위해 0.5초 딜레이 추가
    const timeoutId = setTimeout(() => {
      fetchVotes();
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <main className="relative flex flex-col h-screen justify-around py-10 px-8 ">
      {voteInfo.selectList.length === 0 ? (
        <>
          <h1 className="w-full text-2xl text-center mb-4">투표도장에 잉크를 꼼꼼히 바르고 있습니다....</h1>
          <Image width={300} height={300} src="/image/vote.png" alt="vote" />
        </>
      ) : (
        <>
          <div className="w-full h-fit flex flex-col items-center gap-4">
            <h1 className="text-2xl ">{voteInfo?.voteTitle}</h1>
            <p>{voteInfo?.voteDescription}</p>
          </div>
          <ul className="w-full flex flex-col justify-evenly gap-4">
            {voteInfo.selectList.map(({ voteValuesId, voteLabel }, idx, origin) => {
              return (
                <li
                  key={voteValuesId}
                  onClick={() => selectVote(voteValuesId)}
                  className={clsx(
                    idx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                    idx === origin.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                    selectedBtnIndex === voteValuesId ? 'z-10 border-indigo-200 bg-indigo-50' : 'border-gray-200',
                    'relative flex cursor-pointer flex-col border p-4 focus:outline-none md:grid md:grid-cols-3 md:pl-4 md:pr-6',
                  )}
                >
                  <div className="flex flex-1 justify-evenly">{voteLabel}</div>
                </li>
              );
            })}
          </ul>
          <Button type="submit" onClick={onSubmitClick}>
            투표
          </Button>
          <VoteMenu roomCode={roomCode} roomId={Number(roomId)} />
        </>
      )}
    </main>
  );
}
