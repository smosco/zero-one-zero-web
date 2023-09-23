'use client';

import { VoteInfo, castVote, getVoteAPI } from '@/api';
import VoteMenu from '@/components/VoteMenu';
import { RoomCodeContext } from '@/context/RoomCodeContext';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useContext } from 'react';

export default function VoteDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const param = searchParams.get('username');
  const username = param || '';

  const { roomCode } = useContext(RoomCodeContext);
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
      router.push('/result');
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
    <main className="relative flex flex-col h-screen justify-evenly m-10 my-10 py-10 px-8 ">
      {voteInfo.selectList.length === 0 ? (
        <>
          <h1 className="w-full text-2xl text-center mb-4">투표도장에 잉크를 꼼꼼히 바르고 있습니다....</h1>
          <Image width={500} height={500} src="/image/vote.png" alt="vote" />
        </>
      ) : (
        <>
          <h1 className="w-full text-2xl text-center mb-4">{voteInfo?.voteTitle}</h1>
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
          <button
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={onSubmitClick}
          >
            투표
          </button>
          <div className="flex" style={{ position: 'absolute', bottom: '13%', width: '30rem' }}>
            <VoteMenu share={true} />
          </div>
        </>
      )}
    </main>
  );
}
