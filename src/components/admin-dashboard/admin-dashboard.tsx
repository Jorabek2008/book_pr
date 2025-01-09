export const AdminDashboard = () => {
  return (
    <div className="w-full px-4 sm:px-8">
      <h1 className="text-[20px] font-bold">Salom Admin</h1>
      <div
        className="flex flex-col gap-x-4 sm:flex-row mt-4 items-center justify-between w-full py-[13px] px-[10px] rounded-lg"
        style={{
          background:
            "linear-gradient(91.01deg, rgba(255, 149, 0, 0.33) 53.47%, rgba(230, 230, 230, 0) 104.55%)",
        }}
      >
        <h1 className="text-[18px] sm:text-[20px] font-medium">Informatsiya</h1>
        <div className="flex items-center flex-col sm:flex-row gap-4 sm:gap-8">
          <h1 className="text-[16px] mt-1 sm:text-[18px]">Asadov Dilmurod</h1>
          <h1 className="text-[16px] mt-1 sm:text-[18px]">
            asadovdilmurod96@gmail.com
          </h1>
          <h1 className="text-[16px] mt-1 sm:text-[18px]">Uzbekistan</h1>
        </div>
      </div>
    </div>
  );
};
