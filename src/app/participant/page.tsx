'use client';

import { getVoteAPI } from '@/api';
import Button from '@/components/Button';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface IParticipantList {
  participantsId: number;
  participantsName: string;
  isNameSelected: boolean;
}

interface IVoteType {
  voteId: number;
  voteCreator: string;
  voteTitle: string;
  voteDescription: string;
  selectList: string[];
  participantList: IParticipantList[];
  overed: boolean;
}

export default function Participant() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomCode = searchParams.get('roomCode');
  const roomId = searchParams.get('roomId');
  const [selectedUserName, setSelectedUserName] = useState('');
  const [vote, setVote] = useState<IVoteType>();

  useEffect(() => {
    (async () => {
      try {
        const data = await getVoteAPI(roomCode!);
        setVote(data);
      } catch (error) {
        throw new Error('투표를 가져오는데 문제가 생겼습니다.');
      }
    })();
  }, [roomCode]);

  const hasSelectedUserName: boolean = selectedUserName !== '';
  const isCompleted: boolean | undefined = vote?.participantList.find((item) => {
    return item.participantsName === selectedUserName;
  })?.isNameSelected;
  const numOfParticipant: number | undefined = vote?.participantList.length;
  const participantMoreThanSix: boolean | 0 | undefined = numOfParticipant && numOfParticipant > 6;

  const changeUser = (userName: string) => {
    if (selectedUserName === userName) {
      setSelectedUserName('');
    } else {
      setSelectedUserName(userName);
    }
  };

  return (
    <div className="container flex flex-col gap-8 justify-between">
      <div className="w-full flex flex-col gap-2 items-center">
        <h1 className="text-2xl font-bold">{vote?.voteTitle}</h1>
        <p className="text-gray-400">{vote?.voteDescription}</p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-center font-semibold">투표자 이름을 선택해주세요</p>
        <ul
          className={clsx(
            'h-[25rem] w-full grid gap-4 overflow-y-scroll rounded-lg',
            participantMoreThanSix ? 'grid-cols-3' : 'grid-cols-2',
          )}
        >
          {vote?.participantList.map(({ participantsId, participantsName, isNameSelected }) => (
            <li
              key={participantsId}
              onClick={() => changeUser(participantsName)}
              className={clsx(
                'h-[8rem] flex justify-center items-center relative rounded-lg overflow-hidden bg-indigo-50 border-2 border-solid cursor-pointer',
                selectedUserName === participantsName ? 'border-indigo-200' : 'border-gray-100',
              )}
            >
              <p className="font-medium">{participantsName}</p>
              {isNameSelected && (
                <Image
                  src="/images/marker.png"
                  width={30}
                  height={30}
                  alt="doneVote icon"
                  className="absolute top-3 right-3"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
      {vote && (
        <Button
          type="button"
          className={`h-16 ${hasSelectedUserName ? 'opacity-100' : 'opacity-60'}`}
          disabled={!hasSelectedUserName}
          onClick={() =>
            router.push(
              vote.overed || isCompleted
                ? `/result/?roomCode=${roomCode}&roomId=${roomId}`
                : `/vote/?username=${selectedUserName}&roomCode=${roomCode}`,
            )
          }
        >
          {vote.overed || isCompleted ? '투표결과 보러가기' : '투표하러 가기'}
        </Button>
      )}
    </div>
  );
}

// 투표항목을 보는 화면으로 넘어갈때
// 쿼리스트링으로 투표자의 이름을 넘김

// why?
// 투표 선택을 누르면 API요청하는데 그 중에 투표자 이름이 필요하다.
// 누가 투표를 하려고 하는지 알수가 없어서
// 페이지간의 이동이니까

// 왜 그런 생각을 가졌니?
// 쿼리스트링, 로컬스토리지를 쓰면 어찌되었든 사용자가 변경할 수 있다.
// 그래서 이걸 막고 싶었어.

// useContext
// 문제는 새로고침시 정보가 사라져 버리니까 이게 골치야.
// 그래서 새로고침시 유저에게 정보를 다시 받아올 수 있는 페이지로 이동하도록 변경
// 이것을 기획자와 상의해서 FLOW를 변경함
//
