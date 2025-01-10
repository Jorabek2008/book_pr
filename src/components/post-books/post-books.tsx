import {
  Button,
  Image,
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
import { CreateBooks } from "./components";
import axios from "axios";
import toast from "react-hot-toast";
import { api } from "../../api";
import { EditBook } from "./components/edit-book";

interface IGetAllBooks {
  author: string;
  author_img: string;
  book_img: string[];
  id: string;
  text_uz: string;
  title_uz: string;
}

export const PostBooks = () => {
  const [clickRemove, setClickRemove] = useState<boolean>(false);
  const handleActionClickRemove = async (id: string) => {
    setClickRemove(true);
    try {
      const response = await api.delete(`/books/delete-book/${id}`);
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
      const response = await api.get("/books/get-all-books");
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

  const [idClick, setIdClick] = useState<string>("");
  return (
    <div className="w-full px-4 sm:px-8">
      <div className="flex w-full flex-col sm:flex-row justify-between items-center sm:items-center">
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
          className="w-full sm:w-[650px] h-auto"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <ModalContent>
            <ModalBody>
              <CreateBooks />
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
              <EditBook id={idClick} />
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
              <h1>Kitob rasmi</h1>
            </TableColumn>
            <TableColumn>
              <h1>Kitob nomi</h1>
            </TableColumn>
            <TableColumn>
              <h1>Muallif ismi</h1>
            </TableColumn>
            <TableColumn>
              <h1>Action</h1>
            </TableColumn>
          </TableHeader>
          <TableBody className="w-full">
            {allBooks.map((row, index) => (
              <TableRow key={index} className="w-full">
                <TableCell>
                  {row.book_img.slice(0, 1).map((item) => (
                    <Image
                      src={`${item}`}
                      className="w-[50px] h-[50px] object-cover"
                    />
                  ))}
                </TableCell>
                <TableCell>
                  <h1>{row.title_uz}</h1>
                </TableCell>
                <TableCell>
                  <h1>{row.author}</h1>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      color="primary"
                      onClick={() => {
                        setIsOpenEdit(true);
                        setIdClick(row.id);
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
