import { getExpense } from "../../helpers/axiosHelper";

export const fetchExpenses =  () => async dispatch=> {
    const data = await getExpense();
    console.log(data)
    
};
