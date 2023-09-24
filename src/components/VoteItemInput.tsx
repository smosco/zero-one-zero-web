import Button from '@/components/Button';
import TextField from '@/components/TextField';
type VoteItemInputProps = {
  itemName: string;
  itemNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  itemDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  preventItemDelete: boolean;
};

function VoteItemInput({ itemName, itemNameChange, itemDelete, preventItemDelete }: VoteItemInputProps) {
  return (
    <li>
      <TextField placeholder="투표 항목" value={itemName} onChange={itemNameChange} />
      <Button onClick={itemDelete} disabled={preventItemDelete}>
        삭제
      </Button>
    </li>
  );
}

export default VoteItemInput;
