import { Link } from "react-router-dom";
import {
  useGetUserQuery,
  useGetUserTokenTransactionsQuery,
} from "../../store/Slices/user";
import DataError from "../../components/DataError";
import LoaderSpinner from "../../components/LoaderSpinner";

export default function ManageCredit() {
  const { data: user } = useGetUserQuery();

  const {
    data: transactions,
    error,
    isError,
    isLoading,
    isFetching,
    refetch,
  } = useGetUserTokenTransactionsQuery();

  if (isLoading || isFetching) {
    return <LoaderSpinner />;
  }
  if (isError) {
    return <DataError refetch={refetch} error={error} />;
  }
  return (
    <>
      <article className="rounded px-3 py-2 shadow-gray-200 *:block space-y-4 shadow">
        <p className="text-xl font-roboto">
          Credit Left:<span className="font-bold"> {user?.credits || 0}</span>
        </p>
        <Link href="tuts-credit" className="text-purple-500">
          What is a Credit?
        </Link>
      </article>
      {transactions?.length >= 1 && (
        <div className="mb-5 space-y-4">
          <h1 className="text-2xl border-b-2 font-bold font-roboto border-b-purple-500 w-fit">
            Transactions
          </h1>{" "}
          <table className="w-full text-gray-500  text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Transaction Id
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
                    {transaction?.transId}
                  </th>
                  <td className="px-6 py-4">{transaction?.status}</td>
                  <td className="px-6 py-4">{transaction?.credit}</td>
                  <td className="px-6 py-4">{transaction?.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
