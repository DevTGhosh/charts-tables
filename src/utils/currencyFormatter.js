export default function currencyFormatter(value) {
  const formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  if (value) {
    return formatCurrency.format(value);
  } else {
    return "-";
  }
}
