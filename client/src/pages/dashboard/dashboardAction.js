import { deleteExpense, getExpense, postExpense } from "../../helpers/axiosHelper";
import { requestPending, setResponse, setExpenses } from "./dashboardSlice";

export const fetchExpenses =  () => async dispatch=> {
    const {status, expenses} = await getExpense();

    status === "success" && dispatch(setExpenses(expenses))
    
    
};

export const handleOnPost = frmDt => async dispatch => {
    // setIsLoading(true);
    const data = await postExpense(frmDt);
    // console.log(data);
    // setIsLoading(false);
    dispatch(setResponse(data));
    data.status === "success" && dispatch(fetchExpenses());
    //call the api
};

export const handleOnDeleteExpenses = ids => async dispatch => {
    dispatch(requestPending());
    const data = await deleteExpense(ids);

    dispatch(setResponse(data));
    data.status === "success" && dispatch(fetchExpenses());
}