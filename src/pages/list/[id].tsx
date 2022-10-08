import { ReactElement } from "react";
import AuthLayout from "../../components/authLayout";
import { NextPageWithLayout } from "../_app";

const List: NextPageWithLayout = () => {
  return (<></>);
}

List.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
}

export default List;
