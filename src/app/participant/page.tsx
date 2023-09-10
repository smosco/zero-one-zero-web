'use client';

import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface iParticipantList {
  participantId: number;
  participantName: string;
  isDone: boolean;
}

interface iVoteType {
  voteId: number;
  voteCreator: string;
  voteTitle: string;
  voteDescription: string;
  selectList: string[];
  participantList: iParticipantList[];
} // 인터페이스~

export default function Participant() {
  const [selectedUser, setSelectedUser] = useState('');
  const [vote, setVote] = useState<iVoteType>();
  const getVote = async () => {
    try {
      const { data } = await axios.get('/dummy/vote.json');
      return data;
    } catch (err) {
      console.log('get vote person error : ', err);
    }
  };

  useEffect(() => {
    getVote().then((data) => setVote(data));
  }, []);

  const isSelected: boolean = selectedUser !== '';
  const router = useRouter();

  const changeUser = (userName: string) => {
    if (selectedUser === userName) {
      setSelectedUser('');
    } else {
      setSelectedUser(userName);
    }
  };

  const isCompleted: iParticipantList | undefined = vote?.participantList.find((item) => {
    return item.participantName === selectedUser;
  });

  return (
    <div className="max-w-sm mx-auto">
      <div className="flex flex-col gap-16 px-6 py-32 bg-black">
        <h1 className="w-full text-center text-white ">{vote?.voteTitle}</h1>
        <ul className="w-full grid grid-cols-2 gap-4 ">
          {vote?.participantList.map((item) => (
            <li
              key={item.participantId}
              onClick={() => {
                changeUser(item.participantName);
              }}
              className={`h-[140px] flex justify-center items-center relative rounded-md overflow-hidden ${
                selectedUser === item.participantName ? 'bg-[#f7d44c]' : 'bg-[#f6ecc9]'
              }`}
            >
              <p className="text-lg font-bold">{item.participantName}</p>
              {item.isDone && (
                <Image
                  src="/images/completeVote.png"
                  width={50}
                  height={50}
                  alt="doneVote icon"
                  className="absolute top-0 right-0 "
                />
              )}
            </li>
          ))}
        </ul>
        <button
          disabled={!isSelected}
          onClick={() => {
            router.push(isCompleted?.isDone ? '/result' : '/vote');
          }}
          className={`w-full h-16 flex justify-center items-center rounded-md bg-[#eb7a53] ${
            isSelected ? 'opacity-100' : 'opacity-70'
          }`}
        >
          {isCompleted?.isDone ? '투표결과 보러가기' : '투표하러 가기'}
        </button>
      </div>
    </div>
  );
}
