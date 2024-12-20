import {
  Button,
  Input,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { FaDownload, FaSearch, FaEdit, FaTrash } from "react-icons/fa";

interface BookData {
  author: string;
  title: string;
  admin: string;
  email: string;
  phoneNumber: string;
}

const mockData: BookData[] = [
  {
    author: "John Doe",
    title: "Introduction to Programming",
    admin: "Admin1",
    email: "admin1@example.com",
    phoneNumber: "+998900000001",
  },
  {
    author: "Jane Smith",
    title: "Advanced JavaScript",
    admin: "Admin2",
    email: "admin2@example.com",
    phoneNumber: "+998900000002",
  },
  {
    author: "Alice Johnson",
    title: "React for Beginners",
    admin: "Admin3",
    email: "admin3@example.com",
    phoneNumber: "+998900000003",
  },
  {
    author: "Bob Brown",
    title: "Mastering TypeScript",
    admin: "Admin4",
    email: "admin4@example.com",
    phoneNumber: "+998900000004",
  },
];

export const PostBooks = () => {
  const handleActionClick = () => {
    console.log("Salom");
  };

  return (
    <div className="w-full">
      <h1 className="text-[20px] font-bold">Kitob yuklash</h1>
      <div className="flex items-end justify-between gap-5 mt-5">
        <Select
          label="Guruh"
          placeholder="Guruhni tanlash"
          labelPlacement="outside"
        >
          <SelectItem>Boshqalar</SelectItem>
        </Select>
        <Select
          label="Varoq"
          placeholder="Varoqni tanlash"
          labelPlacement="outside"
        >
          <SelectItem>All Time</SelectItem>
        </Select>
        <Input
          placeholder="Nomini kiriting"
          labelPlacement="outside"
          label="Nomi"
          startContent={<FaSearch size={16} className="text-[#0B6C90]" />}
        />
        <Input
          placeholder="Muallif nomini kiriting"
          labelPlacement="outside"
          label="Muallif"
        />
        <Button color="primary" className="w-[100px]">
          <FaDownload />
        </Button>
      </div>
      <div className="mt-5">
        <Table>
          <TableHeader>
            <TableColumn>
              <h1>Muallif</h1>
            </TableColumn>
            <TableColumn>
              <h1>Nomi</h1>
            </TableColumn>
            <TableColumn>
              <h1>Admin</h1>
            </TableColumn>
            <TableColumn>
              <h1>Email</h1>
            </TableColumn>
            <TableColumn>
              <h1>Telefon Nomer</h1>
            </TableColumn>
            <TableColumn>
              <h1>Action</h1>
            </TableColumn>
          </TableHeader>
          <TableBody>
            {mockData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <h1>{row.author}</h1>
                </TableCell>
                <TableCell>
                  <h1>{row.title}</h1>
                </TableCell>
                <TableCell>
                  <h1>{row.admin}</h1>
                </TableCell>
                <TableCell>
                  <h1>{row.email}</h1>
                </TableCell>
                <TableCell>
                  <h1>{row.phoneNumber}</h1>
                </TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={handleActionClick}
                    className="mr-2"
                  >
                    <FaEdit />
                  </Button>
                  <Button color="danger" onClick={handleActionClick}>
                    <FaTrash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
