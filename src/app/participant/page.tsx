'use client';

import axios from 'axios';
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
  const [selectedUser, setSelectedUser] = useState('');
  const [vote, setVote] = useState<iVoteType>();

  const getVote = async () => {
    try {
      /** @todo API 통합 */
      const { data } = await axios.get('/dummy/vote.json');
      return data;
    } catch (err) {
      /** @todo 에러 핸들링 */
      console.log('get vote person error : ', err);
    }
  };

  useEffect(() => {
    getVote().then((data) => setVote(data));
  }, []);

  const hasSelected: boolean = selectedUser !== '';

  const isCompleted: iParticipantList | undefined = vote?.participantList.find((item) => {
    return item.participantName === selectedUser;
  });

  const changeUser = (userName: string) => {
    if (selectedUser === userName) {
      setSelectedUser('');
    } else {
      setSelectedUser(userName);
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
                selectedUser === participantName ? 'bg-[#e4f18b]' : 'bg-[#f0f2f5]'
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
            disabled={!hasSelected}
            onClick={() => router.push(isCompleted?.isSelected ? '/result' : '/vote')}
            className={`w-full h-16 flex justify-center items-center rounded-md bg-[#8c70d7] text-white ${
              hasSelected ? 'opacity-100' : 'opacity-70'
            }`}
          >
            {isCompleted?.isSelected ? '투표결과 보러가기' : '투표하러 가기'}
          </button>
        )}
      </div>
    </div>
  );
}
