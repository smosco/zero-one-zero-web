'use client';

import { fetchAndGetVote } from '@/apis/api';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface iParticipantList {
  participantId: number;
  participantName: string;
  isSelected: boolean;
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
  const router = useRouter();
  const search = useSearchParams();
  const code = search.get('code');
  const [selectedUserName, setSelectedUserName] = useState('');
  const [vote, setVote] = useState<iVoteType>();

  useEffect(() => {
    fetchAndGetVote().then((data) => setVote(data));
  }, []);

  const hasSelectedUserName: boolean = selectedUserName !== '';

  const isCompleted: boolean | undefined = vote?.participantList.find((item) => {
    return item.participantName === selectedUserName;
  })?.isSelected;

  const changeUser = (userName: string) => {
    if (selectedUserName === userName) {
      setSelectedUserName('');
    } else {
      setSelectedUserName(userName);
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <div className="flex flex-col gap-16 px-6 py-32">
        <h1 className="w-full text-center text-xl text-black font-bold">{vote?.voteTitle}</h1>
        <ul className="w-full grid grid-cols-2 gap-4">
          {vote?.participantList.map(({ participantId, participantName, isSelected }) => (
            <li
              key={participantId}
              onClick={() => changeUser(participantName)}
              className={`h-[140px] flex justify-center items-center relative rounded-lg overflow-hidden ${
                selectedUserName === participantName ? 'bg-[#e4f18b]' : 'bg-[#f0f2f5]'
              }`}
            >
              <p className="text-lg font-bold">{participantName}</p>
              {isSelected && (
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
            className={`w-full h-16 flex justify-center items-center rounded-md bg-[#8c70d7] text-white ${
              hasSelectedUserName ? 'opacity-100' : 'opacity-70'
            }`}
          >
            {isCompleted ? '투표결과 보러가기' : '투표하러 가기'}
          </button>
        )}
      </div>
    </div>
  );
}
