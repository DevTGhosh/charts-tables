import { useQuery } from "react-query";
import Typography from "@material-ui/core/Typography";
import { getHoldings } from "../src/api/getCanopyApi";
import HoldingsTable from "../src/components/sections/HoldingsTable";

export default function holdings(props) {
  const { isLoading, error, data } = useQuery("holdingsData", getHoldings, {
    initialData: props.holdings,
  });
  return (
    <>
      <Typography variant="h4" component="h2" gutterBottom>
        Holdings Table
      </Typography>
      <HoldingsTable data={data.payload} />
    </>
  );
}
export const getStaticProps = async () => {
  const holdings = await getHoldings();
  return { props: { holdings } };
};
