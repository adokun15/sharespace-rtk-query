import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import {
  useGetUserQuery,
  useGetUserTokenTransactionsQuery,
} from "../../store/Slices/user";
import DataError from "../../components/DataError";
import LoaderSpinner from "../../components/LoaderSpinner";
import { ArrowRight } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { transactionDate } from "../../utils/TimeHandler";

export default function ManageCredit() {
  const { data: user } = useGetUserQuery();

  const { transactions, error, isError, isLoading, isFetching, refetch } =
    useGetUserTokenTransactionsQuery(null, {
      selectFromResult: (res) => {
        const { data, ...others } = res;

        const toN = (d) => {
          const date = new Date(d);
          return date.getTime();
        };

        //Cloned
        const transactions = data?.map((t) => ({
          ...t,
          timeRange: toN(t.paidAt),
        }));

        //Sort Clone Cloned
        const sorted = transactions?.sort(
          (trans1, trans2) => trans2.timeRange - trans1.timeRange
        );

        return {
          ...others,
          transactions: sorted,
        };
      },
    });

  if (isLoading || isFetching) {
    return <LoaderSpinner />;
  }

  if (isError) {
    return <DataError refetch={refetch} error={error} />;
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/profile">profile</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Manage Credit</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <article className="rounded px-3 py-2  *:block space-y-4 ">
        <p className="text-center md:text-6xl text-5xl font-roboto">
          <span className="font-bold"> {user?.credits || 0}</span>
        </p>
        <p className="text-center font-poppins text-purple-500">
          Available Credit Bal
        </p>
      </article>
      {transactions?.length >= 1 && (
        <div className="mb-5 space-y-4">
          <h1 className="font-sans_serif text-2xl border-b-2 font-bold  border-b-purple-500 w-fit">
            Transactions
          </h1>{" "}
          <table className="w-full font-poppins text-gray-500  text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Transaction Ref
                </th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Credit Amount</th>
                <th className="px-6 py-3">Date Paid</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((transaction) => (
                <tr className="odd:bg-white even:bg-gray-100 border-b hover:bg-gray-50">
                  <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {transaction?.reference}
                  </th>
                  <td className="px-6 py-4">{transaction?.status}</td>
                  <td className="px-6 py-4 ">
                    <p>
                      {transaction?.credit} <ArrowRight className="inline" />{" "}
                      NGN
                      {transaction?.amount}
                    </p>
                    <Badge className="rounded-full py-1 tracking-wide">
                      {" "}
                      {transaction?.channel}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    {transactionDate(transaction?.paidAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
