'use client';

import { getVoteAPI } from '@/api';
import { RoomCodeContext } from '@/context/RoomCodeContext';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useContext } from 'react';

interface iParticipantList {
  participantsId: number;
  participantsName: string;
  isNameSelected: boolean;
}

interface iVoteType {
  voteId: number;
  voteCreator: string;
  voteTitle: string;
  voteDescription: string;
  selectList: string[];
  participantList: iParticipantList[];
}

export default function Participant() {
  const searchParams = useSearchParams();
  const roomCode = searchParams.get('roomCode');
  const router = useRouter();

  const { setRoomCode } = useContext(RoomCodeContext);
  const [selectedUserName, setSelectedUserName] = useState('');
  const [vote, setVote] = useState<iVoteType>();

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
    <div className="max-w-sm mx-auto">
      <div className="flex flex-col gap-16 px-6 pt-24 pb-8">
        <h1 className="w-full text-center text-xl text-black font-bold">{vote?.voteTitle}</h1>
        <ul
          className={clsx(
            'h-[30rem] w-full grid gap-x-4 gap-y-6 overflow-y-scroll',
            participantMoreThanSix ? 'grid-cols-3' : 'grid-cols-2',
          )}
        >
          {vote?.participantList.map(({ participantsId, participantsName, isNameSelected }) => (
            <li
              key={participantsId}
              onClick={() => changeUser(participantsName)}
              className={clsx(
                'h-[140px] flex justify-center items-center relative rounded-lg overflow-hidden bg-indigo-50 border-2 border-solid cursor-pointer',
                selectedUserName === participantsName ? 'border-indigo-200' : 'border-gray-100',
              )}
            >
              <p className="text-lg font-bold">{participantsName}</p>
              {isNameSelected && (
                <Image
                  src="/images/marker.png"
                  width={30}
                  height={30}
                  alt="doneVote icon"
                  className="absolute top-4 right-4"
                />
              )}
            </li>
          ))}
        </ul>
        {vote && (
          <button
            disabled={!hasSelectedUserName}
            onClick={() => router.push(isCompleted ? '/result' : '/vote')}
            className={`w-full h-16 flex justify-center items-center rounded-md bg-indigo-500 text-white ${
              hasSelectedUserName ? 'opacity-100' : 'opacity-60'
            }`}
          >
            {isCompleted ? '투표결과 보러가기' : '투표하러 가기'}
          </button>
        )}
      </div>
    </div>
  );
}
