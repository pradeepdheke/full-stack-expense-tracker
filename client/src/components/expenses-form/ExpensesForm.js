import React, { useState } from "react";
import { Button, Col, Form, FormControl, Row } from "react-bootstrap";
import {useDispatch} from 'react-redux';
import {handleOnPost} from '../../pages/dashboard/dashboardAction'

const initialState = {
	name: "",
	amount: "",
	date: "",
};
export const ExpensesForm = () => {
	const dispatch = useDispatch();
	const [frmDt, setFrmDt] = useState(initialState);

	const handleOnChange = e => {
		const { name, value } = e.target;

		setFrmDt({
			...frmDt,
			[name]: value,
		});
	};

	const handleOnSubmit = event => {
		event.preventDefault();
		dispatch(handleOnPost(frmDt));
	};

	return (
		<div>
			<Form onSubmit={handleOnSubmit}>
				<Row className="g-3 bg-warning p-4 rounded pb-5">
					<Col md = "2">
					<Form.Select aria-label="Default select example" onChange={handleOnChange}>
  <option>Select One</option>
  <option value="income">Income</option>
  <option value="expenses">Expenses</option>
  
</Form.Select>
					</Col>
					<Col md="4">
						<Form.Control
							type="text"
							name="name"
							class="form-control"
							placeholder="Expenses name"
							aria-label="First name"
							onChange={handleOnChange}
							required
						/>
					</Col>
					<Col md="2">
						<Form.Control
							type="number"
							name="amount"
							class="form-control"
							placeholder="25.5"
							aria-label="Last name"
							onChange={handleOnChange}
							required
						/>
					</Col>
					<Col md="4">
						<Form.Control
							type="date"
							name="date"
							class="form-control"
							aria-label="Last name"
							onChange={handleOnChange}
							required
						/>
					</Col>
					<Col md="2">
						<Button variant="primary" type="submit">
							Add
						</Button>
					</Col>
				</Row>
			</Form>
		</div>
	);
};
