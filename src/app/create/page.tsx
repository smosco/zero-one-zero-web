'use client';

import Button from '@/components/Button';
import TextArea from '@/components/TextArea';
import TextField from '@/components/TextField';
import { useState } from 'react';

export default function Create() {
  const [voteTitle, setVoteTitle] = useState<string>('');
  const [voteWriter, setVoteWriter] = useState<string>('');
  const [votePassword, setVotePassword] = useState<string>('');
  const [voteList, setVoteList] = useState<string[]>(['', '']);
  const [participantList, setParticipantList] = useState<string[]>([]);

  const voteAddDisabled = voteList.length > 10;
  const voteRemoveDisabled = voteList.length < 3;
  const participantAddDisabled = participantList.length > 12;

  const onVoteTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => setVoteTitle(event.currentTarget.value);
  const onVoteWriterChange = (event: React.ChangeEvent<HTMLInputElement>) => setVoteWriter(event.currentTarget.value);
  const onVotePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setVotePassword(event.currentTarget.value);

  const createVoteChangeHandler = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVoteList = [...voteList];
    newVoteList[index] = event.currentTarget.value;
    setVoteList(newVoteList);
  };
  const createVoteDeleteHandler = (index: number) => () => {
    if (voteRemoveDisabled) return;
    const newVoteList = [...voteList];
    newVoteList.splice(index, 1);
    setVoteList(newVoteList);
  };
  const onVoteAddHandler = () => {
    if (voteAddDisabled) return;
    const newVoteList = [...voteList];
    newVoteList.push('');
    setVoteList(newVoteList);
  };

  const createParticipantDeleteHandler = (index: number) => () => {
    const newParticipantList = [...participantList];
    newParticipantList.splice(index, 1);
    setParticipantList(newParticipantList);
  };
  const onParticipantKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value.trim();
    if (event.key !== 'Enter' || !value || participantAddDisabled) return;
    const newParticipantList = [...participantList];
    newParticipantList.push(value);
    setParticipantList(newParticipantList);
    event.currentTarget.value = '';
  };

  const onSubmitClick = () => {
    alert(
      JSON.stringify({
        voteTitle,
        voteWriter,
        votePassword,
        voteList,
        participantList,
      }),
    );
  };

  return (
    <div className="flex flex-col gap-y-4 px-6">
      <TextField aria-label="투표 제목" placeholder="투표 제목" value={voteTitle} onChange={onVoteTitleChange} />
      <TextField aria-label="투표 작성자" placeholder="투표 작성자" value={voteWriter} onChange={onVoteWriterChange} />
      <TextArea className="w-full px-3 py-3 border rounded-lg" aria-label="내용" placeholder="내용" />
      <ul className="flex flex-col gap-y-4">
        {voteList.map((vote, index) => (
          <li key={index}>
            <TextField
              aria-label="투표 항목"
              placeholder="투표 항목"
              value={vote}
              onChange={createVoteChangeHandler(index)}
            />
            <Button onClick={createVoteDeleteHandler(index)} disabled={voteRemoveDisabled}>
              삭제
            </Button>
          </li>
        ))}
        <li>
          <Button onClick={onVoteAddHandler} disabled={voteAddDisabled}>
            투표 항목 추가
          </Button>
        </li>
      </ul>
      <h2>참가자 명단</h2>
      <ul>
        {participantList.map((participant, index) => (
          <li key={index}>
            {participant}{' '}
            <button type="button" onClick={createParticipantDeleteHandler(index)}>
              삭제
            </button>
          </li>
        ))}
      </ul>
      <TextField
        aria-label="참가자 입력"
        placeholder="참가자 입력"
        disabled={participantAddDisabled}
        onKeyUp={onParticipantKeyUp}
      />
      <p>투표 작성자는 생략해주세요</p>
      <TextField
        type="password"
        aria-label="비밀번호"
        placeholder="비밀번호"
        value={votePassword}
        onChange={onVotePasswordChange}
      />
      <Button onClick={onSubmitClick}>투표 저장</Button>
    </div>
  );
}
