'use client';

import { createVote } from '@/api';
import Button from '@/components/Button';
import TextArea from '@/components/TextArea';
import TextField from '@/components/TextField';
import VoteItemInput from '@/components/VoteItemInput';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type VoteInfo = {
  voteTitle: string;
  creatorName: string;
  modifyCode: string;
  voteDescription: string;
};

export default function Make() {
  const router = useRouter();

  const [voteInputInfo, setVoteInputInfo] = useState<VoteInfo>({
    voteTitle: '',
    creatorName: '',
    modifyCode: '',
    voteDescription: '',
  });

  const [voteList, setVoteList] = useState<string[]>(['', '']);
  const [participantList, setParticipantList] = useState<string[]>([]);

  const voteAddDisabled = voteList.length > 10;
  const voteRemoveDisabled = voteList.length < 3;
  const participantAddDisabled = participantList.length > 12;

  const handleVoteInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setVoteInputInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 투표항목
  // changeVoteItemList(idx)(event)
  const changeVoteItemList = (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVoteList = [...voteList];
    newVoteList[idx] = e.currentTarget.value;
    setVoteList(newVoteList);
  };

  // 투표 항목 기능
  const deleteVoteItemList = (idx: number) => () => {
    if (voteRemoveDisabled) return;
    const newVoteList = [...voteList];
    newVoteList.splice(idx, 1);
    setVoteList(newVoteList);
  };

  // 투표 항목 추가 기능
  const addVoteInput = () => {
    if (voteAddDisabled) return;
    const newVoteList = [...voteList];
    newVoteList.push('');
    setVoteList(newVoteList);
  };

  // 참가자 명단 추가
  const addParticipant = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim();
    if (e.key !== 'Enter' || !value || participantAddDisabled) return;
    const newParticipantList = [...participantList];
    newParticipantList.push(value);
    setParticipantList(newParticipantList);
    e.currentTarget.value = '';
  };

  // 추가한 인원 삭제
  const deleteParticipant = (idx: number) => () => {
    const newParticipantList = [...participantList];
    newParticipantList.splice(idx, 1);
    setParticipantList(newParticipantList);
  };

  // 투표 저장
  const submitVote = async () => {
    const { voteTitle, creatorName, modifyCode, voteDescription } = voteInputInfo;

    try {
      const { roomCode } = await createVote({
        voteTitle,
        creatorName,
        voteDescription,
        selectList: voteList.filter((vote) => vote !== ''),
        participantList,
        modifyCode,
      });
      router.push(`/?roomCode=${roomCode}`);
    } catch (err) {
      throw new Error('투표 생성에 실패했습니다.');
    }
  };

  return (
    <div className="container flex flex-col overflow-y-scroll gap-8">
      <h1 className="text-center text-xl font-semibold">투표를 만들어 보아요</h1>
      <div className="w-full flex flex-col gap-4">
        <TextField
          placeholder="투표 제목"
          value={voteInputInfo.voteTitle}
          name="voteTitle"
          onChange={handleVoteInput}
        />
        <TextField
          placeholder="투표 작성자"
          value={voteInputInfo.creatorName}
          name="creatorName"
          onChange={handleVoteInput}
        />
        <TextArea
          placeholder="내용"
          value={voteInputInfo.voteDescription}
          name="voteDescription"
          onChange={handleVoteInput}
        />
        <ul className="flex flex-col gap-y-4">
          {voteList.map((vote, idx) => (
            <VoteItemInput
              key={idx}
              itemName={vote}
              itemNameChange={changeVoteItemList(idx)}
              itemDelete={deleteVoteItemList(idx)}
              preventItemDelete={voteRemoveDisabled}
            />
          ))}
          <li>
            <Button onClick={addVoteInput} disabled={voteAddDisabled}>
              투표 항목 추가
            </Button>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <h2 className="text-lg font-bold">참가자 명단</h2>&nbsp;
          <p className="text-sm font-normal text-gray-400">( ※ 투표 작성자를 포함해주세요 )</p>
        </div>
        <TextField placeholder="참가자 입력" disabled={participantAddDisabled} onKeyUp={addParticipant} />
        <ul className="flex flex-wrap gap-2">
          {participantList.length !== 0 &&
            participantList.map((participant, idx) => (
              <li
                key={idx}
                className="flex items-center justify-center gap-2 w-fit py-1 px-3 rounded-3xl bg-indigo-500 text-white"
              >
                {participant}
                <button type="button" onClick={deleteParticipant(idx)} className="">
                  x
                </button>
              </li>
            ))}
        </ul>
      </div>
      <TextField
        type="password"
        placeholder="비밀번호"
        name="modifyCode"
        value={voteInputInfo.modifyCode}
        onChange={handleVoteInput}
      />

      <Button onClick={submitVote}>투표 저장</Button>
    </div>
  );
}
