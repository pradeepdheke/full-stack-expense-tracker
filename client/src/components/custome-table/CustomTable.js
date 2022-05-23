import React, {useEffect} from "react";
import { Button, ListGroup } from "react-bootstrap";
import {useSelector} from 'react-redux'
import {fetchExpenses} from '../../pages/dashboard/dashboardAction'


export const CustomTable = ({ handleOnDelete }) => {
	const {expenses} = useSelector(state => state.dashboard)

	useEffect(()=>{
		fetchExpenses()
	}, [])
	


	return (
		<div className="mt-5 custom-list fs-3">
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
