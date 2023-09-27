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
    <li className="w-full flex items-center justify-between">
      <TextField placeholder="투표 항목" value={itemName} onChange={itemNameChange} className="w-[80%]" />
      <Button onClick={itemDelete} disabled={preventItemDelete} className="h-full text-sm">
        삭제
      </Button>
    </li>
  );
}

export default VoteItemInput;
