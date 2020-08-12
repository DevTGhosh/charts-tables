import { useQuery } from "react-query";
import Typography from "@material-ui/core/Typography";
import { getHoldings } from "../src/api/getCanopyApi";
import MainLayout from "../src/components/layout/MainLayout";

export default function holdings(props) {
  const { isLoading, error, data } = useQuery("holdingsData", getHoldings, {
    initialData: props.holdings,
  });
  return (
    <>
      <MainLayout>
        <Typography variant="h4" component="h2" gutterBottom>
          Holdings Table
        </Typography>
      </MainLayout>
    </>
  );
}
export const getStaticProps = async () => {
  const holdings = await getHoldings();
  return { props: { holdings } };
};
