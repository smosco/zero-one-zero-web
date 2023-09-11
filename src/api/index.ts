import axios from 'axios';

export interface VoteInfo {
  voteId: number;
  voteCreator: string;
  voteTitle: string;
  voteDescription: string;
  selectList: SelectInfo[];
}

export type SelectInfo = {
  voteId: number;
  voteLabel: string;
};

export type ParticipantInfo = {
  participantId: number;
  participantName: string;
  isSelected: boolean;
};

interface Vote {
  option: string;
  selecteduser: string;
}

export interface VoteResultInfo {
  title: string;
  user: string;
  votes: Array<Vote>;
}

/** @todo API 통합 */
export const getVoteListAPI = async (): Promise<VoteInfo & ParticipantInfo[]> => {
  const { data } = await axios.get('/dummy/VoteListInfo.json');
  return data;
};

/** @todo API 통합 */
export const getVoteResultListAPI = async (): Promise<VoteResultInfo> => {
  const { data } = await axios.get('/dummy/VoteResultInfo.json');
  return data;
};

/** @todo API 통합 */
export const getVoteAPI = async () => {
  const { data } = await axios.get('/dummy/vote.json');
  return data;
};
