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
interface VoteData {
  creatorName: string;
  voteTitle: string;
  modifyCode: string;
  voteDescription: string;
  selectList: string[];
  participantList: string[];
}
export interface IVoteItem {
  voteValueId: number;
  selectedSize: number;
}
export interface VoteResultInfo {
  voteTitle: string;
  result: IVoteItem[];
  selectedMaxSize: number;
  cumulativeVoteCount: number;
}
interface IVote {
  userName: string;
  voteValueId: number;
}

export const getVoteResultListAPI = async (roomId: number): Promise<VoteResultInfo> => {
  const { data } = await axios.get(`vote/room/${roomId}/voteResults`);
  return data;
};
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
export const finishVote = async (roomId: number, modifyCode: string) => {
  const { data } = await axios.put(`vote/room/${roomId}/finishVote`, { roomId, modifyCode });
  return data;
};
