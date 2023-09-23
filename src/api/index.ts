import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
export const getVoteAPI = async (roomCode: string) => {
  const { data } = await axios.get(roomCode);
  return data;
};
