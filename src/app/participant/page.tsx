'use client';

import Image from 'next/image';
import Link from 'next/link';
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

  return (
    <div className="w-screen max-w-[360px] mx-auto h-screen px-8 pt-32 py-16 flex flex-col gap-16 items-center bg-gray-200 ">
      <h1 className="w-full text-center">{vote.voteTitle}</h1>
      <ul className="w-full grid grid-cols-2 gap-4 ">
        {vote?.participantList.map((item) => (
          <li
            key={item.participantId}
            className="h-[140px] flex justify-center items-center relative rounded-md bg-gray-400 "
          >
            <p>{item.participantName}</p>
            {item.isSelected && (
              <Image
                src="/images/completeVote.png"
                width={50}
                height={50}
                alt="doneVote icon"
                className="absolute top-0 right-0"
              />
            )}
          </li>
        ))}
      </ul>

      <Link href="/vote" className="w-full h-16 flex justify-center items-center rounded-md bg-gray-400">
        투표하러 가기
      </Link>
    </div>
  );
}
