import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdPublish } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import { api } from "../../api";
import { CreateBibliograph, EditBibliograph } from "./components";

interface IGetAllBooks {
  title: string;
  id: string;
  file: File | null;
  link: string;
}

export const Bibliography = () => {
  const [clickRemove, setClickRemove] = useState<boolean>(false);
  const handleActionClickRemove = async (id: string) => {
    setClickRemove(true);
    try {
      const response = await api.delete(`/bibliography/${id}`);
      if (response.status) {
        toast.success("Muvaffaiyatli o'chirildi");
        getBooksApi();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.message); // Axios xatoliklarini ushlash
      } else {
        toast.error("Error" + error);
      }
    } finally {
      setClickRemove(false);
    }
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);

  const [allBooks, setAllBooks] = useState<IGetAllBooks[]>([]);

  const getBooksApi = async () => {
    try {
      const response = await api.get("/bibliography/all");
      setAllBooks(response.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.message); // Axios xatoliklarini ushlash
      } else {
        toast.error("Error" + error);
      }
    }
  };

  useEffect(() => {
    getBooksApi();
  }, []);

  const [idClick, setIdClick] = useState<IGetAllBooks>({
    title: "",
    file: null,
    link: "",
    id: "",
  });
  return (
    <div className="w-full px-4 sm:px-8">
      <div className="flex w-full flex-col sm:flex-row justify-between items-center sm:items-center">
        <h1 className="text-[20px] font-bold mb-4 sm:mb-0">
          Bibliografiya yuklash
        </h1>
        <Button
          color="primary"
          onPress={() => setIsOpen(true)}
          startContent={<MdPublish />}
          className="w-full sm:w-auto"
        >
          Bibliografiya yuklash
        </Button>
        <Modal
          size="2xl"
          scrollBehavior="outside"
          className="w-full sm:w-[650px] h-auto"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <ModalContent>
            <ModalBody>
              <CreateBibliograph />
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal
          size="2xl"
          scrollBehavior="outside"
          className="w-full sm:w-[650px] h-auto"
          isOpen={isOpenEdit}
          onClose={() => setIsOpenEdit(false)}
        >
          <ModalContent>
            <ModalBody>
              <EditBibliograph id={idClick} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>

      {clickRemove && (
        <Modal size="full" isOpen={clickRemove}>
          <ModalContent>
            <ModalBody className="flex items-center justify-center">
              <Spinner />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      <div className="mt-5 w-full">
        <Table className="w-full">
          <TableHeader className="w-full">
            <TableColumn>
              <h1>Ma'lumot nomi</h1>
            </TableColumn>
            <TableColumn>
              <h1>Ma'lumot file yoki linki</h1>
            </TableColumn>
            <TableColumn>
              <h1>Action</h1>
            </TableColumn>
          </TableHeader>
          <TableBody className="w-full">
            {allBooks.map((row, index) => (
              <TableRow key={index} className="w-full">
                <TableCell>
                  <h1>{row.title.slice(0, 20)}...</h1>
                </TableCell>
                <TableCell>
                  <h1>{row.file || row.link ? "Bor" : "Yo'q"}</h1>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      color="primary"
                      onClick={() => {
                        setIsOpenEdit(true);
                        setIdClick(row);
                      }}
                      className="mr-2"
                    >
                      <FaEdit />
                    </Button>

                    <Button
                      color="danger"
                      onClick={() => handleActionClickRemove(row.id)}
                    >
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
