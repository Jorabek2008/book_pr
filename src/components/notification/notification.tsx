import { useEffect, useState } from "react";
import { api } from "../../api";
import axios from "axios";
import toast from "react-hot-toast";
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
import { FaTrash } from "react-icons/fa";

interface IGetallPosts {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}
export const Notification = () => {
  const [allPosts, setallPosts] = useState<IGetallPosts[]>([]);

  const getPostsApi = async () => {
    try {
      const response = await api.get("/contact/messages");
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

  const [clickRemove, setClickRemove] = useState<boolean>(false);
  const handleActionClickRemove = async (id: string) => {
    setClickRemove(true);
    try {
      const response = await api.delete(`/contact/${id}`);
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
  console.log(allPosts);
  return (
    <div>
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
              <h1>Xabar nomi</h1>
            </TableColumn>
            <TableColumn>
              <h1>Xabar emaili</h1>
            </TableColumn>
            <TableColumn>
              <h1>Xabar telefoni</h1>
            </TableColumn>
            <TableColumn>
              <h1>Xabar</h1>
            </TableColumn>
            <TableColumn>
              <h1>Action</h1>
            </TableColumn>
          </TableHeader>
          <TableBody className="w-full">
            {allPosts.map((row, index) => (
              <TableRow key={index} className="w-full">
                <TableCell>
                  <h1>{row.name}</h1>
                </TableCell>
                <TableCell>
                  <h1>{row.email}</h1>
                </TableCell>
                <TableCell>
                  <h1>{row.phone}</h1>
                </TableCell>
                <TableCell>
                  <h1>{row.message}</h1>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
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
