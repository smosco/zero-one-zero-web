'use client';

import { getVoteResultListAPI, VoteResultInfo } from '@/api';
import VoteMenu from '@/components/VoteMenu';
import { RoomCodeContext } from '@/context/RoomCodeContext';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useContext } from 'react';

export default function VoteResultPage() {
  const { roomId } = useContext(RoomCodeContext);
  const [voteObject, setVoteObject] = useState<VoteResultInfo>({
    voteTitle: '',
    result: [],
    selectedMaxSize: 0,
    cumulativeVoteCount: 0,
  });

  console.log(voteObject);

  /** @todo 서버에서 주어지는 데이터 모델 확정 후 변경*/
  // const userAllNumber = parseInt(voteObject?.user.split('/')[1] || '0');
  // const voteUserNumber = parseInt(voteObject?.user.split('/')[0] || '0');

  const fetchVoteResult = async () => {
    try {
      const res = await getVoteResultListAPI(roomId!);
      setVoteObject(res);
    } catch (error) {
      /** @todo 에러 핸들링 */
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVoteResult();
  }, []);

  return (
    <main className="relative flex flex-col h-screen justify-evenly m-10 my-10 py-10 px-8">
      {voteObject?.result?.length === 0 ? (
        <></>
      ) : (
        <>
          <div>
            <div className="w-full">
              <h1 className=" text-2xl text-center mb-1 rounded-md py-4">{voteObject?.voteTitle}</h1>
              <div className="flex justify-end mb-6">
                <Image className=" inline" width={30} height={30} src="/image/icon-user-fill.png" alt="person" />
                <p>
                  {voteObject?.cumulativeVoteCount}/{voteObject?.selectedMaxSize}
                </p>
              </div>
            </div>
            <ul className="w-full flex flex-col justify-evenly gap-4">
              {voteObject?.result &&
                voteObject?.result.map((el, idx) => {
                  return (
                    <li
                      key={idx}
                      className={clsx(
                        'relative flex  flex-col border p-4 focus:outline-none md:grid md:grid-cols-2 md:pl-4 md:pr-6',
                      )}
                    >
                      <div className="flex flex-1 justify-between">{el.voteValueId}</div>
                      <div className="flex justify-end">
                        <Image
                          className=" inline"
                          width={30}
                          height={30}
                          src="/image/icon-user-fill.png"
                          alt="person"
                        />
                        <span>{el.selectedSize}</span>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div>
            <div className="flex justify-center">
              <p className="mb-4">과반수 이상일 시 투표 현황을 공개합니다.</p>
            </div>
            <div className="flex" style={{ position: 'absolute', bottom: '13%', width: '30rem' }}>
              <VoteMenu share={false} />
            </div>
          </div>
        </>
      )}
    </main>
  );
}
