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
import axios from "axios";
import toast from "react-hot-toast";
import { api } from "../../api";
import { CreateStaff, EditStaff } from "./components";

interface IGetallPosts {
  id: string;
  full_name: string;
  avatar: File | null;
  position: string;
  birthday: string;
  about: string;
}

export const PostStaff = () => {
  const [clickRemove, setClickRemove] = useState<boolean>(false);
  const handleActionClickRemove = async (id: string) => {
    setClickRemove(true);
    try {
      const response = await api.delete(`/staff/${id}`);
      if (response.status) {
        toast.success("Muvaffaiyatli o'chirildi");
        getPostsApi();
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

  const [allPosts, setallPosts] = useState<IGetallPosts[]>([]);

  const getPostsApi = async () => {
    try {
      const response = await api.get("/staff");
      setallPosts(response.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.message); // Axios xatoliklarini ushlash
      } else {
        toast.error("Error" + error);
      }
    }
  };

  useEffect(() => {
    getPostsApi();
  }, []);

  const [idClick, setIdClick] = useState<IGetallPosts>({
    full_name: "",
    avatar: null,
    position: "",
    birthday: "",
    about: "",
    id: "",
  });
  return (
    <div className="w-full px-4 sm:px-8">
      <div className="flex w-full flex-col sm:flex-row justify-between items-center sm:items-center">
        <h1 className="text-[20px] font-bold mb-4 sm:mb-0">Xodim yuklash</h1>
        <Button
          color="primary"
          onPress={() => setIsOpen(true)}
          startContent={<MdPublish />}
          className="w-full sm:w-auto"
        >
          Xodim yuklash
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
              <CreateStaff />
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal
          size="2xl"
          scrollBehavior="outside"
          className="w-full sm:w-[650px] h-auto overflow-y-scroll"
          isOpen={isOpenEdit}
          onClose={() => setIsOpenEdit(false)}
        >
          <ModalContent>
            <ModalBody>
              <EditStaff id={idClick} />
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
              <h1>Xodim rasmi</h1>
            </TableColumn>
            <TableColumn>
              <h1>Xodim nomi</h1>
            </TableColumn>
            <TableColumn>
              <h1>Xodim turi</h1>
            </TableColumn>
            <TableColumn>
              <h1>Xodim haqida</h1>
            </TableColumn>
            <TableColumn>
              <h1>Action</h1>
            </TableColumn>
          </TableHeader>
          <TableBody className="w-full">
            {allPosts.map((row, index) => (
              <TableRow key={index} className="w-full">
                <TableCell>
                  <Image
                    src={`${row.avatar}`}
                    className="w-[50px] h-[50px] object-cover"
                  />
                </TableCell>
                <TableCell>
                  <h1>{row.full_name}</h1>
                </TableCell>
                <TableCell>
                  <h1>{row.position}</h1>
                </TableCell>
                <TableCell>
                  <h1>{row.about}</h1>
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
