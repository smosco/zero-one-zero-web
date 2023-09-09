'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Participant() {
  const [selectedUser, setSelectedUser] = useState('');
  const vote = {
    voteId: 1,
    voteCreator: '키유',
    voteTitle: '키유의 투표',
    voteDescription: '오늘 저녁 뭐 먹을지 정해봐요!',
    selectList: ['짜장면', '마라탕', '돈가스'],
    participantList: [
      { participantId: 1, participantName: '제리', isSelected: true },
      { participantId: 2, participantName: '키유', isSelected: false },
      { participantId: 3, participantName: '앨빈', isSelected: false },
      { participantId: 4, participantName: '니노', isSelected: false },
    ],
  };
  const isSelected = selectedUser !== '';
  const router = useRouter();

  const changeUser = (userName: string) => {
    if (selectedUser === userName) {
      setSelectedUser('');
    } else {
      setSelectedUser(userName);
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <div className="flex flex-col gap-16 px-6 py-32 bg-black">
        <h1 className="w-full text-center">{vote.voteTitle}</h1>
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
              {item.isSelected && (
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
          onClick={() => router.push('/vote')}
          className={`w-full h-16 flex justify-center items-center rounded-md bg-[#eb7a53] ${
            isSelected ? 'opacity-100' : 'opacity-70'
          }`}
        >
          투표하러 가기
        </button>
      </div>
    </div>
  );
}
