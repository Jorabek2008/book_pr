import { useEffect } from "react";
import { About, Ads, Contact, Footer, Header } from "../../components";
import { AppDispatch, RootState } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import { getAdsThunk } from "../../redux/slice/get-ads-slice";

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
      <Contact />
      <Footer />
    </div>
  );
};
