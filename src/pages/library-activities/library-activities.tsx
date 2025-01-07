import { useEffect } from "react";
import { About, Ads, Footer, Header } from "../../components";
import { AppDispatch, RootState } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import { getAdsThunk } from "../../redux/slice/get-ads-slice";
import { GetAllBooks } from "../../components/get-all-books";

export const LibraryActivities = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAdsThunk());
  }, []);

  const { ads } = useSelector((state: RootState) => state.getAds);
  return (
    <div>
      <Header />
      <About />
      <Ads pagination={true} data={ads} />
      <GetAllBooks pagination={true} />
      <Footer />
    </div>
  );
};
