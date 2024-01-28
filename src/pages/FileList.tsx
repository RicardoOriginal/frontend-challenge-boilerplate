import { ReactElement } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useFileContext } from "@/context";

function FileList(): ReactElement {

  const { state: { fileListInfo } } = useFileContext();

  // Remember to keep the fileList updated after upload a new file

    return (
      <>
        <h1 className="text-2xl font-bold pt-5 text-green-800">File List</h1>

        <Table>
          <TableCaption>List of files processed or processing.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name file</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Creation</TableHead>
              <TableHead>Date Update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fileListInfo?.map((result: any, index: number) => {
                return (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium">{result.fileName}</TableCell>
                    <TableCell>{result.status}</TableCell>
                    <TableCell>{result.creationDateTime}</TableCell>
                    <TableCell>{result.updateDateTime}</TableCell>
                  </TableRow>);
              })}
          </TableBody>
        </Table>
      </>
    )
}

export { FileList };
