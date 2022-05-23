import { getExpense } from "../../helpers/axiosHelper";
import { setExpenses } from "./dashboardSlice";

export const fetchExpenses =  () => async dispatch=> {
    const {status, expenses} = await getExpense();

    status === "success" && dispatch(setExpenses(expenses))
    
    
};
