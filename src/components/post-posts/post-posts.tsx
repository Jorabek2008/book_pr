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
import { CreatePosts, EditPosts } from "./components";

interface IGetallPosts {
  id: string;
  title_uz: string;
  image: string;
  view_count: string;
}

export const PostPosts = () => {
  const [clickRemove, setClickRemove] = useState<boolean>(false);
  const handleActionClickRemove = async (id: string) => {
    setClickRemove(true);
    try {
      const response = await api.delete(`/posts/delete-post/${id}`);
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
      const response = await api.get("/posts/get-all-posts");
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

  const [idClick, setIdClick] = useState<string>("");
  return (
    <div className="w-full px-4 sm:px-8">
      <div className="flex w-full flex-col sm:flex-row justify-between items-center sm:items-center">
        <h1 className="text-[20px] font-bold mb-4 sm:mb-0">Post yuklash</h1>
        <Button
          color="primary"
          onPress={() => setIsOpen(true)}
          startContent={<MdPublish />}
          className="w-full sm:w-auto"
        >
          Post yuklash
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
              <CreatePosts />
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
              <EditPosts id={idClick} />
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
              <h1>Post rasmi</h1>
            </TableColumn>
            <TableColumn>
              <h1>Post nomi</h1>
            </TableColumn>
            <TableColumn>
              <h1>Ko'rilgan post soni</h1>
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
                    src={`${row.image}`}
                    className="w-[50px] h-[50px] object-cover"
                  />
                </TableCell>
                <TableCell>
                  <h1>{row.title_uz}</h1>
                </TableCell>
                <TableCell>
                  <h1>{row.view_count}</h1>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      color="primary"
                      onPress={() => {
                        setIsOpenEdit(true);
                        setIdClick(row.id);
                      }}
                      className="mr-2"
                    >
                      <FaEdit />
                    </Button>

                    <Button
                      color="danger"
                      onPress={() => handleActionClickRemove(row.id)}
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
