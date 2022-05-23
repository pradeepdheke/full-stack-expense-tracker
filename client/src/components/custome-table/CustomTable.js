import React, {useEffect, useState} from "react";
import { Alert, Button, ButtonGroup, FormCheck, ListGroup, Spinner } from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux';
import {fetchExpenses, handleOnDeleteExpenses} from '../../pages/dashboard/dashboardAction'


export const CustomTable = () => {

	const {expenses, isLoading, res} = useSelector(state => state.dashboard)
	const dispatch = useDispatch();
	const [ids, setIds] = useState([]);

	const [display, setDisplay] = useState("all") //income or expense

	useEffect(()=>{
		dispatch(fetchExpenses())
	}, [])

	const handleOnDelete = async ids => {
		if (!window.confirm("Are you sure you want to delete this expense?"))
			return;

		dispatch(handleOnDeleteExpenses(ids));
	};

	const handleOnSelect = (e) => {
		const {checked, value} = e.target

		checked ?
		setIds([...ids, value])
		:
		setIds(ids.filter(id => id !== value))

	}
	console.log(ids);

	const incomeArg = expenses.filter(item => item.type === "income")
	const expensesArg = expenses.filter(item => item.type === "expenses")

	const transactions = {
		"all" : expenses,
		"income" : incomeArg,
		"expenses" : expensesArg
	} 
	

	return (
		<div className="mt-5 custom-list fs-3">
<div className="btn-grp pb-3">
<ButtonGroup aria-label="Basic example">
	<Button onClick={() => setDisplay("all")} variant = "primary">All</Button>
	<Button onClick={() => setDisplay("income")} variant = "info">Income</Button>
	<Button onClick={() => setDisplay("expenses")} variant = "danger">Expenses</Button>
</ButtonGroup>
</div>
			{isLoading && <Spinner variant = "primary" animation = "border" />}
			{
				res?.message && (
					<Alert variant = {res.status === "success" ? "success" : "danger"}>
						{res?.message}
					</Alert>
				)
			}
			<ListGroup>
				{transactions[display].map((item, i) => (

					
					<ListGroup.Item key={item._id} className="fw-bold">
					<span className="check-group">
					<FormCheck type = "checkbox" className="mr-2" onClick={handleOnSelect} value = {item._id}/>
						<span className="title">{item.name}</span>
					</span>
						<span className="cost">
							{[item.type === "expenses" ? "-" : ""]}
							${item.amount}{" "}
							<Button variant="danger" onClick={() => handleOnDelete([item._id])}>
								<i class="fa-solid fa-trash"></i>
							</Button>
						</span>
					</ListGroup.Item>
						))}
			</ListGroup>
				

			<div className="mt-2 text-end">
				{
					ids.length> 0 && (
						<Button variant="danger" onClick={()=> handleOnDelete(ids)}>
							Delete Selected Expenses
						</Button>
					)}
			</div>
		</div>
	);
};
