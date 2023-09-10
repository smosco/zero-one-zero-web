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
export const getVoteListApi = async (): Promise<VoteInfo & ParticipantInfo[]> => {
  try {
    const { data } = await axios.get('/dummy/VoteListInfo.json');
    return data;
  } catch (error) {
    throw error;
  }
};

/** @todo API 통합 */
export const getVoteResultListApi = async (): Promise<VoteResultInfo> => {
  try {
    const { data } = await axios.get('/dummy/VoteResultInfo.json');
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchAndGetVote = async () => {
  try {
    /** @todo API 통합 */
    const { data } = await axios.get('/dummy/vote.json');
    return data;
  } catch (err) {
    /** @todo 에러 핸들링 */
    console.log('get vote person error : ', err);
  }
};
