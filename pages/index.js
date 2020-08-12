import { useQuery } from "react-query";
import Typography from "@material-ui/core/Typography";
import MainLayout from "../src/components/layout/MainLayout";
import { getNetworth } from "../src/api/getCanopyApi";

export default function index(props) {
  const { isLoading, error, data } = useQuery("networthData", getNetworth, {
    initialData: props.networth,
  });
  return (
    <>
      <MainLayout>
        <Typography variant="h4" component="h2" gutterBottom>
          Networth Chart
        </Typography>
      </MainLayout>
    </>
  );
}

export const getStaticProps = async () => {
  const networth = await getNetworth();
  return { props: { networth } };
};
