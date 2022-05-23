import React, {useEffect} from "react";
import { Alert, Button, ListGroup, Spinner } from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux';
import {fetchExpenses, handleOnDeleteExpenses} from '../../pages/dashboard/dashboardAction'


export const CustomTable = () => {

	const {expenses, isLoading, res} = useSelector(state => state.dashboard)
	const dispatch = useDispatch();

	useEffect(()=>{
		dispatch(fetchExpenses())
	}, [])

	const handleOnDelete = async ids => {
		if (!window.confirm("Are you sure you want to delete this expense?"))
			return;

		dispatch(handleOnDeleteExpenses(ids));
	}
	


	return (
		<div className="mt-5 custom-list fs-3">
			{isLoading && <Spinner variant = "primary" animation = "border" />}
			{
				res?.message && (
					<Alert variant = {res.status === "success" ? "success" : "danger"}>
						{res?.message}
					</Alert>
				)
			}
			<ListGroup>
				{expenses.map((item, i) => (
					<ListGroup.Item key={i} className="fw-bold">
						<span className="title">{item.name}</span>
						<span className="cost">
							${item.amount}{" "}
							<Button variant="danger" onClick={() => handleOnDelete(item._id)}>
								<i class="fa-solid fa-trash"></i>
							</Button>
						</span>
					</ListGroup.Item>
				))}
			</ListGroup>
		</div>
	);
};
