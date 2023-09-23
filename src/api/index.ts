import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface VoteInfo {
  roomId: number;
  voteCreator: string;
  voteTitle: string;
  voteDescription: string;
  selectList: SelectInfo[];
}

export type SelectInfo = {
  voteValuesId: number;
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

interface VoteData {
  creatorName: string;
  voteTitle: string;
  modifyCode: string;
  voteDescription: string;
  selectList: string[];
  participantList: string[];
}

export interface VoteResultInfo {
  title: string;
  user: string;
  votes: Array<Vote>;
}

interface IVote {
  userName: string;
  voteValueId: number;
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

export const createVote = async (voteData: VoteData) => {
  const { data } = await axios.post('vote/putCreateNewVote', voteData);
  return data;
};

export const castVote = async (roomId: number, vote: IVote) => {
  const { data } = await axios.put(`vote/room/${roomId}/putCastVote`, vote);
  return data;
};
