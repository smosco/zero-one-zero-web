'use client';

import { createVote } from '@/api';
import Button from '@/components/Button';
import TextArea from '@/components/TextArea';
import TextField from '@/components/TextField';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Make() {
  const router = useRouter();

  const [voteTitle, setVoteTitle] = useState<string>('');
  const [voteWriter, setVoteWriter] = useState<string>('');
  const [votePassword, setVotePassword] = useState<string>('');
  const [voteList, setVoteList] = useState<string[]>(['', '']);
  const [participantList, setParticipantList] = useState<string[]>([]);

  const voteAddDisabled = voteList.length > 10;
  const voteRemoveDisabled = voteList.length < 3;
  const participantAddDisabled = participantList.length > 12;

  const changeVoteTitle = (e: React.ChangeEvent<HTMLInputElement>) => setVoteTitle(e.currentTarget.value);
  const changeVoteWriter = (e: React.ChangeEvent<HTMLInputElement>) => setVoteWriter(e.currentTarget.value);
  const chnageVotePassword = (e: React.ChangeEvent<HTMLInputElement>) => setVotePassword(e.currentTarget.value);
  const changeVoteList = (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVoteList = [...voteList];
    newVoteList[idx] = e.currentTarget.value;
    setVoteList(newVoteList);
  };
  const deleteVoteList = (idx: number) => () => {
    if (voteRemoveDisabled) return;
    const newVoteList = [...voteList];
    newVoteList.splice(idx, 1);
    setVoteList(newVoteList);
  };
  const addVoteInput = () => {
    if (voteAddDisabled) return;
    const newVoteList = [...voteList];
    newVoteList.push('');
    setVoteList(newVoteList);
  };
  const addParticipant = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim();
    if (e.key !== 'Enter' || !value || participantAddDisabled) return;
    const newParticipantList = [...participantList];
    newParticipantList.push(value);
    setParticipantList(newParticipantList);
    e.currentTarget.value = '';
  };
  const deleteParticipant = (idx: number) => () => {
    const newParticipantList = [...participantList];
    newParticipantList.splice(idx, 1);
    setParticipantList(newParticipantList);
  };

  const submitVote = async () => {
    /** @todo API 통합 */
    try {
      const { roomCode } = await createVote({
        voteTitle,
        creatorName: voteWriter,
        modifyCode: votePassword,
        voteDescription: '',
        selectList: voteList,
        participantList,
      });
      router.push(`/?roomCode=${roomCode}`);
    } catch (err) {
      throw new Error('투표 생성에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col gap-y-4 px-8 py-10">
      <TextField aria-label="투표 제목" placeholder="투표 제목" value={voteTitle} onChange={changeVoteTitle} />
      <TextField aria-label="투표 작성자" placeholder="투표 작성자" value={voteWriter} onChange={changeVoteWriter} />
      <TextArea className="px-3 py-3 border rounded-lg" aria-label="내용" placeholder="내용" />
      <ul className="flex flex-col gap-y-4">
        {voteList.map((vote, idx) => (
          <li key={idx}>
            <TextField aria-label="투표 항목" placeholder="투표 항목" value={vote} onChange={changeVoteList(idx)} />
            <Button onClick={deleteVoteList(idx)} disabled={voteRemoveDisabled}>
              삭제
            </Button>
          </li>
        ))}
        <li>
          <Button onClick={addVoteInput} disabled={voteAddDisabled}>
            투표 항목 추가
          </Button>
        </li>
      </ul>
      <h2>참가자 명단</h2>
      <ul className="grid grid-cols-3 gap-4">
        {participantList.map((participant, idx) => (
          <li
            key={idx}
            className="flex items-center justify-center gap-2 w-fit py-2 px-4 rounded-3xl bg-indigo-500 text-white "
          >
            {participant}
            <button type="button" onClick={deleteParticipant(idx)} className="">
              x
            </button>
          </li>
        ))}
      </ul>
      <TextField
        aria-label="참가자 입력"
        placeholder="참가자 입력"
        disabled={participantAddDisabled}
        onKeyUp={addParticipant}
      />
      <p>투표 작성자 포함해주세요</p>
      <TextField
        type="password"
        aria-label="비밀번호"
        placeholder="비밀번호"
        value={votePassword}
        onChange={chnageVotePassword}
      />
      <Button onClick={submitVote}>투표 저장</Button>
    </div>
  );
}
