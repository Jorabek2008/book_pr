import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdPublish } from "react-icons/md";
import { CreateBooks } from "./components";

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
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="w-full px-4 sm:px-8">
  <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center">
    <h1 className="text-[20px] font-bold mb-4 sm:mb-0">Kitob yuklash</h1>
    <Button
      color="primary"
      onPress={() => setIsOpen(true)}
      startContent={<MdPublish />}
      className="w-full sm:w-auto"
    >
      Kitob yuklash
    </Button>

    <Modal
      size="2xl"
      scrollBehavior="outside"
      className="w-full sm:w-[650px] h-auto overflow-y-scroll"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <ModalContent>
        <ModalBody>
          <CreateBooks />
        </ModalBody>
      </ModalContent>
    </Modal>
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
              <div className="flex gap-2">
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
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
</div>

  );
};
