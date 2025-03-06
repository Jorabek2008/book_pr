import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../api";
import { FaRegEye, FaUser } from "react-icons/fa";
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface TUser {
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

interface ChartData {
  Oy: string;
  Tomoshabinlar: number;
  Postlar: number;
}

export const AdminDashboard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ChartData[]>([]);
  const [users, setUsers] = useState<TUser[]>([]);

  const fetchAnswers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/posts/get-all-posts", {
        params: { limit: 2147483647 },
      });

      setData(
        response.data.data.reduceRight(
          (a: ChartData[], c: { createdAt: string; view_count: string }) => {
            const Oy = c.createdAt.slice(0, 7).replace("-", " ");
            const i = a.find((Postlar) => Postlar.Oy === Oy);
            if (i) {
              i.Tomoshabinlar += +c.view_count;
              i.Postlar++;
            } else a.push({ Oy, Tomoshabinlar: +c.view_count, Postlar: 1 });
            return a;
          },
          [],
        ),
      );
    } catch (error) {
      const errorMessage =
        (error as AxiosError<{ message: string }>)?.response?.data?.message ||
        "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/contact/messages");
      setUsers(
        response.data.data.reduce((acc: TUser[], cur: TUser) => {
          if (
            !acc.find(
              (user) => user.email === cur.email || user.phone === cur.phone,
            )
          ) {
            acc.push(cur);
          }
          return acc;
        }, []),
      );
    } catch (error) {
      const errorMessage =
        (error as AxiosError<{ message: string }>)?.response?.data?.message ||
        "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnswers();
    fetchUsers();
  }, []);
  // const user = useGetUser();
  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans rounded-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-6 flex items-center justify-between">
          <div>
            <div className="text-gray-500 text-sm">Jami Ko'rishlar</div>
            <div className="text-2xl font-bold">
              {data.reduce((a: number, c: ChartData) => a + c.Tomoshabinlar, 0)}
            </div>
          </div>
          <div className="text-4xl">
            <FaRegEye size={30} />
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6 flex items-center justify-between">
          <div>
            <div className="text-gray-500 text-sm">Jami Foydalanuvchilar</div>
            <div className="text-2xl font-bold">
              {" "}
              {data.reduce((a: number, c: ChartData) => a + c.Tomoshabinlar, 0)}
            </div>
          </div>
          <div className="text-4xl">
            <FaUser size={30} />
          </div>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        {loading ? (
          <Spinner className="w-full" />
        ) : (
          <>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Oy" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="Postlar"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
                <Area
                  type="monotone"
                  dataKey="Tomoshabinlar"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
              </AreaChart>
            </ResponsiveContainer>
            <Table className="w-full mt-6">
              <TableHeader className="w-full">
                <TableColumn>
                  <strong>#</strong>
                </TableColumn>
                <TableColumn>
                  <strong>F.I.SH</strong>
                </TableColumn>
                <TableColumn>
                  <strong>Email</strong>
                </TableColumn>
                <TableColumn>
                  <strong>Telefon raqami</strong>
                </TableColumn>
              </TableHeader>
              <TableBody className="w-full">
                {!users.length ? (
                  <TableRow>
                    <TableCell> </TableCell>
                    <TableCell>
                      <h1 className="text-end">Ma'lumotlar topilmadi</h1>
                    </TableCell>
                    <TableCell> </TableCell>
                    <TableCell> </TableCell>
                  </TableRow>
                ) : (
                  users.map((row: TUser, index) => (
                    <TableRow key={index} className="w-full">
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <h1>{row.name}</h1>
                      </TableCell>
                      <TableCell>
                        <h1>{row.email}</h1>
                      </TableCell>
                      <TableCell>
                        <h1>{row.phone}</h1>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </>
        )}
      </div>
    </div>
  );
};
