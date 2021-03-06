import { useQuery } from "react-query";
import Typography from "@material-ui/core/Typography";
import { getNetworth } from "../src/api/getCanopyApi";
import NetworthChart from "../src/components/sections/NetworthChart";

export default function index(props) {
  const { isLoading, error, data } = useQuery("networthData", getNetworth, {
    initialData: props.networth,
  });
  return (
    <>
      <Typography variant="h4" component="h2" gutterBottom>
        Networth Chart
      </Typography>
      <NetworthChart data={data} />
    </>
  );
}

export const getStaticProps = async () => {
  const networth = await getNetworth();
  return { props: { networth } };
};
