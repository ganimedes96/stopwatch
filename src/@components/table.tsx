/* eslint-disable @typescript-eslint/no-explicit-any */
import { X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface TableProps {
  timeData: {
    id: string;
    time: string;
  }[];
  deleteTime: (id: string) => void;
  sumTimes: () => string;
}

export const TableTime = ({ timeData, deleteTime, sumTimes }: TableProps) => {
 
  
  return (
    <div>

      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[140px]">Identificador</TableHead>
            <TableHead className="w-[180px]">Tempo</TableHead>
            <TableHead>Excluir</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {timeData.map((time, index) => (
            <TableRow key={time.id}>
              <TableCell>0{1+index}</TableCell>
              <TableCell>{time.time}</TableCell>
              <TableCell>
                <button
                  onClick={() => deleteTime(time.id)}
                  className="bg-pink-600 p-[3px] rounded-full   "
                >
                  <X className="w-4 h-4  text-zinc-100" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
          <div className="mt-5 w-full flex justify-between items-center">
            <p>Total</p>
            <p>{sumTimes()}</p>
          </div>
    </div>
  );
};
